---
title: 'Mutex vs Semaphore vs Monitor'
type: 'problem'
topic: 'Basics'
section: 'Java Multithreading for Senior Engineering Interviews'
course: 'Educative'
problemlist: true
visibility: secret
tags:
- System Design
---
we'll now discuss the all-important mechanisms of locking and signaling in multi-threaded applications and the differences amongst these constructs.

## Mutex
Mutex as the name hints implies **mutual exclusion**. A mutex is used to guard shared data such as a linked-list, an array or any primitive type. A mutex allows only a single thread to access a resource or critical section.

Once a thread acquires a mutex, all other threads attempting to acquire the same mutex are blocked until the first thread releases the mutex. Once released, most implementations arbitrarily chose one of the waiting threads to acquire the mutex and make progress.

## Semaphore
Semaphore, on the other hand, is used for limiting access to a collection of resources. Think of semaphore as having a limited number of permits to give out. If a semaphore has given out all the permits it has, then any new thread that comes along requesting for a permit will be blocked, till an earlier thread with a permit returns it to the semaphore. A typical example would be a pool of database connections that can be handed out to requesting threads. Say there are ten available connections but 50 requesting threads. In such a scenario, a semaphore can only give out ten permits or connections at any given point in time.

A semaphore with a single permit is called a **binary semaphore** and is often thought of as an equivalent of a mutex, which isn't completely correct as we'll shortly explain. Semaphores can also be used for signaling among threads. This is an important distinction as it allows threads to cooperatively work towards completing a task. A mutex, on the other hand, is strictly limited to serializing access to shared state among competing threads.

##### Mutex Example
The following illustration shows how two threads acquire and release a mutex one after the other to gain access to shared data. Mutex guarantees the shared state isn't corrupted when competing threads work on it.

##### When a Semaphore Masquerades as a Mutex?
A semaphore can potentially act as a mutex if the permits it can give out is set to 1. However, the most important difference between the two is that in case of a mutex t**he same thread must call acquire and subsequent release on the mutex** whereas in case of a binary sempahore, **different threads can call acquire and release on the semaphore**. The pthreads library documentation states this in the **`pthread_mutex_unlock()`** method's description.

> If a thread attempts to unlock a mutex that it has not locked or a mutex which is unlocked, undefined behavior results.

This leads us to the concept of **ownership**. A mutex is owned by the thread acquiring it till the point the owning-thread releases it, whereas for a semaphore there's no notion of ownership.

#### Semaphore for Signaling
Another distinction between a semaphore and a mutex is that semaphores can be used for signaling amongst threads, for example in case of the classical **producer/consumer** problem the producer thread can signal the consumer thread by incrementing the semaphore count to indicate to the consumer thread to consume the freshly produced item. A mutex in contrast only guards access to shared data among competing threads by forcing threads to serialize their access to critical sections and shared data-structures.

#### Summary
1. Mutex implies mutual exclusion and is used to serialize access to critical sections whereas semaphore can potentially be used as a mutex but it can also be used for cooperation and signaling amongst threads. Semaphore also solves the issue of **missed signals**.
1. Mutex is **owned** by a thread, whereas a semaphore has no concept of ownership.
1. Mutex if locked, must necessarily be unlocked by the same thread. A semaphore can be acted upon by different threads. This is true even if the semaphore has a permit of one
1. Think of semaphore analogous to a car rental service such as Hertz. Each outlet has a certain number of cars, it can rent out to customers. It can rent several cars to several customers at the same time but if all the cars are rented out then any new customers need to be put on a waitlist till one of the rented cars is returned. In contrast, think of a mutex like a lone runway on a remote airport. Only a single jet can land or take-off from the runway at a given point in time. No other jet can use the runway simultaneously with the first aircraft.

--- 
## Mutex vs Monitor
#### When Mutual Exclusion isn't Enough
Concisely, a monitor is a mutex and then some. Monitors are generally language level constructs whereas mutex and semaphore are lower-level or OS provided constructs.

