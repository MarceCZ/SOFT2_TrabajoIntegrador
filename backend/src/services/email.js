import postmark from "postmark";
import { config } from "dotenv";
import { readFileSync } from "fs";

config();

const client = new postmark.ServerClient();

const sendEmailWithAttachment = async (email, resetLink) => {
    const attachment = readFileSync("./public/log.png");
    const attachmentName = "log.png";

    await client.sendEmail({
        From: "20210630@aloe.ulima.edu.pe",
        To: email,
        Subject: "Recuperación de contraseña",
        TextBody: `Hola, \n\nHemos recibido una solicitud para restablecer tu contraseña. Puedes hacerlo haciendo clic en el siguiente enlace:\n\n${resetLink}\n\nSi no solicitaste este cambio, puedes ignorar este correo.\n\nSaludos,\nTu equipo.`,
        HtmlBody: `<p>Hola,</p><p>Hemos recibido una solicitud para restablecer tu contraseña. Puedes hacerlo haciendo clic en el siguiente enlace:</p><p><a href="${resetLink}">Restablecer contraseña</a></p><p>Si no solicitaste este cambio, puedes ignorar este correo.</p><p>Saludos,<br/>Tu equipo.</p>`,
        Attachments: [
            {
                Name: attachmentName,
                Content: attachment.toString("base64"),
                ContentType: "image/png",
            },
        ],
    });
};


const sendResetPasswordEmailWithTemplate = async (email,resetLink ) => {
    await client.sendEmailWithTemplate({
        From: "20210630@aloe.ulima.edu.pe",
        To: email,
        TemplateId: 37883994, 
        TemplateModel: {
            product_url: "product_url_Value",
            product_name: "product_name_Value",
            action_url: resetLink,
            operating_system: "operating_system_Value",
            browser_name: "browser_name_Value",
            support_url: "support_url_Value",
            company_name: "company_name_Value",
            company_address: "company_address_Value",
            name: "name_Value"
                },
    });
};

const service = { sendEmailWithAttachment,sendResetPasswordEmailWithTemplate };

export default service;
