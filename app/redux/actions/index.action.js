import {createAction} from 'redux-actions';

export const FETCH_NOTE = 'FETCH_NOTE';
export const POPULATE_NOTES = 'POPULATE_NOTES';
export const ADD_NOTES = 'ADD_NOTES';
export const ADD_NOTE_REQUEST = 'ADD_NOTE_REQUEST';
export const DELETE_NOTES = 'DELETE_NOTES';
export const DELETE_NOTE_REQUEST = 'DELETE_NOTE_REQUEST';
export const SHOW_LOADER = 'SHOW_LOADER';
export const HIDE_LOADER = 'HIDE_LOADER';

export const fetchNote = createAction(FETCH_NOTE);
export const addNotes = createAction(ADD_NOTES);
export const addNotesRequest = createAction(ADD_NOTE_REQUEST);
export const deleteNotes = createAction(DELETE_NOTES);
export const deleteNotesRequest = createAction(DELETE_NOTE_REQUEST);
export const populateNotes = createAction(POPULATE_NOTES);
export const showLoader = createAction(SHOW_LOADER);
export const hideLoader = createAction(HIDE_LOADER);