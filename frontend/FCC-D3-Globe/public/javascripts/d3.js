(function () {
    var theUrl = "https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/meteorite-strike-data.json"
    var width = 2000;
    var height = 1000;

    const projection = d3.geoMercator().scale(300).translate([width/2, height/2])
    var context = d3.select("canvas").node().getContext("2d"),
        path = d3.geoPath(projection, context);

    var div = d3.select("body").append("div")
      .attr("class", "tooltip")
      .style("opacity", 0);

        d3.json("https://d3js.org/world-50m.v1.json", function(error, world) {
          if (error) throw error;

          context.beginPath();
          path(topojson.mesh(world));
          context.stroke();

            d3.json(theUrl, function (data) {

                var svg = d3.select('body').append('svg')
                  .attr('width', 2000)
                  .attr('height', 1000)

                var newData = data.features.map(function (ele, index) {
                  if (ele.geometry === null ) {
                    return ""
                  } else {
                    return ele;
                  }
                })

                newData = newData.filter(function (ele) {
                    return (ele !== "");
                  });

                var sortedData = newData.sort(function (a, b) {
                  return a.properties.mass - b.properties.mass;
                })

                var size = d3.scaleLinear()
                            .domain([0, sortedData[sortedData.length-1].properties.mass])
                            .range([3, 100])

                svg.selectAll('circle')
                  .data(newData)
                .enter().append('circle')
                  .attr('r', function (d) {
                  let value = parseInt(d.properties.mass);
                  return  size(value)
                  })
                  .attr("transform", function(d) {
                    return "translate(" + projection([ d.geometry.coordinates[0], d.geometry.coordinates[1]]) + ")";
                   }).on("mouseover", function(d) {
                       div.transition()
                         .duration(200)
                         // turns the element from  completely invisible to visible
                         .style("opacity", .7);
                       div.html(d.properties.name + "<br/>" + d.properties.id )
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

              });
      });



})();
