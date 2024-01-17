const express = require('express');

const router = new express.Router();
const items = require("../fakeDb")

router.get('/', function(req,res,next){
    try{
        return res.json({items})
    }catch(err){
        return next(err)
    }   
})

router.post('/',function(req,res,next){
  try{
    let newItem = {name:req.body.name, price:req.body.price}
    items.push(newItem)
    return res.json({item:newItem})
  }catch(err){
    return next(err)
  }
    
})

router.get(`/:name`, function(req,res,next){
  try{
      let name = req.params.name 
      
      for(let item of items){
        if(item["name"]==name){
          return res.json(item)
      }else{
        throw{message: "Not Found", status :404}
      }
    }
  }catch(err){
    return next(err)
  }
 })

router.patch('/:name',function(req,res,next){
  try{
    let foundItem = items.find(item => item.name == req.params.name)
    if (foundItem === undefined) {
      throw {message: "Not Found", status: 404}
    }
    let index = items.indexOf(foundItem)
    const updated = Object.assign(foundItem, req.body)
    items[index] = updated
    return res.json(updated)
    }catch(err){
      return next(err)
    }
  })
router.delete('/:name',function(req,res,next){
  try{
    let foundItem = items.find(item => item.name == req.params.name)
    if (foundItem === undefined) {
      throw {message: "Not Found", status: 404}
    }
    let index = items.indexOf(foundItem)
    items.splice(index,1)
    return res.json({"message":"deleted"})
  }catch(err){
    return next(err)
  }
  
})

module.exports = router;