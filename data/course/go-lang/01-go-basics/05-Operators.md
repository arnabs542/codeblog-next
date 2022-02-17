---
title: Operators
type: topic
section: Basics
course: Go Lang
tags:
- GoLang
---
A symbol that is used to perform logical or mathematical tasks is called an operator. Go provides the following built-in operators:
- Arithmetic operators
- Logical operators
- Bitwise operators

### 1. Arithmetic operators
##### Binary Operators
Common binary operators `+`, `-`, `*` and `/` exist for both integers and floats in Golang.

> Integer division by 0 causes the program to crash, and a run-time panic occurs (in many cases the compiler can detect this condition). Division by 0.0 with floating-point numbers gives an infinite result: `+Inf`.

There are shortcuts for some operations.
```go
b = b + a
```
can be shortened as:
```go
b += a
```
The same goes for -=, *=, /= and %= .

##### Unary Operators
As unary operators for integers and floats we have:
- Increment operator `++`
- Decrement operator `--`

However, these operators can only be used after the number, which means: `i++` is short for `i+=1` which is, in turn, short for `i=i+1`. Similarly, `i–-` is short for `i-=1` which is short for `i=i-1`.

**`++` and `--` may only be used as statements, not expressions**; so `n = i++` is invalid, and subtler expressions like `f(i++) or a[i]=b[i++]`, which are accepted in C, C++ and Java, cannot be used in Go.

No error is generated when an overflow occurs during an operation because high bits are simply discarded. Constants can be of help here. If we need integers or rational numbers of unbounded size (only limited by the available memory), we can use the math/big package from the standard library, which provides the types big.Int and big.Rat.

### 2. Logical operators
Following are logical operators present in Go: `==`, `!=`, `<`, `>`, `<=`, `>=`

> Go is very strict about the values that can be compared. It demands that values have to be of the same type. If one of them is a constant, it must be of a type compatible with the other. If these conditions are not satisfied, one of the values has first to be converted to the other’s type.

```go
package main
import "fmt"

func main(){
    b3 := 10 > 5          // greater than operator
    fmt.Println(b3)
    b3 = 10 < 5           // less than operator
    fmt.Println(b3)
    b3 = 5 <= 10          // less than equal to
    fmt.Println(b3)
    b3 = 10 != 10         // not equal to 
    fmt.Println(b3)
}
```

Boolean constants and variables can also be combined with logical operators to produce a boolean value. Such a logical statement is not a complete Go-statement on itself. Go has three boolean logical operators:
- **AND** operator (`&&`)
- **OR** operator (`||`)
- **NOT** operator (`!`)

```go
package main
import "fmt"

func main(){
    b3 := 10 > 5 && 7 < 15     // AND operator
    fmt.Println(b3)
    b3 = 10 < 5 || 2 > 7       // OR operator
    fmt.Println(b3)
    b3 = !b3                   // NOT operator
    fmt.Println(b3)
}
```

### 3. Bitwise operators
They work only on integer variables having bit-patterns of equal length. %b is the format-string for bit-representations. Following are some bitwise operators: 
- AND `&`
- OR `|`
- XOR `^`
- CLEAR `&^`
- COMPLEMENT `^`

Bitwise AND, OR, XOR, and CLEAR are binary operators which means they require two operands to work on. However, the complement operator is a unary operator.

There are other two major bitwise operators used for shifting:
- Left shift operator `<<`
- Right shift operator `>>`

---
### Operators and precedence

| Precedence | Operator(s) |
|-|-|
| 7 | ^ ! |
| 6 | * / % << >> & &^ |
| 5 | + - | ^ |
| 4 | == != < <= >= > |
| 3 | <- |
| 2 | && |
| 1 | || |

Using ( ) is of course allowed to clarify expressions, to indicate priority in operations as expressions contained in ( ) are always evaluated first.


---