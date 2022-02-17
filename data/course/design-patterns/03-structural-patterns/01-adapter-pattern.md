---
title: 'Adapter Pattern'
type: 'topic'
section: '03 Structural Patterns'
course: 'Design Patterns'
tags:
- Design Patterns
---
#### Concept
- It is great pattern for connecting new code to legacy code without having to change the working contract that was produced from the Legacy code originally.

##### Examples
- Collections API: Arrays -> Lists
- Stream classes

---
#### Design
- It is used when want to convert interface into another interface
- Translates requests
- Client, Adapter, Adaptee

---
#### Implementations
- Adapter is very client centric.
- It is typically implemented to adapt or integrate a new client to legacy components
- Often it is implemented to an interface, but not compulsory. It can just be a new class.

---
#### Pitfalls
1. Don't complicate
2. Multiple adapters
3. Don't add functionality to legacy

---
#### Contrast to other Patterns

|Adapter   |Bridge   |
|---|---|
|Works after code is designed   |Designed upfront   |
|It deals with legacy code   |Abstraction and implementation vary   |
|Retrofitted   |Built in advance   |
|Provides different interface |Both adapt multiple systems |

---