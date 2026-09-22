class httpError extends Error{

    constructor(massage,statusCode){

        super(massage);
        statusCode = statusCode;
    }
}

export default httpError;