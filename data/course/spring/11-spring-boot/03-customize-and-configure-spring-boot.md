---
title: 'Customize And Configure Spring Boot'
type: 'topic'
section: 'Spring Boot'
course: 'Spring'
tags:
- Java
---
##### Where to put configuration
1. External Sources
    - command line parameters
    - JNDI
    - OS environment variables
2. Internal Sources
    - Servlet parameters
    - property files
    - java configuration

##### Order in which Spring Boot handles and set config
1. Command Line args
2. `SPRING_APPLICATION_JSON` args
3. Servlet parameters
4. JNDI
5. Java System Properties
6. OS environment variables
7. Profile properties
8. Application properties
9. `@PropertySource` annotations
10. Default properties

> **Rule of thumb**: External sources override Internal sources

