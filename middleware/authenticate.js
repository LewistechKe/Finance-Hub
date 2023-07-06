// Required packages
const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
   const secret = process.env.JWT_SECRET;

   const authHeader = req.headers.authorization;

   if (authHeader) {
      const token = authHeader.split("Bearer ")[1];

      if (token) {
         try {
            const user = jwt.verify(token, secret);
            req.user = user;
            next();
         } catch (err) {
            return res.status(401).json({
               errors: {
                  authentication: "Invalid/Expired token",
               },
            });
         }
      } else {
         return res.status(401).json({
            errors: {
               authentication: "Authentication token must be 'Bearer [token]'",
            },
         });
      }
   } else {
      return res.status(401).json({
         errors: {
            authentication: "Must supply a jwt token in authorization header",
         },
      });
   }
};
