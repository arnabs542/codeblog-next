---
title: 'Memory Management'
type: 'topic'
section: 'Interview Questions'
course: 'Core Java'
tags:
- java
---
## Memory Areas
#### What kinds of memory does the JVM manage?
The JVM manages two kinds of memory: heap and non-heap memory, both created when it starts.

Non-heap memory is all the memory the JVM allocated for purposes other than the heap. The only information JVM provides on non-heap memory is its overall size. No detailed information on non-heap memory content is available.

#### What are Java Runtime Data areas?

The Java Virtual Machine defines various run-time data areas that are used during execution of a program. Some of these data areas are created on Java Virtual Machine start-up and are destroyed only when the Java Virtual Machine exits. Other data areas are per thread. Per-thread data areas are created when a thread is created and destroyed when the thread exits.
1. **(JVM) Stack:** Stack memory is responsible for holding references to heap objects and for storing value types (primitive types), which hold the value itself rather than a reference to an object from the heap. **Stack memory in Java is allocated per Thread. Therefore, each time a Thread is created and started, it has its own stack memory and cannot access another thread’s stack memory.**
1. **Heap:** The heap part of memory stores the actual object in memory. **There exists only one heap memory (heap) for each running JVM process. Therefore, this is a shared part of memory regardless of how many threads are running. The heap memory is periodically garbage collected by the framework.**
1. **Program Counter (PC) Register:** The PC register holds the address of the current instruction. If the current method is native then the PC is undefined. All CPUs have a PC, typically the PC is incremented after each instruction and holds the address of the next instruction to be executed. The JVM uses the PC to keep track of where it is executing instructions, the PC will in fact be pointing at a memory address in the Method Area.
1. **Method area and Runtime constant pool:** JVM has a common method area across all threads. It contains per-class elements like constant pool, fields, method local data, method code, constructor codes etc. which are used in class and initialization of objects/interfaces. The method area is defined as logically part of the heap in the JVM specification. The specifications don’t force to implement the method area in the heap. For example, until JAVA 1.7, Oracle HotSpot used a zone called **PermGen** to store the Method Area. This PermGen was contiguous with the Java heap (and memory managed by the JVM like the heap) and was limited to a default space of 64MB (modified by the argument -XX:MaxPermSize). Since Java 1.8, HotSpot now stores the Method Area in a separated native memory space called the **Metaspace**, the max available space is the total available system memory.
1. **Native Stack:** Methods written in languages other than Java programming languages such as C, C++ are called native methods. When a thread calls a Java method, a new frame is created and is being pushed onto the Java stack. When a thread calls a native method, the thread switches from Java stack to native method stack. The parameters(if any) are pushed on native method stack. If a native method calls back a Java method, the thread leaves the native method stack and enters in Java stack again.

Not all JVMs support native methods, however, those that do typically create a per thread native method stack.

#### Explain the different parts of the Heap?
Java’s heap memory consists of the following areas:
1. Eden Space
1. First Survivor Space
1. Second Survivor Space
1. Old Generation

The first three areas are grouped under **young generation** and the fourth area is called **old generation**. The maximum theoretical heap limit for the 32-bit JVM is 4G. Due to various additional constraints such as available swap, kernel address space usage, memory fragmentation, and VM overhead, in practice the limit can be much lower.

#### What is PermGen space?
**The permanent generation is defined as the pool containing all the reflective data of the virtual machine itself, such as class and method objects. Note it is part of the HotSpot JVM only. For instance, there's no PermGen space in IBM's J9 JVM implementation.** The permanent generation is special because it holds meta-data describing user classes (classes that are not part of the Java language). The JVM keeps track of loaded class metadata in the PermGen. Additionally, the JVM stores all the static content in this memory section. This includes all the static methods, primitive variables, and references to the static objects.

Furthermore, it contains data about bytecode, names and JIT information. Before Java 7 (same as Java 1.7), the String Pool was also part of this memory. **With Java 1.8, metaspace has replaced permgen as its successor.**

Permanent generation is a separate heap space separated from the main memory heap. Since it is a separate region, it is not considered part of the Java Heap space. Though permgen is contiguous to the Java heap.

