var express = require('express');
var http = require('http');
var mysql = require('mysql2');
var app = express();
var serveur = http.createServer(app);
var cors = require("cors");
var result; ///Sauvegarder les donnee 

app.use(express.static(__dirname + '/public'));

app.use(express.json({
    type: "*/*" // optional, only if you want to be sure that everything is parset as JSON. Wouldn't reccomend
}));

app.use(express.urlencoded({extended : true}));
app.use(cors());


///Initialiser les donnees de connection a la base de donnee 
mysqldata = {
	host: "db",
	user : "massi",
	password : "massi",
	database : "fastmail"
};

//create connection
db = mysql.createConnection(mysqldata);
//connection 
db.connect(function(err){
    if(err) throw err;
}); 

app.get("/", function(req, res){
    res.sendFile(__dirname + "/public/pages/index.html");
})

app.get("/gestionStats", function(req, res){
    res.sendFile(__dirname + "/public/pages/gestionStat.html");
})

//Recevoir les donnees a inserer dans la bd
app.post("/post",  function(req, res){
    
    result = req.body;
    
    
    result.forEach(async function(element){
        
        //fonction mise en forme la date 
        element.dateI = reglerDate(element.dateI);
        let ver = await verifier(element);
       
        if(element.dateF == ""){
            ///Sauvegarder sans date fin
            if(ver == false){
                let test = await inserer(element,1);
            }    
        }else{
            element.dateF = reglerDate(element.dateF);
            if(ver){
                //Mettre a jours
                let test = await inserer(element,3);
                
            }else{
                //sauvegarder avec date fin
                let test = await inserer(element,2);
                
            }
        }
    });
});


//Recevoir les donnees a inserer dans la bd
app.post("/post1",  function(req, res){
    result = req.body;
    console.log("Arriver")
    result.forEach(async function(element){
        
        let ver = await verifier(element);
        //console.log(element);
        
        if(element.dateF == ""){
            ///Sauvegarder sans date fin
            if(ver == false){
                let test = await inserer(element,1);
            }else if(element.tel != ""){
                let test = await inserer(element, 4);
            }    
        }else{
            if(ver){
                //Mettre a jours
                let test = await inserer(element,3);
                
            }else{
                //sauvegarder avec date fin
                let test = await inserer(element,2);      
            }
        }
    });

    return true; 
});


///Envoyer les donnees a verifier
app.get("/data", function(req, res){ 
    
    //Recuperer les nums des demande non traiter
    console.log("Hello how are you")

    let sql = "SELECT num FROM dossier where dateFin is NULL AND dateDep BETWEEN ? AND ?";
   
    // let sql = "SELECT num FROM dossier where dateDep = '2021-08-24'"
    db.query(sql, ["2023-01-01", "2024-12-31"], function(err, result, fields){
        if(err) throw err;
        
        res.send(result);
    });

});


//Envoyer les statistique demander
app.get("/statMois/:date", function(req,res){    
    var inf = JSON.parse(req.params.date);
    var mm = inf.m.substr(5,2);
    var yy = inf.m.substr(0,4);
    let sql;
    //console.log(mm, yy);
    ///Verifier que les donnee recu sont correte 
    if(mm< 13 && mm> 0 && inf.type > 0 && inf.type < 5){
        ///Verifier quelle requete executer
        if(inf.type == 1){ ///Le nombre de dossiers traiter et non traiter des jours du mois
            sql = "SELECT DAY(dateDep) as day, COUNT(dateFin) as nbFinTraitement, COUNT(*) - COUNT(dateFin) as nbEnTraitement FROM dossier WHERE MONTH(dateDep) = ? AND YEAR(dateDep) = ? GROUP BY dateDep ORDER BY dateDep";
        }else if(inf.type == 2){///Le nombre de dossiers traiter dans chaque jours du mois
            sql = "SELECT DAY(dateFin) as day, COUNT(*) as nbFinTraitement FROM dossier where MONTH(dateFin) = ? AND YEAR(dateDep) = ? GROUP BY dateFin ORDER BY dateFin";
        }else if(inf.type == 3){///Le nombre de passeport de tizi ouzou rendu dans chaque jours du mois 
            sql = "SELECT DAY(dateFin) as day, COUNT(*) as nbFinTraitement FROM dossier where MONTH(dateFin) = ? AND YEAR(dateDep) = ? AND ville LIKE 'TIZI%' GROUP BY dateFin ORDER BY dateFin";
        }else if(inf.type == 4.1){
            sql = "SELECT DISTINCT DAY(dateFin) as day FROM dossier where MONTH(dateFin) = ? AND YEAR(dateDep) = ? ORDER BY day";
        }else if(inf.type == 4.2){
            sql = "SELECT DATE_FORMAT(dateDep, '%d/%m') as day, DAY(dateFin) as dayFin, COUNT(dateDep) as nb FROM dossier where MONTH(dateFin) = ? AND YEAR(dateDep) = ? GROUP by day, dayfin";
        }
        ///Executer la requete et envoyer les donnees
        db.query(sql, [mm, yy], function(err, result, fields){
            if(err) throw err;

            
            res.send(result);
            
        });
    }
    
})

