////Les graphes 
//Pour stat par jour
var ctxJour1 = document.getElementById('chartJour1').getContext('2d');
var ctxJour2 = document.getElementById('chartJour2').getContext('2d');
var ctxJour3 = document.getElementById('chartJour3').getContext('2d');
var ctxJour4 = document.getElementById('chartJour4').getContext('2d');
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
                text: 'Dossier traite et non traite pour le jour',
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
            label: 'Passeport rendu vers de TIZI OUZOU',
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

var myChartJour4 = new Chart(ctxJour4, {
    plugins : [ChartDataLabels],                
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            type : 'bar',
            label: 'Passeport rendu le jour selectionne',
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
                text: 'Dossier traiter et non traiter chaque jour du mois',
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
                text: 'Passeport rendu vers tizi-ouzou pour chaque jours du mois',
                position : 'bottom'
            }
        }
    }
    
});

var myChart4 = new Chart(ctxMois4, {
    
    plugins : [ChartDataLabels],
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [] 
    },

    options : {
        plugins: {
            title: {
                display: true,
                text: 'Dossier traiter et non traiter pour chaque jours du mois',
                position : 'bottom'
            }
        },
        scales: {
            x: {
              stacked: true,
            },
            y: {
              stacked: true
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
    recupStatJour4();
}

function statistiqueMois(){
    recupStatMois1(); //Fonction qui recupere pour chaque jours du mois le nombre de dossier traiter et non traiter
    recupStatMois2(); ////Recupere le nombre de passeport rendu dans chaque jours du mois
    recupStatMois3(); ///Passeport rendu pour chaque jours du mois dans la wilaya de tizi
    //recupStatMois4();
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

function recupStatJour4(){
    var xhr = new XMLHttpRequest();
    let inf = {
        j : date.value,
        type : 4
    }
    inf = JSON.stringify(inf);
    xhr.open("GET", 'http://localhost:8080/statJour/'+inf, true);

    //Envoie les informations du header adaptées avec la requête
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.send(null);
    xhr.onload = function(){
        statistique = JSON.parse(this.response);
        

        myChartJour4.data.labels = [];
        myChartJour4.data.datasets[0].data = [];
        statistique.forEach(element => {
            myChartJour4.data.labels.push(element.day);
            myChartJour4.data.datasets[0].data.push(element.nbFinTraitement);
        });

        myChartJour4.update();
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
    var xhr = new XMLHttpRequest(); ///Recuperer les journnee ou il y a des reponses 

    let inf = {
        m : mois.value,
        type : 4.1
    }
    inf = JSON.stringify(inf);
    xhr.open("GET", 'http://localhost:8080/statMois/'+inf, true);

    //Envoie les informations du header adaptées avec la requête
    xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    xhr.send(null);
    xhr.onload = function(){
        statistique = JSON.parse(this.response);
        myChart4.data.labels = [];
        let fin = [];
        statistique.forEach(element => {
            myChart4.data.labels.push(element.day);
            fin.push(element.day);
        });

        myChart4.update();

        let xhr1 = new XMLHttpRequest();
        inf = {
            m : mois.value,
            type : 4.2
        }
        inf = JSON.stringify(inf);
        xhr1.open("GET", 'http://localhost:8080/statMois/'+inf, true);
    
        //Envoie les informations du header adaptées avec la requête
        xhr1.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    
        xhr1.send(null);
        xhr1.onload = function(){
            
            statistique = JSON.parse(this.response);
            console.log(statistique);
            let data = {
                type : 'bar',
                label: 'Fin traitement',
                data: [],
                backgroundColor : "#008000",
                fillColor: "#79D1CF",
                strokeColor: "#79D1CF",
                fillText : true,
                datalabels:{
                    align:'center',
                    anchor : 'center',
                    color :"#008000"
                }      
            };
            
            let jr = [];
            let i = 0;
            let nb = 0;
            jr.push(statistique[0].day);

            let or = [];
            
            statistique.forEach(element => {
                if(jr[i] == element.day){
                    or.push(element);
                    console.log(element);
                    nb++;
                }else{
                    ///Ajouter les donnee au graphe
                    data.color = couleur[i];
                    myChart4.data.datasets.push(data);
                    myChart4.data.datasets[i].labels = or[0].day;
                    fin.forEach(element => {
                        let j = 0; ///Passer a la valeur suivant
                        while(j < nb){
                            if(element == or[j].dayFin){
                                myChart4.data.datasets[i].data.push(or[j].nb);
                                j = -1; //La valeur est affecter
                            }
                            j++;
                        }
                        if(j != -1){
                            myChart4.data.datasets[i].data.push(0);
                        }
                    });
                    nb = 0;
                    or = [];
                    jr.push(element.day);
                }
            });
            mychart4.update();
            console.log("fait")
        }

    }
}

