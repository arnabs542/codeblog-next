---
title: 'Generics'
type: 'topic'
section: 'Interview Questions'
course: 'Core Java'
tags:
- java
---
## Generics
#### Why should we use generics in Java?
Generics help with the following use-cases
- Enforcing stronger type checking at compile time for greater type-safety
- Elimination of casts
- Implementation of generic algorithms

#### What is type safety?
**Type safety is the extent to which a programming language discourages or prevents type errors.** An example would be treating an int like a float. Observe the sum() method below:
```
    int sum(ArrayList list) {
 
        int sum = 0;
        for (int i = 0; i < list.size(); i++)
            sum += (int) list.get(i);
 
        return sum;
    }
```
If the above method is invoked as follows, it'll result in a cast exception at runtime since we are trying to treat a string as an integer. Note that the code snippets would compile without errors but fail at runtime.
```
        ArrayList myList = new ArrayList();
 
        myList.add("Hello");
        myList.add(2);
 
        sum(myList);
```
Generics allow us to catch such type errors at compile time and also rid us of the need to cast objects into our intended data-type. The above code can be fixed like so:
```
    int sum(List<Integer> list) {
 
        int sum = 0;
        for (int i = 0; i < list.size(); i++)
            sum += list.get(i);
 
        return sum;
    }
```
and the code to invoke the sum() method can be rewritten as:
```
        List<Integer> myList = new ArrayList();
 
        // This will get caught at compile time
        myList.add("Hello");
        myList.add(2);
 
        sum(myList);
```

#### What is a generic type?
A generic type is a generic class or interface that is parameterized over types. For instance, the LinkedList<E> class in java is a generic class.

#### What is a type parameter?
The E in the generic class LinkedList<E> is called a type parameter. By convention, type parameter names are single, uppercase letters. The most commonly used type parameter names are:
- E - Element (used extensively by the Java Collections Framework)
- K - Key
- N - Number
- T - Type
- V - Value
- S, U, V - 2nd, 3rd, 4th types

#### What is the diamond <> notation?
The pair of angle brackets <> is informally called the diamond. We can replace the type arguments required to invoke the constructor of a generic class with an empty set of type arguments using the diamond <> as long as the compiler can determine, or infer, the type arguments from the context. Below is an example:
```
// with diamond notation
List<String> names = new ArrayList<>();
// instead of the more verbose 
// without diamond notation
List<String> names = new ArrayList<String>();
```

---
## Raw Types
#### Consider the Printer class below which is parametrized on type T.
```
public class Printer<T> {
    T item;
    public Printer(T item) {
        this.item = item;
    }
    public void consolePrinter() {
        System.out.println(item.toString());
    }
    public void changeItem(T item) {
        this.item = item;
    }
}
```
#### Will the following code snippet compile, if we don’t supply any type arguments?
```
Printer printer = new Printer(5);
```

**Answer:** Yes

#### Will the code compile without warnings?
```
Printer printer = new Printer(5);
```
**Answer:** No, The declaration will generate a unchecked warning because we are trying to add an object of type Integer in a raw Printer

#### Does the following snippet compile?
```
Printer<Integer> integerPrinter = new Printer<>(5);
Printer rawPrinter = new Printer(new Object());
integerPrinter = rawPrinter;
integerPrinter.consolePrinter();
```
**Answer:** Yes

#### What will be the output of the below snippet?
```
Printer<Integer> integerPrinter = new Printer<>(5);
Printer printer = new Printer("my string");
printer = integerPrinter;

printer.changeItem("string item");
printer.consolePrinter();
```
**Answer:** prints “string item” and shows a compile time warning

##### Explaination
The snippet Printer printer = new Printer(5); will compile just fine. When the actual type parameter is omitted, a raw type is created. Raw types show up in legacy code because lots of API classes, e.g. the Collections classes, were not generic prior to JDK 5.0. Raw types give pre-generics behavior. However, the same snippet will generate a warning for using unchecked or unsafe operations.

Similarly, we can assign a raw type to a parameterized type as we do here integerPrinter = rawPrinter; but the compiler will generate a warning about an unchecked operation.

The last snippet in the quiz above will compile and print string item but a compiler warning will be generated for unchecked operations when the method changeItem() is invoked on the raw Printer type.

#### What is the unchecked or unsafe operations warning?
**The term "unchecked" means that the compiler does not have enough type information to perform all type checks necessary to ensure type safety.** The "unchecked" warning is disabled by default, though the compiler gives a hint. To see all "unchecked" warnings recompile with `-Xlint:unchecked`. Usually, this warning shows up as follows:
```
Note: yourFile.java uses unchecked or unsafe operations.
Note: Recompile with -Xlint:unchecked for details.
```

#### What are generic methods?
Generic methods are methods that introduce their own type parameters. This is similar to declaring a generic type, but the type parameter's scope is limited to the method where it is declared. The scope of the type variable is local to the method itself. it may appear in the method signature and the method body, but not outside the method. A generic method can appear in a class which itself is not generic. The syntax for a generic method includes a list of type parameters, inside angle brackets, which appears before the method's return type. Below is an example of a generic method.
```
class Demonstration {
    <T> void printType(T item) {
        System.out.println(item);
    }
    public static void main( String args[] ) {
        Demonstration demo = new Demonstration();
        demo.<String>printType("string");
        demo.<Integer>printType(5);
        demo.printType(23.23f);
    }
}
```
Note that in the third invocation of the generic method above, we don't specify the type which is automatically inferred by the compiler. A feature known as **type inference**.

---
## Generic Types
#### Explain generic types?
To understand generic types, we can draw an analogy from methods. A method can be defined to receive input parameters. Each method invocation is passed different values for the input parameters and the method executes the same code everytime with different values. We take the same concept and extend it to types (classes and interfaces). We say that a class or an interface is now **parameterized over types** and is considered generic. The type parameter is the variable that can take on different values and the generic class runs the same code with the value of the type parameter substituted.
```
class Printer<T> {
    void print(T t) {
        System.out.println("printing : " + t.toString());
    }
}
```

#### Can static nested classes access type parameters defined by the outer class?
A static entity is tied to the class object and not the instance of the object. Static inner class or, for that matter, static methods, can't access the parametrized type of the containing class. Consider the faulty example below:
```
class OuterClass<T extends Comparable<T>> {
    T someField
    public static class InnerClass<V> {
        T itemInNestedClass = null; // <--- compile time error
    }
 
    static void outerClassStaticMthd() {
        T item = null; // <--- compile time error
    }
 
    // creating an object of the inner class parametrized on T
    OuterClass.InnerClass<T> item;
}
```
In the above snippet, both the static method and the inner static class can't refer to the parameterized type `T`. **One may not refer to a type parameter anywhere within a static member.**

Also note that for a parametrized outer class we don't need to specify the parameter type when accessing the static members from outside the outer class e.g. `OuterClass<Integer>.InnerClass` or `OuterClass<String>.InnerClass` are all invalid and compile time errors. Simply, `OuterClass.InnerClass` is good enough when accessing from outside the outer class and `OuterClass.<T>InnerClass` when accessing within the outer class.

#### Can nested non-static classes access type parameters of their enclosing classes?
If the outer class has type parameters and the inner class is not static, then type parameters of the outer class are visible within the inner class.
```
class OuterClass<T extends Comparable<T>> {
    T someField;
    public class InnerClass<V extends Comparable<V>> {
        T itemInNestedClass = null; // <--- parameterized type is accessible
        // creating an object of inner class with the outer
        // class parametrized on the type parameter of inner
        // class V, while the inner class is parameterized on
        // the type parameter of the outer class T
        OuterClass<V>.InnerClass<T> item2 = null;
    }
 
    // creating an object of the inner class parametrized on T
    OuterClass<T>.InnerClass<Integer> item;
}
```

