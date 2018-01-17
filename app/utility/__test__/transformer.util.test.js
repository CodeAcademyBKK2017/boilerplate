import React from 'react';
import transformerUtil from '../transformer.util';

describe('deleteItem', () => {
  const data = {
    content: 'content',
    title: 'title',
    id: 1
  };
  it('Check deleteItem', () => {
    const newData = transformerUtil.deleteItem(data, 1);
    expect(newData).toEqual([]);
  });
});