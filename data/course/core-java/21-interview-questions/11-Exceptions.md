---
title: 'Exceptions'
type: 'topic'
section: 'Interview Questions'
course: 'Core Java'
tags:
- java
---
#### Exceptions
###### What is an exception?
**An exception is an event, which occurs during the execution of a program, that disrupts the normal flow of the program's instructions. The term exception is shorthand for the phrase "exceptional event."** Using exceptions helps us:
- Separate out error handling code from rest of the code
- Errors can be propagated up the call stack and only handled by interested methods
- Errors can be grouped and organized in hierarchy. For instance the `java.io.IOException` is the most general exception for input/output errors. A method can choose to catch and handle this broad category of errors or a much narrower and specific exception such as `java.io.FileNotFoundException`

###### What does throwing an exception mean?
When an error occurs within a method, the method creates an object and hands it off to the runtime system. The object, called an exception object, contains information about the error, including its type and the state of the program when the error occurred. Creating an exception object and handing it to the runtime system is called throwing an exception. Below is an example of a method that throws an exception.
```
    double division(int divisor, int dividend) throws Exception {
        if (divisor == 0)
            throw new Exception("can't divide by zero");
 
        return (divisor * 1.0 / dividend);
    }
```
```
class Demonstration {
    public static void main( String args[] ) throws Exception{
        System.out.println(division(2,3));
        
        // throws exception
        System.out.println(division(0,3));
    }
  
    static double division(int divisor, int dividend) throws Exception {
        if (divisor == 0)
```

###### Explain how exception handling works in Java.
After a method throws an exception, the runtime system attempts to find something to handle it. The set of possible "somethings" to handle the exception is the ordered list of methods that had been called to get to the method where the error occurred.

**The runtime system searches the call stack for a method that contains a block of code that can handle the exception. This block of code is called an exception handler.** The search begins with the method in which the error occurred and proceeds through the call stack in the reverse order in which the methods were called. When an appropriate handler is found, the runtime system passes the exception to the handler. An exception handler is considered appropriate if the type of the exception object thrown matches the type that can be handled by the handler.

The exception handler chosen is said to catch the exception. If the runtime system exhaustively searches all the methods on the call stack without finding an appropriate exception handler, the runtime system (and, consequently, the program) terminates.

---
#### Checked vs Unchecked
###### What are the different types or kinds of exceptions?
There are two categories of exceptions in Java:
- Checked Exceptions
- Unchecked Exceptions

###### What are checked exceptions?
**These are exceptional conditions that a well-written application should anticipate and recover from. Checked exceptions are subject to catch-or-specify requirement.** Let's understand this requirement with an example. Say you write the following utility method `print()`, which prints a passed in string. But you want to throw an exception if the passed in string is null. The code appears below:
```
    void print(String str) throws Exception {
        if (str == null)
            throw new Exception("");
 
        System.out.println(str);
    }
```
Note the `print()` method will not compile if we don't add the `throws Exception` clause to the method signature. If we don't want to throw the exception from the print method, then we'll need to handle it within the function as shown below:
```
    void print(String str) {
        try {
            if (str == null)
                throw new Exception("");
        } catch (Exception e) {
            System.out.println("exception caught");
        }
    }
```
So if we want our `print()` method to throw an exception then either we specify that the method throws an exception or that we catch it within our `print()` method. This is an example of a checked exception.

###### What are unchecked exceptions?
Exceptions not subject to the catch or specify requirement are collectively called unchecked exceptions. These are:
- `RuntimeException` and all its subclasses
- `Error` and all its subclasses

The below code snippet would compile without a try-catch block or specifying the throws clause, because we are throwing a `RuntimeException` exception.
```
    void print(String str) {
        if (str == null)
            throw new RuntimeException("");
 
        System.out.println(str);
    }
```
```
class Demonstration {
    public static void main( String args[] ) {
        print("Code compiles without throws clause for unchecked exceptions.");
    }

    static void print(String str) {
        if (str == null)
            throw new RuntimeException("");

        System.out.println(str);
```

