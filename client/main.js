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
    waitOn: Meteor.subscribe("things"),
    template: 'thingUpdate'
  });
})

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
