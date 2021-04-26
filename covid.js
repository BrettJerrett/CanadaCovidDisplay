fetch('http://api.opencovid.ca/summary')
.then(async function(response){

    const json = await response.json();

    //setting variables for button ids
    let alberta = document.getElementById("alberta");
    let bc = document.getElementById("bc");
    let manitoba = document.getElementById("manitoba");
    let nb = document.getElementById("nb");
    let nfld = document.getElementById("nfld");
    let ns = document.getElementById("ns");
    let nunavut = document.getElementById("nunavut");
    let nwt = document.getElementById("nwt");
    let ontario = document.getElementById("ontario");
    let pei = document.getElementById("pei");
    let quebec = document.getElementById("quebec");
    let saskatchewan = document.getElementById("saskatchewan");
    let yukon = document.getElementById("yukon");

    console.log(json);

    //setting variables that are filtered directly to each province's object
    const abObj = json.summary.filter(provinces => provinces.province === "Alberta");
    const bcObj = json.summary.filter(provinces => provinces.province === "BC");
    const mnObj = json.summary.filter(provinces => provinces.province === "Manitoba");
    const nbObj = json.summary.filter(provinces => provinces.province === "New Brunswick");
    const nfldObj = json.summary.filter(provinces => provinces.province === "NL");
    const nsObj = json.summary.filter(provinces => provinces.province === "Nova Scotia");
    const nunavutObj = json.summary.filter(provinces => provinces.province === "Nunavut");
    const nwtObj = json.summary.filter(provinces => provinces.province === "NWT");
    const onObj = json.summary.filter(provinces => provinces.province === "Ontario");
    const peiObj = json.summary.filter(provinces => provinces.province === "PEI");
    const quObj = json.summary.filter(provinces => provinces.province === "Quebec");
    const saObj = json.summary.filter(provinces => provinces.province === "Saskatchewan");
    const yuObj = json.summary.filter(provinces => provinces.province === "Yukon");

    //TODO: one onclick that takes in any button response.
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
                
                //TODO: Find a way to identify which obj corresponds to the button, pass that object to updateData();
                
                console.log("click!");
                break;
            }

            element = element.parentNode;
        }

    }


   //on click listeners that will display appropriate API data corresponding to the province clicked.

    alberta.onclick = function() {
        updateData(abObj);
    }

    bc.onclick = function() {
        updateData(bcObj);
    }

    manitoba.onclick = function() {
        updateData(mnObj);
    }

    nb.onclick = function() {
        updateData(nbObj);
    }

    nfld.onclick = function() {
        updateData(nfldObj);
    }

    ns.onclick = function() {
        updateData(nsObj);
    }

    nunavut.onclick = function() {
        updateData(nunavutObj);
    }

    nwt.onclick = function() {
        updateData(nwtObj);
    }

    ontario.onclick = function() {
        updateData(onObj);
    }

    pei.onclick = function() {
        updateData(peiObj);
    }

    quebec.onclick = function() {
        updateData(quObj);
    }

    saskatchewan.onclick = function() {
        updateData(saObj);
    }

    yukon.onclick = function() {
        updateData(yuObj);
    }


    //Function that takes in a province object and updates the appropriate IDs to display the right information lol
    updateData = function(provinceObject) {
        document.getElementById("provinceName").textContent=provinceObject[0].province;
        document.getElementById("cases").textContent=provinceObject[0].cases;
        document.getElementById("active").textContent=provinceObject[0].active_cases;
        document.getElementById("casestd").textContent=provinceObject[0].cumulative_cases;
        document.getElementById("deaths").textContent=provinceObject[0].deaths;
        document.getElementById("deathstd").textContent=provinceObject[0].cumulative_deaths;
        document.getElementById("recovered").textContent=provinceObject[0].recovered;
        document.getElementById("recoveredtd").textContent=provinceObject[0].cumulative_recovered;
        document.getElementById("testing").textContent=provinceObject[0].cumulative_recovered;
    }


});