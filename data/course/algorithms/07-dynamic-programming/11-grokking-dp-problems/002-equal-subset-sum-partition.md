---
title: 'Equal Subset Sum Partition'
type: 'problem'
topic: Grokking DP Problems
section: 'Dynamic Programming'
course: Algorithms
tags:
- System Design
---
#### Problem:
Given a set of positive numbers, find if we can partition it into two subsets such that the sum of elements in both the subsets is equal.
```
Input: {1, 2, 3, 4}
Output: True
Explanation: The given set can be partitioned into two subsets with equal sum: {1, 4} & {2, 3}
```

#### Method 1: Brute-force


#### Method 2: Memoization (Top-down)


#### Method 3: Tabulation (Bottom-up)
`dp[i][s]` will be ‘true’ if we can make sum ‘s’ from the first ‘i’ numbers.

So, for each number at index ‘i’ (0 <= i < num.length) and sum ‘s’ (0 <= s <= S/2), we have two options:
- Exclude the number. In this case, we will see if we can get ‘s’ from the subset excluding this number: dp[i-1][s]
- Include the number if its value is not more than ‘s’. In this case, we will see if we can find a subset to get the remaining sum: dp[i-1][s-num[i]]

---