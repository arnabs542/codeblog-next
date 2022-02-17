---
title: 'Patterns'
type: 'topic'
section: 'Interview Questions'
course: 'Core Java'
tags:
- java
---
## Singleton
#### Q: What is the singleton pattern?
**The singleton pattern is applied when we want to restrict instantiation of a class to single instance.** This is one of the very common Java interview questions asked. There are several finer points to consider when evaluating the different alternatives for creating singleton objects in Java. For this question, let's assume you are designing a game and want to model the Superman character through the `Superman` class. There can only be one Superman so you want to ensure that only a single instance of the class ever exists. We also need to consider if the singleton class will be accessed in a multi-threaded environment or not.
- The easiest way to create a singleton is to mark the constructor of the class private and create a private static instance of the class that is initialized inline. The instance is returned through a public getter method. The drawback of this approach is if the singleton object is never used then we have spent resources creating and retaining the object in memory. The static member is initialized when the class is loaded. Additionally, the singleton instance can be expensive to create and we may want to delay creating the object till it is actually required.

**Singleton eager initialization**
```java
public class Superman {
    private static final Superman superman =  = new Superman();
    private Superman() {
    } 
    public static Superman getInstance() {
        return superman;
    }
}
```
A variant of the same approach is to initialize the instance in a static block.

**Singleton initialization in static block**
```java
public class Superman {
    private static Superman superman; 
    static {
        try {
            superman = new Superman();
        } catch (Exception e) {
            // Handle exception here
        }
    }
    private Superman() {
    }
    public static Superman getInstance() {
        return superman;
    }
}
```
The above approach is known as **Eager Initialization** because the singleton is initialized irrespective of whether it is used or not. Also, note that we don't need any explicit thread synchronization because it is provided for free by the JVM when it loads the `Superman` class.
```java
class Demonstration {
    public static void main( String args[] ) {
        Superman superman = Superman.getInstance();
        superman.fly();
    }
}

class Superman {
    private static Superman superman = new Superman();

    private Superman() {
    }

    public static Superman getInstance() {
        return superman;
    }

    public void fly() {
      System.out.println("I am flyyyyinggggg ...");
    }
}
```

- The next approach is to lazily create the singleton object. **Lazy intialization means delaying creating a resource till the time of its first use**. This saves precious resources if the singleton object is never used or is expensive to create. First, let's see how the pattern will be implemented in a single threaded environment.

**Singleton initialization in static block**
```java
public class Superman {
    private static Superman superman;
 
    private Superman() {
    }
 
    public static Superman getInstance() {
        if (superman == null) {
            superman = new Superman();
        }
        return superman;
    }
}
```

With the above approach we are able to introduce lazy initialization, however, the class isn't thread-safe. Also, we needlessly check if the instance is null every time we invoke `getInstance()` method.

To make the above code thread safe we synchronize the `getInstance()` method and get a thread-safe class.

Thread safe
```java
public class Superman {
    private static Superman superman;
 
    private Superman() {
    }
 
    public synchronized static Superman getInstance() {
        if (superman == null) {
            superman = new Superman();
        }
        return superman;
    }
}
```
Note that the method is synchronized on the class object. The problem with the above approach is we are serializing access for threads even after the singleton object is safely initialized the first time. This slows down performance unnecessarily. The next evolution is to move the lock inside of the method.
```java
class Demonstration {
    public static void main( String args[] ) {
        Superman superman = Superman.getInstance();
        superman.fly();
        
    }
}

class Superman {
    private static Superman superman;

    private Superman() {
    }

    public synchronized static Superman getInstance() {

        if (superman == null) {
            superman = new Superman();
        }

        return superman;
    }

    public void fly() {
      System.out.println("I am flyyyyinggggg ...");
    }    
}
```
- To mitigate the issues from the previous version, we move the lock inside the `getInstance` method. We still synchronize on the class object as the method is static. Moreover, we introduce two if checks, which give this implementation the **"double checked locking"** name. The idea is that we should only serialize access to new-ing up singleton when its truly null. The two if checks allow us to skip acquiring the lock when the singleton is already initialized, thus improving performance.

The caveat here is that the singleton instance must be marked `volatile`. Remember the DCL implementation only works for Java 1.5 and later.

