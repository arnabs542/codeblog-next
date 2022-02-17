---
title: 'Reflection'
type: 'topic'
section: 'Interview Questions'
course: 'Core Java'
tags:
- java
---
## Reflection
#### What is Reflection in Java?
**Reflection is an API which is used to examine or modify the behavior of methods, classes, interfaces at runtime.**

For example, say you have an object of an unknown type in Java, and you would like to call a 'doSomething' method on it if one exists. Java's static typing system isn't really designed to support this unless the object conforms to a known interface, but using reflection, your code can look at the object and find out if it has a method called 'doSomething' and then call it if you want to.

Java Reflection makes it possible to inspect classes, interfaces, fields, and methods at runtime, without knowing the names of the classes, methods etc. at compile time. It is also possible to instantiate new objects, invoke methods and get/set field values using reflection.

#### What are some of the drawbacks of using Reflection?
Reflection comes at a cost. The following are some of the drawbacks of using reflection:
- **Performance:** Reflection involves types that are dynamically resolved which prevents the JVM from making optimizations. Consequently, reflective operations have slower performance than their non-reflective counterparts.
- **Security:** Reflection requires runtime permission which may not be present when running under a security manager.
- **Breaking Encapsulation:** Reflection allows code to perform operations that would be illegal in non-reflective code, such as accessing private fields and methods, the use of reflection can result in unexpected side-effects, which may render code dysfunctional and may destroy portability.

#### What are some of the use cases of Reflection?
Reflection can be used for following use cases:
- **Class browsers** or development tools like intelliJ etc need to be able to inspect classes and enumerate class members.
- **Debugging tools** need to examine private members on a class and make use of reflection to do so.
- **External classes can be loaded** at runtime and their objects can be instantiated using reflection.
- **Java Reflection can be used to map** properties in JSON files to getter / setter methods in Java objects, like Jackson, GSON, Boon etc. Reflection can be used to map the column names of a JDBC ResultSet to getter / setter methods in a Java object.

---
## java.lang.Class
#### Why is java.lang.Class important?
**The entry point for all reflection operations is `java.lang.Class`.** For every type of object, the JVM instantiates an immutable instance of `java.lang.Class` which provides methods to examine the runtime properties of the object including its members and type information. Class also provides the ability to create new classes and objects.

#### How can we get the class object for a reference type?
When an instance of a reference type is available, we can invoke the `getClass()` method to get the `java.lang.Class` object. Below are few examples:

Getting class for a Queue
```
        Queue<Integer> q = new LinkedList<>();
        Class clazz = q.getClass();
        System.out.println(clazz.getSimpleName());
```
Getting class for a String
```
        String str = "Educative is helpful";
        Class clazz = str.getClass();
        System.out.println(clazz.getCanonicalName());
```
Getting class for an Enum
```
    enum Gender {
        Male,
        Female,
        Transgender,
        Unknown
    }
 
        Enum gender = Gender.Female;
        Class clazz = gender.getClass();
        System.out.println(clazz.getCanonicalName());       
```
The class object retrieved offers several methods that can be queried to get more detailed information about the type of the object. The below code prints out the results from these snippets.
```
import java.util.LinkedList;
import java.util.Queue;

class Demonstration {
    public static void main( String args[] ) {
        
        Queue<Integer> q = new LinkedList<>();
        Class clazz = q.getClass();
        System.out.println(clazz.getSimpleName());

        String str = "Educative is helpful";
        Class clazz1 = str.getClass();
        System.out.println(clazz1.getCanonicalName());

        Enum gender = Gender.Female;
        Class clazz2 = gender.getClass();
        System.out.println(clazz2.getCanonicalName());
    }
}

    enum Gender {
        Male,
        Female,
        Transgender,
        Unknown
    }
```

#### How can we get class information about primitive types?
We can get the class object for a primitive type using the .class syntax. An example is below:
```
class Demonstration {
    public static void main( String args[] ) {
        Class clazz = int.class;
        System.out.println(clazz.getCanonicalName());
    }
}
```

#### How can we get the Class for an array?
Arrays are also reference types and derive from `java.lang.Object`. We can get the class object for an array using the `getClass()` method. We can also retrieve the class object using the `.class` syntax. Both approaches appear below:

Class object for an array
```
        int[] array = new int[10];
        System.out.println(array.getClass().getCanonicalName());
```
Class object for an array using .class syntax
```
        int[] array = new int[10];
        System.out.println(int[].class.getSimpleName());
```
```
class Demonstration {
    public static void main( String args[] ) {
        int[] array = new int[10];
        System.out.println(array.getClass().getCanonicalName());
        System.out.println(int[].class.getSimpleName());
    }
}
```