app.get("/statJour/:date", function(req,res){
    
    var inf = JSON.parse(req.params.date);
    console.log(inf);
    let sql;
    ///Verifier quelle requete executer
    if(inf.type == 1){
        sql = "SELECT dateDep as day, COUNT(dateFin) as nbFinTraitement, COUNT(*) - COUNT(dateFin) as nbEnTraitement FROM dossier WHERE dateDep = ? GROUP BY dateDep";
    }else if(inf.type == 2){
        sql = "SELECT DATE_FORMAT(dateFin, '%d/%m') as day, COUNT(dateFin) as nbFinTraitement FROM dossier WHERE dateDep = ? GROUP BY dateFin ORDER BY dateFin";
        
    }else if(inf.type == 3){
        sql = "SELECT DATE_FORMAT(dateFin, '%W %d/%m') as day, COUNT(dateFin) as nbFinTraitement FROM dossier WHERE dateDep = ? AND ville LIKE 'TIZI%' GROUP BY dateFin ORDER BY dateFin"; 
    }else if(inf.type == 4){
        sql = "SELECT DATE_FORMAT(dateDep, '%W %d/%m') as day, COUNT(*) as nbFinTraitement FROM dossier where dateFin = ? GROUP BY dateDep ORDER BY dateDep";
    }else if(inf.type == 5){
        sql = "SELECT DATE_FORMAT(dateFin, '%W %d/%m') as day, COUNT(dateFin) as nbFinTraitement FROM dossier WHERE dateDep = ? AND ville LIKE 'BEJAI%' GROUP BY dateFin ORDER BY dateFin";
    }else if(inf.type == 6){
        sql = "SELECT DATE_FORMAT(dateFin, '%W %d/%m') as day, COUNT(dateFin) as nbFinTraitement FROM dossier WHERE dateDep = ? AND ville LIKE 'ALGER%' GROUP BY dateFin ORDER BY dateFin";
    }else{
        //Ne rien faire 
    }
    db.query(sql, [inf.j], function(err, result, fields){
        if(err) throw err;
        
        res.send(result);
    });
})


app.post("/test", function(req, res){
    console.log("Hello")
})



function inserer(enr, type){ ///si 1 alors inserer que num et date depo si 2 alors tous inserer 
    return new Promise(async function(resolve, reject){
        let sql1 = "INSERT INTO dossier(num, dateDep, num_tel) VALUES (?,?,?)";
        let sql2 = "INSERT INTO dossier(num, dateDep, dateFin, ville, num_tel) VALUES (?,?,?,?,?)";
        let sql3 = "UPDATE dossier SET dateFin = ?, ville = ? WHERE num = ?";
        let sql4 = "UPDATE dossier SET num_tel = ? WHERE num = ?";
        
        if(type == 1){    
            db.query(sql1, [enr.num, enr.dateI, enr.tel], function(err, result, fields){
                if(err) throw err;
            
                if(result.affectedRows == 1){
                    resolve("true");
                }else{//sinon
                    resolve("false");
                }	
            });  
                   
        }else if(type == 2){
            db.query(sql2, [enr.num, enr.dateI, enr.dateF, enr.v, enr.tel], function(err, result, fields){
                if(err) throw err;
    
                if(result.affectedRows == 1){
                    resolve("true");
                }else{//sinon
                    resolve("false");
                }	
            });
        }else if(type ==3){
            db.query(sql3, [enr.dateF, enr.v, enr.num], function(err, result, fields){
                if(err) throw err;
    
                if(result.affectedRows == 1){
                    resolve("true");
                }else{//sinon
                    resolve("false");
                }	
            });
        }else if(type == 4){
            db.query(sql4, [enr.tel, enr.num], function(err, result, fields){
                if(err) throw err;
    
                if(result.affectedRows == 1){
                    resolve("true");
                }else{//sinon
                    resolve("false");
                }	
            });
        }
    });
}

function reglerDate(date){
    return date.substr(6,4) + "-" + date.substr(3,2) + "-" + date.substr(0,2);
}

function verifier(enr){
    return new Promise(function(resolve, reject){
        ///Avant d'ajouter verifier qu'il n'existe pas 
        let sqlExiste = "SELECT * FROM dossier WHERE num = ?";

        db.query(sqlExiste, [enr.num], function(err, result, fields){
            if(err) throw err;

            if(result.length > 0){
                resolve(true);
            }else{//sinon
                resolve(false);
            }	
        });  
    });
}



serveur.listen(8080);