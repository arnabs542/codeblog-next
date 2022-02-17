---
title: 'Flyweight Pattern'
type: 'topic'
section: '03 Structural Patterns'
course: 'Design Patterns'
tags:
- Design Patterns
---
#### Concept
- It minimizes memory used by sharing data with similarly type objects.
- It is used when we want to make more efficient use of memory.
- It is an optimization pattern.
- It is specially used for object that are stateless or immutable in nature.

##### Examples:
1. java.lang.String
2. java.lang.Integer#valueOf(int)
3. Boolean, Byte, Character, Short, Long

---
#### Design
- It is a pattern of patterns
- It uses a factory pattern to retrieve flyway objects after they have been created.
- Flyweight also often encompasses both the creation and structure of the object as far as the patterns concerned.
- It has a creational pattern inside of a structural pattern.

---
#### Implementations

---
#### Pitfalls
1. It is a complex pattern
2. Premature optimization
3. Must understand factory
4. It is not a graphical pattern

---
#### Contrast to other Patterns

|Flyweight   |Facade   |
|---|---|
|Memory optimization   |Refactoring pattern   |
|Optimization pattern   |Simplified client   |
|Immutable objects   |Provides a different interface   |

---