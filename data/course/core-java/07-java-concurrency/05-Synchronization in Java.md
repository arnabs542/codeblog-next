---
title: Synchronization in Java
type: topic
section: Java Concurrency
course: Core Java
tags:
- java
---
#### Synchronization
- Synchronization in java is the capability to control the access of multiple threads to any shared resource.
- It is a tool using which we can achieve thread-safety, JVM guarantees that synchronized code will be executed by only one thread at a time.
- java keyword **`synchronized`** is used to create synchronized code and internally it uses locks on Object or Class to make sure only one thread is executing the synchronized code.
- Java Synchronization provides data integrity on the cost of performance, so it should be used only when it’s absolutely necessary.
- Java Synchronization works only in the same JVM, so if you need to lock some resource in multiple JVM environment, it will not work and you might have to look after some global locking mechanism.


###### Types of Synchronization
1. Process Synchronization
2. Thread Synchronization

---
#### Concept of Lock in Java
- Synchronization is built around an internal entity known as the **lock** or **monitor**.
- Every object has an lock associated with it. By convention, a thread that needs consistent access to an object's fields has to acquire the object's lock before accessing them, and then release the lock when it's done with them.
- From Java 5 the package `java.util.concurrent.locks` contains several lock implementations.

---
#### Thread Synchronization
There are two types of thread synchronization mutual exclusive and inter-thread communication:
###### 1. Mutual Exclusive
Mutual Exclusive helps keep threads from interfering with one another while sharing data. This can be done by three ways in java:
- **by `synchronized` method**
	- If you declare any method as synchronized, it is known as synchronized method.
	- When a method is synchronized, it locks the **Object**, if method is static it locks the **Class**, so it’s always best practice to use synchronized block to lock the only sections of method that needs synchronization.
	- When a thread invokes a synchronized method, it automatically acquires the lock for that object and releases it when the thread completes its task.

**Example:**
```java
class CounterSync {
	int count;
	public synchronized void increment() {
		count++;
	}
}
class Counter {
	int count;
	public void increment() {
		count++;
	}
}

public class ThreadSynchronize {
	public static void main(String[] args) throws InterruptedException {
		// Not Synchronized
		Counter obj1 = new Counter();
		Runnable r = ()->{
			for(int i=0;i<1000;i++) {
				obj1.increment();
			}
		};
		// Synchronized
		CounterSync obj2 = new CounterSync();
		Runnable rsync = ()->{
			for(int i=0;i<1000;i++) {
				obj2.increment();
			}
		};

		Thread t1 = new Thread(r);
		Thread t2 = new Thread(r);
		t1.start();
		t2.start();
		t1.join();
		t2.join();
		System.out.println("count: "+ obj1.count);

		Thread t3 = new Thread(rsync);
		Thread t4 = new Thread(rsync);
		t3.start();
		t4.start();
		t3.join();
		t4.join();
		System.out.println("count: "+ obj2.count);
	}
}
```

- **by `synchronized` block**
	- Synchronized block can be used to perform synchronization on any specific resource of the method.
	- While creating a synchronized block, we need to provide the resource on which lock will be acquired, it can be **XYZ.class** or any **Object field** of the class.
	- `synchronized(this)` will lock the Object before entering into the synchronized block.
	- Scope of synchronized block is smaller than the method.
	- It is preferable to create a dummy **private** Object without getter/setter to use for the synchronized block so that it’s reference can’t be changed by any other code.

**Example:**
```java
class CounterSync {
	int count;
	public void increment() {
		synchronized(this) {
			count++;
		}
	}
}
class Counter {
	int count;
	public void increment() {
		count++;
	}
}

public class ThreadSynchronize {
	public static void main(String[] args) throws InterruptedException {
		// Not Synchronized
		Counter obj1 = new Counter();
		Runnable r = ()->{
			for(int i=0;i<1000;i++) {
				obj1.increment();
			}
		};
		// Synchronized
		CounterSync obj2 = new CounterSync();
		Runnable rsync = ()->{
			for(int i=0;i<1000;i++) {
				obj2.increment();
			}
		};

		Thread t1 = new Thread(r);
		Thread t2 = new Thread(r);
		t1.start();
		t2.start();
		t1.join();
		t2.join();
		System.out.println("count: "+ obj1.count);

		Thread t3 = new Thread(rsync);
		Thread t4 = new Thread(rsync);
		t3.start();
		t4.start();
		t3.join();
		t4.join();
		System.out.println("count: "+ obj2.count);
	}
}
```

- **by static synchronization**
	- If you make any `static` method as `synchronized`, **the lock will be on the class not on object**.

**Example:**
```java
class CounterSync{
	static int count;
	public synchronized static void increment() {
		count++;
	}
}
class Counter{
	static int count;
	public static void increment() {
		count++;
	}
}

public class ThreadSynchronize {
	public static void main(String[] args) throws InterruptedException {
		// Not Synchronized
		Runnable r = ()->{
			for(int i=0;i<1000;i++) {
				Counter.increment();
			}
		};
		// Synchronized
		Runnable rsync = ()->{
			for(int i=0;i<1000;i++) {
				CounterSync.increment();
			}
		};

		Thread t1 = new Thread(r);
		Thread t2 = new Thread(r);
		t1.start();
		t2.start();
		t1.join();
		t2.join();
		System.out.println("count: "+ Counter.count);

		Thread t3 = new Thread(rsync);
		Thread t4 = new Thread(rsync);
		t3.start();
		t4.start();
		t3.join();
		t4.join();
		System.out.println("count: "+ CounterSync.count);
	}
}
```

> Suppose there are two objects of a shared class(e.g. Table) named object1 and object2.In case of synchronized method and synchronized block there cannot be interference between t1 and t2 or t3 and t4 because t1 and t2 both refers to a common object that have a single lock.But there can be interference between t1 and t3 or t2 and t4 because t1 acquires another lock and t3 acquires another lock.I want no interference between t1 and t3 or t2 and t4.Static synchronization solves this problem.

```java
class Table{  
 synchronized static void printTable(int n){  
   for(int i=1;i<=10;i++){  
     System.out.println(n*i);  
     try{  
       Thread.sleep(400);  
     }catch(Exception e){}  
   }  
 }  
}  
class MyThread1 extends Thread{  
	public void run(){  
		Table.printTable(1);  
	}  
}  
class MyThread2 extends Thread{  
	public void run(){  
		Table.printTable(10);  
	}  
}  
class MyThread3 extends Thread{  
	public void run(){  
		Table.printTable(100);  
	}  
}  
class MyThread4 extends Thread{  
	public void run(){  
		Table.printTable(1000);  
	}  
}  
public class TestSynchronization4{  
	public static void main(String t[]){  
		MyThread1 t1=new MyThread1();  
		MyThread2 t2=new MyThread2();  
		MyThread3 t3=new MyThread3();  
		MyThread4 t4=new MyThread4();  
		t1.start();  
		t2.start();  
		t3.start();  
		t4.start();  
	}  
}  
```

**Synchronized block on a class lock:**
```java
static void printTable(int n) {
	synchronized (Table.class) {       // Synchronized block on class A
		// ...
	}  
}  
```

###### 2. Cooperation (Inter-thread communication in java)
Discussed Later

---