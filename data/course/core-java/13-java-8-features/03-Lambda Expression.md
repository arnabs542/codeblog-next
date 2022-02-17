---
title: 'Lambda Expression'
type: 'topic'
section: 'Java 8 Features'
course: 'Core Java'
tags:
- java
---
## Lambda Expression
- By introducing lambdas in Java 8, the authors of Java tried to add elements of **functional programming** in Java.
- In **object-oriented programming**, objects and classes are the main entities. If we create a function then it should exist within a class. A function has no meaning outside the scope of the class object.
- In **functional programming**, functions can exist outside the scope of an object. We can assign them to a reference variable and we can also pass them to other methods as a parameter.
- A **lambda expression** is just an anonymous function, i.e., a function with no name and that is not bound to an identifier. We can pass it to other methods as parameters, therefore, using the power of functional programming in Java.
- Lambdas get wrapped inside new classes generated during runtime.

## Syntax
**classic object-oriented programming example:**
```java
@FunctionalInterface
public interface Greeting {
    void greet();
}
```
```java
public class EnglishGreeting implements Greeting {
    // Overriding the greet() method from Greeting interface.
    @Override
    public void greet() {
        System.out.println("Good Morning");
    }
}
```
```java
public class WellWisher {
    public static void wish(Greeting greeting) {
        greeting.greet();
    }
    public static void main(String args[]) {
        Greeting englishGreeting = new EnglishGreeting();
        wish(englishGreeting);  // Passing an object of EnglishGreeting.
    }
}
```
Do we need to create a class for each language, e.g., SpanishGreeting, FrenchGreeting, etc?
- This is possible through anonymous classes.

```java
public class WellWisher {
    public static void wish(Greeting greeting) {
        greeting.greet();
    }
    public static void main(String args[]) {
        // We are passing an anonymous class object to the wish method.
        wish(new Greeting() {
            @Override
            public void greet() {
                System.out.println("Namaste");
            }
        });
    }
}
```
To make our code less cumbersome, let’s remove all the unnecessary code step-by-step and create our first **lambda expression**.
- **Step 1:** The compiler knows that the wish(Greeting greeting) method takes in a parameter of type Greeting. So, we don’t need to specifically create an anonymous class of type greeting.
- **Step 2:** We know that the Greeting interface has only one method. So, we don’t need to provide the method name. We are only concerned with the method body.
- **Step 3:** The compiler can understand that the body does not return anything. So, mentioning the return type is redundant. We can also remove the public declaration.
- Since the method body contains only a single line, the curly braces are also unnecessary.

> Please note that we add a -> between the empty brackets and the method body. This is how a lambda expression is declared.

```java
public class WellWisher {
    public static void wish(Greeting greeting) {
        greeting.greet();
    }
    // Passing a lambda expression to wish method.
    public static void main(String args[]) {
        wish( () -> System.out.println("Namaste") );
    }
}
```

---
## Java Comparator Using Lambda
- To sort the elements in a collection, if it contains a wrapper class object then we can directly use `Collections.sort()` since all the wrapper classes implement the `Comparable` interface.
- However, if collection contains a custom class object then we need to provide the logic to sort your object.

**creating an anonymous comparator**
```java
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class PersonService {
    public static List<Person> getPersons(List<Person> persons){
        // Created an anonymous Comparator, which sorts the Person object on the basis of Person name.
        Collections.sort(persons, new Comparator<Person>() {
            @Override
            public int compare(Person p1, Person p2) {
                return p1.getName().compareTo(p2.getName());
            }
        });
        return persons;
    }
}
```
**using a lambda expression**
```java
import java.util.Collections;
import java.util.Comparator;
import java.util.List;

public class PersonService {
    public static List<Person> getPersons(List<Person> persons){
        // Instead of creating an anonymous class, we have provided a lambda expression.
        Collections.sort(persons, (p1, p2) -> p1.getName().compareTo(p2.getName()));
        return persons;
    }
}
```

> Java 8 provides some in-built functional interfaces in the java.util.function package. These interfaces are required so that, while writing lambda expressions, we don’t need to worry about creating a functional interface.
There are 43 predefined interfaces in Java 8.

---
## `Predicate` Functional Interface

| Interface | Name | Description	Abstract Method |
|-|-|-|
| `Predicate<T>` | Represents a predicate (boolean-value function) of one argument (reference type) | `boolean test(T t)` |
| `DoublePredicate` | Accepts one double-value argument | `boolean test(double value)` |
| `IntPredicate` | Accepts one int-value argument. | `boolean test(int value)` |
| `LongPredicate` | Accepts one long-value argument | `boolean test(long value)` |
| `BiPredicate<T,U>` | Accepts two arguments (reference types) | `boolean test(T t, U u)` |

