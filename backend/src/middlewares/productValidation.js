
export const validateProduct = (req, res, next) => {
    const { name, description, price, category, size, color, imageUrl, stock } = req.body;

    if (!name || !description || !price || !category || !size || !color || !imageUrl || !stock) {
        return next(new HttpError(400, "All fields are required"));
    }
    next();
};


export const validateProductUpdate = (req, res, next) => {
    const { price, stock } = req.body;

    if (price !== undefined && price < 0) {
        return next(new HttpError(400, "Price cannot be negative"));
    }

    if (stock !== undefined && stock < 0) {
        return next(new HttpError(400, "Stock cannot be negative"));
    }

    next();
};