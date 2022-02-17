---
title: Deadlock
type: topic
section: Java Concurrency
course: Core Java
tags:
- java
---
## Deadlock in Java
- Deadlock describes a situation where two or more threads are blocked forever, waiting for each other.
- 

**Example:**
```java
public class TestDeadlockExample1 {  
  public static void main(String[] args) {  
    final String resource1 = "ratan jaiswal";  
    final String resource2 = "vimal jaiswal";  
    // t1 tries to lock resource1 then resource2  
    Thread t1 = new Thread() {  
      public void run() {  
        synchronized (resource1) {  
          System.out.println("Thread 1: locked resource 1");  
          try { Thread.sleep(100);} catch (Exception e) {}  
          synchronized (resource2) {  
          	System.out.println("Thread 1: locked resource 2");  
          }
        }
      }
    };
    // t2 tries to lock resource2 then resource1  
    Thread t2 = new Thread() {  
      public void run() {  
        synchronized (resource2) {  
          System.out.println("Thread 2: locked resource 2");    
          try { Thread.sleep(100);} catch (Exception e) {}  
          synchronized (resource1) {  
            System.out.println("Thread 2: locked resource 1");  
          }  
        }  
      }  
    };
    t1.start();
    t2.start();
  }
}
```

**Example:**
```java
class ThreadDL {
	private Object o1 = new Object();
	private Object o2 = new Object();
	public void a() {
		synchronized(o1){
			System.out.println(Thread.currentThread().getName() + " is inside A");
			try {
			Thread.sleep(3000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
			b();
		}
	}
	public void b() {
		synchronized(o2){
			System.out.println(Thread.currentThread().getName() + " is inside B");
			c();
		}
	}
	public void c() {
		synchronized(o1){
			System.out.println(Thread.currentThread().getName() + " is inside C");
		}
	}
}
public class ThreadDeadlock {
	public static void main(String[] args) throws Exception {
		System.out.println("start of program");
        System.out.println("Before deadlock");
        
        ThreadDL td = new ThreadDL();
        Runnable r1 = ()->td.a();
        Runnable r2 = ()->td.b();
        
        Thread t1 = new Thread(r1);
        t1.start();
        Thread t2 = new Thread(r2);
        t2.start();
        
        t1.join();
        t2.join();

        System.out.println("after deadlock");
	}
}
```

---
#### How to Detect Deadlock in Java
- To detect a deadlock in java, we need to look at the java thread dump of the application.

###### Thread Dump
- Java thread dump is very helpful in analyzing bottlenecks in the application and deadlock situations.

Multiple ways through which we can generate thread dump for a java program. These instructions are valid for *nix operating systems but in windows the steps might be little different.
1. VisualVM Profiler
2. jstack
3. kill -3 PID
4. jcmd

#### How to avoid deadlock in java
- Avoid Nested Locks
- Lock Only What is Required
- Avoid waiting indefinitely

---