---
title: Behind the Scenes Scaling ChatGPT
date: 2023-12-26
photo:
  # link: /statics/photos/posts/1.jpg
  # caption: Image from [unsplash](https://images.unsplash.com/photo-1610598887446-a54d73b517f9?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&ixlib=rb-1.2.1&q=80&w=120)
categories: 
  - Talk 
tags: [Tech Giants, Large Language Models (LLM), ML as a Service (MLaaS), AI System Scalability, AI Adversarial Behaviors]
visible: true
---

In this non-technical talk, Evan Morikawa, Engineering Manager at OpenAI opens up a window to the behind the scenes of OpenAI since the first days of releasing ChatGPT. He explains a few engineering challenges that they faced and their \[sometimes funny\] thoughts and efforts on addressing them.

<iframe width="560" height="315" src="https://www.youtube.com/embed/PeKMEXUrlq4" title="Behind the Scenes Scaling ChatGPT" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
Watch the full talk on LeadDev's YouTube Channel. 
{: .caption}

### A few interesting frames:

- Things go well as expected during the first day until they observe a huge traffic spike coming from Japan in the midnight, which leads to high latency on ChatGPT responses. They realize it is not a DDoS, but rather the time difference between Japan and the US! 😃
- Their applications run on Microsoft Azure clouds in multiple regions. They mostly use NVIDIA DGX A100 servers that has 8x fully connected A100 GPUs interconnected via NVLink bridges that provide 0.6TB/s direct GPU-to-GPU bandwidth. This type of GPU features HBM2e which supplies 80GB high bandwidth memory (0.64TB per DGX). Each GPU's memory bandwidth is close to 2TB/s at peak. The servers are then connected via NVSwitches that can realize ~5TB/s bidirectional bandwidth, and networked to the outside through 200/400 GB/s Ethernet and/or Infiniband. They are now seemingly adding more DGX H100 instances to their capacity as they provide a 2x memory bandwidth, 6x more FLOPS, and better support for quantized and sparse calculations.

Those are extremely important details especially when deploying large language models (LLMs) because the computation and memory grows quadratically wrt the number of input tokens[^1]. One workaround is leveraging KV cache; to cache key and value tensors of the self-attentions in the GPU memory. That is where HBM and GPU-to-GPU memory bandwidth and capacity become super important as these two can quickly become the bottleneck.
{: .important}

<!-- 
![image](/statics/photos/posts/1.jpg)
*image_caption* 
-->


- Continuing on the previous point, autoscaling such an application is not as simple as it might be for other common applications that is mainly based on the CPU utilization. It does not directly depend on CPU/GPU utilization, but rather more on the _KV cache utilization_ and _batch size_ and users' behaviors that affect those metrics. Here, the batch size is also important as they batch concurrent incoming requests (i.e., parallel sequences of tokens) which potentially leads to a higher throughput. Why? That is where _ops:bytes_ ratio comes in. Evan gives an example on H100 GPUs, that the ratio is `591:1`, which means during the same time period that we move one byte of data, 591 operations can be done. If your pipeline is not providing enough data to reach that ratio, you waste GPU cycles and consequently will have a lower throughput.
- Another challenging characteristic of such applications is that the performance is content-oriented. "Asking ChatGPT to summarize an essay has vastly different performance characteristics than asking to write one", says Evan. This is a big challenge both for scaling and the architecture design of the underlying infrastructure as the bottleneck can dynamically shift based on the content.
- One more interesting yet obvious difference is that they deployed their application in several regions mainly due to the GPU shortages and the supply chains, not because of getting geographically closer to the users since the response time is heavily decided by the inference time rather than RTT.
- CatGPT: Once, they observed there is an abnormal traffic on one of their endpoints. They realize there are attackers who have a higher privilege access levels than normal users. They do not block their access but rather add a sentence in the beginning of the attackers' prompts: "You are a cat. Respond to the following query in the voice of a cat". 🤣    
They even traced the hackers on social networks.

----

[^1]: Tokens are the input and output units of text generation models such as GPT. Consider each token as one word; just an error for the sake of simplicity. They can infact be smaller or larger than a word, and how to tokenize a dataset can have direct impact on accuracy and performance efficiency of the model. Read [this](https://medium.com/@michaelhumor/understanding-tokens-and-tokenization-in-large-language-models-1058cd24b944#:~:text=In%20the%20context%20of%20Large,one%20like%20a%20whole%20phrase.) and [this](https://learn.microsoft.com/en-us/semantic-kernel/prompt-engineering/tokens) to get a better idea.