---
title: 'Builder Pattern'
type: 'topic'
section: '02 Creational Patterns'
course: 'Design Patterns'
tags:
- Design Patterns
---
#### Concept
- It is a great pattern for handling the construction of objects that may contain a lot of parameters, and we want to make the object immutable once it is created.

##### When to use 
- handles complex constructors
- Large number of arguments
- Immutability can be forced on created object

##### Examples
- StringBuilder
- DocumentBuilder
- Locale.Builder

---
#### Design
- It solves a very common problem in object oriented programming and that is determining what constructor to use.
- People often create multiple constructors which is difficult to manage. Creation of multiple constructors with each parameter variation is called a `telescoping constructor`.
- Builder pattern helps us overcome this by handling the construction with an object and rather than by parameters.
- The Builder is typically written with a static inner class, because it returns an instance of the object that is building.

---
#### Implementations


---
#### Pitfalls
1. Immutable
2. Inner static class
3. Designed first
4. Complexity

---
#### Contrast to other Patterns

|Builder   |Prototype   |
|---|---|
|Handles complex constructors   |Implemented around a clone method   |
|No interface required   |Avoids calling complex constructors   |
|It can be a separate class   |Difficult to implement in legacy code   |
|Works with legacy code | |

---