The Predicate<T> interface has an abstract method boolean test(T t). Basically, a predicate is a function that evaluates the given input and returns true or false.
```java
import java.util.function.Predicate;

public class PredicateDemo {
  static boolean isPersonEligibleForVoting(Person person, Predicate<Person> predicate){
    return predicate.test(person);
  }
  static boolean isPersonEligibleForRetirement(Person person, Predicate<Person> predicate){
    return predicate.test(person);
  }
  static boolean isPersonEligibleForMembership(Person person, Predicate<Person> predicate){
    return predicate.test(person);
  }
  static boolean isNumberLessThanTen(Predicate<Integer> predicate){
    return predicate.negate().test(14);
  }

  public static void main (String args[]){
    Person person = new Person("Alex", 23);
    // Created a predicate. It returns true if age is greater than 18.
    Predicate<Person> predicate = p -> p.age > 18;
    boolean eligible = isPersonEligibleForVoting(person , predicate);
    System.out.println("Person is eligible for voting: " + eligible);

    Predicate<Person> greaterThanEighteen = (p) -> p.age > 18;
    Predicate<Person> lessThanSixty = (p) -> p.age < 60;
    Predicate<Person> predicate = greaterThanEighteen.and(lessThanSixty);
    boolean eligible = isPersonEligibleForMembership(person , predicate);
    System.out.println("Person is eligible for membership: " + eligible);

    Predicate<Person> serviceMoreThanThirty = (p) -> p.yearsOfService > 30;
    Predicate<Person> predicate = greaterThanEighteen.or(serviceMoreThanThirty);
    boolean eligible = isPersonEligibleForRetirement(person , predicate);
    System.out.println("Person is eligible for membership: " + eligible);

    Predicate<Integer> numberGreaterThanTen = p -> p > 10;
    boolean isLessThanTen = isNumberLessThanTen( numberGreaterThanTen);
    System.out.println("Is number less than ten: " + isLessThanTen);

    Predicate<String> predicate  = Predicate.isEqual("Hello");
    System.out.println(predicate.test("Welcome"));

  }
}

class Person {
  String name;
  int age;

  Person(String name, int age){
    this.name = name;
    this.age = age;
  }
}
```

## BiPredicate interface
- The `Predicate<T>` takes only one parameter and returns the result. Now suppose we have a requirement where we need to send two parameters (i.e person object and min age to vote) and then return the result. Here, we can use `BiPredicate<T, T>`.
- The BiPredicate<T, T> has a functional method test(Object, Object) . It takes in two parameters and returns a boolean value.

```java
import java.util.function.BiPredicate;

public class PredicateTest {
  static boolean isPersonEligibleForVoting(
      Person person, Integer minAge, BiPredicate<Person, Integer> predicate) {
    return predicate.test(person, minAge);
  }

  public static void main(String args[]) {
    Person person = new Person("Alex", 23);
    boolean eligible =
        isPersonEligibleForVoting(
            person,
            18,
            (p, minAge) -> {
              return p.age > minAge;
            });
    System.out.println("Person is eligible for voting: " + eligible);
  }
}

class Person {
  String name;
  int age;

  Person(String name, int age){
    this.name = name;
    this.age = age;
  }
}
```
Similarly, we can use other predicates like IntPredicate, LongPredicate, and DoublePredicate. The only difference is that these predicates take an input of a particular type, i.e., int, double, or long.

---
## Supplier Functional Interface
- `Supplier` is an interface that does not take in any argument but produces a value when the get() function is invoked.
- Suppliers are useful when we don’t need to supply any value and obtain a result at the same time.


| Interface Name | Description | Abstract Method |
|-|-|-|
| `Supplier<T>` | Represents a supplier of results (reference type) | `T get()` |
| `DoubleSupplier` | A supplier of double-value results | `double getAsDouble()` |
| `IntSupplier` | A supplier of int-value results | `int getAsInt()` |
| `LongSupplier` | A supplier of long-value results | `long getAsLong()` |
| `BooleanSupplier` | A supplier of boolean-value results | `boolean getAsBoolean()` |

#### `Supplier<T>`
- The `Supplier<T>` interface supplies a result of type T. In the previous lesson, we were passing a person object and a predicate to our `isPersonEligibleForVoting()` method.
- In this example, we will provide a `Supplier<Person>` instead of the Person object. The `isPersonEligibleForVoting()` method will, itself, fetch the Person object from the supplier. Here is the code for this.

