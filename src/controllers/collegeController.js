const collegeModel = require("../models/collegeModel")
const internModel = require("../models/internModel")
const { isValid, isValidRequestBody,isValidUrl } = require("../validator/validator")
const isValidName=(/^[a-zA-Z]{3,9}$/)
const isValidfullName=(/^[a-zA-Z.,() ]{8,80}$/)


const createCollege = async function (req, res) {
    try {
        const Data = req.body
        if (!isValidRequestBody(Data)) return res.status(400).send({ status: false, message: "Body can't be empty it must contain some data." })


        const { name, logoLink, fullName, isDeleted } = Data

        if (!isValid(name)) return res.status(400).send({ status: false, message: "name is  requred" })
        if (!isValid(fullName)) return res.status(400).send({ status: false, message: "fullName is  requred" })
        if (!isValid(logoLink)) return res.status(400).send({ status: false, message: "logoLink  is  requred" })

        if (!isValidName.test(name)) return res.status(406).send({   
            status: false, msg: "Enter a valid name",
            validfname: "length of name in between(3-9) , you can't use any Number & Special character "
        })


        let uniqueName = await collegeModel.findOne({ name:name,isDeleted:false })
        if ( uniqueName) {
            return res.status(409).send({ status: false, message: ` college ${name} is Already Exists.` })//(409)it is use for the conflict
        }

        if (!isValidfullName.test(fullName)) return res.status(406).send({
            status: false, msg: "Enter a valid fullName",
            validfname: "length of name in between(8-80) , you can't use any Number & Special character "
        })

        
        

        if (!isValidUrl.test(logoLink)) return res.status(406).send({
            status: false, message: "logoLink  is not valid",
            ValidUrl: "it must be a standard URL & it should be in following format gif|png|jpg|jpeg|webp|svg|psd|bmp|tif|jfif"
        }) 

        if (isDeleted == true) return res.status(400).send({ status: false, msg: "you can't delete while creating" })

        const saveData = await collegeModel.create(Data)
        res.status(201).send({ status: true, message: "college successfilly created", data: saveData })

    } catch (error) {
        res.status(500).send({ status: true, message: error.message })
    }

}

const collegeDetails = async function (req, res) {
    try {
        const collegeName = req.query.collegeName
       if(!isValid(collegeName)) return res.status(400).send({status: false, message: "Plese provide College Name That you wnat to see  "})
        const saveData = await collegeModel.findOne({ name: collegeName, isDeleted: false })
        if (!saveData) return res.status(404).send({ status: false, message: ` OOH!! OOHH!! college ${collegeName}  is not Exist` })
        const { name, fullName, logoLink } = saveData

        let interns = await internModel.find({ collegeId: saveData._id,isDeleted:false }).select({ _id: 1, name: 1, email: 1, mobile: 1 })
        if (interns.length == 0) interns = `No One apply Internship in ${collegeName} college`
        const collegeDetails = {
            name,
            fullName,
            logoLink,
            interns
        }

        res.status(200).send({ status: true, message: "I got this data according yor Query", data: collegeDetails })

    } catch (error) {
        res.status(500).send({ status: true, message: error.message })
    }

}



module.exports = { createCollege, collegeDetails }