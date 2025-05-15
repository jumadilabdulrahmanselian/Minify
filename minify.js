const express = require('express');
const bodyParser = require('body-parser');
const { minify } = require('terser');

const app = express();
const PORT = 3333;

// app.use(bodyParser.text({ type: 'text/javascript' }));
// Middleware untuk parsing urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

app.post('/javascript', async (req, res) => {
    try {
        const code = req.body.input;

        if (!code) {
            return res.status(400).json({ error: 'No JavaScript code provided.' });
        }

        const result = await minify(code);

        if (result.error) {
            return res.status(500).json({ error: result.error.message });
        }

        res.set('Content-Type', 'text/javascript');
        return res.send(result.code);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
});

app.listen(PORT, () => {
    console.log(`JavaScript Minifier API running on http://localhost:${PORT}`);
});
