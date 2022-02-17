---
title: 'Proxy Pattern'
type: 'topic'
section: '03 Structural Patterns'
course: 'Design Patterns'
tags:
- Design Patterns
---
#### Concept
- It is a pattern that acts as an interface to something else.
- It is used when we want to wrap a real object with a proxy.
- We create an interface to an object by wrapping it with a class to create that proxy.
- It can also add more functionality to that wrapped object.
- Proxy can be used to solve multiple problems such as security or simplifying an interface to something, a remote service call, or just an expensive object to create.
- Proxy itseld is called to access the real objects

##### Examples:
1. java.lang.reflect.Proxy
2. java.rmi.*

---
#### Design
- The basis of Proxy pattern is an intermediary object that intercepts calls.
- It is typically interface based.
- Many frameworks like spring use it and in doing so they have an interface and an implementation class that the proxy resides in between. 
- Java API provides an interface, an invocation handler, and a class java.lang.reflect.Proxy to facilitate this.

---
#### Implementations

---
#### Pitfalls
1. We can only have one proxy
2. It adds another abstraction layer
3. It is similar to other patterns

---
#### Contrast to other Patterns

|Proxy   |Decorator   |
|---|---|
|Can add functionality, but not its main purpose   |Dynamically add functionality   |
|Can only have one Proxy   |Chained pattern  |
|Compile time   |Decorator points to its own type   |
| |It is determined at runtime |

---