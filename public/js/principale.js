////Les graphes 
//Pour stat par jour
var ctxJour1 = document.getElementById('chartJour1').getContext('2d');
var ctxJour2 = document.getElementById('chartJour2').getContext('2d');
var ctxJour3 = document.getElementById('chartJour3').getContext('2d');

//Pour mois
var ctx = document.getElementById('myChart1').getContext('2d');
var ctx2 = document.getElementById('myChart2').getContext('2d');
var ctx3 = document.getElementById('myChart3').getContext('2d');
var ctxMois4 = document.getElementById('chartMois4').getContext('2d');

//Le mois et la date
var mois = document.getElementById("mois");
var date = document.getElementById("date");

////Dessiner les graphes
var myChartJour1 = new Chart(ctxJour1, {
    type : 'pie',
    plugins : [ChartDataLabels],
    data: {
        labels: ['Fin traitement', 'En traitement'],
        datasets: [{
            type : 'pie',
            label: 'Fin traitement',
            data: [],
            backgroundColor : ['#008000','#F00020'],
            datalabels:{
                align:'end',
                anchor : 'center',
                color :'#FFFFFF'
            }    
        }]
    },

    options : {
        plugins: {
            legend: {
                position: 'top',
            },  
            title: {
                display: true,
                text: 'Dossier traiter et non traiter pour le jour',
                position : 'bottom'
            }
        }
    }
    
});

var myChartJour2 = new Chart(ctxJour2, {
    plugins : [ChartDataLabels],                
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            type : 'line',
            label: 'Passeport rendu',
            data: [20, 40, 30, 60],
            backgroundColor : "#008000",
            datalabels:{
                align:'end',
                anchor : 'end',
                color :"#008000"
            }           
        }]
    },

    options : {
        plugins: {
            title: {
                display: true,
                text: 'Passeport rendu',
                position : 'bottom'
            }
        }
    }
    
});

var myChartJour3 = new Chart(ctxJour3, {
    plugins : [ChartDataLabels],                
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            type : 'line',
            label: 'Passeport rendu pour la wilaya de TIZI OUZOU',
            data: [20, 40, 30, 60],
            backgroundColor : "#008000",
            datalabels:{
                align:'end',
                anchor : 'center',
                color :"#008000"
            }           
        }]
    },

    options : {
        plugins: {
            title: {
                display: true,
                text: 'Passeport rendu',
                position : 'bottom'
            }
        }
    }
    
});

var myChart = new Chart(ctx, {
    
    plugins : [ChartDataLabels],
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            type : 'bar',
            label: 'Fin traitement',
            data: [],
            backgroundColor : "#008000",
            fillColor: "#79D1CF",
            strokeColor: "#79D1CF",
            fillText : true,
            datalabels:{
                align:'end',
                anchor : 'end',
                color :"#008000"
            }      
        },{
            type : 'bar',
            label: 'En traitement',
            data: [],
            backgroundColor: "#F00020",
            datalabels:{
                align:'end',
                anchor : 'end',
                color : "#F00020"
            }  
        }],

        
    },

    options : {
        plugins: {
            title: {
                display: true,
                text: 'Dossier traiter et non traiter pour le mois',
                position : 'bottom'
            }
        }
    }
    
});

var myChart2 = new Chart(ctx2, {
    plugins : [ChartDataLabels],                
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            type : 'line',
            label: 'Passeport rendu',
            data: [20, 40, 30, 60],
            backgroundColor : "#008000",
            datalabels:{
                align:'end',
                anchor : 'end',
                color :"#008000"
            }           
        }]
    },

    options : {
        plugins: {
            title: {
                display: true,
                text: 'Passeport rendu pour chaque jours du mois',
                position : 'bottom'
            }
        }
    }
    
});

var myChart3 = new Chart(ctx3, {
    plugins : [ChartDataLabels],                
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            type : 'line',
            label: 'Passeport rendu',
            data: [23],
            backgroundColor : "#008000",
            datalabels:{
                align:'end',
                anchor : 'end',
                color :"#008000"
            }           
        }]
    },

    options : {
        plugins: {
            title: {
                display: true,
                text: 'Passeport rendu a TIZI pour chaque jours du mois',
                position : 'bottom'
            }
        }
    }
    
});

