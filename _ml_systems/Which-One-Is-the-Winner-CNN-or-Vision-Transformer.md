---
title: Which One Is the Winner CNN or Vision Transformer?
date: 2023-11-27
photo:
  # link: 
  # caption: 
categories: 
  - Paper 
tags: [Scalable Machine Learning, Vision Transformers (ViT), Convolutional Neural Networks (CNN)]
visible: true
---

Deep learning advancements was started with recurrent neural networks like LSTM in 90s, later blown up with CNNs in ~2010 and grown to another level with Transformers in 2017. Since the emergence of Vision Transformers (ViTs) around 2020, there has always been a debate between ConvNet fans (who design, develop and support convolutional neural networks) and foundational models fans (who believe transformers are all you need) around which architecture performs better in terms of achievable accuracy, scalability and accuracy:compute ratio.

[ConvNets Match Vision Transformers at Scale](https://arxiv.org/abs/2310.16764), 2023
{: .download}

Transformer-based architectures have shown quite satisfying performance in learning complicated patterns when being scaled-up with **data**; that is the key to their major success.
Other aspects such as robustness over out-of-distribution samples, feature transferability, performance on multi-modal data/tasks, training in self-supervised regimes, etc. have been investigated as well.

This short paper from Google Deepmind tries to empirically find an answer to this question:   
_Given the same predetermined compute budget, which architecture performs better in terms of accuracy on a vision task, ConvNets or ViTs?_
{: .info}

Their results show that both architectures perform pretty much similarly.
Moreover, CNNs follow log-log scaling laws which was previously observed in Transformers.
Similar results were shown previously in 2021 (I guess; I will add refs if I remember the paper's title).

Immediate expectation is to see a flood of papers on vision tasks in the near future exploring and comparing ConvNets and Transformers in the following categories:

- C1: Why does this happen? Which one does perform better and when? As well as more theoretical papers on the ability of CNNs to find local patterns and local correlations versus the ability of Transformers on different permutations of data.
- C2: More efforts on hybrid architectures.
- C3: Comparing their performance on other metrics, as previously mentioned; that is not new but might draw even more attention than before.
- C4: Possibility of applying very large CNNs on other tasks; although pure CNN architectures are unlikely to achieve comparable results on other tasks.

Researchers in other communities, and Networked Systems in particular, are _rationally_ a few years behind as they are more concerned with more mature applications of such models and are still mainly working on developing networks for CNN-based architectures and designing architectures based on CNNs and RNNs.

Since the last couple of years we are observing more and more papers around developing systems and networks for training, fine-tuning and serving foundation models to an extent that some were anticipating a complete shift in these domains so that in a few years from now, any optimizations over CNN models draw little to no attention. Results like the one above or similar ones in the future might lead to new investigations around developing systems for _very large_ CNNs.

On the other hand, when it comes to ML for systems, data scarcity is a big challenge which in many cases lead researchers not to consider Transformers as a good choice, and other architectures (or even conventional ML methods) seem to play a bigger role.