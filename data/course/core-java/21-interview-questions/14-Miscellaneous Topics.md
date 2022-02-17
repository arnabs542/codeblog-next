---
title: 'Miscellaneous Topics'
type: 'topic'
section: 'Interview Questions'
course: 'Core Java'
tags:
- java
---
## Types
#### Q: What does it mean for Java to be statically typed language?
**Dynamically-typed languages perform type checking at runtime, while statically typed languages perform type checking at compile time.** Scripts written in dynamically-typed languages (like Groovy or Javascript) can compile even if they contain errors that will prevent the script from running properly (if at all). If a script written in a statically-typed language (such as Java) contains errors, it will fail to compile until the errors have been fixed.

#### Q: How many types are there in Java?
There are two types in Java
- Primitive Types
- Reference Types

Note that null is a special type with no name. It is impossible to declare a variable of the null type or to cast to the null type.

#### Q: Are any data types not descendants of the Object class? or What are the eight primitive types in Java? or What are the primitive data types in Java?
Primitive types include int, boolean, char, float, double, short, long and byte. Primitive values do not share state with other primitive values. A primitive type is predefined by the Java programming language and named by its reserved keyword.

#### Q: What kinds of reference types are there in Java?
There are four kinds of reference types in Java. These are:
- class type
- interface type
- type variable
- array type

#### Q: Is an array descendant of the Object class?
Yes arrays are also objects and have `Object` as their supertype. The below snippet verifies this relationship.
```java
class Demonstration {
    public static void main( String args[] ) {
        int[] array = new int[5];
        System.out.println( array instanceof Object );
    }
}
```

#### Q: Will the result of the two calculations be the same?
```java
class Demonstration {
    public static void main( String args[] ) {
          long longWithL = Integer.MAX_VALUE * 2L;
          long longWithoutL = Integer.MAX_VALUE * 2;
          System.out.println("longWithL = " + longWithL);
          System.out.println("longWithoutL = " + longWithoutL + "\t(Overflow Occurred)!");
    }
}
```
**Answer:** No

**Explanation**
In the multiplication without the long, an arithematic overflow occurs because the multiplication is being performed as integers.

---
## Keywords
#### Q: What is the `new` keyword used for in Java?
The new operator instantiates a class by allocating memory for a new object and returning a reference to that memory. The new operator also invokes the object constructor.

#### Q: What is the `this` keyword?
**Within an instance method or a constructor, `this` is a reference to the current object — the object whose method or constructor is being called.** You can refer to any member of the current object from within an instance method or a constructor by using `this`.

#### Q: Consider the code snippet below:
```java
public interface PersonActions { 
    default void whatTypeAmI() {
        System.out.println(this);
    }
}
```
The default method `whatTypeAmI()` in the interface definition prints the this keyword. What does this refer to?

`this` will refer to the object of the implementing class and there could be multiple classes implementing the interface so we may see different values being printed for `this`
```java
class Demonstration implements PersonActions {
    public static void main( String args[] ) {
        (new Demonstration()).whatTypeAmI();
    }
}
interface PersonActions {
    default void whatTypeAmI() {
        System.out.println(this);
    }
}
```

#### Q: What is the native keyword?
**A method that is native is implemented in platform-dependent code, typically written in another programming language such as C, C++, FORTRAN, or assembly language.** The body of a native method is given as a semicolon only, indicating that the implementation is omitted, instead of a block. Following snippet shows one hypothetical example:
```java
public class NativeClass { 
    public void run() {
        this.someCMethod();
    }    
    public native void someCMethod();
}
```
The `native` keyword is applied to a method to indicate that the method is implemented in native code using JNI (Java Native Interface). `native` is a modifier applicable only for methods.
```java
class Demonstration {
    public static void main( String args[] ) {
        System.out.println( "Need to load native library" );
        // We could uncomment the following line if we are
        // able to load the native library
        // (new Demonstration()).someCMethod();
    }
    // Native method
    public native void someCMethod();
  
}
```

