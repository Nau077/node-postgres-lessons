const authConfig = require("../../../config/auth.config");
const authStrategy = authConfig.authStrategy;

checkRolesExisted = async (req, res, next) => {
    const role = req.body.role;

    if (!role) {
        res.status(400).send({
            message: "Ошибка, нет роли"
        });
        return;
    };

    if (!authStrategy[role]) {
        res.status(400).send({
            message: "Ошибка, неверная роль"
        });
        return;  
    };

    next();
}

checkDuplicateUserPhone = async (req, res, next) => {
    const role = req.body.role;

    if (!req.body.fields) {
        return res.status(400).send({
            message: "Ошибка, нет fields"
        })
    };

    const phoneNumber = req.body.fields.find(el => el.phone_number);

    if (!phoneNumber) {
        return res.status(400).send({
            message: "Ошибка, нет телефона в полях"
        })
    };

    const userUseCase = new authStrategy[role];
    
    const user = await userUseCase.getOne(phoneNumber.phone_number);

    if (user) {
        return res.status(400).send({
            message: "Ошибка, такой пользователь уже есть!"
        });
    }
 
      next();
};

const verifySignUp = {
    checkDuplicateUserPhone,
    checkRolesExisted
};

module.exports = verifySignUp;
