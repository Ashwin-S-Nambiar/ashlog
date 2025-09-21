---
title: TypeScript
tags: [typescript, javascript, programming, web, frontend, backend]
---
TypeScript is a **statically typed superset of [[notes/JavaScript]]** developed and maintained by Microsoft. It adds optional static typing and modern features to JavaScript, enabling developers to build more reliable, maintainable, and scalable applications.

## Key Features
### Static Typing
TypeScript allows developers to declare variable and function types for better predictability.

```typescript
// JavaScript
function add(a, b) {
  return a + b;
}

// TypeScript
function add(a: number, b: number): number {
  return a + b;
}
````
### Type Inference
TypeScript can automatically infer types without explicit annotations.

```typescript
let count = 10; // inferred as number
// count = "ten"; Error: Type 'string' is not assignable to type 'number'
```
### Modern JavaScript Support
TypeScript supports the latest ECMAScript features while compiling down to plain JavaScript.

```typescript
// Using optional chaining (modern JavaScript feature)
const user = { profile: { name: "Ashwin" } };
console.log(user?.profile?.name); // "Ashwin"
```
### Interfaces and Types
Interfaces help define contracts for objects, improving maintainability.

```typescript
interface User {
  id: number;
  name: string;
  isActive: boolean;
}

const ashwin: User = {
  id: 1,
  name: "Ashwin",
  isActive: true
};
```
### Classes and OOP
TypeScript enhances object-oriented programming with features like access modifiers.

```typescript
class Person {
  private name: string;

  constructor(name: string) {
    this.name = name;
  }

  greet(): string {
    return `Hello, my name is ${this.name}`;
  }
}

const p = new Person("Ashwin");
console.log(p.greet()); // Hello, my name is Ashwin
```
### Tooling and Editor Support
TypeScript integrates deeply with IDEs like VS Code, providing autocompletion, refactoring, and error highlighting.

## Advantages
* Reduces bugs through **type safety** and **compile-time checks**
* Enhances productivity with editor tooling and auto-completion
* Improves maintainability for large-scale applications
* Works seamlessly with existing [[notes/JavaScript]] projects
## Purpose
TypeScript aims to **make large-scale application development more predictable and robust** by extending JavaScript with static typing and modern programming constructs. It is widely used in frameworks like [[notes/React]] for building reliable [[notes/Single Page Applications]], and integrates smoothly with build tools such as [[notes/Vite]].
