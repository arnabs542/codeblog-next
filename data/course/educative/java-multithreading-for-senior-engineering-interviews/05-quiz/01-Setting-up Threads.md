---
title: 'Quiz'
type: 'problem'
topic: 'Quiz'
section: 'Java Multithreading for Senior Engineering Interviews'
course: 'Educative'
problemlist: true
visibility: secret
tags:
- System Design
---
##### Q: What are some of the differences between a process and a thread?

##### A:
- A process can have many threads, whereas a thread can belong to only one process.
- A thread is lightweight than a process and uses less resources than a process.
- A thread has some state private to itself but threads of a process can share the resources allocated to the process including memory address space.

##### Q: Given the below code, can you identify what the coder missed?
```
    void defectiveCode(final int n) throws ExecutionException, InterruptedException {
 
        ExecutorService threadPool = Executors.newFixedThreadPool(5);
 
        Callable<Void> sumTask = new Callable<Void>() {
 
            public Void call() throws Exception {
                System.out.println("Running");
                return null;
            }
        };
 
        threadPool.submit(sumTask);
        f.get();
    }
```
##### A:
The above code forgets to **shutdown** the executor thread pool. The thread pool when instantiated would also create 5 worker threads. If we don't shutdown the executor when exiting the main method, then JVM would also not exit. It will keep waiting for the pool's worker threads to finish, since they aren't marked as daemon. As an example execute the below code snippet.
```
import java.util.concurrent.Callable;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

class Demonstration {
    public static void main( String args[] ) throws Exception {
      ExecutorService threadPool = Executors.newFixedThreadPool(5); 
      
      Callable<Void> someTask = new Callable<Void>() {

            public Void call() throws Exception {
                System.out.println("Running");
                return null;
            }
        };
      
      threadPool.submit(someTask).get();
      
      System.out.println( "Program Exiting" );
    }
}
```
The above program execution will show execution timed out, even though both the string messages are printed. You can fix the above code by adding `threadPool.shutdown()` as the last line of the method.

##### Q: Which `compute()` method do you think would get invoked when `getWorking` is called?
```
class ThreadsWithLambda {
 
    public void getWorking() throws Exception {
        compute(() -> "done");
    }
 
    void compute(Runnable r) {
        System.out.println("Runnable invoked");
        r.run();
    }
 
    <T> T compute(Callable<T> c) throws Exception {
        System.out.println("Callable invoked");
        return c.call();
    }
}
```

##### A:
The lamda expression is returning the string done, therefore the compiler will match the call to the second compute method and the expression will be considered a type of interface Callable. You can run the below snippet and verify the output to convince yourself.
```
import java.util.concurrent.Callable;

class Demonstration {
    public static void main( String args[] ) throws Exception{
        (new LambdaTargetType()).getWorking();
    }
}

class LambdaTargetType {

    public void getWorking() throws Exception {
        compute(() -> "done");
    }

    void compute(Runnable r) {
        System.out.println("Runnable invoked");
        r.run();
    }

    <T> T compute(Callable<T> c) throws Exception {
        System.out.println("Callable invoked");
        return c.call();
    }
}
```

##### Q: What are the ways of representing tasks that can be executed by threads in Java?
##### A: 
Runnable interface and subclassing Thread class

##### Q: Given the code snippet below, how many times will the innerThread print its messages?
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
##### A: innerThread prints exactly 100 messages even if the main thread exits before innerThread is done
**Explanation**:
Even if the main thread exits earlier than the innerThread, the JVM will wait for the innerThread to finish. If the snippet is run on the console, exactly 100 messages will be printed by the innerThread.

##### Q: Given the below code snippet how many messages will the innerThread print?
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
##### A:
a few

**Explanation**:
Since we marked the innerThread as a daemon thead, when the main thread exits, the JVM also kills any threads marked daemon, therefore if run on the console, only a few messages will be printed by the innerThread. The innerThread will be killed by JVM before it can run to completion.

##### Q: Say your program takes exactly 10 minutes to run. After reading this course, you become excited about introducing concurrency in your program. However, you only use two threads in your program. Holding all other variables constant, what is minimum time your improved program can theoretically run in?

