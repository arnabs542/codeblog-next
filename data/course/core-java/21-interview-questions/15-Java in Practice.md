---
title: 'Java in Practice'
type: 'topic'
section: 'Interview Questions'
course: 'Core Java'
tags:
- java
---
## Object Creation
#### Notes on Instantiating Objects
1. **Static factory methods** should be preferred to constructors when designing classes. Designing classes this way offers more flexibility when returning objects, for instance:
    - We can return an object of a subclass of the return type.
    - We can choose not to return a new instance everytime. Singleton and flyweight patterns can be conviniently implemented using static methods to create objects.
    - Static methods can have more informative names and can reduce verbosity when dealing with generic classes

The downside of this approach is that if you make the class’s constructor private, it can’t be subclassed. Additionally, static methods returning objects may be indistinguishable from other static methods.

**Google's guava library** extensively uses this approach. For instance the library has static methods that return collections avoiding the need to invoke constructors. e.g.
```java
        // static method returns an instance of set
        Set<String> set = Sets.newHashSet();
```
2. **The Builder pattern** should be preferred when a class has several constructors taking different number of parameters.
3. **Utility classes should be made noninstantiable** by marking the default constructor private. Classes which group static methods or static fields fall into this category.
4. **Avoid needlessly creating objects**. For instance the snippet below will create 100 objects on the heap.
```java
  String s;
  for (int i = 0; i < 100; i++)
      s = new String("hello");
```
where as the below code will create just one.
```java
  String s = new String("hello");
  for (int i = 0; i < 100; i++)
      // use s in the loop
```
Similarly, the following snippet:
```java
  Boolean bool = new Boolean("true");
```
can be optimized as:
```java
        Boolean bool = Boolean.valueOf("true");
```
In the optimized version, the method `valueOf` returns the cached boolean object.

---
## Using Objects
#### Notes on Using Objects
1. Set object references to null in classes that manager their own memory to avoid memory leaks. Consider the class below:
```java
public class LeakyStack {
    private Object[] elements;
    private int size = 0;
    private static final int DEFAULT_INITIAL_CAPACITY = 16;
 
    public LeakyStack() {
        elements = new Object[DEFAULT_INITIAL_CAPACITY];
    }
 
    public void push(Object e) {
        ensureCapacity();
        elements[size++] = e;
    }
 
    public Object pop() {
        if (size == 0)
            throw new EmptyStackException();
        return elements[--size];
    }
 
    private void ensureCapacity() {
        if (elements.length == size)
            elements = Array.copyOf(elements, 2 * size + 1);
    }
}
```
The `LeakyStack` leaks memory whenever it returns an item in the `pop()` method because the corresponding slot of the `elements` array holds a reference to the returned object till it is overwritten. The fix for the method is shown below:
```java
  public Object pop() {
      if (size == 0)
          throw new EmptyStackException();
      Object object = elements[--size];
      
      return object;
  }
```
2. **WeakHashMap** may be a good data structure of choice when designing caches where an entry's lifetime in the cache is dependent on the number of references to the entry rather than other factors.
3. **Register client callbacks as weak references** if clients don't explicitly deregister them.

---
## Designing Classes
#### Notes on Class Design
1. **Avoid finalizers** as they slow down performance and run non-deterministically or may never run at all. Use `try-with-resources` or `try-with-finally` to ensure code cleanup.
2. **Overriding `equals()` method should honour** the following properties:
    - **Reflexivity**: `x.equals(x) == true`
    - **Symmetric**: `x.equals(y) == y.equals(x)`
    - **Transitivity**: `x.equals(y) == y.equals(z) == z.equals(x)`
    - **Consistent**: `x.equals(y) == x.equals(y) == x.equals(y) == ...`
    - **Non-nullity**: `x.equals(null) should equal false`
3. **Always override `hashCode()` when you override `equals()`**
4. **Overriding `hashCode()` should honor** the following properties:
    - Invoking `hashCode()` on the same object should always return the same integer.
    - If there are two objects `x` and `y` and `x.equal(y)` then `x.hashCode() == y.hashCode()`.
    - On the contray if `x` doesn't equal `y` then it isn't imperative that `x.hashCode() != y.hashCode()`.

Two objects which are equal must return the same hash code. Consider the snippet below, which deliberately randomly returns a 1 or a 0 as the hash code. The object works inconsistently with a hash set. A type with a broken `hashCode()` method will not work with hash based collections such as hashmap, hashset and hashtable.

```java
import java.util.HashSet;
import java.util.Random;
import java.util.Set;

class Demonstration {
    public static void main( String args[] ) {
        Set<FancyType> set = new HashSet<>();
        FancyType ft = new FancyType();

        set.add(ft);

        int count = 0;
        // Try to find the object in the set a 100 times
        for (int i = 0; i < 100; i++) {
            if (!set.contains(ft)) {
                count++;
            }
        }
        System.out.println("Not found in set " + count + " times.");
    }
}

class FancyType {
    static Random random = new Random(System.currentTimeMillis());
    // Incorrectly overridding the hashCode method
    @Override
    public int hashCode() {
        return random.nextInt() % 2;
    }
}
```

5. **Ideally the `toString()` method should be overridden** and contain useful information about the object.
6. **Judiciously override `clone()` method**. Consider the following issues when overriding `clone()` method:
    - Classes that want to override the `clone()` method must implement the Cloneable interface.
    - If `clone()` is being overridden in a nonfinal class, then return the object received from super.`clone()`. If all of a class’s superclasses obey this rule, then invoking super.`clone()` will eventually invoke Object’s clone method, creating an instance of the right class.
    - When overriding `clone()` make sure to return deep copies of mutable instance field objects.
    - In order to make a class cloneable, it may be necessary to remove final fields.
    - Generally the `clone()` method in Java is thought to be broken, and Josh Bloch advises against it and recommends using copy constructors or copy factories instead.
7. **Consider implementing `Comparable` interface** when designing classes. The `compareTo()` method should be reflexive, transitive and symmetric.
8. **Hide and encapsulate** implementation details as much as possible. Classes and their members should be as inaccessible as possible.
9. **Instance fields should never be public.** Making instance fields public makes the class thread-unsafe. Static constant fields however, can be public if they represent immutable objects or are primitive values.
10. **Use accessor methods instead of public fields** for public classes which are used outside of their packages. Using accessor methods allows us to change the representation behind the scenes or include additional logic when accessing a field.
    - For package private or private static classes it is ok to make instance fields public to reduce the verbosity of code.
11. **Limit mutability of classes** as immutable classes are easier to design, implement and use than mutable classes. Additionally, they are less error-prone and more secure. Immutable objects are thread-safe and can be freely shared. Following principles should be adopted to minimize a class's mutability:
    - Avoid providing setters for instance fields.
    - Mark a class as `final` so that mutability can't be introduced by subclassing.
    - Make all fields `final`.
    - Make all fields `private`.
    - Make sure fields referencing mutable objects don't escape your class. For instance, return copies of mutable objects from getters than returning object references.

