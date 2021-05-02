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


var searchBtn = document.querySelector('#search-btn')
searchBtn.addEventListener('click', searchOnClick)

function searchOnClick() {
    var usersInput = document.getElementById('search-term').value
    console.log(usersInput)

    fetch(
        'https://covid-19.dataflowkit.com/v1/' + usersInput
        )
            .then(function(response) {
            return response.json();
            })
            .then(function(data) {
            console.log(data);
            // use this format to search for the country: Italy ; Spain ; USA ; Mexico
            // all lower case letters will give you an error. (this will be fixed later)
            if (usersInput !==  data.Country_text) {
                alert('Please enter a valid country name.')
            } else {
            var countrySearchTerm = document.querySelector('#country-search-term')
                countrySearchTerm.textContent = data['Active Cases_text']
            }});
}