##### A:
5 minutes

**Explanation**:
Using two threads, the time can be reduced at most by half. Because each worker thread will do half the workload in parallel, the time to complete the task will be halved.

##### Q: A sequential program is refactored to take advantage of threads. However, the programmer only uses two threads. The workload is divided such that one thread takes 9 times as long as the other thread to finish its work. What is the theoretical maximum speedup of the program as a percentage of the sequential running time?

##### A:
10%

**Explanation**:
Imagine if the thread shorter running thread took 1 unit of time to finish its work then the longer running thread would take 9 units of time to finish its work. If there were a single thread, then it would take 9 units of time to finish the same work that the longer running thread does and then 1 unit of time to do the same work that the shorter running thread does, for a total of 10 units of time. The multithreaded program would finish when the longer running thread finishes which is after 9 units of time. Therefore the speed is:
```
(​​10−9​​)/10 =​1/10​ =0.1=10%
```

---
##### Q: What is a thread safe class?
##### A:
A class is thread safe if it behaves correctly when accessed from multiple threads, irrespective of the scheduling or the interleaving of the execution of those threads by the runtime environment, and with no additional synchronization or other coordination on the part of the calling code.

##### Q: Is the following class thread-safe?
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
##### A:
Yes

**Explanation**
The class Sum is stateless i.e. it doesn't have any member variables. All stateless objects and their corresponding classes are thread-safe. Since the actions of a thread accessing a stateless object can't affect the correctness of operations in other threads, stateless objects are thread-safe.

However, note that the method takes in variable arguments and the class wouldn't be thread safe anymore if the passed in argument was an array instead of individual integer variables and at the same the time, the sum method performed a write operation on the passed in array.

##### Q: What is a race condition
##### A:
A race condition occurs when the correctness of a computation depends on the relative timing or interleaving of multiple threads by the runtime; in other words, getting the right answer relies on lucky timing. Two scenarios which can lead to a race condition are:
- **check-then-act:** Usually the value of a variable is checked and then an action is taken. Without proper synchronization, the resulting code can have a race condition. An example is below:
```
Object myObject = null;
if (myObject == null) {
    myObject = new Object();
}
```
- **read-modify-write:** For instance, whenever a counter variable is increment, the old state of the counter undergoes a transformation to a new state. Without proper synchronization guards, the counter increment operation can become a race condition.

##### Q: Given the following code snippet, can you work out a scenario that causes a race condition?
```
1.  class HitCounter {
2.  
3.      long count = 0;
4.  
5.      void hit() {
6.          count++;
7.      }
8.  
9.     long getHits() {
10.         return this.count;
11.     }
}
```
The following sequence will result in a race condition.
1. Say `count = 7`
1. Thread A is about to execute line #6, which consists of fetching the `count` variable, incrementing it and then writing it back.
1. Thread A reads the count value equal to 7
1. Thread A gets context switched from the processor
1. Thread B executes line#6 atomically and increments `count = 8`
1. Thread A gets scheduled again
1. Thread A had previously read the `count = 7` and increment it to 8 and writes it back.
1. The net effect is `count` ends up with a value 8 when it should have been 9. This is an example of read-modify-write type of race condition.

##### Q: Given the following code snippet, can you work out a scenario that causes a race condition?
##### A:
```
1.  class MySingleton {
2.
3.      MySingleton singleton;
4.
5.      private MySingleton() {
6.      }
7.
8.      MySingleton getInstance() {
9.          if (singleton == null)
10.             singleton = new MySingleton();
11.
12.         return singleton;
13.     }
14. }
```
This is the classic problem in Java for creating a singleton object. The following sequence will result in a race condition:
1. Thread A reaches line#9, finds the `singleton` object null and proceeds to line#10
1. Before executing line#10, Thread A gets context switched out
1. Thread B comes along and executes lines#9 and 10 atomically and the reference `singleton` is no more null.
1. Thread A gets scheduled on the processor again and new's up the `singleton` reference once more.
1. This is an example of a check-then-act use case that causes a race condition.

