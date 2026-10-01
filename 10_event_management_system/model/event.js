import mongoose  from "mongoose";


const EventSchema = new mongoose.Schema({

    EventName:{
        type:String,
        required:true,
        trim:true
    },  
    EventDescription:{
        type:String
    },
    EventImg:{
        type:[String]
    },
    EventPoster:{

        type:String,
        required:true
    },
    EventBanner:{
        type:String
    },
    EventSpeakers:{
        type:[String]
    },
    EventPrice:{
        type:Number,
        required:true
    },
    EventDocument:{
        type:[String],
        required:true
    }


})

const event = mongoose.model("Event Data",EventSchema);

export default event;