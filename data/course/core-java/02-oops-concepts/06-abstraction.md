---
title: 'Abstraction'
type: 'topic'
section: 'OOPS Concepts'
course: 'Core Java'
tags:
- java
---
#### Abstraction


---
#### Interface
- An interface is a type that defines a contract.
- It provides no implementation.
- **classes implement interfaces** means the class conforms to the contract, without limiting other aspects of the class implementation.
- A class can implement multiple interfaces.
- eg, Comparable

##### Declaring Interface
```java
public interface Comparable<T> {
  int compareTo(T o);
}
```

##### Implementing Interface
```java
public class Passenger implements Comparable<Flight> {
  public int compareTo(Flight f) {  }
}
```

##### Implementing Multiple Interface
```java
public class Passenger implements Comparable<Flight>, Iterable<Person> {
  public int compareTo(Flight f) {  }
  public Iterator<Person> iterator() {  }
}
```

---
#### Abstract class


---