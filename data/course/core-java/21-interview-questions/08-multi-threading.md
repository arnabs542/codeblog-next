---
title: 'Multi-Threading'
type: 'topic'
section: 'Interview Questions'
course: 'Core Java'
tags:
- java
---
#### Multi-Threading Fundamentals
##### What are some of the differences between a process and a thread?
Some of the differences between a process and a thread are:
- A process can have many threads, whereas a thread can belong to only one process.
- A thread is lightweight than a process and uses less resources than a process.
- A thread has some state private to itself but threads of a process can share the resources allocated to the process including memory address space.

##### Can you list some of the problems with using threads?
Threads if used without thought can sometimes lead to performance degradation for the following reasons:
- **Usually hard to find bugs**, some that may only rear head in production environments (think race conditions)
- **Higher cost of code maintenance** since the code inherently becomes harder to reason about
- **Increased utilization of system resources.** Creation of each thread consumes additional memory, CPU cycles for book-keeping and waste of time in context switches.
- **Too many threads** can decrease program performance due to increased competition to acquire locks (lock contention).

##### What is a deadlock?

Deadlocks happen when two or more **threads aren't able to make any progress because the resource required by the first thread is held by the second and the resource required by the second thread is held by the first and both threads wait on eachother to release the required resource.**

Below is an example program demonstrating deadlock for two threads. The code widget will generate an error since the deadlock causes program execution to timeout.
```java
import java.util.concurrent.CountDownLatch;

class Demonstration {

    public static void main(String args[]) {
        Deadlock deadlock = new Deadlock();
        try {
            deadlock.runTest();
        } catch (InterruptedException ie) {
        }
    }
}

class Deadlock {

    private int counter = 0;
    private Object lock1 = new Object();
    private Object lock2 = new Object();
    CountDownLatch latch = new CountDownLatch(2);

    Runnable incrementer = new Runnable() {

        @Override
        public void run() {
            try {
                for (int i = 0; i < 100; i++) {
                    incrementCounter();
                    System.out.println("Incrementing " + i);
                }
            } catch (InterruptedException ie) {
            }
        }
    };

    Runnable decrementer = new Runnable() {

        @Override
        public void run() {
            for (int i = 0; i < 100; i++) {
                decrementCounter();
                System.out.println("Decrementing " + i);
            }
        }
    };

    public void runTest() throws InterruptedException {

        Thread thread1 = new Thread(incrementer);
        Thread thread2 = new Thread(decrementer);

        thread1.start();
        // sleep to make sure thread 1 gets a chance to acquire lock1
        Thread.sleep(100);
        thread2.start();

        thread1.join();
        thread2.join();

        System.out.println("Done : " + counter);
    }

    void incrementCounter() throws InterruptedException {
        synchronized (lock1) {
            latch.countDown();
            System.out.println("Acquired lock1");
            latch.await();
            synchronized (lock2) {
                counter++;
            }
        }
    }

    void decrementCounter() {
        synchronized (lock2) {
            System.out.println("Acquired lock2");
            latch.countDown();
            synchronized (lock1) {
                counter--;
            }
        }
    }
}
```

##### What is Liveness?
**Ability of a program or an application to execute in a timely manner is called liveness.** If a program experiences a deadlock then it's not exhibiting liveness.

##### What is a live lock?
A live-lock happens when two threads appear to be making progress but in reality are keep taking actions in response to the other thread instead of making real progress. The best analogy is to think of two persons trying to cross each other in a hallway. John moves to the left to let Arun pass, and Arun moves to his right to let John pass. Both block each other now. John sees he's now blocking Arun and moves to his right and Arun moves to his left seeing he's blocking John. They never cross each other and keep blocking each other. This scenario is an example of a livelock.

##### What is starvation?
Other than a deadlock, an application thread can also experience starvation, where the thread never gets CPU time or access to shared resources because other "greedy" threads hog system resources. For instance if a lock protects a resource that require serialized access by threads, it is possible that an unlucky thread never gets to acquire the lock if there are several threads competing to acquire the same lock and the system randomly chooses a thread to grant lock access.

