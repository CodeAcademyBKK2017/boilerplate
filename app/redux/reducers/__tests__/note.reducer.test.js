import note from '../note.reducer';
import Tranformerutil from '../../../utils/tranformerutil';

describe('loader', () => {
  let action, resule;
  let perviousState = [];
  const notes =
  {
    titel: 'title',
    content: 'content',
    id: 1
  };

  it('ADD_NOTE', () => {
    action = {
      type: 'ADD_NOTE',
      payload: notes
    };
    resule = note(perviousState, action);
    expect(resule).toEqual(...perviousState, [action.payload]);
  });

  it('DELE_NOTE', () => {
    action = {
      type: 'DELE_NOTE',
      payload: notes
    };
    resule = note(perviousState, action);
    const fromUtil = Tranformerutil.removeNote(perviousState, action.payload.id);
    expect(resule).toEqual(fromUtil);
  });

  it('LOAD_SERVER', () => {
    action = {
      type: 'LOAD_SERVER',
      payload: notes
    };
    resule = note(perviousState, action);
    expect(resule).toEqual(notes);
  });

  it('default', () => {
    perviousState = undefined;
    action = {
      type: 'default',
      payload: note
    };
    resule = note(perviousState, action);
    expect(resule).toEqual([]);
  });
});