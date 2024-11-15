import postmark from "postmark";
import dotenv from "dotenv";

dotenv.config();

const client = new postmark.ServerClient(process.env.POSTMARK_API_TOKEN);

const sendVerificationCodeEmail = async (email, verificationCode, name) => {
    await client.sendEmailWithTemplate({
        From: "20210630@aloe.ulima.edu.pe",
        To: email,
        TemplateId: 37837984,
        TemplateModel: {
            product_name: "Mediplan+",
            name: name,
            verification_code: verificationCode, 
            action_url: `http://localhost:3000/recuperar-nueva`
        }
    });
};

export default { sendVerificationCodeEmail };
