const Job = require('../models/Job');
const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');



const getAllUserJobs = async (req, res) => {
    const jobs = await Job.find({ createdBy: req.currentUser.userId }).sort('createdAt');
    res.status(StatusCodes.OK).json({ name: req.currentUser.name, jobs: jobs })
}

const postOne = async (req, res) => {
    req.body.createdBy = req.currentUser.userId;
    const job = await Job.create({ ...req.body });
    res.status(StatusCodes.CREATED).json({ job });
}

const deleteOne = async (req, res) => {
    const { id } = req.params;
    res.send(id);
}

const putOne = async (req, res) => {
    const { id } = req.params;
    const job = await Job.findOneAndUpdate({ _id: id }, req.body);
    res.status(StatusCodes.OK).json(job);
}

const getOne = async (req, res) => {
    const { id } = req.params;
    const job = await Job.findById(id);
    res.status(StatusCodes.OK).json(job);
}


module.exports = {
    getAllUserJobs,
    getOne,
    postOne,
    putOne,
    deleteOne
}