#### How can generic arrays be created?
Arrays can't be created for types that aren't reifiable. For instance, the following code won't compile:
```
    // Method to create and return arrays
    // doesn't compile
    <X> T[] createArray(int size) {
        T[] array = new T[size]; // <--- compile error
        return array;
    }
```
Note you can't create an array of a parameterized type i.e. you can't do new T[100], but you can declare an array of parametrized type as shown below:
```
    <T> void someMethod(T... args) {
        // Create a reference for the array of parameterized type
        // and assign it the arguments
        T[] input = args;
        for (T t : input)
            System.out.println(t.toString());
    }
```
The naive and incorrect way is to create an array of a generic type using casting as shown below.
```
    <T> T[] createArray(int size) {
        T[] array = (T[]) new Object[size];
        return array;
    }
```
The above code will compile but throws a ClassCastException when run. Note that the compilation also issues an unchecked warning. The runnable snippet below exemplifies this.
```
class Demonstration {
    public static void main( String args[] ) {
        // Attempt to create a generic array
        // results in a ClassCastException
        String[] array = Demonstration.<String>createArray(5);
    }

    static <T> T[] createArray(int size) {
        T[] array = (T[]) new Object[size];
        return array;
    }
}
```
The above code fails because on line 5 there is an implicit cast from Object[] to String[]. Let's look at the erasure of the method to better understand the outcome. The rules of erasure tell us to replace the unbounded parameter T with Object.
```
Erasure of createArray method
    Object[] createArray(int size) {
        Object[] array = (Object[]) new Object[size];
        return array;
    }
```
The above method, in fact tries to return an array of Object which on line 5 is then being cast to an array of String resulting in a class cast exception. The reified type of the returned array indicates it is an array of Object and we attempt to cast it to a supertype of String. Arrays are covariant, meaning we can cast an array of a subtype to its super type but not vice versa. Arrays being covariant imply two things:
1. An array of type T[] may contain elements of type T and its subtypes.
2. An array of type S[] is a subtype of T[] if S is a subtype of T.

For instance, the following issues a warning but the code runs without issues
```
String[] strArr = new String[10];
Object[] objArr = (Object[])strArr;
objArr = strArr // <--- compile error
```
When working with generics, ensure that the reified type of the array that is being assigned to a reference variable is a subtype of the reference variable's type. One line 5 of the faulty code if we changed the type of the array variable to Object then the code will run just fine. Without generics, this problem never arises but because of erasure in generics the developer may get caught off-guard and not realize that an array reference variable is being assigned an array of its supertype.

The right way to create generic arrays is to use reflection, as shown below:

Using reflection to create arrays
```
    <T> T[] createGenericArray(Class<T> type, int size) {
 
        T[] arr = (T[]) java.lang.reflect.Array.newInstance(type, size);
        return arr;
    }
```
The method java.lang.reflect.Array.newInstance takes in the component type of the parametrized type T for which a generic array is being requested.
```
class Demonstration {
    public static void main( String args[] ) {
        String[] strArray = Demonstration.<String>createGenericArray(String.class, 10);
    }

    @SuppressWarnings("unchecked")
    static <T> T[] createGenericArray(Class<T> type, int size) {

        // Causes an unchecked cast warning
        T[] arr = (T[]) java.lang.reflect.Array.newInstance(type, size);
        return arr;
    }

}
```

#### Consider the class below which casts an Object array to an array of type T. If you must use an array as the backing data-structure, then what precautions should we take with the following design class?
```
class NaiveArrayList<T> {
    private T[] array;
 
    public NaiveArrayList(int size) {
        array = (T[]) new Object[size]; // <--- Generates unchecked cast warning
    }
 
    public T[] getArray() {
        return array;
    }
 
    public T getItem(int i) {
        return array[i];
    }
 
    // ... class body
}
```
The `ArrayList` from the Java Collections Framework uses an array as the underlying data-structure. Similarly, there may be situations in which an array may be required. In such situations, the rule of thumb is to make sure no reference to the generic array escapes from the class. In the above class the public `getArray()` method returns a reference to the array and should be eliminated. The `ArrayList` does exactly that.

We designed the class by declaring an array of type `T`, an alternative design could be to use an object array and cast it to the parametrized type when returning an element from the `getItem` method. The alternate design is shown below:
```
class NaiveArrayList<T> {
    private Object[] array;
 
    public NaiveArrayList(int size) {
        array = new Object[size]; // <--- No more unchecked cast warning here
    }
 
    public T getItem(int i) {
        return (T) array[i]; // <--- unchecked cast warning comes up here now
    }
 
    // ... class body
}
```

#### Consider the code snippet below:
```
    <T extends Number> T[] createArray(int size) {
        T[] array = (T[]) new Number[size];
        return array;
    }
 
    // The above method is invoked as:
    Integer[] intArray = this.<Integer>createArray(10);
```
What is the outcome of compiling and running the code above?

Code compiles but throws a ClassCastException

**Explanation:**
Because of erasure the `createArray()` method returns an array of `Number` which is being cast to an array of `Integer` and thus causes a `ClassCastException`.

#### Consider the following method signature which generates the warning: Possible heap pollution from parameterized vararg type T. What does the warning mean?
```
    <T> void createArray(T ... args) { }
```
Heap pollution occurs when a variable of a parameterized type refers to an object that is not of that parameterized type. Or in other words a parametrized type is pointing to an object of type A in the heap when it should have pointed to an object of type B. The method in the question is converted by the compiler to the following form:
```
    <T> void createArray(T[] args) { }
```
Next, on type erasure the method becomes:
```
    void createArray(Object[] args) { }
```
The method can in fact accept arrays of type Object. We can trick the method into accepting arrays of different types even though the type parameter T should have pointed to only one type.
```
    List<Integer> intList = Arrays.asList(1, 2, 3);
    List objList = intList;
    List<String> strList = Arrays.asList("This looks bad");
    createArray(strList, objList);
```
The above code will have the parameterized type `T` take on the type `List<String>[]`. The implication is thatT should point to an object in the heap which is an array of list of strings. When in reality it is pointing to an array object in the heap which contains a list of integers and a list of strings. The compiler warns of this very issue by warning the developer of potentially "polluting" the heap.
```
import java.util.*;

class Demonstration {
    public static void main( String args[] ) {
        List<Integer> intList = Arrays.asList(1, 2, 3);
        List objList = intList;
        List<String> strList = Arrays.asList("This looks bad");

        Demonstration.<List<String>>createArray(strList, objList);
        System.out.println("Compiles with warnings.");        
    }
    static <T> void createArray(T ... args) { }    
}
```
Note that the above code needs to be compiled with the `-Xlint:unchecked` flag for the full warning to be displayed. This isn't possible in the code widget but you may try copying the code on your local machine and compiling with the `-Xlint:unchecked` flag.

---
## Bounded Types
#### What are bounded type parameters?
When you want to restrict the types that can be used as type arguments in a parameterized type, you can do so by bounding the type parameter. For instance, say you are designing a specialized collection class that should only contain numbers. The type parameter can be bounded by the Number class to ensure that consumers of your specialized collection can never add items which aren't of type Number or one of its subclass. Let's see how you'll do it without specifying a bound first:
```
 class NumberCollection<T> {
 
    List<T> list = new ArrayList<>();
 
    // Method compares integer portions of each
    // value stored in the list and prints those
    // that are greater than the method argument
    public void printGreater(T other) {
        for (T item : list) {
            // crude way to get integer portions
            int val1 = Double.valueOf(item.toString()).intValue();
            int val2 = Double.valueOf(other.toString()).intValue();
            if (val1 > val2)
                System.out.println(item);
        }
    }
 
    public void add(T item) {
        list.add(item);
    }
}
```
Note that for the code above, the **type parameter** is `T`. We can instantiate the specialized class as follows:
```
    NumberCollection<Integer> myIntegerList = new NumberCollection<>();
    myIntegerList.add(5);
    myIntegerList.add(4);
    myIntegerList.printGreater(4);
```
Note that the `Integer` we specify in the statement `NumberCollection<Integer> myIntegerList = new NumberCollection<>();` is the **type argument**.

