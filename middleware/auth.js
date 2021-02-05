const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  if(req.headers.authorization){
    const token = req.headers.authorization.split(' ')[1];
    try{
      const decodedToken = jwt.verify(token, 'wXga4W8Z7MjqpiGVMyuPJnTdZ80xw9LR');
      if(decodedToken.username == req.query.username){
        next();
      }
      else{
        res.status(401);
        res.json({msg: "Access Denied, auth token incorrect!"});
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