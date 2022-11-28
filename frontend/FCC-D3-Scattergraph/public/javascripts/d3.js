(function () {
  console.log("It worksssss! YEs");

  var theUrl = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json"

    $.ajax({
    type: "GET",
    url: theUrl,
    dataType: 'JSON',
    success: function (info) {

        // 1) Plot size of the graph
        var margin = {top: 20, right: 30, bottom: 30, left: 40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;
        // Make chart container area

        var chart = d3.select('.svgChart')
          .attr('width', width + margin.left + margin.right)
          .attr('height', height + margin.top + margin.bottom)
        .append('g')
          .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        // Axis
        var x = d3.scaleLinear()
        .range([0, width]);
        var y = d3.scaleLinear()
          .range([0, height]);

        var timeFormat = d3.timeFormat("%M:%S");
        var fastestTime = info[0].Seconds;

        // Define the axes
        var xAxis = d3.axisTop(x).ticks(10).tickFormat(function (d) {
          var time = calculateTime(fastestTime, d);
          return time;
        });
        var yAxis = d3.axisLeft(y);

        // X Data plotted
        x.domain([d3.max(info, function (d) {

          return d.Seconds;
        }) + 20, d3.min(info, function (d) {
          return d.Seconds;
        })]);

        // Y Data plotted

        y.domain([36, d3.min(info, function (d) {
          return d.Place;
        })])

        var circle = chart.selectAll('circle')
          .data(info)
        .enter().append('g');

        console.log(x.domain());

        circle.append('circle')
          .attr("r", 4)
          .attr("cx", function (d) {
              return x(d.Seconds)
          })
          .attr("cy", function (d) {
              return y(d.Place)
          })
          .style('fill', function (d) {
            if (d.Doping.length > 1) {
              return "red"
            } else {
              return "black"
            }

          })
          .on("mouseover", function(d) {
         div.transition()
           .duration(200)
           // turns the element from  completely invisible to visible
           .style("opacity", 0.7);
         div.html(d.Name + ":" + d.Nationality + "<br/>" + "Time: " + d.Time + "<br/>" + "Place: " + d.Place + "<br/>" + "Reason :" + "<br/>" + d.Doping)
         // returns horizontal and vertical page elements for the tooltip to be shown
         })
       .on("mouseout", function(d) {
         // transforms the div back to invisible
         div.transition()
           .duration(500)
           .style("opacity", 0);
         })

         circle.append('text')
           .attr("x", function(d){return x(d.Seconds) + 100})
           .attr("y", function(d) {
             return y(d.Place) + 4;
           })
           .text(function (d) {
             return d.Name;
           });

        chart.append('g')
          .attr('class', 'y axis')
          .call(yAxis)

        chart.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)

        // Tooltip

        var div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);

      }

    });

/*
    //Create a scatterplot Graph
    // 2 Axis
      // X axis - Minutes behind fastest time
      // Y Axis - Ranking
    // Data inverted
      // Ranking lowest to highest - Y
      // Minutes behind Fastest Time, left to right - X
    // Data plotted with circles + name


    // 1) Plot size of the graph

    var margin = {top: 20, right: 30, bottom: 30, left: 40},
    width = 960 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;
    // Make chart container area

    var chart = d3.select('.chart')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
    .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // Axis
    var x = d3.scaleTime()
    .range([0, width]);
    var y = d3.scaleLinear()
      .range([height, 0]);


    x.domain(d3.max(info, function (d) {return d.seconds; }), d3.min(info, function (d) {return d.second; }));
    y.domain([36, d3.min(info, function (d) {
      return d.place;
    })])

    */



    function calculateTime(fastestTime, time) {
      var difference = time - fastestTime;
      var minutes = Math.floor(difference / 60);
      var seconds = difference - minutes * 60;
      return "0" + minutes + ":" + seconds;
    }





})();
