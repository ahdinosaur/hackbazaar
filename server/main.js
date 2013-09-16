Meteor.startup(function () {
  // code to run on server at startup
  Things.remove({});
  Things.insert({
    title: "chair",
    description: "my favorite chair"
  });
});