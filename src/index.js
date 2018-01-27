const applyMethod = (data, method) => {
  switch(method) {
    case 'arrayBuffer':
      return data.arrayBuffer();
      break;
    case 'blob':
      return data.blob();
      break;
    case 'formData':
      return data.formData();
      break;
    case 'json':
      return data.json();
      break;
    case 'text':
      return data.text();
      break;
    default:
      return data.text();
  }
};

export default function(urls) {
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
        applyMethod(response, urls[keys[index]])
          .then(value => {
            output[keys[index]] = value;
          });
      }
    }))
    .then(() => {
      return output;
    });
}