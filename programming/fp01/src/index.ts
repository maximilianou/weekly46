console.log(`Functional Programming Samples!`);
// https://mostly-adequate.gitbook.io/mostly-adequate-guide/ch01

const conjoin = (flockX:number, flockY:number):number => flockX + flockY;
const breed = (flockX:number, flockY:number):number => flockX * flockY ;


//const flockA = 4;
//const flockB = 2;
//const flockC = 0;
const [flockA, flockB, flockC] = [4, 2, 0];
const result = conjoin( breed(flockB, conjoin(flockA, flockC)), breed(flockA, flockB));
console.log(` result:${result} `);

const add = (flockX:number, flockY:number):number => flockX + flockY;
const multiply = (flockX:number, flockY:number):number => flockX * flockY ;

const result2 = add(multiply(flockB, add(flockA, flockC)), multiply(flockA, flockB));
console.log(`add(multiply(${flockB}, add(${flockA}, ${flockC})), multiply(${flockA}, ${flockB})) :: result2::${result2} `);
//const x = 3;
//const y = 5;
//const z = 7;
const [x, y, z] = [3, 5, 7];
console.log(
  `[associative]:: add(add(x,y),z) === add(x, add(y,z)) :: ${add(add(x,y),z) === add(x, add(y,z))}`);

console.log(`[commutative]:: add(x,y) === add(y,x) :: ${add(x,y) === add(y,x)}`);

console.log(`[identiry]:: add(x,0) === x :: ${add(x,0)===x}`);

console.log(`[distributive]:: multiply(x, add(y,z)) === add(multiply(x, y), multiply(x, z)) :: ${multiply(x, add(y,z)) === add(multiply(x, y), multiply(x, z))}`);


// Second generic function
const validArticles = (articles:[]) => articles.filter(article => article !== null && article !== undefined )

const compact = (xs:[]) => xs.filter(x => x !== null && x !== undefined );

// Third Pure Function - Inmutable

// impure
let minimum = 18; // system state, so function depends on external state
const checkAgeImpure = (age:number) => age >= minimum;

// pure
const checkAge = (age:number) => {
  const minimum = 18;
  return age >= minimum;
}

// pure function - memoization
//const memoize = (f:Function) => {
//  const cache = {};
//  return (...args:any[]) => {
//    const argStr = JSON.stringify(args);
//    cache[argStr] = cache[argStr] || f(...args);
//    return cache[argStr];
//  };
//};


//// impure
//const signUp = (attrs) => {
//  const user = saveUser(attrs);
//  welcomeUser(user);
//};
//
//// pure
//const signUp = (Db, Email, attrs) => () => {
//  const user = saveUser(Db, attrs);
//  welcomeUser(Email, user);
//};

////////////////////////////////////////
//// curry :: ((a, b, ...) -> c) -> a -> b -> ... -> c
//function curry(fn) {
//  const arity = fn.length;
//  return function $curry(...args) {
//    if (args.length < arity) {
//      return $curry.bind(null, ...args);
//    }
//    return fn.call(null, ...args);
//  };
//}
//// always :: a -> b -> a
//const always = curry((a, b) => a);
//// compose :: ((y -> z), (x -> y),  ..., (a -> b)) -> a -> z
//const compose = (...fns) => (...args) => fns.reduceRight((res, fn) => [fn.call(null, ...res)], args)[0];
//// either :: (a -> c) -> (b -> c) -> Either a b -> c
//const either = curry((f, g, e) => {
//  if (e.isLeft) {
//    return f(e.$value);
//  }
//  return g(e.$value);
//});
//// identity :: x -> x
//const identity = x => x;
//// inspect :: a -> String
//const inspect = (x) => {
//  if (x && typeof x.inspect === 'function') {
//    return x.inspect();
//  }
//  function inspectFn(f) {
//    return f.name ? f.name : f.toString();
//  }
//  function inspectTerm(t) {
//    switch (typeof t) {
//      case 'string':
//        return `'${t}'`;
//      case 'object': {
//        const ts = Object.keys(t).map(k => [k, inspect(t[k])]);
//        return `{${ts.map(kv => kv.join(': ')).join(', ')}}`;
//      }
//      default:
//        return String(t);
//    }
//  }
//  function inspectArgs(args) {
//    return Array.isArray(args) ? `[${args.map(inspect).join(', ')}]` : inspectTerm(args);
//  }
//  return (typeof x === 'function') ? inspectFn(x) : inspectArgs(x);
//};
//// left :: a -> Either a b
//const left = a => new Left(a);
//// liftA2 :: (Applicative f) => (a1 -> a2 -> b) -> f a1 -> f a2 -> f b
//const liftA2 = curry((fn, a1, a2) => a1.map(fn).ap(a2));
//// liftA3 :: (Applicative f) => (a1 -> a2 -> a3 -> b) -> f a1 -> f a2 -> f a3 -> f b
//const liftA3 = curry((fn, a1, a2, a3) => a1.map(fn).ap(a2).ap(a3));
//// maybe :: b -> (a -> b) -> Maybe a -> b
//const maybe = curry((v, f, m) => {
//  if (m.isNothing) {
//    return v;
//  }
//  return f(m.$value);
//});
//// nothing :: Maybe a
//const nothing = Maybe.of(null);
//// reject :: a -> Task a b
//const reject = a => Task.rejected(a);
////////////////////////////////////////

