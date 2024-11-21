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
            action_url: `http://localhost:3000/restablecer`
        }
    });
};

const sendNotificationEmail = async (email, nombre, productos, idPedido,fecha, valorTotal) => {
    await client.sendEmailWithTemplate({
        From: "20210630@aloe.ulima.edu.pe",
        To: email,
        TemplateId: 37883994, 
        TemplateModel: {
            product_url: "http://localhost:3000/",
            product_name: "Mediplan+",
            name: nombre,
            receipt_id: idPedido,
            date: fecha,
            receipt_details: productos,
            total:valorTotal,
            company_name: "Mediplan+",
            company_address: "Lima, Peru"
                },
    });
};

const sendQuestionEmail = async (email, consulta, nombre) => {
    await client.sendEmailWithTemplate({
      From: "20210630@aloe.ulima.edu.pe", // Reemplaza con tu correo autorizado en Postmark
      To: "20214302@aloe.ulima.edu.pe",
      TemplateId: 38094869,
      TemplateModel: {
        correo: email,
        name: nombre,
        question: consulta
      },
    });
};

export default { sendVerificationCodeEmail , sendNotificationEmail};
