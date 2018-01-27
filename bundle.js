'use strict';

function index(urls) {
  const keys = Object.keys(urls);
  const output = {};
  let promises = [];

  for (let url in urls) {
    promises.push(fetch(url).catch(error => {
      output[url] = error;
      return undefined;
    }));
  }

  return Promise.all(promises)
    .then(values => values.forEach((response, index) => {
      if (response) {
        response.text().then(value => {
          output[keys[index]] = value;
        });
      }
    }))
    .then(() => {
      return output;
    });
}

module.exports = index;
