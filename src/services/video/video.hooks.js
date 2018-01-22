const addRelationship = require('./addRelationship');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

module.exports = {
  before: {
    all: [],
    find: [
      async function(context) {
        const userId = context.params.query['user'];
        const uservideos = await context.app.service('uservideo').find({
          query: {
            userId: userId
          }
        });
        const videoIds= uservideos.data.map((uservideo) => uservideo.videoId);
        context.params.query = {
          id: {
            [Op.in]: videoIds
          }
        };
        return context;
      }
    ],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [
      async function(context) {
        // Add userId+videoId to uservideo
        const userId = context.data.userId;
        const videoId = context.result.id;
        await context.app.service('uservideo').create({
            userId: userId,
            videoId: videoId
        });
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
