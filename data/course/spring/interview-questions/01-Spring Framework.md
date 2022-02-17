---
title: Spring Interview Questions
type: topic
section: Interview Questions
course: Spring
tags:
- Java
---
###### Features of Spring Framework?
- Allows creating and managing the configuration and lifecycle of application objects
- AOP (Aspect Oriented Programming) provides support for unified development by separating application business logic from system services
- Highly configurable MVC web application framework with the ability to easily switch to other frameworks
- Instead of looking for or creating dependent objects, the objects give their dependencies. This design principle is known as IoC (Inversion of Control)
- Lightweight
- Offers a generic abstraction layer for transaction management that can also be used in container-less environments
- The JDBC abstraction layer offers an exception hierarchy that simplifies error handling

###### Advantages of Spring Framework?
- Enables POJO (Plain Old Java Object) Programming that further enables continuous integration and testability
- Open-source with no vendor lock-in
- Simplified JDBC because of DI (Dependency Injection) and Inversion of Control
- Thanks to the layered architecture, it’s easy to keep what you want and discard what you don’t

###### What is Tight Coupling and Loose Coupling?
When a class (ClassA) is dependent on another class’s object (ClassB), then we say ClassA is "tightly" Coupled with ClassB. Spring helps us to create classes in a way that Tight Coupling can be removed and Loose Coupling can be done.

Loose Coupling removes the dependency of an object (ClassB) on a class (ClassA). Loose Coupling is approached by creating an interface and a setter & getter method, or by using a constructor which takes the interface object.

###### What are Beans in Spring?
When a class is annotated or decorated using the `@Component`, such a class is called a **Bean** in Spring. Beans are maintained by Application Context.

###### What is the importance of the annotation @Primary
This annotation is used on a class that needs to be taken by spring on a primary basis. For instance, if ClassX is `@Component` annotated and is dependent on both Class1 and Class2 (both `@Component` annotated) then the compiler would report an error. To show the primary class between Class1 and Class2 we use `@Primary`.

###### What is Dependency Injection?
Dependency Injection is the process where Spring framework looks for the beans and identifies the dependencies, and creates the instances of beans and autowires them.

###### What do you understand by the Spring IoC Container? Explain their types.
The Spring IoC container lies at the core of the Spring Framework. The container uses Dependency Injection for managing various Spring application components.

The IoC container is responsible for creating the objects, configuring them, wiring them together, and managing their lifecycle. The container receives instructions about the same from the provided configuration metadata.

Means for providing the configuration metadata can include Java annotations, Java code, or XML. There are two types of IoC containers in Spring:
- **ApplicationContext** – Provides additional functionality. It is built on top of the BeanFactory interface.
- **BeanFactory** – A prepackaged class containing a collection of beans. Instantiates the bean whenever as required by the clients

###### Please explain the Dependency Injection in Spring. In how many ways can the same be used?
Instead of creating objects directly, Dependency Injection allows defining how objects should be created. As such, the code doesn’t directly contain connecting components and services together.

The configuration file has the information on which services are needed by which components. The IoC container is responsible for connecting components with the appropriate services. Dependency Injection can be used in the following forms:
- Construction Injection
- Setter Injection



---