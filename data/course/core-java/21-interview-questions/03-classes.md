---
title: 'Classes'
type: 'topic'
section: 'Interview Questions'
course: 'Core Java'
tags:
- java
---
## Accessibility
#### How can access to classes, class variables and methods be controlled?
Access level modifiers determine whether other classes can use a particular field or invoke a particular method in another class. There are two levels of access control, the top level and the member level.

#### What are the top-level access modifiers?
The top-level access modifiers apply to top level classes. Classes can be marked either **public or package private**.
- A public class is accessible across different packages.
- A package private class is only visible to other classes within the same package.

All the four access modifiers can be applied at member level.

#### Explain the public modifier
The `public` modifier is the least restrictive modifier. Any class marked public or class member marked public would be accessible everywhere.

#### How can we mark an entity package private in Java?
There's no explicit modifier for package private. In the absence of any modifier the class or member variables are package private. A member marked package private is only visible within its own package. Consider the class below.
```
// class can be accessed by other classes within the same
// package but not outside of it.
class IamPackagePrivateClass {
    int IamPackagePrivate;
    private int IamPrivate;
    public IamPackagePrivate(int a, int b) {
        this.IamPackagePrivate = a;
        this.IamPrivate = b;
    }
}
```
Package private is a slightly wider form of private. One nice thing about package-private is that you can use it to give access to methods you would otherwise consider private to unit test classes. So, if you use helper classes which have no other use but to help your public classes do something clients need, it makes sense to make them package private as you want to keep things as simple as possible for users of the library.

#### Explain the protected access modifier?
The `protected` modifier specifies that a member can only be accessed within its own package (as with package-private) and, in addition, by a subclass of its class in another or the same package.

#### Explain the private modifier?
The private modifier specifies that the member can only be accessed in its own class. Note that top level classes can't be marked private or protected but nested ones can be.

#### Is it a good idea to make classes and fields public?
If other programmers use your class, you want to ensure that errors from misuse cannot happen. Access levels can help you do this.
- Use the most restrictive access level that makes sense for a particular member.
- Use private unless you have a good reason not to.
- Avoid public fields except for constants.
- Note public fields tend to link you to a particular implementation and limit your flexibility in changing your code.

#### Access Modifier Table
The table below, lists how the different access modifiers affect visibility within different entities in Java.

| Marked with Modifier | Visible Within Class | Visible within Package | Visible within Subclass | Visible within World |
|-|-|-|-|-|
| public | yes | yes | yes | yes |
| protected | yes | yes | yes | no |
| package private | yes | yes | no | no |
| private | yes | no | no | no |

---
## The Object Class
#### What is the Object class?
**The Object class is the superclass directly or indirectly of every other class in Java.** **The Object class itself doesn't have any superclass.** In the absence of any other explicit superclass, every class is implicitly a subclass of Object.
```
class HelloWorld {
    public static void main( String args[] ) {
        System.out.println((new ObjectSubclass()) instanceof Object);      
    }
}
class ObjectSubclass { }
```
Answer: true

#### What are the methods defined in the Object class?
The methods defined in the Object class include:
- clone()
- equals()
- hashCode()
- finalize()
- getClass()
- toString()

#### What is the output of the below snippet?
```
    String obj1 = new String("abc");
    String obj2 = new String("abc");
    System.out.println(obj1 == obj2);
```
Answer: false

These are two different String objects in the heap memory. When the addresses get compared, they aren’t equal.

```
String myStr = "abc";
System.out.println(myStr == "abc");
```
Answer: evaluation result depends on compiler optimizations

```
System.out.println(new Integer(5) == new Integer(5));
```
Answer: true

The `equals()` method provided in the Object class uses the identity operator `==` to determine whether two objects are equal. For primitive data types, this gives the correct result. For objects, however, it does not. **The `equals()` method provided by `Object` tests whether the object references are equal — that is, if the object references are pointing to the same address in memory. This is the reason the statement `new Integer(5) == new Integer(5)` will output `false` because the two integer objects have different memory addresses even though their values are the same.**

