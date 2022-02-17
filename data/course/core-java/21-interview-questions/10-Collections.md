---
title: 'Collections'
type: 'topic'
section: 'Interview Questions'
course: 'Core Java'
tags:
- java
---
## Collection Types
#### What are legacy collections?
**Collections which were provided with JDK 1.0 have come to be known as legacy collections.**

Examples include `Hashtable` and `Vector`. These are thread-safe and utilize synchronization to be so. Synchronization is expensive and can slow down the overall execution of a program.

#### What is the Collections Framework introduced in JDK 1.2?
The Collections Framework was introduced with JDK 1.2 and provided several utility collections.

The Collections Framework in JDK 1.2 avoided thread-safe collections as not all use cases require thread-safety. Synchronization code required to make collections thread-safe can also slow down performance and is unneeded in single threaded scenarios. The collections included in this framework are the ones you are most likely familiar with such as `HashMap`, `LinkedList`, `ArrayList` etc.

#### What are wrapped collections?
When the Collections Framework was introduced in JDK 1.2, it didn't come with collections that were synchronized. However, to cater for multithreaded scenarios, **the framework provided static methods to wrap vanilla collections in thread-safe wrapper objects.** These thread-safe wrapper objects came to be known as wrapper collections.

Example Wrapper Collection
```
        ArrayList<Integer> myList = new ArrayList<>();
        List<Integer> syncList = Collections.synchronizedList(myList);
```
For design pattern fans, this is an example of the decorator pattern.

#### Are wrapped collections are thread-safe in all scenarios?
Wrapped collections are thread-safe as long as multiple threads are involved in invoking APIs defined on the collection objects. For instance multiple threads can invoke the add() method on an instance of `ArrayList` at the same time and thread synchronization will ensure the right behavior. **However, certain situations such as test-then-act will require client side locking/synchronization** as the below example depicts:

Faulty Code
```
        ArrayList<Integer> myList = new ArrayList<>();
        List<Integer> syncList = Collections.synchronizedList(myList);
 
        if (syncList.size() == 0) {
            syncList.add(1);
        }
```
The above code tests if the size of the list is zero and then adds an element. Even though the list is synchronized and thread-safe, the above snippet is not because multiple threads executing the same snippet around the same time can find the list size to be zero. The fix requires client side synchronization and we can synchronize on the wrapper object itself like so:

Fixed Code
```
        ArrayList<Integer> myList = new ArrayList<>();
        List<Integer> syncList = Collections.synchronizedList(myList);
 
        synchronized (syncList) {
            if (syncList.size() == 0) {
                syncList.add(1);
            }
        }
```

#### What are concurrent collections?
Java 5 introduced thread-safe concurrent collections as part of a much larger set of concurrency utilities. The concurrent collections remove the necessity for client-side locking as we saw in the last question. In fact, external synchronization is not even possible with these collections, as there is no one object which when locked will synchronize all instance methods. **If you need thread safety, the concurrent collections generally provide much better performance than synchronized (wrapper) collections.** This is primarily because their throughput is not reduced by the need to serialize access, as is the case with synchronized collections. Synchronized collections also suffer from the overhead of managing locks, which can be high if there is much contention.

The concurrent collections use a variety of ways to achieve thread-safety while avoiding traditional synchronization for better performance. These are:
- **Copy on Write:** Concurrent collections utilizing this scheme are suitable for read-heavy use cases. An immutable copy is created of the backing collection and whenever a write operation is attempted, the copy is discarded and a new copy with the change is created. Reads of the collection don’t require any synchronization, though synchronization is needed briefly when the new array is being created. Examples include `CopyOnWriteArrayList` and `CopyOnWriteArraySet`
- **Compare and Swap:** consider a computation in which the value of a single variable is used as input to a long-running calculation whose eventual result is used to update the variable. Traditional synchronization makes the whole computation atomic, excluding any other thread from concurrently accessing the variable. This reduces opportunities for parallel execution and hurts throughput. An algorithm based on CAS behaves differently:- it makes a local copy of the variable and performs the calculation without getting exclusive access. Only when it is ready to update the variable does it call CAS, which in one atomic operation compares the variable’s value with its value at the start and, if they are the same, updates it with the new value. If they are not the same, the variable must have been modified by another thread; in this situation, the CAS thread can try the whole computation again using the new value, or give up, or— in some algorithms — continue, because the interference will have actually done its work for it! Collections using CAS include `ConcurrentLinkedQueue` and `ConcurrentSkipListMap`.
- **Lock:** Some collection classes use `Lock` to divide up the collection into multiple parts that can be locked separately resulting in improved concurrency. For example, `LinkedBlockingQueue` has separate locks for the head and tail ends of the queue, so that elements can be added and removed in parallel. Other collections using these locks include `ConcurrentHashMap` and most of the implementations of `BlockingQueue`.

