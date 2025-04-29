 
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
  module.exports = users  