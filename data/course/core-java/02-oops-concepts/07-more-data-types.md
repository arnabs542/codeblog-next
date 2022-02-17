---
title: 'More Data Types'
type: 'topic'
section: 'OOPS Concepts'
course: 'Core Java'
tags:
- java
---
#### String Class
- The String class stores a sequence of Unicode characters
- Values can be concatenated using `+` and `+=`
- String objects are **immutable**. Anything that changes that value requires a new instance of the string object to be created.

##### Creating string objects
1. using literal: `String s = "abc";`
2. using class: `String s = new String("abc")`

##### String class methods
1. length()
2. valueOf()
3. concat(), replace(), toLowerCase(), toUpperCase(), trim(), split()
4. format()
5. charAt(), substring()
6. contains(), endWith(), startWith(), indexOf(), lastIndexOf()
7. compareTo(), compareToIgnoreCase(), isEmpty(), equals(), equalsIgnoreCase()

##### String equality
```java
String s1 = "I LOVE";
s1 += " JAVA";
// s1 => "I LOVE JAVA"
String s2 = "I";
s2 += " LOVE JAVA";
// s2 => "I LOVE JAVA"
System.out.println(s1 == s2); // false
System.out.println(s1.equals(s2)); // true
```
**`intern()` method**:
- It returns a canonicalized reference of a string value.
- It means it will always return back the same exact string object for a given string value.
- It makes sure that 2 strings with same value will reference the exact same object.
- It is helpful when we need to a lot of string comparisons as comparing reference variable is inexpensive operation.
```java
String s3 = s1.intern();
String s4 = s2.intern();
System.out.println(s3 == s4); // true
```

##### Converting Non-String types to Strings
1. using `valueOf()` method.
2. conversion often happens implicitly: `10 + " and " + 20` => `"10 and 20"`
2. using `toString()` method.

---
#### StringBuilder Class
- It provides mutable string buffer.
- For best performance, pre-size the buffer.
- It will grow automatically if it exceeds capacity.
```java
StringBuilder sb = new StringBuilder(40);
```

##### StringBuilder Class methods
1. length()
2. append()
3. insert()

---
#### Primitive Wrapper classes
- They give us the capability of classes when interacting with primitive values.
- Like other classes, they also inherit from Object class.
- Wrapper classes are immutable like Strings.
- Each primitive types has a corresponding wrapper class.
  1. Boolean
  2. Character
  3. Number (abstract class): Byte, Short, Integer, Long, Float, Double 

##### Conversions
- Common conversions are handled automatically.

```java
Integer a = 10;
int b = a;
Integer c = b;
```
- Wrapper classes also provide methods for explicit conversions.
  1. **Boxing** (Primitive to wrapper): `valueOf()`
  2. **Unboxing** (Wrapper to primitive): `xxxValue()`
  3. String to primitive: `parseXxx()`
  4. String to wrapper: `valueOf()`

```java
Integer x = Integer.valueOf(100);
int y = x.intValue();
double d1 = Double.parseDouble("12.30");
Double d2 = Double.valueOf("12.30");
```

##### Wrapper class Equality
- Boxing conversions that always return same wrapper class instance.

|Primitive Type   |Values        |
|-----------------|--------------|
|int              |-128 to 127   |
|short            |-128 to 127   |
|byte             |-128 to 127   |
|char             |`\u0000` to `\u00ff`   |
|boolean          |true, false   |

```java
Integer i1000A = 10 * 10 * 10;
Integer i1000B = 100 * 10;
System.out.println(i1000A = i1000B); // false
System.out.println(i1000A.equals(i1000B)); // true

Integer i8A = 4 * 2;
Integer i8B = 2 * 2 * 2;
System.out.println(i8A = i8B); // true
```
---