The case of `String` class is a little tricky. Compiler optimization can cause string literals to point to a single string object if the same literal is repeated many times in the code. Therefore, a snippet like below can result in true or false depending on how the program is compiled.
```
String myStr = "abc";
System.out.println(myStr == "abc");
```
Always use the `equals()` method when comparing strings!

```
class Demonstration {
    public static void main( String args[] ) {
        question1();
        question2();
        question3();
        question4();      
    }
    static void question1() {
        String obj1 = new String("abc");
        String obj2 = new String("abc");
        System.out.println(obj1 == obj2);
    }

    static void question2() {
        String myStr = "abc";
        System.out.println( myStr == "abc");    
    }  
  
    static void question3() {
        System.out.println( new Integer(5) == new Integer(5));    
    }

    static void question4() {
        System.out.println( 5 == new Integer(5));    
    }  
}
```
**Output:**
```
false
true
false
true
```

#### What is wrong with the BadCloneExample class shown below?
```
public class BadCloneExample {
 
    List<Integer> seen = new ArrayList<>();
    int current = -1;
 
    public void add(int newCurrent) {
        seen.add(current);
        current = newCurrent;
    }
 
    public void clearHistory() {
        seen.clear();
    }
 
    public BadCloneExample clone() {
        BadCloneExample clone = new BadCloneExample();
        clone.current = current;
        clone.seen = seen;
        return clone;
    }
}
```
The Object class's clone() method can be overridden by classes in Java. However, the most common mistake is to copy reference variables. In the given code snippet, the clone method copies the reference to the list field seen. This makes two objects point to the same list field. Look at the snippet below:
```
BadCloneExample bce = new BadCloneExample();
bce.add(5);
bce.add(6);
BadCloneExample prev = bce.clone();
// will print [-1, 5]
System.out.println(prev.seen);
// clears out the list field
bce.clearHistory();
// user sees [] but expects [-1,5]
System.out.println(prev.seen);
```
The two objects point to the same field and operations by the original object cascade to the clone.

#### Answer the question based on the following snippet:
```
public class Employees {
    List<Person> list = new ArrayList<>();
    public Employees() {
    }
 
    public void add(String name) {
        list.add(new Person(name));
    }
 
    public Employees clone() {
        Employees clone = new Employees();
        for (Person person : list) {
            clone.list.add(person);
        }
        return clone;
    }
}
 
class Person {
    String name;
    public Person(String name) {
        this.name = name;
    }
}
```
What will be the output of the following snippet?
```
        Employees apple = new Employees();
        apple.add("Tim Cook");
        Employees microsoft = apple.clone();
        microsoft.list.get(0).name = "Satya Nadella";
 
        System.out.println(apple.list.get(0).name);
```
Answer: Satya Nadella

> The purpose of the above question is to drive home the fact that correct implementation of the clone method, requires appropriately copying nested reference variables.

#### Answer the question based on the following setup:
```
public class Celebrity {
    String name;
    int age;
    public Celebrity(String name, int age) {
        this.name = name;
        this.age = age;
    }
    public boolean equals(Object obj) {
        if (this == obj)
            return true;
        if (!(obj instanceof Celebrity) || obj == null)
            return false;
        Celebrity otherCeleb = (Celebrity) obj;
        return name.equals(otherCeleb.name);
    }
}
```
What will be the output of the below snippet:
```
        Celebrity realKardashian = new Celebrity("Kim", 17);
        Celebrity kardashianClone = new Celebrity("Kim", 17);
        System.out.println(realKardashian.equals(kardashianClone));
```
Answer: true

