Template.hello.greeting = function () {
  return "Welcome to unbazaar.";
};

Template.thing.rendered = function () {
  $('form').jsonForm({
    schema: Things._schema,
    onSubmit: function(errors, values) {
      console.log(errors, values);
    }
  })
};