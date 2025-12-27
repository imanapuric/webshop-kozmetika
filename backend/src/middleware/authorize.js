// Simple middleware za autorizaciju uloga

// Accepts an array of allowed roles. If array is empty, only checks that a role is present (authenticated). (???)
module.exports = function authorize(allowedRoles = []) {
    if (typeof allowedRoles === 'string') allowedRoles = [allowedRoles];

    return (req, res, next) => {
        // role precedence: header -> body -> query
        let role = (req.headers['x-uloga'] || req.body?.uloga || req.query?.uloga || '').toString();

        if (!role) {
            return res.status(401).json({ poruka: 'Niste autentificirani' });
        }

        // parsiranje role u uppercase za lakse poredjenje
        role = role.toUpperCase();

        // role postaje dio requesta da bi se koristila u kontroleru
        req.uloga = role;

        if (allowedRoles.length) {
            // ponovo parsiranje
            const allowedUpper = allowedRoles.map(r => r.toUpperCase());
            if (!allowedUpper.includes(role)) {
                return res.status(403).json({ poruka: 'Zabranjen pristup!' });
            }
        }

        next();
    };
};
