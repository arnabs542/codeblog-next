---
title: 'Open closed'
type: 'topic'
section: '02 SOLID'
course: 'SOLID Principles'
tags:
- design
- system design
- solid principles
---
#####OCP: Open-closed principle
- Classes, functions and modules should be closed for modification, but open for extension.
- **Closed for mofification:** Each new feature should not modify existing source code. Source code should become immutable.
- **Open for extension:** A component should be extendable to make it behave in new ways.
-	A class should be written in such a manner that it performs its job flawlessly without the assumption that people in the future will simply come and change it.

> A browser is a perfect example of functionality that is open for extension but is closed for modification.
In simple words, we can enhance the functionality by adding/installing plugins on our browser, but cannot build anything new.

#####Importance of OCP
- New feature can be added easily and with minimal cost. In legacy appications, that are very tangled and complex, each time we need to make a change, the best way is to put that change in a separate component, write a unit test, and that's it.
- Minimizes the risk of regression bugs
- Enforces decoupling by isolating changes in specific components, works along with the SRP.

#####OCP Implementation Strategies
1. **Inheritace**
    - By overwriting the required behaviors from the class.
    - But, inheritance produces coupling between the derived class and the base class, especially when we are using a concrete class as the base class.
2. **Strategy design pattern**
    - In strategy pattern, we are not using inheritance, but we are using interfaces.
    - Instead of creating new classes for each new feature, we are extracting that functionality into an interface. Then we can create classes that implement this interface
    - After we have our strategies, we need the factory that is capable to build classes based on a particular property.

#####Progessively applying the OCP
1. **Small change or Bug fixing:** Make changes inline
2. **More changes:** Consider inheritance
3. **Many changes / Dynamic decision:** Consider interfaces and design pattern like Strategy

> OCP is also applicable to packages

#####Applying OCP for Frameworks and APIs
- An API or Framework is a contract / agreement between different software components on how they should work together.
Ex, JUnit
- A public framework or API is under our control. Clients cannot change the existing code. However the changes that we make can impact clients because they might use it in ways that we aren't aware of.
- If we add a new parameter to a method/API, it can break the client's implementation.

#####Best practices for changing APIs
- Do not change existng public APIs: Data classes, signatures.
- Expose abstractions to our customers and let them add new features on top of our framework. When we use abstract classes or interfaces, we are basically providing an extension point for our clients to provide their own custom logic and fill in the gaps of your framework.
- If a breaking change is inevitable, give your clients time to adapt. Don't just change the API overnight without letting them know. Instead, create new methods or new functionalities, mark the old one as deprecated, and let them know that in a particular amount of time, the code they might be using will be removed.
