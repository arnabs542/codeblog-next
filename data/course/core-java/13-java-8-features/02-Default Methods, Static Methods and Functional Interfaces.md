---
title: 'Default & Static Methods and Functional Interfaces'
type: 'topic'
section: 'Java 8 Features'
course: 'Core Java'
tags:
- java
---
## Default Methods
- Default methods are methods in interfaces that can have a body.
- The most important use of default methods in interfaces is to provide additional functionality to a given type without breaking down the implementing classes.

#### Uses of Default Methods
1. Before Java 8, if a new method was introduced in an interface then all the implementing classes used to break. We would need to provide the implementation of that method in all the implementing classes.
2. However, sometimes methods have only single implementation and there is no need to provide their implementation in each class. In that case, we can declare that method as a default in the interface and provide its implementation in the interface itself.

#### Syntax of default methods
```java
public interface Vehicle {
    void cleanVehicle();
    default void startVehicle() {
        System.out.println("Vehicle is starting");
    }
}
```
```java
public class Car implements Vehicle {
    @Override
    public void cleanVehicle() {
        System.out.println("Cleaning the vehicle");
    }

    public static void main(String args[]){
        Car car = new Car();
        car.cleanVehicle();
        car.startVehicle();
    }
}
```

#### Issues raised due to default method
Let’s look at an example. Here, we have two interfaces with a default method of the same name, i.e., `printSomething()`.
```java
public interface InterfaceA {
    default void printSomething() {
        System.out.println("I am inside A interface");
    }
}
```
```java
public interface InterfaceB {
    default void printSomething() {
        System.out.println("I am inside B interface");
    }
}
```
Now we will define a Main class that will implement both these interfaces.
- Do we need to implement the `printSomething()` method in the `Main` class? Will the class compile if we don’t?
- If some class calls the `printSomething()` method from the object of `Main` class then which implementation will be called? Will it call the method defined in interfaceA or interfaceB?

```java
public class Main implements InterfaceA, InterfaceB {

}
```
The above class will not compile because of the **Diamond problem** in Java. To resolve the compilation issue, we will have to implement the printSomething() method as shown below:
```java
public class Main implements InterfaceA, InterfaceB {
    @Override
    public void printSomething() {
        //Option 1 -> Provide our own implementation.
        System.out.println("I am inside Main class");
        //Option 2 -> Use existing implementation from interfaceA or interfaceB or both.
        InterfaceA.super.printSomething();
        InterfaceB.super.printSomething();
    }

    public static void main(String args[]){
         Main main = new Main();
         main.printSomething();
    }
}
```

---
## Static Methods
The static methods in interfaces are similar to default methods but the only difference is that you can’t override them.

##### why do we need static methods in interfaces if we already have default methods?
Suppose you want to provide some implementation in your interface and you don’t want this implementation to be overridden in the implementing class, then you can declare the method as static.
```java
public interface Vehicle {
    static void cleanVehicle(){
        System.out.println("I am cleaning vehicle");
    }
}
```
```java
public class Car implements Vehicle {
    @Override
    public void cleanVehicle() {
        System.out.println("Cleaning the vehicle");
    }
    public static void main(String args[]) {
        Car car = new Car();
        car.cleanVehicle();
    }
}
```
In the above interface, we get a compilation error in the Car class because a static method cannot be overridden. 
```java
public class Car implements Vehicle {
    public static void main(String args[]){
        Car car = new Car();
        car.cleanVehicle();  //This will not compile.       
    }
}
```
Also, since a static method is hidden, we can’t call it from the object of the implementing class.
```java
public class Car implements Vehicle {
    
    public static void main(String args[]){
        Car car = new Car();
        
        Vehicle.cleanVehicle(); //This will compile.
    }
}
```
The above class will compile because we are calling the static method that is defined in the interface from the interface reference.

---
## Functional Interfaces
- An interface that has a single abstract method is called a **functional interface**.
- While an interface **can have one or more default methods**, it **should have only one abstract method** to be called a functional interface.
- The functional interface is used by lambda expressions.

Java 8 has defined the `java.util.function` package, containing lots of functional interfaces. Some of the functional interfaces defined in Java 8 are `Predicate`, `Consumer`, `Supplier`, `Function`, etc.

#### What is `@FunctionalInterface` annotation?
- Any interface that has only one abstract method can be annotated with the `@FunctionalInterface` annotation.
- This is not mandatory but if an interface is annotated with `@FunctionalInterface` annotation and someone tries to add another abstract method to the, the compiler will throw an error.
- If an interface is annotated with `@FunctionalInterface` annotation but does not contain even a single abstract method, then the compiler also complains.

---