---
##### Q: Give an example of creating a thread using the `Runnable` interface?
The below snippet creates an instance of the `Thread` class by passing in a lambda expression to create an anonymous class implementing the `Runnable` interface.
```
Thread t = new Thread(() -> {
    System.out.println(this.getClass().getSimpleName());
});

t.start();
t.join();
```
##### A: 
```
class Demonstration {
    public static void main( String args[]) throws Exception {
        Thread t = new Thread(() -> {
            System.out.println("Hello from thread !");
        });
        t.start();
        t.join();     
    }
}
```

##### Q: Give an example of a thread running a task represented by the `Callable<V>` interface?
There's no constructor in the `Thread` class that takes in a type of `Callable`. However, there is one that takes in a type of `Runnable`. We can't directly execute a callable task using an instance of the `Thread` class. However we can submit the callable task to an executor service. Both approaches are shown below:

Callable with Thread Class
```
        // Anoymous class
        Callable<Void> task = new Callable<Void>() {
            @Override
            public Void call() throws Exception {
                System.out.println("Using callable indirectly with instance of thread class");
                return null;
            }
        };
 
        // creating future task
        FutureTask<Void> ft = new FutureTask<>(task);
        Thread t = new Thread(ft);
        t.start();
        t.join();
```
Callable with Executor Service
```
        // Anoymous class
        Callable<Void> task = new Callable<Void>() {
 
            @Override
            public Void call() throws Exception {
                System.out.println("Using callable indirectly with instance of thread class");
                return null;
            }
        };
 
        ExecutorService executorService = Executors.newFixedThreadPool(5);
        executorService.submit(task);
        executorService.shutdown();
```
##### A:
```
import java.util.concurrent.Callable;
import java.util.concurrent.FutureTask;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

class Demonstration {
    public static void main( String args[] ) throws Exception {
        usingExecutorService();
        usingThread();
    }
  
    static void usingExecutorService() {
        // Anoymous class
        Callable<Void> task = new Callable<Void>() {
            @Override
            public Void call() throws Exception {
                System.out.println("Using callable with executor service.");
                return null;
            }
        };

        ExecutorService executorService = Executors.newFixedThreadPool(5);
        executorService.submit(task);
        executorService.shutdown();      
    }
  
    static void usingThread() throws Exception {
        // Anoymous class
        Callable<Void> task = new Callable<Void>() {

            @Override
            public Void call() throws Exception {
                System.out.println("Using callable indirectly with instance of thread class");
                return null;
            }
        };

        // creating future task
        FutureTask<Void> ft = new FutureTask<>(task);
        Thread t = new Thread(ft);
        t.start();
        t.join(); 
    }
}
```

##### Q: Give an example of representing a class using the Thread class.
We can extend from the Thread class to represent our task. Below is an example of a class that computes the square roots of given numbers. The Task class encapsulates the logic for the task being performed.
```
class Task<T extends Number> extends Thread {
    T item;
 
    public Task(T item) {
        this.item = item;
    }
 
    public void run() {
        System.out.println("square root is: " + Math.sqrt(item.doubleValue()));
    }
}
``` 
##### A:
```
class Demonstration {
    public static void main( String args[] ) throws Exception{
      
      Thread[] tasks = new Thread[10]; 
      for(int i = 0;i<10;i++) {
        tasks[i] = new Task(i);
        tasks[i].start();
      }
      
      for(int i = 0;i<10;i++) {
        tasks[i].join();
      }
    }
}

class Task<T extends Number> extends Thread {

    T item;

    public Task(T item) {
        this.item = item;
    }

    public void run() {
        System.out.println("square root is: " + Math.sqrt(item.doubleValue()));
    }
}
```

---
##### Q: What is the `synchronized` keyword?
##### A:
Java provides a built-in mechanism to provide atomicity called the `synchronized` block. A synchronized method is a shorthand for a synchronized block that spans an entire method body and whose lock is the object on which the method is being invoked.

A synchronized block consists of a reference to an object that serves as the lock and a block of code that will be guarded by the lock.