var myChartMois4 = new Chart(ctxMois4, {
    plugins : [ChartDataLabels],                
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            type : 'line',
            label: 'Passeport rendu',
            data: [20, 40, 30, 60],
            backgroundColor : "#008000",
            datalabels:{
                align:'end',
                anchor : 'end',
                color :"#008000"
            }           
        }]
    },

    options : {
        plugins: {
            title: {
                display: true,
                text: 'Passeport rendu pour chaque jours du mois',
                position : 'bottom'
            }
        }
    }
    
});

//Les couleurs qui seront utiliser
var couleur = ["#FF0000", "#00FF00", "#0000FF", "#800000", "#FFFF00", "#808000", "#00FFFF", "#008080", "#FF00FF", "#800080"
    ,"#E9967A","#f1948a","#cd6155","#922b21","#c39bd3", "#2c3e50","#af7ac5", "#5499c7", "#5dade2", "#48c9b0", "#45b39d", "#52be80", "#f4d03f", "#eb984e", "#5d6d7e", "#1f618d", "#1a5276", "#9a7d0a", "#6e2c00", "#1c2833"];

var statistique;

miseAjourStatistique();

//Lors du changement du mois
mois.addEventListener("change", function(e){
    statistiqueMois();
});

//Lors du changement de la date
date.addEventListener("change", function(e){
    statistiqueJours(); 
});





function miseAjourStatistique(){
   statistiqueMois();
   statistiqueJours(); 
}

function statistiqueJours(){
    recupStatJour1();
    recupStatJour2();
    recupStatJour3();
}

function statistiqueMois(){
    recupStatMois1(); //Fonction qui recupere pour chaque jours du mois le nombre de dossier traiter et non traiter
    recupStatMois2(); ////Recupere le nombre de passeport rendu dans chaque jours du mois
    recupStatMois3(); ///Passeport rendu pour chaque jours du mois dans la wilaya de tizi
    //recupStatJour4();
}

function recupStatJour1(){
    var xhr = new XMLHttpRequest();

    let inf = {
        j : date.value,
        type : 1
    }
    inf = JSON.stringify(inf);
    xhr.open("GET", 'http://localhost:8080/statJour/'+inf, true);

    //Envoie les informations du header adaptées avec la requête
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.send(null);
    xhr.onload = function(){
        statistique = JSON.parse(this.response);
        
        myChartJour1.data.labels = ['Fin traitement', 'En traitement'];
        myChartJour1.data.datasets[0].data = [];
        statistique.forEach(element => {
            
            myChartJour1.data.datasets[0].data.push(element.nbFinTraitement);
            myChartJour1.data.datasets[0].data.push(element.nbEnTraitement);
        });
        
        myChartJour1.update();
    }
}

function recupStatJour2(){
    var xhr = new XMLHttpRequest();
    let inf = {
        j : date.value,
        type : 2
    }
    inf = JSON.stringify(inf);
    xhr.open("GET", 'http://localhost:8080/statJour/'+inf, true);

    //Envoie les informations du header adaptées avec la requête
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.send(null);
    xhr.onload = function(){
        statistique = JSON.parse(this.response);
        

        myChartJour2.data.labels = [];
        myChartJour2.data.datasets[0].data = [];
        statistique.forEach(element => {
            myChartJour2.data.labels.push(element.day);
            myChartJour2.data.datasets[0].data.push(element.nbFinTraitement);
        });

        myChartJour2.update();
        
    }
}

function recupStatJour3(){
    var xhr = new XMLHttpRequest();
    let inf = {
        j : date.value,
        type : 3
    }
    inf = JSON.stringify(inf);
    xhr.open("GET", 'http://localhost:8080/statJour/'+inf, true);

    //Envoie les informations du header adaptées avec la requête
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.send(null);
    xhr.onload = function(){
        statistique = JSON.parse(this.response);
        

        myChartJour3.data.labels = [];
        myChartJour3.data.datasets[0].data = [];
        statistique.forEach(element => {
            myChartJour3.data.labels.push(element.day);
            myChartJour3.data.datasets[0].data.push(element.nbFinTraitement);
        });

        myChartJour3.update();
        
    }
}

