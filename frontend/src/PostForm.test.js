import PostForm from './Components/Post/PostForm';

// function prepareData(data) {
//   const tags = data.split(' ');
//   return tags.map(tag => {
//     return {'name': tag};
//   });
// }

test('outputs an array with dictionaries in it', () => {
  const data = '#hiking #running';
  expect(PostForm.prepareData(data)).toEqual([{'name': '#hiking'}, {'name': '#running'}]);
});
