---
title: 'Composite Pattern'
type: 'topic'
section: '03 Structural Patterns'
course: 'Design Patterns'
tags:
- Design Patterns
---
#### Concept
- It is a hierarchical, tight pattern that deals with tree structures of information.
- It is meant to treat components the same, whether it is part of your structure or the whole structure itself.
- It is done by composing objects into tree structures.
- Same operations can be applied on individual and composite components.

##### Examples:
1. java.awt.Component
2. JSF widgets
3. RESTful api GETs
4. Map collection

---
#### Design
- It is tree structured
- The root of the tree starts with a component.
- A component can be either a leaf or a composite of objects.
- Leaf has only operations, whereas composite has both operations and child components.

---
#### Implementations

---
#### Pitfalls
1. It can overly simplify system
2. Difficult to resist
3. Implementation can be costly

---
#### Contrast to other Patterns

|Composite   |Decorator   |
|---|---|
|Tree structure   |Contains another entity   |
|Leaf and composite have same interface   |Modifies behavior   |
|Unity between objects   |Doesn't change underlying object   |

---