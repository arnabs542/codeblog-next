---
title: Introduction to Java
type: topic
section: Basics
course: Core Java
tags:
- java
---
### Java
- Java is an object oriented programming language and also a runtime environment.

---
#### Java Platform (JDK)
We can divide Java into 3 parts, which are bundled together and called **Java Development Kit (JDK)**.
1. **Java Programming Language**
2. **Java Runtime Environment**
    - It is a place where Java code is executed
3. **Java Standard Library**
    - It contains many commonly used functionalities, which we can reuse.

##### Running Java Code
- Application source code is written using Java Programming Language.
- Source code is compiled to bytecode using compiler.
- Java Application also uses Java SE and third-party libraries. These libraries also are published as Bytecode.
- This bytecode is excuted in JVM

---
#### Java Development Kit (JDK)
1. Java SE APIs
2. JVM
3. Tools like Java compiler

> **Bytecode** is a lower-level representation of the code that can be more easily executed by a computer.

> Hardware only know how to execute **machine code** (not Java bytecode).

> Java source code → Bytecode runs in JVM → Machine code runs on Hardware
---
#### JRE
- Required to run Java applications
- End-users normally requires only JRE

#### JDK
- Provides tools required to create Java apps
- Developers normally require JDK
- JDK installation includes JRE

---
#### Philosophy of Java
1. **Portability**
    - WORA: Write Once Run Anywere
    - Java application should be able to run on any platform, means any operating system and any hardware.
    - Most languages at the time of Java had only single compiler or maybe for a few platforms.
    - Portability is achieved by the separation of the 3 parts of the Java platform
      1. Bytecode compiled application source code (common)
      2. Java SE APIs (common)
      3. JVM (different)

    > To run Java application on a different platform (OS + Hardware), we only need to change the JVM

    > Neither the source code nor the byte code had to change. We only had to compile our source code once to run it on different JVMs on different platforms.

2. **Optimized for Readability**
    - Reading code is more important than writing code.
    - Maintainability over terseness
    - Understandable code over clever code

3. **Conservative: New Features**
    - First do no harm
    - Developer productivity
    - Maintaining simplicity

4. **Conservative: Backward Compatibility**
    - Existing code on new JVMs
    - Controlled deprecation
    - Maintaining simplicity

5. **Openness**
    - Java Community Process(JPC) specifies the platform
    - Vendor and community participation in design and direction of Java
    - There are many non-Oracle implementations of Java platform. Eg, IBM, Eclipse has their own JDK implementation
    - Oracle's reference implementation of Java is hosted as an open-source project called OpenJDK.

---
##### When and Why use Java
1. Popularity
2. Scalable development
    - Hierarchical and structured codebases using classes, packages and modules
    - Established coding practices
    - Strong tooling
    - Wealth of libraries
3. Productivity
    - Typed language, which helps in catching bugs.
    - Automatic memory management
    - Garbage collection
    - Multi-threading
4. Performance
    - Just-in-time compilation

##### When and Why NOT use Java
1. **Real-time systems**
    - Because JVM decides when it is going to garbage collect and how long it will take.
2. **Tight integration with specific operating system**
    - More low level language like C and C++ can be better choice
3. **Quick prototyping**
    - There are other languages that churn out prototype applications quickly.
4. **Developers who want cutting-edge languages**

---
#### Comparing Java
##### Java vs C#/.Net (Closest to Java)
1. C# as a programming language moves much faster than Java in terms of new features.
2. C# has more features than Java, which makes it more complex too.
3. .Net has only been recently positioned as a cross-platform stack. So, it is less mature than that of Java.
4. C# ecosystem is dominated by Microsoft.

##### Java vs C/C++
1. C/C++ are unmanaged languages. We have to allocate memore, free memory. So they are more powerful as they let us manipulate memory directly without any restrictions.
2. As a drawback, C/C++ codes are more error prones.
3. C++ has much more language features than Java. Its even more complex than C#
4. C/C++ compilers don't compile into platform-independent bytecode like Java. Instead, they compile to native machine code directly.
5. If we compile C/C++ code, we will get executable that only runs on a specific platform. So, we have different C/C++ compilers for different platforms.
6. C/C++ are better for system-level programming.

##### Java vs Python
1. Python is interpreted language, so there is no compilation step. So, same source code can be run on different platforms using different interpreters.
2. It is statically typed.
3. Since Python is quite high level, interpreting it line by line means that a lot of work has to be done at runtime that's mostly done by a compiler. So, Python is a bit slower at runtime than compiled languages.
4. Python is not backward compatible. eg, Python 2/3
5. Python is a great fit for developing smaller applications or quick prototypes where performance is not of the utmost importance.

##### Java vs JavaScript
1. Combining JavaScript with NodeJS gives a managed platform like Java/C#. NodeJS provides a standard library and execution environment for JavaScript on the server.
2. JavaScript is interpreted language, so there is not compilation step.
3. It is statically types.
4. Computational model of JavaScript and NodeJS is inherently single threaded. So, if we want to fully use a multi-core machine, we will have to launch multiple processes.

---
#### Types of applications using Java
1. **Desktop application**
    - AWT (Abstract Windowing Toolkit): Native OS controls
    - Swing: cross-platform look and feels, MVC
    - JavaFX: Declarative UIs (FXML), advanced components, skinnable with CSS, 3D graphics
2. **Enterprise Java**
    - Java EE: Data persistence, Web applications, Security, Messaging, JSON/XML handling
    - Jakarta EE
    - Spring Framework
3. **Cloud applications**
    - Spring Boot/Netflix libraries
    - MicroProfile, Vert, Play
4. **Android**
    - Java is not same as Android Java
    - Java bytecode is translated into DEX (Dalvik Executable Format)
    - Instead of JVM, we have DVM (Dalvik virtual machine), which executes DEX code.

---
#### Popular Java libraries

##### 1. Spring Framework

##### 2. Utility libraries
1. **Google Guava:** Additional collections, Caching, IO helpers
2. **Apache Commons:** Apache Collections, Apache CSV, Apache IO
3. **Apache Log4J:** Used for Structured application logging

##### 3. Distributed System libraries
1. **Netty:** High performance networking
2. **Akka:** Actor model for concurrency
3. **RxJava:** Reactive programming, Async & event-based model
4. **Apache Camel:** Enterprise application integration. Many transports and connectors.

##### 4. Data-access libraries
- In Java's core libraries, we have **JDBC (Java Database Connectivity)**, which outlines the standard Java API for interaction with relational databases.
- We hava JDBC drivers for all major databases.
- JDBC is too low level, so we have new abstractions:
  1. ORMs like Hibernate, EclipseLink, etc.
  2. SQL DSLs like jOOQ, QueryDSL, etc.

##### 5. Data-processing libraries
1. **Apache hadoop:** Its Java implementation of Google's MapReduce concept.
2. **Apache Spark:** 
3. **DL4J (Deep Learning for Java):** We can implement deep neuro networks in Java.
4. **Cassandra:**
5. **Neo4J:** It is a graph database
6. **ElasticSearch:** 
7. **HDFS (Hadoop Distributed File System)**

---
#### Alternative JVM Languages
Below languages compiles to Java bytecode, which can also use Java SE APIs and can be run on JVM.
1. Groovy
2. Scala
3. Kotlin
4. JRuby
5. JPython


---

