var express = require("express");
var mysql = require("mysql");
var app = express();
var session = require("express-session");
var port = process.env.PORT || 3000;

app.listen(port,function(){
    console.log(`listening to the port no at ${port}`)
})

var dbConfigObj = {
//   host : "localhost",
//   user : "root",
//   password:"",
//   database:"store"
host : "sql6.freemysqlhosting.net",
user : "sql6432418",
password:"V69i5sZR3z",
database:"sql6432418"
 
}
var dbcon = mysql.createConnection(dbConfigObj);

dbcon.connect(function(err){
    if(err)
    console.log(err.message);
    else
    console.log("connected successfully")

});
app.use(express.static("public"));

app.get("/",function(req,resp){

resp.sendFile(process.cwd()+"/public/index.html");
   
})

app.get("/ajax-form",function(req,resp){
  

    
   
  var data=[req.query.email,req.query.password,req.query.mobile,req.query.Pref,req.query.Date];
  dbcon.query("insert into users values(?,?,?,?,CURRENT_DATE)",data,function(err){
          if(err)
              resp.write(err.message);
              else
              resp.write("Saved");
              resp.end();
  });
      
  })

  app.get("/ajax-form-login",function(req,resp){
   
      
    var data=[req.query.email,req.query.password,req.query.Pref];
    dbcon.query("select * from users where email=? and password=?",data,function(err,res){
      
          resp.send(res);
    });
        
    })

    //===============================================================

    



    // ==========================================================================================

    var fileuploading=require("express-fileupload");
var path=require("path");
app.use(fileuploading()); //inform nodejs about express-fileupload module
app.use(express.urlencoded({extended:true}));//used to convert post data to object in body
app.post("/profile-process",function(req,resp){
    

  
 //-----------------------
 //add in body object for saving in database
if(req.files==null)
req.body.picname="nopic.png";
else
{
    req.body.picname=req.files.ppic.name;
    //for saving the pic itself in Uploads folder
    var uploadingPath= path.join(process.cwd(),"public","uploads",req.files.ppic.name);
    req.files.ppic.mv(uploadingPath,function(err){
    if(err)
       console.log(err);
       else
       console.log("Uploaded");

});
}
//insert data in table
var data=[req.body.txtemail,req.body.txtname,req.body.txtadd,req.body.txtcity,req.body.txtcon,req.body.txtacard,req.body.picname];
dbcon.query("insert into profiles values(?,?,?,?,?,?,?)",data,function(err){
        if(err)
            resp.write(err.message);
            else
            resp.write("Saved .... Badhai");
            resp.end();
});
    
})
app.get("/ajax-check-email",function(req,resp){
    console.log(req.query.kuchUid);
    dbcon.query("select * from profiles where email=? ",[req.query.kuchUid],function(err,res){

     
       resp.send(res);
    
    })
    
})
// =================================================================================================

app.post("/doUpdate",function(req,resp){
  
     
  
  //add in body object for saving in database
  if(req.files==null)
  req.body.picname=req.body.savedPic;
  else
  {
      req.body.picname=req.files.ppic.name;
      //for saving the pic itself in Uploads folder
      var uploadingPath= path.join(process.cwd(),"public","uploads",req.files.ppic.name);
      req.files.ppic.mv(uploadingPath,function(err){
      if(err)
         console.log(err);
         else
        
         console.log("Uploaded");

  });
  }
  
    //insert data in table
    var data=[req.body.txtname,req.body.txtadd,req.body.txtcity,req.body.txtcon,req.body.txtacard,req.body.picname,req.body.txtemail];
    dbcon.query("update profiles set name=?,address=?,city=?,contact=?,acard=?,picname=? where email=?",data,function(err){
            if(err)
                resp.write(err.message);
                else
                resp.write("Updated .... Badhai");
                resp.end();
  })
  
  })
  
  app.get("/ajax-check-email",function(req,resp){
      console.log(req.query.kuchUid);
      dbcon.query("select * from profiles where email=? ",[req.query.kuchUid],function(err,res){
  
       resp.send(res);  //how many records will be sent: 1 or 0
      
      })
      
  })

 

