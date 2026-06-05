/*
=============================================================
  SESSION 3 — Asynchronous JavaScript
=============================================================
  This is THE most important concept before we touch any
  backend code. Every database call, every HTTP request,
  every file read in Node is async. If you don't grok this,
  the next 11 weeks will be miserable. So we go slowly here.

  HOW TO RUN:
      node 00-js-warmup/03-async.js

  RULES:
    - Same as before: no AI/Google. Read the primer, attempt
      the tasks, paste the file back for review.
    - This file uses an IIFE (immediately-invoked async
      function) wrapper because we can't use `await` at the
      top level in CommonJS. Don't worry about it — just
      put your code INSIDE the `main()` function.
=============================================================

  WHY ASYNC EXISTS (mental model)
  -------------------------------
  JavaScript is SINGLE-THREADED — it can only do one thing
  at a time. If a database query takes 200ms, the rest of
  your app can't be frozen for 200ms. So instead of
  *waiting*, JS hands the slow task off to the runtime and
  says "call me back when you're done." That's async.

  Three things in your daily life are async:
    - Network requests (fetch, axios, DB queries)
    - File I/O (reading/writing files)
    - Timers (setTimeout, setInterval)


  PROMISES — the modern primitive
  -------------------------------
  A Promise is an OBJECT that represents a future value.
  It has three states:

      pending  → not done yet
      fulfilled → done, with a value
      rejected → done, with an error

  You consume a Promise with .then() / .catch():

      fetchUser()
        .then(user => console.log(user))
        .catch(err => console.error(err));

  Or — cleaner — with async/await:

      try {
        const user = await fetchUser();
        console.log(user);
      } catch (err) {
        console.error(err);
      }

  These two snippets do THE EXACT SAME THING. await is just
  syntactic sugar over .then().


  THE RULES YOU MUST INTERNALIZE
  -------------------------------
  1. Any function marked `async` ALWAYS returns a Promise.
     Even `async () => 1` returns Promise<1>, not 1.

  2. You can only use `await` INSIDE an async function.
     (Top-level await works in ES modules, but not here.)

  3. Forgetting `await` is the #1 async bug. If you do:
        const user = fetchUser();   // forgot await!
        console.log(user.name);     // CRASHES — user is a Promise
     ...you'll see `undefined` or a TypeError. Always await.

  4. fetch() returns a Promise<Response>. The Response.json()
     method is ALSO async. So a typical fetch is two awaits:
        const res = await fetch(url);
        const data = await res.json();


  ONE BIG GOTCHA WITH fetch()
  ---------------------------
  fetch() does NOT throw on HTTP errors like 404 or 500.
  It only throws on NETWORK failures (DNS, no internet).
  So you must manually check response.ok:

      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }
      const data = await res.json();

  This trips up EVERY junior dev on their first real fetch.
=============================================================
*/


// We wrap everything in an async IIFE so we can use `await`
// at the top level. Put your task code inside the main() body.
const main = async () => {

  // ==========================================================
  // TASK 1 — Make a Promise from scratch
  // ==========================================================
  // Create a Promise called `greetingPromise` that resolves
  // with the string "Hello from a Promise!" after 1 second.
  //
  // Use this skeleton:
  //   const greetingPromise = new Promise((resolve, reject) => {
  //     setTimeout(() => resolve("..."), 1000);
  //   });
  //
  // Then:
  //   - First, log it BEFORE awaiting: console.log("Before await:", greetingPromise);
  //     (You'll see it prints "Promise { <pending> }" — that's the Promise object.)
  //   - Then await it and log the resolved value.
  //
  // Expected output:
  //   Before await: Promise { <pending> }
  //   Resolved value: Hello from a Promise!

  console.log("\n=== TASK 1 ===");
  // YOUR CODE HERE:

  const greetingPromise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Hello from a Promise!"), 1000);
  });

  console.log("Before await:", greetingPromise);

  const resolvedValue = await greetingPromise;

  console.log("Resolved value:", resolvedValue);




  // ==========================================================
  // TASK 2 — Write a function that returns a Promise
  // ==========================================================
  // Write an arrow function `delay(ms)` that returns a Promise
  // resolving (with no value) after `ms` milliseconds.
  //
  // Skeleton:
  //   const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));
  //
  // Then write `fetchUserFromDB(id)` — an async function that
  // simulates a database query by waiting 500ms, then returning
  // an object like { id, name: "User_" + id, role: "developer" }.
  //
  // Use await delay(500) inside fetchUserFromDB.
  //
  // Then call it: const user = await fetchUserFromDB(42);
  // and log the result.
  //
  // Expected output (after a ~500ms pause):
  //   { id: 42, name: 'User_42', role: 'developer' }

  console.log("\n=== TASK 2 ===");
  // YOUR CODE HERE:

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  const fetchUserFromDB = async (id) => {
    await delay(500);
    return { id, name: "User_" + id, role: "developer"};
  }
  const user = await fetchUserFromDB(42);
  console.log(user);


  // ==========================================================
  // TASK 3 — Real fetch: get YOUR GitHub user data
  // ==========================================================
  // Use fetch() to call the GitHub API and get your own user info:
  //   https://api.github.com/users/Adityag025
  //
  // Remember the TWO-step fetch pattern:
  //   const res = await fetch(url);
  //   const data = await res.json();
  //
  // Log: data.login, data.name, data.bio, data.public_repos
  // (Some of those may be null if you haven't filled them in
  //  on your GitHub profile — that's fine, just log them anyway.)

  console.log("\n=== TASK 3 ===");
  // YOUR CODE HERE:

const res = await fetch("https://api.github.com/users/Adityag025");
const data = await res.json();

