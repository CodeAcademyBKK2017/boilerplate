const Api = {
  endpoint: 'http://localhost:3000/notes/',
  //   endpoint: 'https://json-server-example-coeershfcg.now.sh/notes/',
  getNotes: async () => {
    const notes = await fetch(Api.endpoint).then((resp) => resp.json());
    return notes;
  },
  addNote: async (noteObj) => {
    const reqObj = {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(noteObj)
    };
    const note = await fetch(Api.endpoint, reqObj).then((resp) => resp.json());
    return note;
  },
  deleteNote: async (id) => {
    const reqObj = {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    };
    await fetch(Api.endpoint + id, reqObj);
  }
};

export default Api;