// ================================================================================================



      
        app.post("/med-process",function(req,resp){
            
        
          
         //-----------------------
         //add in body object for saving in database
         if(req.files==null)
         req.body.picname="nopic.png";
        //  console.log("no pic");
         else
         {
             req.body.picname=req.files.ppic1.name;
             //for saving the pic itself in Uploads folder
             var uploadingPath= path.join(process.cwd(),"public","uploads",req.files.ppic1.name);
             req.files.ppic1.mv(uploadingPath,function(err){
             if(err)
                console.log(err);
                else
           
                console.log("Uploaded");
         
         });
         }
        //insert data in table
        var data=[req.body.rid,req.body.txtemail,req.body.txtmed,req.body.txtcom,req.body.txtexp,req.body.txtunit,req.body.txtqty,req.body.picname,req.body.txtstatus,req.body.txtcity];
        dbcon.query("insert into medecines values(?,?,?,?,?,?,?,?,CURRENT_DATE,?,?)",data,function(err){
                if(err)
                    resp.write(err.message);
                    else
                    resp.write("Saved");
                    resp.end();
        });
            
        })
 // =====================================================================================================

        app.get("/fetchProfiles",function(req,resp){
   
      
            // var data=[req.query.email,req.query.medname,req.query.company,req.query.expdate,req.query.unit,req.query.qty,req.query.picname,req.query.doa,req.query.status];
            dbcon.query("select * from medecines",function(err,res){
              
                  resp.send(res);
            });
                
            })
            app.get("/doDeleteProfile",function(req,resp){
                // console.log(req.query.uid);
            
                dbcon.query("delete from medecines where email=?",[req.query.email],function(err,res)
                {
                    if(err)
                    resp.send(err);
                    else
                    {
                      resp.send("Record Deleted Successfully");
                      //resp.send(res.affectedrows);  
                    }
                })
            })

// =====================================================================================================

            app.post("/neddy-details",function(req,resp){
            
               //insert data in table
               var data=[req.body.txtemail,req.body.txtname,req.body.txtadd,req.body.txtcity,req.body.txtano];
               dbcon.query("insert into neddydetails values(?,?,?,?,?)",data,function(err){
                       if(err)
                           resp.write(err.message);
                           else
                           resp.write("Saved");
                           resp.end();
               });
                   
               })
     // =====================================================================================================
               app.post("/neddy-update",function(req,resp){
            
                //insert data in table
                var data=[req.body.txtname,req.body.txtadd,req.body.txtcity,req.body.txtano,req.body.txtemail];
                dbcon.query("update neddydetails set Name=?,address=?,city=?,adno=? where email=?",data,function(err){
                    if(err)
                    resp.write(err.message);
                    else
                    resp.write("Updated......Done");
                    resp.end();
                });
                    
                })

// =====================================================================================================

                app.get("/fetchCity",function(req,resp){
   
      
                 
                    dbcon.query("select distinct city from medecines",function(err,res){
                      
                          resp.send(res);
                    });
                        
                    })

// =====================================================================================================
                    
                app.get("/fetchMed",function(req,resp){
   
      
                 
                    dbcon.query("select distinct medname from  medecines where city=?",[req.query.selcity],function(err,res){
                      
                          resp.send(res);
                    });
                        
                    })

// =====================================================================================================



          app.get("/ajax-needy",function(req,resp){
   
    dbcon.query("select * from neddydetails where email=?",[req.query.kuchemail],function(err,res){

     resp.send(res);  //how many records will be sent: 1 or 0
    
    })
    
})

// =====================================================================================================
app.get("/fetchData",function(req,resp){
   
    dbcon.query("select * from medecines where city=? and medname=?",[req.query.selCity,req.query.selMed],function(err,res){

     resp.send(res);  
    
    })
    
})

// =====================================================================================================

app.use(session({secret:"abc123"}));

app.use("/test-session",function(req,resp){
    if(req.session.count){
        // req.session.count++;
        resp.send("count: "+ req.session.count++);

    }else{
        req.session.count=1;
        resp.send("count: "+ req.session.count);
    }


})
// =======================================================================================================
app.get("/ajax-fetch",function(req,resp){
   
    dbcon.query("select * from profiles where email=?",[req.query.emailid],function(err,res){

     resp.send(res);  
    
    })
    
})



                   