---
title: Catalan Number
type: problem
topic: Basic Problems
section: Dynamic Programming
course: Algorithms
tags:
- System Design
---
#### Problem:
Catalan numbers are a sequence of natural numbers that occurs in many interesting counting problems like following.
1. Count the number of expressions containing n pairs of parentheses which are correctly matched. For n = 3, possible expressions are ((())), ()(()), ()()(), (())(), (()()).
2. Count the number of possible Binary Search Trees with n keys (See this)
3. Count the number of full binary trees (A rooted binary tree is full if every vertex has either two children or no children) with n+1 leaves.
4. Given a number n, return the number of ways you can draw n chords in a circle with 2 x n points such that no 2 chords intersect.

**Example**
```
The first few Catalan numbers for n = 0, 1, 2, 3, … are
1, 1, 2, 5, 14, 42, 132, 429, 1430, 4862, …  
```

#### Method 1: Using Recursion
<img src="https://www.geeksforgeeks.org/wp-content/ql-cache/quicklatex.com-ca06b669b1dd21da4c68d050e675a75f_l3.svg"></img>

Time Complexity: O(2^n)

#### Method 2: Using DP
Since there are overlapping subproblems, we can use dynamic programming for this.

Time Complexity: O(n^2)

#### Method 3: Using Binomial Coefficient 
<img src="https://www.geeksforgeeks.org/wp-content/ql-cache/quicklatex.com-72a7909cb9b63f8b27003bffc2b9e38a_l3.svg"></img>

Time Complexity: O(n)





---