#### Q: What is the utility of the `final` keyword?
The `final` keyword can be used in the following scenarios:
- Classes marked `final` can't be extended from or subclassed. This is particularly useful, for example, when creating an immutable class.
- Methods marked `final` can't be overridden in subclasses. You might wish to make a method `final` if it has an implementation that should not be changed and it is critical to the consistent state of the object. Methods called from constructors should generally be declared `final`. If a constructor calls a non-`final` method, a subclass may redefine that method with surprising or undesirable results.
- The `Object` class has a few methods which are `final` e.g. the `getClass()` method. Similarly, the String class is `final` and is immutable.

---
## Annotations
#### Q: What are annotations in Java and their utility?
**Annotations, a form of metadata, provide data about a program that is not part of the program itself.** Annotations can be easily recognized in code because the annotation name is prefaced with the @ character. Annotations have no direct effect on code operation, but at processing time, they can cause an annotation processor to generate files or provide informational messages. They are used for:
- Annotations can be used by the compiler to detect errors or suppress warnings
- Software tools can process annotation information to generate code, XML files, and so forth.
- Some annotations are available to be examined at runtime and allow runtime processing.

Below is an example where a compiler is hinted to ignore warnings relating to unchecked generic operations using the annotation `@SuppressWarnings`. Annotations can be applied to declarations: declarations of classes, fields, methods, and other program elements.
```java
import java.util.List;
import java.util.ArrayList;

class Demonstration {
    // uncommenting the below line remove the
    // compile error
    //@SuppressWarnings("unchecked")    
    public static void main( String args[] ) {
        List companies = new ArrayList();
        companies.add("Educative.io");
        System.out.println(companies.get(0));
    }
}
```

#### Q: Give an example of creating a custom annotation
The annotation type definition looks similar to an interface definition where the keyword interface is preceded by the @ sign. Annotation types are a form of interface and contain annotation type element declarations, which look a lot like methods. Let's say we want to create an annotation that lets a user specify the longitude and latitude of the location at which he coded a class. The annotation would look like below:
```java
// Creates an annotation which can be used to specify
// the longitude and latitude.
@Documented
@interface Location {
 
    // We provide a default value of 0
    double longitude() default 0;
 
    double latitude() default 0;
}
```
The above annotation can be used as following
```java
@Location(longitude = 37.400214, latitude = -121.943682)
public class MySuperClass {
    // Your awesome code here
}
```
Note the use of the `@Documented` meta-annotation. Applying `@Documented` to `@Location` ensures that whichever class is annotated with `@Location` shows the `@Location` annotation in its Javadoc text.

#### Q: What are predefined annotations?
The Java SE API offers a set of predefined annotations that address common use-cases. Following are a few of them:
- `@Deprecated` indicates that the marked element is deprecated and should no longer be used
- `@Override` informs the compiler that the element is meant to override an element declared in a superclass.
- `@SuppressWarnings` tells the compiler to suppress specific warnings that it would otherwise generate.
- `@SafeVarargs` when applied to a method or constructor, asserts that the code does not perform potentially unsafe operations on its varargs parameter. When this annotation type is used, unchecked warnings relating to varargs usage are suppressed.
- `@FunctionalInterface` indicates that the type declaration is intended to be a functional interface. A functional interface has exactly one method.

#### Q: What are type annotations?
As of the Java SE 8 release, annotations can also be applied to any type use. This means that annotations can be used anywhere you use a type. A few examples of type annotations include: class instance creation expressions (new), casts, implements clauses, and throws clauses. Java SE 8 does not include any annotations specific to types, but libraries such as the Checker Framework contain annotations that can be applied to types for verifying certain criteria. For example, the Checker Framework contains the `@NonNull` annotation, which can be applied to a type so that upon compilation it is verified to not be null. Type annotations enforce``` stronger type checking and provide static verification.. Annotations can also be useful as visual reminders to the developer for signifying code intent.

For instance in the below snippet we mark the cast as `@NonNull`
```java
    void casteToString(Object obj) {
        String str = (@NonNull String) obj;
        System.out.println(str.split(",").length);
    }
