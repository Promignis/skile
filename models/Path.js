var mongoose = require('mongoose'),
 	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var pathSchema = new Schema({
  title: { type: String, unique: true, required: true},
  url: { type: [ String ], lowercase: true, required: true },
  description: String,
  _creator: ObjectId,
  _categoryId: ObjectId,
  _category: String,
  tags: [ String ],
  addedOn: { type: Date, default: Date.Now}
});

module.exports = mongoose.model('Path', pathSchema);
