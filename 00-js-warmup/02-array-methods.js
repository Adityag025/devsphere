/*
=============================================================
  SESSION 2 — Array methods: map / filter / reduce
=============================================================
  These three methods are the heart of modern JS data work.
  By the end of this file, you'll be able to read and write
  data transformations that look like:

      posts
        .filter(p => p.published)
        .map(p => ({ id: p.id, title: p.title }))
        .reduce((acc, p) => acc + p.likes, 0);

  ...without flinching.

  HOW TO RUN:
      node 00-js-warmup/02-array-methods.js
=============================================================

  THE 3 METHODS IN ONE PARAGRAPH EACH:

  --- map ---
  Takes an array, returns a NEW array of the SAME length.
  Each element is transformed by your function.
  Use when: you want to convert each item into something else.

      [1, 2, 3].map(n => n * 2)           // [2, 4, 6]
      users.map(u => u.email)             // array of emails

  --- filter ---
  Takes an array, returns a NEW array (possibly shorter).
  Keeps only elements for which your function returns true.
  Use when: you want a subset of the array.

      [1, 2, 3, 4].filter(n => n % 2 === 0)   // [2, 4]
      users.filter(u => u.role === "admin")   // only admins

  --- reduce ---
  Takes an array, returns a SINGLE value (number, string,
  object, even another array). You provide a "reducer"
  function that accumulates a result element-by-element.
  Use when: you want to roll up an array into one value.

      [1, 2, 3, 4].reduce((acc, n) => acc + n, 0)   // 10  (sum)
      [1, 2, 3, 4].reduce((acc, n) => acc * n, 1)   // 24  (product)

  reduce signature:  array.reduce((accumulator, current) => ..., initialValue)

  KEY MENTAL MODEL:
    - map    = transform each      → same-length array
    - filter = keep some            → shorter-or-equal array
    - reduce = roll up into one     → single value
=============================================================
*/


// ----------------------------------------------------------
// THE DATA — your DevSphere posts (don't modify)
// ----------------------------------------------------------
const posts = [
  { id: 1, title: "Intro to React Hooks",      author: "alice",  likes: 42,  tags: ["react", "hooks"],         published: true  },
  { id: 2, title: "Why MongoDB?",              author: "bob",    likes: 17,  tags: ["mongo", "database"],      published: true  },
  { id: 3, title: "Express Middleware 101",    author: "alice",  likes: 89,  tags: ["express", "node"],        published: true  },
  { id: 4, title: "Draft: My CSS Journey",     author: "carol",  likes: 0,   tags: ["css"],                    published: false },
  { id: 5, title: "JWT Authentication Guide",  author: "bob",    likes: 134, tags: ["auth", "jwt", "node"],    published: true  },
  { id: 6, title: "Draft: Tailwind vs CSS",    author: "alice",  likes: 3,   tags: ["css", "tailwind"],        published: false },
  { id: 7, title: "MongoDB Aggregation Tips",  author: "bob",    likes: 56,  tags: ["mongo", "database"],      published: true  },
];


// ----------------------------------------------------------
// TASK 1 — map: extract titles
// ----------------------------------------------------------
// Create an array `titles` containing just the title of each post.
// Use .map().
// Expected: ["Intro to React Hooks", "Why MongoDB?", ...] (7 strings)
//
// Then console.log it.

// YOUR CODE HERE:

const titles = posts.map(post => post.title);
console.log("Titles:", titles);



// ----------------------------------------------------------
// TASK 2 — filter: only published posts
// ----------------------------------------------------------
// Create an array `publishedPosts` containing only posts
// where `published === true`. Use .filter().
// Expected: 5 posts (id 1, 2, 3, 5, 7)
//
// Then console.log it.

// YOUR CODE HERE:

const publishedPosts = posts.filter(post => post.published);
console.log("Published posts:", publishedPosts);




