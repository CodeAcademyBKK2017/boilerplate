import {createAction} from 'redux-actions';

export const POPULATE_NOTES = 'POPULATE_NOTES';
export const ADD_NOTES = 'ADD_NOTES';
export const DELETE_NOTES = 'DELETE_NOTES';

export const addNotes = createAction(ADD_NOTES);
export const deleteNotes = createAction(DELETE_NOTES);
export const populateNotes = createAction(POPULATE_NOTES);