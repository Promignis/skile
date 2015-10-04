var mongoose = require('mongoose'),
 	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var categorySchema = new Schema({
  title: { type: String, unique: true},
  description: String,
  _parentId: ObjectId,
  _parentCatTitle: String,
  addedOn: Date
});

module.exports = mongoose.model('Category', categorySchema);
