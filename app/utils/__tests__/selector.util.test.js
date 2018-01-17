import getSelector from '../selector.util';

it('Should be return data by key', () => {  
  const expected = getSelector('some')({some: 'thing'});
  expect(expected).toBe('thing');
});