There are two problems with the approach above:
- A consumer of the class can instantiate an instance with a type argument that is not of type `Number` resulting in a runtime exception. For instance, an unsuspecting consumer can create a list parametrized on type argument `String` and run into a runtime exception. Below snippet will compile and throw a runtime exception.
```
    NumberCollection<String> myStringList = new NumberCollection<>();
    myStringList.add("hello");
    myStringList.printGreater("world");
```
- The type T is unbounded and only methods of the `Object` class can be invoked on variables of type T declared in the class `NumberCollection` unless we use casting.

```
import java.util.ArrayList;
import java.util.List;

class Demonstration {
    public static void main( String args[] ) {
        NumberCollection<Integer> myIntegerList = new NumberCollection<>();
        myIntegerList.add(5);
        myIntegerList.add(4);
        myIntegerList.printGreater(4);
    }
}

class NumberCollection<T> {

    List<T> list = new ArrayList<>();

    // Method compares integer portions of each
    // value stored in the list and prints those
    // that are greater than the method argument
    public void printGreater(T other) {
        for (T item : list) {
            // crude way to get integer portions
            int val1 = Double.valueOf(item.toString()).intValue();
            int val2 = Double.valueOf(other.toString()).intValue();
            if (val1 > val2)
                System.out.println(item);
        }
    }

    public void add(T item) {
        list.add(item);
    }
}
```
We can fix the above situation by **bounding the type parameter T to only be a subclass of Number. This eliminates the possibility of runtime exceptions that can result if the type parameter is not of type Number.** Below is the fixed code:
```
 class NumberCollectionBounded<T extends Number> {
 
    List<T> list = new ArrayList<>();
 
    // Print if the integer portion is greater
    public void printGreater(T other) {
        for (T item : list) {
            if (item.intValue() > other.intValue())
                System.out.println(item);
        }
    }
 
    public void add(T item) {
        list.add(item);
    }
}
```
We can bound the type parameter using the extends keyword followed by the class name. Note that by bounding the type parameter, the following snippet would not compile, and runtime exception wouldn't occur.
```
    // compile error
    NumberCollectionBounded<String> myStringList2 = new NumberCollectionBounded<>();
```
Also on variables declared of type T, we can invoke methods like intValue() without requiring casting.
```
import java.util.ArrayList;
import java.util.List;

class Demonstration {
    public static void main( String args[] ) {
        NumberCollectionBounded<Long> myDoubleList = new NumberCollectionBounded<>();
        myDoubleList.add(54L);
        myDoubleList.add(41L);
        myDoubleList.printGreater(40L);
    }
}

class NumberCollectionBounded<T extends Number> {

    List<T> list = new ArrayList<>();

    // Print if the integer portion is greater
    public void printGreater(T other) {
        for (T item : list) {
            if (item.intValue() > other.intValue())
                System.out.println(item);
        }
    }

    public void add(T item) {
        list.add(item);
    }
}
```

#### Can we have multiple bounds specified for a type parameter?
**Yes, a type parameter can have multiple bounds, but it can be bounded by at most one class and as many interfaces as desired.** The class must be mentioned first in the list of bounding types. We can modify our earlier class to also be bounded by interfaces Comparable and Serializable
```
    class NumberCollectionBounded<T extends Number & Comparable & Serializable> {
         // ... class body
    }
```
Note that when we bound a type by an interface, we really mean that the type parameter T implements the interface. The correct way to implement comparison in the `NumberCollectionBounded` would be to bound the type parameter by `Comparable` interface. This will also simplify the comparison as we would be able to invoke the `compareTo()` method on variables of type T.

---
## Type Inference
#### What is type inference?
**Type inference is Java compiler's ability to look at each method invocation and corresponding method declaration to determine the type argument, or arguments that make the invocation applicable.** The inference algorithm determines the types of the arguments and, if available, the type of the result being assigned, or returned. Consider the useless but instructional class below:
```
public class InferenceExample {
    public <U> U identity(U item) {
        return item;
    }
}
```
Without the compiler's inference superpower, you'll need to write verbose code like below to use the `identity()` method:
```
        InferenceExample inferenceExample = new InferenceExample();
        double g = inferenceExample.<Double>identity(45d);
```
**Note that the angle brackets with the type `<Double>` is called the type witness.** Type inference allows us to skip writing out the type witness since the compiler can infer from the context that the type parameter `U` is a `Double`.
```
        InferenceExample inferenceExample = new InferenceExample();
        double f = inferenceExample.identity(55d);
```

#### What happens when we try to compile the following snippet?
```
HashMap<Integer, Integer> map = new HashMap();
```
**Answer:** Compiles with warning

When we do new HashMap(), we are creating a raw type of HashMap and the compiler will complain about unchecked operations. The right way would be to either use the diamond <> notation or completely specifying the type parameter.
```
import java.util.HashMap;

class Demonstration {
    public static void main( String args[] ) {
        // Generates a compiler warning
        HashMap<Integer,Integer> myMap = new HashMap();
        System.out.println("program still works though.");
    }
}
```

#### What is target type?
The target type of an expression is the data type that the Java compiler expects depending on where the expression appears. Consider the snippet below:
```
List<String> stringList = Collections.emptyList();
```
The above statement is expecting an instance of `List<String>` - this data type is the target type. The signature of the method `emptyList()` is:
```
public static final <T> List<T> emptyList()
```
Because the method `emptyList()` returns a value of type List, the compiler infers that the type argument T must be the value String. Alternatively, we could also specify the type witness and write a more verbose declaration like so:
```
List<String> stringList = Collections.<String>emptyList();
```

---
## Erasure
#### What is type erasure?
Consider the following two code snippets:
Raw type
```
        List list = new LinkedList();
        list.add("Educative");
```
Generic Type
```
        List<String> list = new LinkedList<>();
        list.add("Educative");
```
The bytecode for the above two snippets will be exactly the same! Erasure can be thought of as enforcing type constraints only at compile time and discarding type information at runtime - or erasing type information. If we lose the type information in the second snippet, it'll become equivalent to the raw snippet.

Generics in Java are implemented using erasure which has the following effects on the code:
- Replaces all type parameters (T, U, V, etc) in generic types (classes, interfaces, etc).
- Adds implicit casts to preserve type safety. Before generics, the casts were explicitly added by the developer
- Generates additional methods called bridge methods to preserve polymorphism in extended generic types.

The chief benefit of generics is if your code compiled without any checked warnings, you have a cast-iron guarantee from the platform that the implicit casts added by the compilation of generics never fail. You don't have this guarantee with legacy code that uses explicit casts and it may fail at runtime with a `ClassCastException`

It is important to realize that the types `ArrayList<Integer>`, `ArrayList<String>`, and `ArrayList<List<Integer>>` are all represented at run-time by the same type, `ArrayList`! Type erasure ensures that no new classes are created for parameterized types. Convince yourself of this fact by running the code snippet below.
```
import java.util.*;

class Demonstration {
    public static void main( String args[] ) {

      // Raw type
      ArrayList al = new ArrayList();

      // ArrayList of Strings
      ArrayList<String> strs = new ArrayList<>();

      // ArrayList of ArrayList of Strings
      ArrayList<ArrayList<String>> lstOfStringLsts = new ArrayList<>();

      System.out.println("al.getClass().equals(strs.getClass()) = " + al.getClass().equals(strs.getClass()));
      System.out.println("al.getClass().equals(lstOfStringLsts.getClass()) = " + al.getClass().equals(lstOfStringLsts.getClass()));

    }
}
```

