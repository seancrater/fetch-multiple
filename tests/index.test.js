import fetchAll from '../dist';

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

const mockFetch = fetchAll(mockUrls);

it('works as a promise', () => {
  expect(mockFetch.resolves);
});

it('returns the correct values', () => {
  expect(mockFetch.then(data => {
    console.log(data);
  }));
});