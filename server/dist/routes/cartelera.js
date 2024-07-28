const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.get('/images', (req, res) => {
    const directoryPath = path.join(__dirname, '../../uploads');

    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return res.status(500).json({
                message: 'Unable to scan files!',
                error: err
            });
        }

        const images = files.map(file => `/uploads/${file}`);
        res.json(images);
    });
});

module.exports = router;
