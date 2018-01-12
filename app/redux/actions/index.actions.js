import {createAction} from 'redux-actions';

export const ADD_NOTE = 'ADD_NOTE';

export const DELETE_NOTE = 'DELETE_NOTE';

export const GET_NOTE = 'GET_NOTE';

export const addNote = createAction(ADD_NOTE);
export const deleteNote = createAction(DELETE_NOTE);
export const getNotes = createAction(GET_NOTE);

export const SHOW_LOADER = 'SHOW_LOADER';
export const showLoader = createAction(SHOW_LOADER);

export const HIDE_LOADER = 'HIDE_LOADER';
export const hideLoader = createAction(HIDE_LOADER);