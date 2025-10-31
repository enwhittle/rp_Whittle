// Code for generating a Chart.js bar chart

// Code for generating a Chart.js line chart

async function getData() {
    const response = await fetch('../data/results-data.csv'); // .. to move up one folder
    const data = await response.text();                           // CSV to TEXT

    const xEnergySource = []; // x-axis energy source
    const yEnergyPerAcre = []; // y-axis average energy per acre

    // split('\n') splits table by row
    // split(',') splits row by commas
    // slice(start, end) returns new array starting at index start up to and including end
    const table = data.split('\n').slice(1); // split data by row/new line and remove first row (headers)
    console.log(table);

    table.forEach(row => {
        const columns = row.split(',');
        const energySource = columns[0];
        xEnergySource.push(energySource);
        const energyPerAcre = parseFloat(columns[1]);
        yEnergyPerAcre.push(energyPerAcre);

        console.log(energySource, energyPerAcre);

    })

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
                    label:              'Energy per acre (MW/ac)',
                    data:               data.yEnergyPerAcre,
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
                        text: 'Energy Generation per Acre Used (MW/ac)',     // y-axis title
                        font: {
                            size: 14
                        },
                    },
                    ticks: {
                        min: 0,
                        maxTicksLimit: 8,
                        font: {
                            size: 12
                        }
                    },
                    grid: {                       // y-axis gridlines
                        color: '#6c767e6b'
                    }
                }
            },
            plugins: {                  // Display options for title and legend
                title: {
                    display: true,
                    text: 'U.S. Average Energy Generation per Acre by Energy Source',
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