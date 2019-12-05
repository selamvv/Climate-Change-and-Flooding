var promise = d3.csv("FloodingByClimateChange.csv")
    promise.then(function(data){
    
        console.log("data", data);
    setup(data)
       
                                },
    function(err){
    console.log("fail", err)
                    })

var screen = {width: 1280, height: 720};
var margins = {top: 10, right: 50, bottom: 50, left: 50};

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
    
    d3.select("svg")
  .append("text")             
  .attr("transform","translate(" + (width/2) + " ," + 
    (height + margins.top + 50) + ")")
  .style("text-anchor", "middle")
  //.style("font-size", "34px")
  .text("Year");
  
    
    d3.select("svg")
  .append("text")             
  .attr("transform", "rotate(-90)")
  .attr("yAxisLeft", 0 - margins.left)
  .attr("x",0 - (height / 2))
  .attr("dy", "1em")
  .style("text-anchor", "middle")
  .text("Glaciers (inches)"); 
    
     d3.select("svg")
  .append("text")             
  .attr("transform","translate(1200, 700) rotate(90)")
  .attr("yAxisRight", 0 - margins.right)
  .attr("x",0 - (height / 2))
  .attr("dy", "1em")
  .style("text-anchor", "middle")
  .text("Percipitation(inches)/Tempeture(Celsius)"); 
    
      d3.select("svg")
  .append("text")             
  .attr("transform","translate(1250, 700) rotate(90)")
  .attr("yAxisRight1", 0 - margins.right)
  .attr("x",0 - (height / 2))
  .attr("dy", "1em")
  .style("text-anchor", "middle")
  .text("Sea Rise (inches)"); 
    
      
    
var parseTime = d3.timeParse("%y");

    
    
// Create scale and set the domain and ranges   
var xScale = d3.scaleLinear()
                .domain([1993,2014])
                .range([0,width]);
    
var y0 = d3.scaleLinear()
                .domain([-30,-10])
                .range([height,0])  
var y1 = d3.scaleLinear()
                .domain([1,100])
                .range([height, 0]);
var y2 = d3.scaleLinear()
                .domain([-2,3])
                .range([height, 0]);
 
// Add scales to axis
var cScale = d3.scaleOrdinal(d3.schemeTableau10)

var xAxis = d3.axisBottom(xScale)

var yAxisLeft = d3.axisLeft().scale(y0)
                // .orient("left").ticks(5);
var yAxisRight = d3.axisRight().scale(y1)
                   //.orient("right").ticks(5);
var yAxisRight1 = d3.axisRight().scale(y2)

//Append group and insert axis 

/*d3.select("#graph")
   .append("g")
   .classed("axis",true);
   */
d3.select("#graph")
    .append("g")
    .attr("id","xAxis")
    .attr("transform", "translate(-.5"+margins.left+","+(margins.top+height)+")")
    .style("font-size", "15px")
    .call(xAxis)
    
d3.select("#graph")
    .append("g")
    .attr("id","yAxisLeft")
    .attr("transform", "translate(-.5"+margins.top+")")
    .call(yAxisLeft) 
    .attr("stroke", "red")
    

d3.select("#graph")
    .append("g")
    .attr("id","yAxisRight")
    .attr("transform", "translate(1200,"+margins.top+")")
    .call(yAxisRight)
    
    
d3.select("#graph")
    .append("g")
    .attr("id","yAxisRight1")
    .attr("transform", "translate(1150,"+margins.top+")")
    .call(yAxisRight1)
    .attr("stroke", "green")
    
