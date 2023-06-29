const mongoose = require('mongoose');

const { Schema } = mongoose;

const TodoSchema = new Schema(
    {
        detail: {
            type: String,
            required: true
        },
        done: { type: Boolean, default: false },
        updated_at: { type: Date, default: Date.now }
    },
    { collection: 'todos'}
);

module.exports = mongoose.model('Todo', TodoSchema);