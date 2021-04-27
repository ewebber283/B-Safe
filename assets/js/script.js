fetch(
    'https://covidtrackerapi.bsg.ox.ac.uk/api/v2/stringency/date-range/1/2020-09-01/2020-12-01'
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(data) {
      console.log(data);
    });