#### Can you give examples of type erasure?
During the type erasure process, the Java compiler erases all type parameters and replaces each with its first bound if the type parameter is bounded, or Object if the type parameter is unbounded. Consider the class below:

Before Erasure
```
// A class representing a box of some type
class Box<T> {
    T item;
 
    public Box(T givenItem) {
        item = givenItem
    }
}
```
The above generic Box class has an unbounded type T. The erasure for an unbounded type is simply object, so the compiled class will look like following:

After Erasure
```
// A class representing a box of some type
class Box {
    Object item;
 
    public Box(Object givenItem) {
        item = givenItem
    }
}
```
Now let's look how the erasure would look like with a bounded type. Say we want to make the Box class comparable and bound the parametrized type T with the interface Comparable

Before Erasure
```
class Box<T extends Comparable<T>> {
 
    T item;
 
    public Box() {
 
    }
 
    public int compareTo(T other) {
        return item.compareTo(other);
    }
}
```
The rule for erasure with multiple bounds says to pick the first(leftmost) bound. The above class will now look like below after erasure.

After Erasure
```
class Box {
 
    Comparable item;
 
    public Box() {
 
    }
 
    public int compareTo(Comparable other) {
        return item.compareTo(other);
    }
}
```
We can have the Box class extend multiple interfaces like below:

Before Erasure
```
class Box<T extends Serializable & Comparable<T>> {
 
    T item;
 
    public Box() {
 
    }
 
    public int compareTo(T other) {
        return item.compareTo(other);
    }
}
```
After Erasure
```
class Box { 
    Serializable item;
 
    public Box() {
 
    }
 
    public int compareTo(Serializable other) {
        return item.compareTo(other);
    }
}
```

#### What will be the erasure of List<String>[]?
`List<String>[]` is an array of list of strings. The erasure of this parametrized is an array of Lists, which is `List[]`

#### Consider the two overloaded methods below, what is wrong with their definition?
```
    public void print(List<String> listOfString) {
        // ... method body
    }
 
    public void print(List<Integer> listOfInts) {
        // ... method body
    }
```
After erasure is applied to the above two methods, they'll have the same signature which isn't allowed in Java. The methods will have the following form after erasure:
```
    public void print(List listOfString) {
        // ... method body
    }
 
    public void print(List listOfInts) {
        // ... method body
    }
```
On the same note, consider the following class which attempts to implement the Comparable interface parametrized on two different types:
```
class BadGenerics implements Comparable<Integer>, Comparable<Double> {
        // ... class body
}
```
The class definition will fail to compile because after erasure the parametrized interfaces will become the same interface.
```
class BadGenerics implements Comparable, Comparable {
        // ... class body
}
```

#### What will be the erasure of the following three generic methods?
```
    // Prints Integers
    <T extends List<Integer>> void print(T lst) {
 
        for (Integer i : lst)
            System.out.println(i);
    }
 
    // Prints Strings
    <T extends List<String>> void print(T lst) {
        for (String str : lst)
            System.out.println(str);
    }
 
   // Prints Objects
    <T extends List> void print(T lst) {
        for (Object str : lst)
            System.out.println(str);
    }
```
Let's apply the erasure rules on the above methods. These rules are:
- **discard all type parameters from parameterized types:** we can remove T wherever we see it.
- **Replace any type variable with the erasure of its bound or with Object if it has no bound:** The first two methods have the bounds List<Integer> and List<String>. We recursively apply rule#1 on these two bounds to get their erasure first and then apply the resulting erased type to the erase the methods. The erasure for both List<Integer> and List<String> is List. In the third method, the erasure of List is itself List.
- **If multiple bounds exist, pick the erasure of the leftmost or first bound:** This rule doesn't apply in our case.

After erasure is applied the above methods will look like the following:
```
    // Prints Integers
    void print(List lst) {
 
        for (Integer i : lst)
            System.out.println(i);
    }
 
    // Prints Strings
    void print(List lst) {
        for (String str : lst)
            System.out.println(str);
    }
 
   // Prints Objects
    void print(List lst) {
        for (Object str : lst)
            System.out.println(str);
    }
```
Hence, the three methods conflict with eachother as they have the same signature after erasure and the code won't compile. You can verify this by running the snippet below which fails compilation.
```
import java.util.*;

class Demonstration {
    public static void main( String args[] ) {

    }

    <T extends List<Integer>> void print(T lst) {
        for (Integer i : lst)
            System.out.println(i);
    }

    <T extends List<String>> void print(T lst) {
        for (String str : lst)
            System.out.println(str);
    }

    <T extends List> void print(T lst) {
        for (Object str : lst)
            System.out.println(str);
    }    
}
```

#### What is the difference between C++ template library and Java generics?

Semantically, Java generics are defined by erasure, whereas C++ templates are defined by expansion. In C++ templates, each instance of a template at a new type is compiled separately. If you use a list of integers, a list of strings, and a list of lists of integers, there will be three versions of the code. The template will be compiled for each type separately. One consequence of this approach is code bloat, each distinct type used with a template adds a new version of the code. Contrast this with Java where no matter how many parametrized types you use, there is always one version of the code, so bloat does not occur.

Though, expansion may lead to more efficient implementation than erasure, since it offers more opportunities for optimization.

#### Consider the following method:
```
    void someMethod(Number num) {
        // ... method body
    }
```
We can invoke the above method with the following snippet:
```
        Integer i = new Integer(5);
        someMethod(i);
```
If we now modify the someMethod as follows:
```
    void someMethod(List<Number> num) {
        // ... method body
    }
```
and try to invoke it with the following snippet, will it work?
```
        List<Integer> list = new ArrayList<>();
        someMethod(list);
```
No, the modified code which attempts to pass in a list of integers doesn't compile. Even though Integer is a subtype of Number but List<Integer> IS NOT A SUBTYPE OF List<Number> and therefore the modified code in the above scenario won't work.

However, if we change the method as follows then it'll work.
```
    void someMethod(List<? extends Number> num) {
        // ... method body
    }
```
The argument List<? extends Number> implies that the list contains some elements which is of a type that is a subtype of Number.

No, the modified code which attempts to pass in a list of integers doesn't compile. Even though Integer is a subtype of Number but List<Integer> IS NOT A SUBTYPE OF List<Number> and therefore the modified code in the above scenario won't work.

However, if we change the method as follows then it'll work.
```
    void someMethod(List<? extends Number> num) {
        // ... method body
    }
```
The argument List<? extends Number> implies that the list contains some elements which is of a type that is a subtype of Number.
```
import java.util.*;

class Demonstration {
    public static void main( String args[] ) {
        List<Integer> list = new ArrayList<>();
        someMethod(list);
    }

    /*
     * Uncomment the following method and comment out the
     * other method to see the compile error generated.
     *
     */
    /*static void someMethod(List<Number> nums){
      // ... method body
    }*/

    static void someMethod(List<? extends Number> nums){
      // ... method body
      System.out.println("Comment out this method and uncomment the already commented method to see the compiler error.");
    }
}
```
Consider the following snippet to understand why List<Integer> is not a subtype of List<Number>.
```
        // Create a list of integers
        List<Integer> ints = new ArrayList<>();
        
        // If List<Integer> was a subtype of List<Number>
        // then we could do the following
        List<Number> nums = ints; // won't compile
        
        // Now we could store a Double in an ArrayList of
        // Integer.
        nums.add(new Double(9.9));
 
 
        // A user tries to get an Integer out of the
        // presumably Integer arraylist but gets a
        // ClassCastException
        Integer i = nums.get(0);
```

