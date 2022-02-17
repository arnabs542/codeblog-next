---
title: Elementary Types
type: topic
section: Basics
course: Go Lang
tags:
- GoLang
---
The three main elementary types in Go are: **Boolean**, **Numeric**, **Character**

### 1. Boolean type
The possible values of this type are the predefined constants true and false.
```go
var a bool = true
var b bool = false
```

### 2. Numerical type
##### Integers and floating-point numbers
Go has architecture-dependent types such as `int`, `uint`, and `uintptr`. They have the appropriate length for the machine on which a program runs.

An `int` is a default signed type, which means it takes a size of 32 bit (4 bytes) on a 32-bit machine and 64 bit (8 bytes) on a 64-bit machine, and the same goes for `unit` (unsigned int). Meanwhile, `uintptr` is an unsigned integer large enough to store a bit pattern of any pointer.

The architecture independent types have a fixed size (in bits) indicated by their names. For integers:
- `int8` (-128 to 127)
- `int16` (-32768 to 32767)
- `int32` (− 2,147,483,648 to 2,147,483,647)
- `int64` (− 9,223,372,036,854,775,808 to 9,223,372,036,854,775,807)

For unsigned integers:
- `uint8` (with the alias byte, 0 to 255)
- `uint16` (0 to 65,535)
- `uint32` (0 to 4,294,967,295)
- `uint64` (0 to 18,446,744,073,709,551,615)

For floats:
- `float32` (± 1O^{-45} to ± 3.4 * 1O^{38}
- `float64` (± 5 * 1O^{-324} to 1.7 * 1O^{308}

> Unlike other languages, a float type on its own does not exist in Golang. We have to specify the bits. For example, float32 or float64.

`int` is the integer type, and it offers the fastest processing speeds. The initial (default) value for integers is `0`, and for floats, this is `0.0`. A `float32` is reliably accurate to about 7 decimal places, and a `float64` to about 15 decimal places. Use float64 whenever possible, because all the functions of the math package expect that type.

##### Numbers Notations
- **Octal notation** with a prefix of 0: 63 can be written as 077077.
- **Hexadecimal notation** with a prefix of 0x: 255 can be written as 0xFF.
- **Scientific notation** with ee, which represents the power of 10: 1000 can be written as 1e^{3} or 6.022*10^{23} can be written as 6.022e^{23}

##### No implicit casting
- As Go is strongly typed, the mixing of types is not allowed, as in the following program. However, constants are considered to have no type in this respect. Therefore, with constants, mixing is allowed.

```go
package main

func main() {
    var a int
    var b int32
    a = 15
    b = a + a // compiler error
    b = b + 5 // ok: 5 is a constant
}
```

##### explicit conversion
```go
package main
import "fmt"

func main() {
    var n int16 = 34    // int16 variable
    var m int32         // int32 variable

    m = int32(n)        // explicit typing
    fmt.Printf("32 bit int is: %d\n", m)
    fmt.Printf("16 bit int is: %d\n", n)
}
```

##### Format specifiers
- In format-strings, `%d` is used as a format specifier for integers (`%x` or `%X` can be used for a hexadecimal representation).
- The `%g` is used for float types (`%f` gives a floating-point, and `%e` gives a scientific notation).
- The `%0nd` shows an integer with n digits, and a leading 0 is necessary.
- The `%n.mg` represents the number with `m` digits after the decimal sign, and `n` before it. Instead of `g`, `e` and `f` can also be used. For example, the `%5.2e` formatting of the value 3.4 gives 3.40e+00.

##### Complex numbers
A complex number is written in the form of:
```go
re + imi
```
where `re` is the real part, `im` is the imaginary part, and `¡` is the `√-1`. For these data we have the following types:
- `complex64` (with a 32 bit real and imaginary part each)
- `complex128` (with a 64 bit real and imaginary part each)

```go
package main
import "fmt"

func main(){
    var c1 complex64 = 5 + 10i        // Declaring complex num (real +imaginary(¡))
    fmt.Printf("The value is: %v", c1)
}
```

In format-strings, the default format specifier `%v` can be used for complex numbers; otherwise, use `%f` for both constituent parts (real and imaginary separate).

If `re` and `im` are of type `float32`, a variable `c` of type `complex64` can be made with the function `complex`:
```go
c = complex(re, im)
```
We can also get the parts of a complex number through built-in functions. The functions `real(c)` and `imag(c)` give the real and imaginary parts of `c`, respectively.

##### Random numbers
Some programs, like games or statistical applications, need random numbers. The package math/rand implements pseudo-random number generators.
```go
package main
import (
"fmt"
"math/rand"
)

func main(){
    a := rand.Int()               // generates a random number
    b := rand.Intn(8)             // generates a random number in [0, n)
    fmt.Printf("a is: %d\n", a)
    fmt.Printf("b is: %d\n", b)
}
```

### 3. Character type
Strictly speaking, this is not a type in Go. The characters are a special case of integers. The byte type is an alias for uint8, and this is okay for the traditional ASCII-encoding for characters (1 byte). A byte type variable is declared as single quotes ‘’ surround a character:
```go
var ch byte = 'A'
```
In the ASCII-table the decimal value for A is 65, and the hexadecimal value is 41. The following are also declarations for the character A:
```go
var ch byte = 65
var ch byte = '\x41'
```
`\x` is always followed by exactly two hexadecimal digits. Another possible notation is a \ followed by exactly 3 octal digits, e.g., `\377`.

But there is also support for Unicode (UTF-8). Characters are also called Unicode code points, and a Unicode character is represented by an int in memory. In the documentation, they are commonly represented as U+hhhh, where h is a hexadecimal digit. In fact, the type rune exists in Go and is an alias for type int32. To write a Unicode-character in code, preface the hexadecimal value with \u or \U. If 4 bytes are needed for the character, \U is used. Where \u is always followed by exactly four hexadecimal digits and \U by eight. Run the following program to see how Unicode character type works.
```go
package main
import "fmt"

func main(){
    var ch1 int = '\u0041'
    var ch2 int = '\u03B2'
    var ch3 int = '\U00101234'
    fmt.Printf("%d - %d - %d\n", ch1, ch2, ch3)  // integer
    fmt.Printf("%c - %c - %c\n", ch1, ch2, ch3)  // character
    fmt.Printf("%X - %X - %X\n", ch1, ch2, ch3)  // UTF-8 bytes
    fmt.Printf("%U - %U - %U", ch1, ch2, ch3)    // UTF-8 code point
}
```

At line 5 and line 6, the declared characters `ch1` and `ch2` are represented by four bytes because we used `\u`. Where `ch3` is represented with eight bytes using `\U`. You may have noticed that we print these characters using four different format specifiers: %d, %c, %X, and %U from line 8 to line 11. In format-strings, %c is used as a format specifier to show the character, format-specifiers %v or %d show the integer representing the character, and %U outputs the U+hhhh notation.

##### The `unicode` package
The package unicode has some useful functions for testing characters.
```go
unicode.IsLetter(ch)
unicode.IsDigit(ch)
unicode.IsSpace(ch)
```
These functions return a `bool` value. The `utf8` package further contains functions to work with runes.

---