One disadvantage of immutable classes is we need a new object to represent each distinct value. It may be impractical to make certain classes immutable, in that case, minimize the mutability of the class.

12. **Uses of nested classes:**
    - One common use of a static member class is as a public helper class, useful only in conjunction with its outer class.
    - Non-static member class can be used to define an Adapter that allows an instance of the outer class to be viewed as an instance of some unrelated class. For example, implementations of the Map interface typically use non-static member classes to implement their collection views, which are returned by Map’s keySet, entrySet, and values methods. Similarly, implementations of the collection interfaces, such as Set and List, typically use nonstatic member classes to implement their iterators.
    - If you declare a member class that does not require access to an enclosing instance (of the outer class), always put the static modifier in its declaration, making it a static rather than a non-static member class. If you omit this modifier, each instance will have an extraneous reference to its enclosing instance (of the outer class).
    - If each instance of the member class needs a reference to its enclosing instance, make it non-static; otherwise.
    - There are many limitations on the applicability of anonymous classes. You can’t instantiate them except at the point they’re declared. You can’t perform instanceof tests or do anything else that requires you to name the class. You can’t declare an anonymous class to implement multiple interfaces, or to extend a class and implement an interface at the same time. Clients of an anonymous class can’t invoke any members except those it inherits from its supertype.

---
## Inheritance vs Composition
#### Notes on Inheritance vs Composition
1. **Class (not interface) inheritance may be inappropriate across package boundaries** since the subclass will need to evolve alongside the superclass and is prone to breaking if the superclass undergoes changes. The resulting software is fragile and less maintainable.
2. **Composition is an alternative to inheritance**. Composition works by passing an instance of a class we intended to extend from, to an intended derived class which stores the reference in a private field. The new class offers wrapper methods which invoke corresponding methods on the contained class's object. The class whose object we pass in to the new class becomes a component of the new class and is why the approach is called composition.
3. **Inheritance violates encapsulation**. Inheritance is appropriate only in circumstances where the subclass truly is a subtype of the superclass i.e. a definite "is-a" relationship exists between the super and derived classes.
4. **Providing implementation documentation in comments and `protected` methods** as hooks make it easier for other developers to extend your class.
5. **Overrideable methods should never be invoked in the super class's constructors** as the superclass constructor runs before the subclass constructor, so the overriding method in the subclass will get invoked before the subclass constructor has run. If the overriding method depends on any initialization performed by the subclass constructor, the method will not behave as expected. Below is an example, where the constructor for class A invokes an overrideable method in class B which makes use of a field that gets initialized in the constructor of class B. The constructor of class B is invoked after the super class's constructor and results in broken logic.

```java
class Demonstration {
    public static void main( String args[] ) {
        B objB = new B();
        // Prints null instead of "Class B"
        objB.printName();
    }
}

class A {
  protected String name = null;
  public A() { 
    init();  
  }
  
  protected void init(){
    name = "class is A";
  }
  
  public void printName() {
    System.out.println(name); 
  }
}

class B extends A {
  private final String newName;
  public B() {
     newName = "Class B";   
  }
  
  @Override
  protected void init() {
    name = newName;
  } 
}
```
6. **When implementing `Cloneable` and `Serializable` interfaces for classes intended to be extended** don't invoke overridable methods in `clone()` or `readobject()` methods.
7. **Prohibit extending classes not designed and documented to be safely subclassed** by either making their constructors private or package private and providing static factories for creating instances. `final` can also be used to prevent a class from being subclassed.

---
## Interfaces vs Abstract Classes
#### Notes on Interfaces vs Abstract Classes
1. **Interface should be preferred over abstract classes** for the following reasons:
    - Existing classes can easily implement new interfaces for added functionality, however existing classes that already extend super classes can't inherit from a new class since multiple inheritance is prohibited in Java.
    - Interfaces can be used for mixin types. A mixin is a type that a class can implement in addition to its "primary type" to declare that it provides some optional behavior. For example `Comparable` interface is a mixin. Such an interface is called a mixin because it allows the optional functionality to be "mixed in" to the type’s primary functionality.
    - Hierarchy in types can be avoided using interfaces especially when the classes we are designing don't fall into neat hierarchical structures.
2. **Combine interfaces and abstract classes** to define skeletal structures that provide implementation for the interfaces. In the Collections Framework, we have `AbstractList`, `AbstractSet` etc follow this pattern. The convention is to name such classes as AbstractInterface.
3. **Abstract classes may be suitable** in scenarios where the type is expected to evolve in future. Generally, its much easier to evolve an abstract class than an interface. Once an interface has been released and widely adopted, it is nearly impossible to change it. Though, with default method being introduced in interfaces the pain is somewhat eased.
4. **Don't use interfaces to export constants**. When a class implements an interface, the interface serves as a type that can be used to refer to instances of the class. The purpose of an interface shouldn't be anything other than that. java.io.ObjectStreamConstants is one such bad interface and an anti-pattern.
5. **Use function objects for passing in strategies**. An instance of a class that exports exactly one such method is effectively a pointer to that method. Such instances are known as function objects. Note that using an anonymous class in this way will create a new instance each time the call is executed. Primary use of function pointers is to implement the Strategy pattern. To implement this pattern in Java, declare an interface to represent the strategy and a class that implements this interface for each concrete strategy. When a concrete strategy is used only once, it is typically declared and instantiated as an anonymous class.

---
## Using Generics
#### Notes on using Generics
1. **Don't use raw types as** they can cause code to fail at runtime with casting exceptions. Using raw types loses type safety and expressiveness advantages of generics. You can put any element into a collection with a raw type, easily corrupting the collection’s type invariant.
2. **Eliminate checked warnings**. If you eliminate all warnings, you are assured that your code is typesafe, which is a very good thing. It means that you won’t get a `ClassCastException` at runtime, and it increases your confidence that your program is behaving as you intended.
3. **Always use the `SuppressWarnings` annotation on the smallest scope possible.**
4. **Use Lists instead of arrays** because Lists provide greater type safety.
    - Consider the following snippet, which compiles fine but fails at runtime.
```java
class Person {} // a dummy class
// The following snippet compiles but fails at runtime
Object[] personArray = new Person[10];
personArray[0] = new Integer(0); // throws ArrayStoreException at runtime
```
On the contrary, the same code written using lists would fail at compile time. It is always preferred to catch errors at compile time than runtime.
```java
// Fails at compile time
List<Person> list = new LinkedList<>();
list.add(new Integer(5));
```
    - Arrays are covariant which means an array of type `Person` is a subtype of an array of its super class `Object` whereas this isn't true for generics. `List<Person>` isn't a subtype of `List<Object>`.
    - Arrays know and enforce their types at runtime whereas generics enforce their type constraints only at compile time (erasure).

