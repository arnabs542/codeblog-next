---
title: 'Interface Segregation Principle'
type: 'topic'
section: '02 SOLID'
course: 'SOLID Principles'
tags:
- design
- system design
- solid principles
---
#####ISP: Interface segregation principle
- Clients should not be forced to depend on methods that they do not use.
- We should split large interfaces into smalled, more focused interfaces so that clients that use them will not be forced to depend on things they do not need.
- ISP is not only applicable to interfaces, but also to abstract classes, or any public method that our own class depends upon.
- ISP reinforces other SOLID Principles like SRP, LSP..
- eg., LinkedList implements List and Deque interface. ArrayList implements List interface (no Deque)

#####Benefits of applying ISP
1. Lean interfaces minimize dependencies on unused members and reduce code coupling. Code coupling is number one enemy of clean code as it leads to technical debt.
2. Code becomes more cohesive and focused.
3. It reinforces the use of SRP and LSP.

#####Identifying "Fat" interfaces (Symptoms of Interface Pollution)
- Interfaces with many methods
- Interfaces with Low Cohesion
	- Cohesion refers to the purpose of a component. When all the methods are aligned with the overall purpose of that component, then we say that methods are cohesive.
- Client throws exception instead of implementing method
- Client provides empty implementation
- Client forces implementation and becomes highly coupled

#####Refactor Code that depends on large interfaces
1. Your own code
	- Breaking interfaces is pretty easy and safe due to the possibility to implement as many interfaces as we want.
2. External legacy code
	- You can't control the interfaces in the external code, so you use design patterns like `Adapter`.

#####Conclusion
- ISP is linked with SRP and LSP.
- Don't confuse the word `interface` in the name with a Java interface.
- Pay attention to the symptoms of large interfaces and take action. 
- Break large interfaces into many focused ones for code that you own.
- Use `Adapter Pattern` for external code.
- Many client specific interfaces are better than one general purpose interface.

> Fat interfaces lead to inadvertent couplings between clients that ought otherwise to be isolated - _Robert C. Martin_