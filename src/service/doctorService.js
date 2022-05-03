const db = require("../models/index");

let getSingleDoctor = (id) => {
    return new Promise(async (resovel, reject) => {
        try {
            let hashPass = db.User.findOne({
                where: { roleId: 2 },
                attributes: {
                    exclude: ['password', 'image']
                },
                include: [
                    { model: db.Markdown, attributes: ['contentHTML', 'contentMarkdown', 'description'] }
                ],
                raw: true,
                nest: true
            });
            resovel(hashPass);

        } catch (error) {
            reject(error);
        }
    })
};

module.exports = {
    getSingleDoctor
}

