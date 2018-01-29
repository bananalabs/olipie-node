const addRelationship = require('./addRelationship');

module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [
      async function(context) {
        // Return user if one exists for given email
        console.log('context.data');
        console.log(context.data);
        console.log('context.result');
        console.log(context.result);
        const users = await context.app.service('user').find({
          query: {
            email: context.data.email
          }
        });
        const user = users.data[0];
        console.log('user');
        console.log(user);
        if (user) {
          context.result = user;
        } else {
          context.params = {
            new: true
          };
        }
        return context;
      }
    ],
    update: [
      async function(context) {
        context.id = context.data.id;
        return context;
      }
    ],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [
      function(context) {
        if (context.params.new) {
          context.result['new'] = true;
        }
        return context;
      }
    ],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
