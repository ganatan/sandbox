# Error
[DEP0040] DeprecationWarning: The `punycode` module is deprecated. Please use a userland alternative instead.
(Use `node --trace-deprecation ...` to show where the warning was created)

// Ajoute au début de ton app.js
process.removeAllListeners('warning')


ou dans script


"scripts": {
  "dev": "node --no-deprecation src/server.js"
}