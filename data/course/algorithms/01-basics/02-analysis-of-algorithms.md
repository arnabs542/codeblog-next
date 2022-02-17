---
title: 'Analysis of Algorithms'
type: 'topic'
section: 'Basics'
course: 'Algorithms'
tags:
- java
---
##### Given two algorithms for a task, how do we find out which one is better?
- **Time**: amount of time it takes to solve a given problem.
- **Space**: amount of memory required to solve a given problem.

#### Time complexity
The running time of an algorithm computed is also known as its time complexity.
#### Space complexity
The space complexity of an algorithm is the amount of additional or auxiliary memory space that the algorithm requires. This is memory space other than the actual input itself.

#### Asymptotic Analysis
- In Asymptotic Analysis, we evaluate the performance of an algorithm in terms of input size. 
- We don’t measure the actual running time). We calculate, how the time (or space) taken by an algorithm increases with the input size.
- The main idea of asymptotic analysis is to have a measure of efficiency of algorithms that doesn’t depend on machine specific constants, and doesn’t require algorithms to be implemented and time taken by programs to be compared.

**Example**
- Let us say we run the Linear Search on a fast computer A(0.2) and Binary Search on a slow computer B(1000) and we pick the constant values for the two computers so that it tells us exactly how long it takes for the given machine to perform the search in seconds.
- Linear Search running time in seconds on A: 0.2 * n
- Binary Search running time in seconds on B: 1000*log(n)

|n      | Running time on A | Running time on B |
|-------|-------------------|-------------------|
|10     | 2 sec             | ~ 1 h             |
|100    | 20 sec            | ~ 1.8 h           |
|10^6   | ~ 55.5 h          | ~ 5.5 h           |
|10^9   | ~ 6.3 years       | ~ 8.3 h           |

##### Does Asymptotic Analysis always work?
- Asymptotic Analysis is not perfect, but that’s the best way available for analyzing algorithms.
- For example, say there are two sorting algorithms that take 1000nLogn and 2nLogn time respectively on a machine. Both of these algorithms are asymptotically same (order of growth is nLogn). So, With Asymptotic Analysis, we can’t judge which one is better as we ignore constants in Asymptotic Analysis.
- Also, in Asymptotic analysis, we always talk about input sizes larger than a constant value. It might be possible that those large inputs are never given to your software and an algorithm which is asymptotically slower, always performs better for your particular situation. So, you may end up choosing an algorithm that is Asymptotically slower but faster for your software.

_We can adopt one of three strategies:_
##### 1. Worst Case
In the worst-case analysis, we consider the specific input that results in the execution of the maximum possible primitive operations. This gives us an upper bound on the execution time of that algorithm for a given input size.

##### 2. Best Case
In the best case analysis, we consider the specific input that results in the execution of the fewest possible primitive operations. This gives us a lower bound on the execution time of that algorithm for a given input size.

##### 2. Average Case
In the average case analysis, we try to determine the average number of primitive operations executed for all possible inputs of a given size. In order to compute the average-case running time of an algorithm, we must know the relative frequencies of all possible inputs of a given size. We compute the weighted average of the number of primitive operations executed for each input. We must know (or predict) distribution of cases. If the algorithm encounters a different distribution of inputs in the field, our analysis is useless.

**Note:**
- The worst-case analysis is more useful because whatever answer it gives you, you can be sure that no matter what, algorithm A wouldn’t incur more time than that.
- For some algorithms, all the cases are asymptotically same, i.e., there are no worst and best cases. For example, **Merge Sort**. Merge Sort does Θ(nLogn) operations in all cases.

---