5. **Generic arrays are illegal in Java**. It is illegal to create an array of a generic type, a parameterized type, or a type parameter because they aren't typesafe.
6. **Arrays are covariant and reified; generics are invariant and erased**. Consequently, arrays provide runtime type safety but not compile-time type safety and vice versa for generics. Generally speaking, arrays and generics don’t mix well.
7. **Use casting or object arrays when working with generic arrays**. As explained we can't do something like `T[] myGenericArray = new T[10];` however there are times where want to use a generic array e.g. the following class:
```java
public class Store<T> {
    T[] items;
}
```
There are two options to deal with generic arrays:
    - Initialize an `Object` array and cast it to the generic type.
```java
        // casting object array to generic type
        items = (T[]) new Object[size];
```
    - Instead of declaring an `T[]` array, declare an `Object[]` array and cast to generic type when retrieving objects from the array.
```java
        Object[] items = new Object[10];
        T i = (T) items[0];
```
8. **Use generic methods** instead of non-generic method that require clients to cast arguments or return types.
9. **Use bounded wildcards** to make APIs more flexible.
10. **Use producer-extends and consumer-super** paradigm when declaring input parameters.
11. **Don't use wildcards as return types from methods.**
```java
    Set<? extends Number> someMethod() {
        // ... method body
    }
```
12. **Adding bounded or unbounded wildcards as parameters can increase API flexibility.**

---
## Enums & Annotations
#### Notes on Enums & Annotations
1. **Enum types are effectively final, because they don't have accessible constructors**. Clients can neither create instances of an enum type nor extend it, there can be no instances but the declared enum constants. In other words, enum types are instance-controlled. You can think of them as generalization of singletons which are essentially single-element enums.
1. **Java’s enum types are full-fledged classes**, far more powerful than their counterparts in these other languages, where enums are essentially int values.
1. **Nest enums where appropriate**. If an enum is generally useful, it should be a top-level class; if its use is tied to a specific top-level class, it should be a member class of that top-level class.
1. **Add state to enums using fields**. To associate data with enum constants, declare instance fields and write a constructor that takes the data and stores it in the fields. Enums are by their nature immutable, so all fields should be final. They can be public, but it is better to make them private and provide public accessors. For example, consider the following enum of `Superheroes`. Each superhero has some data associated with it such as age, height, weight etc. We can add fields to represent this data and pass the values in the constructor as shown below:

```java
enum Superheroes {
    Superman(23, 200.15),
    Batman(24, 200),
    Flash(25, 150); // Flash better be thin to run that fast!
 
    int age;
    double weight;
 
    // Constructor that initializes the biodata for
    // each superhero
    Superheroes(int age, double weight) {
        this.age = age;
        this.weight = weight;
    }
}
```
```java
class Demonstration {
    public static void main( String args[] ) {
        for(Superheroes superhero : Superheroes.values()){
            System.out.println(superhero.toString() + " is " + superhero.age + " years old and weighs "+ superhero.weight + " pounds.");
        }
    }
}

enum Superheroes {
    Superman(23, 200.15),
    Batman(24, 200),
    Flash(25, 150); // Flash better be thin to run that fast!

    int age;
    double weight;

    // Constructor that initializes the biodata for
    // each superhero
    Superheroes(int age, double weight) {
        this.age = age;
        this.weight = weight;
    }
}
```
5. **Avoid using enum constants as switch values for methods defined within the enum**. Cotinuing with our enum example you may be tempted to write a method which returns the super power of a superhero as follows:

```java
enum Superheroes {
 
    Superman(23, 200.15),
    Batman(24, 200),
    Flash(25, 150); // Flash better be thin to run that fast!
 
    int age;
    double weight;
 
    // Constructor that initializes the biodata for
    // each superhero
    Superheroes(int age, double weight) {
        this.age = age;
        this.weight = weight;
    }
 
    // Method within enum that switches
    // on enum constants. Bad design!
    String getSuperpower() {
        switch (this) {
            case Flash:
                return "running";
            case Batman:
                return "not much";
            case Superman:
                return "flying";
        }
        return "";
    }
}
```
The right way is to declare an abstract method that is then implemented by each enum constant. Thus any new constants added to the enum in the future are also forced to implement the abstract method.
```java
enum Superheroes implements Comparable<Superheroes> {
 
    Superman(23, 200.15) {
        String getSuperpower() {
            return "flying";
        }
    },
    Batman(24, 200) {
        String getSuperpower() {
            return "not much";
        }
    },
    Flash(25, 150) {
        String getSuperpower() {
            return "running";
        }
    }; // Flash better be thin to run that fast!
 
    private int age;
    private double weight;
 
    // Constructor that initializes the biodata for
    // each superhero
    Superheroes(int age, double weight) {
        this.age = age;
        this.weight = weight;
    }
 
    // Returns a string describing the superpower
    // of a hero
    abstract String getSuperpower();
}
```
The overriding method provided by each constant is called constant specific method and the method appears in what is called as the constant-specific class body.
```java
class Demonstration {
    public static void main( String args[] ) {
        for (Superheroes superheroes : Superheroes.values()) {
            System.out.println(superheroes.getSuperpower());
        }
    }
}

enum Superheroes implements Comparable<Superheroes> {

    Superman(23, 200.15) {
        String getSuperpower() {
            return "flying";
        }
    },
    Batman(24, 200) {
        String getSuperpower() {
            return "fights crime";
        }
    },
    Flash(25, 150) {
        String getSuperpower() {
            return "running";
        }
    }; // Flash better be thin to run that fast!

    private int age;
    private double weight;

    // Constructor that initializes the biodata for
    // each superhero
    Superheroes(int age, double weight) {
        this.age = age;
        this.weight = weight;
    }

    // Returns a string describing the superpower
    // of a hero
    abstract String getSuperpower();
}
```
6. **Enum types have an automatically generated valueOf(String) method** that translates a constant’s name into the constant itself.
7. **Use enums whenever you need a fixed set of constants**. This includes natural enumerated types such as the planets, the days of the week, and the list of Marvel superheros. But it can also include **other sets for which you know all the possible values at compile time** for example choices on a menu, operation codes, and command line flags.
8. **Ordinal is the numerical position (starting from zero) of each enum constant in its type and shouldn't be depended on.** Any changes or reordering of enum constants can change the ordinal value. For example, below is bad code design:

