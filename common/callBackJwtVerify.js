
const callBackjwtVerify= (err, decoded) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        console.error('Token has expired');
      } else if (err.name === 'JsonWebTokenError') {
                if (err.message === 'invalid signature') {
                console.error('Invalid token signature');
                } else if (err.message === 'jwt malformed') {
                console.error('Invalid token format');
                } else if (err.message === 'invalid algorithm') {
                console.error('Invalid token algorithm');
                } else {
                console.error('Other JWT error:', err.message);
                }
      } else {
        console.error('Other verification error:', err.message);
      }
    } else {
      console.log('Decoded Payload:', decoded);
    }
  }

module.exports={callBackjwtVerify}