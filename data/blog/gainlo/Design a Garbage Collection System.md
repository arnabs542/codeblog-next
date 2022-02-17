---
title: Design a Garbage Collection System
type: blog
date: 2020-06-03
authors: ['Ashish']
image: ../cover.jpg
tags:
- database
- design
- scale
---
### What do you know about garbage collection?
Many interviewers like to discuss language preference with candidates. Sometimes it’s like a warm-up discussion, but sometimes they’d like to go deeper. Inevitability, garbage collection will be included in the discussion for sure as it’s one of the most important concepts in almost all programming languages.

As an interviewer, I’d like to start the discussion by asking “tell me about what you know about garbage collection”. This question can give me an idea of how familiar the candidate is with this topic.

Back to the question, [**garbage collection**](https://en.wikipedia.org/wiki/Garbage_collection_(computer_science)) is a system that automatically recycles unused memory in programming languages. A most popular example is Java. When writing Java, you don’t need to control how memory is allocated and recycled. Everything happens in the background.

### Pros & cons
The most obvious benefit of having garbage collection is that it makes programming much easier. Remember when we write C++, we need to be extremely careful about pointers and memory allocation. By handling all of these by the program itself, developers can focus more on the core logic.

More specifically, garbage collection helps developers avoid several memory problems. First, it prevents accessing dangling pointers that point to an object that no longer exists. Secondly, it prevents freeing a region of memory that is already freed (double free). Last, it avoids [**memory leak**](https://en.wikipedia.org/wiki/Memory_leak), which means an unreachable region of memory that can never be freed. All of them are common pitfalls when developers try to manage memory manually.

**So what are the disadvantages?** The biggest disadvantage is that garbage collection consumes computing resources. Think about this, not only does garbage collection need to implement logics to recycle memory, it also consumes memory to store the status of objects. In some naive garbage collection implementation, the recycle process may even block the program potentially.

Another way to think about this is that without garbage collection, the developer has the full control over how memory is used, which gives the program much more flexibility and much easier to optimize. That’s one of the reasons why C++ is more efficient. Of course, it’s also prone to error.

### Design a simple garbage collection system
Since the essence of a garbage collection system is to recycle unused memory in the program, the key is to identify which piece of memory is unused. More specifically, we should **search for variables that are no longer referenced**.

If you think about all the objects (variables) in a program, it’s like a directional graph that each object references other objects and at the same time is also referenced by some objects. As a result, unreachable objects, which are those without any reference, should be recycled. As you can see, **the big problem has been simplified to a graph problem – find unreachable nodes in a graph**.

### Naive mark-and-sweep
In fact, the above solution is just the most naive approach, which is called [mark-and-sweep](https://en.wikipedia.org/wiki/Tracing_garbage_collection#Na.C3.AFve_mark-and-sweep). To begin with, the garbage collection system does a tree traversal following object references and mark all the visited objects. In the second phase, for all the unreachable objects, free their memory.

But how does the system track those unreachable objects? One easy way is to keep a set of all the objects in the program. Whenever a new object is initialized, add it to the pool.

As you can see, the essence of the mark-and-sweep approach is no different from a simple graph traversal problem. That’s why I always emphasize on base data structures/algorithms, which are really the foundation of all technical interview questions.

The idea of the naive mark-and-sweep approach is quite straightforward. The system does a tree traversal following object references and mark all the visited objects. In the second phase, for all the unreachable objects, free their memory.

**What are the disadvantages?**
The most notable problem is that the entire system must be suspended during garbage collection. In other words, once in a while, the problem will be frozen when doing garbage collection and no mutation of the working set can be allowed. Thus, it’ll significantly affect the performance of time-critical applications.

### Improvement
Given the performance issue of mark-and-sweep, one modern garbage collection system takes a slightly different approach – [Tri-color making](https://en.wikipedia.org/wiki/Tracing_garbage_collection#Tri-color_marking).

Let me briefly introduce the algorithm. In a nutshell, the system marks all the objects into three colors:

- **White** – objects that have no reference and should be recycled.
- **Black** – reachable objects that shouldn’t be recycled. Black objects have no reference to white objects.
- **Gray** – objects that are reachable from roots and yet to be scanned for references to white.

Initially, all the objects that are referenced from roots are in gray and the white sets include everything else (black is empty). Each time the system picks an object from gray to black and move all its references from white to gray. In the end, gray becomes empty and all white objects are recycled.

The most notable advantage is that the **system can do garbage collection on the fly**, which is accomplished by marking objects as they are allocated and during mutation. Thus, the program won’t be halted for long time and performance gets improved.

### Reference counting
So what are other ways to design a garbage collection system that won’t freeze the program?

A natural solution is reference counting and the idea is extremely simple. The core concept of garbage collection is when an object has zero reference, we should recycle it as soon as possible. So why not just keep track of the reference count for each object?

The reference counting system will keep a counter for each object that counts the number of references it has. The counter is incremented when a reference to it is created, and decremented when a reference is destroyed. When the counter is 0, the object should be recycled. Obviously, the system can do the garbage collection on the fly since it’s able to release the memory at the right time.

What are the disadvantages of this approach?

### Disadvantage of reference counting
Apparently, the **reference counter adds space overhead to the whole system**. Since every single object needs additional storage for its reference count, the overall space needed can be increased significantly without any optimization.

Another problem is the speed overhead. Since the system needs to keep updating the counter, every operation in the program requires modification of one or more reference counters. Another way to understand this is that instead of freeze the program to recycle objects, reference counting system divides the overhead into every small operation. Since you can’t get everything for free, you need to decide if you want every operation becomes slightly slower or stop the entire program once in a while.

In addition, cycles can also be a problem of reference counting. If two objects reference each other, they will never be recycled. If you have experience with obj-c, you should already know the solution. Some languages introduce the concept of “weak reference” for the back pointers that creates the cycle. It is a special reference object whose existence does not increment the reference count of the referent object.


---