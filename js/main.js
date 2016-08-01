window.addEventListener('load', onWindowLoad, false);


function onWindowLoad(e){
    initApp();   
}

function initApp(){
        
    var outputLog = document.getElementById('serverInfo');
    var httpRequest = new XMLHttpRequest();
    var serverURL = '../php/winners.php';
    var button = document.getElementById('loadInfo');
    
    button.addEventListener('click', onButtonPress, false);
    httpRequest.addEventListener('readystatechange', onReadyState, false);
    
    function onReadyState(){
        
        if(httpRequest.status == 200 && httpRequest.readyState == 4){
            processData(httpRequest.responseText);
            button.setAttribute('class', 'hide');
            
        }else{
            switch(httpRequest.readyState){
                case 0:
                    outputLog.innerHTML = "Request Not Initialized";
                    break;
                case 1:
                    outputLog.innerHTML = "Server Connection Established!";
                    break;
                case 2:
                    outputLog.innerHTML = "Request Has Been Received!";
                    break;
                case 3:
                    outputLog.innerHTML = "Processing Request!"; 
                    break;
            }
        }
    }
    
    function onButtonPress(e){
        e.target.innerHTML = "Loading..";
        httpRequest.open("GET", serverURL, true);
        httpRequest.send();
    }
    
    function processData(data){
        var worldCupWinners = JSON.parse(data);
        var table = "<table><tr><td>Name</td><td>City</td><td>Country</td>";
        
        
        
        
        for(var i=0; i<worldCupWinners.length; i++){
            table += '<tr><td>' +
                worldCupWinners[i].Name +
                '</td><td>' +
                worldCupWinners[i].City +
                '</td><td>' +
                worldCupWinners[i].Country +
                '</td></tr>';
        }
        table += '</table>';
        outputLog.innerHTML = table;
    }
    
    
    
}