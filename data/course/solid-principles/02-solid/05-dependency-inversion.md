---
title: 'Dependency Inversion Principle'
type: 'topic'
section: '02 SOLID'
course: 'SOLID Principles'
tags:
- design
- system design
- solid principles
---
#### DIP: Dependency inversion principle
- High level modules should not depend on low level modules, both should depend on abstraction.
- Abstraction should not depend on details. Details should depend on abstraction.
- Entities should depend only on abstractions but not on concretions. 
- It is the most important principle in OOP and it enables us to create systems that are loosely coupled, easy to change and maintain.
	
> eg, You go to a local store to buy something, and you decide to pay for it by using your debit card. So, when you give your card to the clerk for making the payment, the clerk doesn’t bother to check what kind of card you have given. Even if you have given a Visa card, he will not put out a Visa machine for swiping your card. The type of credit card or debit card that you have for paying does not even matter; they will simply swipe it. So, in this example, you can see that both you and the clerk are dependent on the credit card abstraction and you are not worried about the specifics of the card. This is what a dependency inversion principle is.

##### High Level Modules
- Modules written to solve real problems and use cases.
- They are the part of our application that bring real value.
- They are more abstract in nature and map to the business domain (Business Logic).
- They tell us what the software should do, not how it should do.

##### Low Level Modules
- They contain implementation details that are required to execute the business policies.
- Since High level modules are more abstract in nature, we will need some concrete features that help us to get our business implementation ready.
- They are considered the `plumbing` or `internals` of an application.
- They tell us how the software should do various tasks.
- eg, logging, data access, network communication, IO, etc.

> High Level Modules and Low Level Modules are relative concepts.
> ```Payment > Notification System > Email Service```

##### Abstraction
- Abstraction is something that is not concrete.
- Something that you cannot "new" up.
- In Java applications, we tend to model abstractions using interfaces and abstract classes.

> **Wrong:** `High Level` -> `Low Level`

> **Right:** `High Level` -> `Abstraction` <- `Low Level`

#### Dependency Injection (DI)
- It is very used in conjunction with the DIP, however they are not same thing.
- It is a technique that allows to create dependent objects outside of a class and provides those objects to a class.
- Methods to do this:
	- Using public setters to set those dependencies. It is not a good approach as it might leave objects an uninitialized state.
	- Declare all the dependencies in the component's constructor. (DI)

#### Inversion Of Control (IoC)
- It is a design principle in which the control of object creation, configuration, and lifecycle is passed to a container or framework.
- It helps us create large systems by taking away the responsibility of creating objects.
- The control of creating and managing objects is inversed from the programmer to this container (called IoC or DI container).
- It makes send to use it for some objects in an application (services, data access, controller).
- For entities, data transfer objects, or value objects it doesn't make sense to use an IoC. We can simply "new" up those objects.

##### Benefits of using IoC
1. Makes it easy to switch between different implementations at runtime.
2. Increased program modularity.
3. Manages the lifecycle of objects and their configuration.

> Spring is the most popular Java framework. At the core of spring framework is the Spring IoC container. 

##### Spring Beans
 - Objects used by your application and that are managed by the Spring IoC container. They are created with the configuration that you supply to the container.

 > DIP, DI and IoC are not the same thing. They are very effective when work together to eliminate coupling.

 > "**New is Glue**" - Steve Smith (Ardalis)