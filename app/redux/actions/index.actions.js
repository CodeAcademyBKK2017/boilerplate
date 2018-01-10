import {createAction} from 'redux-actions';

export const ADD_NOTE = 'ADD_NOTE';

export const DELETE_NOTE = 'DELETE_NOTE';

export const GET_NOTE = 'GET_NOTE';

export const addNote = createAction(ADD_NOTE);
export const deleteNote = createAction(DELETE_NOTE);
export const getNotes = createAction(GET_NOTE);