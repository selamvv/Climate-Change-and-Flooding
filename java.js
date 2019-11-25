var promise = d3.csv("FinalProject/FloodingByClimateChange.csv")
    promise.then(function(data){
    
    console.log("data", data);
    console.log(data)
},
    function(err){
    console.log("fail", err)
})

var margin = { top: 30, right: 10, bottom: 30, left: 300 },
    width = 700 - margin.left - margin.right,
    height = 600 - margin.top - margin.bottom;
var formatTime = d3.timeFormat('%y');
var svg = d3.select('body')
    .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
var x = function(d) { return data.time; },
    xScale = d3.scaleTime().range([0, width]),
    xValue = function(data) { return xScale(x(data)); },
    xAxis = d3.axisBottom(xScale).tickFormat(formatTime);
var y = function(data) { return data.value; },
    yScale = d3.scaleLinear().clamp(true),
    y0Value = function(data) { return yScale(0); }
    y1Value = function(data) { return yScale(y(data)); };
var dimension = function(d) { return d.key; },
    dimensionScale = d3.scaleBand().range([0, height]).padding(0.05),
    dimensionValue = function(d) { return dimensionScale(dimension(d)); },
    dimensionAxis = d3.axisLeft(dimensionScale);
var horizonScale = d3.scaleQuantize()
    .range(d3.range(21));
var fill = function(data) { return data.yExtent[0]; },
    fillScale = d3.scaleLinear().range(['lavender', 'purple']).interpolate(d3.interpolateHcl),
    fillValue = function(data) { return fillScale(fill(data)); };
var area = d3.area()
    .x(xValue)
    .y0(y0Value)
    .y1(y1Value);
/*function parseTime(offset) {
    var date = new Date(2017, 0, 1); // chose an arbitrary day
    return d3.timeMinute.offset(date, offset);*/
 
    
    
    
    /*https://bl.ocks.org/armollica/7da151558db71ed679b818bbef002c88/*
    
    
    
    

/*var horizonChart = d3.horizonChart()
    .height(80)
    .title('Final Project: Flood increase due to Climate Change')
    .colors(['#313695', '#4575b4', '#74add1', '#abd9e9', '#fee090', '#fdae61', '#f46d43', '#d73027']);

var horizons = d3.select('body').selectAll('svg')
    .data([data])
    .enter()
    .append('svg')
    .attr('class', 'horizon')
    .each(horizonChart);

//set up the screen

 var screen = {width: 900, height: 700}*/