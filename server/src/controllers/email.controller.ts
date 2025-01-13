import nodemailer from 'nodemailer';
import { Request, Response } from 'express'; 
import dotenv from 'dotenv';

dotenv.config();

interface Asiento {
  fila: number;
  columna: number;
}

interface PedidoCompra {
  email: string;
  pelicula: string;
  fecha: string;
  cantidad: number;
  asientos: Asiento[];
}

export const enviarCorreo = async (req: Request, res: Response): Promise<void> => {
  const { email, pelicula, fecha, cantidad, asientos }: PedidoCompra = req.body;

  try {
    // Log inicial para verificar datos recibidos
    console.log('Datos recibidos en el backend:', { email, pelicula, fecha, cantidad, asientos });

    // Configura el transporter de nodemailer
    let transporter;
    try {
      transporter = nodemailer.createTransport({
        service: 'gmail', // O usa otro servicio como Outlook
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS, // Usa una contraseña de aplicación
        },
      });
      console.log('Transporter configurado correctamente.');
    } catch (err) {
      console.error('Error al configurar el transporter:', err);
      res.status(500).json({ error: 'Error en la configuración del correo' });
      return;
    }

    // Genera el contenido del QR
    let qrCodeDataURL;
    try {
      const QRCode = require('qrcode');
      const contenidoQR = `
        Película: ${pelicula}
        Fecha: ${fecha}
        Cantidad: ${cantidad}
        Asientos: ${asientos.map(asiento => `Fila ${asiento.fila}, Columna ${asiento.columna}`).join('; ')}
      `;
      qrCodeDataURL = await QRCode.toDataURL(contenidoQR);
      console.log('QR generado correctamente.');
    } catch (err) {
      console.error('Error al generar el código QR:', err);
      res.status(500).json({ error: 'Error al generar el código QR' });
      return;
    }

    // Configura el correo
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: `Confirmación de compra - ${pelicula}`,
      html: `
        <h2>Gracias por tu compra</h2>
        <p><strong>Película:</strong> ${pelicula}</p>
        <p><strong>Fecha:</strong> ${fecha}</p>
        <p><strong>Cantidad:</strong> ${cantidad}</p>
        <p><strong>Asientos:</strong> ${asientos.map(asiento => `Fila ${asiento.fila}, Columna ${asiento.columna}`).join('; ')}</p>
        <p>Escanea el código QR para más información:</p>
        <img src="${qrCodeDataURL}" alt="Código QR" />
      `,
    };

    // Envía el correo
    try {
      await transporter.sendMail(mailOptions);
      console.log('Correo enviado correctamente.');
      res.status(200).json({ message: 'Correo enviado exitosamente' });
    } catch (err) {
      console.error('Error al enviar el correo:', err);
      res.status(500).json({ error: 'Error al enviar el correo' });
    }
  } catch (error) {
    console.error('Error general en el proceso:', error);
    res.status(500).json({ error: 'Error general en el proceso de envío' });
  }
};