```java
import java.util.function.Predicate;
import java.util.function.Supplier;

public class SupplierTest {

  static boolean isPersonEligibleForVoting(
      Supplier<Person> supplier, Predicate<Person> predicate) {
    return predicate.test(supplier.get());
  }

  public static void main(String args[]) {
    Supplier<Person> supplier = () -> new Person("Alex", 23);
    Predicate<Person> predicate = (p) -> p.age > 18;
    boolean eligible =
        isPersonEligibleForVoting(supplier, predicate);
    System.out.println("Person is eligible for voting: " + eligible);
  }
}

class Person {
  String name;
  int age;

  Person(String name, int age) {
    this.name = name;
    this.age = age;
  }
}
```
Let us look at some of the primitive specializations of the supplier interface.

#### `IntSupplier`
The `IntSupplier` interface has a method `getAsInt()`, which applies the given operation on its argument and returns an int value. It is similar to using an object of type `Supplier<Integer>`.
```java
import java.util.function.IntSupplier;

public class SupplierDemo {
  public static void main(String args[]) {
        IntSupplier supplier = () -> (int)(Math.random() * 10); 
        System.out.println(supplier.getAsInt()); 
  }
}
```

#### `DoubleSupplier`
The `DoubleSupplier` interface has a method `getAsDouble()`, which applies the given operation on its argument and returns a double value. It is similar to using an object of type `Supplier<Double>`.
```java
import java.util.function.DoubleSupplier;

public class SupplierDemo {
  public static void main(String args[]) {
        DoubleSupplier supplier = () -> (int)(Math.random() * 10); 
        System.out.println(supplier.getAsDouble()); 
  }
}
```

---
## Consumer Functional Interface
- `Consumers` are functional interfaces that take in a parameter and do not produce anything.

||||
|-|-|-|
| `Consumer<T>` | Represents an operation that accepts a single (reference type) input argument and returns no result | `void accept(T t)`
| `DoubleConsumer` | Accepts a single double-value argument and returns no result | `void accept(double value)`
| `IntConsumer` | Accepts a single int-value argument and returns no result | `void accept(int value)`
| `LongConsumer` | Accepts a single long-value argument and returns no result | `void accept(long value)`
| `BiConsumer<T, U>` | Represents an operation that accepts two (reference type) input arguments and returns no result | `void accept(T t, U u)`
| `ObjDoubleConsumer<T>` | Accepts an object-value and a double-value argument, and returns no result | `void accept(T t, double value)`
| `ObjIntConsumer<T>` | Accepts an object-value and an int-value argument, and returns no result | `void accept(T t, int value)`
| `ObjLongConsumer<T>` | Accepts an object-value and a long-value argument, and returns no result | `void accept(T t, long value)`

#### `Consumer<T>`
- This interface takes a parameter of type T and does not return anything.
- A consumer can be used in all contexts where an object needs to be consumed,i.e. taken as input, and some operation is performed on the object without returning any result.
- Consumer<T> has an abstract method `accept()` and a default method called `andThen()`, which is used for chaining.

```java
import java.util.function.Consumer;

public class ConsumerDemo {
  public static void main(String[] args) {
		Consumer<String> stringConsumer = s -> System.out.println(s);
		stringConsumer.accept("Hello World.");	
		Consumer<Integer> intConsumer = i -> System.out.println("Integer value = " + i);
		intConsumer.accept(5);
	}
}
```
The `andThen()` method, which is a default method in the `Consumer` interface is used for chaining.
```java
Consumer<T> andThen(Consumer<? super T> after)
```
```java
import java.util.function.Consumer;

public class ConsumerDemo {
    public static void main(String[] args) {
        Consumer<String> consumer1 = (arg) -> System.out.println(arg + "My name is Jane.");
        Consumer<String> consumer2 = (arg) -> System.out.println(arg + "I am from Canada.");
        consumer1.andThen(consumer2).accept("Hello. ");
    }
}
```

#### `BiConsumer<T,U>`
This interface takes two parameters and returns nothing.
- T - the type of the first argument to the operation
- U - the type of the second argument to the operation.

```java
import java.util.function.BiConsumer;

public class BiConsumerDemo {
    public static void main(String[] args) {
      BiConsumer<String, String> greet = (s1, s2) -> System.out.println(s1 + s2);
      greet.accept("Hello", "World");
    }
}
```