PermGen was often involved in generating the well-known `OutOfMemory` error. The garbage collection of the permanent generation would be tied to the garbage collection of the old generation, so whenever either gets full, both the permanent generation and the old generation would be collected. One of the problems was the dependency on the `‑XX:MaxPermSize` (option to set the maximum size of the permGen). If the classes' metadata size goes beyond the bounds of `‑XX:MaxPermSize`, the application will run out of memory and encounter an OOM (Out of Memory) error. The size of the PermGen can be controlled with the following two flags
- `-XX:PermSize` is the initial or minimum size of the PermGen space
- `-XX:MaxPermSize` is the maximum size

#### What is Metaspace?
With the advent of JDK8, we no longer have the PermGen. The metadata information is not gone, just that the space where it was held is no longer contiguous to the Java heap. The metadata has now moved to native memory to an area known as the Metaspace. The JDK 8 HotSpot JVM is now using native memory for the representation of class metadata similar to the Oracle JRockit and IBM JVM's.

The move to Metaspace was necessary since the PermGen was really hard to tune. There was a possibility that the metadata could move with every full garbage collection. Also, it was difficult to size the PermGen since the size depended on a lot of factors such as the total number of classes, the size of the constant pools, size of methods, etc.

Additionally, each garbage collector in HotSpot needed specialized code for dealing with metadata in the PermGen. Detaching metadata from PermGen not only allows the seamless management of Metaspace, but also allows for improvements such as simplification of full garbage collections and future concurrent de-allocation of class metadata.

#### What is the difference between PermGen and Metaspace?
**The key difference between PermGen and Metaspace is that while PermGen is contiguous to the Java heap memory, Metaspace is not part of Heap. Rather Metaspace is part of Native Memory (process memory) which is only limited by the Host Operating System.**

PermGen always has a fixed maximum size but Metaspace by default auto increases its size depending on the underlying OS.

#### What is native memory?
Native or Off-heap memory is memory allocated within a process's address space that is not within the heap. The heap (usually) accounts for the largest amount of memory used by the JVM, but the JVM also uses memory for its internal operations. This nonheap memory is native memory. Native memory can also be allocated in applications (via JNI calls to `malloc()` and similar methods, or when using New I/O, or NIO). **The total of native and heap memory used by the JVM yields the total footprint of an application.**

Heap memory on the other hand is memory within the JVM process that is managed by the JVM to represent Java objects.

Native out-of-memory problems can not be resolved by increasing the JVM's heap-size. It is a completely different area of memory. If you are using the whole available memory for JVMs, it can lead to a situation that there is not enough memory available for OS specific tasks like (thread-creation). So sometimes it helps to lower the JVMs heap to resolve native OOM problems so that there is enough room for native memory tasks.

Memory used by Java process (as seen by the OS) is not only limited to Java Heap. There are a lot more memory areas that should be also counted:
- Metaspace (where class metadata resides)
- Code Cache (storage for JIT-compiled methods and all the generated code)
- Direct ByteBuffers
- Memory-mapped files, including files mapped by JVM, e.g. all JAR files on the classpath
- Thread stacks
- JVM code itself and all the dynamic libraries loaded by Java Runtime
- Other internal JVM structures

The JVM has a feature called **Native Memory Tracking** that can be used to get the detailed breakdown of memory areas used by JVM.

The JVM is shipped with a handful of GC algorithms, each suitable for different use cases. All those GC algorithms share one common trait: they need to use some off-heap data structures to perform their tasks. These internal data structures also consume native memory.

The JVM is the usual suspect for a significant number of native allocations, but sometimes developers can directly allocate native memory, too. Most common approaches are the malloc call by JNI and NIO’s direct ByteBuffers.

#### What is the code cache in Java HotSpot?
In order to run JVM bytecode on different platforms, it needs to be converted to machine instructions. The JIT compiler is responsible for this compilation as the program is executed. When the JVM compiles bytecode to assembly instructions, it stores those instructions in a special non-heap data area called Code Cache.

