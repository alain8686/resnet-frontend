import torch
import torchvision.transforms as transforms
import matplotlib.pyplot as plt
import gc
import numpy as np
import os
import glob
import torch.nn as nn
import torch.optim as optim
from torchvision.datasets import ImageFolder
import json


class TinyImagesDataset(ImageFolder):
    def __init__(self, root, classes, transformer=None, target_transformer=None, is_valid_file=None):
        super().__init__(root, transform=transformer, target_transform=target_transformer, is_valid_file=is_valid_file)

        self.classes_indx = {classe: i for i, classe in enumerate(classes)}

    @staticmethod
    def validate_classe(path):
        folder = os.path.dirname(os.path.dirname(path))
        txt_files = glob.glob(os.path.join(folder, "*.txt"))
        file_name = os.path.basename(path)
        with open(txt_files[0]) as f:
            for line in f:
                line = line.strip()
                example = line.split('\t')
                if file_name.lower() == example[0].lower() and example[1] in ['n01443537', 'n01629819', 'n01641577']:
                    return True
        return False

    @staticmethod
    def get_folder_names(root_folder):
        folder_names = []
        for folder_name in os.listdir(root_folder):
            folder_path = os.path.join(root_folder, folder_name)
            if os.path.isdir(folder_path):
                folder_names.append(folder_name)
        return folder_names

    def __getitem__(self, index):
        path, _ = self.samples[index]
        image = self.loader(path)

        # Obter a anotação da caixa delimitadora correspondente à imagem atual
        annotation_path, file_name = self.get_annotation_path(path)
        bounding_box, label = self.load_bounding_box(annotation_path, file_name)

        if label is None:
            label = os.path.basename(os.path.dirname(os.path.dirname(path)))
        target = [(0.0 if i != self.classes_indx[label] else 1.0) for i in range(len(self.classes_indx))]

        if self.transform is not None:
            image = self.transform(image)

        return image, torch.tensor(target), torch.tensor(bounding_box)

    def get_annotation_path(self, image_path):
        # Defina a lógica para obter o caminho do arquivo de anotação com base no caminho da imagem
        # Por exemplo, se as anotações estiverem no mesmo diretório com a extensão .txt:
        annotation_path = os.path.join(os.path.dirname(image_path), "..")
        txt_files = glob.glob(os.path.join(annotation_path, "*.txt"))
        return txt_files[0], os.path.basename(image_path)

    def load_bounding_box(self, annotation_path, file_name):
        with open(annotation_path) as f:
            for line in f:
                line = line.strip()
                example = line.split('\t')
                if file_name.lower() == example[0].lower():
                    if len(example) == 5:
                        bounds = [float(example[1]), float(example[2]), float(example[3]), float(example[4])]
                        label = None
                    else:
                        bounds = [float(example[2]), float(example[3]), float(example[4]), float(example[5])]
                        label = example[1]
                    return bounds, label
        raise Exception('Não foi encontrado a anotação')


