fetch('http://api.opencovid.ca/summary')
.then(async function(response){

    const json = await response.json();
    console.log(json);

    //TODO: Validate the appropriate API off the bat before checking later in the logic to fix the objects.
    
    //Importing chart.js to handle a visualization of data pulled from the API
    const data = {
        labels: json.summary.filter(e=>e.province != "Repatriated").map(e=>e.province),
        datasets: [{
          label: 'Daily Cases',
          data: json.summary.filter(e=>e.province != "Repatriated").map(e=>e.cases),
          backgroundColor: generateColors(),
          hoverOffset: 4
        }]
      };

    const config = {
        type: 'pie',
        data: data,
      };

      let myChart = new Chart(
          document.getElementById('myChart'),
          config
      );

    function generateColors() {
        //Generate a random array of 13 colors, then return the array to the backgroundColor parameter
        let colors = [];
        for (let i = 0; i < 13; i++) {
            colors[i] = ('#' + Math.floor(Math.random()*16777215).toString(16));
        }
        return colors;
    } 

    //Function that takes in a province array and updates the appropriate span IDs to display the right information
    function updateData(provinceObject) {
        document.getElementById("provinceName").textContent = provinceObject.province;
        document.getElementById("cases").textContent = provinceObject.cases;
        document.getElementById("active").textContent = provinceObject.active_cases;
        document.getElementById("totalCases").textContent = provinceObject.cumulative_cases;
        document.getElementById("deaths").textContent = provinceObject.deaths;
        document.getElementById("totalDeaths").textContent = provinceObject.cumulative_deaths;
        document.getElementById("recovered").textContent = provinceObject.recovered;
        document.getElementById("totalRecovered").textContent = provinceObject.cumulative_recovered;
        document.getElementById("tests").textContent = provinceObject.testing;
        document.getElementById("totalTests").textContent = provinceObject.cumulative_testing;
        document.getElementById("vaccinated").textContent = (provinceObject.cumulative_avaccine + provinceObject.cumulative_cvaccine + provinceObject.dvaccine);
        document.getElementById("date").textContent = provinceObject.date;
    }

    //Creating an event for the click
    if (document.addEventListener) {
        document.addEventListener("click", findClick, false);
    }
    else if (document.attachEvent) {
        document.attachEvent("onclick", findClick);
    }

    //Function that identifies that a button is being clicked by class "provinceButtons"
    function findClick(event) {
        event = event || window.event;
        event.target = event.target || event.srcElement;

        let element = event.target;

        //Climb up the document tree from the target of the event
        while (element) {
            if (element.nodeName === "BUTTON" && /provinceButtons/.test(element.className)) {

                //Identifying the id of the button being pressed.
                let provinceId = element.getAttribute("id");

                if(provinceId != "canada") {
                    //Pulling the corresponding id from the API and storing it in a const and passing it to updateData();
                    const currentObject = json.summary.filter(provinces => provinces.province === provinceId)[0];
                    updateData(currentObject);
                    break;
                } else {
                    getCountryData();
                }
            }
            
            //Checking to see if the click event is happening for the chartBtns
            if (element.nodeName === "BUTTON" && /chartBtns/.test(element.className)) {

                //TODO: Update the label appropriately

                //This is targetting the data-id for each button
                let chartId = element.dataset.id;
                //dynamically change the data directly with a filter using the chartId
                data.datasets[0].data = json.summary.filter(e=>e.province != "Repatriated").map(e=>e[chartId]);
                //Calling the chart update command to display the new data.
                myChart.update();
            }

            if (element.nodeName === "BUTTON" && /chartControl/.test(element.className)) {

                let chartType = element.dataset.id;

                myChart.destroy();

                myChart = new Chart(document.getElementById('myChart'), {
                    type: chartType,
                    data: data,
                });
          
                myChart.update();
            }

            element = element.parentNode;
        }
    }
    
    function getCountryData() {

        // This function takes the Provinces and squishes the data
        function combineData(accumulatedCountry, currentProvince) {
            // This grabs the keys (aka property names) of the Province Object
            const keys = Object.keys(currentProvince);
            return keys.reduce((accumulatedProvince, key) => {

                // This is data we don't want to accumulate
                if (key === "testing_info") return accumulatedProvince;

                if (key === "province") {
                    return {
                        ...accumulatedProvince,
                        province: "Canada"
                    }
                };
                
                if (key === "date") {
                    return {
                        ...accumulatedProvince,
                        date: currentProvince[key]
                    }
                };
                
                // This is the last total
                const accumulatedData = accumulatedCountry[key];
                // This is the current number, using a ternary to determine if null, give 0, else get value
                const currentData = currentProvince[key] === "NULL" ? 0 : currentProvince[key];
                // Sum of the above two
                const totalData = accumulatedData + currentData;
                // Spread out the accuulatedProvince object and add the current key and updatedValue to it
                return {
                    ...accumulatedProvince, 
                    [key]: totalData
                };
            }, {});
        }

        //Creating a new object for the Country
        // This function takes the Array of Province Objects and condenses them to 1 Object.
        const countryData =  json.summary.reduce((accumulatedCountry, currentProvince) => {
            return combineData(accumulatedCountry, currentProvince);
        });
        
        //Passing the Country object to the UpdateData function to update the appropriate span tags.
        updateData(countryData);
    }

    getCountryData();
    
});