Double checked locking
```java
public class Superman {
    private static volatile Superman superman;
 
    private Superman() {
    }
 
    public static Superman getInstance() {
        if (superman == null) {
 
            synchronized (Superman.class) {
                if (superman == null) {
                    superman = new Superman();
                }
            }
        }
        return superman;
    }
}
```
```java
class Demonstration {
    public static void main( String args[] ) {
        Superman superman = Superman.getInstance();
        superman.fly();
    }
}

class Superman {
    private static volatile Superman superman;

    private Superman() {
    }

    public static Superman getInstance() {
        if (superman == null) {
            synchronized (Superman.class) {
                if (superman == null) {
                    superman = new Superman();
                }
            }
        }
        return superman;
    }

    public void fly() {
        System.out.println("I am flyyyyinggggg ...");
    }
}
```

- Another implementation of the singleton pattern is the **holder** or **Bill Pugh**'s singleton. The idea is to create a private nested static class that holds the static instance. The nested class `Helper` isn't loaded when the outer class `Superman` is loaded. The inner static class `Helper` is loaded only when the method `getInstance()` is invoked. This saves us from eagerly initializing the singleton instance.

```java
class Demonstration {
    public static void main( String args[] ) {
        Superman superman = Superman.getInstance();
        superman.fly();
    }
}

class Superman {
    private Superman() {
    }
    private static class Holder {
        private static final Superman superman = new Superman();
    }
    public static Superman getInstance() {
        return Holder.superman;
    }
    public void fly() {
        System.out.println("I am flyyyyinggggg ...");
    }    
}
```

#### Q: Are there ways to work around the private constructor of a singleton class and create multiple objects of it?
Certainly, there are ways to create multiple objects of a supposedly singleton class even if the singleton class is properly designed.
- Serialization
- Reflection

Both the above methods can allow malicious attackers to create more than one object of a singleton class.

#### Q: How can we use reflection to create more than one object of a singleton class?
We can use reflection to first get the declared private constructor of the singleton class, second change the accessibility of the constructor and finally invoke the constructor to get a new instance of the supposedly singleton class.

Using reflection to bypass private constructor
```java
        // Get Class object  
        Class<Superman> clazz = Superman.class;
        
        // Get constructors
        Constructor<?>[] constructors = clazz.getDeclaredConstructors();
 
        // Get the only private constructor
        Constructor<Superman> constructor = (Constructor<Superman>) constructors[0];
 
        // Make sure its no more private
        constructor.setAccessible(true);
 
        // Create as many supermen as you like
        constructor.newInstance();
```
In the runnable snippet below, we create ten instances of superman. At the end we compare two instances using the `==` operator to see it returns false, indicating that the two objects are infact distinct.
```java
import java.lang.reflect.Constructor;

class HelloWorld {
    public static void main( String args[] ) throws Exception{

        Class<Superman> clazz = Superman.class;
        Constructor<?>[] constructors = clazz.getDeclaredConstructors();
        @SuppressWarnings("unchecked") // we knows its a Superman instance
        Constructor<Superman> constructor = (Constructor<Superman>) constructors[0];
        constructor.setAccessible(true);
        Superman[] supermen = new Superman[10];
        for (int i = 0; i < 10; i++) {

            supermen[i] = constructor.newInstance();
        }

        for (int i = 0; i < 10; i++) {
            supermen[i].fly();
        }

        System.out.println(supermen[0] == supermen[9]);
    }
}

class Superman {
    private static volatile Superman superman;

    private Superman() {
    }

    public static Superman getInstance() {

        if (superman == null) {

            synchronized (Superman.class) {
                if (superman == null) {
                    superman = new Superman();
                }
            }
        }

        return superman;
    }

    public void fly() {
        System.out.println("I am flyyyyinggggg ...");
    }
}
```

#### Q: How can we use serialization to create multiple objects of a singleton class?
The prerequisite to exploiting **serialization** to create multiple objects of the singleton class requires that the singleton class should be _serializable_, i.e. it should implement the marker interface `Serializable`. If the singleton class is serializable, then it's trivial to read in the deserialized form of an existing singleton object and create multiple copies of it.

Using serialization to bypass private constructor
```java
    // Read in the already serialized superman in the byte input stream
    ByteArrayInputStream bis = new ByteArrayInputStream(supermanInBytes);
    // Read in as an object input
    ObjectInput in = new ObjectInputStream(bis)
    //  Cast the read in object as Superman
    Superman superman = (Superman) in.readObject();
```