**CopyOnWrite Example**

Lets take an example with a regular arraylist along with a `CopyOnWriteArrayList`. We will be recording the time each of it takes when a number is added to them. The example shows us that the `CopyOnWriteArrayList` takes much more time than a regular arraylist because the whole content of the `CopyOnWriteArrayList` is copied into the new internal copy. The additional copies eventually lead to a delayed operation.
```
import java.util.concurrent.CopyOnWriteArrayList; 
import java.util.*; 

/**
 * Java program to illustrate CopyOnWriteArrayList 
 */  
public class main 
{
  public static void main(String[] args) 
  throws InterruptedException 
  { 
    //Initializing a regular Arraylist
    ArrayList<Integer> array_list = new ArrayList<>();
    array_list.ensureCapacity(500000);
    //Initializing a new CopyOnWrite Arraylist with 500,000 numbers
    CopyOnWriteArrayList<Integer> numbers = new CopyOnWriteArrayList<>(array_list);

    //Calculating the time it takes to add a number in CopyOnWrite Arraylist
    long startTime = System.nanoTime();
    numbers.add(500001); 
    long endTime = System.nanoTime();
    long duration = (endTime - startTime);
                
    //Calculating the time it takes to add a number in regular Arraylist
    long startTime_al = System.nanoTime();
    array_list.add(500001); 
    long endTime_al = System.nanoTime();
    long duration_al = (endTime_al - startTime_al);

    System.out.println("Time taken by a regular arraylist: "+ duration_al + " nano seconds"); 
    System.out.println("Time taken by a CopyOnWrite arraylist: "+ duration + " nano seconds"); 

  } 
}
```

#### List the collection interfaces in Java?
Following are the collection interfaces in `java.util` which are implemented by various classes. The core collection interfaces are the foundation of the Java Collections Framework.
- `Set` A Set is a Collection that cannot contain duplicate elements. It models the mathematical set abstraction.
- `List` A List is an ordered Collection (sometimes called a sequence). Lists may contain duplicate elements.
- `Queue` Queues typically, but do not necessarily, order elements in a FIFO (first-in-first-out) manner. Among the exceptions are priority queues, which order elements according to a supplied comparator. Whatever the ordering used, elements of the queue are always removed from the head of the queue.
- `Dequeue` The name deque is short for "double ended queue" and is usually pronounced "deck". This interface defines methods to access the elements at both ends of the deque. A deque can be used both as a LIFO and FIFO structure.
- `Map` An object that maps keys to values. A map cannot contain duplicate keys; each key can map to at most one value. It replaces the abstract class `Dictionary` (now obsolete) which was part of the legacy collections.

---
## Iterating in Java
#### What is the difference between Iterator and Iterable interfaces?
The `Iterator` interface is implemented by collection classes that intend to provide a uniform way of accessing their items sequentially.
```
public interface Iterator<E> {
    boolean hasNext();
    E next(); 
    void remove();
}
```
**The `Iterable` interface on the other hand is implemented by classes that can be the target of the `foreach` statement** or in other words can produce an iterator. The `foreach` construct was introduced in Java 5 and allows for more concise code. The interface definition is given below:
```
public interface Iterable<T> {
    Iterator<T> iterator();
}
```

#### How is it possible to get `ConcurrentModificationException` exception from single threaded code?
If a collection is being iterated upon by a thread but is also mutated at the same time by another thread, the `ConcurrentModificationException` exception is thrown. Iterators exhibiting this behavior are called **fail-fast iterators** as they fail quickly and cleanly, rather that risking arbitrary, non-deterministic behavior at an undetermined time in the future. The general-purpose Collections Framework iterators are fail-fast.