```
        HashSet<Celebrity> set = new HashSet();
        Celebrity realKardashian = new Celebrity("Kim", 17);
        Celebrity kardashianClone = new Celebrity("Kim", 17);
        set.add(realKardashian);
 
        if (set.contains(kardashianClone)) {
            System.out.println("Kim is a celebrity");
        } else {
            System.out.println("Can't find Kim");
        }
```
Answer: Can’t find Kim
```
import java.util.HashSet;

class Demonstration {
  
    @SuppressWarnings("unchecked")  
    public static void main( String args[] ) {
        
        HashSet<Celebrity> set = new HashSet();
        Celebrity realKardashian = new Celebrity("Kim", 17);
        Celebrity kardashianClone = new Celebrity("Kim", 17);
        set.add(realKardashian);

        if (set.contains(kardashianClone)) {
            System.out.println("Kim is a celebrity");
        } else {
            System.out.println("Can't find Kim");
        }

        System.out.println(realKardashian.equals(kardashianClone)); 
        System.out.println(realKardashian.hashCode() + " " +kardashianClone.hashCode());      
    }
}

class Celebrity {

    String name;
    int age;

    public Celebrity(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public boolean equals(Object obj) {
        if (this == obj)
            return true;

        if (!(obj instanceof Celebrity) || obj == null)
            return false;

        Celebrity otherCeleb = (Celebrity) obj;
        return name.equals(otherCeleb.name);
    }
}
```
The above questions explain why one needs to override the `hashCode()` method whenever we override the `equals()` method for a class. The vice-versa is not necessary that is if you override the hashCode method it is not a must to override the equals method. Let's try to understand why that is so. Whenever, we use a hash-based collection, it uses:
- `hashCode()` method to find the right bucket
- `equals()` method to match the object we are looking for

In the example snippet in the quiz above, the two celebrity objects are equal but when we search for the second object in the hash set we are unable to find it because it has a different hashcode than the first celebrity object that has been added to the set. The value returned by `hashCode()` is the object's hash code, which is the object's memory address in hexadecimal. By definition, if two objects are equal, their hash code must also be equal. If you override the equals() method, you change the way two objects are equated and Object's implementation of `hashCode()` is no longer valid. Therefore, if you override the `equals()` method, you must also override the `hashCode()` method as well.

## Explain the finalize() method in the Object class?
The `Object` class provides a callback method, `finalize()`, that may be invoked on an object when it becomes garbage. Object's implementation of `finalize()` does nothing — you can override `finalize()` to do cleanup, such as freeing up resources.

The `finalize()` method may be called automatically by the system, but when it is called, or even if it is called, is uncertain. **Therefore, you should not rely on this method to do your cleanup for you.** For example, if you don't close file descriptors in your code after performing I/O and you expect `finalize()` to close them for you, you may run out of file descriptors.

#### Consider the snippet below:
```
    void myMethod(Object input) {
        // Your awesome code here    
    }
 
    myMethod("123")
    myMethod(new Integer(5))
```
Is there a way your method can find out if the object passed in is an integer or a string?

Yes, the `getClass()` method returns a `Class` object, which has methods you can use to get information about the class, such as its name `getSimpleName()`, its superclass `getSuperclass()`, and the interfaces it implements `getInterfaces()`. **The `getClass()` method is final and can't be overridden.**
```
class Demonstration {
    public static void main( String args[] ) {
        myMethod(new Integer(5));
        myMethod("abc");
    }
  
    static void myMethod(Object input) {
        System.out.println("class name: " + input.getClass().getSimpleName());
        System.out.println("super class name: " + input.getClass().getSuperclass().getSimpleName());
```

#### What will be the output of the following snippet of code? Can you explain the result?
```
  Integer.valueOf(1).equals(Long.valueOf(1))
```
**The output will be false.** Even though the values are the same, i.e. one, but the objects are of different types. One is of type `Integer` and other is of type `Long`.

---
## Constructors
#### There's no constructor for the class in the snippet below, how can instances of it be instantiated then?
```
public class Celebrity {
    String Name;
    int age;
}
```
Even though the class doesn't define a constructor, **a default no-argument constructor is provided** by the compiler. In this case the string variable will be initialized to null and the age variable would be initialized to zero. Remember that you can also provide a no-argument constructor for a class.

