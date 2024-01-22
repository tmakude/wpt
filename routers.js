const express=require("express");
var myrouter=express.Router();
//connection is same as mysqlconnection in dbconnet.js
var connection=require("../db/dbconnect")

//to display all products in tabular form
myrouter.get("/products",function(req,resp){
    connection.query("select * from product",(err,data,fileds)=>{
        if(err){
            resp.status(500).send("no data found");
        }
        else{
            //to create table view using data, write file
            //index.ejs in view folder, to access the file write as follows
            resp.render("index",{proddata:data})
        }
    })

});

//to display empty form to accept new product
myrouter.get("/addproduct",function(req,resp){
    resp.render("add-prod")
})

//to add new product in the table
myrouter.post("/insertprod",function(req,resp){
    connection.query("insert into product values(?,?,?,?)",[req.body.pid,req.body.pname,req.body.qty,req.body.price],(err,result)=>{
        if(err){
            resp.status(500).send("no data added");
        }else{
            resp.redirect("/products")
        }

    })
});

myrouter.get("/deleteprod/:prodid",function(req,resp){
    connection.query("delete from product where pid=?",[req.params.prodid],(err,result)=>{
        if(err){
            resp.status(500).send("no data deleted");
        }else{
            resp.redirect("/products")
        }
    })
})



//it will pass the reference of myrouter in router variable of app.js file
module.exports=myrouter;