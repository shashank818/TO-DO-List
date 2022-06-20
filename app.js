const express= require("express");
const bodyParser = require("body-parser");
const dates = require(__dirname+"/date.js");
const app = express();




var items=["Buy Food" , "Cook Food"];
var workitems= [];
var editing =[];
app.set('view engine', 'ejs');

 app.use(bodyParser.urlencoded({extended:true}));
 app.use(express.static("public"));

app.get("/" , function(req ,res){

   let day = dates.getDate();
   res.render("list", {listTitle:day , NewListItems:items});

});

app.post("/" ,function(req,res){
     var item = req.body.newitem;

   if(req.body.list === "Work"){
     workitems.push(item);
     res.redirect("/Work");
   }
   else if(req.body.list === "Edit"){
     editing.push(item);
     res.redirect("/Edit");
   }
   else{
     items.push(item);
       res.redirect("/");
   }


});


app.get("/Work",function(req,res){
   res.render("list" ,{listTitle :"Work List" , NewListItems: workitems});
});

app.post("/Work" , function(req , res){
  let item = req.body.newitem;
  workitems.push(item);
  res.redirect("/Work");
});

app.get("/Edit",function(req,res){
  res.render("list" ,{listTitle : "Edit Item", NewListItems:editing});
});
app.post("/Edit", function(req,res){
  var item = req.body.newitem;
  editing.push(item);
  res.redirect("/Edit")
});

app.get("/about" ,function(req,res){
  res.render("about");
});

app.listen(3000 ,function(){
  console.log("working fine");
});
