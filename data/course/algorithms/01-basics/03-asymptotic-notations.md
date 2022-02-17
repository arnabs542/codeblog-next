---
title: 'Asymptotic Notations'
type: 'topic'
section: 'Basics'
course: 'Algorithms'
tags:
- java
---
#### Lower and Upper Bound Theory
The Lower and Upper Bound Theory provides a way to find the lowest complexity algorithm to solve a problem.

##### Lower Bound
- Let L(n) be the running time of an algorithm A(say), then g(n) is the Lower Bound of A if there exist two constants C and N such that L(n) >= C*g(n) for n > N.
- Lower bound of an algorithm is shown by the asymptotic notation called Big Omega (or just Omega).

##### Upper Bound
- Let U(n) be the running time of an algorithm A(say), then g(n) is the Upper Bound of A if there exist two constants C and N such that U(n) <= C*g(n) for n > N.
- Upper bound of an algorithm is shown by the asymptotic notation called Big Oh(O) (or just Oh).

---
### Asymptotic Notations
- The asymptotic notation compares two functions, say, f(n)f(n) and g(n)g(n) for very large values of nn.

#### 1. Big O Notation
- A function f(n) is considered O(g(n)), read as big oh of g(n), if there exists some positive real constant c and an integer n0 ≥ 0, such that the following inequality holds for all n ≥ n0: `f(n) ≤ cg(n)`
- It tells us that for very large values of nn, f(n) will be at most within a constant factor of g(n). In other words, f(n) will grow no faster than a constant multiple of g(n). The rate of growth of f(n) is within constant factors of that of g(n).
- The Big O notation defines the _tight_ upper bound of an algorithm, it bounds a function only from above.

#### 2. Big Omega Ω Notation
- A function f(n) is in Ω(g(n)) if there exists a real constant c > 0 and there exists n0 > 0 such that f(n) ≥ cg(n) for n ≥ n0.
- In other words, for sufficiently large values of n, f(n) will grow at least as fast as g(n).
- Ω notation provides an asymptotic lower bound.

#### 3. Big Theta Θ Notation
- If f(n) is in O(g(n)) and f(n) is also in Ω(g(n)), then it is in Θ(n).
- Formally, f(n) is in Θ(n) if there exist constants c1 > 0, c​2 > 0 and n0 > 0 such that c1g(n) ≤ f(n) ≤ c​2g(n) and n ≥ n0.
- If f(n)f(n) is \Theta(g(n))Θ(g(n)), then the two functions grow at the same rate, within constant factors.
- The theta notation bounds a functions from above and below, so it defines exact asymptotic behavior.

#### 4. Little ο notation
- f(n) is in o(g(n)) if for any constant c > 0 there is an n0 > n such that f(n) < cg(n) (strictly less) for all n ≥ n.
- For Big O, it is sufficient that one pair of c and n​0 values exist to satisfy the f(n) ≤ cg(n) inequality for all n ≥ n. In case of little o, there must be a value of n0 > 0 for any positive choice of c.
- The little ‘o’ notation shows that there is a minimum n after which the inequality holds no matter how small you make c, as long as it is not negative or zero.

#### 5. Little ω notation
- A function f(n)is in ω(g(n)) if for any c > 0 there exists an n > 0 such that f(n) > cg(n) for n ≥ n

**Note**
- If f(n) ∈ O(g(n)), then g(n) ∈ Ω(f(n))
- It is a common misconception that Big O characterizes worst-case running time while Big Omega characterizes the best-case running time of an algorithm.
- There is no one-to-one relationship between any of the cases and the asymptotic notations.

---
### Why Big ‘O’ is preferred over other notations
- In algorithm analysis, we tend to focus on the worst-case time and space complexity.

---
### Properties of Asymptotic Notations
1. **Transitive Properties**
    - f(n) = O(g(n)) and g(n) = O(h(n)) => f(n) = O(h(n))
2. **Reflexive Properties**
    - f(n) = O(f(n))
4. **Symmetric Properties**
    - f(n) = O(g(n)) if and only if g(n) = O(f(n))
5. **Transpose Symmetric Properties**
    - f(n) = O(g(n)) if and only if g(n) = Ω(f(n))

---
### Useful Formulae

|Summation   |Equation   |
|---|---|
|∑<sup>n</sup><sub>i=1 </sub>c = c+c+c+⋯+c   |cn   |
|∑<sup>n</sup><sub>i=1 </sub>i = 1+2+3+⋯+n   |n(n+1)/2   |
|∑<sup>n</sup><sub>i=1 </sub>i<sup>2</sup> = 1+4+9+⋯+n<sup>2</sup>   |n(n+1)(n+2)/6   |
|∑<sup>n</sup><sub>i=1 </sub>r<sup>i</sup> = r<sup>0</sup>+r<sup>1</sup>+r<sup>2</sup>+⋯+r<sup>n</sup>   |(r<sup>n-1</sup>-1)/(r-1)   |

---
### Common Complexity Scenarios
1. **O(1):** Time complexity of a function (or set of statements) is considered as O(1) if it doesn’t contain loop, recursion and call to any other non-constant time function.
2. **O(n):** Time Complexity of a loop is considered as O(n) if the loop variables is incremented / decremented by a constant amount.
3. **O(nc):** Time complexity of nested loops is equal to the number of times the innermost statement is executed.
4. **O(Logn):** Time Complexity of a loop is considered as O(Logn) if the loop variables is divided / multiplied by a constant amount.
5. **O(LogLogn):** Time Complexity of a loop is considered as O(LogLogn) if the loop variables is reduced / increased exponentially by a constant amount.

#### Recurrences
There are mainly three ways for solving recurrences.
1. **Substitution Method:** We make a guess for the solution and then we use mathematical induction to prove the guess is correct or incorrect.
2. **Recurrence Tree Method:** In this method, we draw a recurrence tree and calculate the time taken by every level of tree. Finally, we sum the work done at all levels.
3. **Master Method:** Master Method is a direct way to get the solution.

---
#### Polynomial Algorithms
On the other hand, an algorithm whose time complexity is only based on number of elements in array (not value) is considered as polynomial time algorithm.

#### Pseudo-polynomial Algorithms
- An algorithm whose worst case time complexity depends on numeric value of input (not number of inputs) is called Pseudo-polynomial algorithm.

**Pseudo-polynomial and NP-Completeness**
- Some NP-Complete problems have Pseudo Polynomial time solutions. For example, Dynamic Programming Solutions of 0-1 Knapsack, Subset-Sum and Partition problems are Pseudo-Polynomial.
- NP complete problems that can be solved using a pseudo-polynomial time algorithms are called weakly NP-complete.


---