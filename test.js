const makeMockCallbag = require("callbag-mock");
const { forEach, pipe, fromIter, map } = require("callbag-basics");
const { callbagRequest, op } = require("./index.js");
const request = require("request");
const test = require("tape");

// let history = [];
// const report = (name, dir, t, d) => {
//   return t !== 0 && history.push([name, dir, t, d]);
// };
// const source = makeMockCallbag("source", report);
// const sink = makeMockCallbag("sink", report);
//

test("fetches data in correct order", t => {
  const baseURL = "https://jsonplaceholder.typicode.com/users/";
  const history = [];
  pipe(
    fromIter([1, 2, 3]),
    map(x => `${baseURL}${x}`),
    callbagRequest(),
    forEach(x => {
      // console.log(x);
      history.push(JSON.parse(x.toString()));
    })
  );

  setTimeout(() => {
    history.forEach((item, index) => {
      t.equal(index + 1, item.id);
    });
    t.end();
  }, 1500);
});

test("does not push operate on error data", t => {
  const baseURL = "https://jsonplaceholder.typicod.com/users/";
  const history = [];
  pipe(
    fromIter([1, 2, 3]),
    map(x => `${baseURL}${x}`),
    callbagRequest(),
    forEach(x => {
      // console.log(x);
      history.push(JSON.parse(x.toString()));
    })
  );

  setTimeout(() => {
    t.equal(history.length, 0);
    t.end();
  }, 1500);
});
