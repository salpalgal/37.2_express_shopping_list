const express = require("express")
const app = express()
const ExpressError = require("./expressError")
const items = require("./fakeDb")
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
const itemsSample = [{"name":"candy","price":"10"},{"name":"milk","price":"10"}]
app.get('/items', function(req,res,next){
    try{
        return res.json({items})
    }catch(err){
        return next(err)
    }   
})

app.post('/items',function(req,res,next){
  try{
    let newItem = {name:req.body.name, price:req.body.price}
    items.push(newItem)
    return res.json({item:newItem})
  }catch(err){
    return next(err)
  }
    
})

app.get(`/items/:name`, function(req,res,next){
  try{
      let name = req.params.name 
      for(let item of items){
        if(item["name"]==name){
          return res.json(item)
      }  
    }
  }catch(err){
    return next(err)
  }
 })

app.patch('/items/:name',function(req,res,next){
  try{
    let foundItem = items.find(item => item.name == req.params.name)
    let index = items.indexOf(foundItem)
    const updated = Object.assign(foundItem, req.body)
    items[index] = updated
    return res.json(updated)
    }catch(err){
      return next(err)
    }
  })
app.delete('/items/:name',function(req,res,next){
  let foundItem = items.find(item => item.name == req.params.name)
  let index = items.indexOf(foundItem)
  items.splice(index,1)
  return res.json({"message":"deleted"})
})



app.use(function (req, res, next) {
    const notFoundError = new ExpressError("Not Found", 404);
    return next(notFoundError)
  });
  
  // generic error handler
app.use(function(err, req, res, next) {
    // the default status is 500 Internal Server Error
    let status = err.status || 500;
    let message = err.message;
  
    // set the status and alert the user
    return res.status(status).json({
      error: {message, status}
    });
  });

app.listen(3000,function(){
    console.log('app on port 3000')
})