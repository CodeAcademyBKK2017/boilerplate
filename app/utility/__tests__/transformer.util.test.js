import React from 'react';
import transformerUtil from '../transformer.util';

describe('AboutApp', () => {
  const data = {
    content: 'Qawdasfdasrqweer',
    id: 4,
    title: '2'
  };
  it('Check Function setItemFromAsyncStorage', () => { // example to test class methods
    const newData = transformerUtil.deleteItem(data, 1);
    expect(newData).toEqual([]);
  });
});