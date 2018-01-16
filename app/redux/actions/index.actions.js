import {createAction} from 'redux-actions';

export const ADD_NOTE_REQUEST = 'ADD_NOTE_REQUEST';
export const ADD_NOTE = 'ADD_NOTE';
export const DELETE_NOTE_REQUEST = 'DELETE_NOTE_REQUEST';
export const DELETE_NOTE = 'DELETE_NOTE';
export const POPULATE_NOTES = 'POPULATE_NOTES';
export const FETCH_NOTES = 'FETCH_NOTES';

export const HIDE_LOADER = 'HIDE_LOADER';
export const SHOW_LOADER = 'SHOW_LOADER';

export const addNoteRequest = createAction(ADD_NOTE_REQUEST);
export const addNote = createAction(ADD_NOTE);
export const deleteNoteRequest = createAction(DELETE_NOTE_REQUEST);
export const deleteNote = createAction(DELETE_NOTE);
export const populateNotes = createAction(POPULATE_NOTES);
export const fetchNotes = createAction(FETCH_NOTES);
export const showLoader = createAction(SHOW_LOADER);
export const hideLoader = createAction(HIDE_LOADER);