```
Similarly, another example is below where the `@ReadOnly` annotation ensures that the received parameter isn't assigned to within the receiving function.
```java
    void displayName(@ReadOnly String name) {
        // compiler plugin complains readonly variable is
        // being assigned to.
        name = "new Name";
        // ... Your awesome code here
    }
```

#### Q: What are annotations for annotations?
**Annotations that apply to other annotations are called meta-annotations.** There are several meta-annotation types defined in `java.lang.annotation`. Some of them are: `@Retention`, `@Documented`, `@Target`, Inherited and `@Repeatable`.

#### Q: What are repeating annotations?
There are some situations where you want to apply the same annotation to a declaration or type use multiple times. As of the Java SE 8 release, repeating annotations enable you to do this. The annotation type must be marked with the `@Repeatable` meta-annotation to make it repeatable. Also, a container annotation type needs to be declared which will have a value element with an array type. The component type of the array type must be the repeatable annotation type.

Consider a scenario where you want to create an annotation of type `@Author` which may be repeated for a class definition. The repeatable annotation can be created like below:
```java
@Repeatable(Authors.class)
public @interface Author {
    String name();
}
 
public @interface Authors {
    Author[] value();
}
```
And can be applied like follows:
```java
@Author(name = "Tom")
@Author(name = "Jeena")
public class YourSuperClass {
    // Your awesome code here.
}
``` 

---
## Boxing
#### Q: What is boxing or autoboxing?
**Autoboxing is the automatic conversion that the Java compiler makes between the primitive types and their corresponding object wrapper classes.** For example, converting an int to an Integer, a double to a Double, and so on. Observe the following code snippet:

```java
  List<Integer> nums = new ArrayList<>();

  for (int i = 0; i < 100; i++)
      nums.add(i);
```
The nums variable is a list of Integer objects but we are trying to add() primitive int types to it. Behind the scenes, the compiler automatically creates an object of Integer type and adds it to the list. The above code would be equivalent to the following at runtime.
```java
  List<Integer> nums = new ArrayList<>();

  for (int i = 0; i < 100; i++)
      nums.add(Integer.valueOf(i));
```

#### Q: What will be the output of the following code snippet?
```java
  Long value = 7L;
  System.out.println(value.equals(7));
```
**Answer:** false

**Explanation:**
7 is boxed to Integer and can’t be compared with a type of Long and the result is false.

#### Q: What will be the output of the following snippet?
```java
        Long value1 = 7L;
        System.out.println(value1 == 7);
```
**Answer:** true

#### Q: What will be the output of the following change made to the snippet presented earlier?
```java
        Long value = 7L;
        System.out.println(value.equals(7L));
```
**Answer:** true

**Explanation:**
7 is now correctly boxed to type of Long

#### Q: What will be the output of the following snippet?
```java
        Long value1 = 7L;
        Long value2 = 7L;
        System.out.println(value1 == value2);
```
**Answer:** true

#### Q: What will be the output of the following snippet?
```java
        Long value1 = 7L;
        Long value2 = 7L;
        System.out.println(value1.equals(value2));
```
**Answer:** true

#### Q: What will be the output of the following snippet?
```java
        Long value1 = 20007L;
        System.out.println(value1 == 20007L);
```
**Answer:** true

#### Q: What will be the output of the following snippet?
```java
        Long value1 = 20007L;
        Long value2 = 20007L;
        System.out.println(value1 == value2);
```
**Answer:** false

**Note in the above snippet how the comparison using == operator for the variables initialized to 7 yields true, whereas the same comparison when values are initialized to 20007 yields false. An explanation follows later in the lesson.**

#### Q: What will be the output when the method test() is invoked?
```java
    public void test() {
        Boolean input = null;
        check(input);
    } 
    void check(Boolean input) {
        if (input) {
            System.out.println("True");
        } else {
            System.out.println("False or Null");
        }
    }
