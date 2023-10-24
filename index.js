const express = require('express');
const app = express();
const path = require('path');

// Directory for views and view engine to use Pug
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Parsing of form data
app.use(express.urlencoded({ extended: true }));

// Static files from the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Home page
app.get('/', (req, res) => {
  res.render('index');
});

// Generate image form
app.get('/generate-img', (req, res) => {
  res.render('generate-img');
});

// Generate image form submission
app.post('/generate-img', (req, res) => {
  // Extract the form data
  const { height, width, blur, grayscale } = req.body;
  
  // Determine if grayscale parameter should be added to URL
  const grayscaleParam = grayscale ? 'grayscale' : '';

  // Generate image URL
  const imageUrl = `https://picsum.photos/${height}/${width}?${grayscaleParam}&blur=${blur}`;
  
  // Render generate-img page with the image URL
  res.render('generate-img', { imageUrl });
});

// Generate QR code form
app.get('/generate-qr-code', (req, res) => {
  res.render('generate-qr-code');
});

// Generate QR code form submission
app.post('/generate-qr-code', (req, res) => {
  // Extract the form data
  const { height, width, value } = req.body;

  // Generate image URL
  const imageUrl = `https://image-charts.com/chart?chs=${height}x${width}&cht=qr&chl=${encodeURIComponent(value)}`;

  // Render generate-qr-code page with image URL
  res.render('generate-qr-code', { imageUrl });
});

// Start server
app.listen(8000, () => {
  console.log('Server started on port 8000');
});
