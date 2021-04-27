fetch(
    'https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/date-range/2020-09-01/2020-12-01'
)
    .then(function(response) {
    return response.json();
    })
    .then(function(data) {
    console.log(data);
    });

    https://covid-19.dataflowkit.com/v1

fetch(
    'https://covid-19.dataflowkit.com/v1'
)
    .then(function(response) {
    return response.json();
    })
    .then(function(data) {
    console.log(data);
    });