```
**Answer:** Null Pointer Exception

#### Q: What will be the output of the below snippet:
```java
        System.out.println(Integer.valueOf(555) == Integer.valueOf(555));
        System.out.println(Integer.valueOf(125) == Integer.valueOf(125));
        System.out.println( Boolean.valueOf(true) == Boolean.valueOf(true));
```
**Answer:** False True True

**The above result might seem strange if one doesn't understand boxing and caching. If the value p being boxed is `true`, `false`, a `byte`, or a `char` in the range \u0000 to \u007f, or an `int` or `short` number between -128 and 127 (inclusive), then let r1 and r2 be the results of any two boxing conversions of p. It is always the case that r1 == r2**

The object wrapper classes for primitive types internally have a cache. When we write `Integer value = 7` the compiler actually converts this to `Integer value = Integer.valueOf(7)` The `Integer` class internally has a cache which holds `Integer` objects for the range of -128 to 127. When two boxing operations request a value between that range they are returned references to the same integer object in the cache and a equality comparison `==` returns true. Other wrapper classes like `Long`, `Short`, `Boolean` etc have similar caches. For design pattern fans, this is an example of a flyweight pattern.
```java
class Demonstration {
    public static void main( String args[] ) {
        // The value 127 is cached and returns true
        System.out.println(Integer.valueOf(127) == Integer.valueOf(127)); // true
        // The value 128 isn't cached and prints false
        System.out.println(Integer.valueOf(128) == Integer.valueOf(128)); // false
    }
}
```

---
## Unboxing
#### Q: What is unboxing?
Unboxing is the reverse of boxing. **Converting an object of a wrapper type say an Integer to its corresponding primitive int value is called unboxing.**
```java
    void print(List<Integer> nums) { 
        int k;
        for (Integer i : nums) {
            k = i;
            System.out.println(k);
        }
    }
```
Consider the above method, where the statement k = i results in the compiler converting the Integer object into its equivalent int primitive value.

---
## Package
#### Q: What is a package?
**A package is a grouping of related types providing access protection and name space management.** For instance fundamental Java classes are in `java.lang`, classes for input and output are in `java.io`. A package can contain classes, interfaces, enumerations, and annotation types. Packages in the Java language begin with `java.*` or `javax.*`. We usually put related classes in packages for the following reasons:
- other programmers can easily determine that types in a package are related and work cooperatively to provide a certain functionality
- names of your types won't conflict with the type names in other packages because the package creates a new namespace
- allow types within the package to have unrestricted access to one another yet still restrict access for types outside the package

#### Q: How can a package be created?
**We can create a package by writing out the package statement at the top of a java source file followed by the package name.** All types intended to be in the same package must have the same package statement declaration at the top of their respective source files. Below is an example:
```java
package com.educative.java.interview.bible;
// This class will only be visible within
// the package com.educative.java.interview.bible since
// it is not declared public 
class JavaInterviewBible {
 
}
```
There can only be one package statement in a source file.

#### Q: Can a type be declared with no containing package?
If you do not use a package statement, your type ends up in an unnamed package.

#### Q: Can a `.java` source file have two public classes?
If you put multiple types in a single source file, only one can be public, and it must have the same name as the source file. You can include non-public types in the same file as a public type.

#### Q: Consider the three packages below:
- `com.demo.courses`
- `com.demo.courses.course1`
- `com.demo.courses.course2`

Now if we use the following import statement in a source file, will it also import types from the second and third packages ?
```java
import com.demo.courses.*
```
Even though the three packages might appear hierarchical but they are not structured such. **Packages have no hierarchy to them. The second and third packages aren’t children of the first even though the naming may imply so.** The packages are named such to indicate that the types within them are somehow related.

The import statement will only import the types within the first package and not the ones in the second or the third packages.

---
## Strings
#### Q: Can String objects be modified after creation?
No. Strings in Java are **immutable** and can't be changed once created.

#### Q: Explain the difference between StringBuilder and StringBuffer?
Java provides two utility classes for String manipulations – StringBuffer and StringBuilder. StringBuffer and StringBuilder are **mutable classes**. **StringBuffer operations are thread-safe and synchronized** whereas **StringBuilder operations are not thread-safe**. So in a multi-threaded environment, we should use StringBuffer but in the single-threaded environment, we should use StringBuilder. **StringBuilder's performance is faster than StringBuffer's because of no overhead of synchronization**.

#### Q: What is the String pool?
String Pool in java is a pool of Strings stored in Java Heap Memory. Because strings are immutable in Java, the JVM can optimize the amount of memory allocated for them by storing only one copy of each literal String in the pool.

#### Q: What is an interned String?
**String Interning** is a way of storing a single copy of each distinct string value. By applying `String.intern()` on a couple of strings will ensure that all strings having the same contents share the same memory.

**Automatic String Internment**
```java
        String str1 = "Educative";
        String str2 = "Educative";
        System.out.println(str1 == str2);
