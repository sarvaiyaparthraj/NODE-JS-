
    import mongoose from "mongoose";
    import bcrypt from "bcrypt";
    import jwt from "jsonwebtoken"

    const UserSchema = new mongoose.Schema({

        name:{
            type:String,
            required:true,
            trim:true
        },
        email:{
            type:String,
            required:true,
            trim:true,
            unique:true
        },
        password:{
            type:String,
            required:true,
            trim:true,
            minlength:6,
            validate:(value)=>{
                if(value.toLowerCase() === "password"){
                    return "password can't contain password word as password "
                } 
                message:"Password cannot contain the word 'password'."
            }
        },
        tokens:[
            {
                token:{
                    type:String,
                    required:true
                }
            }
        ]
        

    },{
        timeseries:true
    })


    UserSchema.pre("save", async function () {

        try{
            const user = this

            if (user.isModified("password")) {
            user.password = await bcrypt.hash(this.password, 10);
        }
        }catch(error){
            throw new Error(error.message)
        }
        
    });


    UserSchema.statics.findByCredential = async function (email, password) {
        console.log("Email received:", email);

        const user = await this.findOne({ email });

        console.log("User found:", !!user);

        if (!user) {
            throw new Error("Email not found in database");
        }

        console.log("Stored password hash:", user.password);

        const isMatched = await bcrypt.compare(password, user.password);

        console.log("Password matched:", isMatched);

        if (!isMatched) {
            throw new Error("Password does not match");
        }

        return user;
    };

    UserSchema.methods.generateAuthToken = async function () {

        try {

            const user = this;

            const token = jwt.sign({
                _id:user._id.toString()
            },
        process.env.JWT_SECRET,{
            expiresIn:"9d"
        }
        )

        console.log("token",token)
        
            if (!token) {
        throw new Error("failed to generate auth token");
        }

        
        user.tokens = user.tokens.concat({ token });

        await user.save();

        return token;

        } catch (error) {
            
            throw new Error(error.message)

        }
        
    }


    const User = mongoose.model("user model data",UserSchema);

    export default User;