---
title: "Comparative Analysis Between Decentralized and Centralized Network Digital Twins of Kubernetes Clusters"
tags: "Cloud Computing, Digital Twins, Learning (Artificial Intelligence), Resource Allocation, Kubernetes"
authors: "Răzvan-Mihai Ursu, Navidreza Asadi, Johannes Zerwas, Leon Wong, Wolfgang Kellerer"
type: "c"
place: "11th IEEE International Conference on Network Softwarization (NetSoft 2025)"
date: "2025/05"
# status: "a"
# pdf: ""
# link: ""
bibtex: "@inproceedings{centralized_decentralized_dt2025,
  title={Comparative Analysis Between Decentralized and Centralized Network Digital Twins of Kubernetes Clusters},
  author={Ursu, Răzvan-Mihai and Asadi, Navidreza and Zerwas, Johannes and Wong, Leon and Kellerer, Wolfgang},
  booktitle={11th IEEE International Conference on Network Softwarization (NetSoft 2025)},
  year={2025},
}"
---
In the realm of cluster operation, continuously validating and optimizing the configuration requires access to accurate cluster behavioral models. Network Digital Twins (NDTs) have emerged as a paradigm to provide such accurate, live representations of network systems. To capture the live state, NDTs need to anticipate the cluster behavior in a faster than real-time manner. With increasingly complex clusters, classical NDTs relying on detailed handcrafted simulators become too slow to fulfill this task. Leveraging measurements from the actual system demonstrates the potential to create more highlevel, lightweight NDTs that are still fairly accurate. Nonetheless, the degree of abstraction required to create fast and accurate data-driven NDTs is not well understood. To address this, our work investigates the impact of different abstraction levels on modeling accuracy. We develop and compare three Network Digital Twins of a Kubernetes Cluster - a Twin based on a Handcrafted Simulator, a Decentralized Data-driven Twin, abstracting individual system components, and a Centralized Data-driven Twin, abstracting the system as a whole. Our results show that Data-driven Twins improve the performance prediction by 18-53% over the handcrafted one, with the Centralized Twin surpassing the Decentralized Twin in accuracy by 35% and speed by two orders of magnitude.
