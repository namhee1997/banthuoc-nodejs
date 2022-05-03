const bcrypt = require('bcryptjs');
const db = require("../models/index");
const salt = bcrypt.genSaltSync(10);

let createNewUser = async (data) => {

    return new Promise(async (resovel, reject) => {
        try {
            let hashPassForm = await hashUserPassword(data.password);
            await db.User.create({ //tạo user vào db, mk chuyển sang hashpass rồi mới đưa lên db
                email: data.email,
                password: hashPassForm,
                firstName: data.firstName,
                lastName: data.lastName,
                address: data.address,
                phonenumber: data.phonenumber,
                gender: data.gender === "1" ? true : false,
                roleId: data.roleId,
            })
            resovel("ok create by user success!");
        } catch (error) {
            reject(error)
        }
    })
}

let hashUserPassword = (pass) => {
    return new Promise(async (resovel, reject) => {
        try {
            let hashPass = await bcrypt.hashSync(pass, salt);
            resovel(hashPass);

        } catch (error) {
            reject(error);
        }
    })
};

let getAllUser = () => {
    return new Promise(async (resovel, reject) => {
        try {
            let user = await db.User.findAll({ raw: true });
            resovel(user);
        } catch (error) {
            reject(error);
        }
    })
};

let getUserByID = (ids) => {
    return new Promise(async (resovel, reject) => {
        try {
            let user = await db.User.findOne({ where: { id: ids } });
            resovel(user);

        } catch (error) {
            reject(error);
        }
    })
};

let pushUserByID = (body) => {
    return new Promise(async (resovel, reject) => {
        try {
            let user = await db.User.update(
                {
                    firstName: body.firstName,
                    lastName: body.lastName,
                    address: body.address
                },
                { where: { id: body.id } }
            );
            resovel(user);
        } catch (error) {
            reject(error);
        }
    })
};

let deleteUserByID = (id) => {
    return new Promise(async (resovel, reject) => {
        try {
            let user = await db.User.findOne({ where: { id: id } });
            if (user) {
                await user.destroy();
            }
            resovel();
        } catch (error) {
            reject(error);
        }
    })
};

module.exports = {
    createNewUser,
    getAllUser,
    getUserByID,
    pushUserByID,
    deleteUserByID,
};