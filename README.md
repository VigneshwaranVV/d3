World Development Indicators - Life Expentency
Data Source: Indicators.csv

Notes:
Ensure the dataset is in csv format.
You’ll mostly be filtering on the field ‘Indicator Name.’
If the data cell is blank, do not plot
All the "data" is in the file Indicators.csv. The rest are all metadata.

Part 1: Data Munging

Write a Nodejs program that converts the csv file into a json file that will be used to plot data in part 2. You have to come up with an optimal schema for the json file based on the requirements of Part 2.

Part 2: Data Visualization with D3.js

Make a multi-series line chart of the following data for India over the years supplied (1960 - 2015)
Urban population (% of total)
Rural population (% of total)

2.  Make a stacked bar chart for all countries in Asia over the given time period filtering on the following value:
Urban population + Rural population in descending order.
