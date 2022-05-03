import Db from "../models/index";
import doctorService from "../service/doctorService";

let getDetailDoctorById = async (req, res) => {
    try {
        let id = req.query.id;
        let result = await doctorService.getSingleDoctor(+id);

        return res.status(200).json({
            codeErr: 0,
            data: result
        })

    } catch (e) {
        console.log('err', e);
    }
}

module.exports = {
    getDetailDoctorById
}