var valueline = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y0(d.close); });  
var valueline1 = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y1(d.open); });
var valueline2 = d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y2(d.open); });
    //.on("hover", function(d){
     //   d3.select("#hoverbox")
    //    .text("something")
        
    
    
    drawArray(dataArray,xScale,y0,y1, y2, cScale);
}    

 
var drawArray= function(dataArray,xScale,y0, y1, y2, cScale){
    
    var arrays= d3.select("#graph")
                .selectAll("g")
                .data(dataArray)
                .enter()
                .append("g")
                .attr("fill", "none")
                .attr("stroke", function(arr){
                    //console.log("selam")
                    return  cScale(parseTime(arr.Year.replace(/,/g, '')))
                })
                .attr("stroke-width",5)
                .attr("transform", "translate(10,10)")

//Create curved line
    
    var lineGenerator = d3.line()
        .x(function(d,i){
        return xScale(parseInt(d.Year))})
        .y(function(d) {
            console.log(d)
		return y2(parseFloat(d["GCAG (Temp)"] ))})
        .curve(d3.curveCardinal)
         
    var line2=d3.line()
        .x(function(d,i){
        return xScale(parseInt(d.Year))})
        .y(function(d) {
		return y1(parseFloat(d["GMSL (Sea Rise)"] ))})
        .curve(d3.curveCardinal)
       
    var line3=d3.line()
        .x(function(d,i){
        return xScale(parseInt(d.Year))})
        .y(function(d) {
		return y2(parseFloat(d["Global precipitation anomaly (inches) (Percipitation)"] ))})
        .curve(d3.curveCardinal)  
    
     var line4=d3.line()
        .x(function(d,i){
        return xScale(parseInt(d.Year))})
        .y(function(d) {
		return y0(parseFloat(d["Glaciers"] ))})
        .curve(d3.curveCardinal)     

//uses the bound data to find the array to attach     
    d3.select("#graph")
        .append('path') 
        .datum(dataArray)
        .attr("d", lineGenerator)
        .attr("fill", "none")
        .attr("stroke", function(arr){
                    return cScale(arr.Year);
                })
         .attr("stroke", "lightgreen")
        .attr("stroke-width",5)
    .on("mouseover", function(d, i){
        d3.select("#hoverbox")
        .attr("transform", "translate(1355, 10)")
        //.transition()
        .text("Temperature; The rate of the rise in temperature; gathered from the Global Historical Climatology Network-Monthly (GHCN-M) data set")})
        
    d3.select("#graph")
        .append('path') 
        .datum(dataArray)
        .attr("d", line2)
        .attr("fill", "none")
        .attr("stroke", function(arr){
             return cScale(arr.Year);
               })
        .attr("stroke", "blue")
        .attr("stroke-width",5)
    .on("mouseover", function(d, i){
        d3.select("#hoverbox")
        .attr("transform", "translate(1355, 10)")
        //.transition()
        .text("Sea Rise; data from the US Environmental Protection Agency, shown is the average absolute sea level change: the height of the ocean surface. ")
        .attr("stroke", "red")
    })
     d3.select("#graph")
        .append('path') 
        .datum(dataArray)
        .attr("d", line3)
        .attr("fill", "none")
        .attr("stroke", function(arr){
                    return cScale(arr.Year);
                })
        .attr("stroke", "green")
         .attr("stroke-width",5)
    .on("mouseover", function(d, i){
        d3.select("#hoverbox")
        .attr("transform", "translate(1355, 10)")
        //.transition()
        .text("Percipitation; Global precipitation anomaly compared with the average precipitation; data gathered from National Oceanic & Atmospheric Administration (NOAA)")
        .attr("stroke", "red")})
         
    d3.select("#graph")
        .append('path') 
        .datum(dataArray)
        .attr("d", line4)
        .attr("fill", "none")
        .attr("stroke", function(arr){
                    return cScale(arr.Year);
                })
         .attr("stroke", "red")
        .attr("stroke-width",5)
        .on("mouseover", function(d, i){
        d3.select("#hoverbox")
        .attr("transform", "translate(1355, 10)")
        .transition()
        .text("Glaciers; Data from WGMS (World Glacier Monitoring Service) – 125 glaciers in 25 countries/regions, representing tier 2 and 3 sites. ")
        
    })
}