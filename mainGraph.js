
function generateGraph() {
	var data = [{
		date: "8/26/2015",
		weight: 350
	}, {
		date: "8/27/2015",
		weight: 340
	}, {
		date: "8/28/2015",
		weight: 370
	}, {
		date: "8/29/2015",
		weight: 375
	}, {
		date: "8/30/2015",
		weight: 349
	}, {
		date: "9/01/2015",
		weight: 330
	}, {
		date: "9/02/2015",
		weight: 320
	}, {
		date: "9/03/2015",
		weight: 322
	}, {
		date: "9/04/2015",
		weight: 280
	}, {
		date: "9/06/2015",
		weight: 333
	}, {
		date: "9/07/2015",
		weight: 290
	}, {
		date: "9/08/2015",
		weight: 285
	}, {
		date: "9/09/2015",
		weight: 330
	}, {
		date: "9/10/2015",
		weight: 320
	}, {
		date: "9/11/2015",
		weight: 322
	}, {
		date: "9/12/2015",
		weight: 280
	}, {
		date: "9/13/2015",
		weight: 333
	}, {
		date: "9/14/2015",
		weight: 290
	}, {
		date: "9/15/2015",
		weight: 285
	}];

	var canvas = d3.select("#mainGraph");

	var xScale = d3.time.scale().range([50, $(window).width() - 60]).domain([getDate(data[0]), getDate(data[data.length - 1])]);

	var yScale = d3.scale.linear().range([(canvas[0][0].getAttribute('height') - 20), 50]).domain([getMinWeight(data) - 20, getMaxWeight(data) + 20]);

	var xAxis = d3.svg.axis().scale(xScale).orient("bottom").ticks(d3.time.days, 1).tickFormat(d3.time.format('%m/%d'));

	var yAxis = d3.svg.axis().scale(yScale).orient("left").ticks(25);

	canvas.append("svg:g").attr("transform", "translate(0," + (canvas[0][0].getAttribute('height') - 20) + ")").call(xAxis);
	canvas.append("svg:g").attr("transform", "translate(" + 50 + ",0)").call(yAxis);

	var lineGen = d3.svg.line()
		.x(function(d) {
			return xScale(getDate(d));
		})
		.y(function(d) {
			return yScale(d.weight);
		})
		.interpolate('cardinal');

	canvas.append("svg:path")
		.attr('d', lineGen(data))
		.attr('stroke', 'green')
		.attr('stroke-width', 3)
		.attr('fill', 'none');

	var point = canvas.append("g")
		.attr("class", "line-point");

	point.selectAll('circle')
		.data(data)
		.enter().append('circle')
		.attr("cx", function(d) { return xScale(getDate(d)); })
		.attr("cy", function(d) { return yScale(d.weight); })
		.attr("r", 5)
		.attr("id", function(d, i) {return "graphPoint" + i;})
		.attr("xValue", function(d) {return d.date;})
		.style("fill", "green")
		.style("stroke", function(d) { return "green"; })
		.on('click', function(){
			var circle = $("#" + this.id);
			console.log(circle);
			$("#infoPanel").dialog({
				position: {my: "left bottom", at: "center", of: circle},
				title: circle[0].__data__.date
			});
		})
		.on('mouseover', function(){
			d3.select("#" + this.id).attr("r", parseInt(this.getAttribute("r")) + 3);
		})
		.on('mouseout', function() {
			d3.select("#" + this.id).attr("r", parseInt(this.getAttribute("r")) - 3)
		});
}

function getDate(d) {
    return new Date(d.date);
}

function getMinWeight(d) {
	var min = d[0].weight;

	$.each(d, function(k, v) {
		if (v.weight < min) {
			min = v.weight;
		}
	});

	return min;
}

function getMaxWeight(d) {
	var max = d[0].weight;

	$.each(d, function(k, v) {
		if (v.weight > max) {
			max = v.weight;
		}
	});

	return max;
}

function resizeScreen() {

	$("#mainGraph")[0].setAttribute('height', ($(window).height() * 10/12));

}