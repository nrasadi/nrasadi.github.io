---
title: "HideOut - User Protection Against Localization with Throughput Guarantees in Mobile Networks"
tags: "Location Privacy, Cellular Networks, Channel State Information, Adversarial Machine Learning, Neural Localization, Physical Layer Security, Spectral Efficiency"
authors: "Navidreza Asadi*, Michele Guardiani*, Wolfgang Kellerer, Jafar Mohammadi"
type: "c"
place: "ACM CCS AISec 2026"
date: "2026/11/15"
status: "a"
# award: "Best Poster Award"
# pdf: files\papers\NavidrezaAsadi_MobiCom2026_TinyGist.pdf
# link: "https://doi.org/10.1145/3737899.3768527"
bibtex: |
  @inproceedings{asadi2026hideout,
    title={{{HideOut} - User Protection Against Localization with Throughput Guarantees in Mobile Networks}},
    author={Asadi, Navidreza and Guardiani, Michele and Kellerer, Wolfgang and Mohammadi, Jafar},
    booktitle={ACM Conference on Computer and Communications Security - AISec 2026},
    year={2026}
  }
misc:
    - title: "* Equal Contribution"
    - title: "Acceptance Rate: 14.8%"
---
Cellular networks increasingly expose a privacy-sensitive interface: channel state information (CSI) feedback. Although CSI is reported to support downlink precoding, recent learning-based localization systems can also use it to infer a user's position with meter-level accuracy. This creates a tension for the user equipment (UE): withholding or randomizing CSI protects location privacy but can degrade its own downlink service. We present HideOut, a client-side defense that perturbs CSI feedback to mislead neural localization models while preserving downlink spectral efficiency (SE). Unlike generic adversarial attacks, HideOut treats communication performance as a hard physical-layer constraint. Under maximum-ratio transmission (MRT), we show that a user-selected SE loss budget can be converted into an angular feasibility constraint on the reported channel direction. HideOut then performs gradient-based localization obfuscation while projecting each update onto this rate-feasible set. We evaluate HideOut against four CSI-based localization architectures under both white-box and black-box assumptions. In the black-box setting, the UE trains a local surrogate without any access to the deployed localization model. Across models, HideOut increases localization error from approximately 1-2 m to 62-78 m while keeping downlink SE loss within a 1% budget. These results show that CSI-based localization can be substantially degraded at negligible communication cost when adversarial perturbations are made aware of the wireless link.
