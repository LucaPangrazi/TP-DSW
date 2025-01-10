import nodemailer from 'nodemailer';

export const enviarCorreo = async (req, res) => {
  const { email, pelicula, fecha, cantidad, asientos } = req.body;

  try {
    // Configura el transporter de nodemailer
    const transporter = nodemailer.createTransport({
      service: 'gmail', // O usa otro servicio como Outlook
      auth: {
        user: 'tu-correo@gmail.com',
        pass: 'tu-contraseña-app', // Usa una contraseña de aplicación
      },
    });

    // Genera el contenido del QR con datos
    const contenidoQR = `
      Película: ${pelicula}
      Fecha: ${fecha}
      Cantidad: ${cantidad}
      Asientos: ${asientos.map(asiento => `Fila ${asiento.fila}, Columna ${asiento.columna}`).join('; ')}
    `;

    // Crea el QR usando una librería como `qrcode`
    const QRCode = require('qrcode');
    const qrCodeDataURL = await QRCode.toDataURL(contenidoQR);

    // Configura el correo
    const mailOptions = {
      from: 'tu-correo@gmail.com',
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
    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Correo enviado exitosamente' });
  } catch (error) {
    console.error('Error al enviar el correo:', error);
    res.status(500).json({ error: 'Error al enviar el correo' });
  }
};
