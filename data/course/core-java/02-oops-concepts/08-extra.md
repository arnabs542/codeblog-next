---
title: 'Extra'
type: 'topic'
section: 'OOPS Concepts'
course: 'Core Java'
tags:
- java
---
#### Static Members
- Static members are shared class-wide. It is not associated with an individual instance.
- It is declared using `static` keyword.

##### Static field
- A value not associated with a specific instance. All instances access the same value.

##### Static method
- Performs an action not tied to a specific instance.
- It can access static fields only.
```java
class Flight {
  static int allPassengers;
  static int getAllPassengers();
  //..
}
Flight.getAllPassengers();
```

##### Static import
- It provides short hand for accessing static members.
```java
import static com.simplifycodes.travel.Flight.getAllPassengers;
getAllPassengers();
```

##### Static initialization blocks
- It performs one-time type initialization and it is executed automatically before type's first use.
- It cannot access instance members.
- Since it is executed automatically, we have to handle any checked exceptions within block.
```java
static {
  //...
}
```

---
#### Nested Types
- A nested type is a type declared within another type.
- Classes can be declared within other classes or interfaces.
- Interfaces can be declared within other classes or interfaces.
- Nested types are members of the enclosing type.
- It supports all access modifiers - public, private, protected, default.

---
#### Inner Class
- Non-static classes nested within classes.

---
#### Anonymous class
- It is declared as part of their creating.
- It is useful for simple interface implementations or class extensions.
- Anonymous classes are inner classes. They have access to instance members of enclosing class.
```java
//
```

---