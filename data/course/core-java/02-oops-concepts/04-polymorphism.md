---
title: 'Polymorphism'
type: 'topic'
section: 'OOPS Concepts'
course: 'Core Java'
tags:
- java
---
#### Polymorphism
- A class may have multiple versions of its constructor or methods.
- The ability to use an operator or function in different ways is called polymorphism.
- we use method overloading and method overriding to achieve polymorphism.

##### Overloading
- Each constructor and method must have a unique signature.
- **Signature:** Number of parameters, Type of parameter, name

**Variable number of parameter**
- A method can be declared to accept a varying number of parameter values by passing a list and placing `...` after parameter type.
- Parameter list can only be last parameter.
- Method receives value as an array.
```java
public void addPassengers(Passenger... list) {
  if(hasSeating(list.length)) {
    passengers += list.length;
    for(Passenger p : list) {
      totalCheckedBags += p.getCheckedBags();
    }
  } else {
    handleTooMany();
  }
}
```

---
##### Overriding
- 


---
#### Inheritance and Constructors
- Constructors are not inherited
- A base class constructor must always be called.
- By default, base class's no-argument constructor is called.
- But we can explicitly call a base class constructor using `super` followed by parameter list. It must be first line of constructor.

---
#### Controlling Inheritance
##### `final` keyword
- use `final` to prevent inheriting or overriding.

##### `abstract` keyword
- use `abstract` to require inheriting or overriding.

##### `final` fields
- Making a field as `final` prevents it from being changed once assigned
- there are 2 types of final fields
  1. A simple final field must be set during creation of a object instance. It must be set with field initializer, constructor or initialization block.
  ```java
  private final int maxSeats;
  ```
  2. A static final field by adding static modifier makes a final field a named constant. It cannot be set by an object instance.
  ```java
  static final int MAX_SEATS = 500;
  ```

##### Enumeration Types
- It is useful for defining a type with a finite list of valid values.

```java
public enum FlightCrewJob {
  Pilot,
  CoPilot,
  FlightAttendant,
  AirMarshal
}
```

---
