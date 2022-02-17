---
title: 'Lambda Expressions'
type: 'topic'
section: 'Interview Questions'
course: 'Core Java'
tags:
- java
---
## Lambda Expressions
#### What are Lambda expressions?
Lambda expressions allow us **to pass code as data or functionality as a method argument.** They increase the expressiveness of Java language making code more readable and concise. Lambda expressions can be used to replace writing anonymous classes, when the class implements a functional interface. A functional interface has only a single abstract method and may have default or static methods. Let's see an example below.
```
// A functional interface
interface DoStuff {
  void work();
}
 
    public static void main( String args[] ) {
      
      DoStuff ds = new DoStuff() {
        public void work() {
          System.out.println("I ran via anonymous class");
        }
      };
      ds.work();
 
    }
```

Using lambda expression, we can write the above in a much nicer and concise way as following
```
// A functional interface
    interface DoStuff {
       void work();
    }
 
    public static void main( String args[] ) {
      
      DoStuff ds1 = ()-> System.out.println("I ran via lambda expression");
      ds.work();
 
    }
```

#### Why can lambdas only be used with functional interfaces?
If you could assign a lambda expression to an interface having more than one abstract method (i.e. a nonfunctional interface), the lambda expression can only implement one of the methods, leaving the other methods of the interface unimplemented.

#### Can lambda expression have parameters?
Sure they can. Lambda expressions can have zero, one, or multiple parameters. Let's see how we'll rewrite a comparator being passed into a constructor of a priority queue using lambdas.

Comparator using Anonymous Class
```
        Comparator<Integer> descendingComparator = new Comparator<Integer>() {
 
            @Override
            public int compare(Integer i1, Integer i2) {
                return i2 - i1;
            }
        };
        PriorityQueue q = new PriorityQueue(descendingComparator);
```
Comparator using Lambda
```
        Comparator<Integer> descendingComparator = (i1, i2) -> {
            return i2 - i1;
        };
 
        PriorityQueue q = new PriorityQueue(descendingComparator);
```

#### Can lambda expressions return values?
Indeed they can. Below is an example of an interface that raises a given value x to its y-th power.

Example Functional Interface
```
    interface RaiseToPower {
    
        int raiseToX(int x);
      
    }
```
For convenience, we can create interface objects that always compute the square or the cube of a given value.

Lamda Returning Value
```
      RaiseToPower square = (x) -> {return x*x;};
      RaiseToPower cube = (x) -> {return x*x*x;};
```
The lambda expressions return either a square or a cube of the given value. Whenever lambdas return a value we can't skip the enclosing curly braces. Look at the below snippet where we skip the curly braces.

Example of Lambdas Expression
```
        Runnable f = () -> System.out.println("Hello");
        f.run();
```
Usually, the Runnable interface is used in multithreading, but we borrow it here for a trivial print statement to show how curly braces can be skipped.

#### Can lambda be thought of as replacement of anonymous classes for implementing functional interfaces?
No, one primary difference between the two is that the anonymous classes can maintain state as they can have instance or static variables whereas lambda expressions are just method implementations.

#### In the below example, why do we not need to specify the type of the parameters being passed in to the lambda expression?
```
interface CrunchNumbers {
    void work(int a, int b);
}
 
void test() {
    // k and j don't have their types defined.
    myMethod((k, j) -> {
        System.out.println(k % j == 0 ? "exactly divisible" : "not divisible");
    });
}
```

We can skip specifying the types of the variables being passed into the method being implemented by the lambda expression because the compiler is intelligent enough to infer the types looking at the interface definition. This is called type inference. The compiler infers the type of a parameter by looking elsewhere for the type - which is the interface's function definition. More generally, the process of automatically deducing unspecified data types of an expression based on the contextual information is called type inference.

Specifying parameter types for a lambda expression may sometimes be necessary if the compiler cannot infer the parameter types from the functional interface method the lambda is matching.

If the data types are specified, the code still works correctly as shown below.
```
class Demonstration {
    public static void main( String args[] ) {

        // Without specifying the data types of the method arguments
        CrunchNumbers cn1 = (k, j) -> {
            System.out.println(k % j == 0 ? "exactly divisible" : "not divisible");
        };

        // With specifying the data types of the method arguments
        CrunchNumbers cn2 = (int k, int j) -> {
            System.out.println(k % j == 0 ? "exactly divisible" : "not divisible");
        };      
      
        cn1.work(4, 2);
        cn2.work(4, 2);
    }
}

interface CrunchNumbers {

    void work(int a, int b);

}
```

