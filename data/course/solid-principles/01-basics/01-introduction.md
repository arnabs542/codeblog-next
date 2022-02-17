---
title: 'Introduction to SOLID Principles'
type: 'topic'
section: '01 Basics'
course: 'SOLID Principles'
tags:
- design
- system design
- solid principles
---
#####Problems that appear when SOLID principle are not used, or when code is not robust:

1. **Code Fragility**: Fragility is the tendency of the software to break in many places every time it is changed.
2. **Code Rigidity**: Rigidity is the tendency of the software to be difficult to change, even in simple ways. Every change causes a cascade of subsequent changes in dependent modules.

#####Choice we have to make:
1. **Fast Delivery**: Easiest fix/change, Fast, Poor written code
2. **Code Quality**: Takes more time, Adds a bit of complexity, Maintainable

#####Technical Debt:
- The cost of prioritizing fast delivery over code quality for long periods of time.
- Code Fragility and Code Rigidity are symptoms of high Technical Debt.
- Technical Debt is inversly propotional to Customer Responsiveness.

####SOLID Principles
#####5 software design principles that help us to keep technical debt under control:
- S: Single responsibility principle
- O: Open closed principle
- L: Liskov substitution principle
- I: Interface segregation principle
- D: Dependency inversion principle

> SOLID principles are more effective when applied together.

#####Advantage of S.O.L.I.D code:
- Easy to understand and reason about
- Changes are faster and have a minimal risk level
- Highly maintainable over long period of time
- Cost effective

#####Pyramid of Clean Code (ways to keep architecture clean):
1. Constant refactoring
2. Unit testing(TDD)
3. Design patterns
4. SOLID