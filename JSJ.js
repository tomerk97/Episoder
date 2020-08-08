let series = [{Name:"Series",Season:"Season",Episode:"Episode"}];
var inputseries = document.getElementById("seriesinput");
var inputepisode = document.getElementById("episodeinput");
var inputseason = document.getElementById("seasoninput");
var inputdelete = document.getElementById("deleteinput");
var savebtn = document.getElementById("saveinput");
var deletebtn = document.getElementById("deletebtn");
var lastwatch =document.getElementById("lastwatch");
var table=document.getElementById("seriestable");
var tabledata = document.getElementsByClassName("tablerows");



let refreshlast= function(){
	var sernum = series.length-1;
	if(sernum!=0){
	lastwatch.innerHTML=(`You Last Watched: <br> "${series[sernum].Name}", Season: ${series[sernum].Season}, Episode: ${series[sernum].Episode}`);
	}
	else{lastwatch.innerHTML="";}
}


let CheckifSeen = function(name){
	for(var i=0;i<series.length;i++)
		{
			if(name === series[i].Name)
			{
				return i;
			}	
		}
	return false;
}


let addNew = function(NewName, NewSeason,NewEpisode)
{	if(NewName.length!=0&&NewSeason.value!=0 && NewEpisode!=0&&NewName!="Series"){
		if(!CheckifSeen(NewName))
		{
		series.push({Name:NewName,Season:NewSeason,Episode:NewEpisode});
		}

		else
		{
			let place = CheckifSeen(NewName);
			series.splice(place, 1,{Name:NewName,Season:NewSeason,Episode:NewEpisode});			
		}
	}
	else
		alert("Missing Details");
}


let displayArray = function(){
	table.removeChild(table.lastChild);
	for(let i = 0 ; i<series.length;i++)
	{		
		var row = table.insertRow(i);
		var cell1 = row.insertCell(0);
		var cell2 = row.insertCell(1);
		var cell3 = row.insertCell(2);
		row.setAttribute("class", "tablerows");
		cell1.innerHTML = series[i].Name;
		cell2.innerHTML = series[i].Season;
		cell3.innerHTML = series[i].Episode;
		var btn = document.createElement("BUTTON");   
		btn.setAttribute("id", ("buton"+i));
	}	
}
displayArray();

let refreshvalues = function(){
	inputseries.value=null;
	inputseason.value=null;
	inputepisode.value=null;
}

let deleteSeries =function()
{
var wantToDelete= inputdelete.value;
		for(let i = 0 ; i<series.length;i++)
		{
			if(wantToDelete===series[i].Name&&wantToDelete!="Series")
			{
						series.splice(i, 1);
						alert(`${wantToDelete} Deleted`);
			}
		}
}

let refreshListener = function(){
	for(let i = 1 ; i<series.length;i++)
	{
		tabledata[i].addEventListener("click", function(){
			series.splice(i, 1);
			displayArray();
			refreshListener();
			refreshlast();
		})
	}
}

savebtn.addEventListener("click",function(){
		addNew(inputseries.value, inputseason.value , inputepisode.value);
		displayArray();
		refreshvalues();
		refreshlast();
		refreshListener();			
})

deletebtn.addEventListener("click",function(){
		deleteSeries();
		displayArray();
		refreshlast();
})

