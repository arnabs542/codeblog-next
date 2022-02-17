---
title: 'Serialization'
type: 'topic'
section: 'Interview Questions'
course: 'Core Java'
tags:
- java
---
## Serialization
#### What is Serialization?
**Encoding an object as a byte stream is called serializing the object.** Once an object has been serialized, its encoding can be transmitted from one running virtual machine to another or stored on disk for deserialization later.

Serialization is mostly used in network programming. The objects that need to be transmitted through the network have to be converted into bytes. Serialization can also be used to store objects on disk or in a database. Other uses of serialization include passing serialized objects as parameters to functions or program running on a remote machine, also known ass RMI (Remote Method Invocation).

Any class can become serializable by implementing the interface `Serializable`. The `Serializable` interface is just a marker interface in that it doesn't have any methods. Serialization machinary is provided through two classes `ObjectInputStream` and `ObjectOutputStream`. The below class is serializable:

Serializable class example
```
class EducativeCourse implements Serializable { 
    private String name = "Java Interview Bible";
    private int lessons;
    private int likes;
}
```
Serialization can also be controlled via hooks. There are two methods, which if present in a class will be invoked and allow the developer to control what gets written out to the serialization stream:
- `writeObject(ObjectOutputStream oos)` This hook method is invoked to write the object to the stream.
- `writeObject()`This hook method is invoked and whatever object it returns is written to the stream.

These methods can be handy when want to encrypt object fields before writing them out to the stream.

The below runnable snippet shows how an object of a class can be serialized.
```
import java.io.*;

class Demonstration {
    public static void main( String args[] ) {
        EducativeCourse javaInterviewBible = new EducativeCourse();
        ByteArrayOutputStream bos = new ByteArrayOutputStream();

        try (ObjectOutput out = new ObjectOutputStream(bos)) {
            out.writeObject(javaInterviewBible);
            out.flush();
        } catch (Exception e) {
            // Ignore exception, not to be done in production
        }
        byte[] courseInBytes = bos.toByteArray();
        System.out.println("Serialized byte array length : "  + courseInBytes.length);
    }
}

class EducativeCourse implements Serializable {

    private String name = "Java Interview Bible";
    private int lessons;
    private int likes;
}
```

#### What is Deserialization?
Deserialization is the opposite of serialization, that is converting a byte stream into an object in memory. Similar to serialization, two hook methods are provided for deserialization, which can be used to control the reading behaviour.
- `readObject(ObjectInputStream ois)` This method when present in a serializable class is invoked to read the object from the stream.
- `Object readResole()` The object returned from this method is the deserialized object.

```
import java.io.*;

class Demonstration {
    public static void main( String args[] ) {
        byte[] courseInBytes = serialize();

        // Code to deserialize the object
        ByteArrayInputStream bis = new ByteArrayInputStream(courseInBytes);
        try (ObjectInput in = new ObjectInputStream(bis)) {
        EducativeCourse course = (EducativeCourse) in.readObject();
        System.out.println(course.toString());

        } catch (Exception e) {
            // Ignore exception, not to be done in production
        }        
    }

    static byte[] serialize(){
        EducativeCourse javaInterviewBible = new EducativeCourse();
        ByteArrayOutputStream bos = new ByteArrayOutputStream();

        try (ObjectOutput out = new ObjectOutputStream(bos)) {
            out.writeObject(javaInterviewBible);
            out.flush();
        } catch (Exception e) {
            // Ignore exception, not to be done in production
        }
        return bos.toByteArray();
    }
}

class EducativeCourse implements Serializable {

    private String name = "Java Interview Bible";
    private int lessons;
    private int likes;

    public String toString(){
        return name;
    }
}
```

#### Are there any drawbacks of serialization?
- A major cost of implementing `Serializable` is that it **decreases the flexibility to change a class’s implementation once it has been released.** When a class implements Serializable, it's serialized form becomes part of its exported API. Once you distribute a class widely, you are generally required to support the serialized form forever, just as you are required to support all other parts of the exported API.
- Maintainence can be another burden that comes with serialization. When a new version of a class is released, care must be taken to ensure that objects that were serialized using the previous version can still be deserialized with the new class version. Similarly, serialized objects of the new version of the class should continue to work with the older version of the same class. This can significantly increase the test surface.
- Serialization can also open up security holes. For instance, an incorrectly designed singleton class can have multiple copies of its serialized instance deserialized thus breaking the singleton property.

#### What is the default form of serialization?
**The default serialization is the serialized form of an instance created by Java for us.** The Java platform specifies a default way by which serializable objects are serialized. Though a class can override this default serialization and define its own way of how it would like its objects to be serialized.

Relying on the default serialization is a bad idea. For instance any private or package private instances of the class also get serialized and become part of the exported API. Any future changes to the class make it incompatible with older already deserialized objects. For instance, if you serialize an object that was an instance of the first version of the class and later you try to deserialize it using the second version of the class, the conversion would be unsuccessful. If you want to maintain backward compatibility, it is imperative to put thought into customized serialized form rather than accept the default one provided by Java.