#### What is the difference between Collections and Array types in Java?
Following are some of the major differences between Arrays and Collections:
- Arrays are covariant, that is an array of type person is a subtype of an array of objects. However, collections are invariant that is a list of type person is not a subtype of list of objects.
- Arrays are reified, that is they know the type of their components at runtime and enforce it. One can't store a `String` type in an array of `Double`. On the other hand, Collections enforce their type constraints only at compile time and erase element type information at runtime. Erasure is what allows generic types to interoperate freely with legacy code that does not use generics.
- Collections are more flexible than arrays. With arrays we are limited to setting or retrieving a particular index. However, with collections we have a variety of operations that can be performed such as sorting, shuffling, rotation combining, extracting a sublist, etc.
- Collections allow us to imply an ordering of the constituent elements when using lists or not at all using sets.
- Arrays can be efficient especially when composed of primitive types. Because primitives don't have subtypes, the array doesn't need to check for a `ArrayStoreException`. Primitive array types also avoid the performance penalty of boxing. Arrays can be used in performance crucial situations in preference to collections.

---
## Bridge Methods
#### What are bridge methods?
Bridge methods are synthetic methods created by the compiler as part of the erasure process when compiling a class or interface that extends a parameterized class or implements a parameterized interface. To understand bridge methods, let's try to understand the problem that bridge methods solve. Consider the following setup, where the class purposelessClass implements the generic uselessInterface interface.

Before type erasure
```
interface UselessInterface<T> { 
    public void print(T o);
}
 
class PurposelessClass implements UselessInterface<Integer> {
    @Override
    public void print(Integer t) {
 
    }
}
```
When type erasure is applied on the interface and the class we'll get the following form:

After type erasure
```
interface UselessInterface { 
    public void print(Object o);
}
class PurposelessClass implements UselessInterface<Integer> {
    @Override
    public void print(Integer t) {
 
    }
}
```
Now the signature of the method print in the class and the interface are no more similar. The class's print method takes in an integer whereas the interface's print method takes in an object. The class is no longer overriding the interface's print method that it implements. The compiler steps in at this moment and to preserve polymorphism inserts a method in the class that acts as a bridge between the two methods so that subtyping correctly works. The class definition would look like:
```
interface UselessInterface { 
    public void print(Object o);
}
class PurposelessClass implements UselessInterface<Integer> {
    @Override
    public void print(Integer t) {
 
    }
    // BRIDGE METHOD
    // Synthetic method inserted by compiler 
    public void print(Object t) {
        print((Integer)t); // <--- the method casts the received Object to Integer and calls the intended overridden method. 
    }
}
```
Bridge methods can show up in a stack trace and can also be seen in the list of methods received from reflection. The below snippet reflectively retrieves methods names for the PurposelessClass class which lists two methods with the name print and one of them is the synthetic one inserted by the compiler.
```
import java.lang.reflect.Method;

class Demonstration {
    public static void main( String args[] ) {
        for (Method m : PurposelessClass.class.getMethods())
            if (m.getName().equals("print"))
                System.out.println(m.toGenericString());
    }
}

interface UselessInterface<T> {
    public void print(T o);
}

class PurposelessClass implements UselessInterface<Integer> {
    @Override
    public void print(Integer o) {

    }
}
```

#### Consider the code snippet below and answer the questions:
```
class WorkOnListOfInts<T extends List<Integer>> {
    public void work(T ints) {
        for (Integer x : ints) {
            System.out.println(x);
        }
    }
}
```
#### What will be erasure of the class?
`WorkOnListOfInts<List>`, Drop the type parameters T and Integer and we are left with just List

#### What will be the outcome of the below code:
```
        WorkOnListOfInts<List<Integer>> worker = new WorkOnListOfInts<>();
        List<Double> doubleList = Arrays.asList(4.4);
        worker.work(doubleList);
```
Doesn’t compile

#### What will be the outcome of the below code:
```
        WorkOnListOfInts<List<Integer>> worker = new WorkOnListOfInts<>();
        List<Double> doubleList = Arrays.asList(4.4);
        List objList = doubleList;
        worker.work(objList);
```
Compiles but throws runtime exception

```
import java.util.*;

class Demonstration {
    @SuppressWarnings("unchecked") // <--- Bad idea to suppress unchecked warning
    public static void main( String args[] ) {
        WorkOnListOfInts<List<Integer>> worker = new WorkOnListOfInts<>();
        List<Double> doubleList = Arrays.asList(4.4);
        List objList = doubleList;
        worker.work(objList);

        // worker.work(doubleList);  <--- Doesn't compile       
    }
}

class WorkOnListOfInts<T extends List<Integer>> {
    public void work(T ints) {
        for (Integer x : ints) {
            System.out.println(x);
        }
    }
}
```
The above code when run throws a `ClassCastException` as expected for the last question of the quiz.

---
## Wildcard
#### What is the `?` used for in generics?
In generic code, the question mark, ?, called the wildcard, represents an unknown type. The wildcard can be used in a variety of situations: as the type of a parameter, field, or local variable and sometimes even as a return type.

**Note that the wildcard can only be used in defining arguments to a method in a method signature. It can't appear in the return type expression.**

#### Can you give an example setup using the `?` wildcard
Imagine we have a class `Animal` that has two subtypes `Tiger` and `Elephant`. The classes are shown below:
```
public class Animal {
    void speakUp() {
        System.out.println("gibberish");
    }
}
 
public class Elephant extends Animal {
    @Override
    public void speakUp() {
        System.out.println("Trumpets..");
    }
}
 
public class Tiger extends Animal {
    @Override
    void speakUp() {
        System.out.println("Rooaaarrssss");
    }
}
```
Now imagine we want to write a method that acts on a collection of subtypes of class Animal. We can write a method like so:
```
    void printAnimal(Collection<Animal> animals) {
        for (Animal animal : animals)
            animal.speakUp();
    }
```
The above method accepts a collection of type Animal and we can pass in a collection consisting of objects of type Tiger like so:
```
        Collection<Animal> tigers = new ArrayList<>();
        tigers.add(new Tiger());
        printAnimal(tigers);
```
The problem with the above approach is that we are passing in a collection of type Animal and we will be unable to pass in a collection of type Tiger. The below snippet would not compile with our current approach.
```
        Collection<Tiger> tigers = new ArrayList<>();
        printAnimal(tigers);
```
The wildcard allows us to tweak the printAnimal() method so that it accepts collections of type Animal or any of its subtypes. We can specify the printAnimal() method to accept an argument Collection<? extends Animal>. The notation ? extends Animal means an unknown type that is a subtype of Animal. We redefine the printAnimal() below:
```
    void printAnimal(Collection<? extends Animal> animals) {
        for (Animal animal : animals)
            System.out.println(animal);
    }
```
Now we can invoke the method with a collection of type Tiger.
```
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

class Demonstration {
    public static void main( String args[] ) {
        Collection<Tiger> tigers = new ArrayList<>();
        tigers.add(new Tiger());
        printAnimal(tigers);
    }
  
    static void printAnimal(Collection<? extends Animal> animals) {
        for (Animal animal : animals)
            animal.speakUp();
    }
}


class Animal {

    void speakUp() {
        System.out.println("gibberish");
    }
}

class Elephant extends Animal {

    @Override
    public void speakUp() {
        System.out.println("Trumpets..");
    }
}

class Tiger extends Animal {

    @Override
    void speakUp() {
        System.out.println("Rooaaarrssss");
    }
}
```

