var promise = d3.csv("FinalProject/FloodingByClimateChange.csv")
    promise.then(function(data){
    
    console.log("data", data);
    console.log(data)
},
    function(err){
    console.log("fail", err)
})
  


//set up the screen

 var screen = {width: 900, height: 700}