Synchronized blocks guarded by the same lock will execute one at a time. These blocks can be thought of as being executed atomically. Locks provide serialized access to the code paths they guard.

Below is an example of a class with a synchronized method.
```
class ContactBook {
    Collection<String> contacts = new ArrayList<>();
    synchronized void addName(String name) {
        contacts.add(name);
    }
}
```
Note the synchronized method above is equivalent to the following rewrite:
```
    void addName(String name) {
        synchronized(this) {
            contacts.add(name);
        }
    }
```

##### Q: Is the print statement in the below code reachable?
```
  void doubleSynchronization() {
      synchronized (this) {
          synchronized (this) {
              System.out.println("Is this line unreachable ?");
          }
      }
  }
```
##### A: 
Code is reachable because we can synchronize multiple times on the same object

**Explanation:**
Synchronized is reentrant therefore if a thread is already synchroinzed on an object, it'll be able to resynchronize on it. Note in general, not all locks are reentrant and can cause a thread to deadlock itself.

##### Q: Consider the below class which has a synchronized method. Can you tell what object does the thread invoking the addName() method synchronize on?
```
class ContactBook {
    Collection<String> contacts = new ArrayList<>();
 
    synchronized void addName(String name) {
        contacts.add(name);
    }
}
```
Class may be used as follows:
```
        ContactBook contactBook = new ContactBook();
        contactBook.addName("Trump");
```
##### A: 
The object on which a thread invokes the method

**Explanation:**
The method is synchronized on the object on which a thread invokes the method. In the example usage, the method will be synchronized on the contactsBook object. Also note that prefixing the method signature with synchronized is equivalent of the defining the method in the following manner:
```
    void addName(String name) {
        synchronized (this) {
            contacts.add(name);
        }
    }
```

##### Q: An instance method synchronizes on the instance object, do you know what object do static methods synchronize on?
##### A:
A static synchronized method synchronizes on the class object.

---
##### Q: Is the following class thread-safe?
```
public class Sum {
    int count = 0;
    int sum(int... vals) {
        count++;
 
        int total = 0;
        for (int i = 0; i < vals.length; i++) {
            total += vals[i];
        }
        return total;
    }
 
    void printInvocations() {
        System.out.println(count);
    }
}
```
##### A:
No

**Explanation:**
The class isn't thread-safe because it has state that can be mutated by different threads without synchronization amongst them. The state consists of the variable count

##### Q: What are the different ways in which we can make the `Sum` class thread-safe?
##### A:
We can use an instance of the `AtomicInteger` for keeping the count of invocations. The thread-safe code will be as follows:

Using Atomic Integer
```
public class SumFixed {
    AtomicInteger count = new AtomicInteger(0);
    int sum(int... vals) {
        count.getAndIncrement();
        int total = 0;
        for (int i = 0; i < vals.length; i++) {
            total += vals[i];
        }
        return total;
    }
 
    void printInvocations() {
        System.out.println(count.get());
    }
}
```

We can also fix the sum class by using synchronizing on the object instance.

Using Synchronization on `this`
```
public class SumFixed {
    int count = 0;
    synchronized int sum(int... vals) {
        count++;
        int total = 0;
        for (int i = 0; i < vals.length; i++) {
            total += vals[i];
        }
        return total;
    }
 
    synchronized void printInvocations() {
        System.out.println(count);
    }
}
```

We could also use another object other than `this` for synchronization. The code would then be as follows:
```
public class SumFixed {
    int count = 0;
    Object lock = new Object();
    int sum(int... vals) {
        synchronized (lock) {
            count++;
        }
 
        int total = 0;
        for (int i = 0; i < vals.length; i++) {
            total += vals[i];
        }
        return total;
    }
 
    void printInvocations() {
        synchronized (lock) {
            System.out.println(count);
        }
    }
}
```
 
##### Q: In the above question, when we fixed the `Sum` class for thread safety we synchronized the `printInvocations()` method. What will happen if we didn't synchronize the `printInvocations()` method?
##### A:
The `printInvocations()` method performs a read-only operation of the shared variable count. If we skipped synchronizing the method, then the method call can potentially return/print stale value for the `count` variable including zero.

