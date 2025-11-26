---
title: npx
date: 2025-10-08
tags: [npx, nodejs, package-runner, npm, backend, frontend, web-development]
---
## Overview
**npx** is a **package runner tool** that comes bundled with **[[notes/Tech Stack/NPM|npm]] (v5.2.0 and above)**. It allows developers to **execute Node.js packages directly from the npm registry** without having to install them globally or permanently in your project.

In short, `npx` helps you **run Node.js commands quickly and cleanly** perfect for trying tools, running CLIs, or executing scripts on the fly.

## Key Features
* **Run packages without installing:** Executes commands from npm packages without cluttering your global environment.
* **Temporary installs:** Automatically installs the package temporarily, uses it, and then removes it.
* **Execute local binaries:** Detects and runs locally installed binaries from `node_modules/.bin`.
* **Version control:** Lets you run a specific version of a package if needed.

## Common Use Cases
| Command                       | Description                                                          |
| ----------------------------- | -------------------------------------------------------------------- |
| `npx create-react-app my-app` | Runs the React app generator without needing to install it globally. |
| `npx nodemon app.js`          | Runs a locally installed nodemon instance.                           |
| `npx eslint .`                | Executes ESLint for linting the current project.                     |
| `npx tsc`                     | Runs TypeScript compiler from local dependencies.                    |
| `npx cowsay "Hello World!"`   | Executes a fun CLI tool directly from npm.                           |

## Why Use npx?
* **No global clutter:** Keeps your environment clean.
* **Convenience:** Quickly test or run packages without installation hassle.
* **Consistency:** Ensures you’re running the **exact version** specified in the project’s dependencies.
* **Ideal for one-off commands:** Great for tools like project generators, linters, or formatters.

## Example Workflow
Instead of doing this:

```bash
npm install -g create-react-app
create-react-app my-app
```

You can simply do:

```bash
npx create-react-app my-app
```

This uses the latest version directly from npm, runs it, and then removes it **no global install needed**.
