module.exports = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader) {
            console.warn("Token no enviado");
            return res.status(401).json({ message: "No autorizado" });
        }

        let token = authHeader;
        if (token.startsWith("Bearer ")) {
            token = token.split(" ")[1];
        }

        // jwt.verify(...)
        next();
    } catch (error) {
        console.error("JWT ERROR:", error.message);
        return res.status(401).json({ message: "Token inválido" });
    }
};