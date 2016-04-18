/**
 * Created by Frederick on 12/04/2016.
 */
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var FavoursSchema = new Schema({
    created: {
        type: Date,
        default: Date.now
    },
    level: {
        type: Number,
        default: 1
    },
    description: {type: String,
        default: '',
        trim: true,
        required: 'description cannot be blank'
    },
    creator: {
        type: Schema.ObjectId,
        ref: 'User'
    },

    subject: {
        type: String
    },
    target: {
        type: Schema.ObjectId,
        ref: 'User'
    }
});

mongoose.model('Favour', FavoursSchema);