```java
enum Superheroes {
    Superman,
    Batman,
    Flash
}
 
// Never do this
Superheroes favHero = Superheroes.Flash;
 
if(favHero.ordinal() == 2){
    System.out.println("Favourite hero is Flash !");
}
```
```java
class Demonstration {
    public static void main( String args[] ) {
        Superheroes favHero = Superheroes.Flash;

        if(favHero.ordinal() == 2){
            System.out.println("Favourite hero is Flash !");
        }
    }
}

enum Superheroes {
    Superman,
    Batman,
    Flash
}
```
9. **Use `EnumSet` instead of bit fields** to efficiently store enum values of the same type. Methods in an EnumSet are implemented using arithmetic bitwise operations and therefore all the basic operations are executed in a constant time. The enum set is implemented by two classes and the choice is made based on the number of elements in the enum.
    - `RegularEnumSet` If the underlying enum type has 64 or fewer element the entire EnumSet is represented with a single long.
    - `JumboEnumSet` For enum type with greater than 64 entries the JumboEnumSet is used which is implemented with an array of long.

An example is given below.
```java
import java.util.EnumSet;

class Demonstration {
    public static void main( String args[] ) {
        // Efficient storage of enums
        EnumSet<Superheroes> heroes = EnumSet.allOf(Superheroes.class);

        if (heroes.contains(Superheroes.Batman) &&
                heroes.contains(Superheroes.Flash) &&
                heroes.contains(Superheroes.Superman)) {
            System.out.println("Set contains all the heroes");
        }
    }
}

enum Superheroes {
    Superman,
    Batman,
    Flash
}
```
10. **Use `java.util.EnumMap` where applicable and don't use an enum constant's ordinal value as key.** `EnumMap` is a very fast Map implementation designed for use with enum keys. Going back to our superheroes example, imagine a scenario where you want to remember a boolean value per superhero, say maybe to indicate if the character is alive in the game you are designing. There are two ways to do it:

Not preferred
```java
        Map<Integer, Boolean> alive = new HashMap<>();
        // We use the ordinal of the enum constant as the
        // key, which is a bad idea
        alive.put(Superheroes.Batman.ordinal(), false);
```
The preferred way is as follows:

Preferred way
```java
        EnumMap<Superheroes, Boolean> alive = new EnumMap<>(Superheroes.class);
        alive.put(Superheroes.Batman, true);
```
The bottom line is never to use an enum constant's ordinal as the key to index into a map or an array.
```java
import java.util.*;

class Demonstration {
    public static void main( String args[] ) {
        // NOT PREFERRED
        Map<Integer, Boolean> alive_unpreferred = new HashMap<>();
        // We use the ordinal of the enum constant as the
        // key, which is a bad idea
        alive_unpreferred.put(Superheroes.Batman.ordinal(), true);


        EnumMap<Superheroes, Boolean> alive = new EnumMap<>(Superheroes.class);
        alive.put(Superheroes.Batman, true);
    }
}

enum Superheroes {
    Superman,
    Batman,
    Flash
}
```
11. **Enums can't be extended and each enum implicitly extends `java.lang.Enum`. However, enums can implement interfaces.** To provide flexibility, we can have an enum implement an interface and refer to enum objects using the interface. This allows other clients to extend from the same interface and define their own enums that then can be referred to by the same uber interface. Consider the setup below:

```java
interface Hero {
    void applySuperpower();
}
 
enum Superheroes implements Hero {
    Superman {
        public void applySuperpower() {
            System.out.println("fly away");
        }
    },
    Batman {
        public void applySuperpower() {
            System.out.println("fight crime");
        }
    },
    Flash {
        public void applySuperpower() {
            System.out.println("sprint ");
        }
    }
}
```
Now say we write a method, which exercises the `applySuperpower` for all the superheroes:
```java
    void ApplySuperpowers(Hero... heros) {
        for (Hero hero : heros) {
            hero.applySuperpower();
        }
    }
```
Because we extended the `Superheroes` enum from the interface Hero we can reuse the method `ApplySuperpowers` with any other enum that also implements the interface Hero. Let's say we define an enum of `IndianSuperheroes` we can have it implement the interface Hero and interchange the `Superheroes` enum with `IndianSuperheroes` where ever the code refers to an enum instance using the interface.
```java
enum IndianSuperheroes implements Hero {
    Shaktimaan {
        public void applySuperpower() {
            System.out.println("seven chakras of kundalini");
        }
    },
 
    Aryamaan {
        public void applySuperpower() {
            System.out.println("chandrahaas");
        }
    },
    Captain_Vyom {
        public void applySuperpower() {
            System.out.println("yoga");
        }
    }
}
```
```java
class Demonstration {
    public static void main( String args[] ) {
        // Invoking the method for Superheroes
        ApplySuperpowers(Superheroes.values());
        
        // Invoking the same method for IndianSuperheroes
        ApplySuperpowers(IndianSuperheroes.values());
    }

    static void ApplySuperpowers(Hero... heros) {
        for (Hero hero : heros) {
            hero.applySuperpower();
        }
    }
}

interface Hero {
    void applySuperpower();
}

enum IndianSuperheroes implements Hero {
    Shaktimaan {
        public void applySuperpower() {
            System.out.println("seven chakras of kundalini");
        }
    },

    Aryamaan {
        public void applySuperpower() {
            System.out.println("chandrahaas");
        }
    },
    Captain_Vyom {
        public void applySuperpower() {
            System.out.println("yoga");
        }
    }
}

enum Superheroes implements Hero {
    Superman {
        public void applySuperpower() {
            System.out.println("fly away");
        }
    },
    Batman {
        public void applySuperpower() {
            System.out.println("fight crime");
        }
    },
    Flash {
        public void applySuperpower() {
            System.out.println("sprint ");
        }
    }
}
```
12. **Use annotations** instead of naming patterns to indicate that some program elements require special treatment by a tool or framework. For instance one may use a `@Test` annotation instead of prefixing each method name with the literal test.
13. **Don't hesitate to use predefined annotations.**
14. **Using `@Override` can help catch errors at compile time**, especially when overriding methods for abstract classes.
15. **Prefer marker interfaces to marker annotations** as its easier to catch errors at compile time. The chief advantage of marker annotations over marker interfaces is that it is possible to add more information to an annotation type after it is already in use, by adding one or more annotation type elements with defaults

---
## Method Design
#### Notes on Method Design
1. **For any publicly exported method always validate the input parameters to the method.** For private or package private methods, asserts should suffice. Validation may not make sense if its is too expensive or is performed implicitly during computation. Additionally, always document the restrictions on input parameters for methods and constructors.
2. **It is critical to check the validity of constructor parameters to prevent the construction of an object that violates its class invariants.**
3. **Create copies of mutable parameters passed in to constructors of immutable classes.** An attacker can change a passed-in mutable object after invoking the constructor. Consider the following example where the `DefensiveClass` receives a collection of cryptographic keys in its constructor. The class incorrectly saves a reference to the collection which can be modified outside of the `DefensiveClass` as shown in the runnable snippet.