One may be tempted to skip synchronizing the read-only access of variables if the application logic can tolerate stale values for a variable but that is a dangerous proposition. Writes to the count variable may not be visible to other threads because of how the Java's memory model works. We'll need to declare the `count` variable `volatile` to ensure threads reading it see the most recent value. However, marking a variable `volatile` will not eliminate race conditions.

##### Q: If we synchronize the `sum()` method as follows, will it be thread-safe?
```
    int sum(int... vals) {
        Object myLock = new Object();
        synchronized (myLock) {
            count++;
        }
 
        int total = 0;
        for (int i = 0; i < vals.length; i++) {
            total += vals[i];
        }
        return total;
    }
```
##### A: 
No

**Explanation:**
If multiple threads call into the `sum()` method then each thread will create a `myLock` object on it's thread stack on which it will synchronize. In order to ensure thread-safety, threads need to synchronize on the same object.

---
##### Q: Consider the below class:
```
public class MemoryVisibility {
 
    int myvalue = 2;
    boolean done = false;
 
    void thread1() {
 
        while (!done);
        System.out.println(myvalue);
 
    }
 
    void thread2() {
 
        myvalue = 5;
        done = true;
    }
}
```
We create an object of the above class and have two threads run each of the two methods like so:
```
        MemoryVisibility mv = new MemoryVisibility();
 
        Thread thread1 = new Thread(() -> {
            mv.thread1();
        });
 
        Thread thread2 = new Thread(() -> {
            mv.thread2();
        });
 
        thread1.start();
        thread2.start();
 
        thread1.join();
        thread2.join();
```
What will be the output by thread1?
##### A:
May loop forever or print 2 or print 5

**Explanation:**
This is a classic gotcha moment for a newbie to Java concurrency. Remember in the absence of synchronization, the compiler, processor or the runtime are free to take liberty in reordering operations. There's no guarantee that the values written to `myvalue` and `done` by thread2 are visible to thread1 in the same order or visible at all. The updated values may reside in the processor cache and not be immediately propagated to main memory from where thread1 reads. It's also possible that thread1 sees updated value for one of the variables and not for another. Synchronization is not only about mutual exclusion but also about memory visibility.

##### Q: Will the following change guarantee that thead1 sees the changes made to shared variables by thead2?
```
public class MemoryVisibility {
    int myvalue = 2;
    boolean done = false;
 
    void thread1() {
        synchronized (this) {
            while (!done);
            System.out.println(myvalue);
        }
    }
 
    void thread2() {
        myvalue = 5;
        done = true;
    }
}
```
##### A:
No

**Explanation:**
This is a prime example of insufficient synchronization. The reader thread may still see stale values of the shared variables as they may be updated by writer but only in a register or cache.

##### Q: Does synchronized ensure memory visibility? How can we fix the above code using synchronization?
##### A:
We have already seen that synchronization ensures **atomicity** i.e. operations within a synchronized code block all execute together without interruption. You can imagine these operations to be executed like a transaction, where either all of them execute or none execute.

From a memory visibility perspective, say two threads A and B are synchronized on the same object. Once thread A exits the synchronized block (releases the lock), all the variable values that were visible to thread A prior to leaving the synchronized block (releasing the lock) will become visible to thread B as soon as thread B enters the synchronized block (acquires the lock).

The memory visibility class can be fixed with synchronization as follows:
```
public class MemoryVisibility {
    int myvalue = 2;
    boolean done = false;
 
    void thread1() throws InterruptedException {
        synchronized (this) {
            while (!done)
                this.wait();
            System.out.println(myvalue);
        }
    }
 
    void thread2() {
        synchronized (this) {
            myvalue = 5;
            done = true;
            this.notify();
        }
    }
}
```

##### Q: Describe `volatile`? Can it help us with the `MemoryVisibility` class.
##### A: 
When a field is declared `volatile`, it is an indication to the compiler and the runtime that the field is shared and operations on it shouldn't be reordered. Volatile variables aren't cached in registers or caches where they are hidden from other processors. Note that variables declared `volatile` when read always return the most recent write by any thread.

