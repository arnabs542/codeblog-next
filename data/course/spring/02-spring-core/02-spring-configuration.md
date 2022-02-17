---
title: 'Spring Configuration'
type: 'topic'
section: 'Spring Core'
course: 'Spring'
tags:
- design
- system design
- solid principles
---
#### Spring Configuration
Spring IoC container consumes a form of configuration metadata. This configuration metadata represents how you, as an application developer, tell the Spring container to instantiate, configure, and assemble the objects in your application.

---
##### 1. XML-based configuration
- XML-based configuration metadata configures these beans as `<bean/>` elements inside a top-level `<beans/>` element.
- The `id` attribute is a string that identifies the individual bean definition.
- The `class` attribute defines the type of the bean and uses the fully qualified
classname.

```java
// create and configure beans
ApplicationContext context = new ClassPathXmlApplicationContext("services.xml", "daos.xml");

// retrieve configured instance
PetStoreService service = context.getBean("petStore", PetStoreService.class);

// use configured instance
List<String> userList = service.getUsernameList();
```

---
##### 2. Annotation-based configuration

**Example**
```java
public class MovieRecommender {

    @Autowired
    private MovieCatalog[] movieCatalogs;

    // ...
}
```

---
##### 3. Java-based Container Configuration
- The central artifacts in Spring’s new Java-configuration support are `@Configuration`-annotated classes and `@Bean`-annotated methods.
- The `@Bean` annotation is used to indicate that a method instantiates, configures, and initializes a new object to be managed by the Spring IoC container.
- The `@Bean` annotation plays the same role as the `<bean/>` element.
- You can use `@Bean`-annotated methods with any Spring `@Component`. However, they are most often used with `@Configuration` beans.
- Annotating a class with `@Configuration` indicates that its primary purpose is as a source of bean definitions.

**Example**
```java
@Configuration
public class AppConfig {

    @Bean
    public MyService myService() {
        return new MyServiceImpl();
    }
}
```

---