#### What is string internment?
In order to save some heap space, we can store one copy of each unique String and make others refer to the stored copy. This process is called **String Interning**. Since the JVM can only intern compile time string constants, we can manually call the intern() method on strings we intend to intern.

**JVM stores interned strings in a special native fixed-sized hashtable called the string table, also known as the String Pool. We can configure the table size (i.e. the number of buckets) via the `-XX:StringTableSize` tuning flag.**

---
## Reference Strengths
#### What are the different reference types in Java?
- Strong Reference
- Weak Reference
- Soft Reference
- Phantom Reference

#### What is a strong reference?
These are the references we are all used to. The object on the heap is not garbage collected while there is a strong reference pointing to it, or if it is strongly reachable through a chain of strong references.

#### What are Weak References?
**A weakly referenced object is cleared by the Garbage Collector when it’s weakly reachable. Weak reachability means that an object has neither strong nor soft references pointing to it. The object can be reached only by traversing a weak reference.** A weak reference to an object from the heap is most likely to not survive after the next garbage collection process. `WeakHashMap` is an example datastructure using weak references.

The referent is wrapped by an instance of the `WeakReference` class like below:
```
        String str = new String("Educative.io"); // This is the referent
        WeakReference<String> myString = new WeakReference<>(str); // referent being passed into the constructor
 
        // Try invoking the GC, but no guarantees it'll run
        Runtime.getRuntime().gc();
 
        if (myString.get() != null) {
            System.out.println(myString.get());
        } else {
            System.out.println("String object has been cleared by the Garbage Collector.");
        }
```
The idiomatic usage of a weak reference always requires checking whether the underlying variable has been removed by the GC.
```
import java.lang.ref.WeakReference;

class Demonstration {
    public static void main( String args[] ) {
        String str = new String("Educative.io"); // This is a string reference
        WeakReference<String> myString = new WeakReference<>(str);
        str = null; // nulling the strong reference
    
        // Try invoking the GC, but no guarantees it'll run
        Runtime.getRuntime().gc();

        if (myString.get() != null) {
            System.out.println(myString.get());
        } else {
            System.out.println("String object has been cleared by the Garbage Collector.");
        }
    }
}
```
Note that in the above code if instead of creating a String object using new, we initialized the str variable using a string literal like str = "Educative.io"; then the program behavior would be different. The String literal isn't allocated on the heap rather it lives in a special area called the String pool. The String pool consists of string literals that can reused and aren't removed from the pool even when there may be no reference to them. Therefore, if you run the same program initializing the str variable with a string literal, the print message would be different.

#### What are Soft References?
Soft reference objects, which are cleared at the discretion of the garbage collector in response to memory demand. Soft references are most often used to implement memory-sensitive caches.

These types of references are used for more memory-sensitive scenarios since those are going to be garbage collected only when your application is running low on memory. Therefore, as long as there is no critical need to free up some space, the garbage collector will not touch softly reachable objects. Java guarantees that all soft referenced objects are cleaned up before it throws an OutOfMemoryError.

#### What is the difference between Weak reference and Soft reference?
The difference between WeakReference and SoftReference is that the Garbage collector can collect an object if only weak references are pointing to it i.e. a weak reference is eagerly collected. On the other hand, objects with SoftReference are only collected when the JVM absolutely needs memory.

#### What is the use of ReferenceQueue?
Reference queues are designed for making us aware of actions performed by the Garbage Collector. It appends a reference object to a reference queue as it decides to remove the referent of this reference.

The idiom when using reference is to wrap an object in a reference type. For example:
```
        Integer i = new Integer(420);
        WeakReference<Integer> myRec = new WeakReference<>(i, q);
```
This is fine as long as you don't care about when the garbage collector reclaims the objects. But if you did care when the garbage collector collected an object you would use something called a `ReferenceQueue`. The constructor for the reference types takes in a queue parameter. The queue can be later polled in your code for any items. When you do find an item, you would its an item