The below snippet creates ten copies of the superman object.
```java
import java.io.*;

class Demonstration {
    public static void main( String args[] ) throws Exception {
        Superman superman = Superman.getInstance();

        ByteArrayOutputStream bos = new ByteArrayOutputStream();

        try (ObjectOutput out = new ObjectOutputStream(bos)) {
            out.writeObject(superman);
            out.flush();
        } catch (Exception e) {
            // Ignore exception, not to be done in production
        }
        byte[] supermanInBytes = bos.toByteArray();

        Superman[] supermen = new Superman[10];

        for (int i = 0; i < 10; i++) {
            ByteArrayInputStream bis = new ByteArrayInputStream(supermanInBytes);
            try (ObjectInput in = new ObjectInputStream(bis)) {
                supermen[i] = (Superman) in.readObject();

            } catch (Exception e) {
                // Ignore exception, not to be done in production
            }
        }

        for (int i = 0; i < 10; i++) {
            supermen[i].fly();
        }

        System.out.println(supermen[0] == supermen[9]);
    }
}

class Superman implements Serializable {
    private static volatile Superman superman;
    private Superman() {
    }

    public static Superman getInstance() {
        if (superman == null) {
            synchronized (Superman.class) {
                if (superman == null) {
                    superman = new Superman();
                }
            }
        }
        return superman;
    }

    public void fly() {
        System.out.println("I am flyyyyinggggg ...");
    }
}
```

#### Is there a way to fix the serialization hack for the singleton?
Serialization has a special hook it uses - a private method on the class being instantiated called `readResolve()` - which is meant to supply a hook for a class developer to ensure that they have a say in what object is returned by serialization. We can implement this method in a class that is singleton and serializable and return the singleton instance from the method. The modified `Superman` class appears below:
```java
class Superman implements Serializable {
    private static volatile Superman superman;
 
    private Superman() {
    }
 
    public static Superman getInstance() {
 
        if (superman == null) {
 
            synchronized (Superman.class) {
                if (superman == null) {
                    superman = new Superman();
                }
            }
        }
 
        return superman;
    }
 
    public void fly() {
        System.out.println("I am flyyyyinggggg ...");
    }
 
    // Instead of the object we are serializing, return the
    // singleton object
    private Object readResolve() throws ObjectStreamException {
        return superman;
    }
}
```
In the runnable snippet below, we try to deserialize ten supermen objects and then compare them in a loop using the equality `==` operator. The results are all true verifying there's a single instance of superman.
```java
import java.io.*;
class Demonstration {
    public static void main( String args[] ) {
        Superman superman = Superman.getInstance();

        ByteArrayOutputStream bos = new ByteArrayOutputStream();

        try (ObjectOutput out = new ObjectOutputStream(bos)) {
            out.writeObject(superman);
            out.flush();
        } catch (Exception e) {
            // Ignore exception, not to be done in production
        }
        byte[] supermanInBytes = bos.toByteArray();

        Superman[] supermen = new Superman[10];

        for (int i = 0; i < 10; i++) {
            ByteArrayInputStream bis = new ByteArrayInputStream(supermanInBytes);
            try (ObjectInput in = new ObjectInputStream(bis)) {
                supermen[i] = (Superman) in.readObject();

            } catch (Exception e) {
                // Ignore exception, not to be done in production
            }
        }

        Superman previousSuperman = supermen[0];
        for (int i = 1; i < 10; i++) {
            System.out.println("superman[" + (i - 1) + "] == superman[" + i + "] : " + (previousSuperman == supermen[i]));
        }
    }
}

class Superman implements Serializable {
    private static volatile Superman superman;

    private Superman() {
    }

    public static Superman getInstance() {

        if (superman == null) {

            synchronized (Superman.class) {
                if (superman == null) {
                    superman = new Superman();
                }
            }
        }

        return superman;
    }

    public void fly() {
        System.out.println("I am flyyyyinggggg ...");
    }

    // Instead of the object we are serializing, return the
    // singleton object
    private Object readResolve() throws ObjectStreamException {
        return superman;
    }
}
```

