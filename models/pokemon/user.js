import mongoose from 'mongoose';

var UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    caught: [String],
    created: { type: Date, default: Date.now }
});

export default mongoose.model('User', UserSchema);
