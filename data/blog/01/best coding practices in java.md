---
title: 'Best coding practices in java'
date: 2020-06-08
authors: ['Ashish']
image: ../cover.jpg
tags:
- node
---
###### Java Source File
- The source file length is lower than 2,000 lines of code
- The source file is organized with documentation comment, package declaration, followed by a class comment, imports grouped (static last), class/interface signature and so on.

###### Naming Convention

###### No Need to Depend on Initialization
In Java, developers always depend on the use of constructors to initialize an object. But this is a big myth that most developers follow. There are numerous ways to allocate an object without calling a constructor.
- You can declare all the variables as private. To access the object outside the class, you can then use the GET and SET method.
- For each object, write a new private boolean variable and initialize it.
- Write a non-constructor class that will ensure that each object is initialized before calling anywhere in the code.

###### Secure Your Classes, Method, And Variables
In your code, you will make some classes, methods, and variables as private and some as public. Private classes can’t be accessed easily, making them a secure point of the code. But the public methods, variables can be easily accessed and become a point to be attacked. So, try to make them with limited scope.

###### Always Predefine the Scope
Most developers totally depend on the scope of the packages, but you should always predefine the scope of your code. There are many classes that aren’t closed on their own; leaving a loophole for the attackers. A hacker can use a single loophole to insert his/her own class that can use the sensitive information from your code. JVM is not closed by default, allowing you to close your classes within the package.

###### Avoid Using Inner Classes
Usually, developers use the inner classes whenever they're needed in other classes within the same package. The inner classes are usually accessible to all the other classes in the same package, and it is already mentioned that you should predefine the scope of each and every class you are creating in the code.

###### Ensure Noncloneable Classes
Java has a feature to clone its own classes whenever required. But this feature can also be used adversely by the hackers. A hacker can easily use the java.lang.Cloneable to make duplicate instances of the code and steal necessary information from your code.

To get rid of this issue, all you have to do is to add the following code in each and every class of your code.

```java
public final void clone() throws java.lang.CloneNotSupportedException {
  thrownewjava.lang.CloneNotSupportedException();
}
```

If you want your class to be cloneable, and you've considered the consequences of that choice, then you can still protect yourself. If you're defining a clone method yourself, make it final.

If you're relying on a nonfinal clone method in one of your superclasses, then define this method:

```java
public final void clone() throws java.lang.CloneNotSupportedException {
  super.clone();
}
```

###### Prefer returning Empty Collections instead of Null
If a program is returning a collection which does not have any value, make sure an Empty collection is returned rather than Null elements. This saves a lot of “if else” testing on Null Elements.

###### Hardcoding
Hardcoding values in code can often lead to multiple side effects. For instance, it can lead to duplication, which makes change more difficult. It can often lead to undesirable behavior if the values need to be dynamic. In most of the cases, hardcoded values can be refactored in one of the following ways:
- Consider replacing with constants or enums defined within Java
- Or else, replace with constants defined at the class level or in a separate class file
- If possible, replace with values which can be picked from configuration or environment

###### Logging
Anyone who has ever laid their hands onto production code for debugging has yearned for more logs at some point in time. The importance of logs can not be over-emphasized in development in general and maintenance in particular.

###### SOLID
SOLID is a mnemonic acronym that draws from the five principles it sets forth for writing understandable and maintainable software.

###### DRY & KISS
DRY stands for “Don's Repeat Yourself”. This principle states that a piece of code should not be repeated across the software. The rationale behind this principle is to reduce duplication and increase reusability. However, please note that we should be careful in adopting this rather too literally. Some duplication can actually improve code readability and maintainability.

KISS stands for “Keep It Simple, Stupid”. This principle states that we should try to keep the code as simple as possible. This makes it easy to understand and maintain over time. Following some of the principles mentioned earlier, if we keep our classes and methods focussed and small, this will lead to simpler code.

###### TDD
TDD stands for “Test Driven Development”. This is a programming practice that asks us to write any code only if an automated test is failing. Hence, we've to start with the design development of automated tests. In Java, there are several frameworks to write automated unit tests like JUnit and TestNG.

###### 