Let's see how we can use a queue with a weak reference type. The below snippet will passes a reference queue but since there's no GC being performed, the queue remains empty till the end of the program. You can run the code snippet below and verify the output.
```
import java.lang.ref.WeakReference;
import java.lang.ref.ReferenceQueue;

class Demonstration {
    public static void main( String args[] ) {
        // Declare an integer
        Integer i = new Integer(420);
        
        // Create a reference queue typed on Integer
        ReferenceQueue<Integer> q = new ReferenceQueue<>();
        
        // Create the weak reference and pass the queue as a param
        WeakReference<Integer> wrappedInt = new WeakReference<>(i, q);

        // Prints the wrapped integer.
        System.out.println(wrappedInt.get().toString());


        // Check if the queue has any item in it. It should return
        // null since no GC has been performed
        System.out.println(q.poll() == null ? "queue is empty" : "queue has an element");
    }
}
```
Now we'll nullify the variable `i = null` and run the GC and this time the variable should be enqueued in the reference queue we passed in.
```
import java.lang.ref.Reference;
import java.lang.ref.ReferenceQueue;
import java.lang.ref.WeakReference;

class Demonstration {
    public static void main( String args[] ) throws InterruptedException {
        // Declare an integer
        Integer i = new Integer(420);

        // Create a reference queue typed on Integer
        ReferenceQueue<Integer> q = new ReferenceQueue<>();

        // Create the weak reference and pass the queue as a param
        WeakReference<Integer> wrappedInt = new WeakReference<>(i, q);

        // Prints the wrapped integer.
        System.out.println(wrappedInt.get().toString());


        // Nullify the object
        i = null;

        // Run the GC. There's no guarantee the GC would run but
        // we can try by hinting the JVM to run the GC and sleeping
        // for a second. Hopefully it triggers the GC, it does on my
        // machine.
        System.gc();
        Thread.sleep(1000);


        // Check if the queue has any item in it.
        Reference<? extends Integer> reference = q.remove();
        if (reference != null) {
            // Because the Integer object is already collected
            // k will be null
            Integer k = reference.get();
            // reference is the same object as wrappedInt but the referent which was the
            // Integer object is now null
            System.out.println("reference == wrappedInt : " + (reference == wrappedInt));
            System.out.println("queue has an element but its already cleared and set to " + k);

            // ... perform resource cleanup or other finalization actions

        } else {
            System.out.println("Ooops the GC didn't run");
        }

    }
}
```
Non-strong references start returning null once the heap object they weakly refer to don't have any strong references to them. On the contrary, the problem with non-strong references is that you never know when they will start returning null because they can be garbage collected anytime by the GC. `ReferenceQueue` is a provision by Java to help us know when the weak reference is eligible for GC.

#### What are Phantom References?
Phantom references are most often used for scheduling pre-mortem cleanup actions in a more flexible way than is possible with the Java finalization mechanism. Unlike soft and weak references, phantom references are not automatically cleared by the garbage collector as they are enqueued. An object that is reachable via phantom references will remain so until all such references are cleared or themselves become unreachable.

**Before Java 9:**
Whilst Weak and Soft references are put in the queue after the object is finalized, Phantom references are put in the queue before the object is finalized. If for any reason you don’t poll the queue, the actual objects referenced by the PhantomReference will not be finalized, and you can incur an OutOfMemory error. Consider the same program from the previous question where instead of a weak reference we'll use a phantom reference.

