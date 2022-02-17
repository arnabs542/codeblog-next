---
title: 'Stream API'
type: 'topic'
section: 'Java 8 Features'
course: 'Core Java'
tags:
- java
---
## Stream
- A Stream in Java can be defined as a sequence of elements from a source that supports aggregate operations on them.
- The source here refers to collections or arrays that provide data to a stream.

#### Important Points:
1. A stream is not a data structure itself. It is a bunch of operations applied to a source. The source can be collections, arrays or I/O channels.
1. Streams don’t change the original data structure.
1. There can be zero or more intermediate operations that transform a stream into another stream.
1. Each intermediate operation is **lazily executed**.
1. Terminal operations produce the result of the stream.

#### Stream creation
Streams can be created from different element sources, e.g., a collection or an array with the help of `stream()` and `of()` methods.
##### 1. `Stream.of(v1, v2, v3….)`
```java
import java.util.stream.Stream;

public class StreamDemo {
    public static void main(String[] args) {
        Stream<Integer> stream = Stream.of(1,2,3,4,5,6,7,8,9);
        stream.forEach(p -> System.out.println(p));
    }
}
```

##### 2. `List.stream()`
```java
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

public class StreamDemo {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>();
        list.add("a");
        list.add("b");
        list.add("c");
        list.add("d");

        Stream<String> stream = list.stream();
        stream.forEach(p -> System.out.println(p));
    }
}
```

#### The Stream interfaces
- The Stream API defines a few interfaces such as `Stream`, `IntStream`, `LongStream`, etc.
- The Stream<T> interface is for object elements. For primitives, it defines IntStream, LongStream and DoubleStream interfaces.

> It is a good practice to use primitive streams if you are dealing with primitives because wrapping primitives to objects and auto-boxing is a costly process.

The methods defined by these interfaces can be divided into the following two categories:

##### Intermediate operations
These methods do not produce any results. They usually accept functional interfaces as parameters and always return a new stream. Some examples of intermediate operations are filter(), map(), etc.

##### Terminal operations
These methods produce some results, e.g., `count()`, `toArray(..)`, and `collect(..)`.

The streams operations can be further classified as:
1. filtering
1. slicing
1. mapping
1. matching and finding
1. reduction
1. collect

---
## Filtering Operations in Stream
#### `filter()` method



















