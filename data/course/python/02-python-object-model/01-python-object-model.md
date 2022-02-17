---
title: 'Python Object Model'
type: 'topic'
section: '02 Python Object Model'
course: 'Python'
tags:
- python
---
#### Object
- Everything is an object in Python

---
#### 
- def statement is executed at runtime.

##### Assgning/Reassigning a variable
```python
x = 1000
x = 500
```

##### id()
- It returns a unique interger identifier for an object that is constant for the life of the object.
```python
>>> a = 500
>>> id(a)
4475806448
>>> b = 200
>>> id(b)
4472289264
>>> b = a
>>> id(a) == id(b)
True
>>> a is b
True
```

---
#### Argument Passing
- Arguments with default values must come after those without default values.
- Default arguments are evaluated when def is executed.
- Always use immutable objects for default arguments