##### What are the ways of representing tasks that can be executed by threads in Java?
Runnable interface, Callable interface and subclassing Thread class

**Explanation:** Runnable interface is the basic task abstraction in Java. A task can be represented through a class implementing the Runnable or Callable interface. Another way is to extend the Thread class itself and override the run method.

##### Consider the code snippet below:
```
    public void spawnThread() {
        Thread innerThread = new Thread(new Runnable() {
            public void run() {
                for (int i = 0; i < 100; i++) {
                    System.out.println("I am a new thread !");
                }
            }
        });
 
        innerThread.start();
        System.out.println("Main thread exiting");
    }
```
How many times will the innerThread print its messages?

innerThread prints exactly 100 messages even if the main thread exits before innerThread is done

**Explanation:** Even if the main thread exits earlier than the innerThread, the JVM will wait for the innerThread to finish. If the snippet is run on the console, exactly 100 messages will be printed by the innerThread.

##### Consider the following setup:
```
    public void spawnDaemonThread() {
        Thread innerThread = new Thread(new Runnable() {
            public void run() {
                for (int i = 0; i < 100; i++) {
                    System.out.println("I am a daemon thread !");
                }
            }
        });
 
        innerThread.setDaemon(true);
        innerThread.start();
        System.out.println("Main thread exiting");
    }
```
How many messages will the innerThread print?

**Answer:** a few

**Explanation:** Since we marked the innerThread as a daemon thead, when the main thread exits, the JVM also kills any threads marked daemon, therefore if run on the console, only a few messages will be printed by the innerThread. The innerThread will be killed by JVM before it can run to completion.

---
#### Thread Safety
##### What is a thread safe class?
A class is thread safe if it behaves correctly when accessed from multiple threads, irrespective of the scheduling or the interleaving of the execution of those threads by the runtime environment, and with no additional synchronization or other coordination on the part of the calling code.

##### Is the following class thread-safe?
```
public class Sum {
    int sum(int... vals) {
        int total = 0;
        for (int i = 0; i < vals.length; i++) {
            total += vals[i];
        }
        return total;
    }
}
```
**Answer:** Yes, All stateless objects and their corresponding classes are thread-safe. Since the actions of a thread accessing a stateless object can't affect the correctness of operations in other threads, stateless objects are thread-safe.

##### What is a race condition?
A race condition occurs when the correctness of a computation depends on the relative timing or interleaving of multiple threads by the runtime; in other words, getting the right answer relies on lucky timing. Two of the race condition are:
- **check-then-act:** Usually the value of a variable is checked and then an action is taken. Without proper synchronization, the resulting code can have a race condition. An example is below:
```
        Object myObject = null;
        if (myObject == null) {
            myObject = new Object();
        }
```
- **read-modify-write:** For instance, whenever a counter variable is increment, the old state of the counter undergoes a transformation to a new state. Without proper synchronization guards, the counter increment operation can become a race condition.

The below program spawns two threads. One thread prints the value of a shared variable whenever the shared variable is divisible by 5. A race condition happens when the printer thread executes a test-then-act if clause, which checks if the shared variable is divisible by 5 but before the thread can print the variable out, its value is changed by the modifier thread. Some of the printed values aren't divisible by 5 which verifies the existence of a race condition in the code.
```java
import java.util.*;

class Demonstration {

    public static void main(String args[]) throws InterruptedException {
          RaceCondition.runTest();
    }
}

class RaceCondition {

    int randInt;
    Random random = new Random(System.currentTimeMillis());

    void printer() {

        int i = 1000000;
        while (i != 0) {
            if (randInt % 5 == 0) {
                if (randInt % 5 != 0)
                  System.out.println(randInt);
            }
            i--;
        }
    }

    void modifier() {

        int i = 1000000;
        while (i != 0) {
            randInt = random.nextInt(1000);
            i--;
        }
    }

    public static void runTest() throws InterruptedException {


        final RaceCondition rc = new RaceCondition();
        Thread thread1 = new Thread(new Runnable() {

            @Override
            public void run() {
                rc.printer();
            }
        });
        Thread thread2 = new Thread(new Runnable() {

            @Override
            public void run() {
                rc.modifier();
            }
        });

        
        thread1.start();
        thread2.start();

        thread1.join();
        thread2.join();
    }
}
```

