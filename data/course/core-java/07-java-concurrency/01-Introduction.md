---
title: 'Introduction'
type: 'topic'
section: 'Java Concurrency'
course: 'Core Java'
tags:
- java
---
#### Process vs Thread
A process is a self contained execution environment and it can be seen as a program or application. However a program itself contains multiple processes inside it. Java runtime environment runs as a single process which contains different classes and programs as processes.

Thread can be called lightweight process. Thread requires less resources to create and exists in the process, thread shares the process resources.

---
#### Multithreading
- Multithreading refers to two or more threads executing concurrently in a single program.
- Multiprocessing and multithreading, both are used to achieve multitasking.
- A computer single core processor can execute only one thread at a time and time slicing is the OS feature to share processor time between different processes and threads.

> We use **multithreading** over **multiprocessing** because threads use a shared memory area. They don't allocate separate memory area so saves memory, and context-switching between the threads takes less time than process.

###### Advantages of Java Multithreading
1. It **doesn't block the user** because threads are independent and you can perform multiple operations at the same time.
2. You **can perform many operations together**, so it saves time.
3. Threads are **independent**, so it doesn't affect other threads if an exception occurs in a single thread.

---
#### Multitasking
Multitasking is a process of executing multiple tasks simultaneously. We use multitasking to utilize the CPU. Multitasking can be achieved in two ways:
1. **Process-based Multitasking (Multiprocessing)**
    - Each process has an address in memory. In other words, each process allocates a separate memory area.
    - A process is heavyweight.
    - Cost of communication between the process is high.
    - Switching from one process to another requires some time for saving and loading registers, memory maps, updating lists, etc.
2. **Thread-based Multitasking (Multithreading)**
    - Threads share the same address space.
    - A thread is lightweight.
    - Cost of communication between the thread is low.

---
#### Concurrency







---