**Java 9 and After:**
Phantom references are automatically cleared (set to null) in Java 9 and after.
```
import java.lang.ref.PhantomReference;
import java.lang.ref.Reference;
import java.lang.ref.ReferenceQueue;

class Demonstration {
    public static void main( String args[] ) throws InterruptedException {
        // Declare an integer
        Integer i = new Integer(777);

        // Create a reference queue typed on Integer
        ReferenceQueue<Integer> q = new ReferenceQueue<>();

        // Create the weak reference and pass the queue as a param\
        PhantomReference<Integer> wrappedInt = new PhantomReference<>(i, q);

        // THE GET ALWAYS RETURNS NULL for a PhantomReference in
        // contrast to weak and soft references.
        System.out.println("get() method of a phantom references always returns null.\nwrappedInt.get() = " + wrappedInt.get());


        // Nullify the object
        i = null;

        // Run the GC. There's no guarantee the GC would run but
        // we can try by hinting the JVM to run the GC and sleeping
        // for a second. Hopefully it triggers the GC, it does on my
        // machine.
        System.gc();
        Thread.sleep(1000);


        // Check if the queue has any item in it.
        Reference<? extends Integer> reference = q.remove();
        if (reference != null) {

            // reference is the same object as wrappedInt but the referent which was the
            // Integer object is not yet finalized but we can't access it.
            System.out.println("reference == wrappedInt : " + (reference == wrappedInt));
            System.out.println("queue has an element : " + reference);

            // ... perform resource cleanup or other finalization actions

        } else {
            System.out.println("Ooops the GC didn't run");
        }
    }
}
```
Another difference between Phantom references and other references is that the `get()` method of a phantom reference always returns null even before a GC has occurred. The other reference types return their referents with the `get()` method.

Phantom reference can be used to notify one when an object is out of scope to do resource cleanup. Remember that the `object.finalize()` method is not guaranteed to be called at the end of the life of an object, so if one needs to close files or free resources, one can rely on Phantom references. A typical pattern is to derive your own reference type from `PhantomReference` and add information useful for the final freeing.

#### Consider the setup below:
```
class CustomReference<T> extends PhantomReference<T> {
    T referent;
 
    public CustomReference(T referent, ReferenceQueue<T> q) {
        super(referent, q);
        this.referent = referent;
    }
 
    public void doCleanup() {
        // Try to access referent
        System.out.println(referent);
        System.out.println("...");
    }
}
```
If the following sequence of statements are executed, what will be custRef at the last statement?
```
        // Declare an integer
        Integer i = new Integer(123);
 
        // Create a reference queue typed on Integer
        ReferenceQueue<Integer> q = new ReferenceQueue<>();
 
        // Create the weak reference and pass the queue as a param\
        CustomReference<Integer> wrappedInt = new CustomReference<>(i, q);
                
        // Nullify the object
        i = null;
 
        // Guaranteed GC run
 
             // Check if the queue has any item in it.
        CustomReference<Integer> custRef = (CustomReference<Integer>) q.remove();
```
**Answer:** The program will block at the last line

The `remove()` is a blocking call and doesn't return till an object becomes available in the queue. The point of this exercise is to exhibit how `PhantomReference` can be used in practice. Because the `CustomReference` holds a strong reference to the referent in the constructor, the integer object doesn't become eligible for garbage collection even after the variable `i` is set to `null`. If you run the following snippet, it'll timeout. You can comment the highlighted line 61 and the program would not block.
```
import java.lang.ref.PhantomReference;
import java.lang.ref.Reference;
import java.lang.ref.ReferenceQueue;


class Demonstration {
    public static void main( String args[] ) throws InterruptedException {
        // Declare an integer
        Integer i = new Integer(123);

        // Create a reference queue typed on Integer
        ReferenceQueue<Integer> q = new ReferenceQueue<>();

        // Create the weak reference and pass the queue as a param\
        CustomReference<Integer> wrappedInt = new CustomReference<>(i, q);

        // THE GET ALWAYS RETURNS NULL for a PhantomReference in
        // contrast to weak and soft references.
        System.out.println(wrappedInt.get());


        // Nullify the object
        i = null;

        // Run the GC. There's no guarantee the GC would run but
        // we can try by hinting the JVM to run the GC and sleeping
        // for a second. Hopefully it triggers the GC, it does on my
        // machine.
        System.gc();
        Runtime.getRuntime().gc();
        Thread.sleep(1000);


        // Check if the queue has any item in it.
        @SuppressWarnings("unchecked")
        CustomReference<Integer> custRef = (CustomReference<Integer>) q.remove();
        if (custRef != null) {

            // reference is the same object as wrappedInt but the referent which was the
            // Integer object is not yet finalized but we can't access it.
            System.out.println("reference == wrappedInt : " + (custRef == wrappedInt));
            System.out.println("queue has an element but its already cleared and set to " + custRef);

            // cast
            custRef.doCleanup();

            // ... perform resource cleanup or other finalization actions

        } else {
            System.out.println("Ooops the GC didn't run");
        }
    }
}

class CustomReference<T> extends PhantomReference<T> {

    T referent;

    public CustomReference(T referent, ReferenceQueue<T> q) {
        super(referent, q);
        // Comment the following line to make the program work
        this.referent = referent;
    }

    public void doCleanup() {
        // Try to access referent
        System.out.println(referent);
        System.out.println("...");
    }
}
```

