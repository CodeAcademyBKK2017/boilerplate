import {createAction} from 'redux-actions';

export const ADD_NOTE_REQUEST = 'ADD_NOTE_REQUEST';
export const ADD_NOTE = 'ADD_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const POPULATE_NOTE = 'POPULATE_NOTE';
export const SHOW_LOADER = 'SHOW_LOADER';
export const HIDE_LOADER = 'HIDE_LOADER';
export const FEACH_NOTE = 'FEACH_NOTE';
export const DELETE_DATA_REQUEST = 'DELETE_DATA_REQUEST';

export const addnoterequest = createAction(ADD_NOTE_REQUEST);
export const addnote = createAction(ADD_NOTE);
export const deletenote = createAction(DELETE_NOTE);
export const populatenote = createAction(POPULATE_NOTE);
export const showloader = createAction(SHOW_LOADER);
export const hideloader = createAction(HIDE_LOADER);
export const deletenoterequest = createAction(DELETE_DATA_REQUEST);
export const feachnote = createAction(FEACH_NOTE);