In case of a single thread a sequence of method invocations that violates the contract of an object will result in this exception. For example, if a thread modifies a collection directly while it is iterating over the collection with a fail-fast iterator, the iterator will throw this exception. An example is given below:
```
import java.util.*;

class Demonstration {
    public static void main( String args[] ) {
        ArrayList<Integer> myList = new ArrayList<>();
        myList.add(1);
        myList.add(2);
        myList.add(3);

        Iterator<Integer> it = myList.iterator();

        while (it.hasNext()) {

            int item = it.next();
            if (item % 2 == 0) {
                // modify the state of the underlying collection
                myList.add(5);
            }

        }
    }
}
```
However, we can still use `remove()` method from the `Iterator` interface to remove the current element the iterator is pointing at. The above example is modified below to remove all the elements from the list.
```
import java.util.*;

class Demonstration {
    public static void main( String args[] ) {
        ArrayList<Integer> myList = new ArrayList<>();
        myList.add(1);
        myList.add(2);
        myList.add(3);

        Iterator<Integer> it = myList.iterator();

        while (it.hasNext()) {

            int item = it.next();
            it.remove();
        }

        System.out.println(myList.size());
    }
}
```

#### Imagine there's a bug in your program and a memory leak makes the size of an instance of `LinkedList` equal to three billion. What would be the return value of the `size()` method when invoked on the list?
**Answer:** 2,147,483,647

**Explanation:** The size() method return type is int which can return a maximum value of Integer.MAX_VALUE even if the size of the linkedlist is greater than two billion, one hundred and forty-seven million, four hundred and eighty-three thousand, six hundred and forty-seven. This is a design choice made by the API designers for the class.

#### What is the difference between a `LinkedHashSet` and a `HashSet`?
The difference between the two classes is the order in which the elements of the two collections can be iterated upon.

`LinkedHashSet` uses a linked list to maintain the order of insertion of key, value pairs and an iterator of the class can iterate over the (key, value) pairs in their inserted order. On the contrary, the `HashSet`'s iterator will iterate over the inserted (key, value) pairs in an arbitrary order.

#### What is the difference between `Hashtable` and `HashMap`?
The differences are:
- `Hashtable` is thread-safe and predates `HashMap`. On the other hand `HashMap` promises no thread safety.
- `Hashtable` doesn't allow null keys, whereas `HashMap` allows a single null key.
- `HashMaphas` a subclass `LinkedHashMap` which can be used to iterate over entries in the insertion order, whereas there's no such facility for the `Hashtable`.

`Hashtable` is supported but considered obsolete. If a thread-safe version of the `HashMap` is required, we can always use static methods to get synchronized wrappers using `Collections.synchronizedMap()` or use `ConcurrentHashMap` .

---
## Summary
#### Set
1. **EnumSet**	
    - An EnumSet is a specialized Set collection to work with enum classes. EnumSet should always be preferred over any other Set implementation when we are storing enum values. All of the elements in an enum set must come from a single enum type that is specified, explicitly or implicitly, when the set is created. Enum sets are represented internally as bit vectors.
    - EnumSet is a public abstract class that contains multiple static factory methods that allow us to create instances. There are two implementations:
    - **RegularEnumSet:** RegularEnumSet uses a single long to represent the bit vector. Each bit of the long element represents a value of the enum. The i-th value of the enum will be stored in the i-th bit, so it’s quite easy to know whether a value is present or not. Since long is a 64-bit data type, this implementation can store up to 64 elements.
    - **JumboEnumSet:** JumboEnumSet uses an array of long elements as a bit vector. This lets this implementation store more than 64 elements. It works pretty much like the RegularEnumSet but making some extra calculations to find the array index where the value is stored. Unsurprisingly, the first long element of the array will store the 64 first values of the enum, the second element the next 64, and so on.
```
 EnumSet<DayOfWeek> myEnumSet = EnumSet.allOf(DayOfWeek.class);
 System.out.println(myEnumSet.contains(DayOfWeek.MONDAY));
```

2. **HashSet**
    - This class implements the Set interface, backed by a hash table (actually a HashMap instance). It makes no guarantees as to the iteration order of the set; in particular, it does not guarantee that the order will remain constant over time. This class permits the null element.

