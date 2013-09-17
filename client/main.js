Router.configure({
  layout: 'layout',
  notFoundTemplate: 'notFound',
  loadingTemplate: 'loading',
  renderTemplates: {
    'navbar': { to: 'navbar' }
  }
});

Router.map(function () {
  this.route('home', { path: '/' });
  this.route('things', {
    data: function () { return Things.find({}); },
    waitOn: Meteor.subscribe("things")
  });
  this.route('thing', {
    path: '/things/:id',
    data: function () { return Things.findOne({ _id: this.params.id }); },
    waitOn: Meteor.subscribe("things")
  });
})

Template.thing.rendered = function () {
  var self = this,
      schema = Things._schema;

  var defaultSchema = function (data, schema) {
    console.log(data, schema);
    for (var key in data) {
      if (schema && schema.properties &&
          schema.properties[key] &&
          schema.properties[key].type === "object") {
        schema.properties[key] = 
          defaultSchema(data[key], schema.properties[key])
      } else if (schema && schema.properties &&
         schema.properties[key]) {
        schema.properties[key].default = data[key];
      }
    }
  };
  schema = defaultSchema(self.data, schema);

  $('#thing_' + self.data._id).jsonForm({
    schema: Things._schema,
    onSubmit: function(errors, values) {
      if (!errors || errors.length === 0) {
        Things.update(self.data._id, {
          $set: values
        });
      } else {
        console.error(errors);
      }
    }
  })
};

Template.things.fetch = function () {
  console.log(this);
  return this.fetch();
};

Template.thingNewBtn.events = {
  'click .btn': function (event, tmpl) {
    Meteor.call('thingNew', function (err, newId) {
      if(err) {
        console.error(err);
      } else {
        console.log(newId);
        newId && Router.go('/things/' + newId);
      }
    });
  }
}
