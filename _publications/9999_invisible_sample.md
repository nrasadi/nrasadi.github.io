---
title: "Publication Title"
tags: "Computer Science, Machine Learning"
authors: "Navidreza Asadi, Second Author"
type: "p" # r: technical reports or archives | c: conferences | j: journals | b: book (chapter) | p: poster ==> default: "r"
date: "2021/01" # day can be added too. Publications will be sorted according to this metadata.
place: "IEEE Transactions on Mobile Computing" # Name of the conference, journal, etc.
IF: 6.075 # Journal impact factor
acceptance_rate: 20 # conference acceptance rate (percentage)
status: "a" # none or empty: nothing will be shown | a: accepted | r: under review | s: submitted | f: final stages of submission | i: in preparation
pub_stat: "55/500 papers were accepted" # Or any other kind of stat that you woul like to show.
code: "https://github.com/nrasadi/my_crazy_code"
pdf: "my_crazy_paper.pdf"
link: "e.g., link to publication"
award: "Best paper"
presentation: "link-to-presentation-file"
video: "link-to-video"
poster: "link-to-poster"
supplementary: "link-to_suplementary-files"
bibetex: "link-to-bibtex"
scholar: "link-to-google-scholar"
misc: 
    - title: misc1 title
      link: misc1 link # optional
      desc: misc1 description
    - title: misc2 title
      desc: misc2 description
visible: false
---
Despite essential efforts towards advanced wireless medical devices for regular monitoring of blood properties, many such devices are not available or not affordable for everyone in many countries. Alternatively using ordinary devices, patients ought to log data into a mobile health-monitoring manually. It causes several issues: (1) clients reportedly tend to enter unrealistic data; (2) typing values several times a day is bothersome and causes clients to leave the mobile app. Thus, there is a strong need to use now-ubiquitous smartphones, reducing error by capturing images from the screen of medical devices and extracting useful information automatically. Nevertheless, there are a few challenges in its development: (1) data scarcity has led to impractical methods with very low accuracy: to our knowledge, only small datasets are available in this case; (2) accuracy-availability tradeoff: one can execute a less accurate algorithm on a mobile phone to maintain higher availability, or alternatively deploy a more accurate and more compute-intensive algorithm on the cloud, however, at the cost of lower availability in poor/no connectivity situations. We present an ensemble learning algorithm, a mobile-cloud computing service architecture, and a simple compression technique to achieve higher availability and faster response time while providing higher accuracy by integrating cloud- and mobile-side predictions. Additionally, we propose an algorithm to generate synthetic training data which facilitates utilizing deep learning models to improve accuracy. Our proposed method achieves three main objectives: (1) 92.1% and 97.7% accuracy on two different datasets, improving previous methods by 40%, (2) reducing required bandwidth by 45x with 1% drop in accuracy, (3) and providing better availability compared to mobile-only, cloud-only, split computing, and early exit service models.