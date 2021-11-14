const StudentsUseCase = require("../../domain-layer/use-cases/students.use-case");
const AuthUseCase = require("../../domain-layer/use-cases/auth.use-case")
 
exports.signUp = async (req, res) => {
  if (!req.body || !req.body.accesory || !req.body.fields) throw res.json("hahakek");

  const accesory = req.body.accesory;
  const fields = req.body.fields;
  
    try {
        switch (accesory) {
            case "students":
                const authUseCase = new AuthUseCase(new StudentsUseCase);
                authUseCase.signUp(fields)
                break;
            default:
                break;
        }    
    } catch (error) {
        throw(error)
    }
};

exports.signIn = async (req, res) => {
 
 
};
