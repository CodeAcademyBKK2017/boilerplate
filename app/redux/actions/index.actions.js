import {createAction} from 'redux-actions';

export const FETCH_NOTE = 'FETCH_NOTE';
export const ADD_NOTE = 'ADD_NOTE';
export const ADD_NOTE_REQUEST = 'ADD_NOTE_REQUEST';
export const DELETE_NOTE = 'DELETE_NOTE';
export const DELETE_NOTE_REQUEST = 'DELETE_NOTE_REQUEST';
export const POPULATE_NOTE = 'POPULATE_NOTE';
export const SHOW_LOADER = 'SHOW_LOADER';
export const HIDE_LOADER = 'HIDE_LOADER';
export const ABOUT_APP = 'AboutApp';

export const fetchNote = createAction(FETCH_NOTE);
export const addNote = createAction(ADD_NOTE);
export const addNoteRequest = createAction(ADD_NOTE_REQUEST);
export const deleteNote = createAction(DELETE_NOTE);
export const deleteNoteRequest = createAction(DELETE_NOTE_REQUEST);
export const populateNote = createAction(POPULATE_NOTE);
export const showLoader = createAction(SHOW_LOADER);
export const hideLoader = createAction(HIDE_LOADER);