Furthermore volatile variables only guarantee memory visibility but not atomicity.

In the fixed `MemoryVisibility` class using synchronization may seem an overkill as acquiring and releasing locks is never cheap. Volatile provides a weaker form of synchronization and can alleviate the situation in the `MemoryVisibility` class if we declare both the shared variables `volatile`.

##### Q: Will it be enough to declare the `done` flag `volatile` or do we need to declare `myvalue` `volatile` too?
```
public class MemoryVisibility {
    int myvalue = 2;
    volatile boolean done = false;
 
    void thread1() {
        while (!done);
        System.out.println(myvalue);
    }
 
    void thread2() {
        myvalue = 5;
        done = true;
        this.notify();
    }
}
```

It is intuitive to think that if we declare just the boolean flag `volatile`, it'll prevent from infinite looping but the latest value for the variable `myvalue` may not get printed, since it is not declared `myvalue`. However, that is not true and we can get away by only declaring the boolean flag as `volatile`. Though note that declaring both the shared variables `volatile` is acceptable too.

Writing to a `volatile` variable is akin to exiting a synchronized block and reading a volatile variable is akin to entering a synchronized variable. Similar to the visibility guarantees for a synchronized block, after a reader-thread reads a volatile variable, it sees the same values of all the variables as seen by a writer-thread just before the writer-thread wrote to the same volatile variable.

##### Q: If we introduced a third thread that could also mutate the value of `myvalue` variable in the fixed `MemoryVisibility` class that uses `volatile`, how can that affect the value printed by thread1?
##### A:
Consider the below sequence of thread scheduling
- Thread 2 changes the value of `myvalue` to 5 and sets the volatile flag `done` to true
- Thread 3 mutates the value of `myvalue` to say 16 that gets stored in the register
- Thread 1 when scheduled will be guaranteed to see all the values of variables when `done` was updated to true by thead 2. At that time `myvalue` was set to 5 and even though thread 3 changed it to 16, there's no guarantee that thread 2 sees it because it happened after the write to the volatile variable. Therefore at this point it may print 5 or 16.

##### Q: When is `volatile` most commonly used?
##### A:
Common situation where `volatile` can be used are:
- Most common use of volatile variables is as a interruption, completion or status flag
- When writes to a variables don't depend on its current value e.g. a counter is not suitable to be declared volatile as its next value depends on its current value.
- When a single thread ever writes to the variable. Imagine a scenario where only a single thread writes or modifies a shared volatile variable but the variable is read by several other threads. In this situation, race conditions are prevented because only one thread is allowed to write to the shared variable and visibility guarantees of volatile ensure other threads see the most up to date value.
- When locking isn't required for reading the variable or that the variable doesn't participate in maintaining a variant with other state variables

---
##### Q: Can you enumerate the implications of the poor design choice for the below class?
```
public class BadClassDesign {
    private File file;
    public BadClassDesign() throws InterruptedException {
        Thread t = new Thread(() -> {
            System.out.println(this.file);
        });
        t.start();
        t.join();
    }
}
```
##### A:
The above class is a bad design choice for the following reasons:

When creating the thread object in the constructor, the reference to the instance of the enclosing `BadClassDesign` class is also implicitly captured by the anonymous class that implements `Runnable`. The problem with this approach is that the anonymous class can attempt to use the enclosing object while it is still being constructed. This would not be an issue if we didn't start the thread in the constructor. Note that if we invoked an overrideable instance method in the constructor, we'll be giving a derived class a chance to access the half constructed object in an unsafe manner.

The private fields of the `BadClassDesign` class also become accessible to the instance of the anonymous inner class that we pass in to the `Thread` class's constructor.
```
import java.io.File;

class Demonstration {
    public static void main( String args[] ) throws Exception {
      BadClassDesign bcd = (new BadClassDesign());  
    }
}

class BadClassDesign {

    // Private field
    private File file;

    public BadClassDesign() throws InterruptedException {
        Thread t = new Thread(() -> {
            System.out.println(this.getClass().getSimpleName());
           
            // Private field of class is accessible in the anonymous class
            System.out.println(this.file);
        });
        t.start();
        t.join();
    }
}
```