---
#### Mutexes vs Semaphores
##### What is the difference between a mutex and a semaphore?

A mutex allows only a single thread to access a resource. It forces competing threads to serialize their access for the requested resource.

Semaphore, on the other hand, is used for limiting access to a collection of resources. Think of semaphore as having a limited number of permits to give out. If a semaphore has given out all the permits it has, then any new thread that comes along requesting for a permit will be blocked, till an earlier thread with a permit returns it to the semaphore. A typical example would be a pool of database connections that can be handed out to requesting threads. Say there are ten available connections but 50 requesting threads. In such a scenario, a semaphore can only give out ten permits or connections at any given point in time.

A semaphore with a single permit is called a binary semaphore and is often thought of as an equal of a mutex, which isn't completely correct. Semaphores can also be used for signalling among threads. This is an important distinction as it allows threads to cooperatively work towards completing a task. A mutex, on the other hand, is strictly limited to serializing access to shared state among competing threads.

##### Can a semaphore act as a mutex?
A semaphore can potentially act as a mutex if the number of permits it can give out is set to 1. However, the most important difference between the two is that in the case of a mutex **the same thread must call acquire and subsequent release on the mutex** whereas in case of a binary sempahore, different threads can call acquire and release on the semaphore.

This leads us to the concept of "ownership". **A mutex is owned by the thread acquiring it, till the point, it releases it, whereas for a semaphore there's no notion of ownership.**

##### Does Java have a mutex?
In the Java programming language there's no mutex but something called a **monitor** which can be thought of as a mutex with bells and whistles. When we use `synchronized` in an instance method signature we are in reality acquiring the monitor associated with the object. When we use `synchronized` in a static method signature we are acquire the monitor associated with the class object.

##### Summary
- Mutex implies mutual exclusion and is used to serialize access to critical sections whereas semaphore can potentially be used as a mutex but it can also be used for cooperation and signalling amongst threads. Semaphore also solve the issue of 'missed signals'.
- Mutex is 'owned' by a thread, whereas a semaphore has no concept of ownership.
- Mutex if locked, must necessarily be unlocked by the same thread. A semaphore can be acted upon by different threads. This is true even if semaphore has a permit of one
- Think of semaphore analogous to a car rental service such as Hertz. Each outlet has a certain number of cars, it can rent out to customers. It can rent several cars to several customers at the same time but if all the cars are rented out then any new customers need to be put on a waitlist till one of the rented cars is returned. In contrast, think of a mutex like a lone runway on a remote airport. Only a single jet can land or take-off from the runway at a given point in time. No other jet can use the runway simultaneously with the first aircraft.

---
#### Synchronized
##### What is synchronized?
Java’s most fundamental construct for thread synchronization is the `synchronized` keyword. It can be used to restrict access to critical sections one thread at a time.

Each object in Java has an entity associated with it called the monitor lock or just monitor. Think of it as an exclusive lock. Once a thread gets hold of the monitor of an object, it has exclusive access to all the methods marked as `synchronized`. No other thread will be allowed to invoke a method on the object that is marked as `synchronized` and will block, till the first thread releases the monitor which is equivalent of the first thread exiting the `synchronized` method.

Note carefully:
1. For static methods, the monitor will be the class object, which is distinct from the monitor of each instance of the same class.
1. If an uncaught exception occurs in a `synchronized` method, the monitor is still released.
1. Furthermore, `synchronized` blocks can be re-entered that is they are reentrant.