#### Can lambda expressions capture variables in the outer scope?
Lambda expressions can capture local, instance, and static variables. Also note that unlike anonymous classes, lambda expressions don't suffer from shadowing. They do not inherit any names from a supertype or introduce a new level of scoping. Declarations in a lambda expression are interpreted just as they are in the enclosing environment. Let's see examples of each below.
```
1. public class LambdaVariableCapture {
2. 
3.     private static String staticVar = "static variable";
4.     private String instVar = "instance variable";
5. 
6.     public Work captureVariables() {
7. 
8.         int i = 0;
9.         Work w = () -> {
10.            // int i; declaring i would result in compile error.
11.             
12.             String instVar = "lambda variable";
13.             System.out.println(i);
14.             System.out.println(staticVar);
15.             System.out.println(this.instVar);
16.             System.out.println(instVar);
17. 
18.             // Let's check what is this pointing to
19.             System.out.println(this.getClass());
20.         };
21. 
22.         staticVar = "changed static var";
23.         instVar = "changed instance var";
24.         // i = 5 will result in compile error
25.  
26.         return w;
27.     }
28. }
29. 
30. interface Work {
31. 
32.     void work();
33.
34. }
```
Observe the following about the above code:
- We can access static variable staticVar inside the lambda expression. Note that after defining the lambda expression, we change the static variable and that is reflected in the output of the program.
- We can access instance variables too inside a lambda expression. However, note that if we define a variable inside a lambda expression with the same name as an instance variable then we'll need to differentiate between the two using the this keyword. In our example, we capture the instVar on line-15. The scoping rules for the enclosing method also apply to the lambda expression. If we were to declare instVar variable in the captureVariables method instead of the lambda expression, we'll need to again differentiate between the instance and the local variables of the same name. Without the this keyword prefix, the variable would refer to the local definition and not the instance definition.
- We can capture the local variables in the enclosing scope of the lambda expression as we have done in the example with the variable i. The restriction is however that i should be either final or effectively final. If you try to change the value of i after defining the lambda, you'll get a compile error as on line - 24.
- Note on lines 17 and 15 we also capture the this variable.

```
class Demonstration {
    public static void main( String args[] ) {
        Work w = (new LambdaVariableCapture()).captureVariables();
        w.work();
    }
}
class LambdaVariableCapture {

    private static String staticVar = "static variable";
    private String instVar = "instance variable";

    public Work captureVariables() {

        int i = 0;
        Work w = () -> {
            // int i; declaring i would result in compile error.
            
            String instVar = "lambda variable";
            System.out.println("i = " + i);
            System.out.println(staticVar);
            System.out.println(this.instVar);
            System.out.println(instVar);

            // Let's check what is this pointing to
            System.out.println(this.getClass());
        };

        staticVar = "changed static var";
        instVar = "changed instance var";

        return w;
    }
}

interface Work {

    void work();

}
```

#### What will be the output when the method getWorking() is invoked on an object of the below class?
```
class LambdaTargetType {
    public void getWorking() throws Exception {
        compute(() -> "done");
    }
 
    void compute(Runnable r) {
        System.out.println("Runnable invoked");
        r.run();
    }
 
    <T> void compute(Callable<T> c) throws Exception {
        System.out.println("Callable invoked");
        return c.call();
    }
}
```
The question asks which one of the two overloaded compute methods will be invoked. This requires the compiler to determine what will be the type of the lambda expression () -> "done" being passed in.

Lambda Expressions do not have an explicit type. Their type is inferred by looking at the target type of the context or situation. The target-type of an expression is the data type that the Java Compiler expects depending on where the expression appears.

In the given snippet, the data type of the arguments of the two overloaded methods is called the target type. To determine the type of a lambda expression, the Java compiler uses the target type of the context or situation in which the lambda expression was found. It implies that lambda expressions can only be used in situations in which the Java compiler can determine a target type. Since the expression returns a string, the compiler matches the call with the compute method that accepts a type of Callable and thus the lambda expression () -> "done" is of type callable.







---