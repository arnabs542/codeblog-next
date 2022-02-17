---
title: 'Errors and Exceptions'
type: 'topic'
section: 'Exception Handling'
course: 'Core Java'
tags:
- java
---
#### Throwable

---
#### Errors
- Error Handling needs to be implicit in application development

---
#### Exceptions
- Exceptions provide a non-intrusive way to signal errors.
- try/catch/finally provides a structured way to handle exceptions.
  - `try` block contains the normal case to execute. Block executes to completion unless an exception is thrown.
  - `catch` block contains the error handling code. It executes only if matching exception is thrown.
  - `finally` block contains cleanup code if needed. It runs in all cases following try or catch block.

```java
BufferReader reader = null;
int total = 0;
try {
  reader = new BufferReader(new FileReader("..path/to/file"))
  String line = null;
  while((line = reader.readLine()) != null)
    total += Integer.valueOf(line);
  System.out.println("Total: " + total);
} catch(Exception e) {
  System.out.println("Error: " + e.getMessage());
  e.printStackTrace();
} finally {
  try {
    if(reader != null)
      reader.close();   //this might throw exception
  } catch(Exception e) {
    System.out.println("Error: " + e.getMessage());
  }
}

```

---