---
title: 'Throwing Exceptions and Custom Exceptions'
type: 'topic'
section: 'Exception Handling'
course: 'Core Java'
tags:
- java

---
#### Throwing Exceptions
- We can throw exception using `throw` keyword and then provide instance of the exception.
- Exceptions are objects, so they have to be created before thrown.
- Most exception classes provide a constructor that accepts a String message or other detail.
- When caused by catching other exception, we might want to add some more information to it. In that case, we should include originating exception in the new exception.
- All exception classes support `initCause` method. It allows to associate an exception with an instance of another exception.
- Many exception classes provide a constructor that accepts the originating exception.

```java

```

---
#### Custom Exceptions
- We can create our own custom exception types.
- Normally we inherit from Exception class, that makes it checked exception.
- Constructors are often their only members, as most required functionality is inherited.
- Generally we have 2 constructors:
  1. Constructor that accepts required detail
  2. Constructor that accepts required detail and originating exception

```java
class CustomException extends Exception {
  public CustomException(String reason, String statement) {
    super(reason + " : " + statement);
  }
  public CustomException(String reason, String statement, Throwable cause) {
    super(reason + " : " + statement, cause);
  }
}
```

---
