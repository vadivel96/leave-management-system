// Logout route
app.post('/logout', (req, res) => {
    res.cookie('accessToken', '', {
      httpOnly: true,
      secure: true,
      sameSite: 'Strict',
      expires: new Date(0) // Set the expiration date to a past date to delete the cookie
    });
  
    res.send('Logout successful');
  });
  