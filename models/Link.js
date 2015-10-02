var mongoose = require('mongoose'),
 	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;
// { type: ObjectId, ref: 'Category', default: 12345 ,required: true},
// { type: ObjectId, ref: 'User', required: true},
var linkSchema = new Schema({
  title: { type: String, unique: true, required: true},
  url: { type: String, unique: true, lowercase: true, required: true },
  description: String,
  _creator: ObjectId,
  _category: ObjectId,
  tags: [ String ],
  addedOn: { type: Date, default: Date.Now}
});

module.exports = mongoose.model('Link', linkSchema);