##### Q: What is stack-confinement in the context of threading?
##### A:
All local variables live on the executing thread's stack and are confined to the executing thread. This intrinsically makes a snippet of code thread-safe. For instance consider the following instance method of a class:
```
    int getSum(int n) {
 
        int sum = 0;
        for (int i = 1; i <= n; i++)
            sum += i;
        return sum;
 
    }
```

If several threads were to simultaneously execute the above method, the execution by each thread would be thread-safe since all the threads will have their own copies of the variables in the method above.

Primitive local types are always stack confined but care has to be exercised when dealing with local reference types as returning them from methods or storing a reference to them in shared variables can allow simultaneous manipulation by multiple threads thus breaking stack confinement.

---
##### Q: Consider the class below:
```
public class Counter {
    ThreadLocal<Integer> counter = ThreadLocal.withInitial(() -> 0);
    public Counter() {
        counter.set(10);
    }
 
    void increment() {
        counter.set(counter.get() + 1);
    }
}
```
What would be the output of the method below when invoked?
```
    public void usingThreads() throws Exception {
        Counter counter = new Counter();
        Thread[] tasks = new Thread[100];
 
        for (int i = 0; i < 100; i++) {
            Thread t = new Thread(() -> {
                for (int j = 0; j < 100; j++)
                    counter.increment();
            });
            tasks[i] = t;
            t.start();
        }
 
        for (int i = 0; i < 100; i++) {
            tasks[i].join();
        }
 
        // What is the output of the the below line?
        System.out.println(counter.counter.get());
    }
```

##### A:
10

**Explanation:**
Note that aside from the 100 threads that we create, there's the **main** thread that creates those 100 threads. The constructor for the `counter` variable is invoked only by the main thread and its copy of the threadlocal variable is initialized to 10. The main thread never increments the variable so the print statement prints out 10.

Note that we must initialize the ThreadLocal variable inline than in the constructor because the constructor would only be invoked for a single thread. Usually, static variables are declared threadlocal to keep separate values on a per thread basis.

##### Q: Given the same Counter class as in the previous question, what is the output of println statement below:
```
    public void usingSingleThreadPool() throws Exception { 
        Counter counter = new Counter();
        ExecutorService es = Executors.newFixedThreadPool(1);
        Future<Integer>[] tasks = new Future[100];
 
        for (int i = 0; i < 100; i++) {
            tasks[i] = es.submit(() -> {
                for (int j = 0; j < 100; j++)
                    counter.increment();
                return counter.counter.get();
            });
        }
        // What is the output of the below line?
        System.out.println(tasks[99].get());
        es.shutdown();
    }
```
##### A:
10000

**Explanation:**
This example may seem counterintuitive but drives home the warning of using threadlocal variables with threadpools! Note that even though we submit 100 tasks but our threadpool consists of a lone thread. This thread has a copy of threadlocal vaiable `counter` which gets reused when executing different tasks. It is not issued a new copy of the variable for every task as one might mistakenly assume. The same copy gets incremement for a 100 tasks a 100 times resulting in a value of 10,000 being printed.

##### Q: What would have been the output of the print statement from the previous question if we created a pool with 20 threads?
##### A: 
between 100 and 10000 inclusive

