---
title: 'Deploying Spring Boot'
type: 'topic'
section: 'Spring Boot'
course: 'Spring'
tags:
- Java
---
##### Containers
- Earlier we used to deploy Java application using container like Tomcat, Glassfish or Webshpere.
- These containers compile with Java EE configuration.
- To deploy a Java application, we create a WAR file and then install them on these containers.

##### Containerless
- With Spring Boot, apps are standalone.
- Instead of installing an app into a container, Spring has embedded a container inside of the framework.
- This allows to run app in standalone mode now. 
- Default container Spring Boot uses is Tomcat, but we can switch to Jetty or Undertow also.

##### Common Cloud Support Platforms that work with Spring Boot
1. Cloud Foundry
2. Heroku
3. Google Cloud
4. Amazon Web Services
5. Microsoft Azure


