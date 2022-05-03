import express from "express";
import homeController from "../controllers/homeController";
import loginController from "../controllers/loginController";
import doctorController from "../controllers/doctorController";

let router = express.Router();

let initWebRoutes = (app) => {
    router.get('/', homeController.getHomePage);
    router.get('/about', homeController.getAboutPage);
    router.get('/crud', homeController.getCrud);
    router.post('/post_crud', homeController.postCrud);
    router.get('/get_crud', homeController.displayGetCrud);
    router.get('/edit-crud', homeController.getEditCrud);
    router.post('/push_crud', homeController.pushUserCrud);
    router.get('/remove-crud/:id', homeController.deleteUserCrud);

    router.post('/api/login', loginController.handleLogin);
    router.get('/api/get-all-user', loginController.getAllUser);
    router.put('/api/put-user-id', loginController.putUserId);
    router.delete('/api/delete-user-id/:id', loginController.deleteUserId);
    router.post('/api/create-user', loginController.createUserId);

    router.get('/api/get-detail-doctor-by-id', doctorController.getDetailDoctorById);

    return app.use("/", router);
}

module.exports = initWebRoutes;