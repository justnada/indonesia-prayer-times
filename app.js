function prayerTimes(latitude, longitude) {

    fetch('http://api.aladhan.com/v1/calendar?latitude='+latitude+'&longitude='+longitude+'&method=11')
    .then(response => response.json())
    .then(function(response){

        let date = new Date().getDate() - 1;
        let data = response.data[0].timings;

        let app   = document.getElementById('app');
        let table = document.createElement('table');
        let tBody = document.createElement('tbody');

        for(i in data){
            let row  = tBody.insertRow();
            let name = row.insertCell(0);
            let time = row.insertCell(1);

            name.innerHTML = i;
            time.innerHTML = data[i];

            tBody.appendChild(row);
        }

        console.log(response.data);

        table.appendChild(tBody);
        app.appendChild(table);

    });

}

function success(position) { 
    
    prayerTimes(position.coords.latitude, position.coords.longitude);

}

function error() {

    // set default geolocation to Jakarta
    prayerTimes('-6.200000', '106.816666');

}

function userLocation() {

    if(!navigator.geolocation) {
        alert('Geolocation tidak didukung di browser anda');
    } 
    else {
        navigator.geolocation.getCurrentPosition(success, error);
    }

}

function index() {
    let app         = document.getElementById('app'); 
    let h3          = document.createElement('h3');
    h3.innerHTML    = 'Prayer Times';

    app.append(h3);

    userLocation();
}

index();
