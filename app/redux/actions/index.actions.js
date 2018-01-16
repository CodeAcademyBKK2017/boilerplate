import {createAction} from 'redux-actions';

export const FETCH_NOTES = 'FETCH_NOTES';
export const fetchNotes = createAction(FETCH_NOTES);

export const POPULATE_NOTES = 'POPULATE_NOTES';
export const populateNotes = createAction(POPULATE_NOTES);

export const SHOW_LOADER = 'SHOW_LOADER';
export const showLoader = createAction(SHOW_LOADER);

export const HIDE_LOADER = 'HIDE_LOADER';
export const hideLoader = createAction(HIDE_LOADER);

export const ADD_NOTE_REQUEST = 'ADD_NOTE_REQUEST';
export const addNoteRequest = createAction(ADD_NOTE_REQUEST);
export const REMOVE_NOTE_REQUEST = 'REMOVE_NOTE_REQUEST';
export const removeNoteRequest = createAction(REMOVE_NOTE_REQUEST);