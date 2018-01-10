export default {
  getItem: jest.fn(() => Promise.resolve([])),

  setItem: jest.fn()
};
