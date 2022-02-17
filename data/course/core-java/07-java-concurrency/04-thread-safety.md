---
title: Thread Safety
type: topic
section: Java Concurrency
course: Core Java
tags:
- java
---
#### Problem
Java provides multi-threaded environment support using Java Threads, we know that multiple threads created from same Object share object variables and this can lead to data inconsistency when the threads are used to read and update the shared data.

The reason for data inconsistency is because updating any field value is not an atomic process, it requires three steps:
1. read the current value
2. do the necessary operations to get the updated value
3. assign the updated value to the field reference.

#### Thread Safety in Java
Thread safety in java is the process to make our program safe to use in multithreaded environment, there are different ways through which we can make our program thread safe.
1. **Synchronization** is the easiest and most widely used tool for thread safety in java.
1. Use of **Atomic Wrapper** classes from `java.util.concurrent.atomic` package. For example AtomicInteger
1. Use of **locks** from `java.util.concurrent.locks` package.
1. Using **thread safe collection** classes. Eg, `ConcurrentHashMap` for thread safety.
1. Using **volatile** keyword with variables to make every thread read the data from memory, not read from thread cache.

---


---