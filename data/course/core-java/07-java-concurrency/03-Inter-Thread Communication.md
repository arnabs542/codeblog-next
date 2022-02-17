---
title: Inter-Thread Communication
type: topic
section: Java Concurrency
course: Core Java
tags:
- java
---
#### Inter-thread communication in Java
- Inter-thread communication or Co-operation is all about allowing synchronized threads to communicate with each other.
- Cooperation (Inter-thread communication) is a mechanism in which a thread is paused running in its critical section and another thread is allowed to enter (or lock) in the same critical section to be executed.It is implemented by following final methods of **Object** class:
  - `wait()`
  - `notify()`
  - `notifyAll()`

###### wait()
- Causes current thread to release the lock and wait until either another thread invokes the `notify()` method or the `notifyAll()` method for this object, or a specified amount of time has elapsed.
- The current thread must own this object's monitor, so it must be called from the synchronized method only, otherwise it will throw exception `IllegalMonitorStateException`.
- `public final void wait() throws InterruptedException`: waits until object is notified.
- `public final void wait(long timeout) throws InterruptedException`: waits for the specified amount of time.

###### notify()
Wakes up a single thread that is waiting on this object's monitor. If many threads are waiting on this object, one of them is chosen to be awakened. The choice is arbitrary and occurs at the discretion of the implementation. 
- `public final void notify()`

###### notifyAll()
- Wakes up all threads that are waiting on this object's monitor. 
- `public final void notifyAll()`

###### Understanding the process of inter-thread communication
1. Threads enter to acquire lock.
1. Lock is acquired by on thread.
1. Now thread goes to waiting state if you call wait() method on the object. Otherwise it releases the lock and exits.
1. If you call notify() or notifyAll() method, thread moves to the notified state (runnable state).
1. Now thread is available to acquire lock.
1. After completion of the task, thread releases the lock and exits the monitor state of the object.

```java
class Customer {
	int amount = 100;

	synchronized void withdraw(int amount) {
		System.out.println("going to withdraw...");
		if (this.amount < amount) {
			System.out.println("Less balance; waiting for deposit...");
			try {
				wait();
			} catch (Exception e) {
			}
		}
		this.amount -= amount;
		System.out.println("withdraw completed...");
	}

	synchronized void deposit(int amount) {
		System.out.println("going to deposit...");
		this.amount += amount;
		System.out.println("deposit completed... ");
		notify();
	}
}
public class ThreadComm {
	public static void main(String[] args) {
		final Customer c = new Customer();
		new Thread() {
			public void run() {
				c.withdraw(15000);
			}
		}.start();
		new Thread() {
			public void run() {
				c.deposit(10000);
			}
		}.start();
	}
}
```

**Why `wait()`, `notify()` and `notifyAll()` methods are defined in Object class not Thread class?**
- It is because they are related to lock and object has a lock.

**Difference between wait and sleep?**

| `wait()` | `sleep()` |
|-|-|
| `wait()` method releases the lock | `sleep()` method doesn't release the lock. |
| is the method of `Object` class | is the method of `Thread` class |
| is the non-static method | is the static method |
| should be notified by `notify()` or `notifyAll()` methods | after the specified amount of time, sleep is completed. |

---
#### Interrupting a Thread
- If any thread is in sleeping or waiting state (i.e. `sleep()` or `wait()` is invoked), calling the `interrupt()` method on the thread, breaks out the sleeping or waiting state throwing `InterruptedException`.
- If the thread is not in the sleeping or waiting state, calling the `interrupt()` method performs normal behaviour and doesn't interrupt the thread but sets the `interrupt` flag to true.

###### 3 methods provided by the Thread class
- **`public void interrupt()`**
- **`public static boolean interrupted()`**
- **`public boolean isInterrupted()`**

**Example of interrupting a thread:**
```java
public class ThreadComm {
  public static void main(String[] args) {
    Runnable r = () -> {
      try {
        System.out.println("task started");
        Thread.sleep(1000);
        System.out.println("task completed");
      } catch (InterruptedException e) {
        System.out.println("Thread interrupted... ");
      }
      System.out.println("thread is running...");
    };
    Thread t = new Thread(r);
    t.start();
    t.interrupt();
  }
}
```

####### Note:
- The `isInterrupted()` method returns the interrupted flag either true or false.
- The static `interrupted()` method returns the interrupted flag afterthat it sets the flag to false if it is true.


---
#### Reentrant Monitor in Java
- According to Sun Microsystems, **Java monitors are reentrant** means java thread can reuse the same monitor for different synchronized methods if method is called from the method.

###### Advantage of Reentrant Monitor
- It eliminates the possibility of single thread deadlocking

```java
class Reentrant {  
  public synchronized void m() {  
    n();  
    System.out.println("this is m() method");  
  }  
  public synchronized void n() {  
    System.out.println("this is n() method");  
  }  
}  
public class ReentrantExample{  
  public static void main(String args[]){  
    final ReentrantExample re=new ReentrantExample();  
    Thread t1=new Thread(){  
      public void run(){  
        re.m();//calling method of Reentrant class  
      }  
    };  
    t1.start();  
  }
}  
```

---