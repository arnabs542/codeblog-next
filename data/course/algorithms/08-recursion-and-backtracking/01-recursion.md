---
title: 'Recursion'
type: 'topic'
section: 'Recursion and Backtracking'
course: 'Algorithms'
tags:
- java
---
## Recursion
- Recursion is when a method calls itself again and again until it reaches a specified stopping condition.
- A recursive function solves a problem by calling a copy of itself to work on a smaller problem. This is called `recursion step`.

#### Why Recursion?
- Recursion code is generally shorter and easy to write.
- Loops are converted into recursive function.
- A recursive method is most useful for tasks that can be defined in terms of similar subtasks.

#### Format of a Recursive Method
1. **Base Case:** The base case is where the call to the method stops, meaning, it does not make any subsequent recursive calls.
2. **Recursive Case:** The recursive case is where the method calls itself again and again until it reaches the base case.

#### Recursion and Memory
- When a method is called, the state of the method is placed on the call stack along with the information about where it was called from. This tells the run-time where it should return to when the current method finishes executing. Each recursive call pushes a new stack frame. A stack frame consists of information such as the return address, argument variables, and local variables related to that method call.
- When a method calls itself, the new method call gets added to the top of the call stack and execution of the current method pauses while the recursive call is being processed. When the base case is reached the stack frames start popping from the stack until the stack becomes empty.

**Why programming languages such as Haskell, Scala, JavaScript, etc are so in demand nowadays?**
> This is because these languages are based on Functional Programming, meaning the system is built around the concept of recursion. Entire languages are now being based on recursion.

#### When to use Recursion?
1. Problem breaks down into smaller similar subproblems
2. Problem requires an arbitrary number of nested loops
3. Easier to solve it Recursively rather than Iteratively

#### Disadvantages of Recursion
1. A recursive program has greater space requirements than an iterative program, as each method call will remain in the stack until the base case is reached.
2. A also has greater time requirements, i.e., the run-time increases because each time the method is called, the stack grows and the final answer is returned when the stack is popped completely.

---
## Iteration
- Iterative code is a block of code that runs in a loop. In other words, the same code is repeated over and over again.


|Recursion   |Iteration   |
|---|---|
|Terminates when a base case is reached   |Terminates when a condition is proven to be false   |
|Each recursive call requires extra space on the stack(memory)   |Each iteration does not require any extra space   |
|If we get infinite recursion, program may run out of memory and gives stack overflow   |An infinite loop could loop forever since there is no extra memory being created   |
|Solutions to some problems are easier to formulate recursively   |Iterative solutions to a problem may not always be as obvious as a recursive solution   |
|Recursive code is slower than the iterative code. |Iterative code has a relatively faster runtime speed. |

#### Notes on Recursion
1. Two types of cases on recursive algorithms: **recursive case**, **base case**.
2. Every recursive function case must terminate at base case.
3. Generally iterative solutions are more efficient than recursive function calls using a stack.
4. Any problem that can be solved recursively can also be solved iteratively.

---
## Backtracking
- Backtracking is the method of exhaustive search using divide and conquer.
- This is always slow.
- Backtracking speeds the exhaustive search by pruning.

---