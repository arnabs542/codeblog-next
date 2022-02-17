---
title: 'Threads'
type: 'topic'
section: 'Java Concurrency'
course: 'Core Java'
tags:
- java
---
#### Thread
- A thread is a **lightweight** subprocess, the smallest unit of processing. It takes less time and resource to create a thread.
- It is a separate path of execution, but share their parent process data and code.
- Threads are independent. If there occurs exception in one thread, it doesn't affect other threads. It uses a shared memory area.
- Context switching between threads is usually less expensive than between processes.
- Thread intercommunication is relatively easy than process communication.

Every java application has at least one thread – main thread. Although there are so many other java threads running in background like memory management, system management, signal processing etc. But from application point of view – main is the first java thread and we can create multiple threads from it.

---
###### Life cycle of a Thread (Thread States)
According to sun, there is only **4 states** in thread life cycle in java `new`, `runnable`, `non-runnable` and `terminated`. There is no running state.
1. **New**
    - The thread is in new state if you create an instance of Thread class but before the invocation of `start()` method.
2. **Runnable**
    - The thread is in runnable state after invocation of `start()` method, but the thread scheduler has not selected it to be the running thread.
3. **Non-Runnable (Blocked)**
    - This is the state when the thread is still alive, but is currently not eligible to run.
4. **Terminated (Dead)**
    - A thread is in terminated or dead state when its `run()` method exits.

---
#### How to create thread?
There are two ways to create a thread:
1. By extending `Thread` class
2. By implementing `Runnable` interface.

```java
class DemoThread extends Thread{
	public void run() {
		for(int i=0;i<5;i++) {
			System.out.println(Thread.currentThread().getName());
			try {
				Thread.sleep(500);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
	}
}
class DemoRunnable implements Runnable{
	@Override
	public void run() {
		for(int i=0;i<5;i++) {
			System.out.println(Thread.currentThread().getName());
			try {
				Thread.sleep(500);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
	}
}
public class Test {
	public static void main(String[] args) {
		System.out.println("Java MultiThreading");	//executed by Main Thread
		DemoThread t1 = new DemoThread();
		t1.start();
		Thread t2 = new Thread(new DemoRunnable());
		t2.start();
	}
}
```

---
#### `Thread` class
- `Thread` class provide constructors and methods to create and perform operations on a thread.
- `Thread` class extends Object class and implements `Runnable` interface.

###### Constructors of Thread class
- `Thread()`
- `Thread(String name)`
- `Thread(Runnable r)`
- `Thread(Runnable r,String name)`

###### Commonly used methods of Thread class
- **`public void run()`**: is used to perform action for a thread.
- **`public void start()`**: starts the execution of the thread.JVM calls the run() method on the thread.
- **`public void sleep(long miliseconds)`**: Causes the currently executing thread to sleep (temporarily cease execution) for the specified number of milliseconds.
- **`public void join()`**: waits for a thread to die.
- **`public void join(long miliseconds)`**: waits for a thread to die for the specified miliseconds.
- **`public int getPriority()`**: returns the priority of the thread.
- **`public int setPriority(int priority)`**: changes the priority of the thread.
- **`public String getName()`**: returns the name of the thread.
- **`public void setName(String name)`**: changes the name of the thread.
- **`public Thread currentThread()`**: returns the reference of currently executing thread.
- **`public int getId()`**: returns the id of the thread.
- **`public Thread.State getState()`**: returns the state of the thread.
- **`public boolean isAlive()`**: tests if the thread is alive.
- **`public void yield()`**: causes the currently executing thread object to temporarily pause and allow other threads to execute.
- **`public void suspend()`**: is used to suspend the thread(depricated).
- **`public void resume()`**: is used to resume the suspended thread(depricated).
- **`public void stop()`**: is used to stop the thread(depricated).
- **`public boolean isDaemon()`**: tests if the thread is a daemon thread.
- **`public void setDaemon(boolean b)`**: marks the thread as daemon or user thread.
- **`public void interrupt()`**: interrupts the thread.
- **`public boolean isInterrupted()`**: tests if the thread has been interrupted.
- **`public static boolean interrupted()`**: tests if the current thread has been interrupted.

