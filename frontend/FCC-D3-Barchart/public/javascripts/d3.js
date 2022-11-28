(function () {
  console.log("It worksssss! YEs");

/*
 // GET THE DATA FOR THE BAR CHART
  $.ajax({
    type: "GET",
    url: theUrl,
    dataType: 'JSON',
    success: function (data) {
      console.log(data);
      var info = data.data;
      var columnNames = data.column_names;
      var startData = data.from_date;
      var endDate = data.to_date;
      var title = data.name;
    }
  });
*/


/*

d3.select("body")
  .selectAll("p") // Selects all the current p documents
  .data([4, 8, 15, 16, 23, 42]) // becomes the basis for new data being appended
  .enter().append("p")
   //  if number of p elements < length data, new P elements are appended to the doc
    .text(function(d) { return "I’m number " + d + "!"; }); //  = new p element text (param d corresponds to the element in the array of data)


// If you forget .enter or .exit, you will only get elements which exists corresponding data.
// i.e if there is one p element, then that p element will be transformed and no more created

*/

/*

var p = d3.select("body")
  .selectAll("p")
  .data([4, 8, 15, 16, 23, 42])
  .text(function (d) { return d; });

// enter

p.enter().append("p")
  .text(function(d) {return d });

// exit - removes excess p elements where data is present. length of data === 5, p elements === 5, if p elements === 6, 1 p element is then removed
p.exit().remove();

*/

// d3 transforms, not represents. Everything comes from web standards, for html css and svg.
// can style with external stylesheets.

/*
can use transitions / animations

d3.select("body").transition()
    .style("background-color", "black");

*/


// BAR CHART

/*
// Can either select single element, d3.select('div|.chart') (element or class)
var body = d3.selectAll('div');
var div = body.append('div');
div.html("hello world");
*/

/*
// Can method chain

var body = d3.select('body')
  .style('color', 'white')
  .style('background-color', 'black');

// method chaining can only descend. use var to keep references to selections


var section = d3.selectAll('section');

section.append('div')
  .html("first");

section.append('div')
  .html("second");
*/

/*

// FIRST BAR CHART

var data = [4, 8, 15, 16, 23, 42];

// Short hand form
d3.select('.divChart')
  .selectAll('div')
    .data(data)
  .enter().append('div')
    .style('width', function (d) { return d * 10 + "px"; })
    .text(function (d) { return d; })

// Long hand form
var chart = d3.select('.divChart'); // select element for chart
var bar = chart.selectAll('div'); // initiate data join by defining selection that will join data
var barUpdate = bar.data(data); // join selection to the data
var barEnter = barUpdate.enter().append('div'); // selection is empty, handle enter to represent new data, missing elements are appended to selection
barEnter.style("width", function (d) { return d * 10 + "px"}); // width of each barUpdate
barEnter.text(function (d) {return d}); // select the text content of each bar

// Scaling to Fit

var x = d3.scale.linear()
    .domain([0, d3.max(data)])
    .range([0, 420]);

var x = d3.scaleLiner()
  .domain([0, d3.max(data)]) // domain is the data, 0 for lowest, max is 42, 42 in the data var
  .range([0, 420]); // size of pixels

*/
/*

var data = [4, 8, 15, 16, 23, 42];

var width = 420,
  barHeight = 20;

var x = d3.scaleLinear()
  .domain([0, d3.max(data)])
  .range([0, width]);

var chart = d3.select('.svgChart')
  .attr("width", width)
  .attr('height', barHeight * data.length);

var bar = chart.selectAll('g')
  .data(data)
  .enter().append('g')
   .attr('transform', function (d, i) {
      return "translate(0," + i * barHeight + ")"; });

bar.append('rect')
  .attr('width', x)
  .attr("height", barHeight - 1);

bar.append('text')
  .attr('x', function (d) { return x(d) - 3 })
  .attr('y', barHeight / 2)
  .attr('dy', '.35em')
  .text(function (d) { return d; });

*/

/*

// SVG BAR CHART

var width = 420;
  barHeight = 20;

var x = d3.scaleLinear()
  .range([0, width]);

var chart = d3.select('.svgChart')
  .attr('width', width)

d3.tsv('data.csv', type, function(error, data) {
  console.log(data);
  x.domain([0, d3.max(data, function (d) { return d.value; })])

  chart.attr('height', barHeight * data.length);

  var bar = chart.selectAll('g')
    .data(data)
    .enter().append('g')
      .attr('transform', function (d, i) { return "translate(0," + i * barHeight + ")"; })

  bar.append('rect')
    .attr('width', function (d) { return x(d.value); })
    .attr('height', barHeight - 1);

  bar.append('text')
    .attr('x', function (d) { return x(d.value) - 3})
    .attr('y', barHeight /2)
    .attr('dy', '.35em')
    .text(function (d) { return d.value });
});

 // Gotcha name & value columsn have diff values (string / number). This becomes 2nd argument and cerces the value. default all values are strings.
function type(d) {
  d.value = +d.value;
  return d;
}

*/


// ROTATING THE BAR CHART

// Mostly involves swapping x with y. SVG offers great customizability.

// x scale to y scale becomes, [height, 0] rather than [0, width].
// SVG coordinates is from top-left corner. we want 0 positioned at bottom rather than top.
// position bar rects setting the y and height. before only needed to set width.

// previously barheight multippled by index of each point to produce fixed bar height
// chart depended on size of dataset
// chart width is fixed and bar width variable,
// now compute barwidth by diving the avilable chart width by the size of the dataset, data.length

// bar labels must be positioned differently, columns rather than bars centered below the top of the column.
// centered just blow top of the column, dy attribute value of ".75em" anchors label approximately the text cap height


/*

var width = 960,
height = 500;

var y = d3.scaleLinear()
  .range([height, 0]);

var chart = d3.select(".svgChart")
  .attr('width', width)
  .attr("height", height);

d3.tsv('data.csv', type, function (error, data) {
  y.domain([0, d3.max(data, function (d) {return d.value; })])

  var barWidth = width / data.length;

  var bar = chart.selectAll('g')
    .data(data)
    .enter().append("g")
      .attr('transform', function (d, i) {return "translate(" + i * barWidth + ",0)"; });

  bar.append('rect')
    .attr('y', function (d) { return y(d.value); })
    .attr("height", function (d) { return height-y(d.value); })
    .attr('width', barWidth - 1);

   bar.append('text')
    .attr('x', barWidth / 2)
    .attr('y', function (d) { return y(d.value) + 3})
    .attr('dy', ".75em")
    .text(function (d) {return d.value; });

})

  function type(d) {
    d.value = +d.value;
    return d;
  }

*/

/*

  // Encoding ordinal data data -

  // values compared by rank

  // convert a continous range into set of values using rangeBands && rangePoints.
  // rangeBands method computes range values so as to divide the chart area into evenly spaced bands.
  // rangePoints computers range values for a scatterplot
  // optional padding with rangebands

  var margin = {top: 20, right: 30, bottom: 30, left: 40},
      width = 960 - margin.left - margin.right,
      height = 500 - margin.top - margin.bottom;

      var chart = d3.select(".svgChart")
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom)
        .append("g")
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  var x = d3.scaleBand()
  .range([0, width])
  .paddingOuter(0.1);

  var y = d3.scaleLinear()
    .range([height, 0]);

    var xAxis = d3.axisBottom(x)
    var yAxis = d3.axisLeft(y)

  d3.tsv('data.csv', type, function (error, data) {
    x.domain(data.map(function (d) {return d.name; }));
    y.domain([0, d3.max(data, function (d) { return d.value })])


    var bar = chart.selectAll('g')
      .data(data)
      .enter().append('g')
      .attr('transform', function (d) { return 'translate(' + x(d.name) + ",0)"})

      chart.append('g')
      .attr('class', 'x axis')
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis)

      chart.append("g")
      .attr("class", "y axis")
      .call(yAxis);

      chart.selectAll('.bar')
        .data(data)
          .enter().append('rect')
          .attr('class', 'bar')
          .attr('x', function (d) { return x(d.name); })
          .attr('y', function (d) { return y(d.value); })
          .attr('height', function (d) { return height - y(d.value); })
          .attr('width', x.step())




  })
  function type(d) {
    d.value = +d.value;
    return d;
  }

*/

/*

// MARGINS

var width = 960,
  height = 500;

  var chart = d3.select('.svgChart')
    .attr('width', width)
    .attr('height', height);


var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    var chart = d3.select(".chart")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
      .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");





  // ADDING AXIS - defined by binding to existing x-scale and declaring one of four orientations


  var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

    chart.append('g')
    .attr('class', 'x axis')
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis)

    */

 // class so it can be styled.

// ==========================================================================================================================================
// =============================== WORKING BAR Chart
// ===========================================================================================================================================


// Object to set margin for the page. Chart axis range is width - margin. chart is width + margin.
var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

    // Constructs a scale - output range is continous and numeric.
    // Divides scale into uniform bands
    // Typically used for bar charts with ordinal and categorical dimension
    var x = d3.scaleBand()
    .range([0, width])
    .paddingOuter(0.1)

// Constructs new continous scale. Linear scales are good default choice for continous quantitative data. Preserve proportional differences.
// range values can be expressed as function of domain value.


// if range is specified sets scale to specified array of values. array must contain two or more elemtns.
// elements need not be numbers
// if range is not specifed returns copy of scale current range.
var y = d3.scaleLinear()
    .range([height, 0]);

// returns an axis for the given scale (x) with empty tick arguments
var xAxis = d3.axisBottom(x);

var yAxis = d3.axisLeft(y).tickArguments([10]);

// d3.select("") - finds single element on the dom .svgChart
// adds width and height attributes to it, + margin for the "canvas"
// g element is a container for svg
//
var chart = d3.select(".svgChart")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    // sets the container (g) by 40 pix right and 30 pix bottom - begins top right
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // tooltip div, sets stylings for it.
    var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0.9);

// takes data from data.csv file
d3.tsv("data.csv", type, function(error, data) {
  // maps the data of x to d.name
  x.domain(data.map(function(d) { return d.name; }));
  // maps the data of y from 0 to the highest value of data.value
  y.domain([0, d3.max(data, function(d) { return d.value; })]);

  // creates a g element for the x axis. 0 pix right and height value from the top.
  chart.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate(0," + height + ")")
      .call(xAxis);

  // creates a g element for the y axis. rotates 90 degrees so its from the top.
  // dy attribute indicates shift along the y axis on the position of an element or its content
  // y attribute indicates a y axis coordinate in the current svg coordinate system.
  chart.append("g")
      .attr("class", "y axis")
      .call(yAxis)
      .append("text")
      .attr("transform", "rotate(-90)")
      // Y, 6 - location of the text (frequency) along the y axis. from the axis to the right.
      .attr("y", 6)
      .attr("dy", ".71em")
      .style("text-anchor", "end")
      .text("Frequency")

    // selectsAll the elements with .bar / only .bar elements will be affected.
    // data is appended and for every missing .bar element a new (rect) with the class of bar is made
    // returns an x and y value
    // on mouseover
  chart.selectAll(".bar")
      .data(data)
    .enter().append("rect")
      .attr("class", "bar")
      .attr("x", function(d) {
        // console.log(x(d.name));
        return x(d.name); })
      .attr("y", function(d) {
      //  console.log(y(d.value))
        return y(d.value); })
      .attr("height", function(d) { return height - y(d.value); })
      .attr("width", x.step())
      .on("mouseover", function(d) {
       div.transition()
         .duration(200)
         // turns the element from  completely invisible to visible
         .style("opacity", .9);
       div.html(d.name + "<br/>" + d.value)
       // returns horizontal and vertical page elements for the tooltip to be shown
         .style("left", (d3.event.pageX) + "px")
         .style("top", (d3.event.pageY - 28) + "px");
       })
     .on("mouseout", function(d) {
       // transforms the div back to invisible
       div.transition()
         .duration(500)
         .style("opacity", 0.9);
       });

});
  function type(d) {
    d.value = +d.value; // coerce to number
    return d;
  }


})();
