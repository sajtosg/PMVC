//csapat tipus (azaz osztaly) letrehozasa
//mivel a csapat nevet mar ismerjuk, mikor letrehozzuk a csapat peldanyt
//ezert azt a letrehozasakor megadhatjuk:
function Csapat( nev ) {
	//tulajdonsagai
	this.nev = nev;
	this.pont = 0;
	
	//metodus hozzadasa:
	this.pontNovelese = function( mennyivel ) {
		this.pont += mennyivel;
	}
	
	this.toString = function() {
		return this.nev + " (" + this.pont + "pont)";
	}
}