---
title: "KAPETÁNIOS: Automated Kubernetes Adaptation through a Digital Twin"
tags: "Kubernetes, Digital Twin, Machine Learning, Horizontal Pod Autoscaler"
authors: "Johannes Zerwas, Patrick Kramer, Razvan-Mihai Ursu, Navidreza Asadi, Phil Rodgers, Leon Wong, Wolfgang Kellerer"
date: "2022/10"
type: "c"
place: "13th International Conference on Network of the Future (NoF)"
link: "https://ieeexplore.ieee.org/abstract/document/9942649"
pdf: "https://mediatum.ub.tum.de/doc/1688820/gim5xe6m2sd5ayda00gc07ntw.TUM_paper_nof2022(1).pdf"
---
We present a self-operating Kubernetes (K8s) cluster that uses digital twinning and machine learning to autonomously adapt its Horizontal Pod Autoscaler (HPA) to workload changes. The demo uses a digital twin of a K8s cluster to gather performance statistics and learn a model for the workload. With the model, the cluster autonomously adjusts HPA parameters for better performance. The demo illustrates this process and shows that the requested pod seconds decrease by ∼37%, while the request latency stays mostly unaffected.