const moongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const id = require("uuid/v4")
const Schema = moongoose.Schema;

const TodoSchema = new Schema({
  title: {
    type: String,
    required: [true, "title is necessary"]
  },
  complete: {
    type: Boolean,
    default: false,
    require: true
  },
  id: {
    type: String,
    // defalut: require("uuid/v4")(),
    require: true
  },
  updateTime: {
    type: Date,
    default: Date.now(),
    required: true
  }
});

TodoSchema.plugin(uniqueValidator, { message: "{PATH} it must be unique" });

exports.todolist = moongoose.model("todolist", TodoSchema);