---
## Function Interface
- Function is a category of functional interfaces that takes an object of type T and returns an object of type R.
- Function interfaces are very useful as we can specify the type of input and output.

#### `Function<T, R>`
- The function takes only one argument of type T and returns a result of type R.

**`R apply(T t)`:** This is the abstract method of the Function interface. It takes one argument of type T as input and returns a value of type R.
```java
import java.util.function.Function;
 
public class FunctionInterfaceDemo {
    public static void main(String[] args) {
        // Created a function which returns the length of string.
        Function<String, Integer> lengthFunction = str -> str.length();
        System.out.println("String length: " + lengthFunction.apply("This is awesome!!"));
 
    }
}
```

**`compose(Function<? super V, ? extends T> before)`:** Returns a composed function that first applies the function provided as a parameter on the input, and then applies the function on which it is called, to the result.
```java
import java.util.function.Function;

public class FunctionDemo {
    public static void main(String args[]) {
        // Function which adds 10 to the given element.
        Function<Integer, Integer> increment = x -> x + 10;
        // Function which doubles the given element.
        Function<Integer, Integer> multiply = y -> y * 2;
        // Since we are using compose(), multiplication will be done first and then increment will be done.
        System.out.println("compose result: " + increment.compose(multiply).apply(3));

    }
}
```

**`andThen(Function<? super R,? extends V> after)`**: This method returns a composed function that first applies the function on which it is called on the input, and then applies the function provided as parameter, to the result.
```java
import java.util.function.Function;

public class FunctionDemo {
    public static void main(String args[]) {
        Function<Integer,Integer> increment = x -> x + 10;
        Function<Integer,Integer> multiply = y -> y * 2;
        // Since we are using andThen(), increment will be done first and then multiplication will be done.
        System.out.println("andThen result: " + increment.andThen(multiply).apply(3));
    }
}
```

#### `BiFunction<T,U,R>`
The `BiFunction<T, U, R>` is similar to `Function<T, R>` interface; the only difference is that the BiFunction interface takes in two parameters and returns an output.
```java
import java.util.function.BiFunction; 
  
public class BiFunctionInterfaceDemo { 
    public static void main(String args[]) { 
        BiFunction<Integer, Integer, Integer> add = (a, b) -> a + b; 
        System.out.println("Sum = " + add.apply(2, 3)); 
    } 
} 
```

---
## `UnaryOperator<T>`
- The `UnaryOperator<T>` interface represents a function that takes one argument of type `T` and returns a value of the same type. This is similar to the `Function` interface, which is a parent to the `UnaryOperator` interface.
- The UnaryOperator does not define any new abstract methods. Since it extends the Function interface from the same package, it inherits the following method from the Function interface :
```
T apply(T t)
```

| | | |
|-|-|-|
| `UnaryOperator <T>` | Represents an operation on a single operand that produces a result of the same type as its operand (reference type) | `T apply (T t)` |
| `DoubleUnaryOperator` | Accepts single double-value operand and produces a double-value result | `double applyAsDouble(double operand)` |
| `IntUnaryOperator` | Accepts a single int-value operand and produces an int-value result | `int applyAsInt(int operand)` |
| `LongUnaryOperator` | Accepts a single long-value operand and produces a long-value result | `long applyAsLong(long operand)` |

```java
import java.util.function.UnaryOperator;

public class UnaryOperatorTest {
    public static void main(String args[]) {
        Person person = new Person();
        UnaryOperator<Person> operator = (p) -> {
            p.name = "John";
            p.age = 34;
            return p;
        };
        operator.apply(person);
        System.out.println("Person Name: " + person.getName() + " Person Age: " + person.getAge());
    }
}

class Person {
    String name;
    int age;
    Person() {
    }
    Person(String name, int age) {
        this.name = name;
        this.age = age;
    }
    public void setName(String name) {
        this.name = name;
    }
    public void setAge(int age) {
        this.age = age;
    }
    public String getName() {
        return name;
    }
    public int getAge() {
        return age;
    }
}
```

#### `IntUnaryOperator`
- This is the primitive flavor of the `UnaryOperator`. It takes an `int` as an argument and returns `int` as a result.
- We should always prefer using the primitive flavors of functional interfaces as boxing and unboxing are not good for performance.

```java
import java.util.function.IntUnaryOperator;

public class UnaryOperatorTest {
    public static void main(String args[]) {
        IntUnaryOperator operator = num -> num * num;
        System.out.println(operator.applyAsInt(25));
    }
}
```