#### Can we get the java.lang.Class object if no instance is available?
In the previous examples, we retrieved the `java.lang.Class` object using the `getClass()` on an object instance. If there's no instance we can retrieve a `java.lang.Class` object if we have the fully qualified name for the type.

Using fully qualified name to retrieve class object
```
        Class clazz = Class.forName("java.lang.String");
        System.out.println(clazz.getSimpleName());
```
Note that the static method `Class.forName()` isn't applicable for primitive types. For array types, the name to be passed in should be the same name that is returned by the `getName()` method for the array type. The following code clarifies these concepts.
```
class Demonstration {
    public static void main( String args[] ) throws Exception {

        Class clazz = Class.forName("java.lang.String");
        System.out.println(clazz.getSimpleName());
        Class clazz2 = "".getClass();
        System.out.println(clazz.equals(clazz2));

        int[] intArray = new int[10];
        String name = intArray.getClass().getName();
        Class clazz3 = Class.forName(name);
        System.out.println(clazz3.getSimpleName());      
      
    }
}
```

---
## Class Modifiers
#### How can we get class modifiers?
There are two types of class modifiers
- **Access Modifiers:** These include modifiers which control access level such as `public`, `private` etc.
- **Non-access Modifiers:** These modifiers provide funationality other than controlling access. These include `final`, `static` etc

The reflection package in Java provides several APIs to glean comprehensive metadata information about a class. In the below code snippet, we print all the modifiers for the `String` and a custom `Test` class. Run the code to see the metadata details of each class.
```
import java.lang.annotation.Annotation;
import java.lang.reflect.Modifier;
import java.lang.reflect.Type;
import java.lang.reflect.TypeVariable;
import java.util.ArrayList;
import java.util.List;

import static java.lang.System.out;

@SuppressWarnings("unchecked")
@Deprecated
class TestReflect{

  void deprecatedMethod(){
  }
  

  void suppressedWarningMethod(){
  }

}

class Demonstration {
  
  
    @SuppressWarnings("deprecation")
    public static void main( String args[] ) throws Exception {
      
      Class<?> c = Class.forName("java.lang.String");
      getClassModifiers(c);
      
      Class<?> c2 = TestReflect.class;
      getClassModifiers(c2);
    }

    public static void getClassModifiers(Class<?> c) {

            out.format("Class:%n  %s%n%n", c.getCanonicalName());
            out.format(
                    "Modifiers:%n  %s%n%n",
                    Modifier.toString(c.getModifiers()));

            out.format("Type Parameters:%n");
            TypeVariable[] tv = c.getTypeParameters();
            if (tv.length != 0) {
                out.format("  ");
                for (TypeVariable t : tv)
                    out.format("%s ", t.getName());
                out.format("%n%n");
            } else {
                out.format("  -- No Type Parameters --%n%n");
            }

            out.format("Implemented Interfaces:%n");
            Type[] intfs = c.getGenericInterfaces();
            if (intfs.length != 0) {
                for (Type intf : intfs)
                    out.format("  %s%n", intf.toString());
                out.format("%n");
            } else {
                out.format("  -- No Implemented Interfaces --%n%n");
            }

            out.format("Inheritance Path:%n");
            List<Class> l = new ArrayList<Class>();
            printAncestor(c, l);
            if (l.size() != 0) {
                for (Class<?> cl : l)
                    out.format("  %s%n", cl.getCanonicalName());
                out.format("%n");
            } else {
                out.format("  -- No Super Classes --%n%n");
            }

            out.format("Annotations:%n");
            Annotation[] ann = c.getAnnotations();
            if (ann.length != 0) {
                for (Annotation a : ann)
                    out.format("  %s%n", a.toString());
                out.format("%n");
            } else {
                out.format("  -- No Annotations --%n%n");
            }
    }  
  
    private static void printAncestor(Class<?> c, List<Class> l) {
        Class<?> ancestor = c.getSuperclass();
        if (ancestor != null) {
            l.add(ancestor);
            printAncestor(ancestor, l);
        }
    }  
}
```

#### Are there any class modifiers that we can't get from reflection?
Not all annotations are available via reflection. **Only those which have a java.lang.annotation.RetentionPolicy of RUNTIME are accessible.** Of the three annotations pre-defined in the language `@Deprecated`, `@Override`, and `@SuppressWarnings` only `@Deprecated` is available at runtime.

