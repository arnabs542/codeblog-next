---
title: 'Exception Class Hierarchy'
type: 'topic'
section: 'Exception Handling'
course: 'Core Java'
tags:
- java

---
#### Error/Exception Class Hierarchy
- ##### Throwable
    1. **Error** (Virtual machine related errors.)
          - Linkage Error
    2. **Exception**
          1. RuntimeException
              - NullPointerException
          2. IOException
              - 
          3. ..

---
##### Unchecked Exceptions
- RuntimeException or any exception inherited from it are called **Unchecked Exceptions**.

##### Checked Exceptions
- Any exception inherited from Exception but not RuntimeException are called **Checked Exception**.
- These exceptions need to handled correctly.
-  Eg, IOException

---
##### Multiple catch block
- Exceptions can be handled by type.
- Each exception type can have a separate catch block.
- Each catch is tested in order from top to bottom and first assignable catch is selected.
- We should start catch blocks with most specific exception types.

---