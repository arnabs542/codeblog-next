---
title: 'Spring Setup'
type: 'topic'
section: 'Basics'
course: 'Spring'
tags:
- design
- system design
- solid principles
---
### Prerequisites
##### 1. Install Java
https://www.java.com/en/download/

##### 2. Install IDE
- Eclipse
- IntelliJ
- NetBeans

---
### Ways to create Spring project
##### 1. Using Spring JAR files
Steps to create Spring project:
- Create a Java project in IDE
- Download latest Spring from [here](https://repo.spring.io/release/org/springframework/spring/). Download `spring-x.x.x.RELEASE-dist.zip` file.
- Extract zip file and copy all JAR files inside `libs` folder.
- Create `lib` folder in the project and paste copied JAR files inside it.
- Add JARs in build path of Java project.

##### 2. Using Maven
- To create a Spring project, we need to have Spring JAR files added in project.
- Instead of manually downloading them, we can use tools like Maven.
- Maven by defaults builds application on Java 5. So, if we are using higher version of Java, we need to specify it in `build` tag of `pom.xml` 
- Add `spring-context` as dependency in pom.xml

---