#### How can we get the different methods of a class?
The Java reflection API provides ways to get the methods of a class. The below snippet prints out all the methods of the String class including constructors.
```
import java.lang.reflect.Constructor;
import java.lang.reflect.Field;
import java.lang.reflect.Member;
import java.lang.reflect.Method;

class Demonstration {
    public static void main( String args[] ) {
        try {
            String className = "java.lang.String";
            Class<?> c = Class.forName(className);
            System.out.println("\n\n\n");
            System.out.format("Class:%n  %s%n%n", c.getCanonicalName());

            Package p = c.getPackage();
            System.out.println("\n\n\n");
            System.out.format("Package:%n  %s%n%n",(p != null ? p.getName() : "Class not defined under a package"));

            System.out.println("\n\n\n");
            printMembers(c.getConstructors(), "Constuctors");
            System.out.println("\n\n\n");
            printMembers(c.getFields(), "Fields");
            System.out.println("\n\n\n");
            printMembers(c.getMethods(), "Methods");
            printClasses(c);

            // production code should handle these exceptions more gracefully
        } catch (ClassNotFoundException x) {
            x.printStackTrace();
        }
    }

    private static void printMembers(Member[] mbrs, String s) {
        System.out.format("%s:%n", s);
        for (Member mbr : mbrs) {
            if (mbr instanceof Field)
                System.out.format("  %s%n", ((Field) mbr).toGenericString());
            else if (mbr instanceof Constructor)
                System.out.format("  %s%n", ((Constructor) mbr).toGenericString());
            else if (mbr instanceof Method)
                System.out.format("  %s%n", ((Method) mbr).toGenericString());
        }
        if (mbrs.length == 0)
            System.out.format("  -- No %s --%n", s);
        System.out.format("%n");
    }

    private static void printClasses(Class<?> c) {
        System.out.format("Classes:%n");
        Class<?>[] clss = c.getClasses();
        for (Class<?> cls : clss)
            System.out.format("  %s%n", cls.getCanonicalName());
        if (clss.length == 0)
            System.out.format("  -- No member interfaces, classes, or enums --%n");
        System.out.format("%n");
    }
}
```

## Instantiation using Reflection
#### How can we create class instances using reflection?
There are two methods that can be invoked with appropriate parameters to instantiate class objects using reflection:
- `Constructor.newInstance()`
- `Class.newInstance()`

Using Constructor.newInstance
```
        Class<?> c = String.class;
 
        Constructor<?>[] ctrs = c.getConstructors();
 
        Constructor ctr = null;
        for (int i = 0; i < ctrs.length; i++) {
            if (ctrs[i].getParameterCount() == 1 &&
                ctrs[i].getParameterTypes()[0].getCanonicalName().equals("java.lang.String")) {
                ctr = ctrs[i];
                break;
            }
        }
 
        String myString = (String) ctr.newInstance("Educative");
        System.out.println(myString);
```
Using Class.newInstance
```
        Class<?> c = String.class;
        String st = (String) c.newInstance();
        System.out.println(st);
```
**Note that the method `Class.newInstance()` is deprecated in Java SE 9 and the method can only be used to invoke zero-argument constructor.**

#### Are there any drawbacks to using `Class.newinstance()` to instantiate objects, other than the method being deprecated?
Imagine if your constructor throws a checked exception then new-ing up an object will require you to handle the thrown exception in order for the code to compile. Using `Class.newInstance()` method effectively bypasses the compile-time exception checking that would otherwise be performed by the compiler. The `Constructor.newInstance()` method avoids this problem by wrapping any exception thrown by the constructor in a checked `InvocationTargetException`.

