---
title: 'NP-Completeness'
type: 'topic'
section: 'Basics'
course: 'Algorithms'
tags:
- java
---
#### NP-Completeness
**_Can all computational problems be solved by a computer?_** 
- There are computational problems that can not be solved by algorithms even with unlimited time.
- NP complete problems are problems whose status is unknown. No polynomial time algorithm has yet been discovered for any NP complete problem, nor has anybody yet been able to prove that no polynomial-time algorithm exist for any of them.
- The interesting part is, if any one of the NP complete problems can be solved in polynomial time, then all of them can be solved.

##### Examples
1. **Turing Halting problem** (Given a program and an input, whether the program will eventually halt when run with that input, or will run forever). Alan Turing proved that general algorithm to solve the halting problem for all possible program-input pairs cannot exist. A key part of the proof is, Turing machine was used as a mathematical definition of a computer and program

---
#### Types
1. P is set of problems that can be solved by a deterministic Turing machine in Polynomial time.
2. NP is set of decision problems that can be solved by a Non-deterministic Turing Machine in Polynomial time.

> P is subset of NP (any problem that can be solved by deterministic machine in polynomial time can also be solved by non-deterministic machine in polynomial time).

---
#### Polynomial Time Approximation Scheme
- It is a very well know fact that there is no known polynomial time solution for NP Complete problems and these problems occur a lot in real world.
- Polynomial Time Approximation Scheme (PTAS) is a type of approximate algorithms that provide user to control over accuracy which is a desirable feature.

---