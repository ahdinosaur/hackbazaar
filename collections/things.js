Things = new Meteor.SchemaCollection("things", {
  schema: {
    type: 'object',
    properties: {
      title: {
        title: 'title',
        description: 'name of thing',
        type: 'string'
      },
      description: {
        title: 'description',
        description: 'description of thing',
        type: 'string'
      }
    }
  }
});