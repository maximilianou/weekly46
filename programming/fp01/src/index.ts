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


// Second
const alidArticles = (articles:[]) => articles.filter(article => article !== null && article !== undefined )

const compact = (xs:[]) => xs.filter(x => x !== null && x !== undefined );


