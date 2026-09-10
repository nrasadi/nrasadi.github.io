---
title: "Which Autoscaler Is Running? Classifying Controllers from Outside and Inside"
tags: "Cloud Computing, Kubernetes, Microservices, Autoscaling, Controller Fingerprinting, Machine Learning, Traffic Analysis, Black-Box Classification, Resource Allocation, Conformance Testing"
authors: "Navidreza Asadi, Wolfgang Kellerer"
type: "c"
place: "IEEE NFV-SDN 2026"
date: "2026/10/02"
# status: "a"
# award: "Best Poster Award"
# pdf: "https://dl.acm.org/doi/pdf/10.1145/3744969.3748419"
# link: "https://dl.acm.org/doi/10.1145/3744969.3748419"
bibtex: |
  @inproceedings{asadi2026autoscaler,
    title={Which Autoscaler Is Running? Classifying Controllers from Outside and Inside},
    author={Asadi, Navidreza and Kellerer, Wolfgang},
    booktitle={12th IEEE Conference on Network Functions Virtualization and Software-Defined Networking (NFV-SDN)},
    year={2026},
    address={Tokyo, Japan}
  }

---
A pulsing attack on autoscaling mechanism is fully effective only when its timing fits the controller. Our earlier work, WaveSurfer, aligns short bursts with the scale out time and the scale down window of a Kubernetes pod autoscaler and raises the operational cost of a service per injected request by 5.3x over a uniform flood. It obtains that timing by probing the running service, which spends traffic and gives the defender something to notice. This paper looks the problem from a new angle and asks the following question: does the traffic already say which autoscaler runs behind a service? We aim to answer it as a classification problem under two levels of knowledge, (1) an outside observer sees only what a client sees, namely response time, throughput and errors; (2) an inside observer instead reads the replica count and the CPU signals the controller consumes. Over roughly 300 measurement runs on different autoscaling controllers, applications and production-derived and synthetic traces, we show that from replica trajectories a classifier identifies the controller family with accuracy 89% and the exact controller with 88% on an application it has never seen. From client-side signals alone it still reaches 70% for the family and 47% for the controller. Once the observer knows the application, it names the controller 55% of the time and places the target utilization within ten percentage points 80% of the time. This information gives an adversarial entity the family and a rough target. In a simulated conformance test, the same classifier flags a controller that does not behave like its declared family with recall 90% at precision 75%.