---
## Garbage Collection
#### What is a garbage collector?
Unlike other languages, Java takes off the load of memory management from the developer. The crux is Java determines what objects are no longer used and reclaims the memory for future use. Java's garbage collection tracks live objects and everything else is assumed to be garbage. Garbage collector is the program running in the background that looks into all the objects in the memory.

Java ships with several garbage collectors. More specifically, these are different algorithms that run in their own threads. Each works differently and has pros and cons. The most important thing to keep in mind is that **all garbage collectors stop the world. That is, your application is put on hold or paused, as the garbage is collected and taken out.** The main difference among the algorithms is how they stop the world. Some algorithms sit completely idle until the garbage collection is absolutely needed and then pause your application for a long period while others do most of their work concurrently with your application and thus need a shorter pause during stop the world phase. The best algorithm depends on your goals: are you optimizing for throughput where long pauses every now and then are tolerable or you are optimizing for low latency by spreading it out and having short pauses all along.

#### Explain the garbage collection process in Java.
- Whenever a new object is created, it is allocated its space in the Eden memory. The Eden memory is limited and fills up fast. Initially, both the survivor spaces are empty. Let's call them survivor space A and B to distinguish between them.
- When the garbage collector runs for the first time, it marks alive objects in Eden memory and any unused objects are collected as garbage. The objects surviving the garbage collector run are placed in one of the survivor spaces. For our example let's imagine they are placed in survivor space A.
- On the second run of the GC the surviving objects from the Eden memory and the survivor memory A are placed in the unused survivor memory B.
- The two survivor spaces exist to avoid memory fragmentation. After the GC run is complete on Eden memory and one of the survivor spaces, the two memory spaces will have holes in them since dead objects have been reclaimed. Instead of dealing with compaction, JVM chooses to move all the alive objects over from Eden and the in-use survivor space to the unused survivor space. Avoiding compaction is the reason for having two survivor memory spaces.
- Upon surviving X rounds of garbage collection, where X depends on the JVM implementation, an object is expected to live forever and gets promoted to the old or tenured generation. Before the promotion, the object ping pongs between the two survivor spaces as GC runs take place.
- Garbage collection runs on tenured generation once it becomes full. However, memory compaction can't be avoided for this memory space and garbage collection takes more time than when it runs on the young generation.

#### What are the different types of garbage collectors?
The JVM has three types of garbage collectors, and the programmer can choose which one should be used. By default, Java chooses the garbage collector type to be used based on the underlying hardware.

The different types of garbage collectors are:
- **Serial GC:** Uses a single thread for garbage collection. Can be specified using the command line option -XX:+UseSerialGC. This implementation freezes all application threads when it runs and doesn’t work great in multi-threaded server environments. It is best-suited to single processor machines.
- **Parallel GC:** Multiple threads are used for garbage collection. Can be specified using the command line option -XX:+UseParallelGC. This implementation also freezes application threads but there are other knobs that we can tweak. For instance we can specify the maximum throughput target (measured regarding the time spent doing garbage collection versus the time spent outside of garbage collection), the number of GC threads and the maximum pause time goal. It is intended for applications with medium-sized to large-sized data sets that are run on multiprocessor or multithreaded hardware.
- **Mostly Concurrent GC:** The mostly concurrent GC, as the name implies, attempts to work concurrently to the application. It is called "mostly" concurrent because there’s still a period of time for which the application threads are paused. There are two kinds of mostly concurrent garbage collectors:
    - **Garbage First (G1):** The G1 collector is a server-style garbage collector, targeted for multi-processor machines with large memories. It meets garbage collection (GC) pause time goals with high probability, while achieving high throughput. Unlike other collectors, G1 collector partitions the heap into a set of equal-sized heap regions, each a contiguous range of virtual memory. When performing garbage collections, G1 shows a concurrent global marking phase (i.e. phase 1 known as Marking) to determine the liveness of objects throughout the heap. After the mark phase is completed, G1 knows which regions are mostly empty. It collects in these areas first, which usually yields a significant amount of free space (i.e. phase 2 known as Sweeping). It is why this method of garbage collection is called Garbage-First.
    - **Concurrent Mark Sweep:** This implementation of garbage collection has been deprecated as of JDK 9. It uses multiple garbage collector threads for garbage collection. It’s designed for applications that prefer shorter garbage collection pauses, and that can afford to share processor resources with the garbage collector while the application is running.

