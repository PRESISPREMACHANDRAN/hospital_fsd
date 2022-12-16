const express=require('express');
const app=new express();

// get
const data=require("./data.json")
app.get("/hospital",(req,res)=>{
    res.send(data);

})


app.use(express.json());
//using post we are going to add a new hospital details to the data.
const fs=require('fs')
app.post('/hospital',(req,res)=>{
    data.push(req.body);
    fs.writeFile('data.json',JSON.stringify(data),(err,resp)=>{
        if(err){
            res.send('data cannot be written');
        }
        else{
            res.send('data written successfully')
        }

    })
    

})



// put

app.put('/hospital/:name',(req,res)=>{
    let name=req.params.name;
    data.forEach((item)=>{
        if(item.NameOfTheHospital==name){
            item.PatientCount=req.body.PatientCount;
            item.HospitalLocation=req.body.HospitalLocation;
        }
    })

    fs.writeFile('data.json',JSON.stringify(data),(err)=>{   //
        if(err){res.send('Data could not be updated')}
        else{res.send('data updated')}
    })
})


// del
app.delete('/hospital/:name',(req,res)=>{
    let name=req.params.name;

    let value=data.filter(item=>item.NameOfTheHospital!==name);
        fs.writeFile('data.json',JSON.stringify(value),(err,resp)=>{   
            if(err){res.send('Data could not be deleted')}
            else{res.send('data deleted')}
        })
})


app.listen(3006);
console.log('server listening to port 3006')