3. **LinkedHashSet**
    - Hash table and linked list implementation of the Set interface, with predictable iteration order. This implementation differs from HashSet in that it maintains a doubly-linked list running through all of its entries. This linked list defines the iteration ordering, which is the order in which elements were inserted into the set (insertion-order). Note that insertion order is not affected if an element is re-inserted into the set.

4. **CopyOnWriteArraySet**
    - A Set that uses an internal CopyOnWriteArrayList for all of its operations.
    - It is thread-safe.
    - It is best suited for applications in which set sizes generally stay small, read-only operations vastly outnumber mutative operations, and you need to prevent interference among threads during traversal.
    - Mutative operations (add, set, remove, etc.) are expensive since they usually entail copying the entire underlying array. Iterators do not support the mutative remove operation.
    - Traversal via iterators is fast and cannot encounter interference from other threads. Iterators rely on unchanging snapshots of the array at the time the iterators were constructed. Additional operations are provided to take advantage of the ordering. All elements inserted into a sorted set must implement the Comparable interface

5. **SortedSet**
    - A sorted set allows iteration of its entries in ascending order.

6. **NavigableSet**
    - A SortedSet extended with navigation methods reporting closest matches for given search targets. Methods lower(), floor(), ceiling(), and higher() return elements respectively less than, less than or equal, greater than or equal, and greater than a given element, returning null if there is no such element.

7. **TreeSet**
    - The iterators returned by this class's iterator method are fail-fast. TreeSet uses a self-balancing binary search tree (RedBlack tree) as the backing data-structure. It's not thread safe and stores keys in ascending order rather than in their insertion order.
    - The elements are ordered using their natural ordering, or by a Comparator provided at set creation time. This implementation provides guaranteed log(n) time cost for add, remove and contains operations.

8. **ConcurrentSkipListSet**
    - Skiplist is a data structure used for fast search. It stores sorted list of items, very much like a binary search tree. It consists of a base list holding the elements, together with a tower of lists maintaining a linked hierarchy of subsequences, each skipping over fewer elements. The idea is simple, we create multiple layers so that we can skip some nodes. Iterators are weakly consistent, returning elements reflecting the state of the set at some point at or since the creation of the iterator.

#### Queues
1. **ArrayDeque**
    - Deque is a double-ended queue that supports addition or removal of elements from either end of the data structure. It can be used as a queue (first-in-first-out/FIFO) or as a stack (last-in-first-out/LIFO). Array deques have no capacity restrictions; they grow as necessary to support usage.

2. **PriorityQueue**
    - Priority queues are based on the heap data-structure. The elements of the priority queue are ordered according to their natural ordering, or by a Comparator provided at queue construction time. The queue can be made to behave like a max heap using the passed in comparator. The head of this queue is the least element with respect to the specified ordering. If multiple elements are tied for least value, the head is one of those elements and ties are broken arbitrarily.

3. **ConcurrentLinkedQueue**
    - An unbounded thread-safe queue based on linked nodes. This queue orders elements FIFO

4. **BlockingQueue**
    - A blocking queue is a queue that blocks when you try to dequeue from it and the queue is empty, or if you try to enqueue items to it and the queue is already full.
    - BlockingQueue implementations are designed to be used primarily for producer-consumer queues. BlockingQueue implementations are thread-safe. All queuing methods achieve their effects atomically using internal locks or other forms of concurrency control. However, the bulk Collection operations addAll, containsAll, retainAll and removeAll are not necessarily performed atomically unless specified otherwise in an implementation.

5. **PriorityBlockingQueue**
    - PriorityBlockingQueue defines an ordering on its elements in the same manner as a priority heap and additionally exposes blocking insert and retrieveal operations on the queue. It implements the BlockingQueue interface.

6. **LinkedBlockingQueue**
    - A blocking queue based on linked nodes. New elements are added at the tail.

7. **ArrayBlockingQueue**
    - A array based blocking queue. This is a classic bounded buffer, in which a fixed-sized array holds elements inserted by producers and extracted by consumers.

8. **DelayQueue**
    - A delay queue is a blocking queue with a twist that when a consumer wants to take an element off of the queue, it is only allowed to do so when the delay for that particular element has expired.

9. **SynchronousQueue**
    - The SynchronousQueue only has two supported operations: take() and put(), and both of them are blocking. For instance, when we want to add an element to the queue, we need to call the put() method. That method will block until some other thread calls the take() method, signaling that it is ready to take an element. Although the SynchronousQueue has an interface of a queue, we should think about it as an exchange point for a single element between two threads, in which one thread is handing off an element, and another thread is taking that element.

