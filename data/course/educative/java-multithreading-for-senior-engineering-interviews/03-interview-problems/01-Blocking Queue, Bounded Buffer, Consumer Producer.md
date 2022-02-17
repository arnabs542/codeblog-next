---
title: 'Blocking Queue | Bounded Buffer | Consumer Producer'
type: 'problem'
topic: 'Interview Problems'
section: 'Java Multithreading for Senior Engineering Interviews'
course: 'Educative'
problemlist: true
visibility: secret
tags:
- System Design
---
Classical synchronization problem involving a limited size buffer which can have items added to it or removed from it by different producer and consumer threads. This problem is known by different names: consumer producer problem, bounded buffer problem or blocking queue problem.

#### Problem
A **blocking queue** is defined as a queue which blocks the caller of the enqueue method if there's no more capacity to add the new item being enqueued. Similarly, the queue blocks the dequeue caller if there are no items in the queue. Also, the queue notifies a blocked enqueuing thread when space becomes available and a blocked dequeuing thread when an item becomes available in the queue.

#### Solution
Our queue will have a finite size that is passed in via the constructor. Additionally, we'll use an array as the data structure for backing our queue. Furthermore, we'll expose the APIs `enqueue` and `dequeue` for our blocking queue class. We'll also need a **head** and a **tail** pointer to keep track of the front and back of the queue and a size variable to keep track of the queue size at any given point in time. Given this, the skeleton of our blocking queue class would look something like below:
```
public class BlockingQueue<T> {
    T[] array;
    int size = 0;
    int capacity;
    int head = 0;
    int tail = 0;
 
    public BlockingQueue(int capacity) {
        array = (T[]) new Object[capacity];
        this.capacity = capacity;
    }
 
    public void enqueue(T item) {
    }
 
    public T dequeue() {
    }
}
```

Let's start with the **enqueue** method. If the current `size of the queue == capacity` then we know we'll need to block the caller of the method. We can do so by appropriately calling `wait()` method in a while loop. The while loop is conditioned on the size of the queue being equal to the max capacity. The loop's predicate would become false, as soon as, another thread performs a dequeue.

Note that whenever we test for the value of the **size** variable, we also need to make sure that no other thread is manipulating the size variable. This can be achieved by the synchronized keyword as it'll only allow a single thread to invoke the enqueue/dequeue methods on the queue object.

Finally, as the queue grows, it'll reach the end of our backing array, so we need to reset the tail of the queue back to zero. Notice that since we only proceed to enqueue an item when `size of queue < capacity` we are guaranteed that tail would not be overwriting an existing item.

```
public synchronized void enqueue(T item) throws InterruptedException {
    // wait for queue to have space
    while (size == capacity) {
        wait();
    }

    // reset tail to the beginning if the tail is already
    // at the end of the backing array
    if (tail == capacity) {
        tail = 0;
    }

    // place the item in the array
    array[tail] = item;
    size++;
    tail++;

    // don't forget to notify any other threads waiting on
    // a change in value of size. There might be consumers
    // waiting for the queue to have atleast one element
    notifyAll(); 
}
```

Note that in the end we are calling `notifyAll()` method. Since we just added an item to the queue, it is possible that a consumer thread is blocked in the dequeue method of the queue class waiting for an item to become available so it's necessary we send a signal to wake up any waiting threads.

If no thread is waiting, then the signal will simply go unnoticed and be ignored, which wouldn't affect the correct working of our class. This would be an instance of **missed signal** that we have talked about earlier.

Now let's design the `dequeue` method. Similar to the enqueue method, we need to block the caller of the dequeue method if there's nothing to dequeue i.e. `size == 0`

We need to reset head of the queue back to zero in-case it's pointing past the end of the array. We need to decrement the size variable too since the queue will now have one less item.

Finally, we remember to call `notifyAll()` since if the queue were full then there might be producer threads blocked in the enqueue method. This logic in code appears as below:

```
public synchronized T dequeue() throws InterruptedException {
    T item = null;

    // wait for atleast one item to be enqueued
    while (size == 0) {
        wait();
    }

    // reset head to start of array if its past the array
    if (head == capacity) {
        head = 0;
    }
    
    // store the reference to the object being dequeued
    // and overwrite with null 
    item = array[head];
    array[head] = null;
    head++;
    size--;

    // don't forget to call notify, there might be another thread
    // blocked in the enqueue method.
    notifyAll();

    return item;
}
```

We see the dequeue method is analogous to enqueue method. Note that we could have eliminated lines 17 & 18 and instead just returned the following:

`return array[head-1];`

but for better readability we choose to expand this operation into two lines.

#### Complete Code
The full code for the blocking queue appears below.
```
class Demonstration {
    public static void main( String args[] ) throws Exception{
       final BlockingQueue<Integer> q = new BlockingQueue<Integer>(5);

        Thread t1 = new Thread(new Runnable() {

            @Override
            public void run() {
                try {
                    for (int i = 0; i < 50; i++) {
                        q.enqueue(new Integer(i));
                        System.out.println("enqueued " + i);
                    }
                } catch (InterruptedException ie) {

                }
            }
        });

        Thread t2 = new Thread(new Runnable() {

            @Override
            public void run() {
                try {
                    for (int i = 0; i < 25; i++) {
                        System.out.println("Thread 2 dequeued: " + q.dequeue());
                    }
                } catch (InterruptedException ie) {

                }
            }
        });

        Thread t3 = new Thread(new Runnable() {

            @Override
            public void run() {
                try {
                    for (int i = 0; i < 25; i++) {
                        System.out.println("Thread 3 dequeued: " + q.dequeue());
                    }
                } catch (InterruptedException ie) {

                }
            }
        });

        t1.start();
        Thread.sleep(4000);
        t2.start();

        t2.join();

        t3.start();
        t1.join();
        t3.join();
    }
}

// The blocking queue class
class BlockingQueue<T> {

    T[] array;
    Object lock = new Object();
    int size = 0;
    int capacity;
    int head = 0;
    int tail = 0;

    @SuppressWarnings("unchecked")
    public BlockingQueue(int capacity) {
        // The casting results in a warning
        array = (T[]) new Object[capacity];
        this.capacity = capacity;
    }

    public void enqueue(T item) throws InterruptedException {

        synchronized (lock) {

            while (size == capacity) {
                lock.wait();
            }

            if (tail == capacity) {
                tail = 0;
            }

            array[tail] = item;
            size++;
            tail++;
            lock.notifyAll();
        }
    }

    public T dequeue() throws InterruptedException {

        T item = null;
        synchronized (lock) {

            while (size == 0) {
                lock.wait();
            }

            if (head == capacity) {
                head = 0;
            }

            item = array[head];
            array[head] = null;
            head++;
            size--;

            lock.notifyAll();
        }

        return item;
    }
}
```

The test case in our example creates two dequeuer threads and one enqueuer thread. The enqueue-er thread initially fills up the queue and gets blocked, till the dequeuer threads start off and remove elements from the queue. The output would show enqueuing and dequeuing activity interleaved after the first 5 enqueues.

Follow Up Question
In both the `enqueue()` and `dequeue()` methods we use the `notifyAll()` method instead of the `notify()` method. The reason behind the choice is very crucial to understand. Consider a situation with two producer threads and one consumer thread all working with a queue of size one. It's possible that when an item is added to the queue by one of the producer threads, the other two threads are blocked waiting on the condition variable. If the producer thread after adding an item invokes `notify()` it is possible that the other producer thread is chosen by the system to resume execution. The woken-up producer thread would find the queue full and go back to waiting on the condition variable, causing a deadlock. Invoking `notifyAll()` assures that the consumer thread also gets a chance to wake up and resume execution.

---
In the previous lesson, we solved the consumer producer problem using the `synchronized` keyword, which is equivalent of a monitor in Java. Let's see how the implementation would look like, if we were restricted to using a mutex. There's no direct equivalent of a theoretical mutex in Java as each object has an implicit monitor associated with it. For this question, we'll use an object of the **Lock** class and pretend it doesn't expose the `wait()` and `notify()` methods and only provides mutual exclusion similar to a theoretical mutex. Without the ability to wait or signal the implication is, a blocked thread will constantly poll in a loop for a predicate/condition to become true before making progress. This is an example of a busy-wait solution.