###### What are runtime exceptions?
**These are exceptional conditions that are internal to the application, and that the application usually cannot anticipate or recover from.** These usually indicate programming bugs, such as logic errors or improper use of an API. Consider the below snippet:
```
    void printInt(Number number) {
        System.out.println(number.intValue());
    }
```
If we pass in `null` to the method `printInt()`, it will throw a `NullPointerException` which is a sublcass of `RuntimeException`.
```
class Demonstration {
    public static void main( String args[] ) {
        printInt(null);
    }

    // throws NullPointerException
    static void printInt(Number number) {
        System.out.println(number.intValue());
    }
}
```

###### What are Error exceptions?
**These are exceptional conditions that are external to the application, and that the application usually cannot anticipate or recover from.** An example would be an application is unable to read a file from storage because of hardware failure.

Note `RuntimeException` and checked exceptions are subclasses of `Exception`. However, `Error` isn't derived from `Exception` class.

###### When creating custom exception classes, what rationale should guide our decision to make an exception either checked or unchecked?
If a client can reasonably be expected to recover from an exception, make it a checked exception. If a client cannot do anything to recover from the exception, make it an unchecked exception.

###### Describe the `throw` statement?
**All the exception classes (checked and unchecked) are derived from the class `Throwable`. Any class directly or indirectly derived from `Throwable` class can be thrown from a method using the throw statement.** For instance we can write a method like:
```
    void uselesslMethod() {
        throw new IOException();
    }
```
The above method wouldn't compile. It throws a checked exception and either the method should handle it or throw propagate it higher up in the call stack. We'll need to specify that the method throws the `IOException` for the snippet to compile.
```
    void uselesslMethod() throws IOException {
        throw new IOException();
    }
```
```
class Demonstration {
    public static void main( String args[] ) {
        System.out.println( "Hello World!" );
    }

    // Doesn't compile because the checked exception being
    // thrown is checked.
    void uselesslMethod() {
        throw new IOException();
    }
```
Note if the method threw an `Erorr` or a `RuntimeException` we wouldn't need to specify the what the method throws for successful compilation as both fall under the unchecked exceptions category. The following versions of the same method would compile:
```
    // compiles since the exception is a type of
    // RuntimeException
    void uselesslMethod() {
        throw new IndexOutOfBoundsException();
    }
```
```
    // compiles since the Error is an unchecked exception
    void uselesslMethod() {
        throw new Error();
    }
```

---
#### Catch Block
###### If a block of code throws more than one type of exception, how can it be handled?
Multiple types of exceptions thrown by a snippet of code can be handled by multiple catch clauses followed by the try block. An example snippet appears below:
```
    void process(int val) {
        try {
            if (val == 1)
                // checked exception
                throw new FileNotFoundException();
            if (val == 2)
                // Runtime Exception
                throw new NullPointerException();
            if (val == 3)
                // Error Exception
                throw new StackOverflowError();
        } catch (RuntimeException re) {
            // Catches all Unchecked exceptions
        } catch (Exception e) {
            // Catches all checked exceptions
        } catch (Error err) {
            // Catches all errors
        }
    }
```

###### Why does the following code not compile?
```
    void process(int val) {
        try {
            if (val == 1)
                throw new IndexOutOfBoundsException();
            if (val == 2)
                throw new NullPointerException();
            if (val == 3)
                throw new Exception();
        } catch (RuntimeException re) {
 
        } catch (NullPointerException npe) {
 
        } catch (Exception e) {
 
        }
    }
```
**Answer:** `RuntimeException` catch clause appears before the catch clause for `NullPointerException`

`RuntimeException` is the super class of `NullPointerException` and the catch clause for it appears before the catch clause for `NullPointerException`. In this case, a null pointer exception would be handled by the first catch clause for `RuntimeException` making the catch clause for `NullPointerException` redundant.

