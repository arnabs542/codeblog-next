---
title: 'Create Spring Boot App'
type: 'topic'
section: 'Spring Boot'
course: 'Spring'
tags:
- Java
---
#### 1. Using Spring Initializer
1. Go to Spring Initializer https://start.spring.io/
2. Select project (Maven or Gradle), language as Java, Spring Boot version (lastest)
5. Fill other details
6. Click on **Generate**, zip file will be downloaded.
7. Extract zip file and open in IDE

---
#### 2. Using IDE
- 1

---
#### 3. Using Spring Boot CLI
##### Install Spring Boot CLI
- **Mac** (Using Homebrew)
  1. `brew tap pivotal/tap`
  2. `brew install springboot`
  3. Homebrew will install `spring` to `/usr/local/bin`
- **Ubuntu**
  1. 
- **Windows**

##### Creat app
- Create a file app.groovy

```java
@RestController
class ThisWillActuallyRun {
    @RequestMapping("/")
    String home() {
        "Hello World!"
    }
}
```

- Then simply run it from a shell: `spring run app.groovy`
- Open http://localhost:8080 in your favorite web browser and you should see the following output: `Hello World!`

---
##### Spring Boot Starters
- It is a way to integrate dependency in project to get it all set up and ready to run by simply declaring it as a dependency.
- All dependencies are kept in `pom.xml` file.



---
##### Auto Configuration:
- Spring Boot looks at
  1. Frameworks available on the CLASSPATH.
  2. Existing configuration for the application.
- Based on these, Spring Boot provides basic configuration needed to configure the application with these frameworks. This is called Auto Configuration.

