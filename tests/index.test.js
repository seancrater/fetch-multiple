import fetchMultiple from '../dist';

const mockUrls = {
  '/data.json': 'json',
  '/text.txt': 'text',
  '/undefined.text': 'text'
};

fetch.mockResponses(
  [ JSON.stringify([ { data: true } ]), { status: 200 } ],
  [ 'Some example text', { status: 200 } ],
  [ new Error('404 Not Found'), { status: 404 } ]
);

const resolvingFetch = fetchMultiple(mockUrls);

fetch.mockReject('404 Not Found');
const failingFetch = fetchMultiple({ '/undefined.text': 'text' });

it('works as a promise', () => {
  expect(resolvingFetch.resolves);
});

it('returns the correct values for functional endpoints', () => {
  expect(resolvingFetch.then(data => {
    return data === {
      '/data.json': { data: true },
      'text.txt': 'Some example text'
    }
  }));
});

it('returns an error for failing endpoints', () => {
  expect(failingFetch.then(data => {
    return data === {
      '/undefined.text': '404 Not Found'
    }
  }));
});