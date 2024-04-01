import torch
import torch.nn as nn


class Normalization(nn.Module):
    def __init__(self, num_channels):
        super(Normalization, self).__init__()
        self.num_channels = num_channels
        self.weight = nn.Parameter(torch.ones(1, num_channels, 1, 1))
        self.bias = nn.Parameter(torch.zeros(1, num_channels, 1, 1))

    def forward(self, x):
        norm = torch.norm(x, p=2, dim=1, keepdim=True)
        normalized_tensor = x.div(norm)

        return self.weight * normalized_tensor + self.bias