#### Will the following method have worked in the previous question for printing a list of type Animal?
```
    static <T extends Animal> void printAnimal(Collection<T> animals) {
        for (Animal animal : animals)
            animal.speakUp();
    }
```
Yes, the above method would have worked just as well. In fact, the erasure of both the following functions is the same according to the rules of erasure:
- For the following method:
```
    static <T extends Animal> void printAnimal(Collection<T> animals) {
        for (Animal animal : animals)
            animal.speakUp();
    }
```
The type parameter T is replaced by its first bound which is Animal and the collection parameter will drop its type parameter resulting in:
```
    static void printAnimal(Collection animals) {
        for (Animal animal : animals)
            animal.speakUp();
    }
```
- For the previous method:
```
    void printAnimal(Collection<? extends Animal> animals) {
        for (Animal animal : animals)
            animal.speakUp();
    }
```
The wildcard is bounded by type Animal but the entire type parameter for the collection parameter will be dropped resulting in:
```
    static void printAnimal(Collection animals) {
        for (Animal animal : animals)
            animal.speakUp();
    }
```

If you write both the methods in the same class, you'll get a compile error because the two methods have the same erasure.

#### What is the difference between `Collection<?>` and `Collection<? extends Object>`
Let's apply the rules of erasure to see what these collections are at runtime.
- `Collection<?>` has the wildcard as the type parameter, which is unbounded. We replaced unbounded type parameters with `Object` on type erasure, so the resulting collection will be `Collection<Object>`
- `Collection<? extends Object>` has a bounded type parameter. We replace the type parameter with the erasure of the leftmost (first) bound which is `Object` which gives us `Collection<Object>` as the erased type.

Therefore, both the collections are equivalent.

#### What happens when we try to compile the following snippet?
```
        Collection<?> myColl = new ArrayList<Object>();
        myColl.add(new Object());
```
Doesn’t compile, The `Collection<?>` is a collection of unknowns and we can’t add any type to it. We don’t know what the element type of myColl stands for therefore we cannot add objects to it.
```
import java.util.*;

class Demonstration {
    public static void main( String args[] ) {
        Collection<?> myColl = new ArrayList<>();
        // compile time error
        myColl.add(new Object());        
    }
}
```
**The only element that you can ever insert into a `List<?>` is `null`. The wildcard type prevents us from extracting elements from the `List<?>` as any type other than `Object`.**
```
import java.util.*;

class Demonstration {
    public static void main( String args[] ) {
        Collection<?> myColl = new ArrayList<Object>();
        myColl.add(null);        
    }
}
```

#### Does the snippet below compile?
```
    void notVeryUsefulMethod(Collection<?> collection) {
        for (Object obj : collection)
            System.out.println(obj.getClass());
    }
```
**Answer:** Compiles

The above method compiles and is being passed in a **collection of type unknown**. When we loop over the elements of the collection, we can only invoke the methods of the `Object` class on them.
```
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

class Demonstration {
    public static void main( String args[] ) {
        List<Object> list = new ArrayList<>();
        list.add(new Integer(5));
        list.add(new Double(77.23));
        list.add("randomString");
        notVeryUsefulMethod(list);
    }
  
    static void notVeryUsefulMethod(Collection<?> collection) {
        for (Object obj : collection)
            System.out.println(obj.getClass());
    }    
}
```

#### Consider the snippet below:
```
    void processCollection(Collection<Animal> collection) {
        // your awesome code here
    }
```
If we attempt to invoke the above method with the following arguments, we get a compile error. Given, that Tiger is a subtype of Animal, can you explain why the method doesn't accept a list of tigers?

Even though Tiger is a subtype of Animal, but it doesn't mean that `List<Tiger>` is a subtype of `List<Animal>`. They can best be thought of as sibling classes and that is the reason why the method doesn't accept the list of tigers. Note that a method which accepted a type of Animal would also accept a type of Tiger.

In general, if a type A extends type B then `List<A>` is not a subtype of `List<B>`. The common parent of `List<A>` and `List<A>` is `List<?>`.

#### Explain lower bound wildcard?
Consider our earlier example of types `Animal` and `Tiger`. We can restrict the unknown type to be a specific type or a supertype of that type and is represented using the `super` keyword. Consider the following method:
```
    void processAnimals(List<Tiger> list) {
        // Your awesome code here
    }
```
The above method will not accept a `List<Animal>`. We can relax the restriction using the unknown type like below:
```
    void processAnimals(List<? super Tiger> list) {
        // Your awesome code here 
    }
```
A lower bounded wildcard is expressed using the wildcard character `?`, following by the `super` keyword, followed by its lower bound: `<? super lowerBoundClassName>`.

The astute reader would realize that with the change, our method will now also accept a list of type `Object` since it is also a supertype of `Tiger`.
```
import java.util.*;

class Demonstration {
    public static void main( String args[] ) {
        List<Animal> animals = new ArrayList<>();
      
        // The method is able to accept a list of superclass of Tiger
        processAnimals(animals);
      
        // uncommenting the line below will show a compile error
        // unableToProcessAnimals(animals);
    }
  
    static void processAnimals(List<? super Tiger> list) {
        // Your awesome code here 
    }  
  
    static void unableToProcessAnimals(List<Tiger> list) {
        // Your awesome code here 
    }  
}

class Animal {

    void speakUp() {
        System.out.println("gibberish");
    }
}

class Tiger extends Animal {

    @Override
    void speakUp() {
        System.out.println("Rooaaarrssss");
    }
}
```

#### Which of the two following method declarations are valid and will compile?
```
    <T extends Tiger> someMethod(T aTiger){
        // unbreakable code here  
    }
 
    <T super Tiger> someMethod(T aTiger){
        // more awesome code here
    }
```
**Answer:** First method will only compile

Lowerbounds (`<T super Tiger>`) can't be used as return types. They can only be specified as method arguments. Hence the code doesn't compile as the below snippet demonstrates.
```
class Demonstration {
    public static void main( String args[] ) {
        System.out.println( "Hello World!" );
    }
  
    <T super Tiger> methodWontCompile(T someAnimal){
        return null; 
    }
}

class Animal {

    void speakUp() {
        System.out.println("gibberish");
    }
}

class Tiger extends Animal {

    @Override
    void speakUp() {
        System.out.println("Rooaaarrssss");
    }
}
```

#### Explain wildcard capture?
Wildcard capture is defined as: when a generic method is invoked, the type parameter (T, U, V, etc.) may be chosen to match the unknown type (?) represented by a wildcard.

Consider the following method implementation to reverse a list of type `Number`.
```
    void reverseList(List<? extends Number> list) {
        int i = 0;
        int e = list.size() - 1;
 
        while (i < e) {
            Number item = list.get(i);
            list.set(i, list.get(e));
            list.set(e, item);
        }
    }
```
The above snippet won't compile even though intuitively it feels the code should compile. The compiler can't confirm the type that is being inserted into the list and barfs. It is equivalent of saying the following
```
        // code doesn't compile
        List<Integer> myList = new ArrayList<>();
        Object k = myList.get(0);
        // compiler doesn't know what k is, it is an object and could very well be a string
        myList.set(0, k);
``` 
The declaration `List<? extends Number>` means a list of some type which extends `Number`. We don't know which type - it could be a `List<Integer>`, a `List<Double>`, or a `List<Float>`. That makes it safe to fetch any items out of the `List` and convert from T to `Number`. It's not safe to call in to the List API converting from `Number` to T because that conversion may be invalid.

