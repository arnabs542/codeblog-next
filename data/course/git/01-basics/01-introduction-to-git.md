---
title: Introduction to Git
type: topic
section: Basics
course: Git
tags:
- git
---
#### What is Git?
- Fast Version Control System.
- It can be used online and offline.
- Distributed.
- Very easy to do Branching.
- It is very clean.

#### Distributed Version Constrol System (DVCS)
It has different topologies:
1. **Centralized** - developers push their changes to one central repository
2. **Hierarchical** - developers push their changes to subsystem-based repositories, which are periodically merged into a main repository.
3. **Distributed** - developers push their changes to their own repository and project maintainers pull changes into the official repository.

Backups are easy:
- Each clone is a full backup

Reliable branching/merging:
- Feature branches

---
#### GIT Protocols
1. **http(s)**
    - read-write
    - password for auth
    - firewell friendly

2. **git**
    - read-only
    - anonymous only

3. **ssh**
    - read-write
    - ssh keys for auth

4. **file**
    - read-write
    - local only

---
