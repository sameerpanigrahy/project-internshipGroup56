const express = require('express');
const router = express.Router();

const {createCollege,collegeDetails}=require("../controllers/collegeController")
const {createIntern}=require("../controllers/internController")


router.get("/test-me" , function(req,res){
    res.status(200).send({status:true,message:"Testing API"})
})

//----------------------------college Creation API--------------------//
router.post("/functionup/colleges",createCollege)


//--------------------------Intern creation API----------------------//
router.post("/functionup/interns",createIntern)


//---------------------API for college Details-----------------------//
router.get("/functionup/collegeDetails",collegeDetails)

//---------------------------------------------------------------------------------------//

router.all("/*", (req, res) => { res.status(400).send({ status: false, message: "Endpoint is not correct" }) })


module.exports = router