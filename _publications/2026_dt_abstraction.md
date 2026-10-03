---
title: "On Abstraction Trade-Offs in Data-Driven Performance Modeling of Multi-Tier Microservices"
tags: "Cloud Computing, Digital Twins, Learning (Artificial Intelligence), Resource Allocation, Kubernetes, Simulation, Prective Models, Chained Services, Performance Modeling, Data-Driven Approaches"
authors: "Răzvan-Mihai Ursu, Navidreza Asadi, Wolfgang Kellerer"
type: "c"
place: "17th International Conference on Network of the Future (NoF 2026)"
date: "2026/10/01"
# status: "a"
award: "Best Paper Award"
# pdf: ""
# link: ""
bibtex: |
  @inproceedings{ursu2026abstraction,
    title={On Abstraction Trade-Offs in Data-Driven Performance Modeling of Multi-Tier Microservices},
    author={Ursu, Răzvan-Mihai and Asadi, Navidreza and Kellerer, Wolfgang},
    booktitle={17th International Conference on Network of the Future (NoF 2026)},
    address={Rome, Italy},
    year={2026}
  }
---
Microservice architectures underpin modern cloud-native network control planes, including the 5G Core Network and the O-RAN RAN Intelligent Controller, where efficient operation is essential for meeting performance targets, while reducing costs at scale. Improving this efficiency requires tools that let operators reason about system behavior before committing to a configuration. Despite being a straightforward solution, traditional request-level simulation approaches quickly become too slow for large-scale systems, due to the high number of concurrent requests. Data-driven performance models have emerged as a high-level, more scalable alternative: they use machine learning (ML) to learn input-output relationships between Key Performance Metrics (KPMs) directly from observed system behavior. Before applying such approaches to critical network control planes, it is important to understand how they generalize beyond individual microservices, to even simple multi-tier architectures with inter-service dependencies and per-service autoscaling.
In this work, we propose and evaluate two data-driven end-to-end modeling approaches for multi-tier applications, named the Joint Model and the Global Model, which differ in their degree of architectural abstraction. Both approaches are designed to predict operational KPMs, including end-to-end request completion time and resource consumption over long horizons. We evaluate their accuracy across two representative microservice applications, with two underlying ML model families.
Our results show that the Joint Model and Global Model achieve comparable predictive performance and are relatively insensitive to the choice of forecasting model. The Joint Model offers greater modularity and flexibility, but is more sensitive to inaccuracies in inter-service traffic prediction, which can propagate along the function call chain. The Global Model exhibits similar accuracy, but requires retraining when services change. Overall, our findings suggest that a Joint Model approach is better suited for accurate and modular performance modeling, provided that inter-service traffic is represented accurately.
