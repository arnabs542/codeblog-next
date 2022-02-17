---
title: 'Inheritance'
type: 'topic'
section: 'Interview Questions'
course: 'Core Java'
tags:
- java
---
## Inheritance
#### What is inheritance?
In object-oriented programming, inheritance enables new objects to take on the properties of existing objects. A class that is used as the basis for inheritance is called a superclass or base class. A class that inherits from a superclass is called a subclass or a derived class.

#### What are the benefits of inheritance?
The idea of inheritance is simple but powerful: When you want to create a new class and there is already a class that includes some of the code that you want, you can derive your new class from the existing class. In doing this, you can reuse the fields and methods of the existing class without having to write and debug them yourself. Furthermore, inheritance allows for improved code structuring thus increasing readability and maintainability.

In summary code reusability is the prime benefit of inheritance.

#### What is polymorphism? Can you give an example?
Poly means many and morph means shape or form. Polymorphism is thus, the ability in programming to present the same interface for differing underlying forms or data types. Polymorphism is when you can treat an object as a generic version of something, but when you access it, the code determines which exact type it is and calls the associated code. The beauty of polymorphism is that code working with different classes does not need to know which class it is using since they’re all used the same way. Polymorphism is used to make applications more modular and extensible. Instead of messy conditional statements describing different courses of action, you create interchangeable objects that you select based on your needs. That is the basic goal of polymorphism.

The classic textbook example of polymorphism is a `Shape` class. We derive `Circle`, `Triangle`, and `Rectangle` classes from the parent class `Shape`, which exposes an abstract method `draw()`. The derived classes provide their custom implementations for the `draw()` method. Now it is very easy to render the different types of shapes all contained within the same array by calling the `draw()` method on each object. This saves us from creating separate draw methods for each shape e.g. `drawTriangle()`, `drawCircle()` etc.
```
class Demonstration {
    public static void main( String args[] ) {
        Aircraft[] array = new Aircraft[3];
        array[0] = new BellCobraHelicopter();
        array[1] = new Boeing747();
        array[2] = new Falcon9Rocket();
      
        for(Aircraft aircraft : array){
          aircraft.fly();
        }
    }
}

abstract class Aircraft {

    public abstract void fly();
}

class BellCobraHelicopter extends Aircraft {

    public void fly() {
        System.out.println("chopper away ..");
    }
}

class Boeing747 extends Aircraft {

    public void fly() {
        System.out.println("Boeing takes off.");
    }
}

class Falcon9Rocket extends Aircraft {

    public void fly() {
        System.out.println("Rocket blasts off..");
    }
}
```

#### Is multiple class inheritance supported in Java?
In multiple inheritance a derived class extends or inherits from two or more classes.
Java doesn't support multiple class inheritance. A derived class can only extend a single super class.

#### Is multiple interface inheritance supported in Java?
The Java programming language supports multiple inheritance of type, which is the ability of a class to implement more than one interface. An object can have multiple types: the type of its own class and the types of all the interfaces that the class implements.

Implementing an interface is not the same as extending a class. The implementing class doesn't inherit any behavior from the interfaces, other than default methods and constants. Some developers would say implementing multiple interfaces one can simulate multiple inheritance, however, though that gets us closer to multiple inheritance it is still not true multiple inheritance as the implementing class will not inherit mutable state.

Thought of another way, interfaces allow multiple inheritance of types. Multiple inheritance allows one object to act like it belongs to several unrelated different classes at once.

#### What is the diamond problem?
Java avoids the diamond problem by disallowing multiple inheritance.
```
public abstract class Language {
 
    public abstract void sayHello();
 
}
 
public class Punjabi extends Language {
 
    String lang = "punjabi";
 
    public void sayHello() {
        System.out.println("Kiddaan");
    }
}
 
public class Marathi extends Language {
 
    String lang = "marathi";
 
    public void sayHello() {
        System.out.println("Namaskaar");
    }
}
 
public class BiLingual extends Punjabi, Marathi {
 
    public void greet() {
        super.sayHello();
    }
 
}
```
When an instance of the class BiLingual is created and the method greet is invoked, which implementation of the sayHello method should be executed? In fact, the above code will not compile because Java doesn't allow multiple inheritance, but if it did then this would an example of the inheritance diamond problem.

