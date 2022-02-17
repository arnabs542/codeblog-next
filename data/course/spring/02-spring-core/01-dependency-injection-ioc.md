---
title: 'IoC and Dependency Injection'
type: 'topic'
section: 'Spring Core'
course: 'Spring'
tags:
- Java
---
#### Inversion of Control (IoC) or Dependency Injection (DI)
- It is a process whereby objects define their dependencies (that is, the other objects they work with) only through constructor arguments, arguments to a factory method, or properties that are set on the object instance after it is constructed or returned from a factory method.
- The container then injects those dependencies when it creates the bean.
- This process is fundamentally the inverse (hence the name, Inversion of Control).

> Inversion of Control is best understood through the term the “Hollywood Principle,” which basically
means “Don’t call me, I’ll call you.”

The `org.springframework.beans` and `org.springframework.context` packages are the basis for Spring Framework’s IoC container. The `BeanFactory` interface provides an advanced configuration mechanism capable of managing any type of object. `ApplicationContext` is a sub-interface of BeanFactory. It adds:
- Easier integration with Spring’s AOP features
- Message resource handling (for use in internationalization)
- Event publication
- Application-layer specific contexts such as the `WebApplicationContext` for use in web applications.

##### Spring IoC Container
- Spring provides an object factory, which gives an object based on **configuration file** or **annotation**.
- The `org.springframework.context.ApplicationContext` interface represents the Spring IoC container and is responsible for instantiating, configuring, and assembling the beans based on configuration metadata.
- The configuration metadata is represented in XML, Java annotations, or Java code. It lets you express the objects that compose your application and the rich interdependencies between those objects.
- Spring containers:
  1. create and manage objects(Inversion of Control)
  2. Inject object's dependencies(Dependency Injection)
- Several implementations of the `ApplicationContext` interface are supplied with Spring:
  1. `ClassPathXmlApplicationContext`: For reading XML from class path.
  2. `FileSystemXmlApplicationContext`
  3. `AnnotationConfigApplicationContext`
  4. `GenericWebApplicationContext`

> In Spring world, a Spring Container is generally known as an **ApplicationContext**.

The following diagram shows a high-level view of how Spring works. Your application classes are combined with configuration metadata so that, after the ApplicationContext is created and initialized, you have a fully configured and executable system or application.

<img src="https://docs.spring.io/spring/docs/current/spring-framework-reference/images/container-magic.png"></img>

##### Spring Development Process
1. Configure your Spring Beans
2. Create a Spring Container
3. Retrieve Beans from Spring Container

---
### Dependency Injection
- Dependency injection (DI) is a process whereby objects define their dependencies (that is, the other objects with which they work) only through constructor arguments, arguments to a factory method, or properties that are set on the object instance after it is constructed or returned from a factory method.
- The container then injects those dependencies when it creates the bean. This process is fundamentally the inverse (hence the name, Inversion of Control) of the bean itself controlling the instantiation or location of its dependencies on its own by using direct construction of classes or the Service Locator pattern.

Spring supports several types of Dependency Injection, making its support more comprehensive than
that of any other product:
- **Setter Injection**: The injection of dependencies via JavaBean setter methods. Often, but not necessarily, each setter has a corresponding getter method, in which case the property is set to be writable as well as readable.
```java
public class SimpleMovieLister {
    // the SimpleMovieLister has a dependency on the MovieFinder
    private MovieFinder movieFinder;
    // a setter method so that the Spring container can inject a MovieFinder
    public void setMovieFinder(MovieFinder movieFinder) {
        this.movieFinder = movieFinder;
    }
    // business logic that actually uses the injected MovieFinder is omitted
}
```

- **Constructor Injection**: The injection of dependencies via constructor arguments.
```java
public class SimpleMovieLister {
    // the SimpleMovieLister has a dependency on a MovieFinder
    private MovieFinder movieFinder;
    // a constructor so that the Spring container can inject a MovieFinder
    public SimpleMovieLister(MovieFinder movieFinder) {
        this.movieFinder = movieFinder;
    }
    // business logic that actually uses the injected MovieFinder is omitted
}
```

- **Method Injection**: A more rarely used form of Dependency Injection in which the container is
responsible for implementing methods at runtime. For example, an object might define a protected
abstract method, and the container might implement it at runtime to return an object
resulting from a container lookup. The aim of Method Injection is, again, to avoid dependencies
on the container API.

> It is a good rule of thumb to use constructors for mandatory dependencies and setter methods or configuration methods for optional dependencies.

---
##### Dependency Resolution Process
The container performs bean dependency resolution as follows:
1. The `ApplicationContext` is created and initialized with configuration metadata that describes all the beans.
2. For each bean, its dependencies are expressed in the form of properties, constructor arguments, or arguments to the static-factory method. These dependencies are provided to the bean, when the bean is actually created.
3. Each property or constructor argument is an actual definition of the value to set, or a reference to another bean in the container.
4. Each property or constructor argument that is a value is converted from its specified format to the actual type of that property or constructor argument. By default, Spring can convert a value supplied in string format to all built-in types, such as `int`, `long`, `String`, `boolean`, and so forth.