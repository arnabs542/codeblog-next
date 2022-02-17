---
title: Java Packages
type: topic
section: OOPS Concepts
course: Core Java
tags:
- java

---
#### Package
- A package is a group of related types.
- It provides organization with a Java program.

- It affect source code file structure
  - Members become part of the package
  - Java requires no correlation between package names and source code file structure, But most IDEs require a sub-folder for each part of the package name.

##### Benefits of Packages
1. It creates a namespace to avoid type naming collisions.
2. It provides an access boundary to limit access to type and type members.
3. It acts as a unit distribution.

##### Declaring Package
- Each source file identifies the associated package.
- Package declaration must be before type declaration.
```java
package xxx.xxx;
public class Flight {
  //
}
```

---
#### Packages as a namespace
Standard naming conventions
  1. all lowercase
  2. uses reversed domain name to assure global uniqueness

```java
package com.simplifycodes.travel;
public class Flight {
  //
}
```

```
com.simplifycodes.travel.Flight f = new Flight();
```

---
#### Type Imports
1. **Single Type Import**
    - preferred way to import types.
```java
import com.simplifycodes.travel.Flight;
Flight f = new Flight();
```

2. **Type Import on Demand**
    - During compilation process, the compiler picks only used imports.  
    - Use this with caution.
```java
import com.simplifycodes.travel.*;
Flight f = new Flight();
```

---
#### Package as a Unit of Distribution
- Packages provide a predictable software structure which simplifies distribution.

##### Archive Files
- Package folder structure can be placed into an archive file, called jar file.
- It places package folder structure into a single file, that can optionally be compressed.
- It optionally includes a **manifest**, which provides information about archive content. It is list of name-value pairs. It is commonly used to define startup class.

##### Creating Archive files
- JDK provides a utility for creating archive files - **jar command-line utility**
- Other ways to create archive files
  1. Using IDEs - IntelliJ, NetBeans
  2. Using Build managers - Gradle, Maven

---

