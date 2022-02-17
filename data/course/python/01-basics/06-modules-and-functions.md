---
title: 'Modules and Functions'
type: 'topic'
section: '01 Basics'
course: 'Python'
tags:
- python
---
#### Module

##### Importing module
```python
from urllib.request import urlopen
```


---
#### Function

##### Defining Function
```python
def square(x):
  return x*x
print(square(5))
```

- If a function doesn't return anything, it returns `None`.
```python
def even_or_odd(n):
  if n % 2 == 0:
    print("even")
    return
  print("odd")
even_or_odd(32) # even
print(even_or_odd(32)) # None
```

---
#### Special Functions

##### `def` 
- `def` is a statement, not a declaration.
- top-level functions are defined when a module is imported or run.

##### Naming Special Functions
- `__feature__`

##### `__name__`
- Specially named variable allowing us to detect whether a module is run as a script or imported into another module.

```python
print(__name__)
```


---
#### Module vs Script vs Program
- any `.py` file consititutes a Python module.
- modules can be written for convenient import, convenient execution, or using the if `dunder name = dunder main` idiom, both.

---
#### docstrings
- Literals strings which document functions, modules, and classes.
- They must be the first statement in the blocks for these constructs.
- PEP 257, Sphinx
```python
""" multi-line
doc.. strings"""
```

#### Comments
```python
# comments
```

##### Shebang
```python
#! special comment
```

---