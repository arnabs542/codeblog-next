---
title: 'Exception and Methods'
type: 'topic'
section: 'Exception Handling'
course: 'Core Java'
tags:
- java

---
#### Exceptions and Methods
- Exception propagate up the call stack and they can cross method boundaries.
- The exceptions that a method throws are actually part of that method's contract, just like its return type or list of parameters.
- Method is responsible for any checked exceptions that might occur. 2 ways of dealing with it:
  1. catch the exception
  2. document that exception might occur using `throws` clause

```java
public void addPassenger(String filename) throws IOException {
  try {
    //...
  } finally {
    //... optional
  }
}
```
---
#### Exceptions and Method Overriding
- The `throws` clause of an overriding method must be compatible with the throws clause of the overridden method.
- 3 ways to be compatible:
  1. simply not throw the exceptions
  2. throw same exception
  3. can have a derived exception


---