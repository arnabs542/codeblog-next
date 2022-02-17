---
title: Variables, Data Types, Operators
type: topic
section: Basics
course: Core Java
tags:
- java
---
#### Variables
- Variable is a named data storage or reserved memory location.
- Java is a strongly typed langauge. So when we declare a variable, we have to specify the type of that variable.
- Variable can only store things that are compatible with that data type.
  - **Declaring variable:** `int data;`
  - **Assigning value to variable:** `data = 10;`
  - **Declare and assign value:** `int data = 10;`

> If no value is assigned, variable holds the default value. For primitive types, there are different default values but it’s always NULL for Object data types.

##### Types of Variables
- **local:** declared inside the method is called local variable.
- **instance:** declared inside the class but outside the method is called instance variable. It is not declared as static.
- **static:** declared as static inside a class is called static variable. It cannot be local.


##### Naming variables
- allowed characters: letters, numbers, $ and _
- first character should not be a number
- Convention is to follw `CamelCase` style to name a variable. Eg, `bankAccount`

##### Scope of variable
- A variable declared within a block is not visible outside of the block (code within `{}`).


---
#### Data Types
##### Primitive Data Types
- Primitive Types are stored **By-Value**.
- 4 Categories
1. **Integer**
    - byte
    - short
    - int
    - long
2. **Floating Point**
    - float
    - double
3. **Character**
    - char
4. **Boolean**
    - boolean

> Java also comes with **Wrapper classes** for all these primitive data types.

##### Non-primitive Data Types
- Array, String, etc

##### Array
- It is an ordered collection of elements.

##### Declaring Array
```java
int[] a = new int[10];
int b[] = new int[10];
int[] c = {1, 2, 3, 4, 5};
```

##### Assigning value
```java
```


---
#### Type Conversion
##### Implicit type conversion
- Conversions performed automatically by the compiler.
- It is also called **Widening conversion**, as we are moving to a wider data type and values can be safely moved.
  - If an expression has **mixed integer** sizes, it uses largest integer type.
  - If an expression has **mixed floating** point sizes, it uses double.
  - If an expression has **mixed integer and floating point**, it uses largest floating point type in expression.

```java
int x = 50;
long y = x;
```

##### Explicit type conversion
- Conversions performed explicitly in code with `cast` operator.
- Here we take responsibility of whatever happens as a result of type conversion.
- We can perform both **Widening and Narrowing conversions**.
  - Floating point to integer drops fraction.
  - Integer to floating point can lose precision.
  
```java
long x = 50;
int y = (int)x;
```
---
#### Operators

##### 1. Arithmetic Operators
- Basic operators: `+`, `-`, `*`, `/`, `%`
- prefix/postfix operators: `++`, `--`
- Compound assignment operators: `+=`, `-=`, `*=`, `/=`, `%=`

##### Arithmetic Operators Precedence
1. postfix: `x++`, `x--`
2. prefix: `++x`, `--x`
3. multiplicative: `*`, `/`, `%`
4. additive: `+`, `-`

##### 2. Relational Operators: `>`, `<`, `>=`, `<=`, `==`, `!=`

##### 4. Logical Operators (Bitwise Operators): `&`, `|`, `^`

##### 3. Conditional Logical Operators:
- AND `&&`
- OR `||`
- NOT `!`

```java

```
---