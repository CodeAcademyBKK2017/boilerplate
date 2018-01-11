import Router from '../../routes/index';

export default (state, action) => (
  Router.router.getStateForAction(action, state) || state
);