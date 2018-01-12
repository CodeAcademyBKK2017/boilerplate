import {createAction} from 'redux-actions';

export const ADD_NOTE = 'ADD_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const POPULATE_NOTE = 'POPULATE_NOTE';
export const SHOW_LOADER = 'SHOW_LOADER';
export const HIDE_LOADER = 'HIDE_LOADER';

export const addnote = createAction(ADD_NOTE);
export const deletenote = createAction(DELETE_NOTE);
export const populatenote = createAction(POPULATE_NOTE);
export const showloader = createAction(SHOW_LOADER);
export const hideloader = createAction(SHOW_LOADER);