You may think of `synchronized` as the mutex portion of a monitor.
```
class Employee {
 
    // shared variable
    private String name;
 
    // method is synchronize on 'this' object
    public synchronized void setName(String name) {
        this.name = name;
    }
 
    // also synchronized on the same object
    public synchronized void resetName() {
 
        this.name = "";
    }
 
    // equivalent of adding synchronized in method
    // definition
    public String getName() {
        synchronized (this) {
            return this.name;
        }
    }
}
```
As an example, look at the Employee class above. All the three methods are synchronized on the this object. If we created an object and three different threads attempted to execute each method of the object, only one will get access, and the other two will block. If we synchronized on a different object other than the this object, which is only possible for the getName() method given the way we have written the code, then the critical sections of the program become protected by two different locks. In that scenario, since setName() and resetName() would have been synchronized on the this object only one of the two methods could be executed concurrently. However getName() would be synchronized independently of the other two methods and can be executed alongside one of them. The change would like look as follows:
```
class Employee {
 
    // shared variable
    private String name;
    private Object lock = new Object();
 
    // method is synchronize on 'this' object
    public synchronized void setName(String name) {
        this.name = name;
    }
 
    // also synchronized on the same object
    public synchronized void resetName() {
 
        this.name = "";
    }
 
    // equivalent of adding synchronized in method
    // definition
    public String getName() {
        // Using a different object to synchronize on
        synchronized (lock) {
            return this.name;
        }
    }
}
```
All the sections of code that are guarded with `synchronized` blocks on the same object can have at most one thread executing inside of them at any given point in time. These sections of code may belong to different methods, classes or be spread across the code base.

Note with the use of the `synchronized` keyword, Java forces you to implicitly acquire and release the monitor-lock for the object within the same method One can't explicitly acquire and release the monitor in different methods. This has an important ramification, **the same thread will acquire and release the monitor!** In contrast, if we used a semaphore, we could acquire/release them in different methods or by different threads.

##### Consider the code snippet below:
```
class NewbieSynchronization {
 
    Boolean flag = new Boolean(true);
 
    public void example() throws InterruptedException {
 
        Thread t1 = new Thread(new Runnable() {
 
            public void run() {
                synchronized (flag) {
                    try {
                        while (flag) {
                            System.out.println("First thread about to sleep");
                            Thread.sleep(5000);
                            System.out.println("Woke up and about to invoke wait()");
                            flag.wait();
                        }
                    } catch (InterruptedException ie) {
 
                    }
                }
            }
        });
 
        Thread t2 = new Thread(new Runnable() {
 
            public void run() {
                flag = false;
                System.out.println("Boolean assignment done.");
            }
        });
 
        t1.start();
        Thread.sleep(1000);
        t2.start();
        t1.join();
        t2.join();
    }
}
```
**Answer:** IllegalStateException is thrown
```
class Demonstration {
    public static void main( String args[] ) throws InterruptedException {
        (new NewbieSynchronization()).example();
    }
}

class NewbieSynchronization {

    Boolean flag = new Boolean(true);

    public void example() throws InterruptedException {

        Thread t1 = new Thread(new Runnable() {

            public void run() {
                synchronized (flag) {
                    try {
                        while (flag) {
                            System.out.println("First thread about to sleep");
                            Thread.sleep(5000);
                            System.out.println("Woke up and about to invoke wait()");
                            flag.wait();
                        }
                    } catch (InterruptedException ie) {

                    }
                }
            }
        });

        Thread t2 = new Thread(new Runnable() {

            public void run() {
                flag = false;
                System.out.println("Boolean assignment done.");
            }
        });

        t1.start();
        Thread.sleep(1000);
        t2.start();
        t1.join();
        t2.join();
    }
}
```
A classic newbie mistake is to `synchronize` on an object and then somewhere in the code reassign the object. We `synchronize` on a Boolean object in the first thread but sleep before we call `wait()` on the Boolean object. While the first thread is asleep, the second thread goes on to change the flag's value. When the first thread wakes up and attempts to invoke `wait(),` it is met with a IllegalMonitorState exception! The object the first thread `synchronize`d on before going to sleep has been changed, and now it is attempting to call `wait()` on an entirely different object without having `synchronize`d on it.

##### Is marking all the public methods of a class `synchronized` a good idea to achieve thread safety?
Marking all methods of a class `synchronized` to achieve thread-safety is a poor choice. You may be able to make your class thread-safe but you have essentially serialized access to the public API of your class, resulting in decreased throughput. Consider making critical sections as granular as possible, so that access by competing threads is only serialized where truly needed.

