---
title: Fibonacci Numbers
type: problem
topic: Basic Problems
section: Dynamic Programming
course: Algorithms
tags:
- System Design
---
#### Problem:
The Fibonacci numbers are the numbers in the following integer sequence.
0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144,..

Write a function int fib(int n) that returns Fn. For example, if n = 0, then fib() should return 0. If n = 1, then it should return 1. For n > 1, it should return Fn-1 + Fn-2

In mathematical terms, the sequence Fn of Fibonacci numbers is defined by the recurrence relation 
```
    Fn = Fn-1 + Fn-2
```

with seed values 
```
   F0 = 0 and F1 = 1.
```

#### Method 1: Using Recursion
A simple method that is a direct recursive implementation mathematical recurrence relation.



#### Method 2: Using DP
We can avoid the repeated work done is method 1 by storing the Fibonacci numbers calculated so far. 



#### Method 3: Space Optimized
We can optimize the space used in method 2 by storing the previous two numbers only because that is all we need to get the next Fibonacci number in series. 


#### Method 4: Using power of the matrix {{1,1},{1,0}}
This another O(n) which relies on the fact that if we n times multiply the matrix M = {{1,1},{1,0}} to itself (in other words calculate power(M, n )), then we get the (n+1)th Fibonacci number as the element at row and column (0, 0) in the resultant matrix.
The matrix representation gives the following closed expression for the Fibonacci numbers: 




---