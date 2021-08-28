const throwError = (errorMessage) =>{
    throw new Error(errorMessage)
}


const connectionString = process.env.CONNECTION_STRING ?? throwError("Connection String not defined")
module.exports = {connectionString};