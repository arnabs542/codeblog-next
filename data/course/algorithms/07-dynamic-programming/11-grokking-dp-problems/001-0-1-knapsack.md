---
title: 0/1 Knapsac
type: problem
topic: Grokking DP Problems
section: Dynamic Programmin
course: Algorithms
tags:
- System Design
---
#### Problem:
Given the weights and profits of ‘N’ items, we are asked to put these items in a knapsack which has a capacity ‘C’. The goal is to get the maximum profit from the items in the knapsack. Each item can only be selected once, as we don’t have multiple quantities of any item.

**Example**
```
Items: { Apple, Orange, Banana, Melon }
Weights: { 2, 3, 1, 4 }
Profits: { 4, 5, 3, 7 }
Knapsack capacity: 5
```
**Answer:** 10

Given two integer arrays to represent weights and profits of ‘N’ items, we need to find a subset of these items which will give us maximum profit such that their cumulative weight is not more than a given number ‘C’.

#### Method 1: Brute-force
A basic brute-force solution could be to try all combinations of the given items, allowing us to choose the one with maximum profit and a weight that doesn’t exceed ‘C’.

The time complexity of the above algorithm is exponential O(2^n), where ‘n’ represents the total number of items.
The space complexity is O(n)O(n). This space will be used to store the recursion stack. Since our recursive algorithm works in a depth-first fashion, which means, we can’t have more than ‘n’ recursive calls on the call stack at any time.

#### Method 2: Memoization (Top-down)
Since we have two changing values (`capacity` and `currentIndex`) in our recursive function `knapsackRecursive()`, we can use a two-dimensional array to store the results of all the solved sub-problems. We need to store results for every sub-array (i.e. for every possible index ‘i’) and for every possible capacity ‘c’.

Since our memoization array `dp[profits.length][capacity+1]` stores the results for all the subproblems, we can conclude that we will not have more than `N*C` subproblems (where ‘N’ is the number of items and ‘C’ is the knapsack capacity). This means that our time complexity will be `O(N*C)`.

The above algorithm will be using `O(N*C)` space for the memoization array. Other than that we will use `O(N)` space for the recursion call-stack. So the total space complexity will be `O(N*C + N)`, which is asymptotically equivalent to `O(N*C)`.

#### Method 3: Tabulation (Bottom-up)
We want to find the maximum profit for every sub-array and for every possible capacity. This means, **dp[i][c] will represent the maximum knapsack profit for capacity ‘c’ calculated from the first ‘i’ items**.

So, for each item at **index ‘i’** `(0 <= i < items.length)` and **capacity ‘c’** `(0 <= c <= capacity)`, we have two options:
- Exclude the item at index ‘i’. In this case, we will take whatever profit we get from the sub-array excluding this `item => dp[i-1][c]`
- Include the item at index ‘i’ if its weight is not more than the capacity. In this case, we include its profit plus whatever profit we get from the remaining capacity and from remaining items => `profit[i] + dp[i-1][c-weight[i]]`

Finally, our optimal solution will be maximum of the above two values:
```
dp[i][c] = max (dp[i-1][c], profit[i] + dp[i-1][c-weight[i]]) 
```

Steps
1. With '0' capacity, maximum profit we can have for every subarray is '0'
2. Capacity = 1-7, Index = 0, i.e., if we consider the sub-array till index '0', this means we have only one item to put in the knapsack, we will take it if it is not more than the capacity
3. Capacity = 1, Index =1, since item at index '1' has weight '2', which is greater than the capacity '1', so we will take the dp[index-1][capacity]
4. Capacity = 2, Index =1, from the formula discussed above: max( dp[0][2], profit[1] + dp[0][0] )
5. Capacity = 3, Index =1, from the formula discussed above: max( dp[0][3], profit[1] + dp[0][1] )

The above solution has time and space complexity of O(N*C), where ‘N’ represents total items and ‘C’ is the maximum capacity.

##### How to find the selected items?
- As we know that the final profit is at the bottom-right corner; therefore we will start from there to find the items that will be going in the knapsack.
- At every step we had two options: include an item or skip it. If we skip an item, then we take the profit from the remaining items (i.e. from the cell right above it); if we include the item, then we jump to the remaining profit to find more items.

**Steps:**
1. ‘22’ did not come from the top cell (which is 17); hence we must include the item at index ‘3’ (which is the item ‘D’).
1. Subtract the profit of item ‘D’ from ‘22’ to get the remaining profit ‘6’. We then jump to profit ‘6’ on the same row.
1. ‘6’ came from the top cell, so we jump to row ‘2’.
1. Again ‘6’ came from the top cell, so we jump to row ‘1’.
1. ‘6’ is different than the top cell, so we must include this item (which is item ‘B’).
1. Subtract the profit of ‘B’ from ‘6’ to get the profit ‘0’. We then jump to profit ‘0’ on the same row. As soon as we hit zero remaining profit, we can finish our item search.
1. So items going into the knapsack are {B, D}.

##### Improvement
Can we further improve our bottom-up DP solution? Can you find an algorithm that has `O(C)` space complexity?

The above solution is similar to the previous solution, the only difference is that we use i%2 instead if i and (i-1)%2 instead if i-1. This solution has a space complexity of O(2*C) = O(C)O(2∗C)=O(C), where ‘C’ is the maximum capacity of the knapsack.

This space optimization solution can also be implemented using a single array. It is a bit tricky though, but the intuition is to use the same array for the previous and the next iteration!

If you see closely, we need two values from the previous iteration: dp[c] and dp[c-weight[i]]

Since our inner loop is iterating over c:0-->capacity, let’s see how this might affect our two required values:
- When we access dp[c], it has not been overridden yet for the current iteration, so it should be fine.
- dp[c-weight[i]] might be overridden if “weight[i] > 0”. Therefore we can’t use this value for the current iteration.

To solve the second case, we can change our inner loop to process in the reverse direction: c:capacity-->0. This will ensure that whenever we change a value in dp[], we will not need it anymore in the current iteration.



---