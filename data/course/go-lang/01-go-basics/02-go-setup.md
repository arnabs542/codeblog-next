---
title: 'Go Setup'
type: topic
section: Basics
course: Go Lang
tags:
- GoLang
---
## Installation
- 

---
## Test your installation
- Create a file named hello.go that looks like:
```
package main
import "fmt"
func main() {
	fmt.Printf("hello, world\n")
}
```

- Then build it with the go tool:
```
$ go build hello.go
```

- Execute it to see the greeting:
```
$ ./hello
hello, world
```
---
## Uninstalling Go
- To remove an existing Go installation from your system delete the go directory. This is usually `/usr/local/go` under Linux, macOS, and FreeBSD or `c:\Go` under Windows.

---