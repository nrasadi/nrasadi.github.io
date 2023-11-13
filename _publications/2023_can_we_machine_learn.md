---
title: "Towards Digital Network Twins: Can We Machine Learn Network Function Behaviors?"
tags: "Cloud Computing, Digital Twins, Learning (Artificial Intelligence), Resource Allocation, Kubernetes"
authors: "Răzvan-Mihai Ursu, Johannes Zerwas, Patrick Krämer, Navidreza Asadi, Phil Rodgers, Leon Wong, Wolfgang Kellerer"
type: "c"
place: "IEEE 9th International Conference on Network Softwarization (NetSoft)"
date: "2023/04"
# status: "a"
# pdf: "https://ieeexplore.ieee.org/abstract/document/10175422"
link: "https://ieeexplore.ieee.org/abstract/document/10175422"
---
Cluster orchestrators such as Kubernetes (K8s) provide many knobs that cloud administrators can tune to conFigure their system. However, different configurations lead to different levels of performance, which additionally depend on the application. Hence, finding exactly the best configuration for a given system can be a difficult task. A particularly innovative approach to evaluate configurations and optimize desired performance metrics is the use of Digital Twins (DT). To achieve good results in short time, the models of the cloud network functions underlying the DT must be minimally complex but highly accurate. Developing such models requires detailed knowledge about the system components and their interactions. We believe that a data-driven paradigm can capture the actual behavior of a network function (NF) deployed in the cluster, while decoupling it from internal feedback loops. In this paper, we analyze the HTTP load balancing function as an example of an NF and explore the data-driven paradigm to learn its behavior in a K8s cluster deployment. We develop, implement, and evaluate two approaches to learn the behavior of a state-of-the-art load balancer and show that Machine Learning has the potential to enhance the way we model NF behaviors.