```java
class DefensiveClass {
    List<String> cryptoKeys;
 
    // Bad design!
    DefensiveClass(List<String> cryptoKeys) {
        this.cryptoKeys = cryptoKeys;
    }
 
    void printKeys() {
        for (String key : cryptoKeys) {
            System.out.println(key);
        }
    }
}
```
The suggestion isn't limited to only immutable classes in fact anytime you write a method or constructor that assigns a client-provided object to an internal data structure there exists the possibility of the client changing the passed-in object at a later time. The fix for the `DefensiveClass` class is to create a copy of the list of passed-in keys to the constructor.
```java
class DefensiveClassFixed { 
    List<String> cryptoKeys;
    DefensiveClassFixed(List<String> cryptoKeys) {
        this.cryptoKeys = new ArrayList<>(cryptoKeys.size());
        // Make a copy of the passed-in list. Remember to make
        // a deep copy if a list of objects is passed-in
        for (String key : cryptoKeys)
            this.cryptoKeys.add(key);
    }
 
    void printKeys() {
        for (String key : cryptoKeys) {
            System.out.println(key);
        }
    }
}
```
```java
import java.util.*;

class Demonstration {
    public static void main( String args[] ) {
        List<String> keys = Arrays.asList("A", "B", "C");
        
        // Broken
        DefensiveClass defensiveClass = new DefensiveClass(keys);
        defensiveClass.printKeys();
        ((List<String>) keys).set(0, "Z");
        defensiveClass.printKeys();
        System.out.println("\n\n\n");
        ((List<String>) keys).set(0, "A");

        // Fixed
        DefensiveClassFixed defensiveClassFixed = new DefensiveClassFixed(keys);
        defensiveClassFixed.printKeys();
        ((List<String>) keys).set(0, "Z");
        defensiveClassFixed.printKeys();
    }
}

class DefensiveClassFixed {

    List<String> cryptoKeys;

    DefensiveClassFixed(List<String> cryptoKeys) {
        this.cryptoKeys = new ArrayList<>(cryptoKeys.size());

        // Make a copy of the passed-in list. Remember to make
        // a deep copy if a list of objects is passed-in
        for (String key : cryptoKeys)
            this.cryptoKeys.add(key);
    }

    void printKeys() {
        for (String key : cryptoKeys) {
            System.out.println(key);
        }
    }
}

class DefensiveClass {

    List<String> cryptoKeys;

    // Bad design!
    DefensiveClass(List<String> cryptoKeys) {
        this.cryptoKeys = cryptoKeys;
    }

    void printKeys() {
        for (String key : cryptoKeys) {
            System.out.println(key);
        }
    }
}
```

4. **Don't return a reference to an internal field** that is mutable and can be modified by an untrusted client. This is a defensive measure against attacks. Defensive copying may be unneeded if the class trusts its clients or copying is expensive. Continuing with our `DefensiveClass` we can write a getter for the `cryptoKeys` as follows:

Bad Design
```java
    List<String> getKeys() {
        return cryptoKeys;
    }
```
The fix is to return an unmodifiable view as follows:

Fixed
```java
    List<String> getKeys() {
        // Return an unmodifiable view to the internal data-structure
        return Collections.unmodifiableList(cryptoKeys);
    }
```
5. **Avoid defining methods with more than four parameters.** This suggestion comes directly from Joshua Bloch's Effective Java. As the number of parameters to a method increase, it increases the mental burden on the developer to remember the right ones to pass in and can result in errors.
6. **Define parameter types using interfaces rather than classes.** Using a class instead of an interface, restricts the client to a particular implementation. Additionally the client may be forced to perform an unnecessary and potentially expensive copy operation if the input data happens to exist in some other form.

Badly designed method parameters
```java
    void print(ArrayList<String> list) {
        // ... method body
    }
```
Imagine how a client using a `Set<String>` will be forced to copy the contents of the set into an `ArrayList` before invoking the method.
```java
        Set<String> set = new HashSet<>(cryptoKeys);
        // copy before invoking print method
        ArrayList<String> tempArrayList = new ArrayList<>(set);
        print(tempArrayList);
```
The right design is to use interfaces as parameter types for methods where possible

Correctly designed method parameters
```java
    void print(Collection<String> collection) {
        // ... method body
    }
    // The client with a set of strings can now invoke the method
    Set<String> set = new HashSet<>(cryptoKeys);
    print(set);    
```
7. **Exercise caution when overloading methods** as it can produce results not anticipated by the programmer. The overloaded method to be invoked is decided at compile time and not runtime. The runtime type of an object has no effect on which overloading is executed in fact the method to be invoked is chosen at compile time, based entirely on the compile time types of the parameters. Consider the method below:
```java
    void print(Set<String> collection) {
        System.out.println("Method deals with sets only");
    }
 
    void print(Collection<String> collection) {
        System.out.println("Method deals with collections only");
    }
```
Which `print()` method would be invoked for the following snippet:
```java
        Set<String> set = new HashSet<>(keys);
        Collection<String> ref = set;
        // Which print method is invoked?
        print(ref);
```
Even though the runtime type of the variable `ref` is `Set` but the compile time type is `Collection` and the method matching is performed at compile time therefore the `print` method which takes in a collection type is invoked when the program is run.

```java
import java.util.*;

class Demonstration {
    public static void main( String args[] ) {
        Set<String> set = new HashSet<>(Arrays.asList("hello", "world"));
        Collection<String> ref = set;
        print(ref);
    }

    static void print(Set<String> collection) {
        System.out.println("Method deals with sets only");
    }

    static void print(Collection<String> collection) {
        System.out.println("Method deals with collections only");
    }    
}
```
8. **In case of an overridden method, the correct version to invoke is decided at runtime contrary to overloaded methods.** The method to invoke is decided on the runtime type of the object rather than the compile time type. This is opposite to what happens in the case of overloaded methods.

Consider the below classes:
```java
class IamSuper {
    void sayMyName() {
        System.out.println("I am the super class.");
    }
}
 
class IamDerived extends IamSuper { 
    @Override
    void sayMyName() {
        System.out.println("I am the derived class.");
    }
}
```
When we run the following snippet, the derived class's `sayMyName()` method is invoked even though at compile time the variable referencing the object is of super type.
```java
  IamDerived derivedObj = new IamDerived();
  IamSuper superObj = derivedObj;
  superObj.sayMyName();
```
```java
class Demonstration {
    public static void main( String args[] ) {
        IamDerived derivedObj = new IamDerived();
        IamSuper superObj = derivedObj;
        superObj.sayMyName();      
    }
}


class IamSuper {

    void sayMyName() {
        System.out.println("I am the super class.");
    }
}

class IamDerived extends IamSuper {

    @Override
    void sayMyName() {
        System.out.println("I am the derived class.");
    }
}
```

