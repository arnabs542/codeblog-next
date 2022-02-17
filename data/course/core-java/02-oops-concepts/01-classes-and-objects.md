---
title: Classes and Objects
type: topic
section: OOPS Concepts
course: Core Java
tags:
- java
---
#### Object
- Any entity that has state and behavior is known as an object. It can be physical and logical.
- Objects encapsulates data, operations and usage semantics.
- It allows storage and manipulation details to be hidden.
- `new` keyword is used to allocate memory at run time. All objects get memory in Heap memory area.
- An object has three characteristics:
  1. **state**: represents data (value) of an object.
	2. **behavior**: represents the behavior (functionality) of an object such as deposit, withdraw etc.
	3. **identity**: Object identity is typically implemented via a unique ID. The value of the ID is not visible to the external user. But, it is used internally by the JVM

---
#### Class
- A class is a template for creating objects. It provides a structure for describing and creating objects.
- It is a logical entity.
- It is made up of both state and executable code.
  - **Fields** store object state
  - **Methods** are executable code that manipulates state and perform operations.
  - **Constructors** are special executable code that gets run during creation of an object. It is normally used to initialize state.
- 
```
Account a = new Account();
```
##### Naming classes
- Use only letters and numbers
- First character is always letter
- Follows `PascalCase` style

---
#### Method
- Executable code that manipulates state and performs operations.
- **Name:** should be verb or action
- **Return Type:** It has a return type, which is void in case of no value returned.
- **Typed Parameter List:** It has a list of typed parameters which is passed to it when calling.
- **Body:** It is contained within brackets containing the main logic.

##### Exiting from a Method
1. The end of the method is reached
2. A return statement is encountered
3. An error/exception occurs

##### Method return values
1. a primitive value
2. a reference to an object

---
#### Special References `this` and `null`
##### 1. `this`
- It is an implicit reference to the current object.
- It reduces ambiguity.
- It allows an object to pass itself as a parameter.

##### 2. `null`
- It is a reference literal.
- It represents an uncreated object.
- It can be assigned to any reference variable.

##### 3. `super`
- Similar to `this`, `super` is an implicit reference to current class. But, it treats the object as if it is an instance of its base class.
- It is useful for accessing base class members that have been overridden.

---
#### Class Initializers
##### 1. Field Initializers
- Fields recieve a **zero** value by default.
- We can specify a field's initial value as part of its declaration
  - can be simple assignment
  - can be a equation
  - can be reference to other fields

```java
public class Earth {
  long circumferenceInMiles = 24901;
  long circumferenceInKms = Math.round((long)(circumferenceInMiles * 1.6d));
}
```

##### 2. Constructors
- Executable code used during object creation to set initial state.
- It has no return type. 
- Every class has at least one constructor, and can also have multiple constructors each with a different parameter list.

**Constructors Chaining**
- A constructor can call other constructor using `this` keyword followed by parameter list.
- Call to other constructor must be the first line in the constructor.

```java
public class User {
  //fields
  public User() {}
  
  public User(int name) {
    this.name = name;
  }

  public User(String name, int age) {
    this(name);
    this.age = age;
  }
}
```

**Constructors Visibility**
- Access modifiers can be used to control constructor visibility.

##### 3. InitializationBlock
- They allow us to create code that is shared across all our constructors.
- They are executed as if the code were placed at the start of each constructor.
```java
public class User {
  //fields
  {
    ...
  }

  public User() {}
  
  public User(int name) {
    this.name = name;
  }
}
```

---
#### Method Parameters
- In Java, parameters are passed By-Value, means a copy it is passed by making a copy of the value.
- Changes made to passed value, are not visible outside of method.
- In case of primitive types
```java
int x = 10;
int y = 20;
//print x and y (x = 10, y = 20)
swap(x, y);
//print x and y (x = 10, y = 20)
void swap(int a, int b) {
  int k = a;
  a = b;
  b = k;
  // print a and b (a = 20, b = 10)
}
```

- In case of objects, we pass reference to the object
```java
Flight x = new Flight(10);
Flight y = new Flight(20);
//print x and y (x = 10, y = 20)
swap(x, y);
//print x and y (x = 10, y = 20)
void swap(Flight a, Flight b) {
  Flight k = a;
  a = b;
  b = k;
  // print a and b (a = 20, b = 10)
}
```
- Changes made to members of passed class instances are visible outside of method, and can be modified.
```java
Flight x = new Flight(10);
Flight y = new Flight(20);
//print x and y (x = 10, y = 20)
swap(x, y);
//print x and y (x = 20, y = 10)
void swap(Flight a, Flight b) {
  int k = a.getFlightNumber();
  a.setFlightNumber(b.getFlightNumber());
  b.setFlightNumber(k);
  // print a and b (a = 20, b = 10)
}
```

---
#### Object Class
- It is the root of the Java class hierarchy.
- Every class inherits directly or indirectly from the Object class.
- Every class has the characteristics of Object class.
- It is useful for declaring variables, fields and parameters that can reference any class or array instance.
- It defines a number of methods that are inherited by all objects.

##### Object class methods
1. `clone()`
2. `hashCode()`
3. `getClass()`
4. `finalize()`
5. `toString()`
6. `equals()`