###### Can we catch multiple exceptions using a single catch block?
Yes, we can handle multiple exceptions using a single catch block since Java SE 7. An example appears below:
```
    void process(int val) {
        try {
            if (val == 1)
                // checked exception
                throw new FileNotFoundException();
            if (val == 2)
                // Runtime Exception
                throw new NullPointerException();
            if (val == 3)
                // Error Exception
                throw new StackOverflowError();
        } catch (Error | FileNotFoundException | IllegalArgumentException | ArrayIndexOutOfBoundsException | NullPointerException ex) {
            // Catches variety of checked and unchecked exceptions
            System.out.println(ex);
 
            // Note variable ex is treated as final, the following line if
            // uncommented willn't compile.
            // ex = new Exception("can't assign");
        }
    }
```
Note, that the exception variable `ex` is treated as `final` and can't be mutated.

---
#### More on Exceptions
###### Consider the snippet below:
```
    int process(int val) {
 
        try {
            if (val == 1)
                // checked exception
                throw new FileNotFoundException();
            if (val == 2)
                // Runtime Exception
                throw new NullPointerException();
            if (val == 3)
                // Error Exception
                throw new StackOverflowError();
        } catch (Error | FileNotFoundException | IllegalArgumentException | ArrayIndexOutOfBoundsException | NullPointerException ex) {
            return -1;
 
        } finally {
            System.out.println("In finally block");
        }
 
        return 0;
    }
```
**What will be printed on the console and what will be the return value if the method is invoked like so:
`new Example().process(2)`**

**Answer:** -1 is returned and “In finally block” is printed

Though it may seem counterintuitive that the print statement in the `finally` block gets printed because the catch block has a return statement but a `finally` block always get executed after the try block. **The runtime system always executes the statements within the finally block regardless of what happens within the try block. The finally block is a key tool for preventing resource leaks and cleanup code can be placed here.**
```
import java.io.FileNotFoundException;


class Demonstration {
    public static void main( String args[] ) {
        System.out.println( process(2) );
    }
  
    static int process(int val) {

        try {
            if (val == 1)
                // checked exception
                throw new FileNotFoundException();
            if (val == 2)
                // Runtime Exception
                throw new NullPointerException();
            if (val == 3)
                // Error Exception
                throw new StackOverflowError();
        } catch (Error | FileNotFoundException | IllegalArgumentException | ArrayIndexOutOfBoundsException | NullPointerException ex) {
            return -1;

        } finally {
            System.out.println("In finally block");
        }

        return 0;
    }

}
```

###### When does a finally block fail to execute?
A `finally` always executes when the try block exits. However, there are situations where the `finally` block can fail to execute. These are:
- If the JVM exits while the try or catch code is being executed, then the finally block may not execute.
- If the thread executing the try or catch code is interrupted or killed, the finally block may not execute even though the application as a whole continues.

###### What objects can be used with `try-with-resources` statement?
Objects that implement the interface `java.lang.AutoCloseable` can be used with the `try-with-resources` statement.

###### Explain how can we use the try-with-resources statement?
Let's say if we wanted to write out a string to a file, one of the way we could do it is as follows:
```
        PrintWriter pw = null;
        try {
            pw = new PrintWriter("educative.txt");
            pw.print("Java Interview Bible Course");
        } catch (FileNotFoundException fnf) {
 
        } finally {
            if (pw != null)
                pw.close();
        }
```
In the above scenario, we have to explicitly `close()` the print writer object. If we were to use the `try-with-resources` we could rewrite the above code as follows and not have to worry about closing the print writer object.
```
        try (PrintWriter pw = new PrintWriter("educative.txt")) {
            pw.print("Java Interview Bible Course");
        } catch (FileNotFoundException fnf) {
            
        }
```

