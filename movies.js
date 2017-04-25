function initialize () {
}

function sendRequest () {
   var xhr = new XMLHttpRequest();
   var query = encodeURI(document.getElementById("form-input").value);
   if(query.substr(0,2) == 'id')
   {
	    xhr.open("GET", "proxy.php?method=/3/movie/" + query.substr(5));
   }
   else
   {
	   xhr.open("GET", "proxy.php?method=/3/search/movie&query=" + query);
   }
   xhr.setRequestHeader("Accept","application/json");
   xhr.onreadystatechange = function () {
       if (this.readyState == 4 && this.status == 200) {
          var json = JSON.parse(this.responseText);
		  console.log(json);
		  var div = document.getElementById("output");
		  var div1 = document.getElementById("details");
		  div.innerHTML = "";
		  div1.innerHTML = "";
		  //div.innerHTML = div.innerHTML + "<ul style='list-style-type:disc'>";
		  if(typeof(json.results) != "undefined") 
		  {
		  for (var i in json.results)
		  {
			var id = JSON.stringify(json.results[i].id);
			var title = JSON.stringify(json.results[i].title);
			var date = JSON.stringify(parseInt(json.results[i].release_date));
			div.innerHTML = div.innerHTML + "<button class='accordion' onclick='jsfunction1("+id+")'>"+title+"("+date+")</button>";
			//div.innerHTML = div.innerHTML + "<pre><li>" + '<A HREF="javascript:jsfunction('+id+')">'+title+'</A>' + "-" + date + "</li></pre>";	
		  }
		  }
		  else
		  {
			var id = JSON.stringify(json.id);
			var title = JSON.stringify(json.title);
			var date = JSON.stringify(parseInt(json.release_date));
			div.innerHTML = div.innerHTML + "<button class='accordion' onclick='jsfunction1("+id+")'>"+title+"("+date+")</button>";
		  }
       }
   };
   xhr.send(null);
}


function jsfunction1 (id)
{
	var xhr1 = new XMLHttpRequest();
	xhr1.open("GET", "proxy.php?method=/3/movie/" + id);
	//xhr1.setRequestHeader("Accept","application/json");
	var div1 = document.getElementById("details");
	div1.innerHTML = "";
	xhr1.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
        var json = JSON.parse(this.responseText);
		//console.log(json);
		var result = json.genres.map(function(a) {return a.name;});
		div1.innerHTML = div1.innerHTML + "<div class = 'panel'>";
		div1.innerHTML = div1.innerHTML + "<b>"+json.title+"</b>("+parseInt(json.release_date)+")<br/>";
		div1.innerHTML = div1.innerHTML + "<b>"+"Genres: </b>"+result.toString() +"<br/>";
		div1.innerHTML = div1.innerHTML +"<b>"+ "Overview:</b> "+json.overview +"<br/>";
		div1.innerHTML = div1.innerHTML + "<img src= https://image.tmdb.org/t/p/w1000"+json.backdrop_path+" alt= 'Movie_Poster'>";
		div1.innerHTML = div1.innerHTML + "</div>";
	}
	};
	xhr1.send(null);
	var xhr2 = new XMLHttpRequest();
	xhr2.open("GET", "proxy.php?method=/3/movie/" + id+"/credits");
	//xhr2.setRequestHeader("Accept","application/json");
	xhr2.onreadystatechange = function () {
    if (this.readyState == 4) {
        var json = JSON.parse(this.responseText);
		var result = json.cast.map(function(a) {return a.name;});
		//for (j in json.cast){console.log(json.cast[j].name);}
		//console.log(result);
		var cst = json.cast.slice(1,6);
		div1.innerHTML = div1.innerHTML + "<div class = 'panel'>";
		div1.innerHTML = div1.innerHTML + "<b>Top Cast: </b>"+result.slice(1,6)+" and more...<br/>";
		div1.innerHTML = div1.innerHTML + "</div>";
	}
	};
	xhr2.send(null);
}


/*function jsfunction (id)
{
	//document.getElementById("details").innerHTML = ""+id;
	var xhr1 = new XMLHttpRequest();
	var div1 = document.getElementById("details");
	div1.innerHTML = ""+"<br/><br/>";
	xhr1.open("GET", "proxy.php?method=/3/movie/" + id);
	xhr1.setRequestHeader("Accept","application/json");
	xhr1.onreadystatechange = function () {
    if (this.readyState == 4) {
        var json = JSON.parse(this.responseText);
		console.log(json);
		var result = json.genres.map(function(a) {return a.name;});
		div1.innerHTML = div1.innerHTML + json.title+"<br/>";
		div1.innerHTML = div1.innerHTML + "Genres: "+result.toString() +"<br/>";
		div1.innerHTML = div1.innerHTML + "<img src= https://image.tmdb.org/t/p/w1000"+json.backdrop_path+" alt= 'Movie_Poster'>" 
	}
	};
	xhr1.send(null);
}*/




