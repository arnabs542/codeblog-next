---
title: 'Amortized Analysis'
type: 'topic'
section: 'Basics'
course: 'Algorithms'
tags:
- java
---
#### Amortized Analysis
- In Amortized Analysis, we analyze a sequence of operations and guarantee a worst case average time which is lower than the worst case time of a particular expensive operation.
- Amortized Analysis is used for algorithms where an occasional operation is very slow, but most of the other operations are faster.
- It is different from average case analysis, as it does not make any assumption about the distribution of data.
- The example data structures whose operations are analyzed using Amortized Analysis are Hash Tables, `Disjoint Sets` and `Splay Trees`.

##### Approach
- The general approach is to assign an artificial cost to each operation in the sequence, such that the total of the artificial costs for the sequence of operations bounds total of the real costs for the sequence. 
- This artificial cost is called the amortized cost of an operation.

**Ways to do Amortized analysis**
1. ways to do Amortized analysis
2. Accounting Method
3. Potential Method

**NOTE**
1. Amortized cost of a sequence of operations can be seen as expenses of a salaried person. The average monthly expense of the person is less than or equal to the salary, but the person can spend more money in a particular month by buying a car or something. In other months, he or she saves money for the expensive month.
2. The amortized analysis doesn’t involve probability. There is also another different notion of average-case running time where algorithms use randomization to make them faster and expected running time is faster than the worst-case running time. These algorithms are analyzed using Randomized Analysis. Examples of these algorithms are Randomized Quick Sort, Quick Select and Hashing. We will soon be covering Randomized analysis in a different post.



---