---
title: "FullPack: Full Vector Utilization for Sub-Byte Quantized Matrix-Vector Multiplication on General Purpose CPUs"
tags: "Edge Computing, Deep Learning, Efficient Deep Learning, Quantization, Vector Processing"
authors: "Hossein Katebi, Navidreza Asadi, Maziar Goudarzi"
type: "j"
# status: "a"
place: "IEEE Computer Architecture Letters (CAL)"
date: "2024/02"
# pdf: "https://arxiv.org/pdf/2211.06982.pdf"
link: "https://ieeexplore.ieee.org/abstract/document/10449368"
bibtex: "
@article{katebi2024fullpack,
    title={FullPack: Full Vector Utilization for Sub-Byte Quantized Vector-Matrix Multiplication on General Purpose CPUs},
    author={Katebi, Hossein and Asadi, Navidreza and Goudarzi, Maziar},
    journal={IEEE Computer Architecture Letters},
    year={2024},
    publisher={IEEE}
  }
"

---
Sub-byte quantization on popular vector ISAs suffers from heavy waste of vector as well as memory bandwidth. The latest methods pack a number of quantized data in one vector, but have to pad them with empty bits to avoid overflow to neighbours. We remove even these empty bits and provide full utilization of the vector and memory bandwidth by our data-layout/compute co-design scheme. We implemented FullPack on TFLite for Vector-Matrix multiplication and showed up to 6.7x speedup, 2.75x on average on single layers, which translated to 1.56−2.11x end-to-end speedup on DeepSpeech.
