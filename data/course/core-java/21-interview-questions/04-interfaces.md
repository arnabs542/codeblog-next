---
title: 'Interfaces'
type: 'topic'
section: 'Interview Questions'
course: 'Core Java'
tags:
- java
---
## Interfaces
#### What is an interface in Java
An interface can be thought of as a contract an implementing object has with its consumers. An interface will define the methods or API exposed by the implementing object. The consumers will rely on the method defined by the interface to interact with the implementing object. An interface allows us to hide the implementation details from the consumer. The object implementing the interface can change the functionality or be switched out for a completely different object that also implements the same interface. The consumer is only knowledgeable about the interface and not the concrete classes that implement it. This makes the code more flexible and maintainable.
```
public interface PersonActions {
    void sayHello();
}
```
Methods in an interface that are not declared as default or static are implicitly abstract.

#### What is the difference between an interface and an abstract class in Java?
Following are the main differences between an abstract class and an interface
- An abstract class can have final, static, or class member variables whereas an interface can only have variables that are final and static by default.
- An abstract class can have static, abstract, or non-abstract methods. An interface can have static, abstract, or default methods.
- Members of an abstract class can have varying visibility of private, protected, or public. Whereas, in an interface all methods and constants are public.
- A child class can define abstract methods with the same or less restrictive accessibility, whereas a class implementing an interface must define the interface methods with the exact same accessibility which is public.
- When inheriting an abstract class, a concrete child class must define the abstract methods. An abstract class can extend another abstract class and abstract methods from the parent class don't have to be defined.
- In contrast, an interface extending another interface is not responsible for implementing methods from the parent interface. This is because interfaces cannot define any implementation.
- A class can only extend another class, but it can implement multiple interfaces. Similarly, an interface can extend multiple interfaces. An interface never implements a class or an interface.

#### When should we use a class and when should be use an interface?
An abstract class holds shared state or functionality and its purpose is to avoid code duplication amongst its descendant classes. It provides structure to code by abstracting an entity or concept in the application domain. **Use an abstract class when subclasses share state or use common functionality. Or you require to declare non-static, non-final fields or need access modifiers other than `public`.**

On the contrary, an interface is only a promise to provide state or functionality and doesn't have any state to be shared amongst its implementors. **Use an interface if you expect unrelated classes would implement your interface. For example, the interfaces `Comparable` and `Cloneable` are implemented by many unrelated classes. Interfaces are also used in instances where multiple inheritance of type is desired. Lastly, use an interface if you want to specify the behavior of a certain type but aren't concerned who implements the behavior.**

An example of an abstract class in the JDK is `AbstractMap`, which is part of the Collections Framework. Its subclasses include `HashMap`, `TreeMap`, and `ConcurrentHashMap` which share many methods including `get`, `put`, `isEmpty`, `containsKey`, and `containsValue` that `AbstractMap` defines.

An example of a class in the JDK that implements several interfaces is `HashMap`, which implements the interfaces `Serializable`, `Cloneable`, and `Map<K, V>`. By reading this list of interfaces, one can infer that an instance of `HashMap` can be cloned, is serializable, and has the functionality of a map.

#### What are default methods of an interface?
Imagine a situation where you want to add a new method to an existing interface, that is implemented by several classes. The addition of the new method will also cause you to update all the classes that implement the interface. This may not be practical or possible if your code is publicly shared. One possible mitigation in this situation is to add a default implementation for the method in the interface.

Another possibility in such a situation is to define a new interface that extends the interface in which a new method needs to be added. Any new classes can implement the new interface.

A class can implement an interface without needing to provide an implementation for default methods, though it can provide one if it wanted to.
```
class Demonstration implements PersonActions {
    public static void main( String args[] ) {
        // Note the class Demonstration doesn't provide implementation
        // for the sayBye method and uses the default one.
        (new Demonstration()).sayBye();
    }
}

interface PersonActions {
    // default method
    default void sayBye() {
        System.out.println("Say bye in english and override method for other languages.");
    }
    // static method
    static void printTotalPossibleActions() {
        System.out.println("Total possible acitons = 2");
    }
}
```

