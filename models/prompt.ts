import mongoose, {Schema, model, models} from "mongoose";

const PromptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    prompt: {
        type: String,
        required: [true, 'Prompt is required!']
    },
    tag: {
        type: String,
        required: [true, 'Tag is required!']
    }
});

const Prompt = models.Prompt || model('Prompt', PromptSchema); // Remember dòng này!!!
// if models.Prompt === truthy -> models.Prompt else -> Phân biệt giữa toán tử || và && trong ES6
export default Prompt;