---
title: 'Liskov Substitution Principle'
type: 'topic'
section: '02 SOLID'
course: 'SOLID Principles'
tags:
- design
- system design
- solid principles
---
#####LSP: Liskov substitution principle
- If S is a subtype of T, they objects of type T in a program may be replaced with objects of type S without modifying the functionality of the program.
- Any object of a type must be substitutable by objects of a derived typed without altering the correctness of the program.
- In object oriented terms, `is a` relationship is not really helpful and can even make us create incorrect hierarchies of classes. Instead we should see if a particular type is substitutable by anathor type.

#####Detecting Violations of LSP
1. **Empty Methods / Functions**
    - Ex, Base class `Bird` has `fly(height)` method with implementation. `Ostrich` class extends `Bird` class which overrides `fly(height)` with empty body, as Ostrich can't fly (because in Biology, all Ostriches are Bird). If we call `fly()` method of an Ostrich object, application won't break but this method won't produce any result. So program will produce unexpected result, because of this incorrect relationship between Ostrich and Bird as class `Bird` is not fully substitutable by class `Ostrich`.
```java
class Bird {
  public void fly(int altitude) {
    setAltitude(altitude);
    // fly logic
  }
}
class Ostrich extends Bird {
  public void fly(int altitude) {
    // Do nothing
  }
}
Bird ostrich = new Ostrich();
ostrich.fly(1000);
```
> We can create 2 different class `Bird` and `Ostrich`
2. **Harden Preconditions**
    - Each time we harden preconditions, we break the Liskov substitution principle.
    - Ex, we have a class `Rectangle` with 2 setters for width and height and a method `calculateArea()` which returns product of width and height. Now, we create a class `Square` which extends `Rectangle` because in Mathematical term, all squares are rectangle. In setters `setHeight()` and `setWidth()`, we harden the initial preconditions because for a square, width and height are equal. Here we are able to set width and height for `Square` object, so program will behave incorrectly. This is because of incorrect relationship between `Square` and `Rectangle`.
```
Rectangle r = new Square();
r.setWidth();
r.setHeight();
r.calculateArea();  //will return 400
```
> We can create 2 different class `Square` and `Rectangle`
3. **Partial implemented interfaces**
    - In below example, application will crash as we have incorrect heirarchy between `SchoolAccout` class and `Account`interface. An account is not fully substitutable by SchoolAccount.
```java
interface Account {
  void processLocalTransfer(double amount);
  void processInternationalTransfer(double amount);
}
class schoolAccount implements Account {
  void processLocalTransfer(double amount) {
    // Business logic here
  }
  void processInternationalTransfer(double amount) {
    throw new RuntimeException("Not implemented");
  }
}
Account account = new schoolAccount();
account.processInternationalTransfer(1000); // App will crash
```
> We can breakdown the interface into smaller interfaces like `LocalAccount` (with method `processLocalTransfer()`), etc.

4. **Type Checking**
    - This kind of approach, where for most subtypes you do one thing, but for particular subtypes, you do another thing, is an indication that those subtypes cannot substitute their base type. 
```java
for (Task : tasks){
  if(t instanceof BugFix) {
    BugFix bf = (BugFix)t;
    bf.initializeBugDescription();
  }
  t.setInProgress();
}
```
> Instead of checking type of `t` in the loop, we can override `setInProgress()` method to add extra logic for `BugFix` type.
```java
class BugFix extends Task {
  @Override
  public void setInProgress() {
    this.initializeBugDescription();
    super.setInProgress();
  }
}
for (Task : tasks){
  t.setInProgress();
}
```

#####Ways to Refactor Code to LSP
1. Remove incorrect relations between objects.
2. Use **Tell, don't ask** principle to eliminate type checking and casting.

#####Apply LSP in a Proactive way
- Make sure that a derived type can substitute its base type completely in all the contexts of application. Don't ask `is a` question.
- Keep base classes small and focussed.
- Keep interfaces lean.

> Real life categories do not always map to OOP relationships.

> If it looks like a Duck, quacks like a Duck, but needs batteries - you probably have the wrong abstraction