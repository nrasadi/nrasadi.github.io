---
title: "Adaptive Decentralized Federated Gossip Learning for Resource-Constrained IoT Devices"
tags: "Decentralized Federated Learning, Gossip Learning, Communication Efficient, Embedded Systems, Microcontroller, Adaptive Learning Rate"
authors: "Lars Wulfert, Navidreza Asadi, Wen-Yu Chung, Christian Wiede, Anton Grabmaier"
type: "c"
place: "The 19th International Conference on emerging Networking EXperiments and Technologies (CoNEXT '23), <br> 4th International
Workshop on Distributed Machine Learning (DistributedML '23)"
date: "2023/12"
# status: "a"
# pdf: "https://mediatum.ub.tum.de/doc/1722633/document.pdf"
# link: "https://ieeexplore.ieee.org/abstract/document/10175422"
---
With the increasing number of internet of things devices and the ability to enhance data privacy using federated learning (FL), there is a growing interest in exploring FL on resource-constrained devices. Centralized FL uses a central server (CS), which can lead to privacy issues, poor scalability, and high communication costs. To address these challenges, decentralized federated learning (DFL) has been proposed, which allows FL without a CS. To keep the communication cost low in DFL the gossip protocol can be used, where random clients exchange their models. However, this may result in slower convergence and lower accuracy. To overcome these limitations, we present AdaStair, a static method, and AdaLoss, a dynamic method that adaptively adjusts the learning rate of each client in a decentralized manner. Additionally, we modify the communication protocol of GossipFL and add quantization to further reduce the communication cost. We demonstrate the robustness of these methods in both simulations and real-world evaluations using microcontroller units in a partial WiFi ad-hoc mesh network. Our experimental results show that AdaStair and AdaLoss can improve accuracy up to 19 % and reduce communication costs by up to 57 % using a quantization scheme compared to a segmented gossip method.