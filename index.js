const request = require("request");

const callbagRequest = url => source => {
  return function output(start, sink) {
    if (start !== 0) return;
    source(0, (t, d) => {
      if (t === 1) {
        const handler = data => sink(1, data);
        try {
          const r = request(d);
          r.on("data", handler);
          r.on("end", () => sink(2));
          r.on("error", error => sink(2, error));
        } catch (e) {
          sink(2, e);
        }
      } else sink(t, d);
    });
  };
};

module.exports = { callbagRequest };
