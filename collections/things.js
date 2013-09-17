Things = new Meteor.SchemaCollection('things', {
  schema: {
    type: 'object',
    properties: {
      title: {
        title: 'title',
        description: "thing's name",
        type: 'string'
      },
      description: {
        title: 'description',
        description: "thing's description",
        type: 'string'
      },
      public: {
        title: 'public?',
        description: "is the thing public?",
        type: 'boolean'
      }
    }
  }
});

if (Meteor.isServer) {
  Meteor.publish('things', function () {
    var self = this;
    return Things.find({
      $or: [
        { public: true },
        { author: self.userId }
      ]
    });
  });
}

Meteor.methods({
  thingNew: function () {
    var self = this;
    if (self.userId) {
      return Things.insert({
        title: "untitled thing",
        description: "it remains a mystery",
        author: self.userId,
        public: false
      });
    }
  }
});