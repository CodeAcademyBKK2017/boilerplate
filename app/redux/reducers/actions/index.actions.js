import {createAction} from 'redux-actions';

export const ADD_NOTE = 'ADD_NOTE';
export const DELE_NOTE = 'DELE_NOTE';
export const LOAD_SERVER = 'LOAD_SERVER';

export const addNote = createAction(ADD_NOTE);
export const deleNote = createAction(DELE_NOTE);
export const loadServer = createAction(LOAD_SERVER);