#### What is the best approach to implement a singleton class?
The best way to implement a singleton as per Josh Blosch's is to use an enum type for the singleton. Because Java ensures that only a single instance of an enum is ever created, the singleton class implemented via enums is safe from reflection and serialization attacks.
```java
public enum EnumSuperman {
    INSTANCE;
    private final String name = "Clark Kent";
 
    public void fly() {
        System.out.println("I am flyyyyinggggg ...");
    }
}
```
Note that enums can't be reflectively created nor are enums prone to serialization attacks. The following snippet show implementing a singleton using an enum.
```java
class Demonstration {
    public static void main( String args[] ) {
        Superman superman = Superman.INSTANCE;
        superman.fly();
    }
}

enum Superman {
    INSTANCE;

    private final String name = "Clark Kent";
    private String residence = "USA";

    public void fly() {
        System.out.println("I am flyyyyinggggg ...");
    }
}
```
In the below snippet we make the enum serializable and then try to create multiple objects of it. Note that there's no `readResolve()` method added to the `Superman` enum which we did in the previous question to avoid the serialization attack. We create ten supermen and compare them to find out that all of them are in fact the same object. Trying to create an enum instance using reflection will result in an `InstantiationException` exception.

```java
import java.io.*;

class Demonstration {
    public static void main( String args[] ) {
        Superman superman = Superman.INSTANCE;
        ByteArrayOutputStream bos = new ByteArrayOutputStream();

        try (ObjectOutput out = new ObjectOutputStream(bos)) {
            out.writeObject(superman);
            out.flush();
        } catch (Exception e) {
            // Ignore exception, not to be done in production
        }
        byte[] supermanInBytes = bos.toByteArray();

        Superman[] supermen = new Superman[10];

        for (int i = 0; i < 10; i++) {
            ByteArrayInputStream bis = new ByteArrayInputStream(supermanInBytes);
            try (ObjectInput in = new ObjectInputStream(bis)) {
                supermen[i] = (Superman) in.readObject();

            } catch (Exception e) {
                // Ignore exception, not to be done in production
            }
        }

        Superman previousSuperman = supermen[0];
        for (int i = 1; i < 10; i++) {
            System.out.println("superman[" + (i - 1) + "] == superman[" + i + "] : " + (previousSuperman == supermen[i]));
        }

    }
}
enum Superman implements Serializable {

    INSTANCE;

    private final String name = "Clark Kent";

    public void fly() {
        System.out.println("I am flyyyyinggggg ...");
    }
}
```


---
## Builder
#### Q: What is the Builder pattern?
Builder is one of the most common creational patterns out there. Usually, when a class evolves it adds parameters to its existing constructors and creates a whole slew of new constructors. Eventually, a class will end up with a number of very similar constructors that differ in the number of their parameters.
```java
class SomeClass { 
    // telescoping constructors
    SomeClass() { } 
    SomeClass(param1) { } 
    SomeClass(param1, param2) { } 
    SomeClass(param1, param2, param3) { } 
    SomeClass(param1, param2, param3, param4) { } 
}
```
The list of constructors starts to resemble a telescope and the pattern is called telescoping constructors. The pattern reduces readability and increases the chance of error by the consumers of the class.

The builder pattern's idea is instead of making the desired object directly, the client calls a constructor (or static factory) with all of the required parameters and gets a builder object. Then the client calls setter-like methods on the builder object to set each optional parameter of interest. Finally, the client calls a parameterless build method to generate the object. Let's see an example to better understand the concept.

Imagine we have a class Burger that represents a burger a customer orders. The Burger class instantiation requires at a minimum of a bun and a patty object. Thereafter the burger can have other optional parameters that may or may not be provided at instantiation time. Let's see how the class looks before applying the builder pattern.

Before applying builder pattern
```java
    class Burger {
 
        private final Bun bun;
        private final Patty patty;
 
        private Collection<Veggies> veggies;
        private Dressing dressing;
        private boolean isSpicy;
        private boolean wellDone;
 
        // Constructs the simplest burger
        public Burger(Bun bun, Patty patty) {
 
        }
 
        // Constructs a burger with dressing
        public Burger(Bun bun, Patty patty, Dressing dressing) {
 
        }
 
        // Constructs a burger with dressing
        public Burger(Bun bun, Patty patty, Dressing dressing, List<Veggies> veggies) {
 
        }
 
        // Constructs a spicy burger with dressing and veggies
        public Burger(Bun bun, Patty patty, Dressing dressing, List<Veggies> veggies, 
                            boolean isSpicy) {
        }
 
        // Constructs a welldone, spicy burger with dressing and veggies
        public Burger(Bun bun, Patty patty, Dressing dressing, List<Veggies> veggies,
                            boolean isSpicy, boolean wellDone) { 
        }
    }
```

