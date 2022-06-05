const fs = require("fs");
const path = require("path");
const Tour = require("./models/Tour");
const tours = JSON.parse(fs.readFileSync(path.join(__dirname, "./static/data/tours.json")));

const populateTours = async () => {
    try {
        await Tour.deleteMany({});
        await Tour.insertMany(tours);
        console.log("Data inserted!.")
    } catch (e) {
        console.log(e);
    }
}




module.exports = {
    populateTours
}