#### What is the transient keyword used for?
Java transient keyword is used in serialization. If you define any data member as transient, it will not be serialized. For example:
```
class EducativeCourse { 
    private String name = "Java Interview Bible";
    private int lessons;
    // Don't serialize number of likes
    transient private int likes;
}
```

#### What is serialVersionUID ?
The serialization runtime associates with each serializable class a version number, called a **serialVersionUID**, which is used during deserialization to verify that the sender and receiver of a serialized object have loaded classes for that object that are compatible with respect to serialization. If the receiver has loaded a class for the object that has a different serialVersionUID than that of the corresponding sender's class, then deserialization results in an `InvalidClassException`. We can declare the serialVersionUID explicitly by declaring a field named serialVersionUID that must be static, final, and of type long.
```
class EducativeCourse {
    //serialVersionUID
    private static long serialVersionUID = 2L;
 
    private String name = "Java Interview Bible";
    private int lessons;
    private int likes;
}
```
- We should increment **serialVersionUID** if the current version of our class is modified such that it is no longer backward compatible with the previous version.
- It is highly recommended to mark the field **serialVersionUID** as private.
- Each serializable class should explicitly provide the **serialVersionUID** value and not rely on the default one that is generated if the user omits the **serialVersionUID** from the class definition. The default **serialVersionUID** computation is highly sensitive to class details that may vary depending on compiler implementations and can produce different **serialVersionUID** in different environments. This can result in unexpected `InvalidClassException` during deserialization.

#### Explain the `Externalizable` interface.
The `Serializable` interface gets us automatic serialization capability for objects of our class. On the other hand the `Externalizable` interface provides a way to implement a custom serialization mechanism. A class that implements the `Externalizable` interface is responsible to save and restore the contents of its own instances.

The `Externalizable` interface extends the `Serializable` interface and provides two methods to serialize and deserialize an object, `writeExternal()` and `readExternal()`.

#### Can static fields be serialized?
Static variables belong to a class and not to any individual instance and therefore don’t get serialized.

#### Consider the following class setup:
```
class Course {
    String company;
    private Course() { } 
 
    Course(String company) {
        this.company = company;
    }
}
 
class EducativeCourse extends Course implements Serializable {
    public EducativeCourse(String authorName) {
        super("Educative");
        this.authorName = authorName;
    }
    private String authorName;
}
```
**Can we serialize the class EducativeCourse ?**

**Answer:** No

**Explanation:**
The class Educative can’t be serialized because its super class Course doesn’t provide a accessible parameterless constructor.
```
import java.io.*;

class Demonstration {
    public static void main( String args[] ) throws Exception {
        EducativeCourse course = new EducativeCourse("C. H. Afzal");

        // Serialization code
        ByteArrayOutputStream bos = new ByteArrayOutputStream();
        try (ObjectOutput out = new ObjectOutputStream(bos)) {
            out.writeObject(course);
            out.flush();
        } catch (Exception e) {
            throw e;
        }
        byte[] courseInBytes = bos.toByteArray();

        // Deserialization code
        ByteArrayInputStream bis = new ByteArrayInputStream(courseInBytes);
        try (ObjectInput in = new ObjectInputStream(bis)) {
            EducativeCourse deserializeCourse = (EducativeCourse) in.readObject();
            System.out.println(deserializeCourse.company);

        } catch (Exception e) {
            throw e;
        }

    }
}

class Course {

    String company;

    private Course() {
    }

    Course(String company) {
        this.company = company;
    }
}

class EducativeCourse extends Course implements Serializable {

    public EducativeCourse(String authorName) {
        super("Educative");
        this.authorName = authorName;
    }

    private String authorName;
}
```

**If we make the parameterless constructor of the super class Course public, the subtype EducativeCourse would become serializable. What would be printed from the following sequence:**
```
    // 1. Serialize an object of EducativeCourse
   
   //  2. Deserialize the same object back
 
   //  3. Print the company name like so
           System.out.println(object.company)
```
**Answer:** null

**Explanation:**
If the super class isn’t serializable, its fields will not be part of the serialized byte stream. When the same byte stream is deserialized, the super class fields will have the default value assigned by the Java platform for primitive types and null for reference types.

#### Notes
- Non-static nested classes (inner classes) shouldn't implement the `Serializable` interface. The default serialized form of an inner class is ill- defined.
- Static nested classes can, however, implement `Serializable`.
- If a serializable class doesn’t declare a **serialVersionUID**, the JVM will generate one automatically at run-time.
- If a class implements the `Serializable` interface, all its sub-classes are also serializable
- If one of the fields in a class is another object, then in order for the class to be serializable, it is imperative that the member objects of the class are also serializable.
- A subclass can't be serialized if its non-serializable super class doesn't provide an accessible parameterless constructor.







---