function recupStatMois1(){
    var xhr = new XMLHttpRequest();

    let inf = {
        m : mois.value,
        type : 1
    }
    inf = JSON.stringify(inf);
    xhr.open("GET", 'http://localhost:8080/statMois/'+inf, true);

    //Envoie les informations du header adaptées avec la requête
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.send(null);
    xhr.onload = function(){
        statistique = JSON.parse(this.response);
        console.log(statistique);

        myChart.data.labels = [];
        myChart.data.datasets[0].data = [];
        myChart.data.datasets[1].data = [];
        statistique.forEach(element => {
            myChart.data.labels.push(element.day);
            myChart.data.datasets[0].data.push(element.nbFinTraitement);
            myChart.data.datasets[1].data.push(element.nbEnTraitement);
        });

        myChart.update();
    }
}

function recupStatMois2(){
    var xhr = new XMLHttpRequest();
    
    
    let inf = {
        m : mois.value,
        type : 2
    }
    inf = JSON.stringify(inf);
    xhr.open("GET", 'http://localhost:8080/statMois/'+inf, true);

    //Envoie les informations du header adaptées avec la requête
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.send(null);
    xhr.onload = function(){
        statistique = JSON.parse(this.response);
        

        myChart2.data.labels = [];
        myChart2.data.datasets[0].data = [];
        statistique.forEach(element => {
            myChart2.data.labels.push(element.day);
            myChart2.data.datasets[0].data.push(element.nbFinTraitement);
        });

        myChart2.update();
        
    }
}

function recupStatMois3(){
    var xhr = new XMLHttpRequest();
    
    
    let inf = {
        m : mois.value,
        type : 3
    }
    inf = JSON.stringify(inf);
    xhr.open("GET", 'http://localhost:8080/statMois/'+inf, true);

    //Envoie les informations du header adaptées avec la requête
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.send(null);
    xhr.onload = function(){
        statistique = JSON.parse(this.response);
        

        myChart3.data.labels = [];
        myChart3.data.datasets[0].data = [];
        statistique.forEach(element => {
            myChart3.data.labels.push(element.day);
            myChart3.data.datasets[0].data.push(element.nbFinTraitement);
        });

        myChart3.update();
        
    }
}

function recupStatMois4(){
    var xhr = new XMLHttpRequest();

    let inf = {
        m : mois.value,
        type : 4
    }
    inf = JSON.stringify(inf);
    xhr.open("GET", 'http://localhost:8080/statMois/'+inf, true);

    //Envoie les informations du header adaptées avec la requête
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.send(null);
    xhr.onload = function(){
        statistique = JSON.parse(this.response);
        console.log(statistique);

        myChartMois4.data.labels = [];
        myChartMois4.data.datasets = [];
        
        let dateDep = []; //La liste des date de depo
        let nbDateDep = 0;
        let dateFin;
        let j = 0;
        for(let i = 0; i < statistique.length; i++){
            if(i == 0){
                dateDep[0] = statistique.dateDep
                nbDateDep++;

                dateFin = statistique[0].dayFin;

                myChartMois4.data.labels.push(element.dayFin);
                myChartMois4.data.datasets[nbDateDep] = {
                    type : 'bar',
                    label: '',
                    data: [],
                    backgroundColor: couleur[i],
                    datalabels:{
                        align:'center',
                        anchor : 'center',
                        color : couleur[i]
                    }  
                }
            }else{
                if(dateFin == statistique[i].dayFin){
                    //chercher la dateDep si elle equiste deja est l'ajouter 
                }
            }
            
        }
        let dateFin = statistique[0].dayFin;
        statistique.forEach(element => {
            if(element.dayFin != dateFin){

            }
            myChartMois4.data.labels.push(element.day);
            myChartMois4.data.datasets[0].data.push(element.nbFinTraitement);
            myChartMois4.data.datasets[1].data.push(element.nbEnTraitement);
        });

        myChartMois4.update();
    }
}