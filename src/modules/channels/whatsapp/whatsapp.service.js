import axios from "axios";

const sendTextMessage = async ({ to, text }) => {
    const {
        WHATSAPP_API_VERSION,
        WHATSAPP_PHONE_NUMBER_ID,
        WHATSAPP_ACCESS_TOKEN,
    } = process.env;

    const url = `https://graph.facebook.com/${WHATSAPP_API_VERSION}/${WHATSAPP_PHONE_NUMBER_ID}/messages`;

    try {

        console.log("WhatsApp Request URL:", url);

        console.log("WhatsApp Request Body:", {
            messaging_product: "whatsapp",
            to,
            type: "text",
            text: {
                body: text,
            },
        });

        const response = await axios.post(
            url,
            {
                messaging_product: "whatsapp",
                to,
                type: "text",
                text: {
                    body: text,
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${WHATSAPP_ACCESS_TOKEN}`,
                    "Content-Type": "application/json",
                },
            }
        );
        console.log("WhatsApp Response:", response.data);

        return response.data;
    } catch (error) {
        console.error(
            "WhatsApp API Error:",
            error.response?.data || error.message
        );

        throw error;
    }
};

export { sendTextMessage };