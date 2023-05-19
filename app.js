const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const bodyparser=require('body-parser');
const mongoose = require('mongoose');
const port = 8000;

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/complaintData');
    // data = await complaintData.complaint.find();
    //    const data = await Complaint.find()
    //     // const docs = JSON.parse(data)
    //     module.export = data;

  }



  // Define Mongoose Schema
const complaintSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    address: String,
    country: String,
    state: String,
    zip: String,
    ideas: String,
  });
  const Complaint = mongoose.model('Complaint', complaintSchema);


// EXPRESS SPECIFIC STUFF
app.use('/static',express.static('static'));// For servering static files
app.use(express.urlencoded());

// HBS SPECIFIC STUFF
app.set('view engine', 'hbs');// set the template engine as hbs
app.set('views',path.join(__dirname,'views'));// set the view directory

// ENDPOINTS
app.get('/',(req,res)=>{
    res.status(200).render('index.hbs');
});
app.get('/Suggestions',(req,res)=>{
    res.status(200).render('complaint.hbs');
});
app.get('/Ideas/Views', async (req,res)=>{
        data = await Complaint.find({})
        res.status(200).render('complaintPage2.hbs',{data:data});
    
});
app.get('/balanced_diet',(req,res)=>{
    res.status(200).render('balanced_diet.hbs');
});

app.post('/Suggestions',(req,res)=>{
    var myData = new Complaint(req.body);
    // documents();
    myData.save().then( async ()=>{
        // res.render('complaintPage2.hbs',{data:data})
        data = await Complaint.find({})
        //   res.redirect('/Ideas/Views',{data})
        res.render('complaintPage2.hbs', {data:data})
    }).catch(()=>{
        res.status(400).send("The item was not saved to the database");
    });
    // res.status(200).render('complaint.hbs');

});



// app.post('/balanced_diet',(req,res)=>{
//     var content = document.getElementById('conts').value
//     if(content>0 && content<=5){
//         res.redirect("https://www.bradford.gov.uk/media/1908/7-nutrition-guidelines-1-to-5-years.pdf")
//     }
// });



// START THE SERVER
app.listen(port,()=>{
    console.log(`The application started successfully on ${port}`);
});