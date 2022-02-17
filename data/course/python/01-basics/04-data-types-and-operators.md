---
title: 'Data Types and Operators'
type: 'topic'
section: '01 Basics'
course: 'Python'
tags:
- python
---
#### Data Types

##### Scalar Types
1. **int:** arbitary precision integer
```python
>>> 0b10
2
>>> 0o10
8
>>> 0x10
16
>>> int(3.5)
3
>>> int(-3.5)
-3
>>> int("456")
456
>>> int("1000", 3)
27
```

2. **float:** 64-bit floating point numbers
```python
>>> 3.125
3.125
>>> 3e8
300000000.0
>>> 1.616e-35
1.616e-35
>>> float(7)
7.0
>>> float("1.636")
1.636
>>> float("nan")
nan
>>> float("inf")
inf
>>> float("-inf")
-inf
>>> 3.0 + 1
4.0
```

3. **None:** the null object
```python
>>> None
>>> a = None
>>> a is None
True
```
4. **bool:** boolean logical values
```python
>>> True
True
>>> False
False
>>> bool(0)
False
>>> bool(42)
True
>>> bool(-1)
True
>>> bool(0.0205)
True
>>> bool(0.0)
False
>>> bool([])
False
>>> bool([1, 2, 3])
True
>>> bool("")
False
>>> bool("Hello")
True
>>> bool("True")
True
>>> bool("False")
True
```

##### Collection Types

1. **str**
    - It is a data type for strings in Python
    - It is a sequence of Unicode code points (characters)
    - It is immutable
```python
>>> 'hello'
'hello'
>>> "hello"
'hello'
>>> "It's a good thing"
"It's a good thing"
>>> '"Yes!", he said'
'"Yes!", he said'
>>> "first" "second"
'firstsecond'
>>> """this is 
... a multiline
... string"""
'this is \na multiline\nstring'
>>> m = 'this string\nspans multiple\nlines'
>>> m
'this string\nspans multiple\nlines'
>>> "this is a \" in a string"
'this is a " in a string'
>>> k = "this is a \\ in a string"
>>> k
'this is a \\ in a string'
>>> print(k)
this is a \ in a string
```

2. **bytes**
    - Data type for sequences of bytes.
    - It is used for raw binary data and fixed-width single-byte encodings.
```python
>>> b'data'
b'data'
>>> b"data"
b'data'
>>> d = b'some bytes'
>>> d[0]
115
>>> d.split()
[b'some', b'bytes']
```

3. **list**
    - It is a sequence of objects.
    - It is mutable, unlike strings.
    - It can be heterogeneous
```python
>>> [1, 2, 3]
[1, 2, 3]
>>> a = ["apple", "orange", "mango"]
>>> a[1]
'orange'
>>> a[1] = 20
>>> a
['apple', 20, 'mango']
>>> b = []
>>> b.append(10)
>>> b.append(20)
>>> b
[10, 20]
>>> list("characters")
['c', 'h', 'a', 'r', 'a', 'c', 't', 'e', 'r', 's']
>>> c = ['bear',
... 'dog',
... 'cat']
>>> c
['bear', 'dog', 'cat']
```
4. **dict**
    - It maps keys to values
    - in Python3, entries are kept in insertion order.
```python
>>> d = {'a': 10, 'b': 20, 'c': 30}
>>> d
{'a': 10, 'b': 20, 'c': 30}
>>> d['b'] = 50
>>> d
{'a': 10, 'b': 50, 'c': 30}
>>> d['x'] = 100
>>> d
{'a': 10, 'b': 50, 'c': 30, 'x': 100}
>>> e = {}
```

---
#### Relational Operators
#### Relational Operators
|Operator   |   |
|---|---|
|==   |equals   |
|!=   |not equals   |
|<   |less-than   |
|>   |greater-than   |

```python
>>> a = 20
>>> a == 20
True
>>> a == 15
False
>>> a != 20
False
>>> a != 15
True
>>> a < 30
True
>>> a > 12
True