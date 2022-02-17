---
title: 'Factory Pattern'
type: 'topic'
section: '02 Creational Patterns'
course: 'Design Patterns'
tags:
- Design Patterns
---
#### Concept
- It is opposite to Singleton pattern and probably is the second most used creational pattern.
- It doesn't expose instantiation logic. Client knows nothing about even the type of object that is being created.
- It is able to do this by diferring the instantiation or a creation logic to the subclass.
- All the clients knows about a common interface that the factory exposes.
- Factories are often implemented by an architecture or a framework and implemented by the user of that framework.
- This establishes a contract for how things will be implemented within the framework, but allowing flexibility for the end user to define how it can be implemented.

##### Examples:
1. Calendar
2. ResourceBundle
3. NumberFormat

---
#### Design
- Factory is responsible for creating instances and managing the lifecycle, at least the creation part of the lifecycle.
- Objects created are referenced through a common interface.
- Factories will also reference multiple concrete classes or implementations, but the client is unaware since they are referenced through the common interface.
- The method to request an object is typically parameterized. These parameters are used to determine the concrete type.

---
#### Implementations


---
#### Pitfalls
1. Complexity
2. Creation takes place in subclass
3. Refactoring is difficult

---
#### Contrast to other Patterns

|Factory   |Singleton   |
|---|---|
|Returns same instance   |Returns various instances   |
|One constructor with no args   |Multiple constructors   |
|No interface   |Interface/ abstract class driven   |
|No subclass |Subclasses involved |
| |Easily adaptable to environment |

---