---
## `BinaryOperator<T>`
- `BinaryOperator<T>` is a functional interface that inherits from `BiFunction<T, T, T>` interface.
- The `BinaryOperator<T>` interface takes only one parameter as compared to `BiFunction<T, T, T>`, which takes three parameters.
- Both the input objects and the result are of the same type in `BinaryOperator<T>`.

||||
|-|-|-|
| `BinaryOperator<T>` | Represents an operation upon two operands of the same type, producing a result of the same type as the operands (reference type) | `T apply(T t, T u)` |
| `DoubleBinaryOperator` | Accepts two double-value operands and produces a double-value result | `double applyAsDouble(double left, double right)` |
| `IntBinaryOperator` | Accepts two int-value operands and produces an int-value result | `int applyAsInt(int left, int right)` |
| `LongBinaryOperator` | Accepts two long-value operands and produces a long-value result. | `applyAsLong(long left, long right)` |

```java
import java.util.function.BinaryOperator;

public class BinaryOperatorDemo {


    public static void main(String args[]) {
        Person person1 = new Person("Alex", 23);
        Person person2 = new Person("Daniel", 56);
        BinaryOperator<Person> operator = (p1, p2) -> {
            p1.name = p2.name;
            p1.age = p2.age;
            return p1;
        };

        operator.apply(person1, person2);
        System.out.println("Person Name: " + person1.getName() + " Person Age: " + person1.getAge());
    }
}

class Person {
    String name;
    int age;

    Person() {
    }

    Person(String name, int age) {
        this.name = name;
        this.age = age;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public String getName() {
        return name;
    }

    public int getAge() {
        return age;
    }
}
```

---
## Capturing lambdas
- A lambda expression is said to be capturing if it either accesses instance variables of it’s enclosing class or local variables (final or effectively final) from it’s enclosing scope.
- A lambda expression can capture the three types of variables given below:
    1. Static variables
    1. Instance variables
    1. Local variables

If a lambda expression captures a local variable then the variable should be either **final** or **effectively final**.

#### What is effectively final?
- **Effectively final** is a new concept that was introduced in Java 8. A non-final, local variable whose value is never changed after initialization is known as **effectively final**.
- Before Java 8, we cannot use a non-final, local variable in an anonymous class. If you need to access a local variable in an anonymous class, then it should be declared as final. This restriction is relaxed in Java 8. Now, the compiler, itself can check if the value of a variable is not changed after the assignment. Then, it is effectively final.

```java
import java.util.function.UnaryOperator;

public class CapturingLambdaDemo {
    public static void main(String args[]){
        int i = 5;
        UnaryOperator<Integer> operator = (input) -> input * i;
        System.out.println(operator.apply(i));
    }
}
```
lambda is capturing a local variable called i. The value of this variable is initialized once and never changed, so it is effectively final.

```java
import java.util.function.UnaryOperator;

public class CapturingLambdaDemo {
    public static void main(String args[]){
        int i = 5;
        i = 7; // Since we have changed the value of i, the below line will not compile.
        UnaryOperator<Integer> operator = (input) -> input * i; 
        System.out.println(operator.apply(i));
    }
}
```
code will not compile because we have modified the value of the local variable and it is not final anymore.

```java
import java.util.function.UnaryOperator;

public class CapturingLambdaDemo {
    static int i = 0;
    public static void main(String args[]){
        i = 7; // Since we have changed the value of i, the below line will not compile.
        UnaryOperator<Integer> operator = (input) -> input * i; 
        System.out.println(operator.apply(i));        
    }
}
```
code will compile because the variable is reassigned, but it is not a local variable.

#### Why should local variables be final or effectively final?
- When a local variable is used in a lambda expression, the lambda makes a copy of that variable. This occurs because the scope of a lambda expression is only until the method is in the stack. If the lambda does not make a copy of the variable, then the variable is lost after the method is removed from the stack.
- Now, if the variable is not final or effectively final, it is possible that the value of the variable is changed after using it in the lambda as shown below.

```java
import java.util.function.Function;

public class CapturingLambdaDemo {
    public static void main(String args[]){
        Function<Integer, Integer> multiplier = getMultiplier();
        System.out.println(multiplier.apply(10));
    }
    public static Function<Integer,Integer> getMultiplier(){
        int i = 5;
        // The below lambda has copied the value of i.
        Function<Integer, Integer> multiplier = t -> t * i;
        // If you change the value of i here, then the lambda will have old value.
        // So this is not allowed and code will not compile.
        i = 7;
        return multiplier; 
    }
}
```