To understand monitors, let's first see the problem they solve. Usually, in multi-threaded applications, a thread needs to wait for some program predicate to be true before it can proceed forward. Think about a producer/consumer application. If the producer hasn't produced anything the consumer can't consume anything, so the consumer must **wait on** a predicate that lets the consumer know that something has indeed been produced. What could be a crude way of accomplishing this? The consumer could repeatedly check in a loop for the predicate to be set to true. The pattern would resemble the pseudocode below:
```
void busyWaitFunction() {
    // acquire mutex
    while (predicate is false) {
      // release mutex
      // acquire mutex
    }
    // do something useful
    // release mutex
}
```

Within the while loop we'll first release the mutex giving other threads a chance to acquire it and set the loop predicate to true. And before we check the loop predicate again, we make sure we have acquired the mutex again. This works but is an example of **"spin waiting"** which wastes a lot of CPU cycles. Next, let's see how condition variables solve the spin-waiting issue.

#### Condition Variables
Mutex provides mutual exclusion, however, at times mutual exclusion is not enough. We want to test for a predicate with a mutually exclusive lock so that no other thread can change the predicate when we test for it but if we find the predicate to be false, we'd want to wait on a condition variable till the predicate's value is changed. This thus is the solution to spin waiting.

Conceptually, each condition variable exposes two methods `wait()` and `signal()`. The `wait()` method when called on the condition variable will cause the associated mutex to be atomically released, and the calling thread would be placed in a wait queue. There could already be other threads in the **wait queue** that previously invoked `wait()` on the condition variable. Since the mutex is now released, it gives other threads a chance to change the predicate that will eventually let the thread that was just placed in the **wait queue** to make progress. As an example, say we have a consumer thread that checks for the size of the buffer, finds it empty and invokes `wait()` on a condition variable. The predicate in this example would be the **size of the buffer**.

Now imagine a producer places an item in the buffer. The predicate, the size of the buffer, just changed and the producer wants to let the consumer threads know that there is an item to be consumed. This producer thread would then invoke signal() on the condition variable. The `signal()` method when called on a condition variable causes one of the threads that has been placed in the **wait queue** to get ready for execution. Note we didn't say the woken up thread starts executing, it just gets ready - and that could mean being placed in the ready queue. It is only **after the producer thread which calls the `signal()` method has released the associated mutex that the thread in the ready queue starts executing.** The thread in the ready queue must wait to acquire the mutex associated with the condition variable before it can start executing.

Lets see how this all translates into code.
```
void efficientWaitingFunction() {
    mutex.acquire()
    while (predicate == false) {
      condVar.wait()
    }
    // Do something useful
    mutex.release()     
}

void changePredicate() {
    mutex.acquire()
    set predicate = true
    condVar.signal()
    mutex.release()
}
```

Let's dry run the above code. Say **thread A** executes `efficientWaitingFunction()` first and finds the loop predicate is false and enters the loop. Next **thread A** executes the statement `condVar.wait()` and is be placed in a wait queue. At the same time **thread A** gives up the mutex. Now **thread B** comes along and executes `changePredicate()` method. Since the mutex was given up by **thread A**, **thread B** is be able to acquire it and set the predicate to true. Next it signals the condition variable `condVar.signal()`. This step places **thread A** into the ready queue but **thread A** doesn't start executing until **thread B** has released the mutex.

Note that the order of signaling the condition variable and releasing the mutex can be interchanged, but generally, the preference is to signal first and then release the mutex. However, the ordering might have ramifications on thread scheduling depending on the threading implementation.

