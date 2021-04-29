/* fetch(
    'https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/date-range/2020-09-01/2020-12-01'
)
    .then(function(response) {
    return response.json();
    })
    .then(function(data) {
    console.log(data);
    });

    https://covid-19.dataflowkit.com/v1 */
function myFunction() {
    var countrySearchTerm = document.querySelector("#country-search-term");

    fetch(
        'https://api.covid19api.com/total/country/' + countrySearchTerm +'/status/confirmed'
        )
            .then(function(response) {
            return response.json();
            })
            .then(function(data) {
            console.log(data);
            });
        }