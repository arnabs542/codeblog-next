---
title: Executors Callable and Future
type: topic
section: Java Concurrency
course: Core Java
tags:
- java
---
#### Executors
- **`ExecutorService`** is a higher level replacement for working with threads directly.
- Executors are **capable of running asynchronous tasks** and typically **manage a pool of threads**, so we don't have to create new threads manually.
- The class **`Executors`** provides convenient factory methods for creating different kinds of executor services.
- `Executors` is a utility class that also provides useful methods to work with ExecutorService, ScheduledExecutorService, ThreadFactory, and Callable classes through various factory methods.
- An `ExecutorService` needs explicit shutdown and provides two
methods for that purpose:
    1. `shutdown()` - waits for currently running tasks to finish.
    2. `shutdownNow()` - interrupts all running tasks and shut the executor down immediately.
- Executors can execute a runnable or a callable instance.

**ExecutorService Example**
```java

```

---
#### Callable
- Callable is **functional interface** just like **Runnable** but instead of being void they **returna value** (object).
- Java Callable interface use Generic to define the return type of Object.
- Executors class provide useful methods to execute Java Callable in a thread pool. Since callable tasks run in parallel, we have to wait for the returned Object.
- The callable interface supports `call()` method which needs to be overridden for making an implementation callable.
- Also `call()` method in Callable interface can throw exception while `run()` method in Runnable interface cannot.

---
#### Future
- Future as the name suggests may not hold the response immediately but will definitely **hold the response in future**.
- A Future represents the result of an **asynchronous** computation.
- Methods are provided to check if the computation is complete, to wait for its completion, and to retrieve the result of the computation.
- It provides `get()` method that can wait for the Callable to finish and then return the result.
- It provides `cancel()` method to cancel the associated Callable task.
- There are isDone() and isCancelled() methods to find out the current status of associated Callable task.
- Once a computation has completed, the computation cannot be cancelled.

```java
package multithreading;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.concurrent.*;

class MyCallableDemo implements Callable<String> {
    @Override
    public String call() throws Exception {
        Thread.sleep(1000);
        return Thread.currentThread().getName();
    }
}

public class CallableFuture {
    public static void main(String[] args) {
        ExecutorService executor = Executors.newFixedThreadPool(10);
        List<Future<String>> list = new ArrayList<Future<String>>();
        Callable<String> callable = new MyCallableDemo();
        for (int i = 0; i < 100; i++) {
            // submit Callable tasks to be executed by thread pool
            Future<String> future = executor.submit(callable);
            // add Future to the list, we can get return value using Future
            list.add(future);
        }
        for (Future<String> f : list) {
            try {
                // print the return value of Future, notice the output delay in console
                // because Future.get() waits for task to get completed
                System.out.println(new Date() + "::" + f.get());
            } catch (InterruptedException | ExecutionException e) {
                e.printStackTrace();
            }
        }
        executor.shutdown();
    }
}
```

Once we execute the above program, you will notice the delay in output because java Future get() method waits for the java callable task to complete. Also notice that there are only 10 threads executing these tasks.

---
#### FutureTask
- FutureTask is base concrete implementation of Future interface and provides **asynchronous** processing.
- It contains the methods to start and cancel a task and also methods that can return the state of the FutureTask as whether it’s completed or cancelled.
- We need a callable object to create a future task and then we can use Java Thread Pool Executor to process these asynchronously.

```java
package multithreading;

import java.util.Random;
import java.util.concurrent.*;

class MyCallable implements Callable {
    private long waitTime;

    public MyCallable(int timeInMillis){
        this.waitTime=timeInMillis;
    }

    @Override
    public Object call() throws Exception {
        Thread.sleep(1000);
        return Thread.currentThread().getName();
    }
}

public class CallableFutureTask {
    public static void main(String[] args) throws Exception {
        MyCallable callable1 = new MyCallable(1000);
        MyCallable callable2 = new MyCallable(2000);

        FutureTask<String> futureTask1 = new FutureTask<String>(callable1);
        FutureTask<String> futureTask2 = new FutureTask<String>(callable2);

        ExecutorService executor = Executors.newFixedThreadPool(2);
        executor.execute(futureTask1);
        executor.execute(futureTask2);

        while (true) {
            try {
                if (futureTask1.isDone() && futureTask2.isDone()) {
                    System.out.println("Done");
                    // shut down executor service
                    executor.shutdown();
                    return;
                }

                if (!futureTask1.isDone()) {
                    // wait indefinitely for future task to complete
                    System.out.println("FutureTask1 output=" + futureTask1.get() + " not completed");
                }

                System.out.println("Waiting for FutureTask2 to complete");
                String s = futureTask2.get(200L, TimeUnit.MILLISECONDS);
                if (s != null) {
                    System.out.println("FutureTask2 output=" + s);
                }
            } catch (InterruptedException | ExecutionException e) {
                e.printStackTrace();
            } catch (TimeoutException e) {
                // do nothing
            }
        }
    }
}
```

When we run above program, you will notice that it doesn’t print anything for sometime because get() method of FutureTask waits for the task to get completed and then returns the output object. There is an overloaded method also to wait for only specified amount of time and we are using it for futureTask2. Also notice the use of isDone() method to make sure program gets terminated once all the tasks are executed.