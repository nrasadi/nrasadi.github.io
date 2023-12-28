---
title: "Variant Parallelism: Lightweight Deep Convolutional Models for Distributed Inference on IoT Devices"
tags: "Edge Computing, Deep Learning, Distributed Systems, Distributed Deep Learning, Efficient Deep Learning, Scalable Deep Learning"
authors: "Navidreza Asadi, Maziar Goudarzi"
type: "j"
place: "IEEE Internet of Things Journal"
date: "2023/12/01"
IF: 10.6
# status: "a"
pdf: "https://arxiv.org/pdf/2210.08376.pdf"
link: "https://ieeexplore.ieee.org/abstract/document/10153399"
bibtex: "
@article{asadi2023variant,   
  title={Variant Parallelism: Lightweight Deep Convolutional Models for Distributed Inference on IoT Devices},   
  author={Asadi, Navidreza and Goudarzi, Maziar},    
  journal={IEEE Internet of Things Journal},    
  year={2023},    
  publisher={IEEE},    
  doi={10.1109/JIOT.2023.3285877},    
  url={https://ieeexplore.ieee.org/abstract/document/10153399}    
}
"
---
Two major techniques are commonly used to meet real-time inference limitations when distributing models across resource-constrained IoT devices: (1) model parallelism (MP) and (2) class parallelism (CP). In MP, transmitting bulky intermediate data (orders of magnitude larger than input) between devices imposes huge communication overhead. Although CP solves this problem, it has limitations on the number of sub-models. In addition, both solutions are fault intolerant, an issue when deployed on edge devices. We propose variant parallelism (VP), an ensemble-based deep learning distribution method where different variants of a main model are generated and can be deployed on separate machines. We design a family of lighter models around the original model, and train them simultaneously to improve accuracy over single models. Our experimental results on six common mid-sized object recognition datasets demonstrate that our models can have $$5.8-7.1{\times}$$ fewer parameters, $$4.3-31{\times}$$ fewer multiply-accumulations (MACs), and $${2.5-13.2{\times}}$$ less response time on atomic inputs compared to MobileNetV2 while achieving comparable or higher accuracy. Our technique easily generates several variants of the base architecture. Each variant returns only $$2k$$ outputs $$1 \le k \le ({\frac{1}{2}\#classes})$$, representing Top-k classes, instead of tons of floating point values required in MP. Since each variant provides a full-class prediction, our approach maintains higher availability compared with MP and CP in presence of failure.