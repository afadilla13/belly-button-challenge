// Function to fetch JSON data and log it to the console
d3.json(url).then(function(data) {
    console.log(data);
  });
  
  // Initialize the dashboard when the page loads
  function init() {
  
      // Select the dropdown menu using D3
      let dropdownMenu = d3.select("#selDataset");
  
      // Retrieve sample names using D3 and populate the drop-down selector
      d3.json(url).then((data) => {
          
          // Create a variable to store the sample names
          let names = data.names;
  
          // Populate the dropdown menu with sample options
          names.forEach((id) => {
  
              // Output the value of 'id' during each iteration of the loop
              console.log(id);
              
              // Add options to the dropdown menu
              dropdownMenu.append("option")
              .text(id)
              .property("value",id);
          });
  
          // Assign the first sample from the list as the default
          let sample_one = names[0];
  
          // Output the value of 'sample_one' to the console
          console.log(sample_one);
  
          // Generate the initial visualizations
          buildGaugeChart(sample_one);
      });
  };
  
  // Function responsible for building Gauge Chart
  function buildGaugeChart(sample) {
  
      // Utilize D3 to fetch all the necessary data
      d3.json(url).then((data) => {
  
          // Collect all metadata entries
          let metadata = data.metadata;
  
          // Apply filtering based on the selected sample
          let value = metadata.filter(result => result.id == sample);
  
          // Output the array of filtered metadata objects
          console.log(value)
  
          // Obtain the first element from the filtered array
          let valueData = value[0];
  
          // Utilize Object.entries to append each key/value pair to the panel
          let washFrequency = Object.values(valueData)[6];
          
          // Define the configuration for the gauge chart trace
          let trace2 = {
              value: washFrequency,
              domain: {x: [0,1], y: [0,1]},
              title: {
                  text: "<b>Belly Button Washing Frequency</b><br>Scrubs per Week",
                  font: {color: "black", size: 16}
              },
              type: "indicator",
              mode: "gauge+number",
              gauge: {
                axis: { range: [0, 10], tickmode: "linear", tick0: 2, dtick: 2 },
                bar: { color: "darkblue" },
                steps: [
                    { range: [0, 1], color: "rgba(255, 255, 255, 0)" },
                    { range: [1, 2], color: "rgba(232, 226, 202, .5)" },
                    { range: [2, 3], color: "rgba(210, 206, 145, .5)" },
                    { range: [3, 4], color: "rgba(202, 209, 95, .5)" },
                    { range: [4, 5], color: "rgba(184, 205, 68, .5)" },
                    { range: [5, 6], color: "rgba(170, 202, 42, .5)" },
                    { range: [6, 7], color: "rgba(142, 178, 35 , .5)" },
                    { range: [7, 8], color: "rgba(110, 154, 22, .5)" },
                    { range: [8, 9], color: "rgba(50, 143, 10, 0.5)" },
                    { range: [9, 10], color: "rgba(14, 127, 0, .5)" },
                ]
            }
        };
  
          // Define the layout settings for the gauge chart
          let layout = {
              width: 400, 
              height: 400,
              margin: {t: 0, b:0}
          };
  
          // Call Plotly to create the gauge chart
          Plotly.newPlot("gauge", [trace2], layout)
      });
  };
  
  // Call the initialization function
  init();