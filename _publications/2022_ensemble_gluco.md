---
title: "An Ensemble Mobile-Cloud Computing Method for Affordable and Accurate Glucometer Readout"
tags: "Edge Computing, Deep Learning, Distributed Systems, Distributed Deep Learning, Efficient Deep Learning, Scalable Deep Learning, Smart Health"
authors: "Navidreza Asadi, Maziar Goudarzi"
type: "r"
date: "2022/01"
status: #"a"
code: "https://github.com/nrasadi/glucometer-reading"
pdf: "https://arxiv.org/pdf/2301.01758.pdf"
link: "https://arxiv.org/abs/2301.01758"
visible: true
bibtex: "@article{asadi2023ensemble,
  title={An Ensemble Mobile-Cloud Computing Method for Affordable and Accurate Glucometer Readout},
  author={Asadi, Navidreza and Goudarzi, Maziar},
  journal={CoRR:2301.01758},
  year={2023},
  doi={10.48550/arXiv.2301.01758}
}
"
---
Despite essential efforts towards advanced wireless medical devices for regular monitoring of blood properties, many such devices are not available or not affordable for everyone in many countries. Alternatively using ordinary devices, patients ought to log data into a mobile health-monitoring manually. It causes several issues: (1) clients reportedly tend to enter unrealistic data; (2) typing values several times a day is bothersome and causes clients to leave the mobile app. Thus, there is a strong need to use now-ubiquitous smartphones, reducing error by capturing images from the screen of medical devices and extracting useful information automatically. Nevertheless, there are a few challenges in its development: (1) data scarcity has led to impractical methods with very low accuracy: to our knowledge, only small datasets are available in this case; (2) accuracy-availability tradeoff: one can execute a less accurate algorithm on a mobile phone to maintain higher availability, or alternatively deploy a more accurate and more compute-intensive algorithm on the cloud, however, at the cost of lower availability in poor/no connectivity situations. We present an ensemble learning algorithm, a mobile-cloud computing service architecture, and a simple compression technique to achieve higher availability and faster response time while providing higher accuracy by integrating cloud- and mobile-side predictions. Additionally, we propose an algorithm to generate synthetic training data which facilitates utilizing deep learning models to improve accuracy. Our proposed method achieves three main objectives: (1) $$92.1\%$$ and $$97.7\%$$ accuracy on two different datasets, improving previous methods by $$40\%$$, (2) reducing required bandwidth by $$45{\times}$$ with $$1\%$$ drop in accuracy, (3) and providing better availability compared to mobile-only, cloud-only, split computing, and early exit service models.
