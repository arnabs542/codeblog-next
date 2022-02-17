---
title: 'Introduction to Dynamic Programming'
type: 'topic'
section: 'Dynamic Programming'
course: 'Algorithms'
tags:
- java
---
#### What is Dynamic Programming?
Is repeating the things for which you already have the answer, a good thing ? A programmer would disagree. That's what Dynamic Programming is about. To always remember answers to the sub-problems you've already solved.

Dynamic Programming (DP) is an algorithmic technique for solving an optimization problem by breaking it down into simpler subproblems and utilizing the fact that the optimal solution to the overall problem depends upon the optimal solution to its subproblems.

Some famous Dynamic Programming algorithms are:
- Unix diff for comparing two files
- Bellman-Ford for shortest path routing in networks
- TeX the ancestor of LaTeX
- WASP - Winning and Score Predictor

###### Dynamic Programming and Recursion
Dynamic programming is basically, recursion plus using common sense. What it means is that recursion allows you to express the value of a function in terms of other values of that function. Where the common sense tells you that if you implement your function in a way that the recursive calls are done in advance, and stored for easy access, it will make your program faster. This is what we call **Memoization** - it is memorizing the results of some specific states, which can then be later accessed to solve other sub-problems.

**The intuition behind dynamic programming is that we trade space for time**, i.e. to say that instead of calculating all the states taking a lot of time but no space, we take up space to store the results of all the sub-problems to save time later.

###### Example
Fibonacci numbers are a series of numbers in which each number is the sum of the two preceding numbers. The first few Fibonacci numbers are 0, 1, 1, 2, 3, 5, and 8, and they continue on from there.

```
Fib(n) = Fib(n-1) + Fib(n-2), for n > 1
```
As we can clearly see here, to solve the overall problem (i.e. Fib(n)), we broke it down into two smaller subproblems (which are Fib(n-1) and Fib(n-2)). This shows that we can use DP to solve this problem.

---
Majority of the Dynamic Programming problems can be categorized into two types:
###### 1. Optimization problems
- The optimization problems expect you to select a feasible solution, so that the value of the required function is minimized or maximized.

###### 2. Combinatorial problems
- Combinatorial problems expect you to figure out the number of ways to do something, or the probability of some event happening.

**Every Dynamic Programming problem has a schema to be followed:**
- Show that the problem can be broken down into optimal sub-problems.
- Recursively define the value of the solution by expressing it in terms of optimal solutions for smaller sub-problems.
- Compute the value of the optimal solution in bottom-up fashion.
- Construct an optimal solution from the computed information.

> One can think of dynamic programming as a table-filling algorithm: you know the calculations you have to do, so you pick the best order to do them in and ignore the ones you don't have to fill in.

---
#### Characteristics of Dynamic Programming
###### 1. Overlapping Subproblems
- Subproblems are smaller versions of the original problem. Any problem has overlapping sub-problems if finding its solution involves solving the same subproblem multiple times.
- https://en.wikipedia.org/wiki/Overlapping_subproblems

###### 2. Optimal Substructure
- Any problem has optimal substructure property if its overall optimal solution can be constructed from the optimal solutions of its subproblems.
- For example, the Shortest Path problem has following optimal substructure property:
If a node x lies in the shortest path from a source node u to destination node v then the shortest path from u to v is combination of shortest path from u to x and shortest path from x to v. The standard All Pair Shortest Path algorithms like **Floyd–Warshall** and **Bellman–Ford** are typical examples of Dynamic Programming.
- On the other hand, the Longest Path problem doesn’t have the Optimal Substructure property. Here by Longest Path we mean longest simple path (path without cycle) between two nodes. Consider the following unweighted graph given in the CLRS book. There are two longest paths from q to t: q→r→t and q→s→t. Unlike shortest paths, these longest paths do not have the optimal substructure property. For example, the longest path q→r→t is not a combination of longest path from q to r and longest path from r to t, because the longest path from q to r is q→s→t→r and the longest path from r to t is r→q→s→t.
- https://en.wikipedia.org/wiki/Optimal_substructure

```
Fib(n) = Fib(n-1) + Fib(n-2)
```

---
#### Steps to solve a DP Problem
###### 1. Identify if it is a DP problem:
- Typically, all the problems that require to maximize or minimize certain quantity or counting problems that say to count the arrangements under certain condition or certain probability problems can ###### be solved by using Dynamic Programming:
- All dynamic programming problems satisfy the overlapping subproblems property and most of the classic dynamic problems also satisfy the optimal substructure property. Once, we observe these properties in a given problem, be sure that it can be solved using DP.