#### What will be printed on the console, if we create an object of the following class and invoke it's print method?
```
public class SpecialPerson {
    String fullName = init();
    String name = "batman";
    public SpecialPerson() {
        name = "superMan";
    }
    private String init() {
        return name;
    }
    public void print() {
        System.out.println(fullName);
    }
}
```
Answer: null

#### Can a class have a static constructor to initialize static fields?
Answer: No

There’s no such thing as a static constructor in java. A constructor only exists in the context of creating a new instance or object of a class. Static fields of a class can be initialized in the static block.

#### Consider the following parent child classes.
```
public class ParentClass {
    protected int counter;
    public ParentClass(int val) {
        this.counter = val;
    }
}
public class EmptyChildClass extends ParentClass {
    public EmptyChildClass() {
    }
}
```
Answer: Parent class doesn’t have a default no-argument constructor

The above code will not compile because the parent class doesn’t define a no-argument default constructor. We could either invoke the parent’s one parameter constructor within the child’s constructor or add a default constructor to the parent. Also note that if the parent defined no constructor at all, the snippet would compile because the compiler would supply a no-argument constructor in the absence of any user-defined constructors.

---
## Initialization
#### Can we change the contents of a final array as in the code snippet below?
```
    final int[] array = new int[5];
    array[0] = 1;
```
It may appear counterintuitive, but we can actually change the contents of the array even though it is marked as final. The array variable points to a particular start location in the memory where the contents of the array are placed. The location or the memory address can't be changed. For instance, the following code will not compile:
```
    final int[] array = new int[5];
    array = new int[10];
```
However, the following code is perfectly legal and will work.
```
public class FinalArrayExample { 
    final int[] array = new int[5];
    // Allowed 
    void changeArrayContents(int  i, int val) {
        array[i] = val;
    }
    // Not allowed and will not compile
    /*
    void changeArray(){
        array = new int[10];
    }*/
}
```

#### What are static initialization blocks?
**A static initialization block is a normal block of code enclosed in braces, { }, and preceded by the static keyword. It can be used to initialize static fields of a class.** A class can have any number of static initialization blocks, and they can appear anywhere in the class body. The runtime system guarantees that static initialization blocks are called in the order that they appear in the source code.
```
public class EducativeCourse {
    static String courseName;
    static String version;
 
    // We have two static initialization blocks
    static {
        version = "1.0";
    }
 
    static {
        courseName = "Java Interview Bible";
    }
}
```
The Java compiler copies initializer blocks into every constructor. Therefore, this approach can be used to share a block of code between multiple constructors.

#### Can initialization block also be used to initialize instance fields?
Yes,

- initialization blocks
- final methods

can be used to initialize instance fields. Both of them are alternatives to using a constructor.
```
class Demonstration {
    public static void main( String args[] ) {
        EducativeCourse ec = new EducativeCourse();
        System.out.println( "Course name: " + ec.courseName );
    }
}
public class EducativeCourse {
    String courseName = setCourseName();
    String version;
    // initialization block
    {
        version = "1.0";
    }
    // final method used for intialization
    private String setCourseName() {
        return "Java Interview Bible";
    }
}
```

Note that we could have marked the `setCourseName` as non-final and not have a compile error. However, non-final methods used during initialization can cause problems as the object may not be fully constructed. Using a method for initialization may be useful if subclasses want to reuse the initialization method.

---
## Classes
#### Explain the concept of class in Java?
A class in object orientated languages is the fundamental building block of any program. It can be thought of as a blueprint and its instance objects as manifestations of that blueprint. **A class, in the context of Java, are templates that are used to create objects, and to define object data types and methods. Except for primitive types (int, double, float, char etc), all objects (String, Lists, Runnable, etc) in Java are instances of a class.**