class Treinable(object):
    def __init__(self, path_train, path_val, batch_size):
        self.path_train = path_train
        self.path_val = path_val

        self.classes = TinyImagesDataset.get_folder_names(self.path_train)

        self.train_loader = self.data_loader_train(batch_size)
        self.val_loader = self.data_loader_val(batch_size)
        self.epoc = 0

        self.patience = 10

        self.counter = 0
        self.batch_size = batch_size

        self.train_data = {}

    def save_classes(self, path):
        with open(path, 'w') as f:
            f.write(",".join(self.classes))

    def data_loader_train(self, batch_size=256, workers=1, pin_memory=False):
        normalize = transforms.Normalize(mean=[0.485, 0.456, 0.406],
                                         std=[0.229, 0.224, 0.225])

        train_dataset = TinyImagesDataset(
            self.path_train,
            self.classes,
            transforms.Compose([
                #transforms.RandomResizedCrop(224),
                #transforms.RandomHorizontalFlip(),
                transforms.ToTensor(),
                normalize
            ])
        )

        train_loader = torch.utils.data.DataLoader(
            train_dataset,
            batch_size=batch_size,
            shuffle=True,
            num_workers=workers,
            pin_memory=pin_memory,
            sampler=None
        )

        return train_loader

    def data_loader_val(self, batch_size=256, workers=1, pin_memory=True):
        normalize = transforms.Normalize(mean=[0.5, 0.5, 0.5],
                                         std=[0.5, 0.5, 0.5])

        val_dataset = TinyImagesDataset(
            self.path_val,
            self.classes,
            transforms.Compose([
                #transforms.Resize(256),
                #transforms.CenterCrop(224),
                transforms.ToTensor(),
                normalize
            ])
        )

        val_loader = torch.utils.data.DataLoader(
            val_dataset,
            batch_size=batch_size,
            shuffle=False,
            num_workers=workers,
            pin_memory=pin_memory,
            sampler=None
        )
        return val_loader

    def _train(self, model):
        model.train_classif()
        steps = []

        gc.collect()
        data_iter = iter(self.train_loader)
        train_loss = 0.0

        classe_true_positives_train = 0
        overloap = 0
        for i, (input, target, bounding_box) in enumerate(data_iter):
            if i == 0:
                self.input_example = input
            class_out, box_out = model(input)

            loss_class = self.class_loss_fn(class_out, target)
            loss_box = self.box_loss_fn(box_out, bounding_box)

            current_loss = loss_class * 0.8 + loss_box * 0.2
            self.optimizer.zero_grad()
            current_loss.backward()
            self.optimizer.step()

            train_loss += current_loss.item() * input.size(0)

            max_classes = torch.argmax(class_out, dim=1)
            one_hot_predictions = torch.eye(class_out.shape[1])[max_classes]
            classe_true_positives = torch.logical_and(one_hot_predictions, target).sum().item()
            classe_true_positives_train += classe_true_positives

            _, predicted_classes = torch.max(class_out, 1)
            accuracy_classe = classe_true_positives / target.size(0)

            overloap_batch = self.interceptor_loss(box_out, bounding_box)
            overloap += overloap_batch / input.size(0)

            print(f'train batch {i} overloap_batch {overloap_batch}, accuracy classe {accuracy_classe}, loss {current_loss.item() * input.size(0)}')
            steps.append({'train_loss': train_loss})
            gc.collect()

        train_loss /= len(self.train_loader.dataset)
        accuracy_train = classe_true_positives_train / len(self.train_loader.dataset)
        return accuracy_train, overloap, train_loss, steps

    def _validation(self, model):
        model.eval()
        val_loss = 0.0
        gc.collect()
        data_iter = iter(self.val_loader)
        classe_true_positives_val = 0
        with torch.no_grad():
            for i, (input, target, bounding_box) in enumerate(data_iter):
                class_out, box_out = model(input)

                loss_class = self.class_loss_fn(class_out, target)
                loss_box = self.box_loss_fn(box_out, bounding_box)

                current_loss = loss_class * 0.8 + loss_box * 0.2

                val_loss += current_loss.item() * input.size(0)

                max_classes = torch.argmax(class_out, dim=1)
                one_hot_predictions = torch.eye(class_out.shape[1])[max_classes]
                classe_true_positives = torch.logical_and(one_hot_predictions, target).sum().item()
                classe_true_positives_val += classe_true_positives

                _, predicted_classes = torch.max(class_out, 1)
                accuracy_classe = classe_true_positives / target.size(0)

                print(f'validacao batch {i} accuracy classe {accuracy_classe}, loss {current_loss.item() * input.size(0)}')
                gc.collect()
        val_loss /= len(self.val_loader.dataset)
        accuracy_val = classe_true_positives_val / len(self.val_loader.dataset)
        return accuracy_val, val_loss

    def train(self, model, num_epoch):
        best_loss = float('inf')
        counter = 0

        learning_rate = 0.001
        alpha = 0.9
        epsilon = 1e-08
        momentum = 0.0
        weight_decay = 0.0

        self.class_loss_fn = nn.CrossEntropyLoss()
        self.box_loss_fn = nn.SmoothL1Loss()
        self.optimizer = optim.RMSprop(model.parameters(), lr=learning_rate, alpha=alpha, eps=epsilon, momentum=momentum,
                                  weight_decay=weight_decay)
        for epoch in range(num_epoch):
            print(f'epoch {epoch}')
            gc.collect()

            accuracy_train, train_loss, steps = self._train(model)
            print(f'Treino accuracy {accuracy_train}, loss {train_loss}')
            self.train_data[epoch] = {'train_loss': train_loss, 'train_accuracy': accuracy_train, 'steps': steps}

            accuracy_val, val_loss = self._validation(model)
            print(f'Validacao accuracy {accuracy_val}, loss {train_loss}')
            self.train_data[epoch] = {**self.train_data[epoch], 'val_loss': val_loss, 'val_accuracy': accuracy_val}

            self.graph_results()

            if train_loss < best_loss:
                best_loss = train_loss
                counter = 0

                torch.onnx.export(model, self.input_example[0:1, :, :, :], f'resnet_modelo_{epoch}.onnx', opset_version=13)
                self.save_classes(f"classes_modelo_{epoch}.txt")
            else:
                counter += 1
            if counter >= self.patience:
                print(f'Early stopping. No improvement in {epoch} epochs.')
                break

    def interceptor_loss(self, output, bounding_box):
        output = output.detach().numpy() if isinstance(output, torch.Tensor) else np.array(output)
        bounding_box = bounding_box.detach().numpy() if isinstance(bounding_box, torch.Tensor) \
            else np.array(bounding_box)

        batch_overloap = 0
        for pred, target in zip(output, bounding_box):
            pred_x_min, pred_y_min, pred_x_max, pred_y_max = pred
            target_x_min, target_y_min, target_x_max, target_y_max = target

            intersection_area = max(0, min(pred_x_max, target_x_max) - max(pred_x_min, target_x_min)) * \
                                max(0, min(pred_y_max, target_y_max) - max(pred_y_min, target_y_min))

            pred_area = (pred_x_max - pred_x_min) * (pred_y_max - pred_y_min)
            target_area = (target_x_max - target_x_min) * (target_y_max - target_y_min)

            overlap = intersection_area / (pred_area + target_area - intersection_area)
            batch_overloap += overlap

        return batch_overloap

    def graph_results(self):
        x = sorted([epoch_ for epoch_ in self.train_data.keys()])

        y_looss_train = [self.train_data[epoch_]['train_loss'] for epoch_ in x]
        y_looss_val = [self.train_data[epoch_]['val_loss'] for epoch_ in x]

        plt.plot(x, y_looss_train, color='red', label='Loss train')
        plt.plot(x, y_looss_val, color='blue', label='Loss validations')

        plt.xlabel('Epoch')
        plt.ylabel('Loss')
        plt.legend()
        plt.title('Plato de aprendizado')
        plt.grid(True)

        plt.savefig(f'aprendizado_epoch.png')
        plt.clf()

        with open('train_data.json', 'w') as f:
            json.dump(self.train_data, f)