---
#### Volatile
##### Explain the concept of `volatile`.
The `volatile` concept is specific to Java. Its easier to understand `volatile`, if you understand the problem it solves.

If you have a variable say a counter that is being worked on by a thread, it is possible the thread keeps a copy of the counter variable in the CPU cache and manipulates it rather than writing to the main memory. The JVM will decide when to update the main memory with the value of the counter, even though other threads may read the value of the counter from the main memory and may end up reading a stale value.

If a variable is declared `volatile` then whenever a thread writes or reads to the `volatile` variable, the read and write always happen in the main memory. As a further guarantee, all the variables that are visible to the writing thread also get written-out to the main memory alongside the `volatile` variable. Similarly, all the variables visible to the reading thread alongside the `volatile` variable will have the latest values visible to the reading thread.

`Volatile` comes into play because of multiples levels of memory in hardware architecture required for performance enhancements. If there's a single thread that writes to the `volatile` variable and other threads only read the `volatile` variable then just using `volatile` is enough, however, if there's a possibility of multiple threads writing to the `volatile` variable then synchronized would be required to ensure atomic writes to the variable.

##### Consider the class setup below:
```
class TaleOfTwoThreads {
    boolean flag = true;
    public void signalToStop() {
        flag = false;
    }
 
    public void run() {
        while (flag) {
 
            // ... Run like crazy
        }
    }
}
```
When will the “All Done” statement be printed for the following snippet
```
        TaleOfTwoThreads example = new TaleOfTwoThreads();
 
        // start runner thread
        Thread runner = new Thread(() -> example.run());
        runner.start();
 
        // wait for one second before signalling to stop
        Thread.sleep(1000);
        Thread stopper = new Thread(() -> example.signalToStop());
        stopper.start();
 
        // wait for two threads to complete processing
        stopper.join();
        runner.join();
        System.out.println("All Done");
```
**Answer:** May be printed after atleast one second

The answer may seem counterintuitive but because the variable `flag` isn't marked `volatile` the runner thread in the example may or may not ever see the variable value get updated. If we mark the `flag` variable `volatile` the situation would be fixed. Also note we don't need to `synchronize` access to the `flag` variable because only a single thread ever reads and a single thread ever writes to the variable.

---
#### Wait() and Notify()
##### Explain the wait() method.
The `wait()` method is exposed on each jJava object. Each Java object can act as a condition variable. When a thread executes the `wait()` method, it releases the monitor for the object and is placed in the wait queue. **Note that the thread must be inside a synchronized block of code that synchronizes on the same object as the one on which `wait()` is being called, or in other words, the thread must hold the monitor of the object on which it'll call `wait()`.** If not so, an `illegalMonitor` exception is raised. Following is the general idiom for using `wait()`.

General Idiom to use wait
```
   // The standard idiom for using the wait() method
   synchronized (obj) {
       while (<condition does not hold>)
           obj.wait(); // Lock released & reacquired on wakeup
           // ...         Do Processing
   }
```

