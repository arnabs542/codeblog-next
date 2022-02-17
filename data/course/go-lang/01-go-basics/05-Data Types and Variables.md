---
title: Data Types and Variables
type: topic
section: Basics
course: Go Lang
tags:
- GoLang
---
### Data Types
- Variables contain data, and data can be of different **data types** or **types** for short.
- Go is a **statically typed** language. It means the compiler must know the types of all the variables, either because they were explicitly indicated, or because the compiler can infer the type from the code context.
- A type defines the set of values and the set of operations that can take place on those values. 

**Here is an overview of some categories of types:**

|Types|Examples|
|-|-|
|elementary (or primitive)|`int`, `float`, `bool`, `string`|
|structured (or composite)|`struct`, `array`, `slice`, `map`, `channel`|
|interfaces|They describe the behavior of a type.|

> A **structured** type, which has no real value (yet), has the value `nil`, which is also the default value for these types.

To declare a variable, var keyword is used as:
```go
var var1 type1
```
`var1` is the variable name, and `type1` is the type of `var1`.

Functions can also be of a certain type. The type of function is the type of variable which is returned by it. This type is written after the function name and its optional parameter-list, like:
```go
func FunctionName (a typea, b typeb) typeFunc {
  ...
  return var1
}
```
So, you can see that `typeFunc` is the (return) type of the function, `FunctionName`.

A function can have more than one return variables. In this case, the return-types are separated by comma(s) and surrounded by ( ), like:
```go
func FunctionName (a typea, b typeb) (t1 type1, t2 type2) {
  ...
  return var1, var2
}
```

##### Alias
It is possible to have an alias for data types similar to what we have for packages.
```go
type IZ int
var a IZ = 5
```
If you have more than one type to define, you can use the factored keyword form, as in:
```go
type (
  IZ int
  FZ float32
  STR string
)
```

---
## Conversions
Sometimes a value needs to be converted into a value of another type called **type-casting**. Go does not allow implicit conversion, which means Go never does such a conversion by itself. The conversion must be done **explicitly** as `valueOfTypeB = typeB(valueOfTypeA)`. 
```go
package main
import "fmt"

func main(){
    var number float32 = 5.2         // Declared a floating point variable
    fmt.Println(number)              // Printing the value of variable
    fmt.Println(int(number))         // Printing the type-castes result
}
```

---
### Variables
A value that can be changed by a program during execution is called a variable. The general form for declaring a variable uses the keyword var as:
```go
var identifier type
```

- `type` is written after the `identifier` of the variable, contrary to most older programming languages.
- When a variable is declared, memory in Go is initialized, which means it contains the default zero or null value depending upon its type automatically.

**Example**
```go
package main
import "fmt"

func main(){
    var number int          // Declaring  an integer variable 
    fmt.Println(number)     // 0
    var decision bool       // Declaring a boolean variable
    fmt.Println(decision)   // false
}
```

> The naming of identifiers for variables follows the camelCasing rules (start with a small letter, and every new part of the word starts with a capital letter). But if the variable has to be exported, it must start with a capital letter.

##### Assigning values
A variable is assigned a value using the assignment operator(=) at compile time. But of course, a value can also be computed or changed during runtime. Declaration and assignment (initialization) can be combined in the general format:
```go
var identifier type = value
```
**Example**
```go
package main
import "fmt"

func main(){
    var number int = 5          // Declaring and initializing  an integer variable 
    fmt.Println(number)          // Printing its value
    var decision bool = true     // Declaring a initializing a boolean variable
    fmt.Println(decision)        // Printing its value
}
```
Go-compiler is intelligent enough to derive the type of a variable from its value dynamically, also called **automatic type inference** at runtime, so omitting the type of a variable is also a correct syntax.
```go
package main
import "fmt"

func main(){
    var number = 5          // Declaring and initializing an integer variable without stating its type
    fmt.Println(number)     // Printing its value
    var decision = true     // Declaring and initializing a boolean variable without stating its type
    fmt.Println(decision)   // Printing its value
}
```

##### Short form with `:=` assignment operator
With the type omitted, the keyword var is pretty superfluous in line 5 and line 7 of the above program. So we can also write it as:
```go
number := 5 // line 5
decision := true // line 7
```
This is the preferred form, but it can only be used inside functions, not in package scope. This operator (`:=`) effectively makes a new variable; it is also called an initializing declaration.

> If a variable named v is used but not declared, it will give a compiler error: `undefined: v`. And, if v was declared as a local variable but not used, then the compiler will give the error: `v declared and not used`.

---
### Constants
- A value that cannot be changed by the program is called a **constant**.
- This data can only be of type boolean, number (integer, float, or complex) or string.

##### Explicit and implicit typing
In Go, a constant can be defined using the keyword const as:
```go
const identifier [type] = value
```
[type] is optional because the compiler can implicitly derive the type from the value.

**Example**
```go
const PI = 3.14159
```

> There is a convention to name constant identifiers with all **uppercase** letters, e.g., `const INCHTOCM = 2.54`. This improves readability.

##### Typed and untyped constants
Constants declared through explicit typing are called **typed constants**, and constants declared through implicit typing are called **untyped constants**.

A value derived from an untyped constant becomes typed when it is used within a context that requires a typed value. For example:
```go
var n int  
f(n + 5)   // untyped numeric constant "5" becomes typed as int, because n was int.
```

##### Compilation
Constants must be evaluated at compile-time. A const can be defined as a calculation, but all the values necessary for the calculation must be available at compile time.
```go
const C1 = 2/3 // okay
const C2 = getNumber() // compile time error
```

##### Overflow
Numeric constants have no size or sign. They can be of arbitrarily high precision and do not overflow:
```go
const Ln2= 0.693147180559945309417232121458\
176568075500134360255254120680009
const Log2E= 1/Ln2 // this is a precise reciprocal
const BILLION = 1e9 // float constant
const HARD_EIGHT = (1 << 100) >> 97
```
> We used \ (backslash) in declaring constant Ln2. It can be used as a continuation character in a constant.

##### Multiple assignments
The assignments made in one single assignment statement are called **multiple assignments**. Go allows different ways of multiple assignments.
```go
// untyped constants.
const CHICKEN, TWO, POTATO = "meat", 2, "veg"
// typed constants
const MONDAY, TUESDAY, WEDNESDAY, THURSDAY, FRIDAY, SATURDAY int= 1, 2, 3, 4, 5, 6
```

##### Enumerations
Listing of all elements of a set is called enumeration. Constants can be used for enumerations.
```go
const (
  UNKNOWN = 0
  FEMALE = 1
  MALE = 2
)
```
`UNKNOWN`, `FEMALE` and `MALE` are now aliases for 0, 1 and 2.

Interestingly value `iota` can be used to enumerate the values.
```go
const (
  UNKNOWN = iota
  FEMALE = iota
  MALE = iota
)
```
The first use of iota gives 0. Whenever iota is used again on a new line, its value is incremented by 1; so UNKNOWN gets 0, FEMALE gets 1 and MALE gets 2. Remember that a new const block or declaration initializes iota back to 0. The above notation can be shortened, making no difference as:
```go
const (
  UNKNOWN = iota
  FEMALE
  MALE
)
```
You can give enumeration a type name. For example, FEMALE, MALE and UNKNOWN are categories of Gender. Let’s give them Gender as the type name:
```go
type Gender int
const (
  UNKNOWN = iota
  FEMALE
  MALE
)
```

---
### Scope of Variables


---