We can fix our `reverse` method by introducing another generic method that captures the wildcard.
```
    void reverseList(List<? extends Number> list) {
        int i = 0;
        int e = list.size() - 1;
 
        while (i < e) {
            swap(list, i, e);
        }
    }
 
    // Here we say that the type variable T has 
    // captured the wildcard.
    <T> void swap(List<T> list, int i, int j) {
        T item = list.get(i);
        list.set(i, list.get(j));
        list.set(j, item);
    }
```
The type parameter `T` in method `swap()` is said to capture the wildcard.
```
import java.util.*;

class Demonstration {
    public static void main( String args[] ) {
        List<Float> floats = new ArrayList<>();
        floats.add(14.4f);
        floats.add(19.9f);
        floats.add(21.1f);
        
        // Before reversing
        for(Float f : floats) {
          System.out.print(" " + f + " ");
        }
      
        reverseList(floats);
        System.out.println();
      
        // After reversing
        for(Float f : floats) {
          System.out.print(" " + f + " ");
        }      
        
    }

    static void reverseList(List<? extends Number> list) {
        int i = 0;
        int e = list.size() - 1;

        while (i < e) {
            swap(list, i, e);
            i++;
            e--;
        }
    }

    // Here we say that the type variable T has 
    // captured the wildcard.
    static <T> void swap(List<T> list, int i, int j) {
        T item = list.get(i);
        list.set(i, list.get(j));
        list.set(j, item);
    }  
}
```

## The Get & the Put Principle
#### What is the Get and Put principle?
We use the ? wildcard to make methods more flexible and accept a larger number of types. For instance, consider the method below:
```
    void printNumbers(List<Number> nums) {
        for (Number number : nums)
            System.out.println(number);
    }
```
The above method will not accept a list of Integer or a list of Double etc. However, we can change the parametrized type to a bounded wildcard which will allow us to pass a list of all the subtypes of Number.
```
    void printNumbers(List<? extends Number> nums) {
        for (Number number : nums)
            System.out.println(number);
    }
```
The parameter List<? extends Number> tells us that the method printNumbers accepts a list of type that extends Number. The guarantee we have is that whatever the type is contained within the list we can read the value into a reference variable of type Number. Note we can't determine, if it's an integer or a double, just that it is of type number. Thus we can safely extract out elements of type T from a structure when the parametrized type is ? extends T. The Get Principle is to use an extends wildcard when you want to only get values out of a structure.

Note that the following snippet won't compile, even though intuitively it may seem that it should. We are trying to insert an integer into a list of unknown types that extend number and since integer also extends number we should be able to add the integer.

Adding integer into a list of unknown type that extends number
```
        List<? extends  Number> listOfNumbers = new ArrayList<>();
        Integer i = Integer.valueOf(5);
        // Attempting to put an integer in a list of uknown types that extend Number
        listOfNumbers.add(i); // <--- compile time error
```
This may seem confusing, since we can successfully add an integer into a list of numbers.

Adding integer into a list of numbers
```
        List<Number> list = new ArrayList<>();
        Integer i = Integer.valueOf(5);
        // Attempting to put an integer in a list of Number
        list.add(i); // <--- compiles
```
The reason, we can't insert an integer into a list of type ? extends T is because we could end up storing, for example a double into a list of integers as shown below
```
        List<Integer> listOfInts = new ArrayList<>();
        List<? extends Number> reference = listOfInts; // Allowed
        reference.add(new Double(4.0)); // <--- compile time error
```
The above snippet exemplifies why adding anything that extends a Number can't be added to a list that extends Number. In summary, think of ? extends T as containing every type in an interval bounded by the type of null below and by T above.

#### Consider the code snippet below. This time we are saving a Number into a list of types that extends Number. Will this work?
```
    void addNumber(Number num) {
        List<? extends Number> listOfNumbers = new ArrayList<>();
        listOfNumbers.add(num); // Will this work?
    }
```
**Answer:** Doesn’t compile

The above code will never compile because we are trying to add a number into a list of a type that extends Number and we can't guarantee the type of the number being passed into the method. Actually, the way the code is written, it is pretty useless. The list can never be added to since it is being declared inside the method and new-ed up at the same time.

Usually, list with unbounded wildcard or an extends wildcard bound are used to declare the parameter types in the method signature and not as variables inside a method.

Note that `List<? extends Number>` does not mean list of objects of different types, all of which extend Number. Rather it implies list of objects of a **single type which extends Number**.

#### Can we consider List<?> as an immutable list since we can never add to this list?
No even though you can't add any elements except null to a type that is parametrized on an unbounded wildcard or an extends wildcard, it is not equivalent of an immutable structure. For example, in case of collections, we can always remove elements from a collection even if it is parametrized on an extends wildcard or on an unbounded wildcard. It is incorrect to rely on wildcard bounding to protect a list from modifications.

#### What is the put principle?

The put principle is the inverse of the get principle. A list that with the bound List<? super T> can have elements of type T or its subtypes added to it but never taken out. The only value you can take out of such a list is of type Object since that is the supertype of every type. The put principle says to use a super wildcard when you only want to put values into a structure. Consider the snippet below:
```
        List<? super Number> listOfNumbers = new ArrayList<>();
        Integer i = Integer.valueOf(5);
        Double d = Double.valueOf(5);
 
        // Adding an integer
        listOfNumbers.add(i); // Allowed
        // Adding a double
        listOfNumbers.add(d); // Allowed
 
        i = listOfNumbers.get(0); // <--- Compile time error
 
        Object object = listOfNumbers.get(0); // Allowed
```
We can only retrieve Objects from the list as shown above though we may subsequently cast the retrieve object to another type at our own peril. In summary, think of ? super T as containing every type in an interval bounded by T below and by Object above.
```
import java.util.*;

class Demonstration {
    public static void main( String args[] ) {
        List<? super Number> listOfNumbers = new ArrayList<>();
        Integer i = Integer.valueOf(5);
        Double d = Double.valueOf(5);

        // Adding an integer
        listOfNumbers.add(i); // Allowed
        // Adding a double
        listOfNumbers.add(d); // Allowed

        // i = listOfNumbers.get(0); // <--- Compile time error

        Object object = listOfNumbers.get(0); // Allowed
    }
}
```

#### What to do when we want to both get and put values in a structure?
In situations where you want to create a structure to both put values into and get values out of, you shouldn't use the wildcard. We can't combine the wildcard with both extends and super in the same expression e.g. `<? extends Number super Double>` isn't legal though there may be situations where you would want something similar.

---
## Reification
#### What is reification in Java?

Reify is defined as to make something more real or consider it as real. Turn abstract into concrete or tangible. In Java terminology reify means the explicit representation of a type at runtime. As mentioned earlier the types `ArrayList<Integer>`, `ArrayList<String>` and `ArrayList<ArrayList<Integer>>` are essentially just the raw type `ArrayList` at runtime. There's no information at runtime available to ascertain whether an arraylist was declared as an arraylist of integers or was it an arraylist of strings. **This lack of type information at runtime makes generic types non-reifiable types.** Types that in a way can't remember, retain or convert compile time type information into runtime type information. The type information is lost because of erasure. Part of the reason to implement generics using erasure was compatibility. So that the new version of Java continues to work with Java programs written before generics and these programs can also be retrofitted with generic code.

Generics enforce type constraints at compile time. The following snippet will fail to compile

Non-reifiable Type
```
        List<Integer> list = new ArrayList<>();
        
        // Compile time error
        List<Object> refToList = list;
        
        // Never happens when running the program
        refToList.add(new Double(5));
```
Contrast this with **arrays in Java which are reifiable types. Arrays retain the type information of their components at runtime.** The following code will compile, but throws an exception at runtime.

Reifiable Type
```
        Integer[] array = new Integer[10];
        Number[] refToArray = array;
        // Attempt to store a Double in an array of Integers
        refToArray[0] = new Double(5);
```
An attempt to store a Double in an array of Integers results in a `ArrayStoreException` at runtime.

**The type of an array is reified with its component type, while the type of a parameterized type is reified without its type parameters.**
```
class Demonstration {
    public static void main( String args[] ) {
        Integer[] array = new Integer[10];
        Number[] refToArray = array;
        // Attempt to store a Double in an array of Integers
        // throws ArrayStoreException
        refToArray[0] = new Double(5);

    }
}
```

