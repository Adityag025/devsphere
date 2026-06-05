export const topics = [
  {
    id: 'arrow-functions',
    title: 'Arrow Functions',
    emoji: '⚡',
    summary: 'Concise function syntax with implicit returns and lexical `this` — the syntax you\'ll use 90% of the time in modern JS.',
    concepts: [
      {
        title: 'Traditional vs Arrow',
        explanation: 'Arrow functions drop the `function` keyword. When the body is a single expression, you can also drop `return` and the curly braces — called an "implicit return".',
        example: `// Traditional
function add(a, b) { return a + b; }

// Arrow — same thing, shorter
const add = (a, b) => a + b;

// Single param — parens optional
const double = n => n * 2;

// No params — parens required
const greet = () => 'Hello!';`,
      },
      {
        title: 'Template Literals',
        explanation: 'Backtick strings allow embedded expressions with `${...}` and support multi-line text without escape characters.',
        example: `const name = 'Aditya';
const role = 'developer';

// Old way
const msg1 = 'Hi, ' + name + '! You are a ' + role + '.';

// Template literal — cleaner
const msg2 = \`Hi, \${name}! You are a \${role}.\`;

// Expressions work too
const price = 99;
const tax = \`Total: $\${(price * 1.18).toFixed(2)}\`;`,
      },
      {
        title: 'Returning Objects',
        explanation: 'When an arrow function implicitly returns an object literal, wrap it in parentheses — otherwise JS thinks the `{` opens a function body.',
        example: `// ❌ Wrong — JS sees the { as a block, not an object
const makeUser = name => { name, role: 'dev' };  // undefined!

// ✅ Correct — wrap in parens
const makeUser = name => ({ name, role: 'dev' });

console.log(makeUser('Aditya')); // { name: 'Aditya', role: 'dev' }`,
      },
    ],
    starterCode: `// Run this to see arrow functions + template literals in action

const multiply = (a, b) => a * b;
console.log(multiply(6, 7)); // 42

// Implicit return with object
const makeUser = (name, role) => ({ name, role, active: true });
console.log(makeUser('Aditya', 'developer'));

// Template literals
const skills = ['React', 'Node', 'MongoDB'];
const intro = \`Hi! I know \${skills.length} skills: \${skills.join(', ')}.\`;
console.log(intro);

// Arrow inside array method (preview of Session 2)
const nums = [1, 2, 3, 4, 5];
const squares = nums.map(n => n * n);
console.log('Squares:', squares);
`,
    challenge: {
      description: `Write an arrow function called formatPrice(amount, currency) that returns a template literal like:
  "Price: $99.99 USD"

Then create a second arrow function called applyDiscount(price, percent) that returns the discounted price rounded to 2 decimal places.

Test both:
  formatPrice(49.99, 'USD')   → "Price: $49.99 USD"
  applyDiscount(100, 20)      → 80 (20% off)
  applyDiscount(49.99, 10)    → 44.99`,
      hint: 'Use .toFixed(2) to round — but note it returns a string, so wrap with Number() or parseFloat() if you need a number back.',
      starterCode: `// Write your solution here

const formatPrice = // your code

const applyDiscount = // your code

// Test it:
console.log(formatPrice(49.99, 'USD'));
console.log(applyDiscount(100, 20));
console.log(applyDiscount(49.99, 10));
`,
      solution: `const formatPrice = (amount, currency) =>
  \`Price: $\${amount.toFixed(2)} \${currency}\`;

const applyDiscount = (price, percent) =>
  parseFloat((price * (1 - percent / 100)).toFixed(2));

console.log(formatPrice(49.99, 'USD'));   // Price: $49.99 USD
console.log(applyDiscount(100, 20));       // 80
console.log(applyDiscount(49.99, 10));    // 44.99`,
    },
  },

  {
    id: 'destructuring',
    title: 'Destructuring',
    emoji: '🧩',
    summary: 'Unpack values from arrays or properties from objects into variables — a pattern you\'ll see constantly in React props and API responses.',
    concepts: [
      {
        title: 'Array Destructuring',
        explanation: 'Pull values out by position. Use commas to skip indexes. The rest operator `...` grabs everything remaining.',
        example: `const colors = ['red', 'green', 'blue', 'purple'];

// Basic
const [first, second] = colors;
console.log(first);  // 'red'

// Skip index 2 with an empty comma
const [a, b, , fourth] = colors;
console.log(fourth); // 'purple'

// Rest — grab the tail
const [head, ...rest] = colors;
console.log(rest);   // ['green', 'blue', 'purple']`,
      },
      {
        title: 'Object Destructuring',
        explanation: 'Pull out properties by name. You can rename them, set default values, and even destructure nested objects.',
        example: `const user = { id: 1, name: 'Alice', role: 'admin', age: 28 };

// Basic
const { name, role } = user;
console.log(name, role); // Alice admin

// Rename: { original: alias }
const { name: userName, role: userRole } = user;

// Default value (used when property is missing)
const { country = 'India' } = user;
console.log(country); // India

// Nested
const res = { data: { users: ['A', 'B'], total: 2 } };
const { data: { users, total } } = res;
console.log(users, total); // ['A','B'] 2`,
      },
      {
        title: 'Destructuring in Function Parameters',
        explanation: 'The most common use in React: instead of receiving the whole `props` object, destructure exactly what you need right in the parameter list.',
        example: `// Without destructuring
const greet = (user) => \`Hello, \${user.name}! Role: \${user.role}\`;

// With destructuring in the param — much cleaner
const greet = ({ name, role, country = 'India' }) =>
  \`Hello, \${name}! Role: \${role}, from \${country}\`;

const user = { name: 'Aditya', role: 'developer' };
console.log(greet(user));`,
      },
    ],
    starterCode: `// API response you might get from a backend
const apiResponse = {
  status: 200,
  data: {
    users: [
      { id: 1, name: 'Alice', role: 'admin' },
      { id: 2, name: 'Bob',   role: 'developer' },
    ],
    total: 2,
    page: 1,
  },
  timestamp: '2026-06-05T10:00:00Z',
};

// Destructure the top level
const { status, data, timestamp } = apiResponse;
console.log('Status:', status);

// Destructure nested
const { users, total, page } = data;
console.log('Total users:', total, '| Page:', page);

// Destructure the first user from the array
const [firstUser] = users;
const { name, role } = firstUser;
console.log(\`First user: \${name} (\${role})\`);

// In a function param
const printUser = ({ name, role, id }) =>
  console.log(\`#\${id}: \${name} — \${role}\`);

users.forEach(printUser);
`,
    challenge: {
      description: `Given this object:

const order = {
  id: 'ORD-001',
  customer: { name: 'Aditya', email: 'a@dev.com' },
  items: [
    { product: 'Laptop', qty: 1, price: 999 },
    { product: 'Mouse',  qty: 2, price: 29  },
  ],
  shipping: { method: 'express', days: 2 },
};

Using only destructuring (no dot notation after the initial destructure):
1. Extract customer name and email
2. Extract the first item's product name and price
3. Extract shipping method with a default of 'standard' if missing
4. Log all four values`,
      hint: 'You can chain destructuring: `const { customer: { name, email } } = order` extracts both in one line.',
      starterCode: `const order = {
  id: 'ORD-001',
  customer: { name: 'Aditya', email: 'a@dev.com' },
  items: [
    { product: 'Laptop', qty: 1, price: 999 },
    { product: 'Mouse',  qty: 2, price: 29  },
  ],
  shipping: { method: 'express', days: 2 },
};

// Your destructuring here:
`,
      solution: `const order = {
  id: 'ORD-001',
  customer: { name: 'Aditya', email: 'a@dev.com' },
  items: [
    { product: 'Laptop', qty: 1, price: 999 },
    { product: 'Mouse',  qty: 2, price: 29  },
  ],
  shipping: { method: 'express', days: 2 },
};

const { customer: { name, email } } = order;
const [{ product, price }] = order.items;
const { shipping: { method = 'standard' } } = order;

console.log('Customer:', name, email);
console.log('First item:', product, '$' + price);
console.log('Shipping:', method);`,
    },
  },

  {
    id: 'spread-rest',
    title: 'Spread & Rest',
    emoji: '✨',
    summary: '`...` does double duty: spread expands an iterable into individual elements; rest collects individual elements into an array.',
    concepts: [
      {
        title: 'Spread with Arrays',
        explanation: 'Use `...arr` to expand an array\'s elements wherever a list is expected — to combine arrays, pass elements as arguments, or clone.',
        example: `const a = [1, 2, 3];
const b = [4, 5, 6];

// Combine
const combined = [...a, ...b];
console.log(combined); // [1,2,3,4,5,6]

// Clone (not a reference — safe to mutate)
const clone = [...a];
clone.push(99);
console.log(a);     // [1,2,3] — unchanged
console.log(clone); // [1,2,3,99]

// Pass array elements as function args
const nums = [5, 1, 9, 3];
console.log(Math.max(...nums)); // 9`,
      },
      {
        title: 'Spread with Objects',
        explanation: 'Spread objects to clone or merge them. Later properties override earlier ones — useful for "patch updates" without mutating.',
        example: `const defaults = { theme: 'dark', lang: 'en', fontSize: 14 };
const overrides = { lang: 'fr', fontSize: 16 };

// Merge — overrides win
const config = { ...defaults, ...overrides };
console.log(config);
// { theme: 'dark', lang: 'fr', fontSize: 16 }

// Update one field without mutation (React pattern)
const user = { id: 1, name: 'Alice', active: false };
const updated = { ...user, active: true };
console.log(updated); // active is now true
console.log(user);    // original unchanged`,
      },
      {
        title: 'Rest Parameters',
        explanation: '`...rest` in a function parameter collects all remaining arguments into an array. Must always be last.',
        example: `// Variadic function — accepts any number of args
const sum = (...numbers) => numbers.reduce((acc, n) => acc + n, 0);

console.log(sum(1, 2, 3));       // 6
console.log(sum(10, 20, 30, 40)); // 100

// First arg is special, rest collected
const log = (level, ...messages) =>
  console.log(\`[\${level}]\`, messages.join(' | '));

log('INFO', 'Server started', 'Port 3000');
// [INFO] Server started | Port 3000`,
      },
    ],
    starterCode: `// Spread & Rest in action

// 1. Merge user profile with updates (immutable pattern)
const profile = { name: 'Aditya', role: 'dev', level: 1 };
const updates  = { level: 2, badge: 'gold' };
const newProfile = { ...profile, ...updates };
console.log('Updated profile:', newProfile);
console.log('Original unchanged:', profile);

// 2. Clone and sort without mutating original
const scores = [45, 92, 78, 55, 88];
const sorted = [...scores].sort((a, b) => b - a);
console.log('Original:', scores);
console.log('Sorted (desc):', sorted);

// 3. Variadic logger
const logger = (prefix, ...args) =>
  console.log(\`[\${prefix}]\`, ...args);

logger('DB', 'Connected to', 'mongodb://localhost:27017');
logger('AUTH', 'User logged in', '— ID:', 42);
`,
    challenge: {
      description: `Write a function called mergeWithDefaults(...configs) that:
1. Accepts any number of config objects
2. Merges them all left-to-right (later configs override earlier ones)
3. Always applies these base defaults: { env: 'development', debug: false, port: 3000 }

Then test it:
  mergeWithDefaults({ port: 8080 })
  → { env: 'development', debug: false, port: 8080 }

  mergeWithDefaults({ env: 'production', debug: false }, { port: 443 })
  → { env: 'production', debug: false, port: 443 }`,
      hint: 'You\'ll use rest (`...configs`) to collect the arguments, then spread them all in a reduce or a single spread expression.',
      starterCode: `const mergeWithDefaults = (...configs) => {
  // Your code here
};

console.log(mergeWithDefaults({ port: 8080 }));
console.log(mergeWithDefaults({ env: 'production', debug: false }, { port: 443 }));
console.log(mergeWithDefaults()); // should return just the defaults
`,
      solution: `const BASE = { env: 'development', debug: false, port: 3000 };

const mergeWithDefaults = (...configs) =>
  configs.reduce((acc, cfg) => ({ ...acc, ...cfg }), { ...BASE });

console.log(mergeWithDefaults({ port: 8080 }));
console.log(mergeWithDefaults({ env: 'production', debug: false }, { port: 443 }));
console.log(mergeWithDefaults());`,
    },
  },

  {
    id: 'array-methods',
    title: 'Array Methods',
    emoji: '🔄',
    summary: '`map`, `filter`, and `reduce` are the three workhorses of data transformation. Master these and you\'ll handle 80% of data-wrangling tasks.',
    concepts: [
      {
        title: 'map — transform each item',
        explanation: '`map` returns a new array of the same length where each element is the result of calling your callback. Never use it for side effects — that\'s what `forEach` is for.',
        example: `const prices = [10, 25, 50, 100];

// Add tax to each price
const withTax = prices.map(p => p * 1.18);
console.log(withTax); // [11.8, 29.5, 59, 118]

// Transform objects
const users = [{ name: 'Alice', age: 28 }, { name: 'Bob', age: 22 }];
const names = users.map(u => u.name);
console.log(names); // ['Alice', 'Bob']

// map with index (second param)
const indexed = prices.map((p, i) => \`#\${i+1}: $\${p}\`);
console.log(indexed);`,
      },
      {
        title: 'filter — keep matching items',
        explanation: '`filter` returns a new array containing only items where the callback returns `true`. The original array is never modified.',
        example: `const products = [
  { name: 'Laptop', price: 999, inStock: true  },
  { name: 'Cable',  price: 9,   inStock: false },
  { name: 'Mouse',  price: 49,  inStock: true  },
];

const available = products.filter(p => p.inStock);
console.log(available.map(p => p.name)); // ['Laptop','Mouse']

const affordable = products.filter(p => p.price < 100);
console.log(affordable.map(p => p.name)); // ['Cable','Mouse']`,
      },
      {
        title: 'reduce — boil down to one value',
        explanation: '`reduce(callback, initialValue)` processes each element and accumulates a single result. The accumulator starts as `initialValue` and is passed to the next iteration as the callback\'s return value.',
        example: `const cart = [
  { name: 'Book',   price: 15, qty: 2 },
  { name: 'Course', price: 49, qty: 1 },
  { name: 'Domain', price: 12, qty: 3 },
];

// Sum total cost
const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
console.log('Total: $' + total); // $115

// Build an object from an array
const byName = cart.reduce((obj, item) => {
  obj[item.name] = item.price;
  return obj;
}, {});
console.log(byName); // { Book: 15, Course: 49, Domain: 12 }`,
      },
    ],
    starterCode: `const products = [
  { id: 1, name: 'Laptop',     price: 999, category: 'electronics' },
  { id: 2, name: 'Book',       price: 15,  category: 'education'   },
  { id: 3, name: 'Headphones', price: 149, category: 'electronics' },
  { id: 4, name: 'Desk',       price: 299, category: 'furniture'   },
  { id: 5, name: 'Course',     price: 49,  category: 'education'   },
];

// map: create a display label for each product
const labels = products.map(p => \`\${p.name} — $\${p.price}\`);
console.log('All products:');
labels.forEach(l => console.log(' ', l));

// filter: only electronics
const electronics = products.filter(p => p.category === 'electronics');
console.log('\\nElectronics:', electronics.map(p => p.name));

// reduce: grand total
const total = products.reduce((sum, p) => sum + p.price, 0);
console.log('\\nGrand total: $' + total);

// Chain: total cost of education products
const eduTotal = products
  .filter(p => p.category === 'education')
  .reduce((sum, p) => sum + p.price, 0);
console.log('Education total: $' + eduTotal);
`,
    challenge: {
      description: `Using the same products array, build a summary object using ONLY array methods (map/filter/reduce — no loops):

{
  cheapest:      'Book',      // name of cheapest product
  mostExpensive: 'Laptop',   // name of most expensive
  averagePrice:  302.2,      // average across all products
  byCategory: {              // total price per category
    electronics: 1148,
    education: 64,
    furniture: 299
  }
}`,
      hint: 'For byCategory use reduce and build up an object — check if the key already exists and add to it, else start it at 0.',
      starterCode: `const products = [
  { id: 1, name: 'Laptop',     price: 999, category: 'electronics' },
  { id: 2, name: 'Book',       price: 15,  category: 'education'   },
  { id: 3, name: 'Headphones', price: 149, category: 'electronics' },
  { id: 4, name: 'Desk',       price: 299, category: 'furniture'   },
  { id: 5, name: 'Course',     price: 49,  category: 'education'   },
];

const summary = {
  cheapest:      // your code
  mostExpensive: // your code
  averagePrice:  // your code
  byCategory:    // your code
};

console.log(summary);
`,
      solution: `const products = [
  { id: 1, name: 'Laptop',     price: 999, category: 'electronics' },
  { id: 2, name: 'Book',       price: 15,  category: 'education'   },
  { id: 3, name: 'Headphones', price: 149, category: 'electronics' },
  { id: 4, name: 'Desk',       price: 299, category: 'furniture'   },
  { id: 5, name: 'Course',     price: 49,  category: 'education'   },
];

const summary = {
  cheapest: products.reduce((min, p) => p.price < min.price ? p : min).name,
  mostExpensive: products.reduce((max, p) => p.price > max.price ? p : max).name,
  averagePrice: +(products.reduce((sum, p) => sum + p.price, 0) / products.length).toFixed(1),
  byCategory: products.reduce((acc, p) => {
    acc[p.category] = (acc[p.category] || 0) + p.price;
    return acc;
  }, {}),
};

console.log(summary);`,
    },
  },

  {
    id: 'promises',
    title: 'Promises',
    emoji: '📦',
    summary: 'A Promise represents a future value — the result of an async operation that hasn\'t completed yet. The foundation of all async JS.',
    concepts: [
      {
        title: 'Creating a Promise',
        explanation: '`new Promise((resolve, reject) => {...})` takes an executor function. Call `resolve(value)` on success and `reject(error)` on failure. A Promise is always in one of three states: pending, fulfilled, or rejected.',
        example: `const fetchUser = (id) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (id > 0) {
      resolve({ id, name: 'User_' + id, role: 'developer' });
    } else {
      reject(new Error('ID must be positive'));
    }
  }, 500);
});

// Before it resolves it's "pending"
const p = fetchUser(1);
console.log(p); // Promise { <pending> }`,
      },
      {
        title: 'Consuming with .then() / .catch()',
        explanation: '`.then(onFulfilled)` runs when the Promise resolves. `.catch(onRejected)` runs when it rejects. Both return new Promises, so they can be chained.',
        example: `fetchUser(42)
  .then(user => {
    console.log('Got user:', user.name);
    return user.id * 10; // pass a value to the next .then
  })
  .then(derived => console.log('Derived value:', derived))
  .catch(err => console.error('Error:', err.message));

// fetchUser with a bad ID — triggers .catch
fetchUser(-1)
  .then(user => console.log(user))
  .catch(err => console.error('Caught:', err.message));`,
      },
      {
        title: 'Promise.all — parallel execution',
        explanation: '`Promise.all([...])` runs multiple Promises in parallel and resolves with an array of all results when every one finishes. If any one rejects, the whole thing rejects.',
        example: `// Sequential — total time = sum of all
const a = await p1; // wait for p1...
const b = await p2; // ...then wait for p2

// Parallel with Promise.all — total time = slowest one
const [a, b] = await Promise.all([p1, p2]);

// Promise.allSettled — never rejects, gives you each result
const results = await Promise.allSettled([p1, p2, p3]);
results.forEach(r => {
  if (r.status === 'fulfilled') console.log('✓', r.value);
  else console.log('✗', r.reason.message);
});`,
      },
    ],
    starterCode: `// Helper — simulates a DB call
const fetchUser = (id) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (id > 0) resolve({ id, name: 'User_' + id, role: 'developer' });
    else reject(new Error('Invalid ID: ' + id));
  }, 300);
});

// Basic .then/.catch
fetchUser(1)
  .then(user => console.log('User 1:', user.name))
  .catch(err => console.error('Error:', err.message));

// Chaining
fetchUser(2)
  .then(user => {
    console.log('Got user 2:', user.name);
    return { ...user, verified: true }; // transform and pass along
  })
  .then(verifiedUser => console.log('Verified:', verifiedUser))
  .catch(err => console.error(err.message));

// Promise.all — fetch 3 users in parallel
Promise.all([fetchUser(10), fetchUser(20), fetchUser(30)])
  .then(users => console.log('All names:', users.map(u => u.name)));

// Error in Promise.all — one bad ID causes all to fail
Promise.all([fetchUser(1), fetchUser(-1)])
  .then(users => console.log('Should not reach here'))
  .catch(err => console.error('Promise.all failed:', err.message));

console.log('↑ This prints FIRST — sync code runs before async callbacks');
`,
    challenge: {
      description: `Create a fetchPost(id) function that:
- Resolves with { id, title: "Post #" + id } after 200ms
- Rejects with "Post not found" if id > 5

Then use Promise.allSettled (NOT Promise.all) to fetch posts 2, 4, 6, and 8.
Log a summary like:
  ✓ Post #2 — Post #2
  ✓ Post #4 — Post #4
  ✗ Post 6 failed — Post not found
  ✗ Post 8 failed — Post not found`,
      hint: 'Promise.allSettled never rejects — each result has a .status of "fulfilled" or "rejected", and either .value or .reason.',
      starterCode: `const fetchPost = (id) => new Promise((resolve, reject) => {
  setTimeout(() => {
    // your logic here
  }, 200);
});

Promise.allSettled([fetchPost(2), fetchPost(4), fetchPost(6), fetchPost(8)])
  .then(results => {
    results.forEach((result, i) => {
      // log each result
    });
  });
`,
      solution: `const fetchPost = (id) => new Promise((resolve, reject) => {
  setTimeout(() => {
    if (id <= 5) resolve({ id, title: 'Post #' + id });
    else reject(new Error('Post not found'));
  }, 200);
});

const ids = [2, 4, 6, 8];

Promise.allSettled(ids.map(fetchPost))
  .then(results => {
    results.forEach((result, i) => {
      if (result.status === 'fulfilled') {
        console.log(\`✓ Post #\${ids[i]} — \${result.value.title}\`);
      } else {
        console.log(\`✗ Post \${ids[i]} failed — \${result.reason.message}\`);
      }
    });
  });`,
    },
  },

  {
    id: 'async-await',
    title: 'async / await',
    emoji: '⏳',
    summary: 'async/await is syntactic sugar over Promises — the same mechanics, just written to look synchronous. This is what you\'ll use in every Express route and React data-fetch.',
    concepts: [
      {
        title: 'async functions always return a Promise',
        explanation: 'Mark any function with `async` and it automatically returns a Promise, even if you just `return 1`. Inside an async function, use `await` to pause until a Promise resolves.',
        example: `// This returns Promise<42>, not 42
async function getNumber() { return 42; }

// await unwraps the Promise
const result = await getNumber();
console.log(result); // 42

// async arrow function
const fetchData = async (url) => {
  const res = await fetch(url);
  const data = await res.json(); // res.json() is also async!
  return data;
};`,
      },
      {
        title: 'try/catch for error handling',
        explanation: 'With async/await you use regular try/catch instead of `.catch()`. This is cleaner for multi-step flows where any step might fail.',
        example: `const loadUser = async (id) => {
  try {
    const res = await fetch(\`/api/users/\${id}\`);
    if (!res.ok) throw new Error(\`HTTP \${res.status}\`); // manual check!
    const user = await res.json();
    return user;
  } catch (err) {
    console.error('loadUser failed:', err.message);
    return null; // fallback value
  }
};`,
      },
      {
        title: 'Sequential vs Parallel',
        explanation: 'Two `await`s in a row are sequential — the second waits for the first. For parallel execution, pass Promises to `Promise.all` BEFORE awaiting.',
        example: `// ❌ Sequential — ~600ms total (300 + 300)
const a = await fetchA(); // wait 300ms
const b = await fetchB(); // wait another 300ms

// ✅ Parallel — ~300ms total (both run at once)
const [a, b] = await Promise.all([fetchA(), fetchB()]);
// Note: we call fetchA() and fetchB() first (no await),
// THEN await both together via Promise.all`,
      },
    ],
    starterCode: `const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

const fakeDB = {
  users: { 1: { id: 1, name: 'Aditya', role: 'developer' } },
  posts: { 42: { id: 42, title: 'My First Post', authorId: 1 } },
};

// Simulated async DB calls
const getUser = async (id) => {
  await delay(200);
  const user = fakeDB.users[id];
  if (!user) throw new Error(\`User \${id} not found\`);
  return user;
};

const getPost = async (id) => {
  await delay(150);
  const post = fakeDB.posts[id];
  if (!post) throw new Error(\`Post \${id} not found\`);
  return post;
};

// Main async function
const main = async () => {
  // Sequential — user first, then post
  const user = await getUser(1);
  const post = await getPost(42);
  console.log(\`\${user.name} wrote: "\${post.title}"\`);

  // Parallel — both at once (faster!)
  const [u, p] = await Promise.all([getUser(1), getPost(42)]);
  console.log('Parallel result:', u.name, '|', p.title);

  // Error handling
  try {
    await getUser(999); // doesn't exist
  } catch (err) {
    console.error('Caught:', err.message);
  }
};

main();
`,
    challenge: {
      description: `Write an async function loadGitHubProfile(username) that:
1. Fetches https://api.github.com/users/USERNAME
2. Checks res.ok — throws new Error("User not found") if false
3. Returns an object: { login, name, bio, repos: public_repos }

Then call it twice in parallel using Promise.all:
  - 'Adityag025' (your profile)
  - 'torvalds' (Linus Torvalds)

Log both results. Wrap everything in try/catch.

Note: This makes a real network request to GitHub's public API.`,
      hint: 'Remember the two-await pattern: const res = await fetch(url), then const data = await res.json(). Check res.ok BETWEEN the two awaits.',
      starterCode: `const loadGitHubProfile = async (username) => {
  // your code here
};

const main = async () => {
  try {
    const [you, linus] = await Promise.all([
      loadGitHubProfile('Adityag025'),
      loadGitHubProfile('torvalds'),
    ]);
    console.log('Your profile:', you);
    console.log('Linus:', linus);
  } catch (err) {
    console.error('Failed:', err.message);
  }
};

main();
`,
      solution: `const loadGitHubProfile = async (username) => {
  const res = await fetch(\`https://api.github.com/users/\${username}\`);
  if (!res.ok) throw new Error(\`User not found: \${username}\`);
  const data = await res.json();
  return {
    login: data.login,
    name: data.name,
    bio: data.bio,
    repos: data.public_repos,
  };
};

const main = async () => {
  try {
    const [you, linus] = await Promise.all([
      loadGitHubProfile('Adityag025'),
      loadGitHubProfile('torvalds'),
    ]);
    console.log('Your profile:', you);
    console.log('Linus:', linus);
  } catch (err) {
    console.error('Failed:', err.message);
  }
};

main();`,
    },
  },
]