#### What is the root class in Java? or What class is the superclass of all classes in Java?
The `java.lang.Object` class is the super class of all classes in Java. All classes implicitly extend the object class. All objects including arrays are instances of the Object class.
```
class Demonstration {
    public static void main( String args[] ) {
        Demonstration[] array = new Demonstration[1];
        array[0] = new Demonstration();
        if( array[0] instanceof Object) {
          System.out.println( "Demonstration is instance of Object");
        }
        if( array instanceof Object) {
          System.out.println( "Array is instance of Object");     
        }
    }
}
```

---
## Nested Classes
#### What are nested classes?
Java allows defining a class within another class. A nested class is a member of its enclosing class. Nested classes can be either static or non-static.
- Static Nested Class
- Non-Static Nested Class or Inner Class. The following classes are also considered inner classes.
    - Local Class
    - Anonymous Class

```
class Demonstration {
    public static void main( String args[] ) {
        
        // Declaring an instance of the outer class
        OuterClass oc = new OuterClass();
        System.out.println(oc.myName);
        oc.createInnerClassInstance();
      
        // Declaring instance of innerClass
        OuterClass.StaticInnerClass sic = new OuterClass.StaticInnerClass();
        sic.printName();
    }
}

class OuterClass {

    String myName = "outerclass";
    private static String staticName = "outerclass";

    private class InnerClass {

        String myName = "innerClass";

        void printNames() {
            System.out.println(
                    "I can access both static & non-static members of my outer class : " + staticName + " " + myName);
        }
    }

    void createInnerClassInstance() {
        // Creating inner class instance
        InnerClass ic = new InnerClass();
        ic.printNames();
    }

    static class StaticInnerClass {

        String myName = "staticInnerClass";

        void printName() {
            System.out.println("I can access static members of my outerclass but not non-static ones: " + staticName);
        }
    }
}
```

#### What are non-static nested classes or inner classes?
Non-static nested classes are called inner classes.
```
public class OuterClass {
 
    String myName = "outerclass";
 
    private class innerClass {
 
        String myName = "innerClass";
 
        void printNames() {
            System.out.println("I am the inner class");
        }
    }
}
```
The following two types of classes are also referred to as inner classes.
- Local Classes
- Anonymous Classes

**Note, that inner classes can access instance fields declared in the enclosing class. However, nested static classes can't access instance fields of the enclosing class.**

Serialization of inner classes including local and anonymous classes is discouraged for compatibility issues across different JRE implementations.

#### What are static nested classes?
A class defined within an outer class and marked static is called a static nested or static inner class. A static nested class is behaviorally similar to a top-level class that has been nested in another top-level class for packaging convenience.

#### Can nested classes be declared private?
Yes. A top-level class can only be marked public or package private. But a nested class can be declared private, public, protected, or package private.

#### What are some of the use-cases of nested classes?
**The primary purpose of nested classes is logically grouping related classes in one place and improving encapsulation.**

Say, you write a class to hold all the employees of a company. It may make sense to nest an employee iterator class as it iterates only on the objects of the employee class.

#### What would be the output of the method `sayName` in the code below?
```
public class OuterClass {
    String myName = "outerClass";
    private class InnerClass {
        String myName = "innerClass";
        void printName() {
            System.out.println("I am " + myName);
        }
    }
 
    void sayName() {
        InnerClass ic = new InnerClass();
        ic.printName();
        System.out.println("I am " + myName);
    }
}
```

Answer:

```
I am innerClass
I am outerClass
```

**Explanation:**
The InnerClass declares a variable by the same name as the OuterClass. The InnerClass’s field myName will shadow the OuterClass’s field myName and will be printed instead.

#### Can a top-level class in Java be declared static?
No, Only nested classes can be marked as static.

---
## Anonymous and Local Classes
#### What are local classes?
**A class that is defined in a block is called a local class. A block is a group of zero or more statements between balanced braces.** Usually, local classes are defined inside a method, though they can also be defined inside a for loop or even an if statement. Local classes do have access to members of their enclosing class. They can also access local variables, but they need to be declared final.

