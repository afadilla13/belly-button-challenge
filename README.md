# Belly Button Biodiversity Interactive Dashboard

## Belly Button Biodiversity

In this assignment, you will build an interactive dashboard to explore the Belly Button Biodiversity dataset, which catalogues the microbes that colonize human navels.

The dataset reveals that a small handful of microbial species (also called operational taxonomic units, or OTUs, in the study) were present in more than 70% of people, while the rest were relatively rare.

## Getting Started

To get started with this project, you will need to use the D3 library to read in the `samples.json` data from the following URL:

```
bashCopy code
https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json
```

## Features

### 1. Horizontal Bar Chart

- Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
- Use `sample_values` as the values for the bar chart.
- Use `otu_ids` as the labels for the bar chart.
- Use `otu_labels` as the hovertext for the chart.

![Top 10 OTUs Present](https://github.com/afadilla13/belly-button-challenge/assets/128363337/c9ddd1d5-d050-46e9-9442-46b178a02fdf)

### 2. Bubble Chart

- Create a bubble chart that displays each sample.
- Use `otu_ids` for the x values.
- Use `sample_values` for the y values.
- Use `sample_values` for the marker size.
- Use `otu_ids` for the marker colors.
- Use `otu_labels` for the text values.

![Bacteria Per Sample](https://github.com/afadilla13/belly-button-challenge/assets/128363337/b75fd3ad-fb25-493e-b43b-68aafb9bc6dd)

### 3. Sample Metadata

- Display the sample metadata, i.e., an individual's demographic information.
- Display each key-value pair from the metadata JSON object somewhere on the page.

### 4. Interactive

- Update all the plots when a new sample is selected.

### 5. Custom Layout

- You are welcome to create any layout that you would like for your dashboard. An example dashboard is shown in the image above.

## Advanced Challenge Assignment (Optional)

The following task is advanced and therefore optional.

- Adapt the Gauge Chart from [Plotly Gauge Charts](https://plot.ly/javascript/gauge-charts/) to plot the weekly washing frequency of the individual.
- You will need to modify the example gauge code to account for values ranging from 0 through 9.
- Update the chart whenever a new sample is selected.

![Washing Frequency](https://github.com/afadilla13/belly-button-challenge/assets/128363337/0b67a89b-b87f-4ae3-b667-b1086f90bdb7)

## Deployment

Deploy your app to a free static page hosting service, such as GitHub Pages.

Here is the link:
https://afadilla13.github.io/

Have fun exploring the Belly Button Biodiversity dataset and creating your interactive dashboard!





