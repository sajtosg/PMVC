//ha betoltott az oldal:
$(document).ready( function() {
	fazisDivekZindexBeallitas();
	
$.getJSON('adatok/prenki.json', function( klippek ) {
		klippekFeldolgozasa(klippek);
	});	
	
});
 
 
//minden csoportot kÃ¼lÃ¶n megjelenitunk
function klippekFeldolgozasa(klippek) {
	//console.log(csapatok.csoportok[0].csapat3);

	for ( i = 0; i< klippek.groupSemiFinals.length; i++ ) {
		csoportKirajzolasa(klippek.groupSemiFinals[i], groupSemiFinals);
	}
	for ( i = 0; i< klippek.groupFinals.length; i++ ) {
		csoportKirajzolasa(klippek.groupFinals[i], groupFinals);
	}
	for ( i = 0; i< klippek.semiFinals.length; i++ ) {
		csoportKirajzolasa(klippek.semiFinals[i], semiFinals);
	}
	for ( i = 0; i< klippek.Final.length; i++ ) {
		csoportKirajzolasa(klippek.Final[i], Final);
	}
}

function csoportKirajzolasa( csoport, targetDiv ) {
	$('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
        disableOn: 700,
        type: 'iframe',
        mainClass: 'mfp-fade',
        removalDelay: 160,
        preloader: false,
 
        fixedContentPos: false
    });

	var csoportDiv = $( document.createElement('div') );
	//css osztaly hozzaadasa az elemhez:
	csoportDiv.addClass('csoport');
 
	csoportDiv.width("180");
 
	//csoport nevet hozzaadjuk:
	var cimDiv = $( document.createElement('div') );
 
	//szoveg beallitasa:
	cimDiv.html(csoport.GroupName + "<br />" + csoport.VoteDate);
	//css osztaly hozzaadasa:
 
	switch (csoport.Opened) {
		case "0":
			cimDiv.addClass('cim');
		break;
		case "1":
			cimDiv.addClass('aktivcim');
		break;
		case "2":
			cimDiv.addClass('todaycim');
		break;
	}
 
	csoportDiv.append(cimDiv);
  
 
	var csoportTomb = [];
 
	for ( ii = 0; ii< csoport.VideoClips.length; ii++ ) {
		//console.log(csoport.VideoClips[ii]);
		csoportTomb[csoportTomb.length] = new Klipp( csoport.VideoClips[ii].Clip, csoport.VideoClips[ii].Title, csoport.VideoClips[ii].groupPoint);
		//new Klipp( csoport.VideoClips[j] );
	}
	var myCsoport = new csoportClass(csoport.GroupName, csoportTomb);
	//console.log(myCsoport.getCsapatok());
	//console.log(csoportTomb);
	
	
	//hanyadik csapat
	klippSzamlalo = 1;
	//a tombben levo csapatok neveit kiirjuk:
		

	if (targetDiv.id == "groupSemiFinals"||targetDiv.id == "groupFinals"||targetDiv.id == "semiFinals"||targetDiv.id=="Final" || targetDiv.id == "_groupSemiFinals"||targetDiv.id == "_groupFinals"||targetDiv.id == "_semiFinals"||targetDiv.id=="_Final"){
		var belsoDiv = $( document.createElement('div') );
		csoportDiv.append(belsoDiv);

		belsoDiv.addClass("rownowrap");
			
		klippSzamlalo++;
	} else {
		belsoTab = $( document.createElement('table') );
		csoportDiv.append(belsoTab);
		$( belsoTab ).css('font-size', '9pt');
		$( belsoTab ).css('padding', '4px 0px 0px 0px');

		for (j = 0;j< myCsoport.csapatok.length; j++ ){
				newRow = $( document.createElement("tr") );
				newCell = $( document.createElement("td") );
				newCell.attr("width", "350px");
				//$(newRow).attr("height", "150px");
				$(newCell).attr("valign", "top");
				belsoTab.append(newRow);
				newRow.append(newCell);
				newCell2 = $( document.createElement("td") );
				$(newCell2).addClass("right");
				newRow.append(newCell2);
				
				if (cimDiv.hasClass('todaycim')) {
					newCell2.html("<button onclick=window.open('mailto:sajtos.gergo@telekom.hu?subject=PMVC3%20SZAVAZAT&body=" + myCsoport.csapatok[j].Title.split(' ').join('%20') +"')>szavazok</button>");
				} else {
					newCell2.html(myCsoport.csapatok[j].groupPoint + " p.");
				}
				var yturl = "https://www.youtube.com/watch?v="  +myCsoport.csapatok[j].Clip;
				var csapat = $( document.createElement("A") );
				var csapat_yturl = $( document.createElement("A") );
				$( csapat ).addClass("popup-youtube");
				$( csapat ).attr("href", yturl+"?controls=0&rel=0");
				$( csapat_yturl).attr("href", yturl);
				$( csapat ).html(klippSzamlalo + ". " + myCsoport.csapatok[j].Title +" <br />");
				$( csapat_yturl).html("<img src=\"kepek/YouTube_Icon.png\" width=30 height= 20>");

				newCell.append(csapat_yturl);
				newCell.append(csapat);
				klippSzamlalo++;
		};
	}
 
	switch (targetDiv.id){
		case "groupStage":
		case "_groupStage":
			$( csoportDiv ).mouseleave(function() {
				console.log('mouseleave');
				$( csoportDiv ).removeClass('expanded');
				$( csoportDiv ).animate({
					width: "180px",
					height: "40px",
					backgroundColor: "rgba(78, 0, 0, .2)"
				}, 150 );
			});
			$( csoportDiv ).mouseenter(function() {
				console.log('mouseenter');
				$( csoportDiv ).removeClass('expanded');
				$( csoportDiv ).animate({
					width: "380px",
					backgroundColor: "#ffffff"
				}, 350 );
			});
 
			$( cimDiv ).click(function(){
				console.log('click');
				if (csoport.Opened>0){
					if ($( csoportDiv ).hasClass('expanded')) {
						console.log('remove expand');
						$( csoportDiv ).removeClass('expanded');				
						$( csoportDiv ).animate({
							height: "40px",
							backgroundColor: "rgba(78, 0, 0, .2)"
						}, 150 );
					} else {	
						console.log('expand');
						$( csoportDiv ).addClass('expanded');
						$( csoportDiv ).animate({
							height: "230px",
							backgroundColor: "#ffffff"
						}, 150 );
					}	
				}
			});
 
		$( groupStage ).addClass("nowrap");
		break;
		case "groupSemiFinals":
		case "_groupSemiFinals":		
			$(cimDiv).height(42);
			$( csoportDiv ).mouseleave(function() {
				$( csoportDiv ).animate({
					width: "180px",
					height: "40px",
					backgroundColor: "rgba(200, 100, 0, .2)"
				}, 150 );
			});
			$( csoportDiv ).mouseenter(function() {
				$( csoportDiv ).removeClass('expanded');
				$( csoportDiv ).animate({
					width: "380px",
					backgroundColor: "#ffffff"
				}, 350 );
			});	
			$( csoportDiv ).click(function(){
				if (csoport.Opened>0){
					if ($( csoportDiv ).hasClass('expanded')) {
						$( csoportDiv ).removeClass('expanded');					
						$( csoportDiv ).animate({
							height: "40px",
							backgroundColor: "rgba(200, 100, 0, .2)"
						}, 150 );
					} else {
						if ($( csoportDiv ).hasClass('youTubeHozzaadva')) {
							console.log('youTube mÃ¡r Hozzaadva');
						} else {
							youTubeHozzaadasa(myCsoport, belsoDiv, csoport.Opened);
							$( csoportDiv ).addClass('youTubeHozzaadva');
						}
						
						$( csoportDiv ).addClass('expanded');
						$( csoportDiv ).animate({
							height: "200px",
							backgroundColor: "#ffffff"
						}, 150 );
					}	
				}
			});
		break;
		case "groupFinals":
		case "_groupFinals":		
			$(csoportDiv).height(94);
			$(cimDiv).height(96);
			$( csoportDiv ).mouseleave(function() {
				$( csoportDiv ).animate({
					width: "180px",
					height: "94px",
					backgroundColor: "rgba(230, 200, 22, .2)"
				}, 150 );
			});
			$( csoportDiv ).mouseenter(function() {
				$( csoportDiv ).removeClass('expanded');
				$( csoportDiv ).animate({
					width: "380px",
					backgroundColor: "#ffffff"
				}, 350 );
			});	
			$( csoportDiv ).click(function(){			
				if (csoport.Opened>0){
					if ($( csoportDiv ).hasClass('expanded')) {
						$( csoportDiv ).removeClass('expanded');					
						$( csoportDiv ).animate({
							height: "94px",
							backgroundColor: "rgba(200, 100, 0, .2)"
						}, 150 );
					} else {
						if ($( csoportDiv ).hasClass('youTubeHozzaadva')) {
							console.log('youTube mÃ¡r Hozzaadva');
						} else {
							youTubeHozzaadasa(myCsoport, belsoDiv, csoport.Opened);
							$( csoportDiv ).addClass('youTubeHozzaadva');
						}
						var rowHeight = 240;
						if (((csoportTomb.length/2)>1)){
							rowHeight = 400;
						}
						$( csoportDiv ).addClass('expanded');
						$( csoportDiv ).animate({
							height: rowHeight,
							backgroundColor: "#ffffff"
						}, 150 );
					}	
				}			
			});				
		break;
		case "semiFinals":
		case "_semiFinals":
			$(cimDiv).height(204);
			$(csoportDiv).height(202);
			$( csoportDiv ).mouseleave(function() {
				$( cimDiv ).animate({
					height: "204px"
				}, 150 );			
				$( csoportDiv ).animate({
					width: "180px",
					height: "202px",
					backgroundColor: "rgba(240, 200, 44, .2)"
				}, 150 );
			});
			$( csoportDiv ).mouseenter(function() {
				$( csoportDiv ).removeClass('expanded');
				$( csoportDiv ).animate({
					width: "380px",
					backgroundColor: "#ffffff"
				}, 350 );
			});
			$( csoportDiv ).click(function() {
				if (csoport.Opened>0){
					if ($( csoportDiv ).hasClass('expanded')) {
						$( csoportDiv ).removeClass('expanded');
						$( cimDiv ).animate({
							height: "204px"
						}, 150 );
						$( csoportDiv ).animate({
							height: "204px",
							backgroundColor: "rgba(240, 200, 44, .2)"
						}, 150 );
					} else {
						if ($( csoportDiv ).hasClass('youTubeHozzaadva')) {
							console.log('youTube mÃ¡r Hozzaadva');
						} else {
							youTubeHozzaadasa(myCsoport, belsoDiv, csoport.Opened);
							$( csoportDiv ).addClass('youTubeHozzaadva');
						}
						var rowHeight = 440;
						if (((csoportTomb.length/2)>1)){
							rowHeight = 600;
						}
						$( csoportDiv ).addClass('expanded');
						$( cimDiv ).animate({
							height: "40px"
						}, 150 );
						$( csoportDiv ).animate({
							backgroundColor: "#ffffff"
						}, 150 );			
					}
				}	
			});				
		break;
		case "Final":
		case "_Final":
			$(cimDiv).height(420);
			$(csoportDiv).height(418);
			$( csoportDiv ).mouseleave(function() {
				$( cimDiv ).animate({
					height: "420px"
				}, 150 );			
				$( csoportDiv ).animate({
					width: "180px",
					height: "418px",
					backgroundColor: "rgba(255, 220, 66, .2)"
				}, 150 );
			});
			$( csoportDiv ).mouseenter(function() {
				$( csoportDiv ).removeClass('expanded');
				$( csoportDiv ).animate({
					width: "380px",
					backgroundColor: "#ffffff"
				}, 350 );
			});
			$( csoportDiv ).click(function() {
				if (csoport.Opened>0){
					if ($( csoportDiv ).hasClass('expanded')) {
						$( csoportDiv ).removeClass('expanded');					
						$( cimDiv ).animate({
							height: "420px"
							//backgroundColor: "rgba(255, 220, 66, .2)"
						}, 150 );
						$( csoportDiv ).animate({
							height: "420px",
							backgroundColor: "rgba(255, 220, 66, .2)"
						}, 150 );
					} else {
						if ($( csoportDiv ).hasClass('youTubeHozzaadva')) {
							console.log('youTube mÃ¡r Hozzaadva');
						} else {
							youTubeHozzaadasa(myCsoport, belsoDiv, csoport.Opened);
							$( csoportDiv ).addClass('youTubeHozzaadva');
						}
						var rowHeight = 240;
						if (((csoportTomb.length/2)>1)){
							rowHeight = 400;
						}
						$( csoportDiv ).addClass('expanded');
						$( cimDiv ).animate({
							height: "40px"
						}, 150 );

						$( csoportDiv ).animate({			
							backgroundColor: "#ffffff"
						}, 150 );										
					}
				}
			});		
		break;		
	}
	
    $(targetDiv).append(csoportDiv);    
}
 
