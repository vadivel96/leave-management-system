// Function to make an authenticated HTTP request using fetch
function fetchWithAuth(url, options) {
    // Fetch the access token from the cookie
    const accessToken = getCookie('accessToken');
  
    // Add the access token to the request headers
    const headers = {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json'
    };
  
    // Merge headers with options
    options = { ...options, headers };
  
    // Make the fetch request
    return fetch(url, options);
  }
  
  // Function to get a cookie value by name
  function getCookie(name) {
    const cookieString = document.cookie;
    const cookies = cookieString.split('; ');
  
    for (let cookie of cookies) {
      const [cookieName, cookieValue] = cookie.split('=');
      if (cookieName === name) {
        return decodeURIComponent(cookieValue);
      }
    }
  
    return null;
  }
  
  // Example usage:
  fetchWithAuth('/api/data', {
    method: 'GET',
  })
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error('Error:', error));
  