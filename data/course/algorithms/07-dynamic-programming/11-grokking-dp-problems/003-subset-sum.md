---
title: 'Subset Sum'
type: 'problem'
topic: Grokking DP Problems
section: 'Dynamic Programming'
course: Algorithms
visibility: ''
tags:
- System Design
---
#### Problem:
Given a set of positive numbers, determine if there exists a subset whose sum is equal to a given number ‘S’.
```
Input: {1, 2, 3, 7}, S=6
Output: True
The given set has a subset whose sum is '6': {1, 2, 3}
```

#### Method 1: Brute-force


#### Method 2: Memoization (Top-down)


#### Method 3: Tabulation (Bottom-up)
We’ll try to find if we can make all possible sums with every subset to populate the array dp[TotalNumbers][S+1].

For every possible sum ‘s’ (where 0 <= s <= S), we have two options:
- Exclude the number. In this case, we will see if we can get the sum ‘s’ from the subset excluding this number => `dp[index-1][s]`
- Include the number if its value is not more than ‘s’. In this case, we will see if we can find a subset to get the remaining sum => `dp[index-1][s-num[index]]`

##### Improvement
Can we further improve our bottom-up DP solution? Can you find an algorithm that has O(S)O(S) space complexity?

---