function fazisDivekZindexBeallitas() {
	$(groupSemiFinals).mouseenter(function() {
		$(groupSemiFinals).addClass("up");
	});
	$(groupSemiFinals).mouseleave(function() {
		$(groupSemiFinals).removeClass("up");
	});
	$(groupFinals).mouseenter(function() {
		$(groupFinals).addClass("up");
	});
	$(groupFinals).mouseleave(function() {
		$(groupFinals).removeClass("up");
	});
	$(semiFinals).mouseenter(function() {
		$(semiFinals).addClass("up");
	});
	$(semiFinals).mouseleave(function() {
		$(semiFinals).removeClass("up");
	});	
	$(Final).mouseenter(function() {
		$(Final).addClass("up");
	});
	$(Final).mouseleave(function() {
		$(Final).removeClass("up");
	});
}


function youTubeHozzaadasa(myCsoport, belsoDiv, Opened){
			for (j = 0;j< myCsoport.csapatok.length; j++ ){
				var innerDiv = $( document.createElement("div") );
				innerDiv.addClass("ovrflv");
				$( innerDiv ).attr("width", "187px");
				var csapat = $( document.createElement("IFrame") );
				var points = $( document.createElement("div") );
				points.addClass("points");
				
				if (Opened == 2) {
					$( points ).html("<center><button onclick=window.open('mailto:sajtos.gergo@telekom.hu?subject=PMVC3_SZAVAZAT&body=body')>szavazok</button></center>");
					
					
				} else {
					$( points ).html("<center>" + myCsoport.csapatok[j].groupPoint + " p.</center>");
				}
				
				//	$( points ).html("<center>" + myCsoport.csapatok[j].groupPoint + " p.</center>");
				
				if (myCsoport.nev == "Universe Final"){
					$( csapat ).attr("width", "260px");
					$( csapat ).attr("height", "160px");

					innerDiv.addClass("center");
				} else {
					$( csapat ).attr("width", "190px");
					$( csapat ).attr("height", "120px");				
				}
				if (myCsoport.csapatok[j].Clip!=""){
					$( csapat ).attr("src", "//www.youtube.com/embed/"+myCsoport.csapatok[j].Clip+"?controls=0&rel=0");
				}
				$( csapat ).attr("frameborder", "0");
	
				innerDiv.append(csapat);
				innerDiv.append(points);
				
				belsoDiv.append(innerDiv);
			};
}