```
The above code will print `true` because Java automatically interns strings. **The only time Java doesn't intern strings is when we create a `String` object using the `new` keyword.** The below code snippet will print false because the two string objects are created on the heap and have different addresses in the heap.

**String Objects on Heap**
```java
        String str3 = new String("Educative");
        String str4 = new String("Educative");
        System.out.println(str3 == str4);
```
Remember that the `==` operates when used for comparision, compares memory addresses for the `String` objects and not their contents. When we create a `String` object using the `new` operator, it always creates a new object in heap memory. On the other hand, if we create an object using String literal syntax e.g. "Educative", it may return an existing object from the String pool, if it already exists. Otherwise, it will create a new `String` object and put in the string pool for future re-use.

The String class maintains a pool of strings. The pool of strings in Java is maintained for saving space and for faster comparisons. When the `intern()` method is invoked on a string object then, if the pool already contains a string equal to this string object as determined by the `equals()` method, then the string from the pool is returned. Otherwise, the string object is added to the pool and a reference to this string object is returned. The `intern()` method should be used on strings constructed with the `new String()` in order to compare them with the `==` operator.

**Using intern method**
```java
        String str5 = new String("Educative");
        String str6 = "Educative";
        System.out.println(str5 == str6); // prints false
        System.out.println(str5.intern() == str6); // prints true
```
The `intern()` method helps in comparing two String objects with `==` operator by looking into the pre-existing pool of string literals and is faster than using `equals()` method when used for comparing strings.
```java
class Demonstration {
    public static void main( String args[] ) {
        String str1 = "Educative";
        String str2 = "Educative";
        System.out.println(str1 == str2);
      
        String str3 = new String("Educative");
        String str4 = new String("Educative");
        System.out.println(str3 == str4);
      
        String str5 = new String("Educative");
        str5.intern();
        String str6 = str5.intern();
        System.out.println(str6 == str1);
        System.out.println(str6 == str2);
        System.out.println(str6 == str3.intern());
        System.out.println(str6 == str4.intern());          
    }
}
```

#### Q: What is the difference between the following two ways of initializing a String variable?
```java
String str1 = "Educative";
String str2 = new String("Educative");
```
In the above snippet, the first string is created as a string literal and is interned in the String pool. The second string is created using the `new` keyword and the object is created on the heap. Comparing the two using the `==` operator will yield false but comparing the two using `equals` will yield true.
```java
class Demonstration {
    public static void main( String args[] ) {
             String str1 = "Educative";
             String str2 = new String("Educative");
             System.out.println(str1 == str2);
             System.out.println(str1.equals(str2));      
    }
}
```

---
## Casting
#### Q: What is casting?
**Type casting or simply casting is used to convert an object or variable of one type into another.** There are two types of casting:
- Casting primitives
- Casting objects

#### Q: Explain how casting of primitive types works in Java.
When casting between primitive types if the destination can hold a larger value than the source, the cast is implicitly done by the compiler without complaining. There's no loss of information or precision when the destination can comfortably hold the value in the source. This is called a widening cast. For example:
- int to double
- char to int
- float to double

Implicit casts
```java
      int i = 5;
      char c = 'a';
      float f = 5.5f;
 
      // int to double
      double d = i;
 
      // char to int
      i = c;
 
      // float to double
      d = f;