**When local classes use variables in the scope of the outer class, they are said to have captured the variable.**
```
class LocalClassExample {
    public static void main( String args[] ) {

        String name = "mainClass";

        // Declare our local class
        class LocalClass {
            String myName = "superFineLocalClass";

            public LocalClass(String name) {
                this.myName = name;
            }

            public void print() {
                System.out.println("My name is " + myName + " and I am enclosed by " + name);
            }
        }


        LocalClass lc1 = new LocalClass("test");
        LocalClass lc2 = new LocalClass("rest");

        lc1.print();
        lc2.print();      

      }
}
```

#### What are anonymous classes?
An anonymous class is like a local class except they don't have a name and should be used in place of a local class when the intended use is only one time.

Anonymous class implementing an interface
```
        // Anonymous class implementing the Comparator
        // interface. The class is declared and instantiated
        // at the same time.
        Comparator myCustomComparator = new Comparator<Integer>() {
 
            public int compare(Integer i1, Integer i2) {
 
                return (int)Math.pow(-1, i1) * (i1 - i2);
            }
        };
 
        PriorityQueue<Integer> q = new PriorityQueue<Integer>(myCustomComparator);
```
Anonymous class extending another class
```
        Thread t = new Thread() {
 
            @Override
            public void run() {
                System.out.println("I just extended the thread class.");
            }
        };
 
        t.start();
```

---
## Abstract Classes
#### What is an abstract class?
**An abstract class can't be instantiated, but it can be subclassed.** An abstract class usually contains abstract and non-abstract methods that subclasses are forced to provide an implementation for. An abstract method is a method that is declared without an implementation. Any method marked abstract will force subclasses to provide an implementation for. Non-abstract methods will also have a method body that serves as the default implementation. Subclasses may choose to override the default implementation with their own. **If a class includes abstract methods, then the class itself must be declared abstract.**

Abstract classes may also implement an interface but will not be required to provide an implementation for interface methods since it can't be instantiated. Below is an example `Person` class.
```
public abstract class Person implements Comparable<Person> {
 
    int age;
    String firstName;
    String lastName;
    String middleName;
 
    public Person() {
 
    }
 
    public Person(int age, String firstName, String middleName, String lastName) {
        this.age = age;
        this.firstName = firstName;
        this.middleName = middleName;
        this.lastName = lastName;
    }
 
    // Abstract method must be implemented by the subclass.
    abstract void printFullName();
 
    // Default implementation for defaultAge
    void printAge() {
        System.out.println();
    }
}
```

#### Can an abstract class be declared final?
No


**Explanation:**
It is nonsensical to mark an abstract class as final, as final prohibits extension of a class and the very purpose of an abstract class is to derive subclasses from it.

#### Since abstract classes can't be instantiated, can they have a constructor?
Yes, Abstract classes have constructors and those constructors are always invoked when a concrete subclass is instantiated.

---
## Final Class
#### What is a final class?
A class marked final can't be extended or inherited from. The String class is one such example. You may want to make a class final if it is not designed for inheritance or you want to forbid any changes by subclassing.
```
final class DontExtendMe { 
}
 
// Compile time error
class WontCompile extends DontExtendMe {
 
}
```

---
## Super Keyword
#### What is the super keyword?
- If a method overrides one of its superclass's methods, the overridden can be invoked through the use of the keyword super.
- The super keyword can also be used to refer to a hidden field of the super type.
- Interface default methods can be invoked using the super keyword.
- Constructors for superclasses can be invoked using the super keyword.

```
class Demonstration {
    public static void main( String args[] ) {
        (new ChildClass()).accessHiddenFields();
    }
}

class ChildClass extends ParentClass implements AnInterface {

    int counter = 0;

    public ChildClass() {
        // invoking parent class's constructor
        // using the super keyword
        super(9);
    }

    public void accessHiddenFields() {
        // accessing parent class's counter field which gets
        // hidden with the local counter field.
        super.counter++;
        counter++;
        System.out.println("sublcass counter: " + counter + " parent class counter: " + super.counter);

        // accessing the interface's default method which is hidden
        AnInterface.super.accessHiddenFields();
    }
}



interface AnInterface {

    default void accessHiddenFields() {
        System.out.println("Default method of AnInterface invoked.");
    }
}

class ParentClass {

    protected int counter;

    public ParentClass(int val) {
        this.counter = val;
    }
}
```

