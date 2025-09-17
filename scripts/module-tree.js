#!/usr/bin/env node
// scripts/module-tree-classes.js

const fs = require("fs");
const path = require("path");

const rootDir = process.argv[2] ? path.resolve(process.argv[2]) : path.resolve("src");

function toModuleName(file) {
  // "app.module.ts" -> "App", "jwt.module.ts" -> "Jwt"
  const base = path.basename(file, ".module.ts");
  return base
    .replace(/[-_.](\w)/g, (_, c) => c.toUpperCase()) // kebab/underscore to camel
    .replace(/^\w/, c => c.toUpperCase());            // capitalize first
}

function findModules(dir, depth = 0) {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  const modules = [];

  // First, add module files in this folder
  for (const item of items) {
    if (item.isFile() && item.name.endsWith(".module.ts")) {
      modules.push({ name: toModuleName(item.name), depth });
    }
  }

  // Then recurse into subfolders
  for (const item of items) {
    if (item.isDirectory()) {
      modules.push(...findModules(path.join(dir, item.name), depth + 1));
    }
  }

  return modules;
}

function printTree(modules) {
  modules.forEach((mod, i) => {
    const prefix = "  ".repeat(mod.depth); // 2 spaces per level
    console.log(prefix + "- " + mod.name);
  });
}

console.log(`NestJS Module Tree (root: ${rootDir})\n`);
const modules = findModules(rootDir);
printTree(modules);