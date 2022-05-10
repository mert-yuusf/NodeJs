const Task = require('../models/Task');
const asyncWrapper = require('../middlewares/async');

const getAll = asyncWrapper(async (req, res) => {
    const records = await Task.find();
    res.status(200).json({ records });
});

const getOne = asyncWrapper(async (req, res) => {
    const { id } = req.params;

    const record = await Task.findOne({ _id: id });

    if (!record) {
        res.status(200).json({ msg: 'Record Not Found' });
    }

    res.status(200).json({ record });
});

const deleteOne = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const record = await Task.findOneAndDelete({ _id: id });
    if (!record) {
        res.status(200).json({ msg: 'Record Not Found' });
    }
    res.status(200).json(record);
});

const putOne = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const record = await Task.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
        runValidators: true,
        overwrite: true
    });
    if (!record) {
        res.status(200).json({ msg: 'Record Not Found' });
    };
    res.status(200).json({ record });
});

const patchOne = asyncWrapper(async (req, res) => {
    const { id } = req.params;
    const record = await Task.findOneAndUpdate({ _id: id }, req.body, {
        new: true,
        runValidators: true
    });
    if (!record) {
        res.status(200).json({ msg: 'Record Not Found' });
    };
    res.status(200).json({ record });
});

const postOne = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body);
    res.status(201).json(req.body);
});



module.exports = {
    getAll,
    getOne,
    putOne,
    deleteOne,
    patchOne,
    postOne
}