#### What are GC roots?
GC roots are objects that are themselves referenced by the JVM and thus keep every other object from being garbage-collected. A garbage collection root is an object that is accessible from outside the heap. There are four kinds of GC roots in Java:
- **Local Variables:** are kept alive by the stack of a thread.
- **Active Java Threads:** are always considered live objects.
- **Static Variables:** are referenced by class objects which can also be garbage collected.
- **JNI References:** are Java objects created by native code. These are considered special form of GC root because the JVM doesn’t know if the native code still references these objects.

There are two phases of GC: Mark and Sweep. Mark "paints" the graph of objects to identify what cannot be collected. Sweep "collects" the unpainted objects.

The mark phase begins at the GC roots. For example, each active thread is conceptually a GC root, because the mark phase goes to each active thread, then to each call stack frame for that thread, then to each local variable for that frame, and then to whatever that variable “points to”, and so on.

#### What is the mark and sweep algorithm?
This is a two step algorithm:
- **Mark Phase:** In the first step the garbage collector identifies which objects are in use and which ones are not in use. The application threads need to be stopped for the marking to happen as you cannot really traverse the graph if it keeps changing under your feet all the time. Such a situation when the application threads are temporarily stopped so that the JVM can indulge in housekeeping activities is called a safe point resulting in a Stop The World pause. Safe points can be triggered for different reasons but garbage collection is by far the most common reason for a safe point to be introduced.

The duration of this pause depends neither on the total number of objects in heap nor on the size of the heap but on the number of alive objects. So increasing the size of the heap does not directly affect the duration of the marking phase.

- **Sweep Phase** In the second step unreachable objects are swept away to clear the heap memory of unreachable objects.

The disadvantage of this algorithm include stopping the application threads whilst the algorithm executes and memory compaction required for memory defragmentation resulting from clearing unreachable objects. The compact phase can be added as an additional step and actually happens when garbage collection runs on old (tenured) generation.

- **Compact Phase** This is an additional step for the mark-sweep-compact algorithm, which solves the shortcomings of the vanilla mark and sweep by moving all marked (alive objects) to the beginning of the memory region. The downside of this approach is an increased GC pause duration as we need to copy all objects to a new place and update all references to such objects. The benefit is cheaper future object allocation as JVM doesn't need to deal with memory holes.

#### Can we force the Garbage Collector to run?
Invoking `System.gc()` or `Runtime.getRuntime().gc()` might lead one to believe that the garbage collector is invoked when this statement is executed in code however that is not the case. This method is only a hint to the Java framework that the garbage collector be invoked but it is upto the framework whether garbage collection is undertaken or not.

#### What is minorGC and majorGC?
When garbage collection runs on the younger generation, it is referred to as **minorGC** whereas when garbage collection runs on the older generation it is called as **majorGC**. When garbage collection runs on both the generations it is termed as fullGC.

One should note that there are no formal definitions present for these terms. Neither in JVM specification nor in the Garbage Collection research papers. Major GCs are often triggered by Minor GCs, so separating the two is impossible in many cases.