As you can see the class has several constructors which are all similar and differ by just one parameter. If your restaurant becomes popular you are likely to introduce more varied burgers for customers which would mean additional constructors. The way out of this mess is to use the builder pattern.

After applying builder pattern
```java
class Burger {
 
    private final Bun bun;
    private final Patty patty;
 
    private Collection<Veggies> veggies;
    private Dressing dressing;
    private boolean isSpicy;
    private boolean wellDone;
 
    static class Builder {
        private final Bun bun;
        private final Patty patty;
 
        private Collection<Veggies> veggies;
        private Dressing dressing;
        private boolean isSpicy;
        private boolean wellDone;
 
        // Builder constructor takes in the mandatory
        // fields
        public Builder(Bun bun, Patty patty) {
            this.bun = bun;
            this.patty = patty;
        }
 
        public Builder setVeggies(List<Veggies> veggies) {
            this.veggies = Collections.unmodifiableCollection(veggies);
            return this;
        }
 
        public Builder setDressing(Dressing dressing) {
            this.dressing = dressing;
            return this;
        }
 
        public Builder setSpicy(boolean spicy) {
            this.isSpicy = spicy;
            return this;
        }
 
        public Builder setWelldone(boolean wellDone) {
            this.wellDone = wellDone;
            return this;
        }
 
        public Burger build() {
            return new Burger(this);
        }
    }
 
    private Burger(Builder builder) {
        this.bun = builder.bun;
        this.patty = builder.patty;
        this.dressing = builder.dressing;
        this.veggies = builder.veggies;
        this.isSpicy = builder.isSpicy;
        this.wellDone = builder.wellDone;
    }
}
```
The trick to the builder pattern is to create a static nested class called `Builder` which becomes responsible for creating `Burger` objects. The sole constructor for the `Burger` class is marked private and takes in a single element of type `Builder`. This forces the external consumers to use the `Builder` class to create `Burger` objects. The resulting code is much more readable, pleasant and has minimal chance of introducing developer error. The usage is shown below:

Builder pattern usage
```java
        Burger.Builder builder = new Burger.Builder(new Bun(), new Patty());
        
        // A fully loaded burger
        Burger burger = builder.setDressing(Dressing.Mayonnaise)
                .setWelldone(true)
                .setSpicy(true)
                .setVeggies(Arrays.asList(Veggies.Avocado, Veggies.Onion))
                .build();
```
Code without Builder pattern
```java
import java.util.*;

class Demonstration {
    public static void main( String args[] ) {

        // A fully loaded burger
        Burger burger = new Burger(new Bun(), new Patty(),
                        Dressing.Mayonnaise, Arrays.asList(Veggies.Avocado, Veggies.Onion),
                        true, true);

        System.out.println("Burger object created without using the Builder pattern");                

    }
}

    class Burger {

        private final Bun bun;
        private final Patty patty;

        private Collection<Veggies> veggies;
        private Dressing dressing;
        private boolean isSpicy;
        private boolean wellDone;

        // Constructs the simplest burger
        public Burger(Bun bun, Patty patty) {
            this.bun = bun;
            this.patty = patty;
        }

        // Constructs a burger with dressing
        public Burger(Bun bun, Patty patty, Dressing dressing) {
            this.bun = bun;
            this.patty = patty;
            this.dressing = dressing;
        }

        // Constructs a burger with dressing and veggies
        public Burger(Bun bun, Patty patty, Dressing dressing, List<Veggies> veggies) {
            this.bun = bun;
            this.patty = patty;
            this.dressing = dressing;
            this.veggies = Collections.unmodifiableCollection(veggies);
        }

        // Constructs a spicy burger with dressing and veggies
        public Burger(Bun bun, Patty patty, Dressing dressing, List<Veggies> veggies, 
                            boolean isSpicy) {
            this.bun = bun;
            this.patty = patty;
            this.dressing = dressing;
            this.veggies = Collections.unmodifiableCollection(veggies);
            this.isSpicy = isSpicy;
        }

        // Constructs a welldone, spicy burger with dressing and veggies
        public Burger(Bun bun, Patty patty, Dressing dressing, List<Veggies> veggies,
                            boolean isSpicy, boolean wellDone) {
            this.bun = bun;
            this.patty = patty;
            this.dressing = dressing;
            this.veggies = Collections.unmodifiableCollection(veggies);
            this.isSpicy = isSpicy;
            this.wellDone = wellDone;
        }
    }

    class Bun {
}

class Patty {
}

enum Dressing {
    Mustard,
    Mayonnaise,
    Siracha,
    None
}

enum Veggies {
    Onion,
    Lettuce,
    Tomato,
    Avocado,
    None
}
```

