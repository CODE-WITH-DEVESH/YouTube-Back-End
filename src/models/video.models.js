// Mongoose aur uske Schema constructor ko import kar rahe hain
import mongoose, { Schema } from "mongoose";

// Ye ek plugin hai jo aggregation queries ke liye pagination support deta hai
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

// Yahan ek schema bana rahe hain jiska naam hai videoSchema
// Isme video ka data structure define kiya gaya hai
const videoSchema = new Schema(
    {
        // video file ka path ya URL store hoga
        videofile: {
            type: String,
            required: true,  // bina iske document save nahi hoga
        },

        // video ka thumbnail ka path ya URL
        thumbnail: {
            type: String,
            required: true,
        },

        // video ka title
        title: {
            type: String,
            required: true,
        },

        // video ka description
        description: {
            type: String,
            required: true,
        },

        // video ki length/kitni der ka video hai (in seconds/minutes)
        duration: {
            type: Number,
            required: true,
        },

        // video ke kitne views hue hain
        views: {
            type: Number,
            default: 0  // by default 0 views se start karega
        },

        // video publish hua hai ya nahi
        isPublished: {
            type: Boolean,
            default: true  // by default publish hi maanenge
        },

        // ye reference hai User collection ke ObjectId se
        // matlab: ye video kis user ne upload kiya hai
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"  // User collection ke saath link karega
        }
    },

    {
        // timestamps true karne se mongoose khud hi createdAt aur updatedAt fields add kar dega
        timestamps: true
    }
);

// Ye line schema ke andar ek plugin attach kar rahi hai
// Jo aggregation ke through pagination ko easy bana deta hai
videoSchema.plugin(mongooseAggregatePaginate);

// Ab is schema ko ek mongoose model ke form me export kar rahe hain
// Model ka naam "Video" hoga aur uska structure videoSchema ke according hoga
export const Video = mongoose.model("Video", videoSchema);



// 🔎 Interview mein agar koi pooche:
// ❓"Schema mein timestamps: true ka kya use hai?"
// 👉 "Ye mongoose khud hi createdAt aur updatedAt fields add kar deta hai, jisse hume manually date/time store nahi karna padta."

// ❓"ref: 'User' ka matlab kya hai?"
// 👉 "Ye owner field ko User collection ke ek document se link karta hai. Ye ek relational reference hota hai."

// ❓"mongooseAggregatePaginate plugin kyun use kiya?"
// 👉 "Jab aggregation queries use karte hain tab manually pagination karna complex ho jata hai, ye plugin us process ko simple bana deta hai."