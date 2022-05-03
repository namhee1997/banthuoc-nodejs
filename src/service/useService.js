import db from "../models/index";
const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(10);

let handleUserLogin = (email, password) => { //check đã tồn tại hay chưa
    return new Promise(async (resolve, reject) => {
        try {
            let useData = {};
            let isExist = await checkUserEmail(email);
            if (isExist) {
                //da ton tai người dùng
                //ss pass
                let isPass = await db.User.findOne({
                    where: { email: email },
                    attributes: ['email', 'roleId', 'password'],//can lay ra,
                    raw: true//tra ra duoi dang object
                });
                if (isPass) {
                    let checkPass = await bcrypt.compare(password, isPass.password);
                    if (checkPass) {
                        useData.errCode = 0;
                        useData.message = `Ok`;
                        delete isPass.password;
                        useData.user = isPass;
                    } else {
                        useData.errCode = 3;
                        useData.message = `Wrong pass`;
                    }
                } else {
                    useData.errCode = 2;
                    useData.message = `Pass not default!`;
                }

            } else {
                //err code
                useData.errCode = 1;
                useData.message = `Email không tồn tại!`;

            }
            resolve(useData);
        } catch (e) {
            reject(e);
        }
    })
}

let checkUserEmail = (useEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let use = await db.User.findOne({
                where: { email: useEmail }
            });

            if (use) {
                resolve(true);
            } else {
                resolve(false);
            }
        } catch (e) {
            reject(e);
        }
    })
}

let getAllUserTable = () => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findAll({
                attributes: {
                    exclude: ['password']
                }
            })
            if (user == null) {
                user = [];
            }
            resolve(user);
        } catch (e) {
            reject(e);
        }
    })
}

let getOneUserTable = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
                attributes: {
                    exclude: ['password']
                }
            })
            if (user == null) {
                user = [];
            }
            resolve(user);
        } catch (e) {
            reject(e);
        }
    })
}

let putOneUserTable = (params) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: params.id },
            })
            user.firstName = params.firstName;
            user.email = params.email;
            user.lastName = params.lastName;
            user.phonenumber = params.phonenumber;
            user.address = params.address;

            user.save();
            resolve('success!');
        } catch (e) {
            reject(e);
        }
    })
}

let deleteOneUserTable = (userId) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { id: userId },
            })
            user.destroy();
            resolve('delete success!');
        } catch (e) {
            reject(e);
        }
    })
}

let createUser = (data) => {
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

module.exports = {
    handleUserLogin,
    getAllUserTable,
    getOneUserTable,
    putOneUserTable,
    deleteOneUserTable,
    createUser,
}