##### Why is it necessary to wrap the wait() method call in a while loop?
It is necessary to wrap the `wait()` method call in a while loop for the following reasons:
- A `notifyAll()` will wake up all the threads waiting on the same monitor. In situations where only one thread should be allowed to make progress, the rest of the threads should check for the invariant again in a while loop. It is possible that a previously woken up thread has changed the invariant back to false.
- Consider the code snippet below, which demonstrates a perverse case of an invariant changing back to false before a notified thread gets a chance to execute.
```
        Object lock = new Object();
        Thread thread = new Thread(() -> {
            synchronized (lock) {
                while (!flag) {
                    try {
                        System.out.println("thread 1 is about to wait");
                        lock.wait();
                        System.out.println("thread 1 woken up with flag set to " + flag);
                    } catch (InterruptedException ie) {
                        // swallow
                    }
                }
            }
        });
 
        thread.start();
        Thread.sleep(1000);
        Thread thread2 = new Thread(() -> {
            synchronized (lock) {
                while (!flag) {
                    lock.notify();
                    System.out.println("thread 2 just notified");
                    flag = true;
                }
            }
 
            // Thread 2 can potentially be context-switched at this point.
            // If it does, then thread 1 finds the invariant which is the flag 
            // variable set to true, otherwise the invariant gets changed back 
            // to false, even though thread 1 has been notified. It is imperative
            // that thread 1 checks for the invariant whenever it gets notified.
 
            synchronized (lock) {
                flag = false;
                System.out.println("thread 2 changed flag back to false");
            }
        });
 
        thread2.start();
        thread2.join();
        thread.join();
```
If the first thread in the above code didn't check for the invariant in a while loop when it gets notified then it may erroneously proceed forward even though the invariant has been changed to false since the last time the thread was notified. The below snippet for thread 1 would be incorrect:
```
            synchronized (lock) {
                // Incorrectly replaced while with if
                if (!flag) {
                    try {
 
                        System.out.println("thread 1 is about to wait");
                        lock.wait();
                        System.out.println("thread 1 woken up with flag set to " + flag);
                    } catch (InterruptedException ie) {
                        // swallow
                    }
                }
            }
        });
```
If you run the code below, it'll time out. thread 1 checks for the invariant in a while loop and finds the flag set to false even though it has been notified by thread 2. You can uncomment lines 39 - 43 to induce an artificial context switch for thread 2 and verify that thread 1 doesn't get blocked anymore.
```
class Demonstration {
    
    static boolean flag = false;

    public static void main( String args[] ) throws InterruptedException {
        Object lock = new Object();

        Thread thread = new Thread(() -> {

            synchronized (lock) {
                while (!flag) {
                    try {

                        System.out.println("thread 1 is about to wait");
                        lock.wait();
                        System.out.println("thread 1 woken up with flag set to " + flag);
                    } catch (InterruptedException ie) {
                        // swallow
                    }
                }
            }
        });

        thread.start();

        Thread.sleep(1000);

        Thread thread2 = new Thread(() -> {

            synchronized (lock) {
                while (!flag) {
                    lock.notify();
                    System.out.println("thread 2 just notified");
                    flag = true;
                }
            }

            
            // try {
            //     Thread.sleep(100);
            // } catch (InterruptedException ie){
            //   // swallow
            // }

            synchronized (lock) {
                flag = false;
                System.out.println("thread 2 changed flag back to false");
            }
        });

        thread2.start();
        thread2.join();
        thread.join();
    }
}
```

- **Spurious wakeups** are possible, where a waiting thread can wake up without being interrupted or notified. The woken up thread should check the invariant again which will be false and go back to waiting on the monitor. This is only possible in a while loop.
- A thread waiting on a monitor can be interrupted by other threads via the `interrupt()` method. Usually, when this happens, the intent is to have the waiting thread abort the operation altogether and not check for the invariant.

##### Consider the snippet below:
```
class WhatsWrong {
    Object object = new Object();
    Object lock = new Object();
    Boolean flag = true;

    void doSomethingImportant() throws InterruptedException {
        synchronized (object) {
            while (flag) {
                lock.wait();
            }
            // ... Proceed to do something important
        }
    }
 
    void changeFlag() {
        flag = !flag;
        synchronized (object) {
            lock.notify();
        }
    }
}
```
Can you identify what’s wrong with the class above?

**Answer:** Synchronized on object but invoking wait() and notify() on lock

##### Explain the `notify()` method?
Like the wait method, `notify()` can only be called by the thread which owns the monitor for the object on which `notify()` is being called else an illegal monitor exception is thrown. The notify method, will awaken one of the threads in the associated wait queue, i.e., waiting on the thread's monitor.

However, this thread will not be scheduled for execution immediately and will compete with other active threads that are trying to synchronize on the same object. The thread which executed notify will also need to give up the object’s monitor, before any one of the competing threads can acquire the monitor and proceed forward.

##### What is the `notifyAll()` method?
This method is the same as the `notify()` one except that it wakes up all the threads that are waiting on the object's monitor.

