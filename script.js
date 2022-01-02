d3.csv("./data/cities_air_quality_water_pollution.18-10-2021.csv").then(function(data) {

    console.log(data);

// SVG CANVAS
    const width = document.querySelector("#chart").clientWidth;
    const height = document.querySelector("#chart").clientHeight;
    const margin = {top: 25, left: 75, right: 35, bottom: 140};

    const canvas = d3.select("#chart")
        .append("svg")
        .attr("width", width)
        .attr("height", height);


// FILTERED DATA
    const filtered_data_MH = data.filter(function(d) {
        return d.Country == " India" && d.Region == " Maharashtra" ;
    });

    const filtered_data_OD = data.filter(function(d) {
        return d.Country == " India" && d.Region == " Odisha" ;
    });

    const filtered_data_KA = data.filter(function(d) {
        return d.Country == " India" && d.Region == " Karnataka" ;
    });

    const filtered_data_KL = data.filter(function(d) {
        return d.Country == " India" && d.Region == " Kerala" ;
    });

    const filtered_data_UP = data.filter(function(d) {
        return d.Country == " India" && d.Region == " Uttar Pradesh" ;
    });

    const filtered_all = data.filter(function(d){
        return d.Country == " India" && (d.Region == " Maharashtra" || d.Region == " Odisha" || d.Region == " Karnataka" || d.Region == " Kerala" || d.Region == " Uttar Pradesh")
    });

    console.log(filtered_data_MH, filtered_data_OD, filtered_data_KA, filtered_data_KL, filtered_data_UP, filtered_all);


// SCALES

    let xScale = d3.scaleLinear()
        .domain([0,100])
        .range([margin.left, width-margin.right]);

    let yScale = d3.scaleLinear()
        .domain([100,0])
        .range([height-margin.bottom, margin.top]);

    let colorScale = d3.scaleOrdinal(d3.schemePastel2);


// CIRCULAR MARKS 

    const marks = canvas.selectAll("circle")
        .data(filtered_all)
        .enter()
        .append("circle")
            .attr("cx", function(d) { return xScale(d.airQuality)})
            .attr("cy", function(d) { return yScale(d.waterPollution)})
            .attr("r", 15)
            .attr ("fill", function(d){ return colorScale(d. Region)})
            .attr("opacity", 0.8);


// AXIS 

    const xAxis = canvas.append("g")
        .attr("font-family", "san-serif")
        .attr("transform",`translate(0,${height-margin.bottom})`)
        .style("font", "14px times")
        .call(d3.axisBottom().scale(xScale));

    const yAxis = canvas.append("g")
        .attr("transform",`translate(${margin.left},0)`)
        .style("font", "14px times")
        .call(d3.axisLeft().scale(yScale));


    canvas.append("text")
        .attr("class","axisLabel")
        .attr("x", margin.left + (width-margin.left-margin.right)/2)
        .attr("y", height - 100)
        .attr("text-anchor","middle")
        .attr("font-family", "Karla")
        .attr("font-weight","bold")
        .attr("font-size", 18)
        .text("Air Quality Index (Out of 100)");

        canvas.append("text")
        .attr("class","axisLabel")
        .attr("x", margin.left + (width-margin.left-margin.right)/1000)
        .attr("y", height - 100)
        .attr("text-anchor","middle")
        .attr("font-family", "Karla")
        .attr("fill", "red")
        .text("Bad");

        canvas.append("text")
        .attr("class","axisLabel")
        .attr("x", margin.left + (width-margin.left-margin.right)/1)
        .attr("y", height - 100)
        .attr("text-anchor","middle")
        .attr("font-family", "Karla")
        .attr("fill", "green")
        .text("Good");


    canvas.append("text")
        .attr("class","axisLabel")
        .attr("x", -(height-margin.bottom)/2)
        .attr("y", 35)
        .attr("text-anchor","middle")
        .attr("transform","rotate(-90)")
        .attr("font-family", "Karla")
        .attr("font-weight","bold")
        .attr("font-size", 18)
        .text("Water Pollution Index (Out of 100)");

        canvas.append("text") 
        .attr("class","axisLabel")
        .attr("x", -(height-margin.bottom)/1)
        .attr("y", 35)
        .attr("text-anchor","middle")
        .attr("transform","rotate(-90)")
        .attr("font-family", "Karla")
        .attr("fill", "red")
        .text("Bad");

        canvas.append("text")
        .attr("class","axisLabel")
        .attr("x", -(height-margin.bottom)/20)
        .attr("y", 35)
        .attr("text-anchor","middle")
        .attr("transform","rotate(-90)")
        .attr("font-family", "Karla")
        .attr("fill", "green")
        .text("Good");


// TOOLTIP

    const tooltip = d3.select("#chart")
            .append("div")
            .attr("class", "tooltip");
    
        canvas.selectAll("circle").on("mouseover", function(e, d) {
    
            let cx = +d3.select(this).attr("cx")+20;
            let cy = +d3.select(this).attr("cy")+70;
    
            tooltip.style("visibility","visible") 
                .style("left", `${cx}px`)
                .style("top", `${cy}px`)
                .html(`<b>State:</b> ${d.Region}<br><b>City:</b> ${d.City}<br><b>Air Quality Index:</b> ${Math.round(d.airQuality)}<br><b>Water Pollution Index</b>: ${Math.round(d.waterPollution)}`);
            
            let avg = (100 - Math.round(d.waterPollution) + Math.round(d.airQuality))/2;
            let strokeColor;

            if (avg<50) {
                strokeColor = "red"
            } else {
                strokeColor = "green"
            }

            d3.select(this)
                .attr("stroke", strokeColor)
                .attr("stroke-width",4);
        }).on("mouseout", function() {
    
            tooltip.style("visibility","hidden");
    
            d3.select(this)
                .attr("stroke","none")
                .attr("stroke-width",0);
        });



// DATA UPDATE

    d3.select("#MH").on("click", function() {

        // xScale.domain([airQuality.min_MH, airQuality.max_MH]);
        // yScale.domain([waterPollution.max_MH, waterPollution.min_MH]);

        // xScale.domain([0, 100]);
        // yScale.domain([100, 0]);
    
        let enterMarks = canvas.selectAll("circle")
            .data(filtered_data_MH, function(d) { return d.City; });
    
        enterMarks.enter()
            .append("circle")
            .attr("cx", function(d) { return xScale(d.airQuality); })
            .attr("cy", function(d) { return yScale(d.waterPollution); })
            .attr("r", 15)
            .attr ("fill", function(d){ return colorScale(d. Region)})
            .attr("opacity", 0.8)
        .merge(enterMarks)
            .transition()
            .duration(2000)
            .delay(250) 
            .attr("cx", function(d) { return xScale(d.airQuality); })
            .attr("cy", function(d) { return yScale(d.waterPollution); })
            .attr("r", 15)
            .attr("fill", function(d){ return colorScale(d. Region)})
            .attr("opacity", 0.8);
    
        enterMarks.exit()
            .transition()
            .duration(2000)
            .delay(250)
            .attr("r",0)
            .remove();

        const tooltip = d3.select("#chart")
            .append("div")
            .attr("class", "tooltip");
    
        canvas.selectAll("circle").on("mouseover", function(e, d) {
    
            let cx = +d3.select(this).attr("cx")+20;
            let cy = +d3.select(this).attr("cy")+70;
    
            tooltip.style("visibility","visible") 
                .style("left", `${cx}px`)
                .style("top", `${cy}px`)
                .html(`<b>City:</b> ${d.City}<br><b>Air Quality Index:</b> ${Math.round(d.airQuality)}<br><b>Water Pollution Index</b>: ${Math.round(d.waterPollution)}`);
            
                let avg = (100 - Math.round(d.waterPollution) + Math.round(d.airQuality))/2;
                let strokeColor;
    
                if (avg<50) {
                    strokeColor = "red"
                } else {
                    strokeColor = "green"
                }

            d3.select(this)
                .attr("stroke", strokeColor)
                .attr("stroke-width",4);
        }).on("mouseout", function() {
    
            tooltip.style("visibility","hidden");
    
            d3.select(this)
                .attr("stroke","none")
                .attr("stroke-width",0);
        });
    });


    d3.select("#OD").on("click", function() {

        let enterMarks = canvas.selectAll("circle")
            .data(filtered_data_OD, function(d) { return d.City; });
    
        enterMarks.enter()
            .append("circle")
            .attr("cx", function(d) { return xScale(d.airQuality); })
            .attr("cy", function(d) { return yScale(d.waterPollution); })
            .attr("r", 15)
            .attr("fill", function(d){ return colorScale(d. Region)})
            .attr("opacity", 0.8)
        .merge(enterMarks)
            .transition()
            .duration(2000)
            .delay(250) 
            .attr("cx", function(d) { return xScale(d.airQuality); })
            .attr("cy", function(d) { return yScale(d.waterPollution); })
            .attr("r", 15)
            .attr("fill", function(d){ return colorScale(d. Region)})
            .attr("opacity", 0.8);
    
        enterMarks.exit()
            .transition()
            .duration(2000)
            .delay(250)
            .attr("r",0)
            .remove();

        let tooltip = d3.select("#chart")
            .append("div")
            .attr("class", "tooltip");
    
        canvas.selectAll("circle").on("mouseover", function(e, d) {
    
            let cx = +d3.select(this).attr("cx")+20;
            let cy = +d3.select(this).attr("cy")+70;
    
            tooltip.style("visibility","visible") 
                .style("left", `${cx}px`)
                .style("top", `${cy}px`)
                .html(`<b>City:</b> ${d.City}<br><b>Air Quality Index:</b> ${Math.round(d.airQuality)}<br><b>Water Pollution Index</b>: ${Math.round(d.waterPollution)}`);

            let avg = (100 - Math.round(d.waterPollution) + Math.round(d.airQuality))/2;
            let strokeColor;

            if (avg<50) {
                strokeColor = "red"
            } else {
                strokeColor = "green"
            }
    
            d3.select(this)
                .attr("stroke",strokeColor)
                .attr("stroke-width",4);
        }).on("mouseout", function() {
    
            tooltip.style("visibility","hidden");
    
            d3.select(this)
                .attr("stroke","none")
                .attr("stroke-width",0);
        });
    });


    d3.select("#KA").on("click", function() {

        let enterMarks = canvas.selectAll("circle")
            .data(filtered_data_KA, function(d) { return d.City; });
    
        enterMarks.enter()
            .append("circle")
            .attr("cx", function(d) { return xScale(d.airQuality); })
            .attr("cy", function(d) { return yScale(d.waterPollution); })
            .attr("r", 15)
            .attr("fill", function(d){ return colorScale(d. Region)})
            .attr("opacity", 0.8)
        .merge(enterMarks)
            .transition()
            .duration(2000)
            .delay(250) 
            .attr("cx", function(d) { return xScale(d.airQuality); })
            .attr("cy", function(d) { return yScale(d.waterPollution); })
            .attr("r", 15)
            .attr("fill", function(d){ return colorScale(d. Region)})
            .attr("opacity", 0.8);
    
        enterMarks.exit()
            .transition()
            .duration(2000)
            .delay(250)
            .attr("r",0)
            .remove();

            let tooltip = d3.select("#chart")
            .append("div")
            .attr("class", "tooltip");
    
        canvas.selectAll("circle").on("mouseover", function(e, d) {
    
            let cx = +d3.select(this).attr("cx")+20;
            let cy = +d3.select(this).attr("cy")+70;
    
            tooltip.style("visibility","visible") 
                .style("left", `${cx}px`)
                .style("top", `${cy}px`)
                .html(`<b>City:</b> ${d.City}<br><b>Air Quality Index:</b> ${Math.round(d.airQuality)}<br><b>Water Pollution Index</b>: ${Math.round(d.waterPollution)}`);

            let avg = (100 - Math.round(d.waterPollution) + Math.round(d.airQuality))/2;
            let strokeColor;

            if (avg<50) {
                strokeColor = "red"
            } else {
                strokeColor = "green"
            }

            d3.select(this)
                .attr("stroke",strokeColor)
                .attr("stroke-width",4);
        }).on("mouseout", function() {
    
            tooltip.style("visibility","hidden");
    
            d3.select(this)
                .attr("stroke","none")
                .attr("stroke-width",0);
        });
    });


    d3.select("#KL").on("click", function() {

        let enterMarks = canvas.selectAll("circle")
            .data(filtered_data_KL, function(d) { return d.City; });
    
        enterMarks.enter()
            .append("circle")
            .attr("cx", function(d) { return xScale(d.airQuality); })
            .attr("cy", function(d) { return yScale(d.waterPollution); })
            .attr("r", 15)
            .attr("fill", function(d){ return colorScale(d. Region)})
            .attr("opacity", 0.8)
        .merge(enterMarks)
            .transition()
            .duration(2000)
            .delay(250) 
            .attr("cx", function(d) { return xScale(d.airQuality); })
            .attr("cy", function(d) { return yScale(d.waterPollution); })
            .attr("r", 15)
            .attr("fill", function(d){ return colorScale(d. Region)})
            .attr("opacity", 0.8);

            enterMarks.exit()
            .transition()
            .duration(2000)
            .delay(250)
            .attr("r",0)
            .remove();

            let tooltip = d3.select("#chart")
            .append("div")
            .attr("class", "tooltip");

            canvas.selectAll("circle").on("mouseover", function(e, d) {

            let cx = +d3.select(this).attr("cx")+20;
            let cy = +d3.select(this).attr("cy")+70;

            tooltip.style("visibility","visible") 
                .style("left", `${cx}px`)
                .style("top", `${cy}px`)
                .html(`<b>City:</b> ${d.City}<br><b>Air Quality Index:</b> ${Math.round(d.airQuality)}<br><b>Water Pollution Index</b>: ${Math.round(d.waterPollution)}`);

            let avg = (100 - Math.round(d.waterPollution) + Math.round(d.airQuality))/2;
            let strokeColor;

            if (avg<50) {
                strokeColor = "red"
            } else {
                strokeColor = "green"
            }

            d3.select(this)
                .attr("stroke",strokeColor)
                .attr("stroke-width",4);
        }).on("mouseout", function() {

            tooltip.style("visibility","hidden");

            d3.select(this)
                .attr("stroke","none")
                .attr("stroke-width",0);
        });
    });


    d3.select("#UP").on("click", function() {

        let enterMarks = canvas.selectAll("circle")
            .data(filtered_data_UP, function(d) { return d.City; });

        enterMarks.enter()
            .append("circle")
            .attr("cx", function(d) { return xScale(d.airQuality); })
            .attr("cy", function(d) { return yScale(d.waterPollution); })
            .attr("r", 15)
            .attr("fill", function(d){ return colorScale(d. Region)})
            .attr("opacity", 0.8)
        .merge(enterMarks)
            .transition()
            .duration(2000)
            .delay(250) 
            .attr("cx", function(d) { return xScale(d.airQuality); })
            .attr("cy", function(d) { return yScale(d.waterPollution); })
            .attr("r", 15)
            .attr("fill", function(d){ return colorScale(d. Region)})
            .attr("opacity", 0.8);

        enterMarks.exit()
            .transition()
            .duration(2000)
            .delay(250)
            .attr("r",0)
            .remove();

        let tooltip = d3.select("#chart")
            .append("div")
            .attr("class", "tooltip");

        canvas.selectAll("circle").on("mouseover", function(e, d) {

            let cx = +d3.select(this).attr("cx")+20;
            let cy = +d3.select(this).attr("cy")+70;
        
            tooltip.style("visibility","visible") 
                .style("left", `${cx}px`)
                .style("top", `${cy}px`)
                .html(`<b>City:</b> ${d.City}<br><b>Air Quality Index:</b> ${Math.round(d.airQuality)}<br><b>Water Pollution Index</b>: ${Math.round(d.waterPollution)}`);

            let avg = (100 - Math.round(d.waterPollution) + Math.round(d.airQuality))/2;
            let strokeColor;

            if (avg<50) {
                strokeColor = "red"
            } else {
                strokeColor = "green"
            }
        
        d3.select(this)
                .attr("stroke",strokeColor)
                .attr("stroke-width",4);
        }).on("mouseout", function() {

            tooltip.style("visibility","hidden");

            d3.select(this)
                .attr("stroke","none")
                .attr("stroke-width",0);
        });
    });


    d3.select("#All").on("click", function() {

        let enterMarks = canvas.selectAll("circle")
            .data(filtered_all, function(d) { return d.City; });

        enterMarks.enter()
            .append("circle")
            .attr("cx", function(d) { return xScale(d.airQuality); })
            .attr("cy", function(d) { return yScale(d.waterPollution); })
            .attr("r", 15)
            .attr("fill", function(d){ return colorScale(d. Region)})
            .attr("opacity", 0.8)
        .merge(enterMarks)
            .transition()
            .duration(2000)
            .delay(250) 
            .attr("cx", function(d) { return xScale(d.airQuality); })
            .attr("cy", function(d) { return yScale(d.waterPollution); })
            .attr("r", 15)
            .attr("fill", function(d){ return colorScale(d. Region)})
            .attr("opacity", 0.8);

        enterMarks.exit()
            .transition()
            .duration(2000)
            .delay(250)
            .attr("r",0)
            .remove();

            let tooltip = d3.select("#chart")
            .append("div")
            .attr("class", "tooltip");

        canvas.selectAll("circle").on("mouseover", function(e, d) {

            let cx = +d3.select(this).attr("cx")+20;
            let cy = +d3.select(this).attr("cy")+70;

            tooltip.style("visibility","visible") 
                .style("left", `${cx}px`)
                .style("top", `${cy}px`)
                .html(`<b>City:</b> ${d.City}<br><b>Air Quality Index:</b> ${Math.round(d.airQuality)}<br><b>Water Pollution Index</b>: ${Math.round(d.waterPollution)}`);

            let avg = (100 - Math.round(d.waterPollution) + Math.round(d.airQuality))/2;
            let strokeColor;

            if (avg<50) {
                strokeColor = "red"
            } else {
                strokeColor = "green"
            }

            d3.select(this)
                .attr("stroke",strokeColor)
                .attr("stroke-width",4);
        }).on("mouseout", function() {

            tooltip.style("visibility","hidden");
        
            d3.select(this)
                .attr("stroke","none")
                .attr("stroke-width",0);
        });
    });



});