const Admin = require('../../models/admin');
const jwt = require('jsonwebtoken');



const getAllAdminsHandler = async (request, response) => {
    const admins = await Admin.find();
    console.log(admins);
    response.status(200).send(admins);
}


const getOneAdminHandler = async (request, response) => {
    const { id } = request.params;
    const admin = await Admin.findById({ id });
    console.log(admin);
    response.send('one admin')
}

const registerAdminHandler = async (request, response) => {
    const { username, email, password } = request.body;
    const existingAdmin = await Admin.findOne({ email: email });
    if (existingAdmin) {
        response.status(406).send(new Error(
            'this email is has account'
        ));
        return;
    };
    const newAdmin = await Admin.create({ username, email, password });
    response.status(201).send(newAdmin);
};



const loginAdminHandler = async (request, response) => {
    const { email, password } = request.body;
    if (!email && !password) {
        response.status(404).send(new Error(
            'Please provide email and password'
        ))
        return;
    }
    const existingAdmin = await Admin.findOne({ email: email });
    const token = await existingAdmin.createToken();
    response.send({ token });
}
module.exports = {
    getAllAdminsHandler,
    getOneAdminHandler,
    registerAdminHandler,
    loginAdminHandler
}