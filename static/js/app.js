// Define the URL for the JSON data source
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

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
        buildMetadata(sample_one);
        buildBarChart(sample_one);
        buildBubbleChart(sample_one);
        buildGaugeChart(sample_one);

    });
};

// Function responsible for populating metadata information
function buildMetadata(sample) {

    // Utilize D3 to fetch all the data
    d3.json(url).then((data) => {

        // Collect all metadata entries
        let metadata = data.metadata;

        // Apply filtering based on the selected sample
        let value = metadata.filter(result => result.id == sample);

        // Output the array of filtered metadata objects
        console.log(value)

        // Obtain the first element from the filtered array
        let valueData = value[0];

        // Remove existing metadata content
        d3.select("#sample-metadata").html("");

        // Utilize Object.entries to append each key/value pair to the panel
        Object.entries(valueData).forEach(([key,value]) => {

            // Output each key/value pair as it is being added to the metadata panel
            console.log(key,value);

            // Add metadata entries as h5 elements to the panel
            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });
    });

};

// Function responsible for constructing the bar chart
function buildBarChart(sample) {

    // Utilize D3 to fetch all the necessary data
    d3.json(url).then((data) => {

        // Collect all sample data entries
        let sampleInfo = data.samples;

        // Apply filtering based on the selected sample value
        let value = sampleInfo.filter(result => result.id == sample);

        // Obtain the first element from the filtered array
        let valueData = value[0];

        // Retrieve the otu_ids, labels, and sample values
        let otu_ids = valueData.otu_ids;
        let otu_labels = valueData.otu_labels;
        let sample_values = valueData.sample_values;

        // Output the data to the console for reference
        console.log(otu_ids,otu_labels,sample_values);

        // Arrange the top ten items for display in descending order
        let yticks = otu_ids.slice(0,10).map(id => `OTU ${id}`).reverse();
        let xticks = sample_values.slice(0,10).reverse();
        let labels = otu_labels.slice(0,10).reverse();
        
        // Define the configuration for the bar chart trace
        let trace = {
            x: xticks,
            y: yticks,
            text: labels,
            type: "bar",
            orientation: "h"
        };

        // Define the layout settings for the bar chart
        let layout = {
            title: "Top 10 OTUs Present"
        };

        // Call Plotly to create the bar chart
        Plotly.newPlot("bar", [trace], layout)
    });
};

// Function responsible for constructing the bubble chart
function buildBubbleChart(sample) {

    // Utilize D3 to fetch all the necessary data
    d3.json(url).then((data) => {
        
        // Collect all sample data entries
        let sampleInfo = data.samples;

        // Apply filtering based on the selected sample value
        let value = sampleInfo.filter(result => result.id == sample);

        // Obtain the first element from the filtered array
        let valueData = value[0];

        // Retrieve the otu_ids, labels, and sample values
        let otu_ids = valueData.otu_ids;
        let otu_labels = valueData.otu_labels;
        let sample_values = valueData.sample_values;

        // Output the data to the console for reference
        console.log(otu_ids,otu_labels,sample_values);
        
        // Define the configuration for the bubble chart trace
        let trace1 = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
                colorscale: "Earth"
            }
        };

        // Define the layout settings for the bubble chart
        let layout = {
            title: "Bacteria Per Sample",
            hovermode: "closest",
            xaxis: {title: "OTU ID"},
        };

        // Call Plotly to create the bubble chart
        Plotly.newPlot("bubble", [trace1], layout)
    });
};

// Function responsible for updating the dashboard when the sample is changed
function optionChanged(value) { 

    // Output the new value to the console
    console.log(value); 

    // Execute all relevant functions
    buildMetadata(value);
    buildBarChart(value);
    buildBubbleChart(value);
    buildGaugeChart(value);
};

// Call the initialization function
init();