9. **Avoid overloading methods with multiple signatures that have the same number of parameters** as it causes confusion. Avoid creating overloaded methods which can accept same set of parameters by the addition of casts. Rules for determining which overloaded method is selected are extremely complex and not all consumers of your API may understand them well enough to discern which overloaded method will be invoked and can be a cause of confusion.
10. **Exercise caution when using the varargs facility in performance critical environments.** Every invocation of a varargs method internally causes an array to be allocated and initialized.
11. **Return empty arrays or Collections but not `null` from methods.** If the developer invoking the method as a client forgets to check for the null case, it will cause his or her code to fail with a null pointer exception. For instance the below method is a bad design

```java
    // Method returns all the numbers that are
    // divisible by 2 from 0 to n
    List<Integer> divisibleByTwo(int n) { 
        // Bad design
        if (n < 0) return null;
        List<Integer> list = new ArrayList<>();
        for (int i = 0; i <= n; i++) {
            if (i % 2 == 0)
                list.add(i);
        }
        return list;
    }
```
In the above snippet, if an unsuspecting user inputs a negative integer he'll be returned null when he may write code expecting an empty list. For example, the following snippet would fail with null pointer exception:
```java
  List<Integer> result = divisibleByTwo(-4);
  if(result.size() > 0){
      // ... do some processing
  }
```
```java
import java.util.*;

class Demonstration {
    public static void main( String args[] ) {
        List<Integer> result = divisibleByTwo(-4);
        // The if check will throw NullPointerException
        if(result.size() > 0){
            // ... do some processing
        }
    }

    // Method returns all the numbers that are
    // divisible by 2 from 0 to n
    static List<Integer> divisibleByTwo(int n) {

        if (n < 0) return null;

        List<Integer> list = new ArrayList<>();

        for (int i = 0; i <= n; i++) {
            if (i % 2 == 0)
                list.add(i);
        }

        return list;
    }    
}
```
12. **Use doc comments extensively for documentation.** Consider doc comments mandatory for every exported classes, interfaces, methods, fields, constructors etc. Javadoc is the most effective way to document your API.

A doc comment takes the following form and a utility called javadoc creates HTML documentation from the Java source code using the doc comments.
```java
  /**
  * This is an example doc comment
  */
  void dummyMethod() {

  }
```

---
## General Best Practices
1. **Strive to minimize the scope of a local variable**. The best way for minimizing the scope of a local variable is to declare it where it is first used.

Bad Practice
```java
        // Variable not used immediately but declared
        Random random = new Random(System.currentTimeMillis());
 
        for (int i = 0; i < 10; i++) {
            // ... for body
        }
 
        for (int i = 0; i < 10; i++) {
            // ... for body
        }
 
        // ... more processing
        // .
        // .
        // .
        // ...
 
        if (random.nextBoolean()) {
            // ... if body
        }
```
Better Practice
```java
        for (int i = 0; i < 10; i++) {
            // ... for body
        }
 
        for (int i = 0; i < 10; i++) {
            // ... for body
        }
 
        // ... more processing
        // .
        // .
        // .
        // ...
       
        // Variable declared closer to where it gets used
        Random random = new Random(System.currentTimeMillis());
        if (random.nextBoolean()) {
            // ... if body
        }
```
2. **Initialize every local variable when it is being declared.** If you don’t yet have enough information to initialize a variable sensibly, postpone declaring it. One exception to this rule can be a `try-catch` statements. If a variable is initialized by a method that throws a checked exception, it must be initialized inside a try block. If the value must be used outside of the try block, then it must be declared before the try block, where it cannot yet be initialized with a sensible value.
```java
        // Initializing to null because the object
        // gets initialized inside the try-catch block
        BufferedReader bufferedReader = null;
 
        try {
            bufferedReader = new BufferedReader(new FileReader("path_to_file"));
        } catch (IOException ioe) {
 
        } finally {
            // variable is used outside the try block    
            if (bufferedReader != null)
                bufferedReader.close();
        }
```
3. **Methods should be kept small and focused.** A method should implement a single block of functionality.
4. **For-each loops should be preferred to for loops when iterating over collections.** If a custom type consists of a group of elements, consider having it implement `Iterable` interface.
5. **Don't reinvent the wheel.** Utilize existing libraries for needed functionality. At the very least, familiarize yourself with the `java.lang`, `java.util` and to a lesser extent `java.io`
6. **Don't use `float` and `double` types where exact results are required.** These types are designed primarily for scientific and engineering calculations. They perform binary floating-point arithmetic, which was carefully designed to furnish accurate approximations quickly over a broad range of magnitudes. The float and double types are particularly a bad choice for monetary calculations because it is impossible to represent 0.1 (or any other negative power of ten) as a float or double exactly. Use `BigDecimal`, `int`, or `long` instead.
7. **Applying `==` operator on boxed primitives is almost always wrong.** When your program compares two boxed primitives with the `==` operator, it does an identity comparison, when you really want is a comparision of the values they two objects hold.
8. **Trying to autobox a `null` object results in a `NullPointerException`**
```java
        // The following lines will throw
        // a NullPointerException
        Long nullLong = null;
        long primLong = nullLong;
```
9. **Mixing primitive types and their corresponding object types can result in unintended boxing/unboxing operations causing decreased performance.** Consider the snippet below:
```java
   public static void main(String[] args) {
       Long sum = 0L;
       
       for (long i = 0; i < Integer.MAX_VALUE; i++) {
           // i is boxed to Long each time for the
           // below 
           sum += i;
       }
       
       System.out.println(sum);
   }
```
The program compiles without error or warning, and the variable is repeatedly boxed and unboxed, causing performance degradation. When a program boxes primitive values, it can result in costly and unnecessary object creations.

10. **Resist the temptation to represent objects as strings when appropriate data types exist or can be written.** For example don't use a string literal "true" to represent a boolean value.

Bad Practice
```java
        // Don't do this, instead use a boolean
        String value = "true";
```
11. **Use `StringBuilder` to concatenate strings.** Using the string concatenation operator repeatedly to concatenate strings will cause string objects to be copied repeatedly because strings are immutable. Don't mistkae the `+` when applied to two strings as appending the second string to the first, instead both are copied into a third new string object.

