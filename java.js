var promise = d3.csv("FloodingByClimateChange.csv")
    promise.then(function(data){
    console.log("data", data);
    setup(data)
        //drawGraph() function(d){return{data: parseFloat(d)}; },
},
    function(err){
    console.log("fail", err)
})
//setup
var screen = {width: 1280, height: 720};
var margins = {top: 30, right: 50, bottom: 50, left: 50};

var setup = function(data){
    d3.select("svg")
      .attr("width",screen.width)
      .attr("height", screen.height)
      .append("g")
      .attr("id", "graph")
      .attr("transform", "translate( "+margins.left+","+margins.top+")");

var width = screen.width - margins.left - margins.right;
var height = screen.height - margins.top - margins.bottom;
    
var xScale = d3.scaleLinear()
                .domain([0,21])
                .range([0,width])
var yTempScale = d3.scaleLinear()
                .domain([0,1])
                .range([(.25)*height,0])
var cScale = d3.scaleOrdinal(d3.schemeTableau10)
var xAxis = d3.axisBottom(xScale)
var yAxis = d3.axisLeft(yTempScale)
    
   d3.select(".axis")
    .append("g")
    .attr("id","xAxis")
    .attr("transform", "translate("+margins.left+","+(margins.top+height)+")")
    .call(xAxis)
    
    d3.select(".axis")
    .append("g")
    .attr("id","yAxis")
    .attr("transform", "translate(35,"+margins.top+")")
    .call(yAxis)
    
   drawGraph(data, xScale, yTempScale, cScale);
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
   
    
var drawGraph= function(data, xScale, yTempScale, cScale){
    var graph= d3.select("#graph")
                .selectAll("g")
                .data(data)
                .enter()
                .append("g")
                .attr("fill", "none")
                .attr("stroke", function(arr){
                    console.log("arr", arr.picture)
                    return cScale(arr.picture);
                })
                

var lineGenerator = d3.line()
        .x(function(data, index){
        return xScale(index)})
        .y(function(data) {
		return yTempScale(data)})
        .curve(d3.curveCardinal)

var line =lineGenerator(data);
    d3.select("g")
       
        .datum(function(obj){return (obj)})
        .append('path')
        .attr("d", line)
	
}