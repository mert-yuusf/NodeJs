const Job = require('../models/Job');
const User = require('../models/User');
const { StatusCodes } = require('http-status-codes');



const getAllUserJobs = async (req, res) => {
    const jobs = await Job.find({ createdBy: req.currentUser.userId }).sort('createdAt');
    console.log(req.currentUser);
    console.log(jobs);
    res.status(StatusCodes.OK).json({ name: req.currentUser.name, jobs: jobs })
}

const postOne = async (req, res) => {
    req.body.createdBy = req.currentUser.userId;
    const job = await Job.create({ ...req.body });
    console.log(job);
    res.status(StatusCodes.CREATED).json({ ...req.body });
}

const deleteOne = async (req, res) => {
    res.send('delete one job');
}

const putOne = async (req, res) => {
    res.send('put one job');
}

const getOne = async (req, res) => {
    res.send('get one job');
}


module.exports = {
    getAllUserJobs,
    getOne,
    postOne,
    putOne,
    deleteOne
}