//const match = curry((what, s) => s.match(what));
//const replace = curry((what, replacement, s) => s.replace(what, replacement));
//const filter = curry((f, xs) => xs.filter(f));
//const map = curry((f, xs) => xs.map(f));

/////////////////////////////////////////////////////
// fp-ts
// Example: Array.prototype.findIndex
import { Option, none, some } from 'fp-ts/Option'
function findIndex<A>(
  as: Array<A>,
  predicate: (a: A) => boolean
): Option<number> {
  const index = as.findIndex(predicate)
  return index === -1 ? none : some(index)
}

// fp-ts
// Example: Array.prototype.find
//import { Option, fromNullable } from 'fp-ts/Option'
import { fromNullable } from 'fp-ts/Option'
function find<A>(as: Array<A>, predicate: (a: A) => boolean): Option<A> {
  return fromNullable(as.find(predicate))
}

// fp-ts
// Example: JSON.parse
import { Either, tryCatch } from 'fp-ts/Either'
function parse(s: string): Either<Error, unknown> {
  return tryCatch(
    () => JSON.parse(s),
    (reason) => new Error(String(reason))
  )
}

// fp-ts
// Example: Math.random
import { IO } from 'fp-ts/IO'
const random: IO<number> = () => Math.random()

// fp-ts
// Example: localStorage.getItem
//import { Option, fromNullable } from 'fp-ts/Option'
//import { IO } from 'fp-ts/IO'
function getItem(key: string): IO<Option<string>> {
  return () => fromNullable(localStorage.getItem(key))
}

//// fp-ts
//// Example: readFileSync
//import * as fs from 'fs'
////import { IOEither, tryCatch } from 'fp-ts/IOEither'
//import { IOEither } from 'fp-ts/IOEither'
//function readFileSync(path: string): IOEither<Error, string> {
//  return tryCatch(
//    () => fs.readFileSync(path, 'utf8'),
//    (reason) => new Error(String(reason))
//  )
//}

// fp-ts
// Example: reading from standard input
import { createInterface } from 'readline'
import { Task } from 'fp-ts/Task'
const read: Task<string> = () =>
  new Promise<string>((resolve) => {
    const rl = createInterface({
      input: process.stdin,
      output: process.stdout
    })
    rl.question('', (answer) => {
      rl.close()
      resolve(answer)
    })
  })

// fp-ts
// Example: fetch
//import { TaskEither, tryCatch } from 'fp-ts/TaskEither'
//import { TaskEither } from 'fp-ts/TaskEither'
//function get(url: string): TaskEither<Error, string> {
//  return tryCatch(
//    () => fetch(url).then((res) => res.text()),
//    (reason) => new Error(String(reason))
//  )
//}

// fp-ts
interface Eq<A> {
  /** returns `true` if `x` is equal to `y` */
  readonly equals: (x: A, y: A) => boolean
}
const eqNumber: Eq<number> = {
  equals: (x, y) => x === y
}

function elem<A>(E: Eq<A>): (a: A, as: Array<A>) => boolean {
  return (a, as) => as.some(item => E.equals(item, a))
}
elem(eqNumber)(1, [1, 2, 3]) // true
elem(eqNumber)(4, [1, 2, 3]) // false

type Point = {
  x: number
  y: number
}
const eqPoint: Eq<Point> = {
  equals: (p1, p2) => p1.x === p2.x && p1.y === p2.y
}

//import { getStructEq } from 'fp-ts/lib/Eq' // comginator
//const eqPoint: Eq<Point> = getStructEq({
//  x: eqNumber,
//  y: eqNumber
//})

//type Vector = {
//  from: Point
//  to: Point
//}
//const eqVector: Eq<Vector> = getStructEq({
//  from: eqPoint,
//  to: eqPoint
//})

