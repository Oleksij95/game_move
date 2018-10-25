var count_arrow = 3;
(function(){
	var mass = [];
	var left_click = 0;
	var right_click = 0;
	
	document.getElementById("area").onclick = function(e){
		left_click += 1;
		right_click = 0;
		if(left_click > 1){
			return;
		}
		
		var navigation = document.getElementById("list_nav");
		var navigation_wrapper = document.getElementById("navigation");
		navigation_wrapper.classList.add("active_navigation");
		var area = document.getElementById("area"); 
		e.target.setAttribute("id", "active");
		for(var i = 0; i < count_arrow; i++){ 
			mass[i] = parseInt(2 - 0.5 + Math.random() * (3 - 1 + 1)); 
			navigation.innerHTML = navigation.innerHTML + '<li><img src ="/game_move/img/arrow_'+ mass[i] +'.jpg"></li>'; 
		}
		var start_time = setInterval(function() {
			var time = document.getElementById("time").innerText;
			time--;
			if(time >= 0 ){
				var set_time = document.getElementById("time").innerHTML = time;
				if (time <= 3){
					var get_class = document.getElementById("time").classList.add("last3s");
				}
			}
			else{
				alert("Время вышло");
				var count_loss = parseInt(document.getElementById("loss").innerHTML);
				document.getElementById("loss").innerHTML = count_loss + 1;
				clearInterval(start_time);
				reset_game();
			}
		}, 1000);
		document.getElementById("area").oncontextmenu = function(e){
			e.preventDefault();
			right_click += 1;
			
			if (right_click > 1) {
				return;
			}

			if (left_click < 1) {
				return;
			}

			left_click = 0;

			// e.target.setAttribute("id", "finish");
			e.target.setAttribute("class", "finish");
			clearInterval(start_time);
			// var finish = document.getElementById("finish");

			var finish_all = document.getElementsByClassName("finish");

			for (var fin = 0; fin < finish_all.length; fin++){
				var finish = finish_all[fin];
			}

			console.log(finish);

			function checkRezult(){
				var start = document.getElementById("active");
				var finish_element = start;
				for (var i = 0; i < mass.length; i++) {

					if(mass[i] == 4){
						var top = finish_element.previousElementSibling;
						if (!top){
							var tt = finish_element.parentNode.childNodes;
							for(var j = 0; j < tt.length - 1; j++){
								top = finish_element.parentNode.childNodes[j];	
							}
						}
						finish_element = top;
					}
					if(mass[i] == 2){
						var bottom = finish_element.nextElementSibling;
						if (!bottom){
							bottom = finish_element.parentNode.childNodes[1];
						}
						finish_element = bottom;
					}
					if (mass[i] == 3){
						if(!finish_element.parentNode.previousElementSibling){
							var all_list = finish_element.parentNode.parentNode.childNodes;
							var last_list = all_list[all_list.length - 2];
							var child_last_list = last_list.childNodes;
							for(var g = 0; g < child_last_list.length; g++){
								if (child_last_list[g].offsetTop ==  finish_element.offsetTop) {
									var left = child_last_list[g];
								}
							}
							finish_element = left;
						}else{
							var left_child = finish_element.parentNode.previousElementSibling.childNodes;
							for (var j = 0; j < left_child.length; j++) {
								if (left_child[j].offsetTop ==  finish_element.offsetTop) {
									var left = left_child[j];
								}
							}
							finish_element = left;
						}
					}
					if (mass[i] == 1){
						if(!finish_element.parentNode.nextElementSibling){
							var all_list_left = finish_element.parentNode.parentNode.childNodes;
							var first_list = all_list_left[1];
							var child_first_list = first_list.childNodes;
							for(var g = 0; g < child_first_list.length; g++){
								if (child_first_list[g].offsetTop ==  finish_element.offsetTop) {
									var left = child_first_list[g];
								}
							}
							finish_element = left;
						}else{
							var rigth_child = finish_element.parentNode.nextElementSibling.childNodes;
							for (var j = 0; j < rigth_child.length; j++) {
								if (rigth_child[j].offsetTop ==  finish_element.offsetTop) {
									var rigth = rigth_child[j];
								}
							}
							finish_element = rigth;
						}
					}
				}
				finish_element.classList.add("fin");
			if (finish_element.offsetTop == finish.offsetTop && finish_element.offsetLeft == finish.offsetLeft) {
				count_win = parseInt(document.getElementById("win").innerHTML);
				document.getElementById("win").innerHTML = count_win + 1;

				var reset_time = setInterval(function() {
					reset_game();
					clearInterval(reset_time);
				}, 1000);
			}
			else{
				var count_loss = parseInt(document.getElementById("loss").innerHTML);
				document.getElementById("loss").innerHTML = count_loss + 1;
				var reset_time = setInterval(function() {
					reset_game();
					clearInterval(reset_time);
				}, 1000);

			}
		};
		checkRezult();
	}
}

function reset_game(){
	 left_click = 0;
	 right_click = 0;
	var all_li = document.getElementsByTagName("li");
	var navigation = document.getElementById("list_nav");
	for (var i = 0; i < all_li.length; i++) {
		all_li[i].classList.remove("fin");
	}
	document.getElementById("active").setAttribute("id", "");

	if(document.getElementsByClassName("finish")){
		var finish_all = document.getElementsByClassName("finish");

			for (var j = 0; j < finish_all.length; j++){
				finish_all[j].setAttribute("class", "");
			}

		// document.getElementById("finish").setAttribute("class", ""); 
	}	

	document.getElementById("time").classList.remove("last3s");
	// document.getElementById("time").innerHTML = 9;
	setComplexity();
	navigation.innerHTML = "";
}

}());

function setComplexity(){
	var easy = document.getElementById("easy");
	var medium = document.getElementById("medium");
	var hard = document.getElementById("hard");

	if (easy.checked){
		document.getElementById("time").innerHTML = 9;
		count_arrow = 3;
	}else if(medium.checked){
		document.getElementById("time").innerHTML = 7;
		count_arrow = 4;
	}
	else{
		document.getElementById("time").innerHTML = 5;
		count_arrow = 6;
	}
}




function resetStatistics(e){
	document.getElementById("win").innerHTML = 0;
	document.getElementById("loss").innerHTML = 0;
}

function StartGame(){
	var navigation = document.getElementById("screen_saver");
	var progress_download = parseInt(document.getElementById("progress_download").style.width);
	var progress = document.getElementsByClassName("progress");

	for (var i = 0; i < progress.length; i++){
		progress[i].classList.remove("hidden");
	}

	var start_game = setInterval(function() {
		progress_download += 10;
		document.getElementById("progress_download").style.width = progress_download + "%";
		if (progress_download == 100 ) {
			navigation.classList.add("hidde");
			new WOW().init();
			clearInterval(start_game);
		}
	}, 300);
}


function ConfigFN(){
	var setting = document.getElementById("config");
	setting.classList.add("active");
};

function ClosePanelSettings() {
	 document.getElementById("config").classList.remove("active");;
}