---
#### `Runnable` interface
The Runnable interface should be implemented by any class whose instances are intended to be executed by a thread. 

###### Runnable interface have only one method
- **`public void run()`**: is used to perform action for a thread.

---
###### Runnable vs Thread
- If your class provides more functionality rather than just running as Thread, you should implement Runnable interface to provide a way to run it as Thread. If your class only goal is to run as Thread, you can extend Thread class.
- Implementing Runnable is preferred because java supports implementing multiple interfaces. If you extend Thread class, you can’t extend any other classes.

---
#### Thread Scheduler
- Thread scheduler in java is the part of the JVM that decides which thread should run.
- There is no guarantee that which runnable thread will be chosen to run by the thread scheduler.
- Only one thread at a time can run in a single process.
- The thread scheduler mainly uses preemptive or time slicing scheduling to schedule the threads.

###### Difference between preemptive scheduling and time slicing
- Under preemptive scheduling, the highest priority task executes until it enters the waiting or dead states or a higher priority task comes into existence.
- Under time slicing, a task executes for a predefined slice of time and then reenters the pool of ready tasks. The scheduler then determines which task should execute next, based on priority and other factors.

---
#### Starting a thread
`start()` method of `Thread` class is used to start a newly created thread. It performs following tasks:
- A new thread starts(with new callstack).
- The thread moves from **New** state to the **Runnable** state.
- When the thread gets a chance to execute, its target `run()` method will run.

**Can we start a thread twice?**
- No. After starting a thread, it can never be started again. If you does so, an `IllegalThreadStateException` is thrown. In such case, thread will run once but for second time, it will throw exception.

**What if we call run() method directly instead start() method?**
- Each thread starts in a separate call stack. Invoking the `run()` method from main thread, the `run()` method goes onto the current call stack rather than at the beginning of a new call stack.
- It will be treated as normal object not thread object, and there will be no context switching.

---
#### Sleeping a Thread
- The `sleep()` method of Thread class is used to sleep a thread for the specified amount of time.
- It always pause the current thread execution.
- The Thread class provides two methods for sleeping a thread:
	1. `public static void sleep(long miliseconds) throws InterruptedException`
	2. `public static void sleep(long miliseconds, int nanos) throws InterruptedException`
- The actual time thread sleeps before waking up and start execution depends on system timers and schedulers. For a quiet system, the actual time for sleep is near to the specified sleep time but for a busy system it will be little bit more.
- Thread sleep doesn’t lose any monitors or locks current thread has acquired.
- Any other thread can interrupt the current thread in sleep, in that case InterruptedException is thrown.

###### How Thread Sleep Works
Thread.sleep() interacts with the thread scheduler to put the current thread in wait state for specified period of time. Once the wait time is over, thread state is changed to runnable state and wait for the CPU for further execution. So the actual time that current thread sleep depends on the thread scheduler that is part of operating system.

```java
public class Test {
	public static void main(String[] args) throws Exception {
		System.out.println(Thread.currentThread().getName());
		Runnable r = ()->{
			for(int i=1; i<5; i++){
				try{
					Thread.sleep(500);
				} catch (InterruptedException e) {
					System.out.println(e);
				}
				System.out.println(i);
			}
		};
		Thread a = new Thread(r);
		Thread b = new Thread(r);
		a.start();
		b.start();
	}
}
```

> As you know well that at a time only one thread is executed. If you sleep a thread for the specified time,the thread shedular picks up another thread and so on.

---
#### Joining a Thread
- `join()` method puts the current thread on wait until the thread on which it’s called is dead. 
- In other words, it causes the currently running threads to stop executing until the thread it joins with completes its task.
- `join(long millis)` method is used to wait for the thread on which it’s called to be dead or wait for specified milliseconds.
  1. `public void join() throws InterruptedException`
  2. `public void join(long milliseconds) throws InterruptedException`

