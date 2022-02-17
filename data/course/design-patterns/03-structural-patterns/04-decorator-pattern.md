---
title: 'Decorator Pattern'
type: 'topic'
section: '03 Structural Patterns'
course: 'Design Patterns'
tags:
- Design Patterns
---
#### Concept
- It a hierarchical type pattern that builds functionality at each level while using composition from similar data types.
- It is used when we want to wrap another object.
- To add functionality to it, we can add behavior to an object without affecting other parts of the hierarchy.
- Decorator also handles single responsibility principle.
- We can compose behavior dynamically by using subclasses that decorate the object.

##### Examples:
1. java.io.InputStream
2. java.util.Collections#checkedList
3. UI Components in swing

---
#### Design
- It used inheritance and compostion.
- There is a common component, but functionality is added in the sub-components.
- Constructor requires an instance of the components from the hierarchy, which enables it to build upon that and use composition rather than inheritance to override which individual fields that it wants to.

---
#### Implementations

---
#### Pitfalls
1. New class for every feature added.
2. Multiple little objects.
3. Often confused with simple inheritance.

---
#### Contrast to other Patterns

|Decorator   |Composite   |
|---|---|
same as last comparison

---