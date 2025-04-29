

const mymongo = require("mongoose")

const serviceSchema = mymongo.Schema({
    _id:mymongo.Types.ObjectId,
     description:string,
     name:string
})

const serviceModel = mymongo.model("Service", serviceSchema, "services");

module.exports = serviceModel