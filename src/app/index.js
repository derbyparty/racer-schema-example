var derby = require('derby');
var app = module.exports = derby.createApp('auth', __filename);

global.app = app;

app.loadViews (__dirname+'/../../views');
app.loadStyles(__dirname+'/../../styles');

app.get('/', function getPage(page, model){
  var $productQuery = model.query('products', {});

  model.subscribe($productQuery, function() {
    $productQuery.ref('_page.products');
    page.render();
  });
});

app.proto.clear = function() {
  var model = this.model;
  model.set('_page.product', {});
  model.del('_page.errors');
}

app.proto.save = function() {
  var model = this.model;
  var product = model.get('_page.product');
  model.add('products', product, function(err) {
    model.del('_page.errors');
    if (err) {
      // Validation error
      if (err.errors) {
        for (var i = 0; i < err.errors.length; i++) {
          var error = err.errors[i];
          model.set('_page.errors.' + error.paths.join('.'), error.message);
        }
      // Other error
      } else {
        alert(err.message);
      }
    } else {
      model.set('_page.product', {});
    }
  });
}

app.on('model', function(model) {
  model.fn('all', function() {
    return true;
  });
  model.set('_page.product', {});
});