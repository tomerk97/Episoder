let series = [{Name:"Series"}];
var inputseries = document.getElementById("seriesinput");
var inputdelete = document.getElementById("deleteinput");
var savebtn = document.getElementById("saveinput");
var deletebtn = document.getElementById("deletebtn");
var table=document.getElementById("seriestable");
var tabledata = document.getElementsByClassName("tablerows");



let refreshlast= function(){ //this function refresh the last watched line
	var sernum = series.length-1;
	if(sernum!=0){
	lastwatch.innerHTML=(`You Last Added: <br> "${series[sernum].Name}"`);
	}
	else{lastwatch.innerHTML="";}
}


let CheckifSeen = function(name){	//this series check if the series exists in the array,if true it returns the place in the array, else it returns false
	for(var i=0;i<series.length;i++)
		{
			if(name.toUpperCase() === series[i].Name.toUpperCase())
			{
				return i;
			}	
		}
	return false;
}


let addNew = function(NewName)	//this function add new object to the series array
{	if(NewName.length!=0){
		if(!CheckifSeen(NewName))
		{
		series.push({Name:NewName});
		}

		else
		{
			let place = CheckifSeen(NewName);
			series.splice(place, 1,{Name:NewName});	
			return place;		
		}
	}
	else
		alert("Missing Details");
}


let displayArray = function(){			//This function make the table, using the "series" array
	table.removeChild(table.lastChild);//Delete the old table 
	for(let i = 0 ; i<series.length;i++)//insert the new table
	{		
		var row = table.insertRow(i); 
		var cell1 = row.insertCell(0);
		row.setAttribute("class", "tablerows");
		cell1.innerHTML = series[i].Name;	
		var btn = document.createElement("BUTTON");   
		btn.setAttribute("id", ("buton"+i));
	}	
}
displayArray();

let refreshvalues = function(){		//this function reset the placeholders
	inputseries.value=null;
	
}

let deleteSeries =function()			//this function delete series from table and array by input
{
var wantToDelete= inputdelete.value;
		for(let i = 0 ; i<series.length;i++)
		{
			if(wantToDelete.toUpperCase()===series[i].Name.toUpperCase()&&wantToDelete!="Series")
			{
						series.splice(i, 1);
						alert(`${wantToDelete} Deleted`);
			}
		}
		inputdelete.value=null;
}

let refreshListener = function(){			//this function makes onclick listeners for evrey row using for loop
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
let addWithEnter = function(event){
	
	if(event.keyCode==13)
		{
			let selectrefresh = addNew(inputseries.value);

			displayArray();
			refreshvalues();
			if(selectrefresh>=0){
			refreshupdate(selectrefresh);
			}
			else{		
			refreshlast();}
			refreshListener();	
		}
}

let deleteWithEnter = function(event){
	if(event.keyCode==13)
	{
		var wantToDelete= inputdelete.value;
			for(let i = 0 ; i<series.length;i++)
			{
				if(wantToDelete.toUpperCase()===series[i].Name.toUpperCase()&&wantToDelete!="Series")
				{
							series.splice(i, 1);
							alert(`${wantToDelete} Deleted`);
				}
			}
			inputdelete.value=null;
	}
}

savebtn.addEventListener("click",function(){
		addNew(inputseries.value);
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

inputseries.addEventListener('keypress', function(){
 addWithEnter(event);

});



inputdelete.addEventListener('keypress',function(){
deleteWithEnter(event);
displayArray();
refreshlast();
})