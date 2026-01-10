// Simple middleware za autorizaciju uloga

// allowedRoles može biti string ili niz stringova
module.exports = function authorize(allowedRoles = []) {
    if (typeof allowedRoles === 'string') allowedRoles = [allowedRoles];

    return (req, res, next) => {
        let role = (req.headers['x-uloga'] || req.body?.uloga || req.query?.uloga || '').toString();

        if (!role) {
            return res.status(401).json({ poruka: 'Niste autentificirani' });
        }

        // parsiranje uloge u uppercase za lakse poredjenje
        role = role.toUpperCase();

        // uloga postaje dio requesta da bi se koristila u kontroleru
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
