---
title: Go Basics
type: topic
section: Basics
course: Go Lang
tags:
- GoLang
---
### Filename
- Go source code is stored in .go files.
- Filenames consist of lowercase-letters, like `helloworld.go`. If the name consists of multiple parts, they are separated by underscores `_`, like `hello_world.go`.
- Filenames cannot contain spaces or any other special characters.
- A source file contains code lines whose length has no intrinsic limits.

### Keyword
- A reserved word, with a special meaning in a programming language, is called a **keyword**.
- Examples, func, interface, defer, go, range, etc.

### Identifiers
- An **identifier** is a name assigned by the user to a program element like a variable, a function, a template, and a class, etc.
- Like all other languages in the C-family, Go is case-sensitive. Valid identifiers begin with a letter (a letter is every letter in Unicode UTF-8) or _ and are followed by 0 or more letters or Unicode digits, like X56, group1, _x23, i, and өԑ12.
- Valid identifiers - `hello`, `_test`
- NOT valid identifiers - `1ab`, `case`, `a+b`

Apart from the keywords, Go has a set of 36 predeclared identifiers which contain the names of elementary types and some basic built-in functions. Example, `append`, `bool`, `iota`, `float64`, etc

##### Blank identifier
The `_` itself is a special identifier, called the blank identifier. Like any other identifier, `_` can be used in declarations or variable assignments (and any type can be assigned to it). However, its value is discarded, so it can no longer be used in the code that follows.

##### Anonymous
Sometimes it is possible that even functions have no name because it is not really necessary at that point in the code and not having a name even enhances flexibility. Such functions are called **anonymous**.

---
### The basic structure of a Go program
Programs consist of keywords, constants, variables, operators, types and functions. It is also important to know the **delimiter** and **punctuation characters** that are a part of Golang.

##### delimiters
1. Parentheses ()
2. Braces {}
3. Brackets []

##### punctuation characters
1. `.`
2. `,`
3. `;`
4. `:`
5. `...`

The code is structured in statements. A statement doesn’t need to end with a `;` (like it is imposed on the C-family of languages). The Go compiler automatically inserts semicolons at the end of statements. However, if multiple statements are written on one line (a practice which is not encouraged for readability reasons), they must be separated by `;`.

---
### Packages
A library, module, or namespace in any other language is called a **package**. Packages are a way to structure code. A program is constructed as a package which may use facilities from other packages. A package is often abbreviated as **‘pkg’**.

Every Go file belongs to only one package whereas one package can comprise many different Go files. Hence, the filename(s) and the package name are generally not the same. The package to which the code-file belongs must be indicated on the first line. A package name is written in lowercase letters. For example, if your code-file belongs to a package called main, do the following:
```go
package main
```
A standalone executable belongs to **main**. Each Go application contains one **main**.

##### Package dependencies
To build a program, the packages, and the files within them must be compiled in the correct order. Package dependencies determine the order in which to build the packages. Within a package, the source files must all be compiled together. The package is compiled as a unit, and by convention, each directory contains one package. If a package is changed and recompiled, all the client programs that use this package must be recompiled too!

---
### Import
A Go program is created by linking set of packages together, with the **import** keyword. For example, if you want to import a package say `fmt`, then you do:
```go
package main
import "fmt"
```

It tells Go that this program needs functions, or other elements from the package `fmt`, which implements a functionality for formatted IO. The package names are enclosed within " "(double quotes).

> Import loads the **public declarations** from the compiled package; it does not insert the source code.

**Ways to import multiple packages:**
```go
import "fmt"
import "os"
```
```go
import "fmt"; import "os"
```
```go
import (
  "fmt"
  "os"
)
```

**Factoring** means calling a keyword once on multiple instances. You may have noticed that we imported two packages using a single import keyword. It is also applicable to keywords like `const`, `var`, and `type`.

## Visibility
Packages contain all other code objects apart from the blank identifier (`_`). Also, identifiers of code-objects in a package have to be unique which means that there can be no naming conflicts. However, the same identifier can be used in different packages. The package name qualifies a package to be different.

#### Visibility rule
Packages expose their code objects to code outside of the package according to the following rule enforced by the compiler:
1. When the identifier (of a constant, variable, type, function, struct field, …) starts with an **uppercase** letter, like, **Group1**, then the ‘object’ with this identifier is visible in code outside the package (thus available to client-programs, or ‘importers’ of the package), and it is said to be **exported** (like public identifiers/variables in OO languages). Identifiers that start with a **lowercase** letter are not visible outside the package, but they are visible and usable in the whole package (like private identifiers/variables).
> Capital letters can come from the entire Unicode-range, like Greek; not only ASCII letters are allowed.
2. Importing a package gives access only to the exported objects in that package. Suppose we have an instance of a variable or a function called `Object` (starts with O so it is exported) in a package `pack1`. When `pack1` is imported in the current package, `Object` can be called with the usual dot-notation from OO-languages:
```go
pack1.Object
```
3. Packages also serve as namespaces and can help us avoid name-conflicts. For example, variables with the same name in two packages are differentiated by their package name, like `pack1.Object` and `pack2.Object`.
4. A package can also be given another name called an alias. If you name a package then its alias will be used throughout the code, rather than its original name. For example:
```go
import fm "fmt"
```
Now in the code, whenever you want to use `fmt`, use its alias `fm` (not `fmt`).

> Go has a motto known as **“No unnecessary code!”**. So importing a package which is not used in the rest of the code is a build-error.

---
### Comments
- Explanation of source code added to a program as a text note is called a **comment**. 
- Comments are un-compilable. They are just for the understanding of the user.
- In Go, a one-line comment starts with `//`. A multi-line or block-comment starts with `/*` and ends with `*/`, where nesting is not allowed.

##### Naming things in Go
Clean, readable code and simplicity are major goals of Go development. Therefore, the names of things in Go should be short, concise, and evocative. Long names with mixed caps and underscores which are often seen e.g., in Java or Python code, sometimes hinder readability. Names should not contain an indication of the package. A method or function which returns an object is named as a noun, no Get… is needed. To change an object, use SetName. If necessary, Go uses MixedCaps or mixedCaps rather than underscores to write multiword names.

---