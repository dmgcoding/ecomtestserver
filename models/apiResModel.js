module.exports = (msg,isError,statusCode,data)=>{
    return {
        msg: msg,
        isError: isError,
        statusCode: statusCode,
        data: data
    }
}