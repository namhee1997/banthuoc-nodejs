import handleUserLogin from "../service/useService";

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(500).json({
            errCode: 1,
            message: "err code"
        });
    }
    let UserLogin = await handleUserLogin.handleUserLogin(email, password);

    return res.status(200).json({
        UserLogin: UserLogin ? UserLogin : {}
    });
}

let getAllUser = async (req, res) => {
    let id = req.query.id;
    if (!id) {
        return res.status(200).json({
            statusCode: 3,
            message: "err id",
            data: []
        })
    }
    if (id === "ALL") {
        let data = await handleUserLogin.getAllUserTable(id);
        return res.status(200).json({
            statusCode: 0,
            message: "all",
            data: data,
        })
    }
    if (id && id !== "ALL") {
        let data = await handleUserLogin.getOneUserTable(id);
        return res.status(200).json({
            statusCode: 0,
            message: "one",
            data: data,
        })
    }

}

let putUserId = async (req, res) => {
    try {
        let id = req.body.params;
        let query = await handleUserLogin.putOneUserTable(id);
        return res.status(200).json({
            statusCode: 0,
            message: "update success",
            data: query,
        })

    } catch (e) {
        console.log(e);
    }
}

let deleteUserId = async (req, res) => {
    try {
        let id = req.params.id;
        let query = await handleUserLogin.deleteOneUserTable(id);
        return res.status(200).json({
            statusCode: 0,
            message: "delete success",
            data: query,
        })

    } catch (e) {
        console.log(e);
    }
}

let createUserId = async (req, res) => {
    try {
        let body = req.body.params;
        console.log('body', body);
        let query = await handleUserLogin.createUser(body);
        return res.status(200).json({
            statusCode: 0,
            message: "add user success",
            data: query,
        })
    } catch (e) {
        console.log('elog', e);
    }
}

module.exports = {
    handleLogin,
    getAllUser,
    putUserId,
    deleteUserId,
    createUserId,
}