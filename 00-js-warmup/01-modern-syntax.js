/*
=============================================================
  SESSION 1 — Modern JavaScript Syntax
=============================================================
  Concepts covered:
    1. Arrow functions
    2. Template literals
    3. Destructuring (objects & arrays)
    4. Spread / Rest operators
    5. Default parameters

  HOW TO RUN THIS FILE:
    From the project root, run:
        node 00-js-warmup/01-modern-syntax.js

  RULES:
    - Do NOT use Google/ChatGPT/Claude. Use only the hints below.
    - It's OK to get things wrong. Mistakes are how you learn.
    - When done (or stuck), paste your code back to me for review.
=============================================================
*/


// ----------------------------------------------------------
// EXAMPLE (already done for you — read this carefully)
// ----------------------------------------------------------
// Old style:
function addOld(a, b) {
  return a + b;
}

// Modern arrow function — same thing:
const add = (a, b) => a + b;

console.log("Example:", add(2, 3)); // -> Example: 5



// ----------------------------------------------------------
// TASK 1 — Arrow function + template literal
// ----------------------------------------------------------
// Write an arrow function called `greet` that takes a `name`
// parameter and returns the string: "Hello, <name>! Welcome to DevSphere."
//
// Use a TEMPLATE LITERAL (backticks: `...${variable}...`), not + concatenation.
//
// Then call it with your name and console.log the result.

// YOUR CODE HERE:

const greet = (name) => `Hello, ${name}! Welcome to DevSphere.`;

console.log(greet("Aditya")); // -> Hello, Aditya! Welcome to DevSphere.




// ----------------------------------------------------------
// TASK 2 — Object destructuring
// ----------------------------------------------------------
// Given this user object:
const user = {
  username: "ranjet",
  email: "ranjet@odigma.ooo",
  role: "developer",
  joinedAt: "2026-05-19",
};

// Using DESTRUCTURING (not user.username, etc.), pull out
// `username` and `email` into their own variables in ONE line,
// then console.log them.
//
// Syntax reminder: const { keyA, keyB } = someObject;

// YOUR CODE HERE:

const{username, email} = user;

console.log(username, email); // -> ranjet



// ----------------------------------------------------------
// TASK 3 — Array destructuring
// ----------------------------------------------------------
// Given this array of the top 3 most-liked posts:
const topPosts = ["Intro to React Hooks", "Why MongoDB?", "Express Middleware Explained"];

// Using ARRAY destructuring, pull out the first and second
// posts into variables called `first` and `second`, then log them.
//
// Syntax reminder: const [a, b] = someArray;

// YOUR CODE HERE:
const [first, second] = topPosts;

console.log(first, second); // -> Intro to React Hooks Why MongoDB?



// ----------------------------------------------------------
// TASK 4 — Spread operator
// ----------------------------------------------------------
// Given these two arrays of tags:
const reactTags = ["react", "hooks", "jsx", "components"];
const nodeTags = ["node", "express", "api", "components"];

// Create a new array `allTags` that contains BOTH sets of tags,
// using the SPREAD operator (...). Then log it.
//
// Syntax reminder: const combined = [...arr1, ...arr2];

// YOUR CODE HERE:
const allTags = [...reactTags, ...nodeTags];

console.log("allTags:", allTags);

const uniqueTags = [...new Set(allTags)];

console.log("uniqueTags:", uniqueTags);



// ----------------------------------------------------------
// TASK 5 — Rest parameter + default parameter
// ----------------------------------------------------------
// Write an arrow function called `createPost` that takes:
//   - title (required)
//   - author (defaults to "Anonymous" if not provided)
//   - ...tags (any number of tag strings — use REST operator)
//
// It should RETURN an object with shape:
//   { title, author, tags, createdAt: <current ISO timestamp> }
//
// Hint: new Date().toISOString() gives you the timestamp.
//
// Then call it like this and log the result:
//   createPost("My first post", "ranjet", "intro", "mern", "learning")
//
// Bonus: also call it WITHOUT an author to confirm the default works:
//   createPost("Anonymous test", undefined, "test")

// YOUR CODE HERE:

const createPost = (title, author = "Anonymous", ...tags) => {
  return {
    title,
    author,
    tags,
    createdAt: new Date().toISOString(),
  }
}

console.log(createPost("My first post", "Aditya", "intro", "mern", "learning"));





// ----------------------------------------------------------
// TASK 6 — Bringing it together (the "user card formatter")
// ----------------------------------------------------------
// Given this array of user objects:
const users = [
  { name: "Alice", role: "frontend", skills: ["react", "css", "typescript"] },
  { name: "Bob", role: "backend", skills: ["node", "postgres", "redis"] },
  { name: "Carol", role: "fullstack", skills: ["react", "node", "mongo"] },
];

// Write an arrow function `formatCard` that takes ONE user object
// and returns a formatted string like:
//
//   "Alice (frontend) — knows: react, css, typescript"
//
// Use destructuring in the function parameter, like:
//   const formatCard = ({ name, role, skills }) => `...`;
//
// Then loop through `users` and console.log a formatted card for each.
// Use a `for...of` loop OR an arrow function with .forEach — your call.

// YOUR CODE HERE:

const formatCard = ({name, role, skills}) => `${name} (${role}) — knows: ${skills.join(", ")}`;

users.forEach(user => console.log(formatCard(user)));

console.log(formatCard(users[0]));



/*
=============================================================
  WHEN YOU'RE DONE:
    1. Run it:  node 00-js-warmup/01-modern-syntax.js
    2. If it errors, try to read the error message before asking
       for help. (Reading errors is a real skill — practice it.)
    3. Paste your full file content back to me in chat.
       I'll review line by line.
=============================================================
*/
