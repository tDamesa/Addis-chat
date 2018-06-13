import * as jwt from 'express-jwt';
import * as jwks from 'jwks-rsa';

//token validation/authorization
export const jwtCheck = jwt({
  secret: jwks.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://addis-chat.auth0.com/.well-known/jwks.json'
  }),
  audience: 'szSKat29FHdhyFPdhlwEYkTNgiVrs9LL',
  issuer: 'https://addis-chat.auth0.com/',
  algorithms: ['RS256']
});
