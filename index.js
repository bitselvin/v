const express = require('express');
const bodyParser = require('body-parser');
const PDFDocument = require('pdfkit');
const fs = require('fs');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
// Ruta para servir el formulario HTML
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// Ruta para generar el PDF
app.post('/generate-pdf', (req, res) => {
    const { input1, input2 } = req.body;

    // Crear un documento PDF
    const doc = new PDFDocument();

    // Nombre del archivo PDF
    const filename = 'formulario.pdf';

    // Guardar el archivo PDF en el servidor
    doc.pipe(fs.createWriteStream(filename));

    // Agregar contenido al PDF
    doc.fontSize(25).text('Datos del Formulario', { align: 'center' });
    doc.moveDown();
    doc.fontSize(16).text(`Primer Input: ${input1}`);
    doc.text(`Segundo Input: ${input2}`);

    // Finalizar el documento
    doc.end();

    // Enviar el PDF al cliente para su descarga
    doc.pipe(res);
});

app.listen(port, () => {
    console.log(`Servidor corriendo en http://localhost:${port}`);
});