Let's start with the `enqueue()` method. If the current `size of the queue == capacity` then we know we need to block the caller of the method until the queue has space for a new item. Since a mutex only allows locking, we give up the mutex at this point. The logic is shown below.
```
    lock.lock();
    while (size == capacity) {
        // Release the mutex to give other threads
        lock.unlock();
        // Reacquire the mutex before checking the
        // condition
        lock.lock();
    }

    if (tail == capacity) {
        tail = 0;
    }

    array[tail] = item;
    size++;
    tail++;
    lock.unlock();
```

The most important point to realize in the above code is the weird-looking while loop construct, where we release the lock and then immediately attempt to reacquire it. Convince yourself that whenever we test the while loop condition `size == capacity`, we do so while holding the mutex! Also, it may not be immediately obvious but a different thread can acquire the mutex just when a thread releases the mutex and attempts to reacquire it within the while loop. Lastly, we modify the `array` variable only when holding the mutex.

We also need to manage the `tail` as the queue grows. Once it reaches the end of our backing array, we reset it to zero. Realize that since we only proceed to add an item when size of `queue < maxSize` we are guaranteed that `tail` will never overwrite an existing item.

Now let us see the code for the `dequeue()` method which is analogous to the `enqueue()` one.
```
    T item = null;

    lock.lock();
    while (size == 0) {
        lock.unlock();
        lock.lock();
    }

    if (head == capacity) {
        head = 0;
    }

    item = array[head];
    array[head] = null;
    head++;
    size--;

    lock.unlock();
    return item;
```

Again note that we always test for the condition `size == 0` when holding the lock. Additionally, all shared state is manipulated in mutual exclusion. Additionally, we reset `head` of the queue back to zero in case it's pointing past the end of the array. We need to decrement the `size` variable too since the queue will now have one less item. The complete code appears in the widget below. It also runs a simulation of several producers and consumers that constantly write and retrieve from an instance of the blocking queue, for one second.
```java main.java
class Demonstration {
    public static void main( String args[] ) throws InterruptedException {
        final BlockingQueueWithMutex<Integer> q = new BlockingQueueWithMutex<Integer>(5);

        Thread producer1 = new Thread(new Runnable() {
            public void run() {
                try {
                    int i = 1;
                    while (true) {
                        q.enqueue(i);
                        System.out.println("Producer thread 1 enqueued " + i);
                        i++;
                    }
                } catch (InterruptedException ie) {
                }
            }
        });

        Thread producer2 = new Thread(new Runnable() {
            public void run() {
                try {
                    int i = 5000;
                    while (true) {
                        q.enqueue(i);
                        System.out.println("Producer thread 2 enqueued " + i);
                        i++;
                    }
                } catch (InterruptedException ie) {

                }
            }
        });

        Thread producer3 = new Thread(new Runnable() {
            public void run() {
                try {
                    int i = 100000;
                    while (true) {
                        q.enqueue(i);
                        System.out.println("Producer thread 3 enqueued " + i);
                        i++;
                    }
                } catch (InterruptedException ie) {

                }
            }
        });

        Thread consumer1 = new Thread(new Runnable() {
            public void run() {
                try {
                    while (true) {
                        System.out.println("Consumer thread 1 dequeued " + q.dequeue());
                    }
                } catch (InterruptedException ie) {

                }
            }
        });

        Thread consumer2 = new Thread(new Runnable() {
            public void run() {
                try {
                    while (true) {
                        System.out.println("Consumer thread 2 dequeued " + q.dequeue());
                    }
                } catch (InterruptedException ie) {

                }
            }
        });

        Thread consumer3 = new Thread(new Runnable() {
            public void run() {
                try {
                    while (true) {
                        System.out.println("Consumer thread 3 dequeued " + q.dequeue());
                    }
                } catch (InterruptedException ie) {

                }
            }
        });

        producer1.setDaemon(true);
        producer2.setDaemon(true);
        producer3.setDaemon(true);
        consumer1.setDaemon(true);
        consumer2.setDaemon(true);
        consumer3.setDaemon(true);

        producer1.start();
        producer2.start();
        producer3.start();

        consumer1.start();
        consumer2.start();
        consumer3.start();

        Thread.sleep(1000);       
    }
}
```

