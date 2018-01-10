import {createAction} from 'redux-actions';

export const ADDNOTE = 'ADD_NOTE';
export const DELETENOTE = 'DELETE_NOTE';
export const POPULATENOTE = 'POPULATE_NOTE';

export const addnote = createAction(ADDNOTE);
export const deletenote = createAction(DELETENOTE);
export const populatenote = createAction(POPULATENOTE);