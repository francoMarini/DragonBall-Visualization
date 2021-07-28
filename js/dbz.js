var links = [];
var nodes = [];
var s, t = null;
var svgSize = null;
var statusSelector = null;
var svgSize = null;
var svg=null;

// Variabili per mostrare e nascondere le relazioni

var showTransformation = true;
var showCreate = true;
var showFamily = true;
var showFight = false;
var showAlliance = true;


function play() {

    d3.json("../data/DBZ.json", function(data) {

        nodes = data["nodes"];


        links=[]

        data["links"].forEach(link => {
            if (link.relation=="create" && showCreate)
              links.push(link);
            if (link.relation=="family" && showFamily)
              links.push(link);
            if (link.relation=="alliance" && showAlliance)
              links.push(link);
            if (link.relation=="fight" && showFight)
              links.push(link);
            if (link.relation=="transformation")
              links.push(link);
        });

        links.forEach(link => {
            link.source = parseInt(link.source);
            link.target = parseInt(link.target);
        });


        var notUniqueRelations = [];
        links.forEach(elem => {
            notUniqueRelations.push(elem.relation);
        })

        var relations = deleteDuplicates(notUniqueRelations);

        svg = d3.select("body").append("svg")
            .attr("id", "graph")
            .call(d3.behavior.zoom().on("zoom", function () {                     // Implementazione Zoom
                svg.attr("transform", " scale(" + d3.event.scale + ")")
            }))

        var defs = svg.append('svg:defs');
        nodes.forEach(element => {
            defs.append('svg:pattern')
                .attr('id', "image-" + element.id)
                .attr('width', 1)
                .attr('height', 1)
                .attr("patternContentUnits", "objectBoundingBox")
                .append('svg:image')
                .attr('xlink:href', "../data/imgs/" + element.name + ".jpg")
                .attr('x', 0)
                .attr('y', 0)
                .attr('width', 1)
                .attr('height', 1)
                .attr("preserveAspectRatio","xMinYMin slice");
        });

        svgSize = document.getElementById('graph').getBoundingClientRect();


        var force = d3.layout.force()
        .nodes(d3.values(nodes))
        .links(links)
        .size([svgSize.width, svgSize.height])
        .linkDistance(function(link) {
            if (link.relation=="transformation")   // Gli archi relativi alle trasformazioni saranno più corti
               return 30;
            return 60;
        })
        .charge(-450)
        .gravity(0.34)
        .on("tick", tick)
        .start();

        var link = svg.selectAll(".link")
            .data(force.links())
            .enter().append("line")
            .attr("class", function(d) {
                var source = d.source.id.toString();
                var target = d.target.id.toString();
                return ("link s" + source + " t" + target + " " +  d.relation);
            })


        var node = svg.selectAll(".node")
            .data(force.nodes())
            .enter().append("g")
            .attr("class", function(d) {
                if (d.type != undefined) {
                    console.log("node " + d.type.replace(/\s+/g, '').replace(/'/, ''))
                    return "node " + d.type.replace(/\s+/g, '').replace(/'/, '');}
                else return "node none";
            })
            .attr("id", function(d) {
               return "node-" + d.id;
            })
            .on("mouseover",nodeMouseover)
            .on("mouseout", nodeMouseout)
            .call(force.drag);


        svg.selectAll(".node").append("circle")
            .attr("class", function(d) {
                return d.type;
            })
            .attr("r", function(d) {
              if (d.state== "t") {
                return 10;
              }
                return 20;
            })
            .style("fill",function(d) {
                return "url(#image-" + d.id +")";
            })
            .style("stroke", "#fff")
            .style("stroke-width", "1px");

      node.append("text")
          .attr("x", 30)
          .attr("dy", ".35em")
          .text(function(d) { return d.name; })
          .style("fill", "white")
          .style("font-size", "25px")
          .style("visibility", "hidden");

        function tick() {
            link
                .attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });

            node
                .attr("transform", function(d) {
                    return "translate(" + d.x + "," + d.y + ")";
                });
        }


    });
}

function nodeMouseover() {
    var thisNode = d3.select(this);
    var nodeId = thisNode.attr("id").toString().replace("node-", "");
    var linkCssClass = ".link.s" + nodeId + ",.link.t" + nodeId;

    d3.select(this).select("circle")
        .transition()
        .duration(400)
        .attr("transform", "scale(2)")
        .style("stroke",function(d) {
            if(d.type == "Super Saiyan") {
                return "yellow";
            }
            if(d.type == "Fusion") {
                return "blue";
            }
            else return "grey";
        })
        .style("stroke-width", "2px");

    d3.select(this).select("text")
        .transition()
        .duration(400)
        .attr("x","80")
        .style("visibility", "visible")
        .style("font-size", "40px");


    d3.selectAll(linkCssClass)
        .classed("highlight", true)
        .transition()
        .duration(400)
        .style("opacity", "0.3")
        .each("end", function(d) {
            console.log(d);
        })

    d3.select(this)
        .transition()
        .duration(400)
        .style("opacity", "1");
}

function nodeMouseout() {
    d3.select(this).select("circle").transition()
        .duration(400)
        .attr("transform", "scale(1)")
        .style("stroke","white")
        .style("stroke-width", "1px");
    d3.select(this).select("text").transition()
        .duration(400)
        .attr("x","30")
        .style("visibility", "hidden")
        .attr("fill", "black")
        .style("font-size", "25px");

    d3.selectAll(".link")
        .classed("highlight", false)
        .transition()
        .duration(400)
        .style("opacity", "1");
    d3.selectAll(".node").filter(function(d) {return d})
        .transition()
        .duration(400)
        .style("opacity", "1");
}

function relationMouseover() {
    var relationLink = this.textContent.toLowerCase();
    d3.select(this)
        .style("stroke","black");
    d3.selectAll(".link." + relationLink)
        .classed("highlight", true);
    d3.selectAll(".node")
        .transition()
        .duration(400)
        .style("opacity", "0.3");
}

function relationMouseout() {
    d3.select(this)
        .style("stroke","");
    d3.selectAll(".link")
        .classed("highlight", false);
    d3.selectAll(".node")
        .transition()
        .duration(400)
        .style("opacity", "1");
}

function deleteDuplicates(array) {
    return array.filter(function(item, pos) {
        return array.indexOf(item) == pos && item != undefined;
    })
}


function showHideCreate(){
    showCreate = !showCreate;
    svg.remove();
    play();

}

function showHideFamily(){
    showFamily = !showFamily;
    svg.remove();
    play();

}


function showHideFight(){
    showFight = !showFight;
    svg.remove();
    play();
}

function showHideAlliance(){
    showAlliance = !showAlliance;
    svg.remove();
    play();

}

function statusMouseover(status) {
console.log("ce entro");
    if (status == "Saiyan") statusSelector = ".Fusion, .Namekian, .Dragon, .Android, .none";
    else if (status == "Fusion") statusSelector =".Saiyan, .Namekian, .Dragon, .Android, .none";
    else if (status == "Namekian") statusSelector =".Saiyan, .Fusion, .Dragon, .Android, .none";
    else if (status == "Dragon") statusSelector =".Saiyan, .Namekian, .Fusion, .Android, .none";
    else if (status == "Android") statusSelector =".Saiyan, .Namekian, .Dragon, .Fusion, .none";
    else statusSelector = ".Saiyan, .Namekian, .Dragon, .Android, .Fusion";

    d3.selectAll(statusSelector).select("circle")
        .transition()
        .duration(400)
        .style("opacity", "0.3")
        .attr("transform", "scale(1)")
        .style("stroke", "#fff");

    d3.selectAll("." + status).select("circle")
        .transition()
        .duration(400)
        .style("opacity", "1")
        .style("stroke", function()  {
            if (status=="Saiyan") return "red";
            if (status=="Namekian") return "green";
            if (status=="Dragon") return "white";
            if (status=="Fusion") return "blue";
            if (status=="Android") return "grey";
            else return "grey";
        })
        .attr("transform", "scale(1.8)")
        .style("stroke-width", "2px");

}

function statusMouseout() {
    d3.selectAll("circle")
        .transition()
        .duration(400)
        .attr("transform", "scale(1)")
        .style("stroke", "#fff")
        .style("opacity", "1")
        .style("stroke-width", "1px");
}


play();
