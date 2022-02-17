---
title: Count ways to assign unique cap to every person (Bitmasking)
type: problem
topic: Advanced Problems
section: Dynamic Programming
course: Algorithms
tags:
- System Design
---
#### Problem
There are 100 different types of caps each having a unique id from 1 to 100. Also, there are ‘n’ persons each having a collection of a variable number of caps. One day all of these persons decide to go in a party wearing a cap but to look unique they decided that none of them will wear the same type of cap. So, count the total number of arrangements or ways such that none of them is wearing the same type of cap.

Since, number of ways could be large, so output modulo 1000000007

**Example**
```yml
The first line contains the value of n, next n lines contain collections 
of all the n persons.
Input: 
3
5 100 1     // Collection of the first person.
2           // Collection of the second person.
5 100       // Collection of the third person.

Output:
4
Explanation: All valid possible ways are (5, 2, 100), (100, 2, 5), (1, 2, 5) and (1, 2, 100)
```


#### Method 1: Brute-force - Backtracking
A Simple Solution is to try all possible combinations. Start by picking the first element from the first set, marking it as visited and recur for remaining sets. It is basically a Backtracking based solution.




#### Method 2: Bitmasking and DP
The idea is to use the fact that there are upto 10 persons. So we can use an integer variable as a bitmask to store which person is wearing a cap and which is not.

```
Let i be the current cap number (caps from 1 to i-1 are already 
processed). Let integer variable mask indicates that the persons w
earing and not wearing caps.  If i'th bit is set in mask, then 
i'th person is wearing a cap, else not.

             // consider the case when ith cap is not included 
                     // in the arrangement
countWays(mask, i) = countWays(mask, i+1) +             
                    
                    // when ith cap is included in the arrangement
                    // so, assign this cap to all possible persons 
                    // one by one and recur for remaining persons.
                    ∑ countWays(mask | (1 << j), i+1)
                       for every person j that can wear cap i 
 
Note that the expression "mask | (1 << j)" sets j'th bit in mask.
And a person can wear cap i if it is there in the person's cap list
provided as input.
```

If we draw the complete recursion tree, we can observe that many subproblems are solved again and again. So we use Dynamic Programming. A table dp[][] is used such that in every entry dp[i][j], i is mask and j is cap number.

Since we want to access all persons that can wear a given cap, we use an array of vectors, capList[101]. A value capList[i] indicates the list of persons that can wear cap i.



---