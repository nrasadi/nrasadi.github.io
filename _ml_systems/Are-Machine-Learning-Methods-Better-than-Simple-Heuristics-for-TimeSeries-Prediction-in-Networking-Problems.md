---
title: Are Machine Learning Methods Better than Simple Heuristics for Time Series Prediction in Networking Problems?
date: 2023-12-01
photo:
  # link: 
  # caption: 
categories: 
  - Paper 
tags: [Machine Learning for Network, LSTM, Cloud Computing, Time Series Forecasting]
visible: true
---

Machine learning methods and in particular deep learning have paved their way to many other computer science domains, and research around networked systems is not an exception. One key challenge which to some extent is shared between a considerable number of networks and systems tasks is forecasting different kinds of time series. Incoming traffic, metrics extracted from the system conditions during a time period, and/or events in different granularities are a few to mention.

[Is Machine Learning Necessary for Cloud Resource Usage Forecasting?](https://dl.acm.org/doi/10.1145/3620678.3624790), ACM SoCC'23
{: .download}

Before the emergence of Transformers, recurrent neural networks (RNNs), based on architectures such as gated recurrent units (GRUs) or long short term memories (LSTMs) were generally a go-to option when it comes to finding temporally correlated patterns, and they have not lost their presence in networked systems solutions potentially due to their learning performance in low-data regimes.

There exist a number of papers **claiming** that RNNs not only do well but also can forecast accurately on data points that they have not observed.

This paper simply questions this claim and tries to find to an explanation for _why they perform reasonably?_ and _whether there is a simpler alternative for them?_
{: .info}

They utilize resource usage time series of traces available from large-scale cloud providers, and their short answer _based on the data that they investigated on_ is that data is usually temporally highly correlated. In other words, LSTMs are likely learning how to produce a shifted version of data from the past.

This suggests that there is indeed room for simpler, more interpretable methods to be replaced with their deep learning alternatives while achieving comparable accuracy.

Apparently, networked systems community has already reached to the same conclusion as in the last few years, we are mostly seeing ML-based methods that are either highly interpretable or are combined with rule-based and/or statistically tractable methods in a hybrid fashion that are being applied to system problems.

### Fairly important notes to be considered about this paper:

- Whether an LSTM-based model as an ML method is good for this particular problem in the first place, would be an important question which is obviously out of the scope of this paper as they assume that _other researchers are applying it; hence, are practically applicable_.

The gained insights only apply to the data that they have observed and experimented with, and may not be easily generalized to every other real-world data unless already proven, that data shares the same characteristics.
{: .caution}

- They trained different LSTM models and what they used for comparison was the one that has only one LSTM layer followed by a fully connected layer. They selected this model due to its lower error rate. This suggests that the problem with respect to data can likely be formulated as a linear time-invariant system. Therefore, as mentioned in the other point, it obviously may not be generalized to every data drawn from real traces.
- Traces are collected in minutes (1 or 5 min) granularities. One may find quite different behaviors when zooming in (collecting data orders of magnitude more frequently) and inspecting the traces in finer granularities.