#### Look at the code snippet below. The method receives a List of Person objects. It then asks the object for the iterator.
```
   void printPersons(List<Person> list) {
        Iterator<Person> it = list.iterator();
        // Code to iterate list and print each person object
    }
```
**We know `Iterator` is an interface. However, the `list.iterator()` method returns an object of the iterator interface even though interface objects can't be instantiated. Explain how the method is able to return such an object?**

This is a common programmatic idiom, to store the reference of an object of a class implementing an interface, in an interface variable. **It doesn't imply that the object is of type interface, in fact, it is an object of a type that implements an interface.** If you define a reference variable whose type is an interface, any object you assign to it must be an instance of a class that implements the interface.

This is a highly encouraged practice when writing Java code and allows us to switch implementation classes without the consumers requiring any changes on their end since they are always returned an interface reference and not a concrete class implementation object.

#### Consider the snippet below. Is an empty interface valid?
```
public interface IAmEmpty {
    
}
```
Yes, above is perfectly compilable code. An interface may have no methods at all. Such an interface can be useful to refer to objects of a bunch of classes that are related and implement the empty interface. Such interfaces are also called marker interfaces. In other words, we use the interface as a type. In Java,
- **`java.io.Serializable`**
- **`java.lang.Cloneable`**
- **`java.rmi.Remote`**

are examples of marker interfaces.

#### What interface makes the following snippet possible in Java?
```
    void printName(List<String> names) {
        for(String name : names) {
            System.out.println(name);
        }
    }
```
The for-each is possible because the List interface extends the Collection interface which in turn extends the Iterable interface. Any class that implements the List interface will also be required to implement the Iterable interface. The Iterable interface allows iteration in the for-each loop. The above code is equivalent to the following snippet:
```
    for (Iterator<String> it = names.iterator(); it.hasNext();) {
        String name = it.next();
        System.out.println(name);
    }
```
A type which is iterable will be able to return an iterator that can then be used to go over the items of the list.

#### Is the complexity of the following code snippet O(n) always?
```
    void printName(List<String> names) {
        for(int i=0; i<names.size(); i++) {
            System.out.println(names.get(i));
        }
    }
```
This is a classic Java interview trick question! The List interface variable names in this snippet could be pointing to an instance of an `ArrayList` or an instance of a `LinkedList`. If the list is an arraylist, then the loop runs for O(n) since the get operation is equivalent of indexing into an array. However, the loop runs for O(n2) if the list is a linked list! Therefore, **it is always advisable to use the for-each loop if the list type isn't known in advance as the Iterator interface will hide the iteration complexity and will also be the most optimized approach of iterating over the list elements.**

#### What are functional interfaces in Java?
A functional interface is an interface that contains only one abstract method. From Java 8 onwards, lambda expressions can be used to represent the instance of a functional interface. A functional interface can have any number of default methods. For instance the Runnable interface used in multithreading has a single method `run()`.
```
public interface Runnable {
    void run();
}
```

#### Can the methods of an interface be made private?
No, An interface’s methods are by default public. They can’t be marked private or protected.

#### Can classes implementing an interface provide implementation for the static methods of an interface?
No

The statement is nonsensical. Static methods and variables are associated with the interface. They may be invoked in the code using interface reference like `interaceName.someStaticMethod()` but can’t be overridden like default or abstract methods of the interface.
```
class Demonstration implements InterfaceWithStaticMethod{
    public static void main( String args[] ) {
      printName();
      InterfaceWithStaticMethod.printName();
    }
    public static void printName() {
      System.out.println("Demonstration class");
    }
}

interface InterfaceWithStaticMethod {
   static void printName() {
      System.out.println("Interface with InterfaceWithStaticMethod");
   }
  
}
```