10. **BlockingDeque**
    - It is a Deque that additionally supports blocking operations that wait for the deque to become non-empty when retrieving an element, and wait for space to become available in the deque when storing an element.

#### List
1. **ArrayList**
    - This is a unsynchronized resizable array based implementation of the List interface. As elements are added to an ArrayList, its capacity grows automatically. The details of the growth policy are not specified beyond the fact that adding an element has constant amortized time cost. Iterators returned for this class are fail fast.

2. **LinkedList**
    - This is a unsynchronized doubly-linked list implementation of the Deque and List interfaces. Returned iterators for this list are fail fast.

3. **CopyOnWriteArrayList**
This is a thread-safe variant of the ArrayList. Any write operations trigger a fresh copy of the underling array to be created.

#### Map
1. **HashMap**
Unsynchronized hash table based implementation of the Map interface. This class makes no guarantees as to the order of the map; in particular, it does not guarantee that the order will remain constant over time.

2. **LinkedHashMap**
Hash table and linked list implementation of the Map interface, with predictable iteration order. This implementation differs from HashMap in that it maintains a doubly-linked list running through all of its entries. This linked list defines the iteration ordering, which is normally the order in which keys were inserted into the map

3. **WeakHashMap**
4. **IdentityHashMap**
    - This class implements the Map interface with a hash table, using reference-equality in place of object-equality when comparing keys (and values). In other words, in an IdentityHashMap, two keys k1 and k2 are considered equal if and only if (k1==k2). (In normal Map implementations (like HashMap) two keys k1 and k2 are considered equal if and only if (k1==null ? k2==null : k1.equals(k2)).). This class is not a general-purpose Map implementation! While this class implements the Map interface, it intentionally violates Map's general contract, which mandates the use of the equals() method when comparing objects. This class is designed for use only in the rare cases wherein reference-equality semantics are required. Iterators returned for this class are failfast.

5. **EnumMap**
    - A specialized unsynchronized Map implementation for use with enum type keys. All of the keys in an enum map must come from a single enum type that is specified, explicitly or implicitly, when the map is created. Enum maps are represented internally as arrays. This representation is extremely compact and efficient. Iterators returned for this class are weakly consistent i.e. they may or may not show the effects of any modifications to the map that occur while the iteration is in progress. Keys appear in the map in the order in which the enum constants are declared.

6. **SortedMap**
    - A Map that further provides a total ordering on its keys. The map is ordered according to the natural ordering of its keys, or by a Comparator typically provided at sorted map creation time. This order is reflected when iterating over the sorted map's collection views. All keys inserted into a sorted map must implement the Comparable interface.

7. **NavigableMap**
    - A SortedMap extended with navigation methods returning the closest matches for given search targets. Methods lowerEntry, floorEntry, ceilingEntry, and higherEntry return Map.Entry objects associated with keys respectively less than, less than or equal, greater than or equal, and greater than a given key, returning null if there is no such key. A NavigableMap may be accessed and traversed in either ascending or descending key order.

8. **TreeMap**
    - A Red-Black tree based unsynchronized NavigableMap implementation. This implementation provides guaranteed log(n) time cost for the containsKey, get, put and remove operations. The map is sorted according to the natural ordering of its keys, or by a Comparator provided at map creation time, depending on which constructor is used.

9. **ConcurrentHashMap**
    - A hash table supporting full concurrency of retrievals and high expected concurrency for updates. This class obeys the same functional specification as Hashtable, and includes versions of methods corresponding to each method of Hashtable. However, even though all operations are thread-safe, retrieval operations do not entail locking, and there is notany support for locking the entire table in a way that prevents all access. This class is fully interoperable with Hashtable in programs that rely on its thread safety but not on its synchronization details.

10. **ConcurrentNavigableMap**
    - A ConcurrentMap supporting NavigableMap operations, and recursively so for its navigable sub-maps.

11. **ConcurrentSkipListMap**
    - A ConcurrentSkipListMap stores the Map in the natural order of its keys (or some other key order you define). So it'll have slower get/put/contains operations than a HashMap, but to offset this it supports the SortedMap and NavigableMap interfaces.









---