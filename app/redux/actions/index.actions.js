import {createAction} from 'redux-actions';

// notes

export const ADD_NOTE = 'ADD_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const POPULATE_NOTES = 'POPULATE_NOTES';

export const FETCH_NOTES = 'FETCH_NOTES';
export const SAVE_NOTE = 'SAVE_NOTE';

export const addNote = createAction(ADD_NOTE);
export const deleteNote = createAction(DELETE_NOTE);
export const populateNotes = createAction(POPULATE_NOTES);

export const fetchNotes = createAction(FETCH_NOTES);
export const saveNote = createAction(SAVE_NOTE);

// loader

export const SHOW_LOADER = 'SHOW_LOADER';
export const HIDE_LOADER = 'HIDE_LOADER';

export const showLoader = createAction(SHOW_LOADER);
export const hideLoader = createAction(HIDE_LOADER);