```java BlockingQueueWithMutex.java
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class BlockingQueueWithMutex<T> {
    T[] array;
    Lock lock = new ReentrantLock();
    int size = 0;
    int capacity;
    int head = 0;
    int tail = 0;

    @SuppressWarnings("unchecked")
    public BlockingQueueWithMutex(int capacity) {
        // The casting results in a warning
        array = (T[]) new Object[capacity];
        this.capacity = capacity;
    }

    public T dequeue() throws InterruptedException {

        T item = null;

        lock.lock();
        while (size == 0) {
            lock.unlock();
            lock.lock();
        }

        if (head == capacity) {
            head = 0;
        }

        item = array[head];
        array[head] = null;
        head++;
        size--;

        lock.unlock();
        return item;
    }

    public void enqueue(T item) throws InterruptedException {

        lock.lock();
        while (size == capacity) {
            // Release the mutex to give other threads
            lock.unlock();
            // Reacquire the mutex before checking the
            // condition
            lock.lock();
        }

        if (tail == capacity) {
            tail = 0;
        }

        array[tail] = item;
        size++;
        tail++;
        lock.unlock();
    }
}
```

##### Faulty Implementation
As an exercise, we reproduce the two `enqueue()` and `dequeue()` methods, without locking the mutex object when checking for the while-loop conditions. If you run the code in the widget below multiple times, some of the runs would display a dequeue value of null. We set an array index to null whenever we remove its content to indicate the index is now empty. A race condition is introduced when we check for while-loop predicate without holding a mutex.
```java
public T dequeue() {

    T item = null;

    while (size == 0) { }

    lock.lock();
    if (head == capacity) {
        head = 0;
    }

    item = array[head];
    array[head] = null;
    head++;
    size--;

    lock.unlock();
    return item;
}
```

and,
```java
public void enqueue(T item) {
    
    while (size == capacity) { }

    lock.lock();
    if (tail == capacity) {
        tail = 0;
    }

    array[tail] = item;
    size++;
    tail++;
    lock.unlock();
}
```

```java main.java
class Demonstration {

    static final FaultyBlockingQueueWithMutex<Integer> q = new FaultyBlockingQueueWithMutex<Integer>(5);
    
    static void producerThread(int start, int id ) {
        while (true) {
            try {
                q.enqueue(start);
                System.out.println("Producer thread " + id + " enqueued " + start);
                start++;
                Thread.sleep(1);
            } catch (InterruptedException ie){
                // swallow exception
            }
        }
    }

    static void consumerThread(int id) {
        while (true) {
            try {
                System.out.println("Consumer thread " + id + " dequeued " + q.dequeue());
                Thread.sleep(1);
            } catch (InterruptedException ie){
                // swallow exception
            }
        }
    }    

    public static void main( String args[] ) throws InterruptedException {

        Thread producer1 = new Thread(new Runnable() {
            public void run() {
                producerThread(1, 1);
            }
        });

        Thread producer2 = new Thread(new Runnable() {
            public void run() {
                producerThread(5000, 2);
            }
        });

        Thread producer3 = new Thread(new Runnable() {
            public void run() {
                producerThread(100000, 3);
            }
        });

        Thread consumer1 = new Thread(new Runnable() {
            public void run() {
                consumerThread(1);
            }
        });

        Thread consumer2 = new Thread(new Runnable() {
            public void run() {
                consumerThread(2);
            }
        });

        Thread consumer3 = new Thread(new Runnable() {
            public void run() {
                consumerThread(3);
            }
        });

        producer1.setDaemon(true);
        producer2.setDaemon(true);
        producer3.setDaemon(true);
        consumer1.setDaemon(true);
        consumer2.setDaemon(true);
        consumer3.setDaemon(true);

        producer1.start();
        producer2.start();
        producer3.start();

        consumer1.start();
        consumer2.start();
        consumer3.start();

        Thread.sleep(20000);
    }
}
```
```java FaultyBlockingQueueWithMutex.java
import java.util.concurrent.locks.Lock;
import java.util.concurrent.locks.ReentrantLock;

public class FaultyBlockingQueueWithMutex<T> {
    T[] array;
    Lock lock = new ReentrantLock();
    int size = 0;
    int capacity;
    int head = 0;
    int tail = 0;

    @SuppressWarnings("unchecked")
    public FaultyBlockingQueueWithMutex(int capacity) {
        // The casting results in a warning
        array = (T[]) new Object[capacity];
        this.capacity = capacity;
    }

    public T dequeue() {

        T item = null;

        while (size == 0) {
        }

        lock.lock();
        if (head == capacity) {
            head = 0;
        }

        item = array[head];
        array[head] = null;
        head++;
        size--;

        lock.unlock();
        return item;
    }

    public void enqueue(T item) {

        while (size == capacity) {
        }

        lock.lock();
        if (tail == capacity) {
            tail = 0;
        }

        array[tail] = item;
        size++;
        tail++;
        lock.unlock();
    }
}
```