Bad Practice
```java
        String naturalNums = "";
 
        for (int i = 0; i < Integer.MAX_VALUE; i++) {
            // Don't concatenate using the + operator
            // instead use StringBuilder object
            naturalNums += " " + i;
        }
```
12. **Favor the use of interfaces rather than classes to refer to objects.** If appropriate interface types exist, then parameters, return values, variables, and fields should all be declared using interface types. This allows decoupling code from implementation. The only time we really need to refer to an object’s class is when new-ing up an object. Implementation classes can be switched out much more easily with this approach. Though, it is entirely appropriate to refer to an object by a class rather than an interface if no appropriate interface exists or if you want to use a member field or method specific to the implementing class. In some scenarios where it may make sense to refer to objects using the base or abstract classes.
```java
        // Don't do this
        HashSet<String> set = new HashSet<>();        
        // Preferrable
        Set<String> set = new HashSet<>();
```
13. **Don't use native methods merely for performance gains.** Applications using native methods are no longer immune to memory corruption errors and are harder to debug. Because native languages are platform dependent, applications using native methods are far less portable. Additionally, there is a fixed cost associated with going into and out of native code, so native methods can decrease performance if the method performs trivial work.
14. **Reflective code can be costly** in terms of performance, verbose and loses compile time type safety and exception checking.
15. **Package names should be hierarchical** with the components separated by periods.

---
## Exceptions Handling
#### Notes on Exceptions
1. Use exceptions for exceptional situations and not for ordinary control flow.
2. Use checked exceptions for conditions from which the caller can reasonably be expected to recover. Checked exceptions force the programmer to deal with exceptional conditions, greatly enhancing reliability.
3. Runtime exceptions should be used to indicate programming errors only.
4. Don't subclass Error to create new subtypes. The general convention is that errors are reserved for use by the JVM to indicate resource deficiencies, invariant failures, or other conditions that make it impossible to continue execution. Given this convention, it’s best not to implement any new Error subclasses. Therefore, all of the unchecked throwables needed should subclass RuntimeException.
5. Favor the use of standard exceptions rather than creating new ones to make code easier to comprehend and familiar.

| Exception Name | Used For |
|-|-|
| **`IllegalArgumentException`** | Throw this exception when a method is invoked with an argument whose value is inappropriate or not allowed. |
| **`IllegalStateException`** | Throw this exception if the invocation is illegal because of the state the object is currently in. For instance if an object is being used before being initialized. |
| **`NullPointerException`** | Throw this exception if a parameter passed in has value null. The convention is to throw NullPointerException instead of IllegalArgumentException in such cases. |
| **`IndexOutOfBoundsException`** | Throw this exception if an out-of-range value is passed in for a parameter that acts as an index in an array or list. |
| **`ConcurrentModificationException`** | Throw this exception if an object designed for use by a single thread or with external synchronization detects that it is being modified by more than one thread at the same time. |
| **`UnsupportedOperation`** | Throw this exception if an object does not support an attempted operation. For instance if a subtype doesn't implement for an abstract method of a supertype, it may throw this exception. |

6. **Lower level exceptions shouldn't be propagated to higher levels.** Higher layers should catch lower-level exceptions and instead throw exceptions that are appropriate in terms of the higher-level abstraction. This idiom is known as **exception translation**. For instance, consider the snippet below where the method catches an exception `NoSuchElementException` but throws an `IndexOutOfBoundsException` exception which is more appropriate for client invoking the method `getElementAtIndex()`.
```java
   public E getElementAtIndex(int index) {
       ListIterator<E> i = listIterator(index);
       try {
           return i.next();
       } catch(NoSuchElementException e) {
           throw new IndexOutOfBoundsException("Index: " + index);
       }
}
```
7. **Use exception chaining to wrap lower level exceptions** to make them available when debugging. Wrapped exception can be retrieved using `Throwable.getCause()`.
```java
// Exception Chaining
   try {
          // ... try body
} catch (LowerLevelException cause) { 
         // Wrap the lower level exception and throw
         // a higher level exception
         throw new HigherLevelException(cause);
}
```
8. **Always declare checked exceptions individually**, and document precisely the conditions under which each one is thrown using the Javadoc @throws tag.

Bad Practice
```java
    void methodThrowsCheckedExceptions(int i) throws Exception {
 
        if (i == 1) {
            throw new IOException("");
        } else {
            throw new CloneNotSupportedException();
        }
    }
```
Better Practice
```java
    void methodThrowsCheckedExceptions(int i) throws IOException, CloneNotSupportedException {
 
        if (i == 1) {
            throw new IOException("");
        } else {
            throw new CloneNotSupportedException();
        }
    }
```
9. **Detail message of an exception should be informative and contain values of fields or parameters that caused the failure.** Avoid lengthy and superfluous prose descriptions.
10. **Consider writing failure atomic code.** If an object is still in a useable state or in the same state as before a failed operation, then the code causing the failure is said to be failure atomic. Generally, it is desirable to have failure atomic code especially in case of checked exceptions from which client can be expected to recover. Following are some of the ways to achieve failure atomicity:
    - Using immutable objects buys us failure atomicity for free.
    - Parameter validations and preconditions check before starting an operation can find failure before objects are modified.
    - Order operations in such a way that the ones that can fail are ordered before the operations that modify the object.
    - Implement roll back to bring an object that encounters failure back to the state it was in before the failed operation took place. This approach is especially used when writing to permanent storage such as disks.
    - Operate on a copy of an object and replace the contents of the object with the copy once the operation is successfuly completed.

However, failure atomicity may not always be feasible as it can be costly to implement.
11. **Don't ignore exceptions**. An empty catch block defeats the purpose of exceptions, which is to force you to handle exceptional conditions. Ignoring an exception is analogous to turning off a fire alarm. At the very least, an empty catch block should contain appropriate comments explaining why the developer is choosing to ignore the exception.

---
## Concurrency
#### Notes on Concurrency
1. **Synchronizing only the write path isn't sufficient for thread-safety.** In fact, synchronization has no effect unless both read and write operations are synchronized. The class below shows such a scenario, where the read path isn't synchronized and a thead may never see the updated value of the flag set by another thread because of how the Java's memory model works.

Bad Practice
```java
class Unsafe {
 
    Boolean flag;
 
 
    public synchronized void setFlag(Boolean flag) {
        this.flag = flag;
    }
 
    // Read path is unsynchronized and a thread reading
    // the flag may never see an updated value by another thread
    public Boolean getFlag() {
        return flag;
    }
 
}
```
2. **The `volatile` modifier doesn't perform mutual exclusion**, but it guarantees that any thread that reads a volatile field will see the most recently written value. The above class can be fixed as follows:
```java
class Unsafe {
    volatile Boolean flag;
    public synchronized void setFlag(Boolean flag) {
        this.flag = flag;
    }
 
    // No synchronization but latest value is read
    public Boolean getFlag() {
        return flag;
    }
}
```
It is possible that a thread invokes `setFlag()` but before it can complete another thread comes along and reads the flag value. However, the read or write to a variable is atomic. It can't happen that half the bytes of a variable are written by thread#1 and the other half are written by thread#2 resulting in an arbitrary value being stored. So whenever a thread concurrently reads a variable without synchronization, it is guaranteed to see a value that was written to the variable by another thread. One caveat is that this guarantee doesn't apply to type long or double unless they are marked volatile. This is because writes to long or double can translate to multistep operation at the machine code level.
3. **Be wary of non-atomic operations**. Consider the snippet below:
```java
private static volatile int nextID = 0;
   public static int generateID() {
       return nextID++;
}
```
The above code is broken because the developer has mistaken the `++` to be atomic when it is not. The above method can actually be rewritten as:
```java
private static volatile int nextID = 0;
   public static int generateID() {
       nextID = nextID + 1;
       return nextID;
}
```
It's easy to see that the rewritten method needs to be synchronized and `volatile` isn't enough. Multiple threads calling into the method can end up reading the same value of `nextID` and incrementing it, resulting in two identical IDs.

