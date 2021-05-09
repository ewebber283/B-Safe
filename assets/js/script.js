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


var inputEl = document.querySelector('#search-term')


var searchBtn = document.querySelector('#search-form')
searchBtn.addEventListener('submit', searchOnClick)

function searchOnClick() {
    var userInput = upperFirst(document.getElementById('search-term').value)
    console.log(userInput)  
    apiRequests(userInput) 
}

function apiRequests(userInput) {

    // fetching active/total/new cases info
    fetch(
        'https://covid-19.dataflowkit.com/v1/' + userInput
        )
            .then(function(response) {
            return (response.json())
            })
            .then(function(cases) {
            if (userInput !==  cases.Country_text) {
                alert('Please enter a valid country name.')
            } else {
                console.log(cases)
                printCaseData(cases)
                document.getElementById('report-section').style.height = 'auto'
                inputEl.value = ''
                countryList.push(userInput)
                if (countryList.some((val, i) => countryList.indexOf(val) !== i)) {
                    return
                } else {
                    localStorage.setItem('countryList', JSON.stringify(countryList));
                    showText()    
                    createBtn(userInput)
                }
            }}
        )

    // fetching vaccines info
    fetch (
        'https://covid-api.mmediagroup.fr/v1/vaccines?country=' + userInput
        )
            .then(function(response) {
            return response.json()
            })
            .then(function(vaccines) {
            console.log(vaccines)
            printVaccineData(vaccines)
            })

            
}



function upperFirst(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase()
}

function printCaseData (country) {
    var numbers = document.querySelector('#numbers')
        numbers.innerHTML = ''

        if (country["Active Cases_text"] === '') {
            var noDataActive = ('<p id="active-cases">Active Cases: no data</p>')
        } else {
            var actCaseNum = country["Active Cases_text"]
            var activeCases = ('<p id="active-cases">Active Cases: ' + actCaseNum + '</p>')
        }

        if(country["New Cases_text"] === ''){
            var noDataNew = ('<p id="active-cases">New Cases: no data</p>')
        } else {
            var newCaseNum = country["New Cases_text"]
            var newCases = ('<p id="new-cases">New Cases: ' + newCaseNum + '</p>')
        }

    $('#numbers').append(activeCases, newCases, noDataActive, noDataNew)


    var totalCaseNum = country['Total Cases_text']
    var totalRecovNum = country['Total Recovered_text']
    var totalDeaths = country['Total Deaths_text']


    JSC.Chart('chartDiv', {
        type: 'horizontal column',
        series: [
            {
                points: [
                {x: 'Total Cases', y: parseInt(totalCaseNum.replace(/,/g, '')) },
                {x: 'Total Recovered', y: parseInt(totalRecovNum.replace(/,/g, '')) },
                {x: 'Active Cases', y: parseInt(actCaseNum.replace(/,/g, '')) },
                {x: 'Total Deaths', y: parseInt(totalDeaths.replace(/,/g, '')) },
                ]
            }
        ]
    });
}

function printVaccineData (vaccines) {
    if (vaccines.All.people_vaccinated === '') {
        var noDataFully = ('<p id="vaccinated">Fully Vaccinated: no data</p>')
    } else {
        var fullyVaccinated = $('<p id="vaccinated">Fully Vaccinated: ' + vaccines.All.people_vaccinated + '</p>')
    }

    if (vaccines.All.people_partially_vaccinated === '') {
        var noDataPartially = ('<p id="vaccinated">Partially Vaccinated: no data</p>')
    } else {
        var partiallyVaccinated = $('<p id="vaccinated">Partially Vaccinated: ' + vaccines.All.people_partially_vaccinated + '</p>')
    }

    $('#numbers').append(fullyVaccinated, partiallyVaccinated, noDataFully, noDataPartially)
}






var signUpButton = document.getElementById('btn')

signUpButton.addEventListener('click', function(event) {
    event.preventDefault();

    var name = document.getElementById('contact-name').value;
    var email = document.getElementById('contact-email').value;
    var destination = document.getElementById('destination').value;
    if (name === '') {
        alert('Name cannot be blank');
    } else if (email === '') {
        alert('Email cannot be blank');
    } else if (destination === '') {
        alert('Email cannot be blank');
    } else {
        alert('Registered successfully');

        userInfo = []
        userInfo.push(name, destination,email)
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
    }
})

function loadFromLocalStorage(){
    countryList = JSON.parse(localStorage.getItem("countryList"))
    if (!countryList) {
        countryList = []
    } else {
        showText()
        for (var i = 0; i < countryList.length; i++){    
            createBtn(countryList[i])
    }}
}
loadFromLocalStorage()

function createBtn (country) {
    var button = $('<button type="button" class="btn" data-attribute="' + country.toLowerCase() + '">' + country + '</button>')
    $('#btn-group').append(button)
    //debugger
}

function showText () {
    var text = document.getElementById('featured-countries-text')
    text.textContent = ('Click the button below to see results for your featured country:')
}

var featuredCountryClick = function(event) {
    var country = event.target.getAttribute('data-attribute')
    if (country) {
        apiRequests(upperFirst(country))
        console.log(country)
    }
}
var countryBtn = document.querySelector('#btn-group')
countryBtn.addEventListener('click', featuredCountryClick)