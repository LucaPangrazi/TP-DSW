"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.enviarResumenCompra = void 0;
const pdfkit_1 = __importDefault(require("pdfkit"));
const nodemailer_1 = __importDefault(require("nodemailer"));
const enviarResumenCompra = async (req, res) => {
    console.log('[enviarResumenCompra] Route entered!');
    console.log('[enviarResumenCompra] req.params.id:', req.params.id);
    console.log('[enviarResumenCompra] req.body:', req.body);
    try {
        const { id } = req.params;
        const { email, resumenCompra } = req.body;
        // 1. Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email || !emailRegex.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }
        // 2. Validate purchase exists
        // (Since there is no "Purchase" table, we rely on the frontend sending the resumenCompra payload
        //  We still check that we received the data)
        if (!resumenCompra) {
            console.log('[enviarResumenCompra] Error: resumenCompra not found in body');
            return res.status(404).json({ message: "Purchase not found or missing from request" });
        }
        console.log('[enviarResumenCompra] Starting PDF generation...');
        // 3. Generate PDF (pdfkit)
        const doc = new pdfkit_1.default({ margin: 50 });
        const buffers = [];
        doc.on('data', buffers.push.bind(buffers));
        const endPdfPromise = new Promise((resolve) => {
            doc.on('end', () => {
                const pdfData = Buffer.concat(buffers);
                resolve(pdfData);
            });
        });
        // HEADER (centered)
        doc.fontSize(24).text('CINETIX', { align: 'center' });
        doc.moveDown(0.5);
        doc.fontSize(16).text('Resumen de Compra', { align: 'center' });
        doc.moveDown(2);
        // Body
        doc.fontSize(12);
        doc.text(`Película: ${resumenCompra.pelicula}`);
        doc.text(`Fecha: ${resumenCompra.fecha}`);
        // If the fronted didn't send sucursal and sala in resumenCompra, we'll try to find if it was appended 
        // We know "Hora, Sala, Sucursal" should be there
        if (resumenCompra.hora)
            doc.text(`Hora: ${resumenCompra.hora}`);
        if (resumenCompra.sala)
            doc.text(`Sala: ${resumenCompra.sala}`);
        if (resumenCompra.sucursal)
            doc.text(`Sucursal: ${resumenCompra.sucursal}`);
        doc.text(`Total de entradas: ${resumenCompra.cantidad}`);
        doc.moveDown();
        doc.text('Asientos:');
        if (resumenCompra.asientos && Array.isArray(resumenCompra.asientos)) {
            resumenCompra.asientos.forEach((asiento) => {
                doc.text(`- Fila ${asiento.fila + 1}, Columna ${asiento.columna + 1}`);
            });
        }
        doc.moveDown();
        doc.text(`Promoción aplicada: ${resumenCompra.cant2x1 || 0} combos (${(resumenCompra.cant2x1 || 0) * 2} entradas)`);
        doc.text(`Entradas precio regular: ${resumenCompra.cantNormal || 0}`);
        doc.moveDown();
        doc.fontSize(14).font('Helvetica-Bold').text(`Total a pagar: $${resumenCompra.total}`);
        doc.end();
        const pdfBuffer = await endPdfPromise;
        console.log('[enviarResumenCompra] PDF generated successfully. Buffer size:', pdfBuffer.length);
        console.log('[enviarResumenCompra] Preparing to send email with nodemailer...');
        // 4. Send email (nodemailer)
        const transporter = nodemailer_1.default.createTransport({
            service: 'gmail',
            host: process.env.EMAIL_HOST || 'smtp.gmail.com',
            port: Number(process.env.EMAIL_PORT) || 587,
            secure: process.env.EMAIL_SECURE === 'true',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS
            }
        });
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Resumen de tu compra - Cinetix',
            html: '<p>¡Hola!</p><p>Adjuntamos el resumen de tu compra en Cinetix.</p><p>¡Que disfrutes la película!</p>',
            attachments: [
                {
                    filename: 'resumen-compra.pdf',
                    content: pdfBuffer,
                    contentType: 'application/pdf'
                }
            ]
        };
        await transporter.sendMail(mailOptions);
        console.log('[enviarResumenCompra] Email sent successfully via nodemailer!');
        // 5. Return response
        return res.status(200).json({ message: "Email sent successfully" });
    }
    catch (error) {
        console.error('[enviarResumenCompra] ERROR in try-catch block:', error);
        return res.status(500).json({ message: "Error sending email", error: String(error) });
    }
};
exports.enviarResumenCompra = enviarResumenCompra;
//# sourceMappingURL=compra.js.map