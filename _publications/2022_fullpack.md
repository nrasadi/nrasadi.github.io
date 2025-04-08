---
title: "FullPack: Full Vector Utilization for Sub-Byte Quantized Inference on General Purpose CPUs"
tags: "Edge Computing, Deep Learning, Efficient Deep Learning, Quantization, Vector Processing"
authors: "Hossein Katebi, Navidreza Asadi, Maziar Goudarzi"
type: "j"
# status: "a"
place: "IEEE Computer Architecture Letters"
date: "2024/02"
pdf: "https://arxiv.org/pdf/2211.06982.pdf"
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
Although prior art has demonstrated negligible accuracy drop in sub-byte quantization---where weights and/or activations are represented by less than 8 bits---popular SIMD instructions of CPUs do not natively support these datatypes. While recent methods, such as ULPPACK, are already using sub-byte quantization on general-purpose CPUs with vector units, they leave out several empty bits between the sub-byte values in memory and in vector registers to avoid overflow to the neighbours during the operations. This results in memory footprint and bandwidth-usage inefficiencies and suboptimal performance. In this paper, we present memory layouts for storing, and mechanisms for processing sub-byte (4-, 2-, or 1-bit) models that utilize all the bits in the memory as well as in the vector registers for the actual data. We provide compute kernels for the proposed layout for the GEMV (GEneral Matrix-Vector multiplication) operations between weights and activations of different datatypes (e.g., 8-bit activations and 4-bit weights). For evaluation, we extended the TFLite package and added our methods to it, then ran the models on the cycle-accurate gem5 simulator to compare detailed memory and CPU cycles of each method. We compare against nine other methods that are actively used in production including GEMLOWP, Ruy, XNNPack, and ULPPACK. Furthermore, we explore the effect of different input and output sizes of deep learning layers on the performance of our proposed method. Experimental results show 0.96-2.1x speedup for small sizes and 1.2-6.7x speedup for mid to large sizes. Applying our proposal to a real-world speech recognition model, Mozilla DeepSpeech, we proved that our method achieves 1.56-2.11x end-to-end speedup compared to the state-of-the-art, depending on the bit-width employed.
