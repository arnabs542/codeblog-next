---
title: ThreadLocal, TimerTask
type: topic
section: Java Concurrency
course: Core Java
tags:
- java
---
#### ThreadLocal
- Java ThreadLocal is used to create thread local variables. We know that all threads of an Object share it’s variables, so the variable is not thread safe. 
- We can use synchronization for thread safety but if we want to avoid synchronization, we can use ThreadLocal variables.
- Every thread has it’s own `ThreadLocal` variable and they can use it’s `get()` and `set()` methods to get the default value or change it’s value local to Thread.
- ThreadLocal instances are typically private static fields in classes that wish to associate state with a thread.

#### TimerTask
- Java `java.util.Timer` is a utility class that can be used to schedule a thread to be executed at certain time in future.
- Java `Timer` class can be used to schedule a task to be run one-time or to be run at regular intervals.
- Java Timer class is **thread safe** and multiple threads can share a single Timer object without need for external synchronization. 
- Timer class uses `java.util.TaskQueue` to add tasks at given regular interval and at any time there can be only one thread running the TimerTask, for example if you are creating a Timer to run every 10 seconds but single thread execution takes 20 seconds, then Timer object will keep adding tasks to the queue and as soon as one thread is finished, it will notify the queue and another thread will start executing.



---