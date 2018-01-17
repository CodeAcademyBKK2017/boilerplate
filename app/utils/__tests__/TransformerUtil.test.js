import React from 'react';
import TransformerUtil from '../TransformerUtil';

describe('TransformerUtil', () => {
  it('removeNote success', async () => {
    const notes = [{id: 1, title: 'sampleTitle', content: 'sampleContent'}];
    const id = 1;
    const result = TransformerUtil.removeNote(notes, id);
    expect(result).toEqual([]);
  });
});