---
title: 'Introduction to Algorithms'
type: 'topic'
section: 'Basics'
course: 'Algorithms'
tags:
- java
---
### Algorithm
- An Algorithm is any well defined computational procedure that takes some value, or set of values, as input and produces some value, or set of values, as output.
- It is a sequence of computational steps that transform the input into the output.
- It is a tool for solving a well-specified computational problem by describing a specific procedure for achieving the input/output relationship.

---
### Instance of a problem
- An instance of a problem consists of the input (satisfying whatever constraints are imposed in the problem statement) needed to compute a solution to the problem.

**Which sorting algorithm is best depends of factors:**
- number of items to be sorted
- the extent to which the items are already somewhat sorted
- possible restrictions on the item values
- the kind of storage device to be used: main memory, disks, or tapes

---
### Data Structure
- A data structure is a way to store and organize data in order to facilitate access and modifications.

---
### Technique
- Techniques of algorithm design and analysis so that you can develop algorithms on your own, show that they give the correct answer, and understand their efficiency.

---
### Hard Problems
- There are some problems, however, for which no efficient solution is known. A subset of these problems are known as NP-complete.

**Note:**
  1. although no efficient algorithm for an NP-complete problem has ever been found, nobody has ever proven that an efficient algorithm for one cannot exist. It is unknown whether or not efficient algorithms exist for NP-complete problems.
  2. the set of NP-complete problems has the remarkable property that if an efficient al- gorithm exists for any one of them, then efficient algorithms exist for all of them. This relationship among the NP-complete problems makes the lack of efficient so- lutions all the more tantalizing.
  3. several NP-complete problems are similar, but not identical, to problems for which we do know of efficient algorithms. A small change to the problem statement can cause a big change to the efficiency of the best known algorithm.
- If you can show that the problem is NP-complete, you can spend your time developing an efficient algorithm that gives a good, but not the best possible, solution.

**Example:**
travelling-salesman problem: a well-known NP-complete problem.

---
### Parallelism
- In order to perform more computations per second, chips are being designed to contain not just one but several processing cores.
- In order to elicit the best performance from multi-core computers, we need to design algorithms with Parallelism in mind, known as "Multi-threaded algorithms" which take advantage of multiple cores.

---
### Auxiliary Space
- Auxiliary Space is the extra space or temporary space used by an algorithm.

### Space Complexity
- Space Complexity of an algorithm is total space taken by the algorithm with respect to the input size. Space complexity includes both Auxiliary space and space used by input.

---
