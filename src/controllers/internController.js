const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")
const { isValidMail, isValid, isValidName, isValidRequestBody, isValidMobile } = require("../validator/validator")


const createIntern = async function (req, res) {
    try {
        const Data = req.body
        if (!isValidRequestBody(Data)) return res.status(400).send({ status: false, message: "Body can't be empty it must contain some data." })


        const { name, mobile, email, collegeName, isDeleted } = Data
        if (!isValid(name)) return res.status(400).send({ status: false, message: "name is  requred" })
        if (!isValid(mobile)) return res.status(400).send({ status: false, message: "mobail is  requred" })
        if (!isValid(email)) return res.status(400).send({ status: false, message: "email is  requred" })
        if (!isValid(collegeName)) return res.status(400).send({ status: false, message: "collegeName is  requred" })

        if (!isValidName.test(name)) return res.status(406).send({
            status: false, msg: "Enter a valid name",
            validfname: "length of name in between(3-20) , you can't use any Number & Special character "
        })

        if (!isValidMail.test(email)) return res.status(406).send({
            status: false, msg: "email id is not valid",
            ValidMail: "email must be contain ==> @  Number  ."
        })
        let uniqueEmail = await internModel.findOne({ email: email })
        if (uniqueEmail) {
            return res.status(409).send({ status: false, message: "Email Already Exists." })//(409)it is use for the conflict
        }

        let uniqueMobile = await internModel.findOne({ mobile: mobile })
        if (uniqueMobile) {
            return res.status(409).send({ status: false, message: "Mobile no. Already Exists." })//(409)it is use for the conflict
        }
        if (!isValidMobile.test(mobile)) return res.status(406).send({
            status: false, message: "mobile no. is not valid",
            ValidMobile: "it must be 10 digit Number & it should be a indian mobile no."
        })
        
        if (isDeleted == true) return res.status(400).send({ status: false, msg: "you can't delete while creating" })

        let collegeId = await collegeModel.findOne({ name: collegeName })
        if (!collegeId) return res.status(404).send({ status: false, message: `${collegeName} This college is not exist` })

        const internData = {
            name: name.trim(),
            mobile: mobile.trim(),
            email: email.trim(),
            collegeId: collegeId["_id"]
        }


        const saveData = await internModel.create(internData)
        res.status(201).send({ status: true, message: "Intern successfilly created", data: saveData })

    } catch (error) {
        res.status(500).send({ status: true, message: error.message })
    }

}



module.exports = { createIntern }