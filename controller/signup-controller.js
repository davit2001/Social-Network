require("../db");
const User = require("../models/user-schema")

class SignUpController {
    async insertUser(data) {
        if (data.gender == "male") {
            data.profilePhotos = "defaultMale.jpg"
        } else {
            data.profilePhotos = "defaultFemale.png"
        }
        
        const person = new User(data);       
        try {
            const result = await person.save();
            return result;
        } catch (error) {
            console.log(`Error on create person: ${error}`)
            throw error;
        }
    }
}

module.exports = new SignUpController();