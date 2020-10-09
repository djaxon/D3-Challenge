// @TODO: YOUR CODE HERE!
d3.csv("assets/js/data.csv").then(function(journalismData) {
    console.log(journalismData);

    journalismData.forEach(function(d) {
        d.poverty=+d.poverty;
        d.healthcare=+d.healthcare;
        d.age=+d.age;
        d.income=+d.income;
        d.obesity=+d.obesity;
        d.smokes=+d.smokes;
    })

// set the dimensions and margins of the graph
var margin = {top: 30, right: 30, bottom: 50, left: 50},
    width = 800 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

// append the svg object to the body of the page
var svg = d3.select("#scatter")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

            // Add X Axis
var x = d3.scaleLinear()
            .domain([d3.min(journalismData, d=>d.smokes)*.75, d3.max(journalismData, d=>d.smokes)])
            .range([ 0, width ]);
            svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x));
            svg.append("text")
            .text("Smokes (%)")
            .attr("x", width/2 )
            .attr("y", height + margin.bottom )
            .classed("aText", true);
            
        
// Add Y axis
var y = d3.scaleLinear()
            .domain([d3.min(journalismData, d=>d.age)*.75, d3.max(journalismData, d=>d.age)])
            .range([ height, 0]);
            svg.append("g")
            .call(d3.axisLeft(y));
            svg.append("text")
            .text("Age (Yrs)")
            .attr("transform", "rotate(-90)")
            .attr("y", 0-margin.left*.75 )
            .attr("x", 0 - (height / 2))
            .classed("aText",true);
            
// Add dots
var gdots=  svg.selectAll("g.dot")
            .data(journalismData)
            .enter().append('g');
            gdots.append("circle")
            .attr("r", 14)
            .attr("cx", function (d) { return x(d.smokes); } )
            .attr("cy", function (d) { return y(d.age); } )
            .classed("stateCircle", true); 
            gdots.append("text")
            .text(function (d) {return (d.abbr);} )
            .attr("x", function (d) { return x(d.smokes); } )
            .attr("y", function (d) { return y(d.age); } )
            
            .classed("stateText", true);          
});

