---
title: 'Bridge Pattern'
type: 'topic'
section: '03 Structural Patterns'
course: 'Design Patterns'
tags:
- Design Patterns
---
#### Concept
- Bridge works with new code.
- It is used to decouple abstraction and implementation.
- To achieve this, it uses encapsulation, composition, inheritance.
- Key concept is changes in the abstraction won't affect the client. Client is unaware of the abstraction.
- This decouples the implementation from the contract or interface that the client is using.

##### Examples:
1. Drivers
2. JDBC

---
#### Design
- Bridge pattern emphasises more on composition that inheritance.
- Your application is designed to expect changes from both sides.

---
#### Implementations

---
#### Pitfalls
1. Increase complexity
2. Conceptually difficult to plan
3. More than just object oriented principles
4. Little confusing sometimes


---
#### Contrast to other Patterns

|Bridge   |Adapter   |
|---|---|
|Design upfront   |Works after code is designed   |
|Abstraction and implementation vary   |Intended for Legacy aaplication  |
|Built in advance   |Retrofitted   |
|Complex |Provides different interface |

---