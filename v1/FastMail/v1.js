var numD = document.getElementById('grp-changelist-search-dossier'); //Ou inserer le numero 
var search = document.getElementsByClassName('grp-search-button')[0]; //pour le chercher
var load = document.getElementById("ajax_loader");////si le resultat n'est pas encore arriver
var existePas = document.getElementById('errornote');///affichage qu'il n'existe pas
var info =  document.getElementsByClassName('controls')[0];///info sur le courier
var ville = document.getElementsByClassName("status_txt"); ///information sur la ville de destination

var dateDep = info.children[0]; ///date depo
var dateRemise = info.children[2]; //date de remise a fast mail

///Sauvegarder les valeurs dans un tableau d'objet
tab = []; 


///Les variables pour le numero des dossiers
var date = "230621/";
var num = 0;
var charNum = "0001";
var plus = "/01";
test = true;


//Variable pour passer a une autre journee 
var nbInconnue = 0;
var maxInconue = 400;

//function qui verifier le num du dossier est extrait les donnees 
function verifier(){

	return new Promise(function(resolve, reject){
		setTimeout(function(){
			if(load.style.display == "block"){
				///La requete n'est pas terminer
				resolve(false);
			}else{
				if(existePas.style.display == "none"){
                    nbInconnue = 0; ///Remetre le conteur des dossier succesive inconnue
					let enr = {
							num : "",
							dateI : "",
							dateF : "",
							v : "" //ville
						};
					if(dateDep.textContent != ""){
						//extraire la date de dep 
						enr.num = numD.value;
						enr.dateI = dateDep.textContent.substring(13);
						if(dateRemise.textContent != ""){
							enr.dateF = dateRemise.textContent.substring(26);
                            if(typeof(ville[0]) == "undefined"){
                                enr.v = "";
                            }else{
                                enr.v = ville[0].textContent.substring(38);
                            }
						}else{
							enr.dateRemise = "";
							enr.v = "";
						}
						tab.push(enr);
						///Sauvegarder l'enregistrement
					}
				}else{
					nbInconnue++; //Incrimenter le conteur des dossier successive inconnue
				}
				resolve(true);
			}
			
		}, 500);
		
	});	
	
}

///La fonction qui verifier si le passeport est disponible
function verifierFin(){

	return new Promise(function(resolve, reject){
		setTimeout(function(){
			if(load.style.display == "block"){
				///La requete n'est pas terminer
				resolve(false);
			}else{
				if(existePas.style.display == "none"){
					let enr = {
							num : "",
							dateI : "",
							dateF : "",
							v : "" //ville
						};
					if(dateDep.textContent != ""){
						//extraire la date de dep 
						enr.num = numD.value;
						enr.dateI = dateDep.textContent.substring(13);

						if(dateRemise.textContent != ""){
							//extraire la date fin et la ville
							enr.dateF = dateRemise.textContent.substring(26);
							if(ville[0]){
								enr.v = ville[0].textContent.substring(38);
							}
							
							tab.push(enr);
						}
					}
				}else{
					let enr = {
						num : "",
						dateI : "",
						dateF : "",
						v : "" //ville
					};
					//Le passeport est a ete donne 
					enr.dateF = "2021-08-13";
					enr.v = "inconnu";
					enr.num = numD.value;
					enr.dateI = "2021-07-22";
					tab.push(enr);
				}

				resolve(true);
			}
			
		}, 100);
		
	});	
	
}

async function miseAjours(tabNum){

	let max = tabNum.length;
	let i = 0;

	while(i < tabNum.length){
			
		if(test == true){
			existePas.style.display = "none";
	
			numD.value = tabNum[i].num;
			
			search.click();

			i++;
		}
			test = await verifierFin();		
	}
}


async function lancer(jour1, jour2, mois){ //Recuperer les donners entre jour1 et jour2 inclue du mois 

	var j = jour1;
	while(j <= jour2){

		var nbfois = 500;
        if(j < 10){
            if(mois < 10){
                date = "0" + j + "0" + mois + "21/";
            }else{
                date = "0" + j + mois +"21/";
            }
            
        }else{
            if(mois < 10){
                date = j + "0" + mois + "21/";
            }else{
                date = j + mois +"21/";
            }
        }
	
		num = 0;
        
		nbInconnue = 0;
        maxInconue = 50;
		
		while(num < nbfois && nbInconnue < maxInconue){
			if(test == true){
				existePas.style.display = "none";
				num++;
				if(num < 10){
					charNum = "000" + num;
				}else if(num < 100){
					charNum = "00" + num;
				}else{
					charNum = "0"+num;
				}
				numD.value = date + charNum + plus;

				search.click();
			}
			test = await verifier();
		}

		j++;
	}
	
}




////Les fonctions d'echange avec le serveur

//Fonction de mis a jours des informations 
/*
var xhr = new XMLHttpRequest();
xhr.open("GET", 'http://localhost:8080/data', true);

//Envoie les informations du header adaptées avec la requête
xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

var body = JSON.stringify({c:"hello"});

var rep;
xhr.send(body);
xhr.onload = function(){
  rep = JSON.parse(this.response);
  console.log(rep);
}

*/

////Coter client envoyer le tableau des dossiers au serveur 
function envoyerDossier(){
	var xhr = new XMLHttpRequest();
	xhr.open("POST", 'http://localhost:8080/post', true);

	//Envoie les informations du header adaptées avec la requête
	xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

	var body = JSON.stringify(tab);

	xhr.send(body);
}


/*
var xhr = new XMLHttpRequest();
xhr.open("POST", 'http://localhost:8080/post', true);

//Envoie les informations du header adaptées avec la requête
xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

var body = JSON.stringify(tab1);

xhr.send(body);
*/