// ----------------------------------------------------------
// TASK 3 — chain filter + map
// ----------------------------------------------------------
// Create an array `popularTitles` containing the TITLES of
// posts that have MORE than 50 likes.
//
// Chain .filter() then .map() — read the chain left-to-right
// like a pipeline:
//      posts → filter(likes > 50) → map(to title)
// Expected: ["Express Middleware 101", "JWT Authentication Guide", "MongoDB Aggregation Tips"]
//
// Then console.log it.

// YOUR CODE HERE:

const popularTitles = posts
  .filter(post => post.likes > 50)
  .map(post => post.title);
  console.log("Popular titles:", popularTitles);


// ----------------------------------------------------------
// TASK 4 — reduce: total likes
// ----------------------------------------------------------
// Compute `totalLikes` — the sum of `likes` across ALL posts.
// Use .reduce(). Remember the second argument is the
// initial value of the accumulator.
//
// Expected: 341
//
// Then console.log it.

// YOUR CODE HERE:

  const totalLikes = posts.reduce((acc, post) => acc + post.likes, 0);
  console.log("Total likes:", totalLikes);


// ----------------------------------------------------------
// TASK 5 — reduce: average likes (published posts only)
// ----------------------------------------------------------
// Compute the AVERAGE number of likes across PUBLISHED posts only.
// Round to 2 decimals.
//
// Hint: filter first, then reduce to get sum, then divide by length.
//   const avg = +(sum / count).toFixed(2);
//   (the leading + converts the string back to a number)
//
// Expected: 67.6

// YOUR CODE HERE:

const publishedPostsnew = posts.filter(post => post.published);
const totalLikesNew = publishedPostsnew.reduce((acc, post) => acc + post.likes, 0);
const avgLikes = +(totalLikesNew / publishedPostsnew.length).toFixed(2);    
console.log("Average likes (published posts):", avgLikes);



// ----------------------------------------------------------
// TASK 6 — reduce into an OBJECT (this is the "wow" one)
// ----------------------------------------------------------
// Build an object `postsByAuthor` that counts how many
// posts each author has written.
// Expected shape:
//   { alice: 3, bob: 3, carol: 1 }
//
// Hint:
//   posts.reduce((acc, post) => {
//     acc[post.author] = (acc[post.author] || 0) + 1;
//     return acc;
//   }, {});
//
// (Try writing it yourself first WITHOUT copying the hint —
//  the hint is your safety net, not the first thing to try.)

// YOUR CODE HERE:

const postsByAuthor = posts.reduce((acc, post) => {
  acc[post.author] = (acc[post.author] || 0) + 1;
  return acc;
}, {});

console.log("Posts by author:", postsByAuthor);



// ----------------------------------------------------------
// TASK 7 — BOSS LEVEL: tag frequency
// ----------------------------------------------------------
// Build an object `tagFrequency` showing how many times
// each tag appears across ALL posts (published or not).
// Expected:
//   { react: 1, hooks: 1, mongo: 2, database: 2, express: 1,
//     node: 2, css: 2, auth: 1, jwt: 1, tailwind: 1 }
//
// Hint: each post has a `tags` ARRAY. You'll need to loop
// through tags inside reduce. Either:
//   - use .forEach inside the reducer, OR
//   - chain something like .flatMap() before .reduce()
//
// flatMap = map then flatten one level:
//   [[1,2],[3,4]].flatMap(x => x)   // [1, 2, 3, 4]
//
// Try both approaches if you have time. Pick whichever feels clearer.

// YOUR CODE HERE:

const tagFrequency = posts.reduce((acc, post) => {
  post.tags.forEach(tag => {
    acc[tag] = (acc[tag] || 0) + 1;
  });
  return acc;
}, {});

console.log("Tag frequency:", tagFrequency);

/*
=============================================================
  WHEN DONE:
    1. Run:  node 00-js-warmup/02-array-methods.js
    2. Verify your output matches the "Expected" comments.
    3. Paste your full file back to me — but also be ready to
       answer a couple of CONCEPTUAL questions I'll ask.

  PREDICT BEFORE YOU RUN:
    For each task, try to think through what the output will
    be BEFORE running the file. If your prediction is wrong,
    that gap is where the learning happens.
=============================================================
*/
