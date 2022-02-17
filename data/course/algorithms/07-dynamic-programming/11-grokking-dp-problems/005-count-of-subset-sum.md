---
title: Count of Subset Sum
type: problem
topic: Grokking DP Problems
section: Dynamic Programming
course: Algorithms
visibility: ''
tags:
- System Design
---
#### Problem:
Given a set of positive numbers, find the total number of subsets whose sum is equal to a given number ‘S’.

```
Input: {1, 1, 2, 3}, S=4
Output: 3
The given set has '3' subsets whose sum is '4': {1, 1, 2}, {1, 3}, {1, 3}
Note that we have two similar sets {1, 3}, because we have two '1' in our input.
```

#### Method 1: Brute-force
Time complexity: O(2^n)



#### Method 2: Memoization (Top-down)
We will be using a two-dimensional array to store the results of the solved sub-problems. We can uniquely identify a sub-problem from `currentIndex` and `Sum1`; as `Sum2` will always be the sum of the remaining numbers.



#### Method 3: Tabulation (Bottom-up)
Let’s assume ‘S’ represents the total sum of all the numbers. So what we are trying to achieve in this problem is to find a subset whose sum is as close to ‘S/2’ as possible, because if we can partition the given set into two subsets of an equal sum, we get the minimum difference i.e. zero. This transforms our problem to Subset Sum, where we try to find a subset whose sum is equal to a given number-- ‘S/2’ in our case. If we can’t find such a subset, then we will take the subset which has the sum closest to ‘S/2’. This is easily possible, as we will be calculating all possible sums with every subset.

Essentially, we need to calculate all the possible sums up to ‘S/2’ for all numbers. So how do we populate the array `db[TotalNumbers][S/2+1]` in the bottom-up fashion?

For every possible sum ‘s’ (where 0 <= s <= S/2), we have two options:
- Exclude the number. In this case, we will see if we can get the sum ‘s’ from the subset excluding this number => `dp[index-1][s]`
- Include the number if its value is not more than ‘s’. In this case, we will see if we can find a subset to get the remaining sum => `dp[index-1][s-num[index]]`

If either of the two above scenarios is true, we can find a subset with a sum equal to ‘s’. We should dig into this before we can learn how to find the closest subset.



#### Challenge
Can we further improve our bottom-up DP solution? Can you find an algorithm that has O(S)O(S) space complexity?



---