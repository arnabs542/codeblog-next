---
title: 'Methods'
type: 'topic'
section: 'Interview Questions'
course: 'Core Java'
tags:
- java
---
## Variable Argument Passing
#### How can we pass multiple or variable number of arguments to a method on each invocation call?
- Using varargs feature
```java
class Demonstration {
    public static void main( String args[] ) {
        childrenNames();
        childrenNames("tom", "nancy");
        childrenNames("trump", "obama", "modi");
    }

    public static void childrenNames(String... names) {
        for (int i = 0; i < names.length; i++)
            System.out.println(names[i]);
    }   
}
```

**Note:**
- The type name is followed by three dots, a space, and then the variable name.
- The varargs variable is treated like an array.
- The varargs variable must appear at the last in the method signature.
- As a consequence of the above, there can only be a single varargs in a method signature.

#### Is Java both pass by reference and pass by value?
- Java is pass by value only. Even reference data types are passed by value.
- Any changes made within the receiving method to the received values don't affect or change the original values.

#### What is passing by reference?
- **Passing by reference doesn't apply to Java!** Reference data type parameters, such as objects, are also passed into methods by value. This means that when the method returns, the passed-in reference still references the same object as before.

```
public class SuperList {
 
    // Constructor
    public SuperList(int n) {
1.       List<Integer> superList;
2.       allocate(superList, n);
    }
 
    // Method that does initialization
    void allocate(List<Integer> list, int n) {
3.       list = new ArrayList<>(n);
    }
}
```

What should happen when we initialize an object of class SuperList? It will be null, which may seem counterintuitive.
- Consider superList to be a holder that will hold a value of null on line 1.
- On line 2, we are passing a value of null and not the variable superList itself. This is a very important distinction to realize.
- When program control, reaches line 3, the list variable is not the variable superList. In fact, it's a brand-new variable (holder) which receives a value of null.
- Line 3 also initializes the list variable to an object of ArrayList and the list variable will hold the reference or the address of the ArrayList object in the memory(heap).
- When the program control returns to line 2, superList is still null because it was never passed in and assigned the ArrayList object.

In Java, we are **copying** the reference or the address the reference data type variable holds and passing it, and not the actual variable.

Consider the below diagram for further clarity.

Note that objects are always created in heap memory and the program variables are only references or addresses to them. So, when we pass a reference data type, the address of the object in the heap memory is copied and passed along. The receiving method can use the reference or the address to manipulate the object in the heap.

```
class Demonstration {
    public static void main( String args[] ) {
        SuperList obj = new SuperList(5);
        System.out.println("superList = " + obj.sList);
    }
  
}
class SuperList {
    public List<Integer> sList;
    
    public SuperList(int n) {
      List<Integer> superList = null;
      allocate(superList, n);
      sList = superList;
    }

    void allocate(List<Integer> list, int n) {
      
    }
}
```

#### What will be the output of the run method for the IntegerSwap class below?
```
public class IntegerSwap {
    public void run() {
        Integer x = 5;
        Integer y = 9;
        System.out.println("Before Swap x: " + x + " y: " + y);
        swap(x, y);
        System.out.println("After Swap x: " + x + " y: " + y);
    }
 
    private void swap(Integer a, Integer b) {
        Integer temp = a;
        a = b;
        b = temp;
    }
}
```

The output for the two print statements will exactly be the same, i.e. there will be no swapping. Follow the diagram below to understand why.
```
class IntegerSwap {
    public static void main( String args[] ) {
        (new IntegerSwap()).run();
    }
  
    public void run() {
        Integer x = 5;
        Integer y = 9;
        System.out.println("Before Swap x: " + x + " y: " + y);
        swap(x, y);
        System.out.println("After Swap x: " + x + " y: " + y);
    }

    private void swap(Integer a, Integer b) {
        Integer temp = a;
        a = b;
        b = temp;
    }  
}
```

As you can see from the diagram, a and b appear as stack variables holding addresses of integer object locations. Once the program control returns back to the run method, the x and y keep pointing to the same integer objects in heap because they passed in the references or the addresses of the integer objects and not themselves.

#### What value will be printed from the following snippet?
```
String[] students = new String[10];
String studentName = "You are an awesome developer";
students[0] = studentName;
studentName = null;
System.out.println(students[0]);
```

Answer:
You are an awesome developer

---
## Method Overloading
#### Consider the following overloaded methods and determine which method will be invoked for the call `myOverloadedMethod(5)`?
```
    void myOverloadedMethod(long arg) {
        System.out.println("Method with long invoked");
    }
 
    void myOverloadedMethod(int arg) {
        System.out.println("Method with int invoked");
    }
```

Answer:
Method with int invoked

#### How does method overloading match work in Java?
Methods of a class can be overloaded in Java by:
- Changing the number of parameters
- Changing the type of the parameters passed into the methods

Note that methods can't be overloaded by changing the return types of the methods, as it may cause ambiguity. While overloading has nothing to do with polymorphism, Java programmers also refer to method overloading as Compile Time Polymorphism because the method that is going to get called will be decided at compile time.

**The compiler uses the name of the method and the types of the argument expressions to locate methods that are both accessible and applicable. There may be more than one such method, in which case the most specific one is chosen.** Typically, varargs methods are the last chosen, if they compete with other candidate methods because they are considered less specific than the ones receiving the same parameter type.

#### Can the main method be overloaded?
Yes, the static `main` method can be overloaded. But only `public static void main(String[] args)` will be used when your class is launched by the JVM even if you specify one or two command-line arguments. However, programmatically one can invoke the overloaded versions of the `main` method.
```
class Demonstration {
    public static void main( String args[] ) {
        System.out.println( "Traditional main method" );
    }

    public static void main( String singleArg) {
        System.out.println( "Method with single arg" );
    }
  
    public static void main( ) {
        System.out.println( "Method with no args" );
    }  
}
```

---

