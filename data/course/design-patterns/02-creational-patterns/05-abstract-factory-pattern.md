---
title: 'AbstractFactory Pattern'
type: 'topic'
section: '02 Creational Patterns'
course: 'Design Patterns'
tags:
- Design Patterns
---
#### Concept
- It is a factory of factory patterns, although it can be implemented without using the factory method pattern.
- It is a factory of related objects.
- It uses common interface, which is implemented throughout the AbstractFactory and its underlying factories.
- Just like Factory method pattern, it is deferring the instantiation or creation logic to subclasses as well
- It is often implemented in frameworks and not in Java APIs.

##### Examples:
1. DocumentBuilder from XML APIs
2. Frameworks 

---
#### Design
- It groups factories together.
- Factory is still responsible for lifecycle.
- It has a common interface that is carried throughout the AbstractFactory.
- There are concrete class that are finally returned form the underlying factory.
- The Abstract Factory also has a parameterized create methods just like factory method pattern.
- The Abstract Factory is typically built using composition, which is not the case with factory method pattern.

---
#### Implementations


---
#### Pitfalls
- Most complex creational pattern
- Runtime switch
- Pattern within a pattern
- Problem specific
- Starts as a factory and then refactored to an AbstractFactory

---
#### Contrast to other Patterns

|AbstractFactory   |Factory   |
|---|---|
|returns various instances   |It has all features of factory with some additions   |
|Multiple constructors   |Implemented with a factory   |
|Interface driven   |Hides the factory   |
|Easily adaptable to environment |Abstracts environment |
| |Built through composition |

---