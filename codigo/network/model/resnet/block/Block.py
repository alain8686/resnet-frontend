import torch.nn as nn
#from .NormalizationLayer import Normalization
from torch.nn import BatchNorm2d as Normalization


class BasicBlock(nn.Module):
    def __init__(self, in_channels, out_channels, stride=1):
        super(BasicBlock, self).__init__()
        self.conv1 = nn.Conv2d(in_channels, out_channels, kernel_size=3, stride=stride, padding=1, bias=False)
        self.bn1 = Normalization(out_channels)
        self.gelu1 = nn.GELU()
        self.gelu2 = nn.GELU()
        self.conv2 = nn.Conv2d(out_channels, out_channels, kernel_size=3, stride=1, padding=1, bias=False)
        self.bn2 = Normalization(out_channels)

        if stride != 1 or in_channels != out_channels:
            self.residual_transform = nn.Sequential(
                nn.Conv2d(in_channels, out_channels, kernel_size=1, stride=stride, bias=False),
                Normalization(out_channels)
            )
        else:
            self.residual_transform = nn.Identity()

    def forward(self, x):
        residual = x

        out = self.conv1(x)
        out = self.bn1(out)
        out = self.gelu1(out)

        out = self.conv2(out)
        out = self.bn2(out)

        out += self.residual_transform(residual)
        out = self.gelu2(out)

        return out
