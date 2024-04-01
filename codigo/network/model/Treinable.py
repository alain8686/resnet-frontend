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

        self.train_data_classes = {}

        self.class_loss_fn = nn.CrossEntropyLoss()
        self.box_loss_fn = nn.SmoothL1Loss()

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
                #transforms.RandomResizedCrop(64),
                #transforms.RandomRotation(degrees=(270, 270)),
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
        normalize = transforms.Normalize(mean=[0.485, 0.456, 0.406],
                                         std=[0.229, 0.224, 0.225])

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

    def _train(self, model, first_step):
        learning_rate = 0.001
        alpha = 0.9
        epsilon = 1e-06
        momentum = 0.9
        weight_decay = 0

        optimizer = optim.SGD(model.parameters(), lr=learning_rate, momentum=momentum)
        optim.lr_scheduler.StepLR(optimizer, step_size=7, gamma=0.1)
        #optimizer = optim.Adam(model.parameters(), lr=learning_rate)

        steps = []
        gc.collect()
        data_iter = iter(self.train_loader)
        train_loss = 0.0
        model.train()
        for i, (input, target, bounding_box) in enumerate(data_iter):
            if i == 0:
                self.input_example = input
            optimizer.zero_grad()
            if first_step:
                class_out = model(input)
                print(class_out.shape, torch.amax(class_out, 1))
                loss_class = self.class_loss_fn(class_out, target)
                current_loss = loss_class
            else:
                class_out, box_out = model(input)
                print(class_out.shape, torch.amax(class_out, 1))
                loss_class = self.class_loss_fn(class_out, target)
                loss_box = self.box_loss_fn(box_out, bounding_box)
                current_loss = 0.9 * loss_class + 0.1 * loss_box

            current_loss.backward()
            optimizer.step()

            train_loss += current_loss.item() * input.size(0)

            print(f'train classif batch {i} loss {current_loss.item() * input.size(0)}')
            steps.append({'train_loss': train_loss})
            gc.collect()

        train_loss /= len(self.train_loader.dataset)
        return train_loss, steps

    def _validation(self, model, first_step=True):
        model.eval()
        val_loss = 0.0
        gc.collect()
        data_iter = iter(self.val_loader)
        with torch.no_grad():
            for i, (input, target, bounding_box) in enumerate(data_iter):
                if first_step:
                    class_out = model(input)
                    loss_class = self.class_loss_fn(class_out, target)
                    current_loss = loss_class
                else:
                    class_out, box_out = model(input)
                    loss_class = self.class_loss_fn(class_out, target)
                    loss_box = self.box_loss_fn(box_out, bounding_box)
                    current_loss = 0.9 * loss_class + 0.1 * loss_box

                val_loss += current_loss.item() * input.size(0)

                print(f'validacao batch {i} loss {current_loss.item() * input.size(0)}')
                gc.collect()
        val_loss /= len(self.val_loader.dataset)
        return val_loss

    def train(self, model, num_epoch, first_step=True):
        self.save_classes(f"classes_modelo.txt")
        best_loss = float('inf')
        counter = 0
        train_data_classes = {'train': {}, 'val': {}}
        for epoch in range(num_epoch):
            print(f'epoch {epoch}')
            gc.collect()

            train_loss, steps = self._train(model, first_step)
            print(f'Treino loss {train_loss}')
            train_data_classes['train'][epoch] = {'train_loss': train_loss, 'steps': steps}

            val_loss = self._validation(model, first_step)
            train_data_classes['val'][epoch] = val_loss

            model_type = 'classification' if first_step else 'classification_box'
            torch.onnx.export(model, self.input_example[0:1, :, :, :], f'resnet_modelo_{epoch}_{model_type}.onnx')

            self.graph_results(train_data_classes)

            if val_loss < best_loss:
                best_loss = val_loss
                counter = 0
            else:
                counter += 1
            if counter >= self.patience:
                print(f'Early stopping. No improvement in {epoch} epochs.')
                break
        print(f'Validacao loss {val_loss}')
        train_data_classes['validation_classe'] = {'val_loss': val_loss}

    def graph_results(self, train_data_classes):
        x = sorted([epoch_ for epoch_ in train_data_classes['train'].keys()])

        y_looss_train = [train_data_classes['train'][epoch_]['train_loss'] for epoch_ in x]
        y_looss_val = [train_data_classes['val'][epoch_] for epoch_ in x]

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
            json.dump(train_data_classes, f)




