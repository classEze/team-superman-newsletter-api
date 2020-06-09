// Setup Express
const express=require('express');
const app=express();

//Setup morgan
const morgan=require('morgan');

//Setup body-parser
const bodyParser=require('body-parser');

app.use(morgan('dev'));

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

//Enabling CORS
app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header("Access-Control-Allow-Headers",
    "Origin, x-Requested-Width,Content-Type,Accept,Authorization,X-Pagination");
    if(req.method==='OPTIONS'){
        res.header("Access-Control-Allow-Methods",
        "PUT,POST,PATCH,GET,DELETE");
        return res.status(200).json({});
    }
    next();
});

//middleware pipeline
app.post("/sendemail", (req,res,next)=>{
    const news={
        name:req.body.name,
        content:req.body.content
    };
    console.log(news);

    // Get all emails
    // Send news to all emails

    res.json({
        message:"sent to all emails"
    });
});

//Error Handling
app.use((req, res, next)=>{
    const error = new Error("Not found");
    error.status=404;
    next(error);
});

app.use((error,req,res,next)=>{
    res.status(error.status || 500).json({
        error:{
            message:error.message
        }
    });
});

module.exports=app;