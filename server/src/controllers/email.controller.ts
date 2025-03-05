import { Request, Response } from 'express';
import dotenv from 'dotenv';
import { transporter } from '../../mailer';

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
    console.log('Datos recibidos en el backend:', { email, pelicula, fecha, cantidad, asientos });

    // Configuración del correo
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
      `,
    };

    // Envía el correo
    await transporter.sendMail(mailOptions);

    console.log('Correo enviado correctamente a:', email);
    res.status(200).json({ message: 'Correo enviado exitosamente' });

  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).json({ error: 'Error al enviar el correo' });
  }
};
