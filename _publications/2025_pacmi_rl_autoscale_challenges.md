---
title: "Challenges in Designing Robust RL-Based Autoscalers"
tags: "Cloud Computing, Reinforcement Learning, Deep Learning, Distributed Systems, Adversarial Benchmarking, Containers, Orchestration, Scalability,  Anti-Patterns, Microservices, Autoscaling, ML Applications, Performance Evaluation, Resource Allocation, Partial Observability, Non-Stationary Environments"
authors: "Navidreza Asadi*, Dalal Ali*, Răzvan-Mihai Ursu, Wolfgang Kellerer"
type: "c"
place: "ACM SOSP 2025 Practical Adoption Challenges of ML for Systems Workshop (SOSP-PACMI '25)"
date: "2025/10/13"
status: "a"
# award: "Best Poster Award"
pdf: https://dl.acm.org/doi/pdf/10.1145/3766882.3767176
link: "https://dl.acm.org/doi/abs/10.1145/3766882.3767176"
bibtex: "
@inproceedings{asadi2025challenges,
  title={Challenges in Designing Robust RL-Based Autoscalers},
  author={Asadi, Navidreza and Ali, Dalal and Ursu, Razvan-Mihai and Kellerer, Wolfgang},
  booktitle={ACM SOSP 2025 Proceedings of the 4th Workshop on Practical Adoption Challenges of ML for Systems},
  pages={44--49},
  year={2025}
}
"
misc:
    - title: "* Equal Contribution"
---
Reinforcement learning (RL) offers a promising, adaptive alternative to heuristic-based autoscaling, yet its practical adoption in production environments remains negligible. In this paper, we argue that this gap between promise and practice is caused by three systemic challenges that violate fundamental RL assumptions: (i) generalization failures under workload and system drift; (ii) orchestration interference that obscures causality; and (iii) unreliable, delayed metric feedback. We substantiate these claims through an empirical study of two PPO-based autoscalers on real-world and synthetic workloads, demonstrating how these factors lead to policy instability and performance degradation. Our findings reveal that these challenges collectively frame autoscaling as a Partially Observable Markov Decision Process. We conclude that robust RL-based autoscaling requires a paradigm shift from purely algorithmic solutions toward systems-aware designs that model the partial observability and non-stationarity inherent in service autoscaling.