4. **Ideally confine mutable data to a single thread**. When multiple threads share mutable data, each thread that reads or writes the data must perform synchronization. Without synchronization, there is no guarantee that one thread’s changes will be visible to another as exemplified from the previous examples.
5. **Volatile can suffice, when only inter-thread communication is desired without mutual exclusion.** However, correct usage of `volatile` is tricky. For instance two threads can use a boolean between themselves when only one thread ever writes to the variable and the other ever reads the variable.
```java
class MultiThreadedCommunication {
    static volatile boolean terminate = false;
 
    // Invoked by thread 1
    void setTerminate() {
        terminate = true;
    }
 
    // Invoked by thread 2
    boolean shouldTerminate() {
        return terminate;
    }
}
```
6. **Don't invoke untrusted client methods from `synchronized` regions of a class**. The client method can in turn try to acquire locks already held or violate the invariants of the class or method.

Bad Practice
```java
class NaiveClass {
    // Method receives a client object and invokes
    // a client method within synchronized region.
    // This can cause unexpected deadlocks, exceptions etc
    synchronized void process(Client client) {
        // ... method body
        // Don't do this
        client.method();
    }
}
```
7. **Refrain from writing your own work queues, or working with threads directly.** A task is the fundamental abstraction for unit of work representable by `Runnable` or `Callable`. ExecutorService is the mechanism to run tasks. Leverage these abstractions where applicable as much as possible.
8. **Use higher level concurrency utilities** rather than working directly with `wait()` and `notify()` which can be hard to get right.
9. **Prefer using concurrent collections than externally synchronized collections.**
10. **Most commonly used synchronizers are `CountDownLatch` and `Semaphore`. Less commonly used are `CyclicBarrier` and `Exchanger`.** Use these synchronizers than rewriting their functionality.
11. **Always use the wait loop idiom to invoke the `wait()` method.** Never invoke `wait()` outside of a loop.

Correct wait() usage idiom
```java
   // The standard idiom for using the wait() method
   synchronized (obj) {
       while (<condition does not hold>)
           obj.wait(); // Lock released & reacquired on wakeup
           // ...         Do Processing
   }
```
The `notifyAll()` method should generally be used in preference to `notify()`.

12. **Consider using a private lock object instead of `synchronized` methods.** Public synchronized methods are in essence public locks that can be held by client either intentionally or accidentally and result in denial of service to other clients.

13. **Avoid lazy initialization unless absolutely needed.** The pattern delays initialization of a resource until needed but makes each access costlier.

14. **Use the holder class idiom for enabling lazy initialization on static fields.** The idiom is given as follows:

Lazy initializing static field
```java
class OuterClass {
    // Nested static class that holds the field
    // we want to lazily initialize
    private static class ObjectHolder{
        static final Object lazilyInitField = init();
        static Object init(){
            // ... Do expensive initialization here
        }
    }
    static Object getStaticField(){
        return ObjectHolder.lazilyInitField;
    }
}
```
The VM will synchronize access to the static field only to initialize the nested class. Once the nested class is initialized, the VM will patch the code so that subsequent access to the field does not involve any testing or synchronization.

15. **Use double checked locking idiom for lazily initializing instance fields.** The idiom is given below:

Lazily initializing instance fields
```java
class DCL {
    volatile Object object;
    void getObject() {
        if (object == null) { // First check with no locking
            synchronized (this) {
                if (object == null){ // Second check with locking
                    object = // ... Do expensive initialization here
                }
            }
        }
        return object;
    }
}
```
Note, the above idiom didn't work on versions of Java prior to 1.5. We can apply the double check locking idiom to static fields as well but the holder class idiom is a better fit for those situations.

In the given implementation of double check locking, after the object has been initialized for the first time, each subsequent access reads the volatile field twice. Once in the if condition and once when it is being returned. Volatile reads can be expensive and we can improve on the performance by reading the volatile field in a local variable only once as shown below.

Improved double check locking
```java
class ImprovedDCL {
    volatile Object object;
    void getObject() {
        Object localVar = object; // Read volatile fields only once
        if (localVar == null) { // First check with no locking
 
            synchronized (this) {
                if (object == null){ // Second check with locking
                    object = // ... Do expensive initialization here
                }
            }
        }
        // Return localVar and not object which would have caused
        // the second read of the volatile field
        return localVar;
    }
}
```
16. **Consider using single checked idiom where repeated initializations can be tolerated or are desired.** The single check idiom is similar to the double checked idiom without the second check.

Single check idiom
```java
class SingleCheck {
    volatile Object object;
    void getObject() {
        if (object == null) { // Single check with no locking
            object = // ... Do expensive initialization here
        }
        return object;
    }
}
```
Note the field is still declared `volatile`. If you don’t care whether every thread recalculates the value of a field, and the type of the field is a primitive other than long or double, then you may choose to remove the volatile modifier from the field declaration in the single check idiom. This variant is known as the racy single check idiom. It speeds up field access on some architectures, at the expense of additional initializations (up to one per thread that accesses the field). This technique is used by `String` instances to cache their hash codes.

17. **Programs should never rely on the thread scheduler for correctness or performance**. Such programs may not be portable. The best way to write a robust, responsive, portable program is to ensure that the average number of runnable threads is not significantly greater than the number of available processors in the system. Threads that are waiting aren't considered runnable.
18. **Busy-waiting should be shunned for coordination among threads.** It is a common folly to program a thread to repeatedly check for an event to happen. Besides making the program vulnerable to the vagaries of the scheduler, busy-waiting greatly increases the load on the processor, reducing the amount of useful work that other threads can accomplish.
19. **Avoid tweaking thread priorities or using Thread.yield to fix liveness (ability to make progress) issues in a program.** Thread priorities are among the least portable features of the Java platform and the resulting program will be neither robust nor portable.
20. **Avoid using thread groups**. `ThreadGroup` are considered obsolete.



---