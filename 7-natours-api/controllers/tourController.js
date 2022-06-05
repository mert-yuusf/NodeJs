const Tour = require("../models/Tour");
const {StatusCodes} = require("http-status-codes");

const getAllTours = async (req, res) => {
    try {
        const page = Number(req.query.p) || 1;
        const limit = Number(req.query.limit) || 2;
        const skip = (page - 1) * limit;
        const sort = req.query.sort || "name";
        const numericFields = req.query.numericFields;
        const query = {}
        if (numericFields) {
            const operators = {
                '>': '$gt',
                '>=': '$gte',
                '=': '$eq',
                '<': '$lt',
                '<=': '$lte',
            };

            const regEx = /\b(<|>|<=|>=|=)\b/g;
            let filters = numericFields.replace(regEx, (match) => `-${operators[match]}-`);
            const options = ["price","duration","maxGroupSize"]
            filters.split(',').forEach((item)=>{
                const [field,operator,value] = item.split("-");
                if(options.includes(field)){
                    query[field] = {[operator]:Number(value)}
                }
            })
        }
        const tours = await Tour.find(query)
            .sort(sort)
            .skip(skip)
            .limit(limit);
        res.status(StatusCodes.OK).json({tours})
    } catch (e) {
        res.status(StatusCodes.SERVFAIL).json({e})
    }
}

const getOneTour = async (req, res) => {
    try {
        const {id} = req.params;
        const tour = await Tour.findOne({_id: id});
        if (!tour) {
            res.status(StatusCodes.NOTFOUND).json({
                msg: "Could not found the tour with selected id"
            });
            return;
        }
        res.status(StatusCodes.OK).json({tour});
    } catch (e) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({e})
    }
}

const createOneTour = async (req, res) => {
    try {
        const tour = await Tour.create(req.body);
        res.status(StatusCodes.CREATED).json({tour});
    } catch (e) {
        res.status(StatusCodes.SERVFAIL).json({e})
    }
}

const deleteOneTour = async (req, res) => {
    try {
        const {id} = req.params;
        const tour = await Tour.findOneAndDelete({_id: id});
        if (!tour) {
            res.status(StatusCodes.NOTFOUND).json({
                msg: "Could not found the tour with selected id"
            });
            return;
        }
        res.status(StatusCodes.OK).json({tour});
    } catch (e) {
        res.status(StatusCodes.SERVFAIL).json({e})
    }
}

const updateOneTour = async (req, res) => {
    try {
        const {id} = req.params;
        const tour = await Tour.findOneAndUpdate({_id: id}, req.body, {
            new: true,
            overwrite: true,
            runValidators: true
        });
        if (!tour) {
            res.status(StatusCodes.NOTFOUND).json({
                msg: "Could not found the tour with selected id"
            });
            return;
        }
        res.status(StatusCodes.OK).json({tour});
    } catch (e) {
        res.status(StatusCodes.SERVFAIL).json({e})
    }
}

module.exports = {
    getAllTours,
    getOneTour,
    createOneTour,
    deleteOneTour,
    updateOneTour
}