class HtppError extends Error{
    constructor(message, statusCod){
        super(message);
        this.statusCod = statusCod;

    }
}

export default HtppError;