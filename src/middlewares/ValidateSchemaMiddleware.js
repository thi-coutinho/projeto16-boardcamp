export function ValidateSchema(schema) {
    return (req, res, next) => {
        const { error } = schema.validate(req.body, {abortEarly: false});
        
        if (error) {
            const errorMessage = error.details.map((err) => err.message);
            return res.status(422).send(errorMessage);
        }
        next();
    };
}