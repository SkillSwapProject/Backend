 
 const express = require('express');
 const users = express();

 const { getLoggedInUserDetails } = require('../middleware');

 users.get('/profile', (req, res) => {
    const userDetails = getLoggedInUserDetails(req);
    if (userDetails) {
      res.json(userDetails);
    } else {
      res.status(401).json({ message: 'Unauthorized - User not logged in' });
    }
  });

const express = require('express');

const { getLoggedInUserDetails, authenticateUser } = require('../middleware');

// פרופיל - רק למשתמשים מחוברים
users.get('/profile', authenticateUser, (req, res) => {
  res.json(req.user); // מגיע מ־req.user שהוזן ע"י ה־middleware
});

  
  module.exports = users  