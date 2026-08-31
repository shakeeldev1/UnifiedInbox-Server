import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            default: "Unknown",
        },

        profilePicture: {
            type: String,
            default: null,
        },

        phone: {
            type: String,
            default: null,
        },

        channels: [
            {
                channel: {
                    type: String,
                    enum: ["whatsapp", "instagram", "facebook"],
                    required: true,
                },

                externalId: {
                    type: String,
                    required: true,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

export default mongoose.model("Contact", contactSchema);