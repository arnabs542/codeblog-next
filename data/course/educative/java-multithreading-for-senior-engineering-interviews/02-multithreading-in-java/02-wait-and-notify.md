---
title: 'Wait & Notify'
type: 'problem'
topic: 'Multithreading in Java'
section: 'Java Multithreading for Senior Engineering Interviews'
course: 'Educative'
problemlist: true
visibility: secret
tags:
- System Design
---
## wait()
The `wait` method is exposed on each java object. Each Java object can act as a condition variable. When a thread executes the `wait` method, it releases the monitor for the object and is placed in the `wait` queue. **Note that the thread must be inside a synchronized block of code that synchronizes on the same object as the one on which wait() is being called, or in other words, the thread must hold the monitor of the object on which it'll call wait.** If not so, an illegalMonitor exception is raised!

## notify()
Like the wait method, `notify()` can only be called by the thread which owns the monitor for the object on which `notify()` is being called else an illegal monitor exception is thrown. The notify method, will awaken one of the threads in the associated wait queue, i.e., waiting on the thread's monitor.

However, this thread will not be scheduled for execution immediately and will compete with other active threads that are trying to synchronize on the same object. The thread which executed notify will also need to give up the object's monitor, before any one of the competing threads can acquire the monitor and proceed forward.

## notifyAll()
This method is the same as the `notify()` one except that it wakes up all the threads that are waiting on the object's monitor.

---
## Interrupting Threads
You'll often come across this exception being thrown from functions. When a thread wait()-s or sleep()-s then one way for it to give up waiting/sleeping is to be interrupted. If a thread is interrupted while waiting/sleeping, it'll wake up and immediately throw Interrupted exception.

The thread class exposes the `interrupt()` method which can be used to interrupt a thread that is blocked in a `sleep()` or `wait()` call. Note that invoking the interrupt method only sets a flag that is polled periodically by sleep or wait to know the current thread has been interrupted and an interrupted exception should be thrown.

Below is an example, where a thread is initially made to sleep for an hour but then interrupted by the main thread.
```
class Demonstration {
    public static void main(String args[]) throws InterruptedException {
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
- Once the interrupted exception is thrown, the interrupt status/flag is cleared as the output of line-19 shows.
- On line-20 we again interrupt the thread and no exception is thrown. This is to emphasize that merely calling the interrupt method isn't responsible for throwing the interrupted exception. Rather the implementation should periodically check for the interrupt status and take appropriate action.
- On line 22 we print the interrupt status for the thread, which is set to true because of line 20.
- Note that there are two methods to check for the interrupt status of a thread. One is the static method `Thread.interrupted()` and the other is `Thread.currentThread()`.isInterrupted(). The important difference between the two is that the static method would return the interrupt status and also clear it at the same time. On line 22 we deliberately call the object method first followed by the static method. If we reverse the ordering of the two method calls on line 22, the output for the line would be true and false, instead of true and true.



---