---
## Memory Tuning
#### What are some of the steps you’ll take to improve the memory footprint of a Java application?
- Limiting the scope of local variables. Each time the top scope from the stack is popped up, the references from that scope are lost, and this could make objects eligible for garbage collection.
- Explicitly set variable references to `null` when not needed. This will make objects eligible for garbage collection.
- Avoid finalizers. They slow down program performance and do not guarantee anything.
- Do not use strong references where weak or soft references apply. The most common memory pitfalls are caching scenarios, when data is held in memory even if it might not be needed.
- JVM can be configured based on application requirements. There are a number of knobs that one can use to tune and tweak the memory performance. For instance:
    - `-Xms` specifies the initial heap size
    - `-Xmx` specifies the maximum heap size
    - `-Xss` specifies the thread stack size
    - `-Xmn` specifies the young generation size
- The JVM can be instructed to dump the heap on an `OutOfMemoryError` exception by adding the `-XX:+HeapDumpOnOutOfMemoryError` argument to the JVM. The heap can then be visualized for memory leaks and consumption using tools such as eclipse's MAT, jvisualvm or yourkit profiler.
- The `-verbose:gc` option can be used to get garbage collector's output.

#### What is a memory leak?
**A memory leak in Java is a situation where some objects are no longer used by an application, but the Garbage Collector fails to recognize them as unused.** This leads to the OutOfMemoryError if those unused objects contribute to the heap usage significantly enough that the next memory allocation request by the application cannot be fulfilled.

#### Does Java's automatic garbage collection resolve all memory leak issues?
Automatic garbage collection doesn't mean that a developer doesn't need to worry about memory leaks. Java programs can have logical errors that hold on to object references or resources when they are no longer needed causing the program's memory footprint to expand over the course of the application run.

#### What is a classloader leak?
A classloader will be removed by the garbage collector only if nothing else refers to it. All classes hold a reference to their classloader and all objects hold references to their classes. As a result, if an application gets unloaded but one of its objects is still being held (e.g., by a cache or a thread-local variable), the underlying classloader cannot be removed by the garbage collector.

The metadata about a particular class lives in the metadata space, which replaced the permgen space starting in Java 8. **A classloader leak happens when an application is unloaded but the class definitions for the classes loaded by the application continue to live on in metaspace (or permgen) increasing the memory footprint of the JVM over time.** Eventually, an `OutofMemoryError` is thrown.

It is possible to get the `OutOfMemoryError` with no classloader leaks if the application loads a very large number of classes and the metaspace (or permgen) isn't appropriately sized.

One example where a classloader leak can happen is if some thread continues to run after the application is undeployed. The thread will usually hold a reference to a classloader of the web application it was started by, called context classloader. Which in turn means that all classes of the undeployed application continue to be held in memory.

These sort of memory leaks can happen in application servers and OSGi containers e.g. an application is redeployed without restarting the application server. This is an example of a memory leak which automatic garbage collection paradigm can't address.

#### What components of the JVM can affect a program's performance?
There are three components of the JVM that are focused on when tuning for performance:
- **Heap:** The heap is where your object data is stored.
- **Garbage Collector:** The heap managed by the garbage collector selected at startup. Most tuning options relate to sizing the heap and choosing the most appropriate garbage collector for your situation.
- **JIT Compiler:** The JIT compiler also has a big impact on performance but rarely requires tuning with the newer versions of the JVM.

#### What is meant by improving Java’s performance?
Java applications can be tuned for one of the two:
- **Responsiveness:** Responsiveness refers to how quickly an application or system responds with a requested piece of data. Examples include:
    - How quickly a desktop UI responds to an event
    - How fast a website returns a page
    - How fast a database query is returned

For applications that focus on responsiveness, large pause times are not acceptable. The focus is on responding in short periods of time

- **Thoroughput:** Throughput focuses on maximizing the amount of work by an application in a specific period of time. Examples include:
    - Number of transactions completed in a given amount of time
    - Number of jobs a batch program completes in an hour
    - Number of database queries completed in an hour

High pause times are acceptable for applications that focus on throughput. Since high throughput applications focus on benchmarks over longer periods of time, quick response time is not a consideration.


---