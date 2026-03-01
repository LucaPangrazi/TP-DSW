import { Request, Response } from 'express';
import PDFDocument from 'pdfkit';
import nodemailer from 'nodemailer';

export const enviarResumenCompra = async (req: Request, res: Response) => {
    console.log('[enviarResumenCompra] Route entered!');
    console.log('[enviarResumenCompra] req.params.id:', req.params.id);
    console.log('[enviarResumenCompra] req.body:', req.body);
    try {
        const { id } = req.params;
        const { email, resumenCompra } = req.body;

        // Valida formato del email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        // Validar que la compra exista
        // Verifico haber recibido los datos del frontend ResumenCompra
        if (!resumenCompra) {
            console.log('[enviarResumenCompra] Error: no se encontro resumenCompra en la solicitud');
            return res.status(404).json({ message: "No se encontro la compra" });
        }

        console.log('[enviarResumenCompra] Genero PDF');
        const doc = new PDFDocument({ margin: 50 });
        const buffers: any[] = [];

        doc.on('data', buffers.push.bind(buffers));

        const endPdfPromise = new Promise<Buffer>((resolve) => {
            doc.on('end', () => {
                const pdfData = Buffer.concat(buffers);
                resolve(pdfData);
            });
        });

        // Cabecera
        doc.font('Times-Bold').fontSize(32).text('CINETIX', { align: 'center' });

        doc.font('Helvetica').fontSize(18).text('Ticket de Compra', { align: 'center' });

        doc.moveDown(1.5);

        // Línea separadora
        doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();

        doc.moveDown(1.5);

        // detalles de funcion
        doc.font('Times-Bold').fontSize(18).text('Detalles de la función');
        doc.moveDown(0.8);

        doc.font('Times-Roman').fontSize(14);
        doc.text(`Película: ${resumenCompra.pelicula}`);
        doc.text(`Fecha: ${resumenCompra.fecha}`);
        // Si el frontend no envió sucursal y sala dentro de resumenCompra,
        // verifico si fueron agregados posteriormente
        if (resumenCompra.hora) doc.text(`Hora: ${resumenCompra.hora}`);
        if (resumenCompra.sala) doc.text(`Sala: ${resumenCompra.sala}`);
        if (resumenCompra.sucursal) doc.text(`Sucursal: ${resumenCompra.sucursal}`);

        doc.text(`Total de entradas: ${resumenCompra.cantidad}`);

        doc.moveDown(1);

        // asientos
        doc.font('Times-Bold').fontSize(15).text('Asientos');
        doc.moveDown(0.5);
        if (resumenCompra.asientos && Array.isArray(resumenCompra.asientos)) {
            resumenCompra.asientos.forEach((asiento: any) => {
                doc.text(`- Fila ${asiento.fila + 1}, Columna ${asiento.columna + 1}`);
            });
        }

        doc.moveDown(1);

        doc.font('Times-Bold').fontSize(15).text('Promoción aplicada');
        doc.font('Times-Roman').fontSize(14);
        doc.text(`Combos 2x1: ${resumenCompra.cant2x1 || 0} (${(resumenCompra.cant2x1 || 0) * 2} entradas)`);
        doc.text(`Entradas precio regular: ${resumenCompra.cantNormal || 0}`);

        doc.moveDown(1.5);

        // Línea separadora antes del total
        doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke();

        doc.moveDown(1.5);

        doc.font('Times-Bold').fontSize(18).text(`TOTAL A PAGAR: $${resumenCompra.total}`, { align: 'right' });

        doc.moveDown(4);

        // pie de ticket
        doc.fontSize(12).font('Helvetica-Oblique').text('Gracias por elegir Cinetix', { align: 'center' });

        doc.end();

        const pdfBuffer = await endPdfPromise;
        console.log('[enviarResumenCompra] PDF generado correctamente, tamaño del Buffer:', pdfBuffer.length);


        // Envio de email, Verifico credenciales en process.env
        console.log(`[enviarResumenCompra] EMAIL_USER loaded: ${!!process.env.EMAIL_USER} (Value: ${process.env.EMAIL_USER || 'undefined'})`);
        console.log(`[enviarResumenCompra] EMAIL_PASS loaded: ${!!process.env.EMAIL_PASS} (Value: ${process.env.EMAIL_PASS ? '***' : 'undefined'})`);

        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.error('[enviarResumenCompra] ERROR: Faltan credenciales en process.env. No se puede autenticar con el servidor SMTP.');
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            host: process.env.EMAIL_HOST || 'smtp.gmail.com', /* para hotmail era host: "smtp.office365.com" */
            port: Number(process.env.EMAIL_PORT) || 587,
            secure: process.env.EMAIL_SECURE === 'true', /* para hotmail era secure: false   */
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });

        console.log('[enviarResumenCompra] Verificando conexión SMTP');
        try {
            await transporter.verify();
            console.log('[enviarResumenCompra] Conexión SMTP verificada correctamente');
        } catch (verifyError) {
            console.error('[enviarResumenCompra] Falló la verificación SMTP:', verifyError);
            throw verifyError;
        }

        const mailOptions = {
            from: process.env.EMAIL_USER || 'no-reply@cinetix.com',
            to: email,
            subject: 'Ticket de Compra CINETIX',
            html: '<p>¡Hola!</p><p>Adjuntamos el resumen de tu compra en Cinetix.</p><p>¡Que disfrutes la película!</p>',
            attachments: [
                {
                    filename: 'resumen-compra.pdf',
                    content: pdfBuffer,
                    contentType: 'application/pdf'
                }
            ]
        };

        console.log(`[enviarResumenCompra] Antes de enviar el email a: ${email}...`);
        await transporter.sendMail(mailOptions);
        console.log('[enviarResumenCompra] El email fue enviado correctamente');

        // Notificacion
        return res.status(200).json({ message: "Email sent successfully" });

    } catch (error) {
        console.error('[enviarResumenCompra] ERROR en el bloque try-catch:', error);
        return res.status(500).json({ message: "Error al enviar el email", error: String(error) });
    }
};
