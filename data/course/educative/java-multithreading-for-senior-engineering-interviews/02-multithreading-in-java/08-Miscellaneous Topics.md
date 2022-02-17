---
title: 'Miscellaneous Topics'
type: 'problem'
topic: 'Multithreading in Java'
section: 'Java Multithreading for Senior Engineering Interviews'
course: 'Educative'
problemlist: true
visibility: secret
tags:
- System Design
---
## Lock Fairness
We'll briefly touch on the topic of fairness in locks since its out of scope for this course. When locks get acquired by threads, there's no guarantee of the order in which threads are granted access to a lock. A thread requesting lock access more frequently may be able to acquire the lock unfairly greater number of times than other locks. Java locks can be turned into fair locks by passing in the fair constructor parameter. However, fair locks exhibit lower throughput and are slower compared to their unfair counterparts.

## Thread Pools
Imagine an application that creates threads to undertake short-lived tasks. The application would incur a performance penalty for first creating hundreds of threads and then tearing down the allocated resources for each thread at the ends of its life. The general way programming frameworks solve this problem is by creating a pool of threads, which are handed out to execute each concurrent task and once completed, the thread is returned to the pool

Java offers thread pools via its **Executor Framework**. The framework includes classes such as the **`ThreadPoolExecutor`** for creating thread pools.

## Spurious Wakeups
Spurious mean **fake** or **false**. A spurious wakeup means a thread is woken up even though no signal has been received. Spurious wakeups are a reality and are one of the reasons why the pattern for waiting on a condition variable happens in a while loop as discussed in earlier chapters. There are technical reasons beyond our current scope as to why spurious wakeups happen, but for the curious on POSIX based operating systems when a process is signaled, all its waiting threads are woken up. Below comment is a directly lifted from Java's documentation for the `wait(long timeout)` method.

```
* A thread can also wake up without being notified, interrupted, or
* timing out, a so-called <i>spurious wakeup</i>.  While this will rarely
* occur in practice, applications must guard against it by testing for
* the condition that should have caused the thread to be awakened and
* continuing to wait if the condition is not satisfied.  In other words,
* waits should always occur in loops, like this one:
* 
*     synchronized (obj) {
*         while (condition does not hold)
*             obj.wait(timeout);
*         ... // Perform action appropriate to condition
*     }
*
```


---