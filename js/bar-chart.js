// Code for generating a Chart.js bar chart

// Code for generating a Chart.js line chart

async function getData() {
    const response = await fetch('../data/global-mean-temp.csv'); // .. to move up one folder
    const data = await response.text();                           // CSV to TEXT

    const xEnergySource = []; // x-axis year values
    const yEnergyPerAcre = []; // y-axis global temp values

    // split('\n') splits table by row
    // split(',') splits row by commas
    // slice(start, end) returns new array starting at index start up to and including end
    const headers = data.split('\n').slice(0, 1).split(',');
    const table = data.split('\n').slice(1); // split data by row/new line and remove first row (headers)
    console.log(table);

    headers.forEach(headerItem => {
        xEnergySource.push(headerItem);
        console.log(headerItem);
    });

    table.split(',').forEach(energyPerAcre => {
        yEnergyPerAcre.push(energyPerAcre);
        console.log(energyPerAcre);
    });

    return {xEnergySource, yEnergyPerAcre};    // use {} to return multiple values in 1 object
}

async function createChart() {
    const data = await getData();       // createChart() will wait for getData() to process CSV
    const barChart = document.getElementById("barChart");

    const myBarChart = new Chart(barChart, { // construct the chart
        type: 'bar',
        data: {
            labels: data.xEnergySource,
            datasets: [
                {
                    label:              'Average Energy Per Acre (MW/ac) by Energy Source',
                    data:               data.yEnergyPerAcre,
                    fill:               true,
                    backgroundColor:    "#6971a55b",
                    borderColor:        "#6971a5ff",
                    borderWidth: 1
                }
            ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {                     // Display options for x & y axes
                x: {                      // x-axis properties
                    title: {
                        display: true,            // will show title
                        text: 'Energy Source',    // x-axis title
                        font: {                   // font properties
                            size: 14
                        },
                    },
                    grid: {                       // x-axis grid properties
                        color: '#6c767e'
                    }
                },
                y: {                              // y-axis properties
                    title: {
                        display: true,                          
                        text: `Global Mean Temperatures (${degreeSymbol}C)`,     // y-axis title
                        font: {
                            size: 14
                        },
                    },
                    ticks: {
                        min: 0,                   
                        maxTicksLimit: data.yTemps.length/10,        // Actual value can be set dynamically
                        font: {
                            size: 12
                        }
                    },
                    grid: {                       // y-axis gridlines
                        color: '#6c767e'
                    }
                }
            },
            plugins: {                  // Display options for title and legend
                title: {
                    display: true,
                    text: 'Global Mean Temperature vs. Year (since 1880)',
                    font: {
                        size: 24,
                    },
                    color: '#black',
                    padding: {
                        top: 10,
                        bottom: 30
                    }
                },
                legend: {
                    align: 'start',
                    position: 'bottom',
                }
            }
        }       
    });
}

createChart();