class HttpError extends Error{
    constructor(message,statusCode)
    {
        super.(message);
        this.code=errorCode;
        this.status=errorCode;


    }
}

export default HttpError;