Code using Builder pattern
```java
import java.util.*;

class Demonstration {
    public static void main( String args[] ) {
        Burger.Builder builder = new Burger.Builder(new Bun(), new Patty());

        // A fully loaded burger
        Burger burger = builder.setDressing(Dressing.Mayonnaise)
                .setWelldone(true)
                .setSpicy(true)
                .setVeggies(Arrays.asList(Veggies.Avocado, Veggies.Onion))
                .build();

         System.out.println("Burger object created using the Builder pattern");       
    }
}

class Burger {

    private final Bun bun;
    private final Patty patty;

    private Collection<Veggies> veggies;
    private Dressing dressing;
    private boolean isSpicy;
    private boolean wellDone;

    static class Builder {
        private final Bun bun;
        private final Patty patty;

        private Collection<Veggies> veggies;
        private Dressing dressing;
        private boolean isSpicy;
        private boolean wellDone;

        // Builder constructor takes in the mandatory
        // fields
        public Builder(Bun bun, Patty patty) {
            this.bun = bun;
            this.patty = patty;
        }

        public Builder setVeggies(List<Veggies> veggies) {
            this.veggies = Collections.unmodifiableCollection(veggies);
            return this;
        }

        public Builder setDressing(Dressing dressing) {
            this.dressing = dressing;
            return this;
        }

        public Builder setSpicy(boolean spicy) {
            this.isSpicy = spicy;
            return this;
        }

        public Builder setWelldone(boolean wellDone) {
            this.wellDone = wellDone;
            return this;
        }

        public Burger build() {
            return new Burger(this);
        }
    }

    private Burger(Builder builder) {
        this.bun = builder.bun;
        this.patty = builder.patty;
        this.dressing = builder.dressing;
        this.veggies = builder.veggies;
        this.isSpicy = builder.isSpicy;
        this.wellDone = builder.wellDone;
    }
}

class Bun {
}

class Patty {
}

enum Dressing {
    Mustard,
    Mayonnaise,
    Siracha,
    None
}

enum Veggies {
    Onion,
    Lettuce,
    Tomato,
    Avocado,
    None
}
```


---
## Cheat Sheet

