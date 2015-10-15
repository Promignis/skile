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
categorySchema.index({ title : 2, description : 1});

module.exports = mongoose.model('Category', categorySchema);