**Why the while Loop?**
The wary reader would have noticed us using a while loop to test for the predicate. After all, the pseudocode could have been written as follows
```
void efficientWaitingFunction() {
    mutex.acquire()
    if (predicate == false) {
      condVar.wait()
    }
    // Do something useful
    mutex.release()     
}
```
If the snippet is re-written in the above manner using an `if` clause instead of a `while` then,, we need a guarantee that once the variable `condVar` is signaled, the predicate can't be changed by any other thread and that the signaled thread becomes the owner of the monitor. This may not be true. For one, a different thread could get scheduled and change the predicate back to false before the signaled thread gets a chance to execute, therefore the signaled thread must check the predicate again, once it acquires the monitor. Secondly, use of the loop is necessitated by design choices of monitors that we'll explore in the next section. Last but not the least, on POSIX systems, **spurious or fake wakeups** are possible (also discussed in later chapters) even though the condition variable has not been signaled and the predicate hasn't changed. **The idiomatic and correct usage of a monitor dictates that the predicate always be tested for in a while loop.**

#### Monitor Explained
After the above discussion, we can now realize that **a monitor is made up of a mutex and one or more condition variables.** A single monitor can have multiple condition variables but not vice versa. Theoretically, another way to think about a monitor is to consider it as an entity having two queues or sets where threads can be placed. One is the **entry set** and the other is the **wait set**. When a thread A enters a monitor it is placed into the **entry set**. If no other thread **owns** the monitor, which is equivalent of saying no thread is actively executing within the monitor section, then thread A will **acquire** the monitor and is said to own it too. Thread A will continue to execute within the monitor section till it **exits** the monitor or calls `wait()` on an associated condition variable and be placed into the **wait set**. While thread A **owns** the monitor no other thread will be able to execute any of the critical sections protected by the monitor. New threads requesting ownership of the monitor get placed into the **entry set**.

Continuing with our hypothetical example, say another thread B comes along and gets placed in the entry set, while thread A sits in the **wait set**. Since no other thread owns the monitor, thread B successfully acquires the monitor and continues execution. If thread B exits the monitor section without calling `notify()` on the condition variable, then thread A will remain waiting in the **wait set**. Thread B can also invoke `wait()` and be placed in the **wait set** along with thread A. This then would require a third thread to come along and call `notify()` on the condition variable on which both threads A and B are waiting. Note that only a single thread will be able to **own** the monitor at any given point in time and will have exclusive access to data structures or critical sections protected by the monitor.

Practically, in Java each object is a monitor and implicitly has a lock and is a condition variable too. You can think of a monitor as a **mutex with a wait set**. Monitors allow threads to exercise **mutual exclusion** as well as **cooperation** by allowing them to wait and signal on conditions.

**Above simulation appears below:**
1. Initial Monitor State
2. Two threads come along to enter the monitor
3. Thread A and B get placed in the entry set
3. Thread A enters the monitor and starts execution
3. Thread A executes wait() and gets placed in wait set
3. Thread B is now able to enter the monitor
3. Thread B also invokes wait() and gets placed in the wait set
3. Thread C comes along to enter the monitor
3. Thread C is placed in the entry set
3. Thread C enters the monitor
3. Thread C exits monitor after signalling
3. Thread A resumes ownership of the monitor

---
## Java's Monitor & Hoare vs Mesa Monitors
#### Java's Monitor
In Java every object is a condition variable and has an associated lock that is hidden from the developer. Each java object exposes `wait()` and `notify()` methods.

Before we execute `wait()` on a java object we need to lock its hidden mutex. That is done implicitly through the **synchronized** keyword. If you attempt to call `wait()` or `notify()` outside of a synchronized block, an **`IllegalMonitorStateException`** would occur. It's Java reminding the developer that the mutex wasn't acquired before wait on the condition variable was invoked. `wait()` and `notify()` can only be called on an object once the calling thread becomes the **owner** of the monitor. The ownership of the monitor can be achieved in the following ways:
- the method the thread is executing has synchronized in its signature
- the thread is executing a block that is synchronized on the object on which wait or notify will be called
- in case of a class, the thread is executing a static method which is synchronized.

