---
title: Spring Boot Interview Questions
type: topic
section: Interview Questions
course: Spring
tags:
- Java
---
###### What is the primary difference between Spring and Spring Boot?
Spring is a web application development framework based on Java. On the other hand Spring Boot is an extension of the spring framework which eliminated the boilerplate configuration required for setup a Spring application.

###### Features of using Spring Boot?
- Starter dependency
- Auto-configuration
- Spring initializer

###### What is Spring Boot starter? How is it useful?
Spring Boot has many starters. They are a set of convenient dependency descriptors. Starter allows you to include these descriptors in your pom.xml.

For example, If you want to work with Spring MVC, you can include “spring–boot–starter–web” as a dependency in pom.xml.

###### What is DevTools in Spring Boot?
Spring Boot DevTools helps you to increase the productivity of the developer. So, you don't require to redeploy your application every time you make the changes. It allows the developer to reload changes without the need of restarting of the server.

###### What does the `@SpringBootApplication` annotation do internally?
`@SpringBootApplication` annotation is equivalent to using `@Configuration`, `@EnableAutoConfiguration`, and `@ComponentScan` with their default attributes. Spring Boot enables the developer to use a single annotation instead of using multiple. But, as we know, Spring provided loosely coupled features that we can use for each individual annotation as per our project needs.

###### How to exclude any package without using the `basePackages` filter?
There are different ways you can filter any package. But Spring Boot provides a trickier option for achieving this without touching the component scan. You can use the exclude attribute while using the annotation `@SpringBootApplication`
```java
@SpringBootApplication(exclude= {Employee.class})
public class FooAppConfiguration {}
```

###### How to disable a specific auto-configuration class?
You can use the exclude attribute of@EnableAutoConfiguration, if you find any specific auto-configuration classes that you do not want are being applied. On the other foot, if the class is not on the classpath, you can use the excludeName attribute of the annotation and specify the fully qualified name instead.
```java
//By using "exclude"
@EnableAutoConfiguration(exclude={DataSourceAutoConfiguration.class})
```

Also, Spring Boot provides the facility to control the list of auto-configuration classes to exclude by using the spring.autoconfigure.exclude property. You can add into the application.properties. And you can add multiple classes with comma separated.
```java
//By using property file
spring.autoconfigure.exclude=org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration
```

###### What is Spring Actuator? What are its advantages?
As we know, Spring Boot provides lots of auto-configuration features that help developers quickly develop production components. But if you think about debugging and how to debug, if something goes wrong, we always need to analyze the logs and dig through the data flow of our application to check to see what's going on. So, the Spring Actuator provides easy access to those kinds of features. It provides many features, i.e. what beans are created, the mapping in the controller, the CPU usage, etc. Automatically gathering and auditing health and metrics can then be applied to your application.

It provides a very easy way to access the few production-ready REST endpoints and fetch all kinds of information from the web. But by using these endpoints, you can do many things to see here the endpoint docs. There is no need to worry about security; if Spring Security is present, then these endpoints are secured by default using Spring Security’s content-negotiation strategy. Or else, we can configure custom security by the help of `RequestMatcher`.

###### What is the Spring Initializer?
The Spring Initializer is a web application that generates a Spring Boot project with everything you need to start it quickly. As always, we need a good skeleton of the project; it helps you to create a project structure/skeleton properly.

###### Is this possible to change the port of Embedded Tomcat server in Spring boot?
Yes, it's possible to change the port. You can use the application.properties file to change the port. But you need to mention "server.port" (i.e. server.port=8081).

###### Can we override or replace the Embedded Tomcat server in Spring Boot?
Yes, we can replace the Embedded Tomcat with any other servers by using the Starter dependencies. You can use `spring-boot-starter-jetty`  or `spring-boot-starter-undertow` as a dependency for each project as you need.

###### Can we disable the default web server in the Spring Boot application?
We can use the application.properties to configure the web application type, i.e.  `spring.main.web-application-type=none`.

###### What is the main difference between JPA and Hibernate?
The main difference between both of them is that JPA is a specification/Interface, whereas Hibernate is only JPA implementations.

###### How do you add Filter to an application?
There are three methods to add filter to Spring Boot application:
1. By implementing Filter interface.
2. Using FilterRegistrationBean.
3. Using MVC controller.

###### Define ELK stack.

The ELK Stack is made of three open-source products: 1) Elasticsearch, 2) Logstash, and 3) Kibana.

- Elasticsearch: It is a NoSQL database which is based on the open-source search engine called Lucene.
- Logstash: It is a data processing pipeline tool which accepts inputs from sources, performs different transformations, and exports the data to targets.
- Kibana: Kibana helps users to visualize data with graphs and chart in Elasticsearch.

###### How to handle exception in Spring Boot.
Spring Boot provides a very useful way to handle exceptions using `@ControllerAdvice` annotation.

###### What is Cross-Site Request Forgery attack?
Cross-Site Request Forgery attack or one-click attack is an attack that forces other users to execute malicious commands on the application. CSRF attack specifically targets state-changing requests.

###### Explain different types of dependency injection.
There are two types of dependency injection in Spring Boot. They are as follows:
- Constructor based dependency injection: It is a technique in which one class object supplies the dependency of another object.
- Setter-based dependency injection: It is a dependency injection in which the framework injects the primitive and string-based values using setter method.

###### What are the advantages of micro service?
Following are the major advantages of micro service:
- It makes development fast and easy.
- Compatible with all container.
- Reduce production time.
- It's a lightweight model that supports a major business application.



---