---
#### More on Threading
##### How can we interrupt threads?
The thread class exposes the `interrupt()` method which can be used to interrupt a thread that is blocked in a `sleep()` or `wait()` call. Note that invoking the interrupt method only sets a flag that is polled periodically by sleep or wait implementation to know if the current thread has been interrupted. If so an interrupted exception is thrown.

Below is an example, where a thread is initially made to sleep for an hour but then interrupted by the main thread.
```
class Demonstration {
    public static void main( String args[] ) throws InterruptedException {
        InterruptExample.example();
    }
}


class InterruptExample {

    static public void example() throws InterruptedException {

        final Thread sleepyThread = new Thread(new Runnable() {

            public void run() {
                try {
                    System.out.println("I am too sleepy... Let me sleep for an hour.");
                    Thread.sleep(1000 * 60 * 60);
                } catch (InterruptedException ie) {
                    System.out.println("The interrupt flag is cleard : " + Thread.interrupted() + " " + Thread.currentThread().isInterrupted());                  
                    Thread.currentThread().interrupt();
                    System.out.println("Oh someone woke me up ! ");
                    System.out.println("The interrupt flag is set now : " + Thread.currentThread().isInterrupted() + " " + Thread.interrupted());                                    
                  
                }
            }
        });

        sleepyThread.start();

        System.out.println("About to wake up the sleepy thread ...");
        sleepyThread.interrupt();
        System.out.println("Woke up sleepy thread ...");

        sleepyThread.join();
    }
}
```
Take a minute to go through the output of the above program. Observe the following:
- Once the interrupted exception is thrown, the interrupt status/flag is cleared as the output of **line-19** shows.
- On **line-20** we again interrupt the thread and no exception is thrown. This is to emphasize that merely calling the interrupt method isn't responsible for throwing the interrupted exception. Rather the implementation should periodically check for the interrupt status and take appropriate action.
- On **line-22** we print the interrupt status for the thread, which is set to true because of **line 20**.
- Note that there are two methods to check for the interrupt status of a thread. One is the static method `Thread.interrupted()` and the other is `Thread.currentThread().isInterrupted()`. The important difference between the two is that the static method would return the interrupt status and also clear it at the same time. On **line 22** we deliberately call the object method first followed by the static method. If we reverse the ordering of the two method calls on **line 22**, the output for the line would be true and false, instead of true and true.

##### What is a re-entrant lock?
Java's answer to the traditional mutex is the reentrant lock, which comes with additional bells and whistles. It is similar to the implicit monitor lock accessed when using `synchronized` methods or blocks. With the reentrant lock, you are free to lock and unlock it in different methods but not with different threads. If you attempt to unlock a reentrant lock object by a thread which didn't lock it initially, you'll get an `IllegalMonitorStateException`. This behavior is similar to when a thread attempts to unlock a pthread mutex.

##### What is a condition variable?
We saw how each Java object exposes the three methods, `wait()`,`notify()` and `notifyAll()` which can be used to suspend threads till some condition becomes true. You can think of the condition variable as factoring out these three methods of the object monitor into separate objects so that there can be multiple wait-sets per object. As a reentrant lock replaces synchronized blocks or methods, a condition replaces the object monitor methods. In the same vein, one can't invoke the condition variable's methods without acquiring the associated lock, just like one can't wait on an object's monitor without synchronizing on the object first. In fact, a reentrant lock exposes an API to create new condition variables, like so:
```
Lock lock = new ReentrantLock();
Condition myCondition  = lock.newCondition();
```
Notice, how we can now have multiple condition variables associated with the same lock. In the `synchronized` paradigm, we could only have one wait-set associated with each object.