#### What is a reifiable type?
A type is reifiable if the type is completely represented at run time — that is, if erasure does not remove any useful information.

| Reifiable Types | Example |
|-|-|
| Primitive Type | int, double, char etc. |
| A nonparameterized class or interface type | Number, String, Serializable |
| parameterized type in which all type arguments are unbounded wildcards | List<?>, ArrayList<?>, or Map<?, ?> |
| Raw Type | List, ArrayList, or Map |
| array whose component type is reifiable | int[], Number[], List[], List[], or int[][] |

| Non-Reifiable Types | Example |
|-|-|
| Type Variable | T, U , V etc. |
| parameterized type with actual parameters | List<String>, ArrayList<Integer>, or Map<String, Integer> |
| parameterized type with a bound | List<? extends Number> or Comparable<? super String> |

#### How does `Instanceof` and casting work for non-reifiable types?
Instance tests depend on examining types at run time, and hence depend on reification. For this reason, an instance test against a type that is not reifiable is a compile time error. If the type information isn't known at runtime then it's understandably not possible to check if another object is truly an instance of the non-reifiable type. For example:
- `someObj instanceof T` is a compile time error
- `someObj instanceof List<String>` is a compile time error

```
import java.util.*;

class Demonstration<T> {
    public static void main( String args[] ) {
        Integer[] arr = new Integer[10];
        System.out.println(arr instanceof Integer[]);

        List<Integer> list = new ArrayList<>();
        System.out.println(list instanceof List);

        // list instanceof List<Integer> <--- compile time error
    }

    void testInstanceOf(Object o){
        // instance of test with the generic type  parameter
        // System.out.println(o instanceof T);  // <--- compile time error

    }
}
```

Attempting to cast an object to a generic type e.g. `T t = (T)someObj` results in a compiler warning and there's a potential of getting a class cast exception at runtime. Similarly, we can cast a generic parameter to another type e.g. `String someObj = (String)t` without a compile time warning but a potential for class cast exception exists at runtime. Below code exemplifies this concept:
```
class Demonstration {
    public static void main( String args[] ) {

        CastTest<Float> test = new CastTest<>();

        // works fine
        test.castObject(5.5);

        // Both of the following statements compile but
        // fail at runtime with ClassCastExceptions.
        // Uncomment the below lines to see the exception
        // being generated at runtime.
        // test.castObject("won't work");
        // test.castGenericParam(5);
    }
}

class CastTest<T extends Number> {

    public void castObject(Object obj) {
        T t = (T) obj; // <--- issues a unchecked cast warning
        System.out.println(t);
    }

    public void castGenericParam(T t) {
        String i = (String) ((Object) t); // <--- No compile time warning
        System.out.println(i);
    }
}
```

#### What is meant by creating an array of a non-reifiable type and why is it a bad idea?
Array are reifiable types, that is at runtime, arrays know the type of their components, e.g. was it an array of strings or an array of integers. Now, if we make the component of the array non-reifiable, it will create an array of a non-reifiable type. Pick your favorite non-reifiable type and create an array out of it and you'll end up with an array that will only remember as much component information as the component would remember at runtime. For example:

Declaring array of non-reifiable type
```
List<String>[] arrayOfStringOfLists = new List[5];
```
In the above example we create an array of list of strings, however since `List<String>` is a non-reifiable type, i.e. at runtime `List<String>` is equivalent of List, the data-structure we end up having is an array of non-reifiable type. Also note that we are new-ing up an array of raw List type, attempting to do `List<String>[] arrayOfStringOfLists = new List<String>[5];` results in a generic array creation compile time error.

Arrays of non-reifiable types are type unsafe because they can result in class cast exceptions. Consider the snippet below
```
    List<String>[] arrayOfStringOfLists = new List[5];
    List<? extends Object>[] ref = arrayOfStringOfLists;
    List<Integer> sneakyList = new ArrayList<Integer>();
    sneakyList.add(420);
    // We successfully added an integer list to an array of 
    // string lists
    ref[0] = sneakyList;
```
The compiler does warn us when we create the list in the first line with an unchecked warning. The raw list is being implicitly compiled to an array of list of strings.

If your code makes use of arrays whose components aren't reifiable types, then make sure no reference to such an array is leaked out to a client or subclasses which can potentially attempt to store a different type than what you originally intended.
```
import java.util.*;

class Demonstration {
    @SuppressWarnings("unchecked")
    public static void main( String args[] ) {
        List<String>[] arrayOfStringOfLists = new List[5];
        List<? extends Object>[] ref = arrayOfStringOfLists;
        List<Integer> sneakyList = new ArrayList<Integer>();
        sneakyList.add(420);
        // We successfully added an integer list to an array of 
        // string lists
        ref[0] = sneakyList;

        /* Uncommenting the below code will throw a class cast 
         * exception
        List<String> iExpectStringList = arrayOfStringOfLists[0];
        for(String str : iExpectStringList)
            System.out.println(str);
        */    
    }
}
```

#### If a generic method takes in varargs as input will that create a generic array?
If a generic method has varargs as input parameters, then indeed a generic array can be created. Let's define a very simple method first
```
    <T> void someMethod(T... args) {
        T[] inputs = args;
        for (T t : args)
            System.out.println(t);
    }
```
This method is shown below, feel free to play with it.
```
class Demonstration {
    public static void main( String args[] ) {
        Demonstration.<String>someMethod("a", "b", "c");

        Demonstration.<Integer>someMethod(1 ,2 ,3);
    }

    @SuppressWarnings("unchecked")
    static <T> void someMethod(T... args) {
        T[] inputs = args;
        for (T t : args)
            System.out.println(t);
    }    
}
```
Now we can modify the method to return us an array of type T[].
```
    <T> T[] someMethod(T... args) {
        return args;
    }
```
And use it as follows:
```
    String[] array = someMethod("a", "b");
```
```
class Demonstration {
    public static void main( String args[] ) {
      String[] array = someMethod("I love ", "Educative!");
      for(String str : array)
        System.out.print(str);
    }

    @SuppressWarnings("unchecked")
    static <T> T[] someMethod(T... args) {
        return args;
    }
    
}
```
But what if we pass in a non-reifiable type to the varargs method? It ends up creating an array of non-reifiable type and we are back to the same problem as in the previous question, where we can store a different type in the array than intended without getting a ArrayStoreException.

Broken code with varargs
```
        List<String> l1 = Arrays.asList("Getting");
        List<String> l2 = Arrays.asList("Complex");
 
        // Try to create a List<String>[] i.e. an array of
        // a list of Strings.
        List<String>[] arrayOfListOfStrings = someMethod(l1, l2);
        
        // Now try to sneak in a list of integers in am
        // array of list of strings
        List<Integer> sneakyList = Arrays.asList(420);
        List<? extends Object>[] ref = arrayOfListOfStrings;
        ref[0] = sneakyList;
```

```
import java.util.*;

@SuppressWarnings("unchecked")
class Demonstration {

    public static void main( String args[] ) {
        List<String> l1 = Arrays.asList("Getting");
        List<String> l2 = Arrays.asList("Complex");

        // Try to create a List<String>[] i.e. an array of
        // a list of Strings.
        List<String>[] arrayOfListOfStrings = someMethod(l1, l2);

        // Now try to sneak in a list of integers in am
        // array of list of strings
        List<Integer> sneakyList = Arrays.asList(420);
        List<? extends Object>[] ref = arrayOfListOfStrings;
        ref[0] = sneakyList;
    }

    static <T> T[] someMethod(T... args) {
        return args;
    }    
}
```

The crux of this monologue is to drive home the point that generics, when mixed with arrays, can be dangerous and should be avoided. If there's an absolute need then care must be taken to ensure that class cast exceptions can't be raised at runtime.





---