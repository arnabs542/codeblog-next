---
title: 'Spring Framework'
type: 'topic'
section: 'Basics'
course: 'Spring'
tags:
- design
- system design
- solid principles
---
### Spring Framework
- It is a universal, reusable software environment that provides particular functionality as part of a larger software platform to facilitate development of software applications, products and solutions.
- It is modular architecture and can be broken down into 6 key area:
  1. Core
  2. Web
  3. APO (Aspect Oriented Programming)
  4. Data Access
  5. Integration
  6. Testing

### 1. Spring Core
- Dependency injection/IoC
- Other features
    - i18n internationalization support
    - Validation support
    - Data binding support
    - Type Conversion support, etc.

### 2. Spring Web
- Framework for handling web requests
- Web requests can be handles in 2 ways:
  
##### 1. **Spring Web MVC**
- **Servlet**
  - Java introduced a very basic support for interacting with web via a built-in framework called the **Servlet API**, which is named after a key component called **Servlet**.
  - Java Servlet is an object that receives a request and generates a response based on that request.
  - Servlet API is a low-level API, which is not easy to use and less productive, which leads to developing application lacking proper design principles.
- **Spring MVC**
  - MVC stands for Model View Controller
  - Spring MVC is a layer between Servlet API and Business logic
  - Higher level API and more productive
  - It makes it easier to develop code that follows proper design principles.

##### 2. **Spring Web Webflux**
- **Reactive Programming**
  - It is a declarative paradigm concerned with data streams and the propagation of change.
  - In reactive programming, we react the change rather than wait for change.

- **Spring Webfulx**
  - Spring's reactive web framework is called Spring Webflux.
  - Web requests are executed asynchronously it doesn't block or wait.
  - Instead of waiting, the code simply asks to be notified when the operation is complete and continues executing other operations.
  - It results in better resource utilization.


### 3. Spring AOP
- APO (Aspect Oriented Programming)
  - It is a programming paradigm that aims to increase modularity by allowing the separation of cross-cutting concerns.
  - It is a way of programming that increases organization of code for concerns that span multiple tiers or layers of an application.
- Spring AOP
  - It is an implementation of AOP with spring framework.
  - Its uses:
      1. to implement features in Spring Framework itself.
      2. a valuable tool for developers to handle cross-cutting concerns.


### 4. Spring Data Access
- It makes database transactions easy and removes boilerplate code.
- Different database vendors have different exceptions:
  - MySQL error codes: 630, 839, 840, ..
  - Oracle error codes: 1400, 1722, 2291, ..
- Spring Data access modules takes these database specific error codes and translates them into a well-known set of exceptions.
  - eg, DataIntegrityViolationException
- It also makes testing easier, as it is very easy to switch configurations.

> A **database transaction** is a series of database operations **that must happen together or not at all**.

> **Exceptions** are events within a program that disrupt execution.


### 5. Spring Integration
- Integration means making different systems and applications work together.
- Spring Integration resolves how one application talk to another.
- Ways to expose operations to other systems:
  1. RMI (Remote Method Invocation)
  2. Messaging systems
  3. Web services

> **Web services** are operations that are exposed and accessible via the web.

### 6. Spring Testing
- Spring framework focuses on 2 ways of testing
  1. Unit testing
  2. Integration testing

> **Unit testing** is a sofware development process in which the smallest possible testable parts of an application, called units, are individually and independently scrutinized for proper operation.

> **Integration testing** is a phase in software testing in which individual software modules are combined and tested as a group. It occurs after Unit testing.

---
### Spring Boot
- It is built on top of Spring Framework

##### Features of Spring Boot
1. **Auto-Configuration**
    - It provides a best-guess configuration for an application. It attempts to configure your spring application based on the dependencies that you have added.
    - To set up auto configuration, add `@EnableAutoConfiguration` annotation to the application.
2. **Standalone**
    - Spring Boot makes it easy to create stand-alone, production-grade, Spring-based applications that you can just run.
    - Typical process for running a Java web application
      1. Package application
      2. Choose and download webserver
      3. Configure webserver
      4. Deploy application and start webserver
3. **Opinionated**
    - It favors convention over configuration and is designed to get you up and running as quickly as possible.

> **Annotations** are additional metadata added to the code that can be read at runtime and can be used to make decisions upon.

---
### Other Spring Projects
1. Spring Data project
2. Spring Cloud project
3. Spring Security project


---
##### SpEL
- Spring Expression Language is a powerful expression language from Spring Framework.
- It is typically used in libraries, but can also be used to do some convenient changes to your code.
- Once an object is created, we can use it to manipulate that object or object graph.
- We can also use it to evaluate values at runtime and change the behavior of code.
- It can also be used to evaluate and manipulate configuration

##### Spring AOP Proxies

##### Spring Profiles
- It was implemented to adapt to environments.
- It allows us to set up specific code that gets run only in a specific environment.
