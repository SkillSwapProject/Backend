const mymongo = require("mongoose")
const userSchema = mongo.Schema
({password:number})

const UserSchema = mymongo.model("user", userSchema, "user");

module.export = UserSchema