```java
class JoinDemo extends Thread {
	@Override
	public void run() {
		for(int i=1;i<=5;i++){
			try { Thread.sleep(500); } catch (Exception e) { System.out.println(e.getMessage()); }
			System.out.println(Thread.currentThread().getName() + " : " + i);
		}
	}
}
public class ThreadJoin {
	public static void main(String[] args) throws Exception {
		JoinDemo t1 = new JoinDemo();
		JoinDemo t2 = new JoinDemo();
		JoinDemo t3 = new JoinDemo();
		t1.start();
		t1.join();  // when t1 completes its task then t2 and t3 starts executing.
		t2.start();
		t3.start();
	}
}
```

```java
class JoinDemo extends Thread {
	@Override
	public void run() {
		for(int i=1;i<=5;i++){
			try { Thread.sleep(500); } catch (Exception e) { System.out.println(e.getMessage()); }
			System.out.println(Thread.currentThread().getName() + " : " + i);
		}
	}
}
public class ThreadJoin {
	public static void main(String[] args) throws Exception {
		JoinDemo t1 = new JoinDemo();
		JoinDemo t2 = new JoinDemo();
		JoinDemo t3 = new JoinDemo();
		t1.start();
		t1.join(1500);  // t1 completes its task for 1500 miliseconds(3 times) then t2 and t3 starts executing.
		t2.start();
		t3.start();
	}
}
```

#### Important Methods
- **`public String getName()`:** is used to return the name of a thread.
- **`public void setName(String name)`:** is used to change the name of a thread.
- **`public static Thread currentThread()`:** returns a reference of currently executing thread.

###### Priority of a Thread
Each thread have a priority. Priorities are represented by a number between 1 and 10. In most cases, thread schedular schedules the threads according to their priority (known as **preemptive scheduling**). But it is not guaranteed because it depends on JVM specification that which scheduling it chooses.

3 constants defined in Thread class:
1. `public static int MIN_PRIORITY`
2. `public static int NORM_PRIORITY`
3. `public static int MAX_PRIORITY`

> Default priority of a thread is 5 (`NORM_PRIORITY`). The value of `MIN_PRIORITY` is 1 and the value of `MAX_PRIORITY` is 10.

```java
t1.setPriority(Thread.MIN_PRIORITY);
t2.setPriority(Thread.MAX_PRIORITY);
```

---
#### Daemon Thread
- Daemon thread in java is a service provider thread that provides services to the user thread.
- Its life depend on the mercy of user threads i.e. when all the user threads dies, JVM terminates this thread automatically.
- There are many java daemon threads running automatically e.g. **gc**, **finalizer** etc.
- You can see all the detail by typing the **jconsole** in the command prompt. The jconsole tool provides information about the loaded classes, memory usage, running threads etc.

###### Note about Daemon Thread
- It provides services to user threads for background supporting tasks. It has no role in life than to serve user threads.
- Its life depends on user threads.
- It is a low priority thread.

**Why JVM terminates the daemon thread if there is no user thread?**
The sole purpose of the daemon thread is that it provides services to user thread for background supporting task. If there is no user thread, why should JVM keep running this thread. That is why JVM terminates the daemon thread if there is no user thread.

###### Methods for Java Daemon thread by Thread class
1. **`public void setDaemon(boolean status)`**: is used to mark the current thread as daemon thread or user thread.
1. **`public boolean isDaemon()`**: is used to check that current is daemon.

```java
package multithreading;
public class ThreadDaemon extends Thread {
	public void run() {
		if (Thread.currentThread().isDaemon()) {
			System.out.println("I am a Daemon Thread");
		} else {
			System.out.println("I am a User Thread");
		}
	}
	public static void main(String[] args) {
		Thread t1 = new ThreadDaemon();
		Thread t2 = new ThreadDaemon();
		t1.setDaemon(true);
		t1.start();
		t2.start();
	}
}
```

> If you want to make a user thread as Daemon, it must not be started otherwise it will throw **IllegalThreadStateException**.



---