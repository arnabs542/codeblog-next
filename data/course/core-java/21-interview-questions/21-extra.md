---
title: Extra
type: 'topic'
section: 'Interview Questions'
course: 'Core Java'
tags:
- java
---
##### Difference between final, finally and finalize in Java?
In Java, the words final, finally, and finalize are quite different from each other.

**`final`:** final is a keyword that is used to apply restrictions on a class, method, or variable.
- The class with this keyword cannot be inherited.
- The method with this keyword cannot be overridden.
- The variable with this keyword cannot be changed.

**`finally`:** In Java, finally is a block used to place important code that will be executed whether or not an exception is handled.

**`finalize`:** finalize() is used to perform clean-up processing just before the object is collected by the garbage collector. In Java, the finalize method in a class is used for freeing up the heap’s memory, just like destructors in C++.

##### Comparable vs Comparator in Java?
Java provides two interfaces to sort objects using data members of the class:
1. Comparable
2. Comparator

A comparable object is capable of comparing itself with another object. The class itself must implements the java.lang.Comparable interface to compare its instances.
When we make a collection element comparable(by having it implement Comparable), we get only one chance to implement the compareTo() method. 

Unlike Comparable, Comparator is external to the element type we are comparing. It’s a separate class. We create multiple separate classes (that implement Comparator) to compare by different members.
Collections class has a second sort() method and it takes Comparator. The sort() method invokes the compare() to sort objects.

Comparable is meant for objects with natural ordering which means the object itself must know how it is to be ordered. For example Roll Numbers of students. Whereas, Comparator interface sorting is done through a separate class.


---