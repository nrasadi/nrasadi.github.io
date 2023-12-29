---
title: "CoNEXT '23 SIGCOMM Rising Star Keynote: Application-Centric Networking"
date: 2023-12-28
photo:
  # link: /statics/photos/posts/1.jpg
  # caption: Image from [unsplash](https://images.unsplash.com/photo-1610598887446-a54d73b517f9?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&h=400&ixlib=rb-1.2.1&q=80&w=120)
categories: 
  - Talk 
tags: [Tech Giants, Large Language Models (LLM), ML as a Service (MLaaS), AI System Scalability, AI Adversarial Behaviors]
visible: true
---

Ravi Netravali, an Assistant Professor at Princeton University won this year's ACM SIGCOMM Rising Star Award. In this keynote talk which was given at ACM CoNEXT '23 Conference, he discusses the importance of application-centric networking. He argues that the networking community has neglected the impact of the application and it corresponding layer in the networking stack, and gives his insights through several projects that he has done in the last few years.

Below, are the notes I have taken during the talk, that might be helpful if you do not have time to watch the whole talk[^1].

<iframe width="560" height="315" src="https://www.youtube.com/embed/QH_TrQkSaQ8?si=6r9o6tIEP8tmSiHU" title="Ravi's Keynote at ACM CoNEXT '23" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
Watch the full talk on ACM CoNEXT's YouTube Channel.
{: .caption}

#### Limited Visibility in Networking:

- Application layer is neglected in the networking community
- Rethinking applications' place in networking
- Why tighter application-network ties?

#### Opportunities:

1. New classes of solutions to address or mask networks challenges
2. New and impactful pathways to leverage networking insights

#### Why Now? What Is Missing?

##### An increasingly pressing need:

- More users with heavier applications (e.g., video streaming, video analytics, etc.)
- We need to rethink the stack for good performance and efficiency ➡️ A new networking subdiscipline

#### How can we do this?

1. Understanding app operations
    - Automatic tools for app introspection
2. Relating app and network operations
    - Data-driven approaches to link app-network insights


**Shift of Applications:** <br> Traditional Web ➡️ Video ➡️ ML/AI
{: .note}

#### Traditional Web:

- Loading a simple page
- Slow page loads ➡️ revenue loss, low search rank, unusable services
    - Reason: Blockings between CPU and Network.
    - Problem 1: Serialization in load process leads to resource underutilization!
    - Idea: Web dependency graphs to the rescue. (Program Analysis)
        - Key Idea: Tree matching + dependency graph to ensure all data accesses by preserved scripts is also present.
        - View Invariance: Use dependency graph to ensure patched JS file observes same page state as in default
        - Represents page structure and the page load process for browsers
- Proposal: Fawkes (NSDI '20): Separating static and dynamic content.
    - Phase 1: Offline static templates
    - Phase 2: Online dynamic patches
    - Phase 3: Applying patches
- Problem 2: Inefficient page load: serialization in load process leads to resource underutilization (root cause: object evaluation --)
    - Approach: Decouple evaluation and discovery of objects
- Problem 3: Lack of generalization
- Proposal: Alohamora (NSDI 2021): Dynamically adapt dependency hints for a given page, network, etc.
    - How: Learning push/preload policies
    - State: Network bandwidth, latency, CPU speed, cache contents, page dependency graph

##### Win from data-driven linkage of app and network ties:

  - Up to 61% faster page loads without any slowdown.

---

#### Video Streaming

Video is partitioned into chunks of usually a few seconds.
ABR is used: If the video rate is higher than the capacity, the bitrate should be reduced.

##### Questions

- When to download the next chunk?
- Which bitrate to choose?

##### Why is ABT Challenging:

1. Network throughput is variable and uncertain
2. Conflicting QoE goals
3. Cascading effects of decisions

- Challenge: How do we hedge against network uncertainty?
- Idea: Learning streaming algorithms
- Proposal: Pensieve (SIGCOMM '17)
- States: Past chunk throughput, past chunk download time, next chunk sizes, current buffer size, remaining chunks, past chunk bitrate
- Actions: Different bitrates

#### Short Video Streaming Is Popular

##### Traditional vs. Short Video Streaming:

In short videos users swipe between different videos. Therefore, there is a need to download and buffer chunks of different videos instead of sequential chunks of the same video.

- Challenges: Dealing with network uncertainty
- Proposal: Dashlet (NSDI '23):

##### Application constraints dictate priorities between most chunks:

1. Later chunks in a video are only reachable via earlier ones.
2. Later videos are only reachable via swipes from earlier ones.

- Insight: Users tend to swipe at similar places in a given video ➡️ stable swipe distribution ➡️ calculating/predicting chunk start times is possible.
- How to calculate:
    - Step1: Calculate play start time distributions.
    - Step 2: Heuristic algorithm to decide the buffer algorithm.
- Results:
    - More than 25% QoE improvements for both Pensieve and Dashlet.
    - Bigger takeaway: The importance of jointly optimizing application knobs and constraints.

---

#### ML/AI: ML Inference (Video Analytics)

##### Live video analytics pipelines:

- Video frame ➡️ CNN ➡️ model output (e.g., bounding boxes, etc.)

##### Goal:

- Maximize query accuracy subject to latency and resource constraints.

##### Exploiting temporal redundancies in video

- Key Challenge: What level of redundancy is enough for safe filtering in ML analytics?
- insight: Cheap, Low-level CV features can help predict changes in model results.
- Proposal: Reducto (SIGCOMM '20)
- Challenge: Threshold values for differences must be adaptively tuned to specific scene/query.
- Results: Filter 50-90% of frames via application introspection and linking to network observations.

##### A new network bottleneck

- Insight: Workloads outgrowing GPU devices
- Time-sharing of GPU memory
- Repeatedly load models into GPU memory is too slow: skipped processing of 19-84% of frames and accuracy drops up to 43%.
- Issue: PCIe links between CPUs and GPUs are not fast enough for real-time inference
- Insight: Across 24 different architectures, 43% of the layers are shared.

##### Opportunity: Merging layers

- Benefits:
    1. Faster swaps
    2. Fewer swaps
- Proposal: Gemel (NSDI '23)
    - Realizing model merging
- Challenge 1: Accuracy-merging tension ➡️ Implication: Prioritize merging heavy hitter layers.
- Challenge 2: Large search space and costly to test any configuration ➡️ Implications: Greedily merge layers one at a time.
- Results:
    - 60% less memory overhead ➡️ 8-39% higher inference throughput

---

#### Future Work

- New use cases for network hardware
- Network bottlenecks in new places
- Edge hierarchies
- Serverless Computing
- Resource Disaggregation: Distributed training and inference is needed.

----

[^1]: Please take the information with a degree of caution. The notes were taken during the talk while listening and paying attention to the speaker and his presentation; that may have resulted in inaccuracies and typos. If any errors or confusing sections are identified, please let me know.