| Pattern | Purpose |
|-|-|
| **Prototype Pattern** | Prototype pattern involves creating new objects by copying existing objects. The object whose copies are made is called the prototype. In Java the clone() method of java.lang.Object is an example of this pattern. |
| **Factory Method Pattern** | The factory method is defined as providing an interface for object creation but delegating the actual instantiation of objects to subclasses. For instance the method getInstance() of the class java.util.Calendar is an example of a factory method pattern. |
| **Abstract Factory** | The abstract factory pattern defines an interface to create families of related or dependent objects without specifying their concrete classes. The abstract factory is particularly useful for frameworks and toolkits that work on different operating systems. For instance, if your library provides fancy widgets for the UI, then you may need a family of products that work on MacOS and a similar family of products that work on Windows. |
| **Adapter Pattern** | The Adapter pattern allows two incompatible classes to interoperate that otherwise can't work with eachother. Consider the method asList() offered by java.util.Arrays as an exampe of the adapter pattern. It takes an array and returns a list. |
| **Bridge Pattern** | The bridge pattern describes how to pull apart two software layers fused together in a single class hierarchy and change them into parallel class hierarchies connected by a bridge |
| **Composite Pattern** | The pattern allows you to treat the whole and the individual parts as one. The closest analogy you can imagine is a tree. The tree is a recursive data-structure where each part itself is a sub-tree except for the leaf nodes. |
| **Decorator Pattern** | The decorator pattern can be thought of as a wrapper or more formally a way to enhance or extend the behavior of an object dynamically. The pattern provides an alternative to subclassing when new functionality is desired. A prominent example of this pattern is the java.io package, which includes several decorators. For example the BufferedInputStream wraps the FileInputStream to provide buffering capabilities. |
| **Facade Pattern** | The facade pattern is defined as a single uber interface to one or more subsystems or interfaces intending to make use of the subsystems easier |
| **Flyweight Pattern** | The pattern advocates reusing state among a large number of fine grained objects. Methods java.lang.Boolean.valueOf() and java.lang.Integer.valueOf() both return flyweight objects. |
| **Proxy Pattern** | In a proxy pattern setup, a proxy is responsible for representing another object called the subject in front of clients. The real subject is shielded from interacting directly with the clients. The java.rmi.* package contains classes for creating proxies. RMI is Remote Method Invocation. It is a mechanism that enables an object on one Java virtual machine to invoke methods on an object in another Java virtual machine. |
| **Chain of Responsibility Pattern** | In a chain of responsibility pattern implementation, the sender's request is passed down a series of handler objects till one of those objects, handles the request or it remains unhandled and falls off the chain. Multiple objects are given a chance to handle the request. This allows us to decouple the sender and the receiver of a request. The log() method of the java.util.logging.Logger class is an example of this pattern. |
| **Observer Pattern (Publisher/Subscriber)** | The pattern is formally defined as a one to many dependency between objects so that when one object changes state all the dependents are notified. All types implementing the interface java.util.EventListener are examples of this pattern. |
| **Interpreter Pattern** | The interpreter pattern converts a language's sentences into its grammar and interprets them. |
| **Command Pattern** | The pattern is defined as representing an action or a request as an object that can then be passed to other objects as parameters, allowing parameterization of clients with requests or actions. Requests can be queued for later execution or logged. Logging requests enables undo operations. Types implementing the interface java.lang.Runnable are examples of this pattern. |
| **Iterator Pattern** | An iterator is formally defined as a pattern that allows traversing the elements of an aggregate or a collection sequentially without exposing the underlying implementation. All types implementing the java.util.Iterator interface are examples of this pattern. |
| **Mediator Pattern** | The pattern is applied to encapsulate or centralize the interactions amongst a number of objects. Object orientated design may result in behavior being distributed among several classes and lead to too many connections among objects. The encapsulation keeps objects from referring to each other directly andobjects don't hold references to each other anymore. The java.util.Timer class represents this pattern where tasks may be scheduled for one-time execution, or for repeated execution at regular intervals in a background thread. |
| **Memento Pattern** | The memento pattern let's us capture the internal state of an object without exposing its internal structure so that the object can be restored to this state later. Classes implementing java.io.Serializable interface are examples of the memento pattern. |
| **State Pattern** | The state pattern encapsulates the various states a machine can be in. The machine or the context, as it is called in pattern-speak, can have actions taken on it that propel it into different states. Without the use of the pattern, the code becomes inflexible and littered with if-else conditionals. |
| **Template Method** | The template method pattern defines the skeleton or steps of an algorithm but leaves opportunities for subclasses to override some of the steps with their own implementations. Non-abstract methods of java.util.AbstractList, java.util.AbstractSet and java.util.AbstractMap are examples of this pattern. |
| **Strategy Pattern** | The pattern allows grouping related algorithms under an abstraction, which the client codes against. The abstraction allows switching out one algorithm or policy for another without modifying the client. java.util.Comparator has the method compare() which allows the user to define the algorithm or strategy to compare two objects of the same type. |
| **Visitor Pattern** | The visitor pattern allows us to define an operation for a class or a class hierarchy without changing the classes of the elements on which the operation is performed. The pattern is suitable in scenarios, where the object structure class or the classes that make up its elements don't change often but new operations over the object structure are desired. java.nio.file.FileVisitor interface has an implementation class of SimpleFileVisitor which is an example of a visitor. The interface is defined as a visitor of files. An implementation of this interface is provided to the Files.walkFileTree() methods to visit each file in a file tree. |


















---