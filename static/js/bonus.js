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
                axis: {range: [0,10], tickmode: "linear", tick0: 2, dtick: 2},
                bar: {color: "black"},
                steps: [
                    {range: [0, 2], color: "rgba(255, 0, 0, 0.7)"},   // Red
                    {range: [2, 4], color: "rgba(255, 128, 0, 0.7)"}, // Orange
                    {range: [4, 6], color: "rgba(255, 255, 0, 0.7)"}, // Yellow
                    {range: [6, 8], color: "rgba(0, 255, 0, 0.7)"},   // Green
                    {range: [8, 10], color: "rgba(0, 128, 255, 0.7)"} // Blue
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