**Explanation:**
Since our threadpool consists of 20 threads the print statement may print a value between the two extremes. If only a single thread gets to execute all the tasks then counter will print a maximum value of 10,000. If a thread only executed the 100th task and all the other 99 tasks were performed by the remaining 19 threads then the printed value would be 100.
```
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

class Demonstration {
    public static void main( String args[] ) throws Exception {
        
      usingThreads();
      usingSingleThreadPool();
      usingMultiThreadsPool();
    }
  
    static void usingThreads() throws Exception {

        Counter counter = new Counter();
        Thread[] tasks = new Thread[100];

        for (int i = 0; i < 100; i++) {
            Thread t = new Thread(() -> {
                for (int j = 0; j < 100; j++)
                    counter.increment();
            });
            tasks[i] = t;
            t.start();
        }

        for (int i = 0; i < 100; i++) {
            tasks[i].join();
        }

        System.out.println(counter.counter.get());
    }  
  
    @SuppressWarnings("unchecked")
    static void usingSingleThreadPool() throws Exception {

        Counter counter = new Counter();
        ExecutorService es = Executors.newFixedThreadPool(1);
        Future<Integer>[] tasks = new Future[100];

        for (int i = 0; i < 100; i++) {
            tasks[i] = es.submit(() -> {
                for (int j = 0; j < 100; j++)
                    counter.increment();

                return counter.counter.get();
            });
        }

        System.out.println(tasks[99].get());

        es.shutdown();
    } 

    @SuppressWarnings("unchecked")  
    static void usingMultiThreadsPool() throws Exception {

        Counter counter = new Counter();
        ExecutorService es = Executors.newFixedThreadPool(20);
        Future<Integer>[] tasks = new Future[100];

        for (int i = 0; i < 100; i++) {
            tasks[i] = es.submit(() -> {
                for (int j = 0; j < 100; j++)
                    counter.increment();

                return counter.counter.get();
            });
        }

        System.out.println(tasks[99].get());

        es.shutdown();
    }  
  
}

class Counter {

    ThreadLocal<Integer> counter = ThreadLocal.withInitial(() -> 0);

    public Counter() {
        counter.set(0);
    }

    void increment() {
        counter.set(counter.get() + 1);
    }
}
```

##### Q: Consider the below method:
```
    int countTo100() {
        ThreadLocal<Integer> count = ThreadLocal.withInitial(() -> 0);
        for (int j = 0; j < 100; j++)
            count.set(count.get() + 1);
        return count.get();
    }
```
The above code is invoked like so:
```
        ExecutorService es = Executors.newFixedThreadPool(1);
        Future<Integer>[] tasks = new Future[100];
 
        for (int i = 0; i < 100; i++) {
            tasks[i] = es.submit(() -> countTo100());
        }
 
        for (int i = 0; i < 100; i++)
            System.out.println(tasks[i].get());
 
        es.shutdown();
```
What would the output of the print statement for the 100 tasks?

##### A:
100

**Explanation:**
Note that the threadlocal variable is now within the instance method. Even though we have a single thread but each time it invokes the `countTo100()` method, it creates a fresh threadlocal object which has no relation to the threadlocal object from the previous invocation. The scope of the threadlocal variable is limited to within the instance method and as soon as the thread exits the method, it is eligible for garbage collection. On the next invocation a new threadlocal object is created.

```
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;


class Demonstration {
  
    @SuppressWarnings("unchecked")
    public static void main( String args[] ) throws Exception {

        ExecutorService es = Executors.newFixedThreadPool(1);
        Future<Integer>[] tasks = new Future[100];

        for (int i = 0; i < 100; i++) {
            tasks[i] = es.submit(() -> countTo100());
        }

        for (int i = 0; i < 100; i++)
            System.out.println(tasks[i].get());

        es.shutdown();      
    }
  
    static int countTo100() {

        ThreadLocal<Integer> count = ThreadLocal.withInitial(() -> 0);
        for (int j = 0; j < 100; j++)
            count.set(count.get() + 1);

        return count.get();

    }    
}
```

##### Q: Is there any benefit to declaring `count` as a threadlocal variable in the method `countTo100()`?
```
    int countTo100() {
        ThreadLocal<Integer> count = ThreadLocal.withInitial(() -> 0);
        for (int j = 0; j < 100; j++)
            count.set(count.get() + 1);
        return count.get();
 
    }
```
##### A: 
The variables defined inside an instance method are already created on a per-thread basis and live on the thread stack without any sharing with other threads. The per-thread level isolation for a variable that we can achieve using threadlocal is already being provided because of the scope of the variables declared within an instance method. Therefore, there's no benefit to declaring variables within instance methods as threadlocal.

---