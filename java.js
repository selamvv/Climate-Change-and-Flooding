var promise = d3.csv("FloodingByClimateChange.csv")
    promise.then(function(data){
    console.log("data", data);
    setup(data)
          console.log("selam")
},
    function(err){
    console.log("fail", err)
      
})
var screen = {width: 1280, height: 720};
var margins = {top: 50, right: 100, bottom: 50, left: 100};
//setup
var setup = function(dataArray){  
    d3.select("svg")
      .attr("width",screen.width)
      .attr("height", screen.height)
      .append("g")
      .attr("id", "graph")
      .attr("transform", "translate( "+margins.left+","+margins.top+")");

var width = screen.width - margins.left - margins.right;
var height = screen.height - margins.top - margins.bottom;
    
var xScale = d3.scaleLinear()
                .domain([0,22])
                .range([0,width]);
var yTempScale = d3.scaleLinear()
                .domain([0,1])
                .range([(.25)*height,0])
                 //.range([height,0])
//var ySeaRiseScale = d3.scaleLinear()
                      //.domain([0,21])
                      //.range([(.25)*height,0])    
var cScale = d3.scaleOrdinal(d3.schemeTableau10)
var xAxis = d3.axisBottom(xScale)
var yAxis = d3.axisLeft(yTempScale)
//var yAxis = d3.axisLeft(ySeaRiseScale)

d3.select("svg")
    .append("g")
    .classed("axis",true);
    
   d3.select(".axis")
    .append("g")
    .attr("id","xAxis")
    .attr("transform", "translate("+margins.left+","+(margins.top+height)+")")
    .call(xAxis)
    
    d3.select(".axis")
    .append("g")
    .attr("id","yAxis")
    .attr("transform", "translate(98,"+margins.top+")")
    .call(yAxis)  
    
   drawArray(dataArray,xScale,yTempScale,cScale);
   
}
   
   /*
    var ySeaScale = d3.scaleLinear()
                .domain([1,100])
                .range([(.25)*height,0])
    var yPercScale = d3.scaleLinear()
                .domain([-1,2])
                .range([(.25)*height,0])
    var yGlacScale = d3.scaleLinear()
                .domain([-20,-10])
                .range([height,0])
                } */
   
    
var drawArray= function(dataArray,xScale,yTempScale,cScale,){
    var arrays= d3.select("#graph")
                .selectAll("g")
                .datum(dataArray)
                //.data(dataArray)
                .enter()
                //.append("g")
                .attr("fill", "none")
                .attr("stroke", function(arr){
                    console.log("arr", arr.Year)
                    return cScale(arr.Year);
                })
                .attr("stroke-width",3)

 
}
var lineGenerator = d3.line()
        .x(function(d, Year){
        return xScale(Year)})
        .y(function(d) {
		return yTempScale(d.y)})

        .curve(d3.curveCardinal)
        //.y(function(num){
        //return ySeaRiseScale(Sea Rise)})

        .datum(function(data){console.log(data)
        return (dataArray)})
        .append('path') 
        .attr("d", lineGenerator)
	