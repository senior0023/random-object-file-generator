exports.genericResponse = (res, data, message, status, statusCode)=>{
  
    return res.status(statusCode || 200).json({
        status: status || 'success',
        message: message || '',
        data: data || {}
    });
}