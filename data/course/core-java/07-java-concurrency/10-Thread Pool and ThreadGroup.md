---
title: Thread Pool and ThreadGroup
type: topic
section: Java Concurrency
course: Core Java
tags:
- java
---
#### Thread Pool
- Java Thread pool represents a group of worker threads that are waiting for the job and reuse many times.
- In case of thread pool, a group of fixed size threads are created. A thread from the thread pool is pulled out and assigned a job by the service provider. After completion of the job, thread is contained in the thread pool again.
- **Better performance:** It saves time because there is no need to create new thread.
- Eg, it is used in **Servlet** and **JSP** where container creates a thread pool to process the request.
- We can use `ThreadPoolExecutor` to create thread pool in Java.
- `java.util.concurrent.Executors` provide factory and support methods for `java.util.concurrent.Executor` interface to create the thread pool in java.

**ExecutorService Example**

```java
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

class WorkerThread implements Runnable {
	String message;
	public WorkerThread(String s) {
		message = s;
	}
	@Override
	public void run() {
		System.out.println(Thread.currentThread().getName() + " (Start)");
		processMessage();
		System.out.println(Thread.currentThread().getName() + " (End)");
	}
	private void processMessage() {
		try { Thread.sleep(1000); } catch (Exception e) { e.printStackTrace(); }
	}
}

public class ThreadPoolBasic {
	public static void main(String[] args) throws Exception {
		ExecutorService executorService = Executors.newFixedThreadPool(5); // creating a pool of 5 threads
		for (int i=0; i<10; i++) {
			Runnable worker = new WorkerThread("T" + i);
			executorService.execute(worker);
		}
		executorService.shutdown();
		while (!executorService.isShutdown()) {}

		System.out.println("Finished all threads");
	}
}
```

In the above program, we are creating a fixed-size thread pool of 5 worker threads. Then we are submitting 10 jobs to this pool, since the pool size is 5, it will start working on 5 jobs and other jobs will be in wait state, as soon as one of the job is finished, another job from the wait queue will be picked up by worker thread and get’s executed.

**ThreadPoolExecutor Example**
- We can specify the number of threads that will be alive when we create `ThreadPoolExecutor` instance and we can limit the size of thread pool and create our own `RejectedExecutionHandler` implementation to handle the jobs that can’t fit in the worker queue.
- `ThreadPoolExecutor` provides several methods using which we can find out the current state of the executor, pool size, active thread count and task count.

```java
package multithreading;

import java.util.concurrent.*;

class RejectedExecutionHandlerImpl implements RejectedExecutionHandler {
    @Override
    public void rejectedExecution(Runnable r, ThreadPoolExecutor executor) {
        System.out.println(r.toString() + " is rejected");
    }
}

class MyMonitorThread implements Runnable {
    private ThreadPoolExecutor executor;
    private int seconds;
    private boolean run = true;

    public MyMonitorThread(ThreadPoolExecutor executor, int delay) {
        this.executor = executor;
        this.seconds = delay;
    }
    public void shutdown() {
        this.run = false;
    }
    @Override
    public void run() {
        while (run) {
            System.out.println(
                    String.format(
                            "[monitor] [%d/%d] Active: %d, Completed: %d, Task: %d, isShutdown: %s, isTerminated: %s",
                            this.executor.getPoolSize(),
                            this.executor.getCorePoolSize(),
                            this.executor.getActiveCount(),
                            this.executor.getCompletedTaskCount(),
                            this.executor.getTaskCount(),
                            this.executor.isShutdown(),
                            this.executor.isTerminated()));
            try {
                Thread.sleep(seconds * 1000);
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
    }
}

public class ThreadPoolExecutorDemo {
    public static void main(String args[]) throws InterruptedException{
        RejectedExecutionHandlerImpl rejectionHandler = new RejectedExecutionHandlerImpl();
        ThreadFactory threadFactory = Executors.defaultThreadFactory();
        ThreadPoolExecutor executorPool = new ThreadPoolExecutor(2, 4, 10, TimeUnit.SECONDS, new ArrayBlockingQueue<Runnable>(2), threadFactory, rejectionHandler);
        MyMonitorThread monitor = new MyMonitorThread(executorPool, 3);
        Thread monitorThread = new Thread(monitor);
        monitorThread.start();
        //submit work to the thread pool
        for(int i=0; i<10; i++){
            executorPool.execute(new WorkerThread("cmd"+i));
        }

        Thread.sleep(30000);
        //shut down the pool
        executorPool.shutdown();
        //shut down the monitor thread
        Thread.sleep(5000);
        monitor.shutdown();
    }
}
```

---
#### ThreadGroup in Java
- Java provides a convenient way to group multiple threads in a single object, so that we can suspend, resume or interrupt group of threads by a single method call.
- Java thread group is implemented by `java.lang.ThreadGroup` class.
- A ThreadGroup represents a set of threads. A thread group can also include the other thread group. The thread group creates a tree in which every thread group except the initial thread group has a parent.
- A thread is allowed to access information about its own thread group, but it cannot access the information about its thread group's parent thread group or any other thread groups.

> `suspend()`, `resume()` and `stop()` methods are deprecated now.

###### Constructors of ThreadGroup class
1. **`ThreadGroup(String name)`**: creates a thread group with given name.
2. **`ThreadGroup(ThreadGroup parent, String name)`**: creates a thread group with given parent group and name.

```java
public class ThreadGroupDemo implements Runnable{  
    public void run() {  
          System.out.println(Thread.currentThread().getName());  
    }  
   	public static void main(String[] args) {  
      ThreadGroupDemo runnable = new ThreadGroupDemo();  
          ThreadGroup tg1 = new ThreadGroup("Parent ThreadGroup");  
            
          Thread t1 = new Thread(tg1, runnable,"one");  
          t1.start();  
          Thread t2 = new Thread(tg1, runnable,"two");  
          t2.start();  
          Thread t3 = new Thread(tg1, runnable,"three");  
          t3.start();  
               
          System.out.println("Thread Group Name: "+tg1.getName());  
    	    tg1.list();  
    }  
}  
```


---