---
This lesson explains how to solve the producer-consumer problem using semaphores.

##### Using Semaphores for Producer-Consumer Problem
We can also implement the bounded buffer problem using a semaphore. For this problem, we'll use an instance of the `CountingSemaphore` that we implement in one of the later problems. A `CountingSemaphore` is initialized with a maximum number of permits to give out. A thread is blocked when it attempts to release the semaphore when none of the permits have been given out. Similarly, a thread blocks when attempting to acquire a semaphore that has all the permits given out. In contrast, Java's implementation of Semaphore can be signaled (released) even if none of the permits, the Java semaphore was initialized with, have been used. Java's semaphore has no upper bound and can be released as many times as desired to increase the number of permits. Before proceeding forward, it is suggested to complete the `CountingSemaphore` lesson.

We'll augment the `CountingSemaphore` class with a new constructor that takes in the maximum permits and also sets the number of permits already given out. We can use two semaphores, one `semConsumer` and the other `semProducer`. The trick is to initialize `semProducer` semaphore with a maximum number of permits equal to the size of the buffer and set all permits as available. Each permit allows a producer thread to enqueue an item in the buffer. Since the number of permits is equal to the size of the buffer, the producer threads can only enqueue items equal to the size of the buffer and then blocks. However, the `semProducer` is only released/incremented by a consumer thread whenever it consumes an item. If there are no consumer threads, the producer threads will block when the buffer becomes full. In case of the consumer threads, when the buffer is empty, we would want to block any consumer threads on a `dequeue()` call. This implies that we should initialize the `semConsumer` semaphore with a maximum capacity equal to the size of the buffer and set all the permits as currently given out. Let's look at the implementation of `enqueue()` method.
```
public void enqueue(T item) throws InterruptedException {

    semProducer.acquire();

    if (tail == capacity) {
        tail = 0;
    }

    array[tail] = item;
    size++;
    tail++;

    semConsumer.release();
}
```

Suppose the size of the buffer is N. If you study the code above, it should be evident that only N items can be enqueued in the `items` buffer. At the end of the method, we signal any consumer threads waiting on the `semConsumer` semaphore. However, the code is not yet complete. We have only solved the problem of coordinating between the producer and the consumer threads. The astute reader would immediately realize that multiple producer threads can manipulate the code lines between the first and the last semaphore statements in the above `enqueue()` method. In our earlier implementations, we were able to guard the critical section by synchronizing on objects that ensured only a single thread is active in the critical section at a time. We need similar functionality using semaphores. Recall that we can use a binary semaphore to exercise mutual exclusion, however, any thread is free to signal the semaphore, not just the one that acquired it. We'll introduce a `semLock` semaphore that acts as a mutex. The complete version of the `enqueue()` method appears below:
```java
public void enqueue(T item) throws InterruptedException {

    semProducer.acquire();
    semLock.acquire();

    if (tail == capacity) {
        tail = 0;
    }

    array[tail] = item;
    size++;
    tail++;

    semLock.release();
    semConsumer.release();
}
```