```
Casting when the destination can hold a smaller value than the source requires an explicit cast otherwise the compiler will complain. Such casts are called narrowing casts. There are rules described in the JLS how such narrowing casts take place. Narrowing casts can possibly lose precision and sometimes give unexpected results if one isn't familiar with the rules. For example:

Explicit casts
```java
  // i will contain Integer.MAX_VALUE after the cast
  int i = (int) (Integer.MAX_VALUE * 2.0d);
  // b will contain the value 100
  byte b = (byte) (100d);
  // b will print -24
  byte b = (byte) (1000d);
```
```java
class Demonstration {
    public static void main( String args[] ) {
      // Implicit Casts
      int i = 5;
      char c = 'a';
      float f = 5.5f;
      // int to double
      double d = i;
      // char to int
      i = c;
      // float to double
      d = f;
      // Explicit Casts
        i = (int) (Integer.MAX_VALUE * 2.0d);
        System.out.println(i);

        byte b = (byte) (100d);
        System.out.println(b);

        b = (byte) (1000d);
        System.out.println(b);
        // Not Allowed
        // int k = (int)(Boolean.valueOf(true)); <--- compile time error
    }
}
```

#### Q: Explain reference casting?
When we cast an object of a class say A to B, we are in essence not changing the contents of the object on the heap, we are merely using a variable pointer of a different type to refer to the object in the heap. Unlike primitive type casting, there's no loss of information.

Objects of classes also can be cast into objects of other classes when the source and destination classes are related by inheritance and one class is a subclass of the other. **Casting unrelated objects is a compile time error:**

Incompatible type casting
```java
    Integer intObj = (Integer) new Double(5.5d); //   <--- compile time error
```
There are two possibilities when casting between related types:
- **Subclass to Superclass (Upcasting):** When we want an object to behave as an object of its superclass, the cast is called an upcast and is implicit. For example:
```java
  // Declare an Integer
  Integer i = new Integer(7);
  // Upcast Integer to its immediate parent Number
  Number num = i;
  // Upcast Number to the Serializable interface it implements
  Serializable ser = num;
  // Upcast Number to its supertype Object
  Object object = num;
  // Upcast Integer to Serializable
  ser = i;
  // Upcast Integer to Object
  object = i;
```
However, there is catch, when we upcast the Integer to a Number, even though in the heap the object being pointed to is still an Integer but we can't invoke methods defined in the Integer class on the object anymore since it is now being referred to by a Number reference. For example, the Integer class implements the `Comparable` interface and we can do `i.compareTo()` but not `num.compareTo()`. In summary, upcasting narrows the list of methods and properties available to the cast object.
- **Superclass to Subclass (Downcasting):** When we want to convert an object of a supertype to a subtype, we are attempting what is called as downcasting. However, this may be problematic because an object may not be of the subtype we are trying to cast it to, therefore an explicit cast is required to hint the compiler that we know what we are doing. Consider the following snippet:
```java
        Integer i = new Integer(7);
        // Cast i to Number
        Number num = i; 
        // Try to get back i but compiler doesn't
        // know if i is a Integer, Double, Byte etc
        // so do an explicit cast
        Integer k = (Integer) num; // <---
        // We let the compiler know that we think
        // we are doing the right thing here and the
        // code compiles but throws a ClassCastException
        // at runtime
        Double d = (Double) num;
```

#### Q: Consider the following set-up:
```java
    class A {
        void print() {
            System.out.println("I am class A");
        }
    }
    class B extends A {
        void print() {
            System.out.println("I am class B");
        }
    }
    class C extends A {
        void print() {
            System.out.println("I am class C");
        }
    }
```
**What will be the output of the following code snippet?**
```java
  B b = new B();
  // implicit cast
  A a = b;
  // What will be printed?
  a.print();
```
**Answer:** I am class B

**What is the output of the code?**
```java
  B b = new B();
  // implicit cast
  A a = b;
  // Downcast
  C c = (C) a;
  c.print();
```
**Answer:** ClassCastException thrown



---