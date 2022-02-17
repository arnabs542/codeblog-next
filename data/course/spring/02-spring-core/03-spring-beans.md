---
title: Spring Beans
type: topic
section: Spring Core
course: Spring
tags:
- Java
---
#### Bean
- Object instances that are managed by Spring IoC container are called **Beans**.
- These beans are created with the configuration metadata that you supply to the container (for example, in the form of XML `<bean/>` definitions).
- A bean usually has only one identifier. However, if it requires more than one, the extra ones can be considered aliases. These identifiers must be unique within the container that hosts the bean.
- In XML-based configuration metadata, you use the `id` attribute, the `name` attribute, or both to specify the bean identifiers.

**Note:**
- `@Component` annotation tells that it is a bean and will be managed by Spring.
- `@Autowired` annotation tells that Spring to start looking for this dependency among components it manages.
- `@SpringBootApplication` annotation tells the package and sub-packages to be scanned **(Component Scan)**.

##### Bean Lifecycle
1. Instantiation
2. Populate properties
3. BeanNameAware
4. BeanFactoryAware
5. Pre Initialization - BeanPostProcessors
6. InitializeBean
7. initMethod
8. Post Initialization - BeanPostProcessors

---
#### Bean Scopes
- **singleton (default)**:
    - If we request `applicationContext` for a bean, it gives same bean instance everytime.
    - use `@Scope("singleton")` or `@Scope(value = BeanDefinition.SCOPE_SINGLETON)` annotation.
- **prototype**:
    - A new bean is given whenever requested.
    - use `@Scope("prototype")` or `@Scope(value = BeanDefinition.SCOPE_PROTOTYPE)` annotation
- **request**:
    - Scopes a single bean definition to the lifecycle of a single HTTP request
    - One bean per HTTP request
- **session**: .
    - Scopes a single bean definition to the lifecycle of an HTTP Session.
    - One bean per HTTP session.
- **application**:
    - Scopes a single bean definition to the lifecycle of a `ServletContext`. Only valid in the context of a web-aware Spring `ApplicationContext`.
- **websocket**:
    - Scopes a single bean definition to the lifecycle of a `WebSocket`. Only valid in the context of a web-aware Spring `ApplicationContext`.

---
#### Component Scan

---
#### Autowiring
- It enables to inject the object dependency implicitly.
- It internally uses setter or constructor injection.
- By default, Spring `@Autowire` wires **byType** 

> **Note:** Autowiring can't be used to inject primitive and string values. It works with reference only.

#### Autowiring Modes

|||
|-|-|
| **no** | It’s the default autowiring mode. It means no autowiring.|
| **byName** | The `byName` mode injects the object dependency according to name of the bean. In such a case, the property and bean name should be the same. It internally calls the setter method.|
| **byType** | The `byType` mode injects the object dependency according to type. So it can have a different property and bean name. It internally calls the setter method.|
| **constructor** | The constructor mode injects the dependency by calling the constructor of the class. It calls the constructor having a large number of parameters.|
| **autodetect** | In this mode, Spring first tries to autowire by the constructor. If this fails, it tries to autowire by using byType.|

#### Ways to do Autowiring when multiple classes are available
1. Using `@Primary` annotation
2. Using Class name in Autowired Field
3. Using `@Qualifier` annotation

> `@Primary` has higher precedence over naming

---
##### Component Annotations
###### 1. `@Component`
- Generic Component

###### 2. `@Repository`
- Encapsulating storage, retrieval, and search behavior typically from a relational database.

###### 3. `@Service`
- Business service facade

###### 4. `@Controller`
- Controller in MVC pattern

---