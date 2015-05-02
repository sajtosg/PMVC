//Csoport tipus (azaz osztaly) letrehozasa

function csoportClass( nev, csapatok ) {
	//tulajdonsagai
	this.csapatok = csapatok;
	this.nev = nev;

	var myCsapatok = [];
	
	for ( x = 0; x< csapatok.length; x++ ) {
		myCsapatok[myCsapatok.length] = new Klipp( csapatok[x].Clip, csapatok[x].Title, csapatok[x].groupPoint);
	}

	
	//metodus hozzadasa:
	this.pontNovelese = function( mennyivel ) {
		this.pont += mennyivel;
	}
	
	this.toString = function() {
		return this.nev + " (" + this.pont + "pont)";
	}
	
	this.getCsapatok = function(){
		var s = '';
		
		for ( i = 0; i< csapatok.length; i++ ) {
			//console.log('aaa' + csapat[i]);
			//console.log('l');
			s = s + csapatok[i];
		}
		return s;
	}
}