---
## Finalize
#### Explain the finalize() method?
The finalize() method is a protected and non-static method of the java.lang.Object class and is also sometimes called the finalizer. The finalize() method is invoked by the JVM when an object is garbage collected. A user can override the finalize() in his class to dispose of system resources or to perform cleanup tasks.
```
class MyWeirdInputStreamReaderClass {
 
    BufferedInputStream bis = null;
 
    void someReadInputMethod() throws FileNotFoundException {
        BufferedInputStream bis = new BufferedInputStream(new FileInputStream("pathToFile"));
        // ... logic to initialize bis variable but user
        // doesn't close the stream
    }
 
    // Don't use finalize in production code, bad idea!
    @Override
    protected void finalize() {
        try {
            bis.close();
        } catch (IOException io) {
            // ... log a message
        }
    }
}
```

#### Why should finalize not be used?
There are several reasons to not override the `finalize()` method which are listed below:
- It is not possible to predict when the garbage collector will invoke the `finalize()` method or if the garbage collector will even run before your Java program exits. Therefore, if you have any resource cleanup code in the `finalize()` method, it may not be invoked at all or in time to free-up resources and may cause a program crash.
- Using `finalize()` may affect portability of a program as garbage collection algorithms are JVM implementation dependent and the same program may perform well on one system and not as well on another.
- Performance may be negatively impacted when using finalizers as JVM executes more number of operations when constructing and destroying objects with non-empty finalizers.
- If a finalizer throws an exception, the finalization process is canceled, and the exception is ignored, leaving the object in a corrupted state without any notification.

#### What the alternatives to finalizing objects?
Some possibilities to finalizing objects are:
- The `try-with-resources` idiom can be used to clean up objects. This requires implementing the `AutoCloseable` interface.
- Using a `PhantomReference` to perform cleanup when object is garbage collected
- Using `Cleaner` class to perform cleanup actions.
- Implement a `close()` method, which does the cleanup and document that the method be called.

#### Explain object resurrection?
When the JVM's Garbage Collector is eventually about to remove an unused object, the object's `finalize()` method is invoked. But, if we re-create a reference to the object again in the object's own `finalize()` method, the object becomes live again. The about to be garbage collected object, now suddenly has a reference to it and the JVM will refrain from removing it. Metaphorically, the object has been resurrected from death
```
import java.util.HashSet;

class Demonstration {
  
    static HashSet<UsefulObjectClass> immortals = new HashSet<>();  
  
    public static void main( String args[] ) throws InterruptedException {

        UsefulObjectClass obj = new UsefulObjectClass(immortals);
        obj.printName();
        obj = null;

        Runtime.getRuntime().gc();

        // Sleep the main thread so that the garbage collector thread performs finalization
        Thread.sleep(1000);

        if (immortals.size() == 1) {
            System.out.println("Useful object saved from garbage collection.");
        }

        System.out.println("exiting");      
    }
}

class UsefulObjectClass {

    HashSet<UsefulObjectClass> immortals;

    public UsefulObjectClass(HashSet<UsefulObjectClass> immortals) {
        this.immortals = immortals;
    }

    @Override
    public void finalize() {
        System.out.println("I am being finalized.");
        immortals.add(this);
    }

    public void printName() {
        System.out.println("Hi, I am a useful object.");
    }
}
```

#### How many times does JVM invoke the `finalize()` method on an object?
Java invokes the finalizer on an object at most one time. Even if the object is resurrected in the finalize method, it'll not have `finalize` invoked on it the next time it becomes garbage eligible.

With the release of JDK 9 `finalize()` has been deprecated. Deprecation does not necessarily mean removal or future removal. It is an indication used to note that the annotated element should (if possible) be avoided and may potentially be removed in future releases of the Java platform.