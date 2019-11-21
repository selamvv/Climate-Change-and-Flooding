var dataPromise = d3.csv("Computer Science Flooding By Climate change.csv")
dataPromise.then(function(dataPromise){
    
    console.log("dataPromise", dataPromise);
    console.log(dataPromise)
},
    function(err){
    console.log("fail", err)
})
  


//set up the screen

 var screen = {width: 900, height: 700}