#### What is the difference between `Comparable` interface and `Comparator` interface?
Both interfaces are used for comparing objects of the same type. In technical jargon we say the interfaces implement a total ordering on the elements of a type. A total ordering is defined as having the ability to compare any two objects. For instance, the less than relation imposes a total ordering on integers. We can pick any two integers and compare them sensibly. In contrast, divisibility relation defines a partial ordering on integers. For example, if we pick 3 and 15, we can say 3 is a divisor of 15 and 15 is a multiple of 3. However, 3 and 4 can't be compared under the divisibility relation because neither is a divisor or a multiple of the other.

The `Comparable` interface is used to define a total and natural ordering on the objects of a type. When a class implements the `Comparable` interface the ordering defined by the logic in the `compareTo()` method becomes the natural ordering for the objects of that class. A natural ordering can be thought of as the most obvious way of comparing objects of a type. Though this may be subjective. For instance, if you design a Person type, its objects can be ordered by their ages, heights, or weights etc. A single natural way to order them isn't obvious.

A class implementing this interface can leverage convenience methods for sorting and searching defined in the Collections and Arrays classes. It is highly recommended that the `compareTo()` method is consistent with equals() method of the class.
```
    MyClass obj1;
    MyClass obj2;
    if obj1.equals(obj2) is true then obj1.compareTo(obj2) should be 0  
```

If compareTo() ordering isn't consistent with equals() then behavior across classes using the two methods will not be consistent. One such class is BigDecimal, which will show different behavior for the two methods:
```
        BigDecimal val1 = new BigDecimal("4.0");
        BigDecimal val2 = new BigDecimal("4.00");
        // Equals returns false because of differing precision
        System.out.println("val1.equals(val2) = " + val1.equals(val2));
        // CompareTo returns 0 implying both objects are equal
        System.out.println("val1.compareTo(val2) = " + val1.compareTo(val2));
```
This may lead to surprising results when using BigDecimal with TreeSet (uses compareTo()) and HashSet (used equals()) as shown in the runnable snippet below:
```
import java.math.BigDecimal;
import java.util.*;

class Demonstration {
    public static void main( String args[] ) {
        BigDecimal val1 = new BigDecimal("4.0");
        BigDecimal val2 = new BigDecimal("4.00");

        // Equals returns false because of differing precision
        System.out.println("val1.equals(val2) = " + val1.equals(val2));
        // CompareTo returns 0 implying both objects are equal
        System.out.println("val1.compareTo(val2) = " + val1.compareTo(val2));

        // HashSet uses equals() method and ends up storing
        // two objects
        Set<BigDecimal> hashSet = new HashSet<>();
        hashSet.add(val1);
        hashSet.add(val2);
        System.out.println("hashSet.size() = " + hashSet.size());

        // TreeSet uses compareTo() method and ends up storing
        // a single object
        Set<BigDecimal> treeSet = new TreeSet<>();
        treeSet.add(val1);
        treeSet.add(val2);
        System.out.println("treeSet.size() = " + treeSet.size());
    }
}
```

The Comparator is a functional interface that can be used to specify an ordering relation between the elements of a type other than their natural order. Usually it is passed into a method that performs some ordering function such as sorting. The Comparator interface can be used to override a type's natural ordering, or order objects of a type that does not implement the Comparable interface. For exmaple, we can create a comparator for type string which orders strings with the highest length first:
```
        // Create a comparator to order strings based
        // on length. A longer string is ordered first
        Comparator<String> comparator = (o1, o2) -> {
            return o2.length() - o1.length();
        };
```

```
import java.util.*;
class Demonstration {
    public static void main( String args[] ) {
        List<String> list = Arrays.asList("a", "bc", "gef", "zb", "dyzd");

        // Create a comparator to order strings based
        // on length. A longer string is ordered first
        Comparator<String> comparator = (o1, o2) -> {
            return o2.length() - o1.length();
        };

        // We pass in our comparator for strings to be
        // ordered based on their length
        Collections.sort(list, comparator);

        for (String str : list) {
            System.out.println(str);
        }        
    }
}
```

The contract for the Comparable interface dictates us to throw a NullPointerException when we try to compare a null value to an object of a type implementing the interface. However, we may optionally implement comparing null values with the Comparator interface.

---