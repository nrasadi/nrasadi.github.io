---
title: "Simurgh: Multi-Agent Adversarial Benchmarking for Proactive Microservice Observability"
tags: "Cloud Computing, Deep Learning, Distributed Systems, Adversarial Benchmarking, Containers, Orchestration, Scalability,  Anti-Patterns, Microservices, Autoscaling, ML Applications, Performance Evaluation, Resource Allocation"
authors: "Navidreza Asadi*, Răzvan-Mihai Ursu*, Leon Wong, Wolfgang Kellerer"
type: "c"
place: "ACM SIGCOMM 2025 Next-Generation Network Observability Workshop (SIGCOMM-NGNO 2025)"
date: "2025/09/09"
# status: "a"
# award: "Best Poster Award"
pdf: https://dl.acm.org/doi/pdf/10.1145/3748496.3748991
link: "https://dl.acm.org/doi/abs/10.1145/3748496.3748991"
bibtex: "
@inproceedings{asadi2025simurgh,
  title={Simurgh: Multi-Agent Adversarial Benchmarking for Proactive Microservice Observability},
  author={Asadi, Navidreza and Ursu, Răzvan-Mihai and Wong, Leon and Kellerer, Wolfgang},
  booktitle={Proceedings of the 1st Workshop on Next-Generation Network Observability at ACM SIGCOMM 2025},
  pages={21--28},
  year={2025}
}
"
misc:
    - title: "* Equal Contribution"
    - title: "Acceptance Rate: 33% (lowest among all workshops at SIGCOMM 2025)"
---
Microservices autoscaling is essential for dynamically adjusting resources to meet fluctuating workload demands to maintain service-level objectives (SLO), such as latency, while minimizing resource usage. However, the control logic of modern autoscalers is susceptible to exploitation. Assessing its performance requires more than passive monitoring; the rapid evolution of application development has outpaced the availability of observability tools to benchmark and identify corner cases in autoscaling configurations relative to an application's behavior. In this work, we aim to address a critical yet underexplored question: Can we systematically identify adversarial inputs, i.e., traffic anti-patterns that disproportionately increase SLO violations or operational costs---or both? We propose an adversarial benchmarking framework designed to generate traffic patterns tailored for finding autoscaling anti-patterns. It evolves strategies based on real-time observability signals from both the application and infrastructure layers. This problem is inherently complex due to its large solution space. To address this, we introduce heuristics that relax the problem while leveraging multiple parallel systems, each paired with a local controller and optimizer. These controllers act as individual agents being managed by a global controller, asynchronously generate diverse traffic patterns while collectively optimizing toward a shared adversarial objective. We evaluate our framework on two applications and three optimization methods. Our preliminary empirical results illustrate its effectiveness and suggest a good degree of generalizability.