#### Can the diamond problem occur if we use interfaces instead of classes?
Since Java 8 interfaces are allowed to have **default methods**, which may create the diamond setup. Note that in the case of classes, only a single class can be inherited from therefore the diamond setup can never happen. With interfaces, the setup does happen, but the resulting code isn't compilable. Take a look at the following snippet where we replace classes with interfaces from the previous question.
```
class Demonstration {
    public static void main( String args[] ) {
        (new MultiLingual()).sayHello();
    }
}

interface Language {

    void sayHello();
    
}

interface Punjabi extends Language {

    String lang = "punjabi";

    default void sayHello() {
        System.out.println("O Kiddaan");
    }

}

interface Marathi extends Language {

    String lang = "Marathi";

    default void sayHello() {
        System.out.println("Namaskaar");
    }

}

class MultiLingual implements Punjabi, Marathi {

    // Must provide implementation for the sayHello
    // method, otherwise the code will not compile
    // even though both the interfaces provide 
    // default implementations
    // UNCOMMENT THE BELOW METHOD FOR SUCCESSFUL COMPILATION
    /*public void sayHello() {
        System.out.println("I forgot how to say hello in both " + Marathi.lang  + " & " + Punjabi.lang);
    }*/
}
```

The above code will only compile if we provide the definition for the sayHello method in the MultiLingual class.

Note that both the interfaces define a variable constant lang. We can easily invoke the one we intend by providing the fully qualified name to disambiguate between the two constants with the same name.

#### What will be the output of invoking the converse() method in the class Bilingual below?
```
public class Persian {
    protected void whatsUp() {
        System.out.println("che khabar?");
    }
}
 
public interface AlienLanguage {
    default void whatsup(){
        System.out.println("yada yadda, more yadda yaddda");
    }
}
 
public class Bilingual extends Persian implements AlienLanguage {
    public void converse() {
        whatsUp();
    }
}
```

Super class’s implementation of whatsUp will be invoked

**Explanation:** Any method inherited from a class or a superclass is invoked over any default method inherited from an interface.

#### In the same code is there a way we can invoke the default implementation provided in the interface for the whatsUp method?
Yes, We can invoke the interface method using `AlienLanguage.super.whatsUp()`. The code below shows how both the superclass and the interface methods are invoked.
```
class Demonstration {
    public static void main( String args[] ) {
        (new Bilingual()).converse();
    }
}


class Bilingual extends Persian implements AlienLanguage {

    public void converse() {
        // invokes superclass method
        whatsUp();
        // invokes interface's default method
        AlienLanguage.super.whatsUp();
    }
}

class Persian {

    public void whatsUp() {
        System.out.println("che khabar?");
    }
}

interface AlienLanguage {

    default void whatsUp(){
        System.out.println("yada yadda, more yadda yaddda");
    }
}
```
**Any method inherited from a class or a superclass is invoked over any default method inherited from an interface.**

#### We have similar code to the previous questions but now we are implementing multiple interfaces and extending a class too with an implementation for the sayHello method. Do you think the code will compile?
```
public interface Marathi {
 
    String lang = "marathi";
 
    default void sayHello() {
        System.out.println("Namaskaar");
    }
 
}
 
public interface Punjabi {
 
    String lang = "punjabi";
 
    default void sayHello() {
        System.out.println("O Kiddaan");
    }
 
}
 
public class Kashmiri {
 
    String lang = "kashmiri";
 
    public void sayHello() {
        System.out.println("aadaab");
    }
}
 
public class Trilingual extends Kashmiri implements Punjabi, Marathi {
 
    public void converse() {
        // invokes Kashmiri class's sayHello method
        sayHello();
 
        // invokes default implementation of the Punjabi interface
        Punjabi.super.sayHello();
 
        // invokes default implementation of the Marathi interface
        Marathi.super.sayHello();
    }
}
```
Yes, the code compiles and runs because to the compiler there's no ambiguity. The Kashmiri class's implementation of the sayHello method gets preference over the default implementations of the two interfaces for the sayHello method. Note that we have dropped the uber interface Language as in Java most cases are not a diamond but a V problem.