We have a hypothetical class `EducativeCourse` whose zero-argument constructor throws an exception. If we want to new-up an object, we'll be required to handle the exception. The code appears below
```
public class EducativeCourse {
    private String title;
    private long likes;

    public EducativeCourse() throws FileNotFoundException {
        throw new FileNotFoundException();
    }
}
```
If we new-up an object, our code will look like:
```
    try {
        EducativeCourse ec = new EducativeCourse();
    } catch (FileNotFoundException fnf) {
            
    }
```
The above code forces us to handle the checked exception thrown by the constructor at compile time. **We can bypass this check if we use `Class.newInstance()` method which is why using this method to instantiate objects isn't preferred.** On the contrary, `Constructor.newInstance()` throws a checked exception, that wraps the original exception thrown by the class's constructor. The examples appear in the code snippet below.
```
import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationTargetException;
import java.io.FileNotFoundException;

class Demonstration {
    public static void main( String args[] ) {
        usingConstructorNewInstance();
        System.out.println( "\n\n\n" );
        
        // Uncomment the below line and run to see how the
        // checked exception goes unhandled
        //usingClassNewInstance();
    }

    static void usingClassNewInstance() {

        Class<?> c = EducativeCourse.class;

        // FileNotFoundException isn't handled, even
        // though the thrown exception is checked
        try {
            EducativeCourse ec = (EducativeCourse) c.newInstance();
        } catch (IllegalAccessException iae) {
            iae.printStackTrace();

        } catch (InstantiationException ie) {
            ie.printStackTrace();
        }
    }
 
    static void usingConstructorNewInstance() {

        Class<?> c = EducativeCourse.class;
        Constructor<?>[] ctrs = c.getConstructors();

        try {
            // There's a single constructor so we can index
            // at the first element
            ctrs[0].newInstance();
        } catch (IllegalAccessException iae) {

        } catch (InstantiationException ie) {

        } catch (InvocationTargetException ite) {
            // FileNotFoundException is caught
            System.out.println("\nCaught Exception\n");
            ite.printStackTrace();
        }
    }  
  
  
}

// Hypothetical class
class EducativeCourse {

    private String title;
    private long likes;

    public EducativeCourse() throws FileNotFoundException {
        throw new FileNotFoundException();
    }
}
```

#### Is it possible to create more than one instance of a singleton class?
Yes, using reflection we can create as many instances, of an otherwise singleton class, as we like. Consider the following singleton class:
```
public class SingletonClass {
    private static SingletonClass singleton = new SingletonClass();
 
    private SingletonClass() { }
 
    public SingletonClass getInstance() {
        return singleton;
    }
}
```
We can create instances of the `Singleton` class as follows:
```
        Class<?> c = SingletonClass.class;
 
        Constructor<?> ctr = c.getDeclaredConstructors()[0];
        // Remember to set accessiblity
        ctr.setAccessible(true);
        SingletonClass[] instances = new SingletonClass[10];
        for (int i = 0; i < 10; i++) {
            instances[i] = (SingletonClass) ctr.newInstance();
        }
```
Note that we use the `setAccessible()` method to bypass the accessibility checks for the constructor. A value of true indicates that the reflected object should suppress checks for Java language access control when it is used.
```
import java.lang.reflect.Constructor;

class Demonstration {
    public static void main( String args[] ) throws Exception{
        Class<?> c = SingletonClass.class;

        Constructor<?> ctr = c.getDeclaredConstructors()[0];
        // Remember to set accessiblity
        ctr.setAccessible(true);
        SingletonClass[] instances = new SingletonClass[10];
        for (int i = 0; i < 10; i++) {
            instances[i] = (SingletonClass) ctr.newInstance();
        }
    }
}

class SingletonClass {
    private static SingletonClass singleton = new SingletonClass();

    private SingletonClass() { }

    public SingletonClass getInstance() {
        return singleton;
    }

}
```

#### Can we instantiate an array object using reflection?
Reflection supports the ability to dynamically create arrays of arbitrary type and dimensions via `java.lang.reflect.Array.newInstance()`. An example is shown below:
```
        int[] array = (int[]) Array.newInstance(int.class, 10); 
        for (int i = 0; i < 10; i++)
            array[i] = i;
```
Array for reference types can also be instantiated using reflection.
```
import java.lang.reflect.Array;

class Demonstration {
    public static void main( String args[] ) {
        int[] array = (int[]) Array.newInstance(int.class, 10);

        for (int i = 0; i < 10; i++)
            array[i] = i;

        for (int i = 0; i < 10; i++)
            System.out.println(array[i]);
    }
}
```

#### Is there any object that can't be created using reflection?
**Enum objects can't be reflectively created.** We can retrieve the list of enum constants using the `getEnumConstants()` method. An example appears below.
```
import java.util.concurrent.TimeUnit;

class Demonstration {
    public static void main( String args[] ) {
        Class<TimeUnit> c = TimeUnit.class;
        TimeUnit[] consts = c.getEnumConstants();
        for (int i = 0; i < consts.length; i++)
            System.out.println(consts[i].toString());
    }
}
```

