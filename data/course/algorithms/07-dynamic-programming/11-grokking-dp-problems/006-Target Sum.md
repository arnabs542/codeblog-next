---
title: Target Sum
type: problem
topic: Grokking DP Problems
section: Dynamic Programming
course: Algorithms
visibility: ''
tags:
- System Design
---
#### Problem:
Given a set of positive numbers (non zero) and a target sum ‘S’. Each number should be assigned either a ‘+’ or ‘-’ sign. We need to find out total ways to assign symbols to make the sum of numbers equal to target ‘S’.

```
Input: {1, 1, 2, 3}, S=1
Output: 3
Explanation: The given set has '3' ways to make a sum of '1':
{+1-1-2+3} & {-1+1-2+3} & {+1+1+2-3}

Input: {1, 2, 7, 1}, S=9
Output: 2
Explanation: The given set has '2' ways to make a sum of '9':
{+1+2+7-1} & {-1+2+7+1}
```

#### Method 1: DP - Tabulation (Bottom-up)
- This problem follows the 0/1 Knapsack pattern and can be converted into Count of Subset Sum. Let’s dig into this.
- We are asked to find two subsets of the given numbers whose difference is equal to the given target ‘S’. Take the first example above. As we saw, one solution is {+1-1-2+3}. So, the two subsets we are asked to find are {1, 3} & {1, 2}
```
Sum(s1) - Sum(s2) = S
```
This equation can be reduced to the subset sum problem. Let’s assume that ‘Sum(num)’ denotes the total sum of all the numbers, therefore:
```
Sum(s1) + Sum(s2) = Sum(num)
```
Let’s add the above two equations:
```
=> Sum(s1) - Sum(s2) + Sum(s1) + Sum(s2) = S + Sum(num)
=> 2 * Sum(s1) =  S + Sum(num)
=> Sum(s1) = (S + Sum(num)) / 2
```
This essentially converts our problem to: “Find count of subsets of the given numbers whose sum is equal to”,
```
=> (S + Sum(num)) / 2
```



#### Code

The above solution has time and space complexity of O(N*S), where ‘N’ represents total numbers and ‘S’ is the desired sum.

We can further improve the solution to use only O(S) space.

#### Space Optimized Solution



---