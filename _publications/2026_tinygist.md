---
title: "Adaptive Segmented Decentralized Federated Learning on Tiny Devices"
tags: "Decentralized Federated Learning, Gossip Learning, Communication Efficient, Embedded Systems, Microcontroller, Adaptive Learning Rate, Digital Twins, Scalable Systems"
authors: "Navidreza Asadi, Lars Wulfert, Chi Xia, Halil İbrahim Bengü, Hendrik Wöhrle, Wolfgang Kellerer"
type: "c"
place: "ACM MobiCom 2026"
date: "2026/12/28"
# date: "2026/10/28"
# status: "a"
# award: "Best Paper Award"
pdf: "https://doi.org/10.1145/3795866.3844490"
link: "https://tinygist.github.io"
code: "https://github.com/TinyGist/tinyGist"
video: "https://tinygist.github.io/#video"
misc:
    - title: "Acceptance Rate: 14%"
bibtex: |
  @inproceedings{asadi2026tinygist,
    author    = {Asadi, Navidreza and Wulfert, Lars and Xia, Chi and Beng{\"u}, Halil Ibrahim and W{\"o}hrle, Hendrik and Kellerer, Wolfgang},
    title     = {Adaptive Segmented Decentralized Federated Learning on Tiny Devices},
    booktitle = {Proceedings of the 32nd Annual International Conference on Mobile Computing and Networking},
    series    = {MobiCom '26},
    year      = {2026},
    month     = oct,
    location  = {Austin, TX, USA},
    publisher = {Association for Computing Machinery},
    address   = {New York, NY, USA},
    isbn      = {9798400725050},
    doi       = {10.1145/3795866.3844490}
  }
---
We present tinyGist, an efficient decentralized federated learning framework designed for tiny microcontrollers. Instead of treating all model parameters equally, each device exchanges a portion of them, effectively sharing a "gist" of the information. Our major contributions are: (1) segment model parameters based on their importance, while identifying the most impactful updates, (2) share the gist probabilistically, maintaining model diversity while ensuring fast knowledge propagation across peers, (3) update models based on the information merit received from other neighbors, and (4) adaptive learning. We implement tinyGist across various simulation experiments, large-scale realistic emulation with hundreds of devices, and real deployment on homogeneous and heterogeneous physical microcontroller clusters. Evaluated on eight machine learning models and 15 tasks, tinyGist outperforms existing baselines in convergence speed by 1.35-3.3× and accuracy by up to 17%, while reducing communication overhead by ≈3× compared to the full-model baselines. We further validate our lightweight importance proxy against gradient-, Fisher-, and Hessian-based measures, and characterize how tinyGist interacts with differential privacy and secure aggregation.
