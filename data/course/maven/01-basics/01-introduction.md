---
title: 'Introduction'
type: 'topic'
section: 'Basics'
course: 'Maven'
tags:
- maven
---
#### What is Maven
- Manages Dependencies - Web Layer (Spring MVC), Data Layer (JPA - Hibernate) etc..                  
- Build a jar or a war or an ear
- Run the application locally - Tomcat or Jetty
- Deploy to a T environment
- Add new dependencies to a project
- Run Unit Tests


---
#### Build Lifecycle
Pre-defined sequence of steps that are done when we run a maven command. Plugins can be attached to lifecycle stages. Default plugins are already defined in the super pom.

`mvn install`
- package - creates the jar
- install - copies the created jar to local maven repository - a temp folder on my machine where maven stores the files.

**Build LifeCycle**
1. Validate
1. Compile
1. Test
1. Package
1. Integration Test
1. Verify
1. Install
1. Deploy

---
#### pom.xml
- Name (if another project want to refer to our project, how do they do it?)
- Version (Major Version, Minor Version, Incremental Version)
- Packaging 
- Dependencies
- Plugins