---
title: 'Introduction to Spring'
type: 'topic'
section: 'Basics'
course: 'Spring'
tags:
- spring
---

<img src="https://spring.io/images/spring-logo-9146a4d3298760c2e7e49595184e1975.svg" style="max-width: 400px"></img>

### What is Spring?
- The Spring Framework is an open source application framework that aims to make J2EE development
easier.
- Spring Framework aimed at removing the complexity and helped to make things like web development and data access easier for developers to implement. It also aimed at removing boilerplate code.

> Spring is an application framework. Unlike single-tier frameworks such as Struts or
Hibernate, Spring aims to help structure whole applications in a consistent, productive
manner, pulling together best-of-breed single-tier frameworks to create a coherent
architecture.

**Note:**
- Spring in general means the entire family of projects (or Spring ecosystem): **Spring Framework**, **Spring Boot**, **Spring Data**, etc.
- Spring family began with the creation of Spring Framework, which was built largely in response to the complexity of developing applications using Java's enterprise framework called J2EE (now called as Java EE).

##### What about J2EE?
- J2EE grew over time. Servlets and JSPs were the initial popular items and then they added other things along the way like EJB, JSF, JSP, JAX-RS, Web sockets, etc.
- Early verions of Enterprise Java Beans (EJB v1 and v2) were extremely complex:
  - Multiple deployment descriptors
  - Multiple interfaces
  - Poor performance of Entity Beans (Extremely slow)
- Sun Microsystems re-engineered/re-wrote EJB in 2006 (EJB 3) to make it simpler and easier to use.
- In 2009, EJB 3.1, they added Context Dependency Injection (CDI) with IoC. It has similar features like Spring Core and it was very easy to use. The only problem was that they were just a bit too late and unfortunately EJB just kind of has a bad reputation. By that time Spring was very popular in the industry

##### Goals of Spring
1. Lightweight development with Java POJOs (Plain-Old-Java-Objects)
2. Dependency Injection to promote loose coupling
3. Declarative programming with Aspect Oriented Programming (AOP)
4. Minimize boilerplate Java code

##### Why Spring?
1. Simplify Java Enterprise Development
2. Flexible, modular and backwards compatible
3. Large and active community
4. Continually innovates and evolves

##### Advantages of Spring
1. Rock-solid and well engineered
2. Stood the test of time
6. Wealth of existing knowledge
7. Very actively developed
8. Built-in IDE
9. Scalable

##### Disadvantages of Spring
1. Too much magic
2. Steep learning curve
3. Increases the size of deliverables
4. Hard to debug
5. Adds memory overhead
6. Complexity has grown over time
7. Spring can be too configurable
8. Spring is big
9. Spring's community projects are hit or miss

##### What's new in Spring 5
- Updated minimum requirements for Java 8 or higher.
- Deprecated legacy integration for: Tiles, Velocity, Portlet, Guava, etc.
- Upgraded Spring MVC to use new versions of Servlet API 4.0.
- Added new reactive programming framework: Spring WebFlux.

---
#### Aspect Oriented Programming (AOP)
- 
- The key unit of modularity in OOP is the class, whereas in AOP the unit of modularity is
the aspect.
- DI helps you decouple your application objects from each other, while AOP
helps you decouple cross-cutting concerns from the objects that they affect.



---