## Classloaders
#### What is a class loader in Java?
**A class loader is responsible for dynamically loading classes into the Java Virtual Machine.** Classes are loaded on demand in Java.

#### How many types of class loaders are there?
There are three types of class loaders:
- **Bootstrap Class Loader:** The bootstrap class loader loads the core Java libraries located in the /jre/lib directory. This class loader, which is part of the core JVM, is written in native code.
- **Extensions Class Loader:** The extensions class loader loads the code in the extensions directories (/jre/lib/ext, or any other directory specified by the java.ext.dirs system property.
- **System Class Loader:** The system class loader loads code found on java.class.path, which maps to the CLASSPATH environment variable.

We can get the class loader for a class using `getClassLoader()` method. An example appears below, run the code and examine the output.
```
import com.sun.javafx.util.Logging;

class Demonstration {
    public static void main( String args[] ) {
      
        System.out.println((new Demonstration()).getClass().getClassLoader());
        System.out.println(Logging.class.getClassLoader());
        System.out.println("".getClass().getClassLoader());
      
    }
}
```
If you look at the output, you'll see that for the string object `null` is output as the classloader. Some implementations return `null` if the class is loaded by the bootstrap class loader, which is true for the string object.

#### How can classes be loaded?
The two ways in which classes can be loaded are:
- **Static Loading:** classes are statically loaded via the new operator
- **Dynamic Loading:** classes are programmatically loaded by using the `Class.forName()` or the `loadClass()` method. The difference between the two is that the former one initializes the object after loading it while the latter one only loads the class but doesn’t initialize the object.

#### Why are class loaders needed in Java?
Languages such as C and C++ are compiled into native, machine-specific instructions that are saved as an executable file which can then be run by the underlying operating system. Most computer languages use the "compile-link-execute" format. You start with source code and the compiler converts this program into a low-level program. In most compiled languages, the file containing the resulting low-level code is called an object file. A collection of object files are linked together to create an executable file. The process of linking connects the object files that you have created along with other pre-existing object files to form an executable file. The linker does this job.

Because Java supports platform independence, the Java compiler turns a source code file into a bytecode file .class file. The bytecode file acts as an object file for the JVM, which is why the Java compiler is called the JVM compiler. To execute a bytecode file, you actually need to invoke a Java interpreter. Every platform has its own Java interpreter and when platform-specific operations are required by the bytecode, the Java interpreter links-in appropriate code specific to the platform.

Invoking the JVM with the java command to execute a class file involves several initial steps which are broadly categorized as the following three:
- Loading
- Linking
- Initialization

Loading is defined as **the process of finding the binary representation of a class or interface type with a particular name and creating a class or interface from that binary representation.** Loading is achieved using classloaders and is required since there's no linking at compile time in Java.

#### How do class loaders work?
Let's consider a scenario where you have written a class `Dog` and instantiate an instance in code like below:
```
    Dog myDog = new Dog();
```
The JVM looks for the class called `Dog`. And if the `Dog` class is accessed for the first time during this particular execution of the program, it has to be loaded by the JVM, normally from the corresponding `Dog.class` file. **The process of seeking for the `Dog.class` file on the drive, loading it into memory and parsing it’s structure is called class loading.** Ensuring proper class loading process is the responsibility of a ClassLoader. ClassLoaders are instances of `java.lang.ClassLoader` class and each and every class in a Java program has to be loaded by some ClassLoader.

Classloaders are hierarchical and work on the following principles:
- Each class loader has a reference to its parent class loader. When a class loader is asked to load a class, it consults its parent class loader before attempting to load the item itself. The parent in turn, consults its parent, and so on. So it is only after all the ancestor class loaders cannot find the class that the current class loader gets involved. In other words, a delegation model is used.
- A child class loader has visibility into what classes have been loaded by its parent classloader but not vice versa.
- Classes loaded by parent class loader shouldn't be loaded by the child class loader.
- Classloaders enabled browsers to download classes across the network from remote web servers and run mini applications called applets.

#### What is classpath?
**Classpath is a parameter in the Java Virtual Machine or the Java compiler that specifies the location of user-defined classes and packages. The parameter may be set either on the command-line, or through an environment variable.** JVM finds and loads classes lazily. It loads the bytecode of a class only when the class is first used. The classpath tells Java where to look in the filesystem for user defined and third party classes that aren't extensions or part of the Java platform.

The preferred way to specify the class path is by using the -cp command line switch. This allows the CLASSPATH to be set individually for each application without affecting other applications. The default value of the classpath is  "."  the current directory.




---