---
title: "Beyond Layers: Container Registries for Files Distribution and On-Demand Image Partitioning"
tags: "Edge Computing, Deep Learning, Distributed Systems, Distributed Deep Learning, Containers, Orchestration, Scalable Deep Learning"
authors: "Giovanni Bartolomeo*, Navidreza Asadi*, Wolfgang Kellerer, Jörg Ott, Nitinder Mohan"
type: "c"
place: "ACM EuroSys 2025"
date: "2025/03/30"
# status: "a"
award: "Best Poster Award"
pdf: https://2025.eurosys.org/posters/final/eurosys25posters-final13.pdf
link: "https://2025.eurosys.org/posters/final/eurosys25posters-final13.pdf"
bibtex: "
@article{beyondlayers2025,   
  title={Beyond Layers: Container Registries for Files Distribution and On-Demand Image Partitioning},
  author={Bartolomeo, Giovanni and Asadi, Navidreza and Kellerer, Wolfgang and Ott, Jörg and Mohan, Nitinder},
  conference={ACM EuroSys 2025},
  year={2025},
  publisher={Association for Computing Machinery},
  url={https://2025.eurosys.org/posters/final/eurosys25posters-final13.pdf},
}
"
misc:
    - title: "* Equal Contribution"
---
Thanks to OCI standardization, containers now describe a complete end-to-end environment for packaging, distributing, and deploying software and its dependencies. Unfortunately, the complexity of modern applications creates use cases that are not yet supported by this technology. For example, packaging machine learning model weights in containers requires extensive build times, reduces flexibility, and forces developers to seek alternative, custom solutions. Another example is platform-specific drivers and binaries, which are often included in container fat images but involve cache invalidations for every minor change. In our work, we extend the container layered structure with a new two-dimensional filesystem layer type, specifically designed for efficient handling of large data. The proposed layer type allows highly parallelized image builds and fine-grained layer caching, while also providing a mechanism for on-demand partitions. Such partitions enable developers to request a subset of the image, e.g., containing only a portion of a machine learning model or a specific set of drivers for a given architecture. The proposed implementation is fully OCI-compliant, allowing distribution of such customized images to any container runtime with no additional effort. Our implementation, called 2DFS, achieves 56x faster build times and 25x better caching efficiency compared to Docker, while providing on-demand image partitioning with no overhead.