###### What are suppressed exceptions?
Imagine your code uses a try-catch and finally block for some task. The `try` block throws an exception which you handle and then in the `finally` block your code to clean up resources is executed. If the clean-up code also throws an exception then which exception should the method throw? The method can only throw a single exception. The exception that originally occurred in the `try` block or the one that occurred in the `finally` block?
- In case of `try-catch-finally` block, the exception from the `try` block is suppressed and the exception from the `finally` block is propagated.
- In case of `try-with-resources` the exception from the `try` block is thrown and the one from the `finally` block is added as a suppressed exception to the exception object from the `try` block. Note that there's no explicit finally block since it is implicit in the `try-with-resources` statement.

You can run the below examples to see the difference. Note that in case of `try-catch-finally` block, we have to explicitly add the exception from the try block as a suppressed exception.
```
import java.io.Closeable;
import java.io.IOException;

class Demonstration {
    public static void main( String args[] ) {
        
      try {
        tryWithResources();
      } catch (Exception e) {
        e.printStackTrace();
        System.out.println();
      }

      try {
        tryWithFinally();
      } catch (Exception e) {
        e.printStackTrace();
        System.out.println();
      }      
      
    }
  
    static void tryWithResources() {

        try (SomeMediaClass sc = new SomeMediaClass()) {
            sc.read();
        } catch (IOException ioe) {
        }
    }  

    static void tryWithFinally() throws Exception {

        SomeMediaClass sc = new SomeMediaClass();
        Throwable t = null;
        try {
            sc.read();
        } catch (Exception e) {
            t = e;
        } finally {
            // clean-up code
            sc.close(t);
        }
    }  
}

class SomeMediaClass implements Closeable {

    public void close() throws IOException {
        throw new IOException();
    }

    // This method exists so that in the finally block
    // we are able to add a suppressed exception
    public void close(Throwable t) throws IOException {
        IOException ioe = new IOException();
        ioe.addSuppressed(t);
        throw ioe;
    }

    public void read() {
        throw new NullPointerException();
    }
}
```

###### What are chained exceptions?
If an exception causes a second exception, we can capture the relation between the two exceptions and throw the chain higher up in the call stack. The `Throwable` class offers a constructor to pass in the exception that caused the second exception or the `initCause()` method. When the `printStackTrace()` is invoked on an exception, it shows the complete chain of exceptions. **A stack trace provides information on the execution history of the current thread and lists the names of the classes and methods that were called at the point when the exception occurred.**
```
import java.io.IOException;

class Demonstration {
    public static void main( String args[] ) {
        try {
          chainedExceptionsExample();
        }
        catch(Exception e){
          e.printStackTrace();
        }
    }
  
    static void chainedExceptionsExample() {

        try {
            throw new IOException();
        } catch (IOException ioe) {

            NullPointerException npe = new NullPointerException();
            npe.initCause(ioe);
            throw npe;
        }
    }  
  
}
```

###### Consider the snippet below:
```
    public static void main( String args[] ) throws Exception {
        try {
            // Throw IllegalArgumentException
            throw new IllegalArgumentException("World");
        } finally {
            // Throw another exception in finally block
            throw new IOException("Hello");
        }
    }
```
**What will be the outcome of running the above program?**

**Answer:** IOException is thrown and IllegalArgumentException is supressed
```
import java.io.IOException;

class Demonstration {
    public static void main( String args[] ) throws Exception {
        try {
            // Throw IllegalArgumentException
            throw new IllegalArgumentException("World");
        } finally {
            // Throw another exception in finally block
            throw new IOException("Hello");
        }
    }
}
```

###### Consider the snippet below:
```
    public static void main( String args[] ) throws Exception {
        try {
            throw new IllegalArgumentException("World");
        } catch(IllegalArgumentException iae){
            throw new NullPointerException();
        } finally {
            throw new IOException("Hello");
        }
    }
```
**What will be the outcome of running the above program?**

**Answer:** IOException is thrown.
```
import java.io.IOException;

class Demonstration {
    public static void main( String args[] ) throws Exception {
        try {
            throw new IllegalArgumentException("World");
        } catch(IllegalArgumentException iae){
            throw new NullPointerException();
        } finally {
            throw new IOException("Hello");
        }
    }
}
```

---