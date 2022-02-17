---
title: 'Encapsulation'
type: 'topic'
section: 'OOPS Concepts'
course: 'Core Java'
tags:
- java
---
#### Encapsulation
- The internal representation of an object is generally hidden and this concept is known as encapsulation.
- It uses **access modifiers** to achieve encapsulation.

##### Access Modifiers
- It specifies scope of a data member/method/constructor/class.

|Modifier  |Visibility                  |Usable on Classes   |Usable on Members   |
|----------|----------------------------|--------------------|--------------------|
|default   |Only within its own package |Y                   |Y                   |
|public    |Everywhere                  |Y                   |Y                   |
|private   |Only within its own class   |N**                 |Y                   |
|protected |Only within its own class and subclass|N   |Y   |

##### Field Encapsulation
- A class's field should not be directly accessible outside of the class.
- We use Accessors and Mutators to control field access.
  - **Accessors** retrieves field access, also called as **getter**
  - **Mutators** modifies field value, also called as **setter**

---

---