import {createAction} from 'redux-actions';

export const ADD_NOTE = 'ADD_NOTE';

export const DELETE_NOTE = 'DELETE_NOTE';

export const POPULATE_NOTES = 'POPULATE_NOTES';

export const addNote = createAction(ADD_NOTE);
export const deleteNote = createAction(DELETE_NOTE);
export const getNotes = createAction(POPULATE_NOTES);

export const SHOW_LOADER = 'SHOW_LOADER';
export const showLoader = createAction(SHOW_LOADER);

export const HIDE_LOADER = 'HIDE_LOADER';
export const hideLoader = createAction(HIDE_LOADER);

export const ADD_NOTE_REQUEST = 'ADD_NOTE_REQUEST';
export const addNoteRequest = createAction(ADD_NOTE_REQUEST);
export const REMOVE_NOTE_REQUEST = 'REMOVE_NOTE_REQUEST';
export const removeNoteRequest = createAction(REMOVE_NOTE_REQUEST);