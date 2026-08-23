---
title: "Build Less, Pull Less, Restart Never: Fast Container Image Distribution and In-Place Updates"
tags: "Edge Computing, Deep Learning, Distributed Systems, Distributed Deep Learning, Containers, Orchestration, Scalable Deep Learning, File Storage, File Distribution, In-Place Updates"
authors: "Navidreza Asadi, Bohdan Garchu, Giovanni Bartolomeo, Jörg Ott, Wolfgang Kellerer"
type: "c"
place: "ACM Symposium on Operating Systems Principles Posters (SOSP) 2026"
date: "2026/09/29"
# status: "a"
# award: "Best Poster Award"
# pdf: https://2026.sosp.org/assets/papers/2026-sosp-paper13.pdf
# link: "https://2026.sosp.org/assets/papers/2026-sosp-paper13.pdf"
bibtex: "
@inproceedings{asadi2026sosp,   
  title={Build Less, Pull Less, Restart Never: Fast Container Image Distribution and In-Place Updates},
  author={Asadi, Navidreza and Garchu, Bohdan and Bartolomeo, Giovanni and Ott, Jörg and Kellerer, Wolfgang},
  booktitle={The 32nd ACM Symposium on Operating Systems Principles (SOSP)},
  year={2026},
  publisher={Association for Computing Machinery}
}
"
---
We present MitraFSnap, an OCI-compatible build, registry, and runtime system for large artifacts distribution in containerized environments. MitraFSnap extends the containers ecosystem with a unique solution offering a highly efficient build for large images, on-demand file fetching, and live image updates without container restart. We propose a novel architecture built from a combination of 2DFS for the build and storage path and on the eStargz snapshotter for the lazy loading runtime. Additionally, we add a brand new capability for in-place container live updates.
