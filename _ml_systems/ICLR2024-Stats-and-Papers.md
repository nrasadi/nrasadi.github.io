---
title: "ICLR 2024: Numbers and My To Be Read List"
date: 2024-05-27
photo:
  # link: 
  # caption: 
categories: 
  - Paper 
tags: [Machine Learning, Conference Summary]
visible: true
---

The twelfth International Conference on Learning Representations (ICLR 2024) took place during the second week of May in Vienna, Austria. ICLR is widely recognized as one of the premier conferences in the field of machine learning, with a high volume of submissions annually. This post will first present the conference key statistics, followed by a list of papers that received outstanding paper awards and honorable mentions. Lastly, a selection of papers that I find intriguing, based solely on their titles and abstracts, with a few exceptions, will be shared.

### Conference Numbers

Here is the [ICLR '24](https://media.iclr.cc/Conferences/ICLR2024/ICLR2024-Fact_Sheet.pdf) stats:

- Submitted papers: **7262**
- Accepted paper: **2260**
- Acceptance rate: **31%**
- Papers selected for oral talk: **86 (3.8% of accepted papers)**
- Papers selected as the "spotlight posters": **366 (16.2% of the accepted papers)**
- Number of reviewers: **8950**
{: .info}

If you are not familiar with the major machine learning conferences, the aforementioned figures provide a sense of their magnitude and organizational intricacy. This level of magnitude also brings unique challenges. For example, a large number of reviewers are required, some of whom may be undergraduate students who have previously published in these conferences. This situation could potentially result in some inconsistent or unpredictable decisions.

{:toc}

### Outstanding Paper Awards

- Generalization in diffusion models arises from geometry-adaptive harmonic representations
- Learning Interactive Real-World Simulators
- Never Train from Scratch: Fair Comparison of Long-Sequence Models Requires Data-Driven Priors
- Protein Discovery with Discrete Walk-Jump Sampling
- Vision Transformers Need Registers

### Honorable Mentions

- Amortizing intractable inference in large language models
- Approximating Nash Equilibria in Normal-Form Games via Stochastic Optimization
- Beyond Weisfeiler-Lehman: A Quantitative Framework for GNN Expressiveness
- Flow Matching on General Geometries
- Is ImageNet worth 1 video? Learning strong image encoders from 1 long unlabelled video
- Meta Continual Learning Revisited: Implicitly Enhancing Online Hessian Approximation via Variance Reduction
- Model Tells You What to Discard: Adaptive KV Cache Compression for LLMs
- Proving Test Set Contamination in Black-Box Language Models
- Robust agents learn causal world models
- The mechanistic basis of data dependence and abrupt learning in an in-context classification task
- Towards a statistical theory of data selection under weak supervision 

### My TBR List

Here are the papers that initially caught my interest, selected based on their titles and abstracts. As my analysis progresses, this list may subsequently shrink.

| Title  | Category | Misc.  |
| ------ | -------- | ------ |
| Towards a Statistical Theory of Data Selection under Weak Supervision | `Efficient ML`, `Data Manipulation` | [PDF](https://openreview.net/pdf?id=HhfcNgQn6p) |
| Tackling the Data Heterogeneity in Asynchronous Federated Learning with Cached Update Calibration | `Federated Learning`, `Data Manipulation` | [PDF](https://openreview.net/pdf?id=4aywmeb97I) |
| Sparse Model Soups: A Recipe for Improved Pruning via Model Averaging | `Efficient ML` | [PDF](https://openreview.net/pdf?id=xx0ITyHp3u) |
| Sparse Spiking Neural Network: Exploiting Heterogeneity in Timescales for Pruning Recurrent SNN | `Spiking Neural Network`, `Efficient ML` | [PDF](https://openreview.net/pdf?id=0jsfesDZDq) |
| The Need for Speed: Pruning Transformers with One Recipe | `Efficient ML` | [PDF](https://openreview.net/pdf?id=MVmT6uQ3cQ) |
| Towards Energy Efficient Spiking Neural Networks: An Unstructured Pruning Framework | `Efficient ML`, `Spiking Neural Network` | [PDF](https://openreview.net/pdf?id=eoSeaK4QJo) |
| VONet: Unsupervised Video Object Learning With Parallel U-Net Attention and Object-wise Sequential VAE | `Efficient ML` | [PDF](https://arxiv.org/pdf/2401.11110) |
| Zero Bubble Pipeline Parallelism | `Efficient ML` | [PDF](https://openreview.net/pdf?id=tuzTN0eIO5) |
| FlashAttention-2: Faster Attention with Better Parallelism and Work Partitioning | `Efficient ML` | [PDF](https://arxiv.org/pdf/2307.08691) |
| SRL: Scaling Distributed Reinforcement Learning to Over Ten Thousand Cores | `Scalable ML`, `Reinforcement Learning` | [PDF](https://openreview.net/pdf?id=lajn1iROCu) |
| Proving Test Set Contamination in Black-Box Language Models | `Attacks and Countermeasures`, `LLM` | [PDF](https://openreview.net/pdf?id=KS8mIvetg2) |
| Cleanba: A Reproducible and Efficient Distributed Reinforcement Learning Platform | `Reinforcement Learning`, `Scalable ML` | [PDF](https://arxiv.org/pdf/2310.00036) |
| Backdoor Federated Learning by Poisoning Backdoor-Critical Layers | `Attacks and Countermeasures`, `Federated Learning` | [PDF](https://openreview.net/pdf?id=AJBGSVSTT2) |
| FedP3: Federated Personalized and Privacy-friendly Network Pruning under Model Heterogeneity | `Federated Learning`, `Scalable ML` | [PDF](https://openreview.net/pdf?id=hbHwZYqk9T) |
| Understanding Convergence and Generalization in Federated Learning through Feature Learning Theory | `Federated Learning` | [PDF](https://openreview.net/pdf?id=EcetCr4trp) |
| Federated Wasserstein Distance | `Federated Learning`, `Data Manipulation` | [PDF](https://openreview.net/pdf?id=rsg1mvUahT) |
| Enhancing One-Shot Federated Learning Through Data and Ensemble Co-Boosting | `Federated Learning`, `Data Manipulation` | [PDF](https://openreview.net/pdf?id=tm8s3696Ox) |
| FedDA: Faster Adaptive Gradient Methods for Federated Constrained Optimization | `Federated Learning`, `Efficient ML` | [PDF-short](https://openreview.net/attachment?id=kjn99xFUF3&name=pdf) - [PDF-long](https://arxiv.org/pdf/2302.06103) |
| FedCDA: Federated Learning with Cross-Rounds Divergence-Aware Aggregation | `Federated Learning`, `Efficient ML` | [PDF](https://openreview.net/pdf?id=nbPGqeH3lt) |
| Federated Q-Learning: Linear Regret Speedup with Low Communication Cost | `Federated Learning`, `Reinforcement Learning`, `Scalable ML` | [PDF](https://openreview.net/pdf?id=fe6ANBxcKM) |
| Fake It Till Make It: Federated Learning with Consensus-Oriented Generation | `Federated Learning`, `Data Manipulation`, `Knowledge Distillation` | [PDF](https://openreview.net/pdf?id=NY3wMJuaLf) |
| FedInverse: Evaluating Privacy Leakage in Federated Learning | `Federated Learning`, `Attacks and Countermeasures` | [PDF](https://openreview.net/pdf?id=nTNgkEIfeb) |
| A Mutual Information Perspective on Federated Contrastive Learning | `Federated Learning`, `Unsupervised Learning` | [PDF](https://openreview.net/pdf?id=JrmPG9ufKg) |
| Incentivized Truthful Communication for Federated Bandits | `Federated Learning`, `Attacks and Countermeasures` | [PDF](https://openreview.net/pdf?id=ykEixGIJYb) |
| Federated Orthogonal Training: Mitigating Global Catastrophic Forgetting in Continual Federated Learning | `Federated Learning`, `Continuous Learning` | [PDF](https://arxiv.org/pdf/2309.01289) |
| Hiding in Plain Sight: Disguising Data Stealing Attacks in Federated Learning | `Federated Learning`, `Attacks and Countermeasures` | [PDF](https://arxiv.org/pdf/2306.03013) |
| Momentum Benefits Non-IID Federated Learning Simply and Provably |  `Federated Learning`, `Efficient ML` | [PDF](https://arxiv.org/pdf/2306.16504) |
| FedHyper: A Universal and Robust Learning Rate Scheduler for Federated Learning with Hypergradient Descent | `Federated Learning`, `Efficient ML` | [PDF](https://openreview.net/pdf?id=Kl9CqKf7h6) |
| FedCompass: Efficient Cross-Silo Federated Learning on Heterogeneous Client Devices Using a Computing Power-Aware Scheduler | `Federated Learning`, `Efficient ML` | [PDF](https://openreview.net/pdf?id=msXxrttLOi) |
| Adversarial Feature Map Pruning for Backdoor | `Attacks and Countermeasures` | [PDF](https://openreview.net/pdf?id=IOEEDkla96) |
