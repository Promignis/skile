var mongoose = require('mongoose'),
 	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var pathSchema = new Schema({
  title: { type: String, unique: true, required: true},
  description: String,
  path:{ type: String, required: true},
  _creator: { type: ObjectId, required: true},
  _categoryId: ObjectId,
  _category: String,
  tags: [ String ],
  addedOn: { type: Date, default: Date.Now}
});

pathSchema.index({ title : 3, path : 2,description : 2, tags:2});

module.exports = mongoose.model('Path', pathSchema);
