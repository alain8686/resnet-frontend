import torch
import torch.nn as nn
import torch.optim as optim
from model.resnet.ResNetImp import ResNet
from model.resnet.block.Block import BasicBlock
#from model.TreinableImp import Treinable
from model.Treinable import Treinable
from model.resnet.ResNet import model
from model.resnet.ResNet import ClassBox

batch_zise = 64
t = Treinable('tinyImage/train', 'tinyImage/val', batch_zise)

num_classes = 200
num_features = model.fc.in_features
model.fc = ClassBox(num_classes, 4, num_features) # nn.Linear(num_features, num_classes) #
#model = ResNet(BasicBlock, [4, 4, 8, 8], num_classes)

num_epoch = 1000
t.train(model, num_epoch, False)

# for param in model.parameters():
#     param.requires_grad = False
# model.fc = ClassBox(num_classes, 4, num_features)
# t.train(model, num_epoch, False)
