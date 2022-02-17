---
title: 'Prototype Pattern'
type: 'topic'
section: '02 Creational Patterns'
course: 'Design Patterns'
tags:
- Design Patterns
---
#### Concept
- Prototype pattern is used when the type of object to create is detemined by a protypical instance, which is cloned to produce a new instance.
- It is used to get a unique instance of the same object.
- It is used when we are trying to avoid a costly creation.
- It avoids subclassing.
- It doesn't use keyword `new`. First instance created might use the keyword `new`, but after that they are cloned.
- It often utilizes an interface.
- Prototypes are also usually implemented with some sort of registry. The original object is created and then kept in our registry. When another object is needed, we create clone of that object from the registry.
- It is opposite to Builder Pattern.

##### Examples:
1. java.lang.Object#clone()

---
#### Design
- Prototypes generally implements clone method or Cloneable interface. This enables us to avoid using the keyword `new`.
- We can utilize parameters in the clone if we want, but usually we don't.
- We can choose whether we want to do a shallow versus deep copy.

---
#### Implementations
- 

---
#### Pitfalls
1. Sometimes not clear when to use
2. It is usually used with other patterns like Registry.
3. Shallow vs Deep copy. Deep cloning required more coding.

> Framework: If a Pattern contains other Patterns, it is a Framework. (Loose definition, not always true)

---
#### Contrast to other Patterns

|Prototype   |Factory   |
|---|---|
|Light weigth construction using clone  |Deals with flexible objects based on request using multiple constructors  |
|Shallow or Deep copy   |creates concrete instance   |
|Copy of itself   |Fresh instance as `new` keyword is used   |


---