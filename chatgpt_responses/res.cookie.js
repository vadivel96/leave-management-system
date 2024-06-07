const express = require('express');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const cookieParser = require('cookie-parser');

const app = express();
app.use(express.json());
app.use(cookieParser());

// Load the private key for signing JWT
const privateKey = fs.readFileSync('private.key.pem', 'utf8');

// Function to generate an access token
function generateAccessToken(user) {
  return jwt.sign(user, privateKey, { algorithm: 'RS256', expiresIn: '15m' });
}

// Example login route
app.post('/login', (req, res) => {
  // Authenticate user (replace this with your actual authentication logic)
  const user = { id: 1, username: 'exampleuser' };

  // Generate access token
  const accessToken = generateAccessToken(user);

  // Set access token in a secure HttpOnly cookie
  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: true, // Set to true in production if using HTTPS
    sameSite: 'Strict' // Or 'Lax' depending on your requirements
  });

  res.send('Login successful');
});

// Protected route example
app.get('/protected', (req, res) => {
  // Access token is included in the request cookies
  const accessToken = req.cookies.accessToken;

  if (!accessToken) {
    return res.status(401).send('Access token missing');
  }

  try {
    // Verify and decode the access token
    const decoded = jwt.verify(accessToken, publicKey, { algorithms: ['RS256'] });
    res.send(`Hello ${decoded.username}, you have access to this protected route!`);
  } catch (error) {
    res.status(401).send('Invalid or expired access token');
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