###### 2. Decide a state expression with least parameters:
- A state can be defined as the set of parameters that can uniquely identify a certain position or standing in the given problem. This set of parameters should be as small as possible to reduce state space.

###### 3. Formulate state relationship:
- This part is the hardest part of for solving a DP problem and requires a lot of intuition, observation and practice.

**Problem:** Given 3 numbers {1, 3, 5}, we need to tell the total number of ways we can form a number 'N' using the sum of the given three numbers. (allowing repetitions and different arrangements).

**How to do it?** So here the intuition comes into action. As we can only use 1, 3 or 5 to form a given number. Let us assume that we know the result for n = 1,2,3,4,5,6 ; being termilogistic let us say we know the result for the
state (n = 1), state (n = 2), state (n = 3) ……… state (n = 6)

Now, we wish to know the result of the state (n = 7). See, we can only add 1, 3 and 5. Now we can get a sum total of 7 by the following 3 ways:
1) Adding 1 to all possible combinations of state (n = 6)
Eg :
```
[ (1+1+1+1+1+1) + 1]
[ (1+1+1+3) + 1]
[ (1+1+3+1) + 1]
[ (1+3+1+1) + 1]
[ (3+1+1+1) + 1]
[ (3+3) + 1]
[ (1+5) + 1]
[ (5+1) + 1]
```

2) Adding 3 to all possible combinations of state (n = 4);
```
[(1+1+1+1) + 3]
[(1+3) + 3]
[(3+1) + 3]
```

3) Adding 5 to all possible combinations of state(n = 2)
```
[ (1+1) + 5]
```

Now, think carefully and satisfy yourself that the above three cases are covering all possible ways to form a sum total of 7; Therefore, we can say that result for
```
state(7) = state (6) + state (4) + state (2)
state(7) = state (7-1) + state (7-3) + state (7-5)
In general, state(n) = state(n-1) + state(n-3) + state(n-5)
```

###### 4. Do tabulation (or add memoization):
- This is the easiest part of a dynamic programming solution. We just need to store the state answer so that next time that state is required, we can directly use it from our memory

---
#### Dynamic Programming Methods
Two different ways to store the values so that these values can be reused:

#### 1. Top-down with Memoization
- In this approach, we try to solve the bigger problem by recursively finding the solution to smaller sub-problems.
- Whenever we solve a sub-problem, we cache its result so that we don’t end up solving it repeatedly if it’s called multiple times. Instead, we can just return the saved result.
- This technique of storing the results of already solved subproblems is called **Memoization**.

```java
class Fibonacci {

  public int CalculateFibonacci(int n) {
    int memoize[] = new int[n+1];
    return CalculateFibonacciRecursive(memoize, n);
  }

  public int CalculateFibonacciRecursive(int[] memoize, int n) {
    if(n < 2)
      return n;

    // if we have already solved this subproblem, simply return the result from the cache
    if(memoize[n] != 0)
      return memoize[n];

    memoize[n] = CalculateFibonacciRecursive(memoize, n-1) + CalculateFibonacciRecursive(memoize, n-2);
    return memoize[n];
  }

  public static void main(String[] args) {
    Fibonacci fib = new Fibonacci();
    System.out.println("5th Fibonacci is ---> " + fib.CalculateFibonacci(5));
    System.out.println("6th Fibonacci is ---> " + fib.CalculateFibonacci(6));
    System.out.println("7th Fibonacci is ---> " + fib.CalculateFibonacci(7));
  }
}
```

#### 2. Bottom-up with Tabulation
- In this approach, we solve the problem “bottom-up” i.e. by solving all the related sub-problems first. This is typically done by filling up an n-dimensional table.
- Based on the results in the table, the solution to the top/original problem is then computed.

Eg, Since we know that every Fibonacci number is the sum of the two preceding numbers, we can use this fact to populate our table.
```java
class Fibonacci {

  public int CalculateFibonacci(int n) {
    if (n==0) return 0;
    int dp[] = new int[n+1];

    //base cases
    dp[0] = 0;
    dp[1] = 1;

    for(int i=2; i<=n; i++)
      dp[i] = dp[i-1] + dp[i-2];

    return dp[n];
  }

  public static void main(String[] args) {
    Fibonacci fib = new Fibonacci();
    System.out.println("5th Fibonacci is ---> " + fib.CalculateFibonacci(5));
    System.out.println("6th Fibonacci is ---> " + fib.CalculateFibonacci(6));
    System.out.println("7th Fibonacci is ---> " + fib.CalculateFibonacci(7));
  }
}
```

<img src="https://media.geeksforgeeks.org/wp-content/cdn-uploads/Tabulation-vs-Memoization-1.png"></img>

---