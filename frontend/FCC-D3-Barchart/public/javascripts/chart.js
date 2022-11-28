(function () {


  var theUrl = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json"

  $.ajax({
      type: "GET",
      url: theUrl,
      dataType: 'JSON',
      success: function (info) {


        var margin = {top: 20, right: 30, bottom: 30, left: 40};
        var width = 960 - margin.left - margin.right;
        var height = 500 - margin.left - margin.right;

        var data = info.data;
      // X axis
      var x = d3.scaleTime()
      .range([0, width])

      // y Axis
      var y = d3.scaleLinear()
      .range([height, 0]);

      // parse the date / time
      var parseDate = d3.timeFormat("%Y");


      var xAxis = d3.axisBottom(x)
      .tickFormat(function(d) {
           return parseDate(d);
         }).ticks(10)


      var yAxis = d3.axisLeft(y);

      // Chart container
      var chart = d3.select('.newChart')
        .attr('width', width + margin.left + margin.right)
        .attr("height", height + margin.left + margin.right)
          .append('g')
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        var dates = data.map(function (d) {
          return new Date(d[0]);
        })

      x.domain(
        d3.extent(dates, function (d) {
          return d;
        })


        /*
        data.map(function (d) {
          var string = d[0].split('-');
          var newDate = new Date(string[0], string[1], string[2]);
          return newDate;
        })
        */
      );
      console.log(x.domain());
      y.domain([0, d3.max(data, function (d) {return d[1]})])
      var barWidth = width / data.length;


      var div = d3.select("body").append("div")
          .attr("class", "tooltip")
          .style("opacity", 0.9);


      var bar = chart.selectAll('g')
        .data(data)
      .enter().append('g')
        .attr("transform", function(d, i) { return "translate(" + i * barWidth + ",0)"; });

      bar.append("rect")
        .attr("y", function(d) { return y(d[1]); })
        .attr("height", function(d) {
          // console.log(y(d[1]));
          return height - y(d[1]);
         })
        .attr("width", barWidth)
        .on("mouseover", function(d) {
         div.transition()
           .duration(200)
           // turns the element from  completely invisible to visible
           .style("opacity", .9);
         div.html(d[0] + "<br/>" + d[1])
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

        chart.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)

        chart.append("text")
          .attr("transform",
                "translate(" + (width/2) + " ," +
                               (height + margin.top + 20) + ")")
          .style("text-anchor", "middle")
          .text("Date");

        chart.append("g")
           .attr("class", "y axis")
           .call(yAxis)
        // END of AJAX CALL
    }
  });




})();
