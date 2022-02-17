---
title: 'Facade Pattern'
type: 'topic'
section: '03 Structural Patterns'
course: 'Design Patterns'
tags:
- Design Patterns
---
#### Concept
- It provides a simplified interface to a complex or difficult to use system that is often the result of a poorly designed API.
- It is used to make an API easy to use.
- It also helps to reduce dependencies on outside code.
- It will simplify the interface or client usage.
- It is usually used as a refactoring pattern

##### Examples:
1. java.net.URL
2. javax.faces.context.FacesContext

---
#### Design
- It is a class that utilizes just composition in its design.
- It should not have need of inheritance.
- It typically encompasses full lifecycle.

---
#### Implementations

---
#### Pitfalls
1. Typically used to clean up code
2. Should think about API design
3. It deals with flat problem/structure
4. It is very easily used.

---
#### Contrast to other Patterns

|Facade   |Adapter   |
|---|---|
|Simplifies interface   |Also a refactoring pattern   |
|Works with composites   |Modifies behavior   |
|Cleaner API   |Provides a different interface   |

---