Realize that we have modeled each item in the buffer as a permit. When the buffer is full, the consumer threads have N permits to perform `dequeue()` and when the buffer is empty the producer threads have N permits to perform `enqueue()`. The code for `dequeue()` is similar and appears below:
```java
public T dequeue() throws InterruptedException {
    T item = null;

    semConsumer.acquire();
    semLock.acquire();

    if (head == capacity) {
        head = 0;
    }

    item = array[head];
    array[head] = null;
    head++;
    size--;

    semLock.release();
    semProducer.release();

    return item;
}
```

The complete code appears in the code widget below. We also include a simple test with one producer and two consumer threads.

```java main.java
class Demonstration {
    public static void main( String args[] ) throws InterruptedException {
        final BlockingQueueWithSemaphore<Integer> q = new BlockingQueueWithSemaphore<Integer>(5);

        Thread t1 = new Thread(new Runnable() {

            public void run() {
                try {
                    for (int i = 0; i < 20; i++) {
                        q.enqueue(new Integer(i));
                        System.out.println("enqueued " + i);
                    }
                } catch (InterruptedException ie) {

                }
            }
        });

        Thread t2 = new Thread(new Runnable() {

            public void run() {
                try {
                    for (int i = 0; i < 10; i++) {
                        System.out.println("Thread 2 dequeued: " + q.dequeue());
                    }
                } catch (InterruptedException ie) {

                }
            }
        });

        Thread t3 = new Thread(new Runnable() {

            public void run() {
                try {
                    for (int i = 0; i < 10; i++) {
                        System.out.println("Thread 3 dequeued: " + q.dequeue());
                    }
                } catch (InterruptedException ie) {

                }
            }
        });

        t1.start();
        Thread.sleep(4000);
        t2.start();
        t2.join();

        t3.start();
        t1.join();
        t3.join();

    }
}
```

```java BlockingQueueWithSemaphore.java
public class BlockingQueueWithSemaphore<T> {
    T[] array;
    int size = 0;
    int capacity;
    int head = 0;
    int tail = 0;
    CountingSemaphore semLock = new CountingSemaphore(1, 1);
    CountingSemaphore semProducer;
    CountingSemaphore semConsumer;

    @SuppressWarnings("unchecked")
    public BlockingQueueWithSemaphore(int capacity) {
        // The casting results in a warning
        array = (T[]) new Object[capacity];
        this.capacity = capacity;
        this.semProducer = new CountingSemaphore(capacity, capacity);
        this.semConsumer = new CountingSemaphore(capacity, 0);
    }

    public T dequeue() throws InterruptedException {

        T item = null;

        semConsumer.acquire();
        semLock.acquire();

        if (head == capacity) {
            head = 0;
        }

        item = array[head];
        array[head] = null;
        head++;
        size--;

        semLock.release();
        semProducer.release();

        return item;
    }

    public void enqueue(T item) throws InterruptedException {

        semProducer.acquire();
        semLock.acquire();

        if (tail == capacity) {
            tail = 0;
        }

        array[tail] = item;
        size++;
        tail++;

        semLock.release();
        semConsumer.release();
    }
}
```

```java CountingSemaphore.java
public class CountingSemaphore {

    int usedPermits = 0;
    int maxCount;

    public CountingSemaphore(int count) {
        this.maxCount = count;
    }

    public CountingSemaphore(int count, int initialPermits) {
        this.maxCount = count;
        this.usedPermits = this.maxCount - initialPermits;
    }

    public synchronized void acquire() throws InterruptedException {

        while (usedPermits == maxCount)
            wait();

        notify();
        usedPermits++;
    }

    public synchronized void release() throws InterruptedException {

        while (usedPermits == 0)
            wait();

        usedPermits--;
        notify();
    }
}
```


---
