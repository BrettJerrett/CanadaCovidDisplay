fetch('http://api.opencovid.ca/summary')
.then(async function(response){

    const json = await response.json();

    console.log(json);

    //Function that takes in a province array and updates the appropriate span IDs to display the right information
    function updateData(provinceObject) {
        document.getElementById("provinceName").textContent=provinceObject[0].province;
        document.getElementById("cases").textContent=provinceObject[0].cases;
        document.getElementById("active").textContent=provinceObject[0].active_cases;
        document.getElementById("totalCases").textContent=provinceObject[0].cumulative_cases;
        document.getElementById("deaths").textContent=provinceObject[0].deaths;
        document.getElementById("totalDeaths").textContent=provinceObject[0].cumulative_deaths;
        document.getElementById("recovered").textContent=provinceObject[0].recovered;
        document.getElementById("totalRecovered").textContent=provinceObject[0].cumulative_recovered;
        document.getElementById("tests").textContent=provinceObject[0].cumulative_recovered;
        document.getElementById("totalTests").textContent=provinceObject[0].cumulative_testing;
        document.getElementById("vaccinated").textContent=(provinceObject[0].cumulative_avaccine + provinceObject[0].cumulative_cvaccine + provinceObject[0].dvaccine);
        document.getElementById("date").textContent=provinceObject[0].date;

    }

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

                //Pulling the corresponding id from the API and storing it in a const and passing it to updateData();
                const currentObject = json.summary.filter(provinces => provinces.province === provinceId);
                updateData(currentObject);
                break;

            }

            element = element.parentNode;
        }
    }


});