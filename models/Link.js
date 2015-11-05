var mongoose = require('mongoose'),
 	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var linkSchema = new Schema({
  title: { type: String, unique: true, required: true },
  url: { type: String, unique: true, lowercase: true, required: true },
  description: String,
  type: String,
  _creator: { type: ObjectId, required: true}
  _categoryId: ObjectId,
  _category: String,
  tags: { type: [ String ], index : true },
  addedOn: { type: Date, default: Date.Now }
});

linkSchema.index({ title : 3, description : 2, tags:2});

module.exports = mongoose.model('Link', linkSchema);
