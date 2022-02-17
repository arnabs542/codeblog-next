---
title: 'Singleton Pattern'
type: 'topic'
section: '02 Creational Patterns'
course: 'Design Patterns'
tags:
- Design Patterns
---
#### Concept
- It guarantees only one instance going to be created.
- It also guarantees control of a resource.
- It is usually lazily loaded.

##### Examples:
1. Runtime environment
2. logger
3. Spring Beans
4. Graphics managers

---
#### Design
- Singleton class is responsible for creating itself and managing its lifecycle.
- It is static in nature, although it is not implemented using a static class typically.
- The reason for not using static class is that it needs to be thread safe and static doesn't necessarily guarantee this for us.
- There is a private instance of a singleton, hence the minus sign or hyphen in the UML.
- There is a private constructor that is marked the same way. This is because we want singleton itself to call the constructor and nobody else.
- There is no parameters required for construction and if you require parameters, that is typically a factory pattern and violates the rules of a singleton.

---
#### Implementations

1. **Singleton Basic**

2. **Singleton Lazy**

3. **Singleton Thread Safe Using Volatile**
    - We wil make instance field as `volatile`, which will ensure that the instance will remain a singleton through any of the changes inside of the JVM.
    - To ensure that nobody uses reflection API on our code, we wil throw exception inside private constructor if instance is not null.
    - use `synchronized` block in `getInstance()` method instead of making whole method `synchronized`.


---
#### Pitfalls
1. They are often overused. If you make everything singletons, it will slow your application down.
2. Since, singletons don't expose interface and have private constructors as well as private members, they can often be difficult to unit test.
3. If not careful while implementing it, they are not thread-safe.
4. Sometimes, they are confused for a Factory. Rule of thumb is that, as soon as it needs an argument in that method, it is not a singleton anymore but rather a factory.
5. `java.util.Calendar` is NOT a singleton, it is more of a prototype pattern because it returns a new unique instance everytime we call getInstance() method. (Its not a pitfall)

---
#### Contrast to other Patterns

|Singleton   |Factory   |
|---|---|
|Returns same instance   |Returns various instances   |
|One constructor method - no argument   |Multiple constructors   |
|No interface   |Interface driven   |
| |Adaptable to environment more easily |


---