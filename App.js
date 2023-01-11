const express=require('express');
const app=express();
const port=7006
const mysql =require('./connection').con
app.set("view engine","hbs");
app.set("views","./view")
app.use(express.static(__dirname + "/public"))
app.get("/",(req,res)=>{
    res.render("index")
});
app.get("/add",(req,res)=>{
    res.render("add")

});
app.get("/search",(req,res)=>
{
    res.render("search")
});
app.get("/update",(req,res)=>
{
       res.render("update")
});
app.get("/delete",(req,res)=>{
    res.render("delete")
});
app.get("/view",(req,res)=>{
    let qry ="select * from spring";
    mysql.query(qry,(err,results)=>{
        if(err) throw err
        else{
            res.render("view",{data:results});
        }
    });
});
app.get("/adduser",(req,res)=>{
    const{empid,empname,empDes,empdep,empsal,emploc}=req.query
    let qry="select * from spring where empid=?";
        mysql.query(qry,[empid],(err,results)=>{
        if(err)
         throw err
          else{
            if(results.length>0){
                res.render("add",{checkmesg:true})

           }
           else{
            let qry2="insert into spring values(?,?,?,?,?,?)";
            mysql.query(qry2,[empid,empname,empDes,empdep,empsal,emploc],(err,results)=>{
                if (results.affectedRows > 0){
                    res.render("add",{mesg:true})
                }
            })
           }
        }
    })
});
app.get("/searchuser",(req,res) =>{
    const{empid} =req.query;
    let qry="select * from spring where empid=?";
    mysql.query(qry,[empid],(err,results) =>{
        if(err) throw err
        else{
            if (results.length > 0){
                res.render("search",{mesg1:true,mesg2:false})

            }
            else{
                res.render("search",{mesg1:false,mesg2:true})
            }
        }
    });
})
app.get("/updatesearch",(req,res)=>{
    const {empid}=req.query;
    let qry="select * from spring where id=?";
    mysql.query(qry,[empid],(err,results)=>{
        if(err) throw err
        else{
         if(results.length > 0) {
            res.render("update",{mesg1:true,mesg2:false, data: results})
         }else{
            res.render("update",{mesg1: false,mesg2:true,data:results})
         }
        }
    });
})
app.get("/updateuser",(req,res)=>{
    const{empid,emploc} =req.query;
    let qry="update spring set  emploc=? where empid=?";
    mysql.query(qry,[emploc,empid],(err,results)=>{
        if(err) throw err
        else{
            if(results.affectedRows>0){
                res.render("update",{umesg:true})
            }
        }
    })
});
app.get("/removeuser",(req,res)=> {
    const{empid}=req.query;
    let qry="delete from spring where empid=?";
    mysql.query(qry,[empid],(err,results)=>{
        if (err) throw err
        else{
            if(results.affectedRows > 0){
                res.render("delete",{mesg1:true,mesg2:false})
            }else{
                res.render("delete",{mesg1:false,mesg2:true})
            }
        }
    });
})

app.listen(port,(err) =>{
    if(err)
     throw err
     else
     console.log("server is listening at port %d:",port);
});


