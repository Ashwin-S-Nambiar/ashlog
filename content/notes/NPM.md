---
title: npm
date: 2025-10-08
tags: [npm, nodejs, package-manager, frontend, backend, web-development]
---
## Overview
**npm (Node Package Manager)** is the default **package manager for [[notes/Tech Stack/Node.js]]**. It allows developers to **install, manage, and share** open-source JavaScript packages that can be used in both **frontend** and **backend** projects.

npm is an essential tool in modern **[[notes/Web Development]]** workflows, enabling faster development and easier dependency management.

## Key Features
* **Package management:** Installs and manages project dependencies easily.
* **Version control:** Allows locking specific package versions using `package-lock.json`.
* **Scripts:** Automates repetitive tasks like builds, testing, and deployment with `npm run`.
* **Registry:** Provides access to the world’s largest collection of open-source libraries.
* **Local & global installs:** Supports both project-specific and system-wide installations.

## Common Commands
| Command                    | Description                                                          |
| -------------------------- | -------------------------------------------------------------------- |
| `npm init`                 | Initializes a new Node.js project and creates a `package.json` file. |
| `npm install <package>`    | Installs a package locally to your project.                          |
| `npm install -g <package>` | Installs a package globally on your system.                          |
| `npm uninstall <package>`  | Removes a package from your project.                                 |
| `npm update`               | Updates all packages to their latest compatible versions.            |
| `npm run <script>`         | Runs a custom script defined in `package.json`.                      |
| `npm list`                 | Lists all installed packages.                                        |

## Why Use npm?
* Provides access to **millions of reusable packages**.
* Ensures **consistent builds** via `package-lock.json`.
* Supports **custom script automation** for tasks like linting, testing, and deployment.
* Integrates smoothly with tools like **Webpack**, **Babel**, and **ESLint**.