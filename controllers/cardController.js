const db = require("../models"); 
const Card = db.cards

const cardSchema = require('../utils/validation').cardSchema

exports.requestCard = async(req, res) => {
    try{
        const {error} = cardSchema.validate(req.body)
        if(error){
            res.status(404).send({
                message : error.details[0].message
            })
            return;
        }
        const newCard = {
            user: req.user.id,
            name: req.body.name,
            delivered: false
        }
        await Card.create(newCard)
        res.status(201).send({
            message: "Card Request SUccesful!"
        })
    }catch(error){
        console.log(error)
        res.status(500).send({
            message:
                error.message || "Some error occurred"
        });
    }
}