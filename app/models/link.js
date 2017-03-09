var db = require('../config');
var crypto = require('crypto');

var Schema = db.Schema;

var urlSchema = new Schema({
  url: String,
  baseUrl:   String,
  code: String,
  title: String,
  visits: {
    type: Number,
    default: 0
  }
});

// var usersSchema = new Schema({
//   username: String,
//   password:   String
// });

urlSchema.pre = ('save', function(next) {
  var shasum = crypto.createHash('sha1');
  shasum.update(model.get('url'));
  model.set('code', shasum.digest('hex').slice(0, 5));
  next();
});

var Link = db.model('Link', urlSchema);

// var Link = db.urls

// var Link = db.Model.extend({
//   tableName: 'urls',
//   hasTimestamps: true,
//   defaults: {
//     visits: 0
//   },
//   initialize: function() {
//     this.on('creating', function(model, attrs, options) {
//       var shasum = crypto.createHash('sha1');
//       shasum.update(model.get('url'));
//       model.set('code', shasum.digest('hex').slice(0, 5));
//     });
//   }
// });

module.exports = Link;
