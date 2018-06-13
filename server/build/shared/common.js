"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var jwt = require("express-jwt");
var jwks = require("jwks-rsa");
//token validation/authorization
exports.jwtCheck = jwt({
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
//# sourceMappingURL=common.js.map