console.log("Login:", data.login);
console.log("Name:", data.name);
console.log("Bio:", data.bio);
console.log("Public repos:", data.public_repos);

  // ==========================================================
  // TASK 4 — Sequential vs Parallel
  // ==========================================================
  // Fetch TWO users from GitHub:
  //   https://api.github.com/users/torvalds   (Linus Torvalds)
  //   https://api.github.com/users/gaearon    (Dan Abramov, React core)
  //
  // Approach A — SEQUENTIAL (one then the other):
  //   const t0 = Date.now();
  //   const a = await fetch(...).then(r => r.json());
  //   const b = await fetch(...).then(r => r.json());
  //   console.log("Sequential took:", Date.now() - t0, "ms");
  //
  // Approach B — PARALLEL (both at once via Promise.all):
  //   const t0 = Date.now();
  //   const [a, b] = await Promise.all([
  //     fetch(urlA).then(r => r.json()),
  //     fetch(urlB).then(r => r.json()),
  //   ]);
  //   console.log("Parallel took:", Date.now() - t0, "ms");
  //
  // Run BOTH. Log both timings. Notice that parallel is
  // roughly half the time of sequential — that's why
  // Promise.all matters.
  //
  // Also log the two users' .login fields to confirm you got
  // both ('torvalds' and 'gaearon').

  console.log("\n=== TASK 4 ===");
  // YOUR CODE HERE:
  const urlA = "https://api.github.com/users/torvalds";
  const urlB = "https://api.github.com/users/gaearon";
  
  // Sequential
  const t0 = Date.now();
  const userA = await fetch(urlA).then(r => r.json());
  const userB = await fetch(urlB).then(r => r.json());
  console.log("Sequential took:", Date.now() - t0, "ms");
  console.log("User A login: ", userA.login);
  console.log("User B login: ", userB.login);

  // Parallel
  const t1 = Date.now();
  const [userC, userD] = await Promise.all([
    fetch(urlA).then(r => r.json()),
    fetch(urlB).then(r => r.json()),
  ]);
  console.log("Parallel took:", Date.now() - t1, "ms");
  console.log("User C login: ", userC.login);
  console.log("User D login: ", userD.login);


  // ==========================================================
  // TASK 5 — Error handling (the gotcha)
  // ==========================================================
  // Fetch a user that DOESN'T exist:
  //   https://api.github.com/users/this-user-definitely-does-not-exist-xyz123
  //
  // Try it WITHOUT checking response.ok first — just parse JSON
  // and log it. Notice what happens: no error thrown, but the
  // response body is something like { message: "Not Found", ... }.
  //
  // Then redo it the RIGHT way:
  //   const res = await fetch(url);
  //   if (!res.ok) {
  //     throw new Error(`HTTP ${res.status}: ${res.statusText}`);
  //   }
  //   const data = await res.json();
  //
  // Wrap the right-way version in try/catch and log the caught
  // error message.

  console.log("\n=== TASK 5 ===");
  // YOUR CODE HERE:

  const badUrl = "https://api.github.com/users/this-user-definitely-does-not-exist-xyz123";

  //Worng Way
  const badRes = await fetch(badUrl);
  const badData = await badRes.json();
  console.log("Bad data:", badData);

  //Right Way
  try {
    const res = await fetch(badUrl);

    console.log("Wrong Way - Status:", res.status); 
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    }
    const payLoad = await res.json();
    console.log("PayLoad:", payLoad);
  } catch (err) {
    console.error("Caught error:", err.message);
  }




  // ==========================================================
  // TASK 6 — BOSS LEVEL: Combine endpoints
  // ==========================================================
  // Fetch BOTH:
  //   https://api.github.com/users/torvalds        (user info)
  //   https://api.github.com/users/torvalds/repos  (his public repos)
  //
  // Do them in PARALLEL with Promise.all.
  //
  // Then build a "profile summary" object:
  //   {
  //     name: <user.name>,
  //     bio: <user.bio>,
  //     publicRepos: <user.public_repos>,
  //     topRepos: [<top 3 repos by stargazers_count, just names>]
  //   }
  //
  // Hint: the repos endpoint returns an ARRAY. Use:
  //   .sort((a, b) => b.stargazers_count - a.stargazers_count)
  //   .slice(0, 3)
  //   .map(r => r.name)
  //
  // (Recognize sort/slice/map from Session 2? You're already
  //  using your earlier skills in a real context.)
  //
  // Log the summary object.

  console.log("\n=== TASK 6 ===");
  // YOUR CODE HERE:

  const userURL = "https://api.github.com/users/torvalds";
  const reposURL = "https://api.github.com/users/torvalds/repos";

  const [userNew, repos] = await Promise.all([
    fetch(userURL).then(r => r.json()),
    fetch(reposURL).then(r => r.json()),
  ])

  const profileSummary = {
    name: userNew.name,
    bio: userNew.bio,
    publicRepos: userNew.public_repos,
    topRepos: repos.sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 3).map(r => r.name)
  }

  console.log("profileSummary:", profileSummary);





};

// Run the async main() and catch any uncaught errors
main().catch(err => {
  console.error("\n!!! Uncaught error in main:", err);
});


/*
=============================================================
  WHEN DONE:
    1. Run:  node 00-js-warmup/03-async.js
    2. Tasks 3-6 require internet — if you're offline, just
       comment those out and we'll do them when you're back online.
    3. Paste the file back. Bonus points if you correctly
       predicted the output of each task before running.

  THINGS TO NOTICE WHILE WORKING:
    - The order things print: are they in task order, or do
      the async ones interleave? Why?
    - Task 4: how much faster is parallel? It's not magic —
      it's network latency overlapping.
    - Task 5: did fetch() throw on the 404? What did the
      "data" actually contain?
=============================================================
*/
