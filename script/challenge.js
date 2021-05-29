//This scrip is used to retrieve data from an API endpoints and display data to a web page
//No librairies or frameworks are allowed in this program.

//Creating an XML request element
var request = new XMLHttpRequest();

//Number of persons in the data
var number =0;

//Connecting to the API endpoints to get the data
request.open('GET', "http://sandbox.bittsdevelopment.com/code1/fetchemployees.php");

//Send the request to the server
request.send();

//Function used to process the data coming from the API
request.onload = function () {
	var selctArea=document.getElementById("showEmployee");
	var selctBtn=document.getElementById("submit");
	//If the request is not successful, the type of error will be displayed
	if(request.status!==200){
		alert("Error "+request.status+" "+request.statusText);
		
		//If everything went well, the data is processed
		} else{
	    //Getting the response from the API
		var response = request.response;
		
		//We convert the reesponse to JSON data
		var parsedData = JSON.parse(response);
		//console.log(parsedData);
		//console.log('length=' + Object.keys(parsedData).length);
		
		number = Object.keys(parsedData).length;
		
		
		//console.log('number=' + number);
		// var allNames=getEmployeeNames(parsedData);
		// selctArea.innerHTML=allNames;
		
		
		
		
		//DIsplay each person in the data
		for (var i = 1; i <= number; i++) {
			
			displayEmployee(parsedData[i]);
			
		}
		
		//selctBtn.onclick=display();
		
	}
	
	
}

//This function can be used to show a particular employee using a dropdown button 
/*function display(){
	
	var request = new XMLHttpRequest();
	
	//Number of persons in the data
	var number =0;
	
	//Connecting to the API endpoints to get the data
	request.open('GET', "http://sandbox.bittsdevelopment.com/code1/fetchemployees.php");
	
	//Send the request to the server
	request.send();
	var main = document.getElementById('all-staff');
	var selctArea=document.getElementById("showEmployee");
	var selctBtn=document.getElementById("submit");
	var selctArea=document.getElementById("showEmployee");
	
	//Function used to process the data coming from the API
	request.onload = function () {
		
		var selected=selctArea.options[selctArea.selectedIndex].value;
		//If the request is not successful, the type of error will be displayed
		if(request.status!==200){
			alert("Error "+request.status+" "+request.statusText);
			
			//If everything went well, the data is processed
			} else{
			//Getting the response from the API
			var response = request.response;
			
			//We convert the reesponse to JSON data
			
		}
		var parsedData = JSON.parse(response);
		console.log(parsedData);
		
		alert(selected);
		main.innerHTML="";
		for (var i = 1; i <= number; i++) {
			if(selected===i){
				displayEmployee(parsedData[i]);
				break;
			}
			
		}
		//console.log(parsedData[parseInt(selected)]);
		// displayEmployee(parsedData[selected]);
		
	}
	
}	*/






//This function can be used to populated the dropdown menu with employee names
function getEmployeeNames(data){
	var names="";
	number = Object.keys(data).length;
	var employee="";
	for (var i = 1; i <= number; i++) {
		employee=data[i];
		names+="<option value="+i+">"+employee.employeefname + ' ' + employee.employeelname +'</option>';
	}
	return names;
}

//This function displays the current employee
function displayEmployee(employee) {
	
	//The main element carrying all the employees
	var main = document.getElementById('all-staff');
	//Individual employee display element
	var frame = document.createElement('div');
	//Adding each employee to a class called "frame"
	frame.classList.add("frame");
	//Getting employee ID to display the right picture
	var employeeId = employee.employeeid;
	var picture = "http://sandbox.bittsdevelopment.com/code1/employeepics/" + employeeId + ".jpg";
	var employeeNames = employee.employeefname + ' ' + employee.employeelname;
	var employeeBio = employee.employeebio;
	var isFeatured = parseInt(employee.employeeisfeatured);
	//Roles and their colors
	var roles = employee.roles;
	
	//Crown for the featured employee
	var crown = document.createElement('div');
	crown.classList.add('crown');
	
	crown.innerHTML="&#128081;";
	//Creation of employee element
	var employee = document.createElement('div');
	//Add employee to picture class
	employee.classList.add('picture');
	//Employee picture
	var employeeImage = document.createElement('img');
	employeeImage.src = picture;
	employeeImage.alt = 'Picture of ' + employeeNames;
	
	//Append only non empty images
	if(employeeImage.src!=="")  employee.appendChild(employeeImage);
	
	var names = document.createElement('h2');
	names.innerHTML = employeeNames;
	
	var biographie = document.createElement('p');
	biographie.innerHTML = employeeBio;
	biographie.style.textAlign="justify";
	
	var favoriteRoles = document.createElement('p');
	
	//Associating the roles to the corresponding colors
	var text = '';
	var roleName = '';
	var roleColor = '';
	
	//If more than one role, insert 'and' before the last role
	if (roles.length > 1) {
		for (var j = 0; j < roles.length - 1; j++) {
			roleName = roles[j].rolename;
			roleColor = roles[j].rolecolor;
			
			text += '<span class="role" style="background-color:' + roleColor + ';">' + roleName + ' </span>';
		}
		
		text += 'and <span class="role" style="background-color:' + roles[roles.length - 1].rolecolor + ';">' + roles[roles.length - 1].rolename + ' </span>';
		text = '<span style="color:red;">'+ names.innerHTML + '</span> favourite roles are ' + text;
	} else {
		roleName = roles[0].rolename;
		roleColor = roles[0].rolecolor;
		text ='<span style="color:red;">'+ names.innerHTML + '</span> favourite role is <span class="role" style="background-color:' + roleColor + ';">' + roleName + ' </span>';
	}
	
	//Store roles and background color
	favoriteRoles.innerHTML = text;
	
	//Add crown to the featured employee
	if (isFeatured === 1) frame.appendChild(crown);
	
	
	//Adding all the elements to the DOM
	frame.appendChild(employee);
	frame.appendChild(names);
	if (biographie.innerHTML !=="") frame.appendChild(biographie);         //Empty biography not added
	if (favoriteRoles .innerHTML !=="") frame.appendChild(favoriteRoles); //Empty role not added
	main.appendChild(frame);
}


