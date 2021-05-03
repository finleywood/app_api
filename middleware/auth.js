const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  if(req.headers.authorization){
    const token = req.headers.authorization.split(' ')[1];
    try{
      const decodedToken = jwt.verify(token, 'SECRET KEY GOES HERE');
      if(decodedToken.username == req.query.username){
        next();
      }
      else{
        res.status(401);
        res.json({msg: "Access Denied, auth token incorrect or username parameter incorrect!"});
      }
    }
    catch{
      res.status(401);
      res.json({msg: 'Incorrect or malformed request!'});
    }
  }
  else{
    res.status(401);
    res.json({msg: "Access Denied, auth token not provided!"});
  }
}
