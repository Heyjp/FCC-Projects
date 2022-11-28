(function () {

  var theUrl = "https://raw.githubusercontent.com/DealPete/forceDirected/master/countries.json";

    d3.json(theUrl, function (info) {

  var margin = {
    top: 40,
    right: 50,
    left: 50,
    bottom: 30
  }

    var width = "960" - margin.right - margin.left;
    var height = "600" - margin.top - margin.bottom;
    var radius = 6;

    var nodes = info.nodes; // Array of countries  & country codes
    var links = info.links; // Source is the starting country index in the node list & target is the end country index in node

    var chart = d3.select('.svgChart')
      .attr('height', height + margin.top + margin.bottom)
      .attr('width', width + margin.right + margin.left)


    var simulation = d3.forceSimulation()
    .force("link", d3.forceLink())
    .force("charge", d3.forceManyBody().strength(-10))
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force('collide', d3.forceCollide(10));

  var link = chart.selectAll("line")
    .data(links)
    .enter().append("line")
      .attr("stroke-width", 1)
      .attr('stroke', '#777')

  var node = chart.selectAll("image")
    .data(nodes)
    .enter().append("image")
      .attr("xlink:href", function (d) {
        return "icons/32/" + d.country + ".png";
      })
      .attr('width', 12)
      .attr('height', 12)
      .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));


  node.append("title")
      .text(function(d) {return d.country; });

  simulation
      .nodes(nodes)
        .on("tick", ticked);

  simulation.force("link")
      .links(links);

  function ticked() {
    link
        .attr("x1", function(d) {
           return d.source.x; })
        .attr("y1", function(d) { return d.source.y ; })
        .attr("x2", function(d) { return d.target.x ;})
        .attr("y2", function(d) { return d.target.y });

        node.attr("x", function(d) { return d.x = Math.max(radius, Math.min(width - radius, d.x)); })
            .attr("y", function(d) { return d.y = Math.max(radius, Math.min(height - radius, d.y)); });
  }

  function dragstarted(d) {
  if (!d3.event.active) simulation.alphaTarget(0.3).restart();
  d.fx = d.x;
  d.fy = d.y;
}

function dragged(d) {
  d.fx = d3.event.x;
  d.fy = d3.event.y;
}

function dragended(d) {
  if (!d3.event.active) simulation.alphaTarget(0);
  d.fx = null;
  d.fy = null;
}

    //END OF AJAX
  }
  });

})();
