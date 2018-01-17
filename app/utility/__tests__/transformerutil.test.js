import transformerUtil from '../transformerutil';

describe('transformerUtil', () => {
  
  beforeEach(() => {
    
  });
  it('deleteNote filter:', () => {
    const notes = [{
      id: '1',
      title: 't1',
      content: 'c1'
    }, {
      id: '2',
      title: 't2',
      content: 'c2'
    }];
    const result = transformerUtil.deleteNote(notes, '1');
    expect(result).toEqual([{
      id: '2',
      title: 't2',
      content: 'c2'
    }]);
  });
});