---
title: Java Runtime class
type: topic
section: Java Concurrency
course: Core Java
tags:
- java
---
#### Java Runtime class
- Java Runtime class is used to interact with java runtime environment.
- Java Runtime class provides methods to execute a process, invoke GC, get total and free memory etc.
- There is only one instance of `java.lang.Runtime` class is available for one java application.
- `Runtime.getRuntime()` method returns the singleton instance of Runtime class.

###### Methods of Java Runtime class
1. **`public static Runtime getRuntime()`**: returns the instance of Runtime class.
2. **`public void exit(int status)`**: terminates the current virtual machine.
3. **`public void addShutdownHook(Thread hook)`**: registers new hook thread.
4. **`public Process exec(String command)throws IOException`**: executes given command in a separate process.
5. **`public int availableProcessors()`**: returns no. of available processors.
6. **`public long freeMemory()`**: returns amount of free memory in JVM.
7. **`public long totalMemory()`**: returns amount of total memory in JVM.

###### `exec()`
```java
public class Runtime1{  
	public static void main(String args[]) throws Exception{  
		Runtime.getRuntime().exec("notepad");	//will open a new notepad
	}
}  
```

###### Example:
```java
public class ThreadRuntime {
	public static void main(String[] args) {
		Runtime run = Runtime.getRuntime();
		System.out.println("processor: " + run.availableProcessors());
		System.out.println("total memory: " + run.totalMemory());
		System.out.println("free memory: " + run.freeMemory());
		for(int i=0; i<1000; i++){
			new ThreadRuntime();
		}
		run.gc();
		System.out.println("free memory after GC: " + run.freeMemory());
		run.exit(0);
		System.out.println("this line won't get executed");
	}
}
```






---
#### Shutdown Hook
- The shutdown hook can be used to perform cleanup resource or save the state when JVM shuts down normally or abruptly.
- Performing clean resource means closing log file, sending some alerts or something else. So if you want to execute some code before JVM shuts down, use shutdown hook.

###### When does the JVM shut down?
- user presses `ctrl+c` on the command prompt
- `System.exit(int)` method is invoked
- user logoff
- user shutdown etc.

###### `addShutdownHook(Thread hook)` method
- `addShutdownHook()` method of `Runtime` class is used to register the thread with the Virtual Machine.
- The object of `Runtime` class can be obtained by calling the static factory method `getRuntime()`
	```
	Runtime r = Runtime.getRuntime();
	```

```java
class ThreadShutDown extends Thread {
	public void run() {
		System.out.println("shut down hook task completed..");
	}
}
public class ThreadRuntimeShutdown {
	public static void main(String[] args) {
		Runtime r = Runtime.getRuntime();	// singleton class
		r.addShutdownHook(new ThreadShutDown());
		System.out.println("Now main sleeping... press ctrl+c to exit");
		try{Thread.sleep(10000);}catch (Exception e) {}
	}
}
```

---
#### Garbage Collection
- In java, garbage means unreferenced objects.
- Garbage Collection is process of reclaiming the runtime unused memory automatically. In other words, it is a way to destroy the unused objects.
- To do so, we were using `free()` function in `C` language and `delete()` in `C++`. But, in java it is performed **automatically**. So, java provides better memory management.

###### Advantage of Garbage Collection
1. It makes java memory efficient because garbage collector removes the unreferenced objects from heap memory.
2. It is automatically done by the garbage collector(a part of JVM) so we don't need to make extra efforts.

###### How can an object be unreferenced?
1. By nulling the reference
```java
Employee e = new Employee();
e = null;
```
2. By assigning a reference to another
```java
Employee e1 = new Employee();
Employee e2 = new Employee();
e1 = e2;
```
3. By anonymous object etc.
```java
new Employee();
```

###### `finalize()` method
- The `finalize()` method is invoked each time before the object is garbage collected. This method can be used to perform cleanup processing.

> The **Garbage collector** of JVM collects only those objects that are created by **`new`** keyword. So if you have created any object without **`new`**, you can use finalize method to perform cleanup processing (destroying remaining objects).

###### `gc()` method
- `gc()` method is used to invoke the garbage collector to perform cleanup processing.
- `gc()` is found in `System` and `Runtime` classes

```java
public class TestGarbage{  
	public void finalize(){
		System.out.println("object is garbage collected");
	}  
	public static void main(String args[]){  
		TestGarbage s1=new TestGarbage();
		TestGarbage s2=new TestGarbage();
		s1=null;
		s2=null;
		System.gc();
	}  
}  
```

---