The bottom line is the compiler shouldn't confront any ambiguity with the way the developer sets-up the inheritance hierarchy.

#### Will the below code compile?
```
public interface Language {
    default void sayHello() {
        System.out.println("01101000 01100101 01101100 01101100 01101111 ");
    }
}
public interface Marathi extends Language{} 
public interface Punjabi extends Language {}
public class BiLingual implements Punjabi, Marathi {void converse() {sayHello();}}
```

Yes, The above code will compile and invoke the default implementation of the sayHello method in the Language interface.

#### Consider the setup below:
```
public class Language {
    static String lang = "base language";
 
    static protected void printLanguage() {
        System.out.println(lang);
    }
    protected Language sayHello() {
        System.out.println("----");
        return this;
    }
}
public class Spanish extends Language {
    static String lang = "Spanish";
    static protected void printLanguage() {
        System.out.println(lang);
    }
    protected Language sayHello() {
        System.out.println("Ola!");
        return this;
    }
}
```

What would be the outcome of the below code snippet?
```
(new Spanish()).sayHello()
```
- Ola

What would be the outcome of the below code snippet?
```
Language lg = new Spanish();
lg.sayHello();
```
- Ola

Now Imagine that the `static` `printLanguage` method is remove from the `Spanish` class, what will be printed with the snippet below?
```
Spanish.printLanguage();
```
- base language

#### Consider the class setup below:
```
public interface Vehicle {
    default void whatAmI() {
        System.out.println("I am a vehicle");
    }
}
public interface SevenSeater extends Vehicle {}
 
public interface SUV extends Vehicle {
    default void whatAmI() {
        System.out.println("I am a SUV");
    }
}
 
public class TeslaModelX implements SUV, SevenSeater {
    public void identifyMyself() {
        whatAmI();
    }
}
```

What will be the output of (new TeslaModelX()).identifyMyself()
- I am a SUV

Even though Seven Seater interface inherits the default method from the vehicle interface but is ignored in favor of the overridden method in the SUV interface.

#### Consider the class setup below:
```
public interface SuperPower {
    void fly();
}
public class JetPack {
    public void fly() {
        System.out.println("fly away");
    }
}
public class FlyingMan extends JetPack implements SuperPower {
    void identify() {
        System.out.println("I am a flying man.");
    }
}
```
The class FlyingMan implements the interface SuperPower but doesn’t provide an implementation for it directly. Will this code snippet compile since the class JetPack has a fly method?
- Yes

Even though the class JetPack doesn’t implement the interface SuperPower but it offers a method with the same signature as the abstract method in the SuperPower interface. The FlyingMan class can use the inherited fly method to act as the implementation for the abstract method in the SuperPower interface.

#### Consider the two classes below:
```
class Parent {
    public void dummyMethod(){
 
    }
}
class Child extends Parent {
    protected void dummyMethod(){
 
    }
}
```
What is wrong with the above code?
- The overridden method dummyMethod in the Child class is specified a more restrictive access modifier than in the Parent class.

#### Takeaways
- Instance methods in base classes can be overridden by derived classes.
- If a subclass defines a static method with the same signature as a static method in the superclass, then the method in the subclass hides the one in the superclass.
- Instance methods are preferred over interface default methods.
- Static methods in interfaces are never inherited.
- Methods that are already overridden by other candidates are ignored. This circumstance can arise when supertypes share a common ancestor.
- If two or more independently defined default methods conflict, or a default method conflicts with an abstract method, then the Java compiler produces a compiler error. You must explicitly override the supertype methods.
- The access specifier for an overriding method can allow more, but not less, access than the overridden method.
You will get a compile-time error if you attempt to change an instance method in the superclass to a static method in the subclass, and vice versa.


---