import { getEq } from 'fp-ts/lib/Array'
const eqArrayOfPoints: Eq<Array<Point>> = getEq(eqPoint)


import { contramap } from 'fp-ts/lib/Eq'
type User = {
  userId: number
  name: string
}
/** two users are equal if their `userId` field is equal */
const eqUser = contramap((user: User) => user.userId)(eqNumber)
eqUser.equals({ userId: 1, name: 'Giulio' }, { userId: 1, name: 'Giulio Canti' }) // true
eqUser.equals({ userId: 1, name: 'Giulio' }, { userId: 2, name: 'Giulio' }) // false

// fp-ts
// Ord
//import { Eq } from 'fp-ts/lib/Eq'
type Ordering = -1 | 0 | 1
interface Ord<A> extends Eq<A> {
  readonly compare: (x: A, y: A) => Ordering
}

const ordNumber: Ord<number> = {
  equals: (x, y) => x === y,
  compare: (x, y) => (x < y ? -1 : x > y ? 1 : 0)
}

//equals: (x, y) => compare(x, y) === 0

import { fromCompare } from 'fp-ts/lib/Ord'
const ordNumber2: Ord<number> = fromCompare((x, y) => (x < y ? -1 : x > y ? 1 : 0))

function min<A>(O: Ord<A>): (x: A, y: A) => A {
  return (x, y) => (O.compare(x, y) === 1 ? y : x)
}
min(ordNumber)(2, 1) // 1

type User2 = {
  name: string
  age: number
}
const byAge: Ord<User2> = fromCompare((x, y) => ordNumber.compare(x.age, y.age))

//import { contramap } from 'fp-ts/lib/Ord'
//const byAge2: Ord<User2> = contramap((user: User2) => user.age)(ordNumber)

const getYounger = min(byAge)
getYounger({ name: 'Guido', age: 48 }, { name: 'Giulio', age: 45 }) // { name: 'Giulio', age: 45 }

//import { getDualOrd } from 'fp-ts/lib/Ord'
//function max<A>(O: Ord<A>): (x: A, y: A) => A {
//  return min(getDualOrd(O))
//}
//const getOlder = max(byAge)
//sgetOlder({ name: 'Guido', age: 48 }, { name: 'Giulio', age: 45 }) // { name: 'Guido', age: 48 }

// semigroup
interface Semigroup<A> {
  concat: (x: A, y: A) => A
}

/** number `Semigroup` under multiplication */
const semigroupProduct: Semigroup<number> = {
  concat: (x, y) => x * y
}

/** number `Semigroup` under addition */
const semigroupSum: Semigroup<number> = {
  concat: (x, y) => x + y
}

const semigroupString: Semigroup<string> = {
  concat: (x, y) => x + y
}

/** Always return the first argument */
function getFirstSemigroup<A = never>(): Semigroup<A> {
  return { concat: (x, y) => x }
}

/** Always return the second argument */
function getLastSemigroup<A = never>(): Semigroup<A> {
  return { concat: (x, y) => y }
}

function getTheFirstSemigroup<A=never>(): Semigroup<A>{
  return {concat: (x,y) => x }
}

function getArraySemigroup<A = never>(): Semigroup<Array<A>> {
  return { concat: (x, y) => x.concat(y) }
}
function of<A>(a: A): Array<A> {
  return [a]
}


//import { ordNumber } from 'fp-ts/lib/Ord'
//import { getMeetSemigroup, getJoinSemigroup } from 'fp-ts/lib/Semigroup'
///** Takes the minimum of two values */
//const semigroupMin: Semigroup<number> = getMeetSemigroup(ordNumber)
///** Takes the maximum of two values  */
//const semigroupMax: Semigroup<number> = getJoinSemigroup(ordNumber)
//semigroupMin.concat(2, 1) // 1
//semigroupMax.concat(2, 1) // 2


const semigroupPoint: Semigroup<Point> = {
  concat: (p1, p2) => ({
    x: semigroupSum.concat(p1.x, p2.x),
    y: semigroupSum.concat(p1.y, p2.y)
  })
}


//import { getStructSemigroup } from 'fp-ts/lib/Semigroup'
//const semigroupPoint: Semigroup<Point> = getStructSemigroup({
//  x: semigroupSum,
//  y: semigroupSum
//})


//type Vector = {
//  from: Point
//  to: Point
//}
//const semigroupVector: Semigroup<Vector> = getStructSemigroup({
//  from: semigroupPoint,
//  to: semigroupPoint
//})





/////////////////////////////////////////////////////
