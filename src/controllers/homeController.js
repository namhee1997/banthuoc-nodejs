import Db from "../models/index";
import CRUDService from "../service/CRUDService";

let getHomePage = async (req, res) => {
    try {
        let db = await Db.User.findAll({});

        return res.render('homepage.ejs', {
            data: JSON.stringify(db)
        });
    } catch (e) {
        console.log(e);
    }
}

let getAboutPage = (req, res) => {
    return res.render('test/about.ejs');
}

let getCrud = (req, res) => {
    return res.render('crud.ejs');
}

let postCrud = async (req, res) => {
    let message = await CRUDService.createNewUser(req.body);//tạo user trong file "../service/CRUDService"
    return res.json(req.body);
}

let displayGetCrud = async (req, res) => {
    let getAll = await CRUDService.getAllUser();
    return res.render("displayCrud.ejs", { getAll });
}

let getEditCrud = async (req, res) => {
    let getQueryId = req.query.id;
    console.log('getQueryId', getQueryId);
    if (getQueryId) {
        let data = await CRUDService.getUserByID(getQueryId);
        res.render("editCrud.ejs", { data });

    } else {

        res.json('not id');
    }

}

let pushUserCrud = async (req, res) => {
    let getQueryId = req.body;
    if (getQueryId) {
        let data = await CRUDService.pushUserByID(getQueryId);
        res.redirect("/get_crud");
    } else {

        res.json('not id');
    }

}

let deleteUserCrud = async (req, res) => {

    let getQueryId = req.params.id;
    if (getQueryId) {
        res.redirect('/get_crud');
        let data = await CRUDService.deleteUserByID(getQueryId);
    } else {

        res.json('not id');
    }

}

module.exports = {
    getHomePage: getHomePage,
    getCrud: getCrud,
    getAboutPage: getAboutPage,
    postCrud: postCrud,
    displayGetCrud: displayGetCrud,
    getEditCrud,
    pushUserCrud,
    deleteUserCrud
}
