---
title: Introduction to Go
type: topic
section: Basics
course: Go Lang
tags:
- GoLang
---
<img src="https://golang.org/lib/godoc/images/home-gopher.png"></img>

## What is Go?
- Go is an open-source programming language that makes it easy to build simple, reliable, and efficient software solutions.
- Go is a general-purpose language designed with systems programming in mind.
- Go is a statically typed and compiled programming language. It provides inbuilt support for garbage collection, and supports concurrent programming.
- **Statically typed** means that variable types are explicitly declared and thus are determined at compile time.
- **Compiled language** means a language that translates source code to machine code before execution.
- Go belongs to the C-family, like C++, Java, and C#, and is inspired by many other languages created and used by its designers.

---
## Reasons for Developing Go
##### 1. Evolving with computing landscape
- Programming languages like C/C++ did not evolve with the computing landscape, so there is a need for a new systems language, appropriate for the needs of our computing era.

##### 2. Need for faster software development
- In contrast to computing power, software development has not become considerably faster or more successful (considering the number of failed projects), whereas applications still grow in size. Therefore, a new low-level language was needed, equipped with higher concepts.

##### 3. Need for efficiency and ease of programming
- Before Go, a developer had to choose between fast execution but slow and inefficient building (like C++) or efficient compilation but not so fast execution (like .NET or Java), or ease of programming but slower execution (like dynamic languages such as Python, Ruby or JavaScript). Go is an attempt to combine all the three wishes: **efficient and fast compilation**, **fast execution**, and **ease of programming**.

##### 4. Support for network communication, concurrency, and parallelization
- To get the most out of distributed and multi-core machines excellent support for networked-communication, concurrency, and parallelization.
- Golang was expected to achieve this target for internal use in Google, and this target is achieved through the concepts of goroutines.

##### 5. Support for excellent building speed
- There was a growing concern to improve the building speed (compilation and linking to produce machine code) of C++ projects, which are heavily used in Google’s infrastructure.
- The “header files” of languages caused considerable overhead leading in order to build times of hours for the biggest projects. Developers felt the need for clean dependency analysis and fast compilation, which Go language provides with its package model.
- With Go, this is no longer an issue! Compilation times are negligible, and we have the same productivity as in the development cycle of a scripting or dynamic language. In addition to this, the execution speed of the native code is comparable to C/C++.

##### 6. Support for memory management
- Because memory problems (memory leaks) are a long-time problem of C++, Go’s designers decided that memory management should not be the responsibility of a developer. So although Go executes native code, it runs in a small runtime, which takes care of an efficient and fast garbage collection. Go also has a built-in runtime reflection capability.

---
## Features of Go
1. Go is essentially an **imperative** (procedural, structural) language, built with concurrency in mind.
2. It is not truly object-oriented like Java and C++ because it doesn’t have the concepts of classes and inheritance. However, it does have a concepts of interfaces, with which much of the polymorphism can be implemented.
3. Go has a clear and expressive type-system, but it is lightweight and without hierarchy. So in this respect, it could be called a **Hybrid language**.
4. Golang is a **functional language**, meaning that functions are the basic building blocks, and their use is very versatile.
5. Go is **statically typed**, making it a safe language that compiles to native code and has a very efficient execution. It is also strongly typed, which means according to the principle keep things explicit. Implicit type conversions (also called castings or coercions) are not allowed. An important thing to note is that Go does have some features of **dynamically typed** languages (using var keyword).
6. Last but not least, Go has support for **cross-compilation**, for example, developing and compiling on a Linux-machine for an application that will execute on Windows. It is one of the first programming languages that can use UTF-8 not only in strings but also in program code. Go is truly an international language because Go source-files are also in UTF-8.

Some features of modern OOP languages were intentionally left out, because object orientation was too heavy often leading to cumbersome development constructing big type-hierarchies, and so not compliant with the speed goal of the language. As per the decision made by the Go-team, the following OOP features are missing from Golang. Although, some of them might still be implemented in its future versions:
- To simplify the design, no _function or operator overloading_ was added.
- _Implicit conversions_ were excluded to avoid the many bugs and confusion arising from this in languages like C/C++.
- No _classes_ and _type inheritance_ is supported in Golang.
- Golang does not support _variant types_. However, almost the same functionality is realized through **interfaces**.
- Dynamic code loading and dynamic libraries are excluded.
- _Generics_ are not included (but this is a possible feature for Go 2.0).
- _Exceptions_ are not included (although **recover/panic** often goes in that direction).
- _Assertions_ are not included.
- _Immutable_ (unable to change) variables are excluded.

---
## Uses of Go
#### 1. Used as a system programming language
- Go was originally conceived as a systems programming language for the heavy server-centric (Google) world of web servers, storage architecture, and the like. For certain domains like high performance distributed systems, Go has already proven to be a more productive language than most others. Golang shines in and makes massive concurrency and event-processing easy. So it should be a good fit for the game server and IoT (Internet of Things) development.

#### 2. Used as a general programming language
- Go is also a general programming language, useful for solving text-processing problems, making frontends, or even scripting-like applications. However, Go is not suited for real-time software because of the garbage collection and automatic memory allocation.

#### 3. Used as an internal support
- Go is being used for some time internally in Google for heavy-duty distributed applications, e.g., parts of Google Maps run on Go.

---
## Guiding design principles
- Go tries to reduce typing, clutter, and complexity in coding through a minimal amount of keywords (25). This, together with the clean, regular, and concise syntax, enhances the compilation speed because the keywords can be parsed without a symbol table as its grammar is LALR(1).
- These aspects reduce the number of code lines necessary, even when compared with a language like Java. Additionally, Go has a minimalist approach: there tends to be only one way of getting things done
- The design concepts of the language are orthogonal because they don’t stand in each other’s way, and they don’t add up complexity to one another.
- Golang is completely defined by an explicit specification, it is not defined by an implementation as is Ruby, for example. An explicit language specification was required for implementing the two different compilers gc and gccgo, and this in itself was a great help in clarifying the specification.

---