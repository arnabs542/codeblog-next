---
title: Conditiona Logic and Loops
type: topic
section: Basics
course: Core Java
tags:
- java
---
#### Conditional Logic
1. **Conditional Assignment**
```java
result = condition ? true-value : false-value
```

2. **if statement**
```java
if(condition)
  trueStatement;
```

3. **if-else statement**
```java
if(condition)
  true-statement;
else
  false-statement;
```

4. **if-elseif-else statement**
```java
if(condition1)
  true-statement1;
else if(condition2)
  true-statement2
else
  false-statement
```

5. **Nested if statements**
```java
if(condition1)
  if(condition2)
    true-statement;
else
  false-statement;
```

6. **Switch statement**
```
switch(testValue) {
  case value1:
    statement1;
  case value2:
    statement2;
  ...
  default:
    defaultStatement;
}
```

---
#### Loops
##### 1. While Loop
```
while(condition) {
  ...
}
```

##### 2. Do..While Loop
```
do {
  ...
} while(condition)
```

##### 3. For Loop
```
for(initialize; condition; update) {
  ...
}
```

##### 4. For-Each Loop
```
for(loop-variable-declaration: array) {
  ...
}
```
---