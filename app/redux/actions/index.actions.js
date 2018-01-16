import {createAction} from 'redux-actions';

// notes

export const ADD_NOTE = 'ADD_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const POPULATE_NOTES = 'POPULATE_NOTES';

export const addNote = createAction(ADD_NOTE);
export const deleteNote = createAction(DELETE_NOTE);
export const populateNotes = createAction(POPULATE_NOTES);

// loader

export const SHOW_LOADER = 'SHOW_LOADER';
export const HIDE_LOADER = 'HIDE_LOADER';
export const FETCH_NOTES = 'FETCH_NOTES';
export const ADD_NOTE_REQUEST = 'ADD_NOTE_REQUEST';
export const DELETE_NOTE_SAGA = 'DELETE_NOTE_SAGA';

export const showLoader = createAction(SHOW_LOADER);
export const hideLoader = createAction(HIDE_LOADER);
export const fetchNotes = createAction(FETCH_NOTES);
export const addNotes = createAction(ADD_NOTE_REQUEST);
export const deleteNotes = createAction(DELETE_NOTE_SAGA);