const Product = require('../models/Product');

const getAll = async (req, res) => {

    // limit and skip
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const queryObject = {};
    const { title, company, sort, numericFilters } = req.query;
    if (company) {
        queryObject.company = company;
    }
    if (title) {
        const regex = new RegExp(title, 'i')
        queryObject.title = { $regex: regex };
    }
    if (sort) {
        queryObject.sort = sort;
        products = await Product.find(queryObject).sort(sort).skip(skip).limit(limit);
    } else {
        products = await Product.find(queryObject).skip(skip).limit(limit);
    }

    if (numericFilters) {

        const operators = {
            '>': '$gt',
            '>=': '$gte',
            '=': '$eq',
            '<': '$lt',
            '<=': '$lte',
        };

        const regEx = /\b(<|>|<=|>=|=)\b/g;

        let filters = numericFilters.replace(regEx, (match) => `-${operators[match]}-`);

        const options = ['price', 'rate', 'inventory'];
        filters = filters.split(',').forEach((item) => {
            const [field, operator, value] = item.split('-');
            if (options.includes(field)) {
                queryObject[field] = { [operator]: Number(value) };
            }
        });

        products = await Product.find(queryObject).skip(skip).limit(limit);
    }

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ products });
}

const getOne = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findOne({ _id: id });

    if (!product) {
        res.status(404).json({ msg: 'there is no product with selected id' });
    };

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ product });
}

const deleteOne = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findOneAndDelete({ _id: id });

    if (!product) {
        res.status(404).json({ msg: 'there is no product with selected id' });
    };

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ msg: 'record has deleted successfully.' });
}

const putOne = async (req, res) => {
    const { id } = req.params;
    const product = await Product.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
        runValidators: true,
        overwrite: true
    });

    if (!product) {
        res.status(404).json({ msg: 'there is no product with selected id' });
    };

    res.setHeader('Content-Type', 'application/json');
    res.status(200).json({ product });
}

const postOne = async (req, res) => {
    const product = await Product.create(req.body);
    res.setHeader('Content-Type', 'application/json');
    res.status(201).json({ product });
}

module.exports = {
    getAll,
    getOne,
    postOne,
    deleteOne,
    putOne,
}