##### Bad Synchronization Example 1
In the below snippet, `wait()` is being called outside of a synchronized block, i.e. without implicitly locking the associated mutex. Running the code results in **`IllegalMonitorStateException`**
```
class BadSynchronization {
    public static void main(String args[]) throws InterruptedException {
        Object dummyObject = new Object();
        // Attempting to call wait() on the object
        // outside of a synchronized block.
        dummyObject.wait();
    }
}
```

##### Bad Synchronization Example 2
Here's another example where we try to call `notify()` on an object in a synchronized block which is synchronized on a different object. Running the code will again result in an **`IllegalMonitorStateException`**
```
class BadSynchronization {
    public static void main(String args[]) {
        Object dummyObject = new Object();
        Object lock = new Object();
        synchronized (lock) {
            lock.notify();
            // Attempting to call notify() on the object
            // in synchronized block of another object
            dummyObject.notify();
        }
    }
}
```

#### Hoare vs Mesa Monitors
So far we have determined that the idiomatic usage of a monitor requires using a while loop as follows. Let's see how the design of monitors affects this recommendation.
```
while( condition == false ) {
    condVar.wait();
}
```
Once the asleep thread is signaled and wakes up, you may ask why does it need to check for the condition being false again, the signaling thread must have just set the condition to true?

In **Mesa monitors** - Mesa being a language developed by Xerox researchers in the 1970s - it is possible that the time gap between thread B calls `notify()` and releases its mutex and the instant at which the asleep thread A, wakes up and reacquires the mutex, **the predicate is changed back to false by another thread different than the signaler and the awoken threads!** The woken up thread competes with other threads to acquire the mutex once the signaling thread B **empties** the monitor. On signaling, thread B doesn't give up the monitor just yet; rather it continues to own the monitor until it exits the monitor section.

In contrast, **Hoare monitors** - Hoare being one of the original inventor of monitors - the signaling thread B **yields** the monitor to the woken up thread A and thread A enters the monitor, while thread B sits out. This guarantees that the predicate will not have changed and instead of checking for the predicate in a while loop an if-clause would suffice. The woken-up/released thread A immediately starts execution when the signaling thread B signals that the predicate has changed. No other thread gets a chance to change the predicate since no other thread gets to enter the monitor.

Java, in particular, subscribes to Mesa monitor semantics and the developer is always expected to check for condition/predicate in a while loop. Mesa monitors are more efficient than Hoare monitors.

---
## Semaphore vs Monitor
Monitor, mutex, and semaphores can be confusing concepts initially. A monitor is made up of a mutex and a condition variable. One can think of a mutex as a subset of a monitor. Differences between a monitor and semaphore are discussed below.

#### The Difference
- A monitor and a semaphore are interchangeable and theoretically, one can be constructed out of the other or one can be reduced to the other. However, monitors take care of atomically acquiring the necessary locks whereas, with semaphores, the onus of appropriately acquiring and releasing locks is on the developer, which can be error-prone.
- Semaphores are lightweight when compared to monitors, which are bloated. However, the tendency to misuse semaphores is far greater than monitors. When using a semaphore and mutex pair as an alternative to a monitor, it is easy to lock the wrong mutex or just forget to lock altogether. Even though both constructs can be used to solve the same problem, monitors provide a pre-packaged solution with less dependency on a developer's skill to get the locking right.
- Java monitors enforce correct locking by throwing the **IllegalMonitorState** exception object when methods on a condition variable are invoked without first acquiring the associated lock. The exception is in a way saying that either the object's lock/mutex was not acquired at all or that an incorrect lock was acquired.
- A semaphore can allow several threads access to a given resource or critical section, however, only a single thread at any point in time can **own** the monitor and access associated resource.
- Semaphores can be used to address the issue of **missed signals**, however with monitors additional state, called the predicate, needs to be maintained apart from the condition variable and the mutex which make up the monitor, to solve the issue of missed signals.




---