import torch
import torch.nn as nn
import torchvision.models as models
from model.resnet.block.NormalizationLayer import Normalization


class Gelu(nn.Module):
    def forward(self, x):
        return torch.nn.functional.gelu(x)


class ClassBox(nn.Module):
    def __init__(self, num_classes, box_size, num_features):
        super(ClassBox, self).__init__()
        self.classification_fc = nn.Sequential(nn.Linear(num_features, num_classes), nn.ReLU())
        layers = [nn.Linear(num_features, num_features // 2), nn.ReLU(),
                  nn.Linear(num_features // 2, num_features // 4), nn.ReLU(),
                  nn.Linear(num_features // 4, box_size), nn.ReLU()]
        self.box_detection_fc = nn.Sequential(*layers)

    def forward(self, x):
        box_out = self.box_detection_fc(x)
        class_out = self.classification_fc(x)

        return class_out, box_out


def replace_relu_with_gelu(module):
    for name, child in module.named_children():
        if isinstance(child, nn.ReLU):
            setattr(module, name, Gelu())
        elif isinstance(child, nn.BatchNorm2d):
            batch_norm: nn.BatchNorm2d = child
            setattr(module, name, Normalization(batch_norm.num_features))
        else:
            replace_relu_with_gelu(child)


model = models.resnet18(pretrained=False)
replace_relu_with_gelu(model)
