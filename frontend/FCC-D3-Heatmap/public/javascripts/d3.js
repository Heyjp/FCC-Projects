(function () {
  console.log("It worksssss! YEs");

    var theUrl = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/global-temperature.json";

      $.ajax({
      type: "GET",
      url: theUrl,
      dataType: 'JSON',
      success: function (info) {

    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var data = info.monthlyVariance;

    var margin = {top: 80, right: 110, bottom: 110, left: 120},
        width = 960 - margin.left - margin.right,
        height = 600 - margin.top - margin.bottom;

      var colorScale = d3.scaleLinear()
        .domain([d3.min(data, function (d) {
          return d.variance;
        }),0, d3.max(data, function (d) {
          return d.variance;
        })]).range(['#313695',"#fee090",'#a50026']);


    var y = d3.scaleLinear()
      .range([0, height])
    var x = d3.scaleLinear()
    .range([0, width]);

    var xAxis = d3.axisBottom(x).ticks(25)
    var yAxis = d3.axisLeft(y).tickFormat(function (d) {
      return months[d - 1];
    });;

    var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

      var chart = d3.select('.svgChart')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
      .append('g')
        .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        x.domain([d3.min(data, function (d) {
          return d.year;
        }), d3.max(data, function (d) {
          return d.year;
        })]);
        y.domain([d3.min(data, function (d) {
          return d.month;
        }), d3.max(data, function (d) {
          return d.month;
        })]);

        chart.append('g')
          .attr('class', 'y axis')
          .call(yAxis)

        chart.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)


      var circle = chart.selectAll('circle')
          .data(data)
        .enter().append('g')
          .attr('class', '.chartRow')

          circle.append('rect')
          .attr("class", "bar")
          .attr("x", function (d) {
              return x(d.year)
          })
          .attr("y", function (d) {
              return y(d.month)
          })
          .attr("height", function (d) {
            return height - y(d.month);
          })
          .attr("width", function (d) {
            return width - x(d.year)
          }).attr("fill", function (d) {
            return colorScale(d.variance);
          }).on("mouseover", function(d) {
           div.transition()
             .duration(200)
             // turns the element from  completely invisible to visible
             .style("opacity", .7);
           div.html(d.year + " - " + months[d.month - 1]  + "<br/>" + d.variance + "<br/>" + (8.66 + d.variance).toFixed(3) + "℃")
           // returns horizontal and vertical page elements for the tooltip to be shown
             .style("left", (d3.event.pageX) + "px")
             .style("top", (d3.event.pageY - 28) + "px");
       })
     .on("mouseout", function(d) {
           // transforms the div back to invisible
           div.transition()
             .duration(500)
             .style("opacity", 0);
       });


       chart.append("text")
            .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
            .attr("transform", "translate("+ (0 - 60) +","+(height/2)+")rotate(-90)")  // text is drawn off the screen top left, move down and out and rotate
            .text("Month");

        chart.append("text")
            .attr("text-anchor", "middle")  // this makes it easy to centre the text as the transform is applied to the anchor
            .attr("transform", "translate("+ (width/2) +","+(height + 60)+")")  // centre below axis
            .text("Year");
console.log(data);

        // End of Ajax
        }
      });

})();


    /*
         HEAT MAP PLAN

    1) 2 Axis,
        X - Years
        Y - Months
    2) Values -
        Each month a value between 0 & 12.7, changes color based on
        difference of temperature from 8.66 - either hotter or colder
    3) Create X & Y axis based upon Month And Years
    4) Have chart completely fill area and split up into even blocks
    5) Tooltip on hover displaying, year month, average temperature & variance from base temperature
    6) Color index at bottom to show the variance visually.


    */
