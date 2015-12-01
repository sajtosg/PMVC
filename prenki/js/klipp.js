//csapat tipus (azaz osztaly) letrehozasa
//mivel a csapat nevet mar ismerjuk, mikor letrehozzuk a csapat peldanyt
//ezert azt a letrehozasakor megadhatjuk:
function Klipp( Clip, Title, groupPoint ) {
	//tulajdonsagai
	this.Clip = Clip;
	this.Title = Title;
	this.groupPoint = groupPoint;

	//metodus hozzadasa:
	this.pontNovelese = function( mennyivel ) {
		this.pont += mennyivel;
	}

	this.toString = function() {
		return this.Clip + " (" + this.pont + "pont...)";
	}
}