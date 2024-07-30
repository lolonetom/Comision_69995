import mongoose from "mongoose";

const schema = new mongoose.Schema({
    tittle: String,
    description: String,
    completed: {
        type: Boolean,
        default: false
    }

})

const TodoModel = mongoose.model("todo", schema);

export default TodoModel;