The following runnable snippet shows how an `IllegalMonitorStateException` is raised when a reentrant lock is attempted to be locked and unlocked by two different threads.
```
import java.util.concurrent.locks.ReentrantLock;

class Demonstration {
    public static void main( String args[] ) throws InterruptedException {
        MisuseOfReentrantLock misuse = new MisuseOfReentrantLock();
        Thread thread1 = new Thread(() -> misuse.method1());

        Thread thread2 = new Thread(() -> misuse.method2());

        thread1.start();
        thread2.start();

        thread1.join();
        thread2.join();
    }
}

class MisuseOfReentrantLock {
    Boolean flag = true;
    ReentrantLock reentrantLock = new ReentrantLock();

    void method1() {

        reentrantLock.lock();

        while (flag) {

            try {
                Thread.sleep(1000);
                flag = false;
            } catch (InterruptedException ie) {
                // Don't ignore in production
            }
        }
        System.out.println("Thread 1 finishes successfully");
    }


    void method2() {

        reentrantLock.unlock();

        // Never gets printed
        System.out.println("Thread 2 finishes successfully");
    }
}
```

##### Can you give an example of a missed signal?
A missed signal happens when a signal is sent by a thread before the other thread starts waiting on a condition. This is exemplified by the following code snippet. Missed signals are caused by using the wrong concurrency constructs. In the example below, a condition variable is used to coordinate between the signaller and the waiter thread. The condition is signaled at a time when no thread is waiting on it causing a missed signal.
```
import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.ReentrantLock;

class Demonstration {
    public static void main( String args[] ) throws InterruptedException {
        MissedSignalExample.example();
    }
}

class MissedSignalExample {

    public static void example() throws InterruptedException {

        final ReentrantLock lock = new ReentrantLock();
        final Condition condition = lock.newCondition();

        Thread signaller = new Thread(new Runnable() {

            public void run() {
                lock.lock();
                condition.signal();
                System.out.println("Sent signal");
                lock.unlock();
            }
        });

        Thread waiter = new Thread(new Runnable() {

            public void run() {

                lock.lock();

                try {
                    condition.await();
                    System.out.println("Received signal");
                } catch (InterruptedException ie) {
                    // handle interruption
                }

                lock.unlock();

            }
        });

        signaller.start();
        signaller.join();

        waiter.start();
        waiter.join();

        System.out.println("Program Exiting.");
    }
}
```
The above code when ran, will never print the statement `Program Exiting` and execution would time out. The fix is to use a **semaphore** for signalling between the two thread as shown below
```
import java.util.concurrent.Semaphore;

class Demonstration {
    public static void main( String args[] ) throws InterruptedException {
        FixedMissedSignalExample.example();
    }
}

class FixedMissedSignalExample {

    public static void example() throws InterruptedException {

        final Semaphore semaphore = new Semaphore(1);

        Thread signaller = new Thread(new Runnable() {

            public void run() {
                semaphore.release();
                System.out.println("Sent signal");
            }
        });

        Thread waiter = new Thread(new Runnable() {

            public void run() {
                try {
                    semaphore.acquire();
                    System.out.println("Received signal");
                } catch (InterruptedException ie) {
                    // handle interruption
                }
            }
        });

        signaller.start();
        signaller.join();
        Thread.sleep(5000);
        waiter.start();
        waiter.join();

        System.out.println("Program Exiting.");
    }
}
```

##### Explain lock fairness?
We'll briefly touch on the topic of fairness in locks since its out of scope for this course. When locks get acquired by threads, there's no guarantee of the order in which threads are granted access to a lock. A thread requesting lock access more frequently may be able to acquire the lock unfairly greater number of times than other locks. Java locks can be turned into fair locks by passing in the fair constructor parameter. However, fair locks exhibit lower throughput and are slower as compared to their unfair counterparts.

##### What are threadpools?
Imagine an application that creates threads to undertake short-lived tasks. The application would incur a performance penalty for first creating hundreds of threads and then tearing down the allocated resources for each thread at the end of its life. The general way programming frameworks solve this problem is by creating a pool of threads, which are handed out to execute each concurrent task and once completed, the thread is returned to the pool. Thread pools provide:
- Provide improved performance when executing large numbers of asynchronous tasks, due to reduced per-task invocation overhead
- provide a means of bounding and managing the resources, including threads, consumed when executing a collection of tasks.

Java offers thread pools via its **Executor Framework**. The framework includes the class `Executors` which offers static factory methods to instantiate thread pools with different characteristics.






---