document.getElementById("sign-up").addEventListener("click", function(event){
	event.preventDefault()
  });

  document.getElementById("log-in").addEventListener("click", function(event){
	event.preventDefault()
  });
  $(document).ready(function() {
	$(window).keydown(function(event){
	  if(event.keyCode == 13) {
		event.preventDefault();
		return false;
	  }
	});
  });
let dbReference = firebase.database();
let nombreUser ;
let passwdUser ;
let verifyPasswd ;
let correoUser ;
let telephoneUser ;
let usersCollection;
let usersReference = dbReference.ref("/users")

usersReference.on("value",(snapshot)=>{
		console.log(snapshot.val())	
		usersCollection = snapshot.val()
})
const addUser = () =>{

	$("#dynamic-title").removeClass("d-none")
	$("#dynamic p").text("Por favor ingresa los siguientes datos para registrarte o da click en Ingresar para iniciar sesión y ver la transmisión")
	
	if ($(".dynamic-elements").hasClass("d-none")) {
		$(".dynamic-elements").removeClass("d-none")
		$("#terms").removeClass("d-none")
	}else{

	nombreUser = ""
	passwdUser = ""
	verifyPasswd = ""
	correoUser = ""
	 nombreUser = $("#nombre").val()
	 passwdUser = $("#password").val()
	 verifyPasswd = $("#password-v").val()
	 correoUser = $("#correo").val()
	 phoneUser = $("#phone").val()
	
	if (nombreUser != "" &&correoUser!="" && passwdUser != "" && verifyPasswd != "" && phoneUser != "") {
		
		for(let i in usersCollection){
			console.log("cuantas veces entro",usersCollection[i].correo)
			if (correoUser == usersCollection[i].correo) {
				console.log(usersCollection[i].correo,"el correo ya llego")
				$("#alert").text("El correo ya fue registrado, intenta con otro")
				$("#alert").removeClass("d-none")
				$("#alert").removeClass("dissapear")
				setTimeout(() => {$("#alert").addClass("dissapear")}, 3000);
			setTimeout(() => {
			$("#alert").addClass("d-none")
			}, 3500);
			return false
			} 
		}
			if (passwdUser ==  verifyPasswd) {
				let newUser = {nombre:nombreUser,contra:passwdUser,correo:correoUser,telefono:phoneUser}
			console.log(newUser)
			usersReference.push(newUser)
			$("#alert").addClass("success")
			$("#alert").text("Tu registro has sido exitoso, en breve recibiras un correo con tus datos")
			$("#alert").removeClass("dissapear")
			$("#alert").removeClass("d-none")
			$("#correo").val("")
				$("#password").val("")
				$("#nombre").val("")
				$("#password-v").val("")
				$("#correo").val("")
				$("#phone").val("")
			setTimeout(() => {$("#alert").addClass("dissapear")}, 3000);
			setTimeout(() => {$(".login-container").addClass("d-none") 
			$("#alert").addClass("d-none")
			}, 3500);
			return false
			}else if(passwdUser !=  verifyPasswd){
				$("#alert").text("las contraseñas no coinciden")
				$("#alert").removeClass("dissapear")
				$("#alert").removeClass("d-none")
				setTimeout(() => {
					$("#alert").addClass("dissapear")
					$("#password").val("")
		
				$("#password-v").val("")
				}, 3000);
				setTimeout(() => {
					$("#alert").addClass("d-none")
		
				}, 3500);
			}else{

		$("#alert").text("Completa los campos faltantes")
		$("#alert").removeClass("d-none")
		$("#alert").removeClass("dissapear")
		setTimeout(() => {
			$("#alert").addClass("dissapear")
		}, 1000);
		setTimeout(() => {
			$("#alert").addClass("d-none")
		}, 1500);
	}

	}
	
	
}
}

	const grantUser = () =>{
		let grantCorreo = $("#correo").val()
		let grantPasswd = $("#password").val()
		grantPasswd = grantPasswd.toString()
		
		if(grantCorreo != "" && grantPasswd != ""){
			$.each(usersCollection,(key,value)=>{
			console.log(value.correo)
			console.log(typeof(value.contra))
			if(value.contra == grantPasswd){
				console.log("granted")
				$("#alert").removeClass("dissapear")
				$("#alert").addClass("success")
				$("#alert").removeClass("d-none")
				$("#alert").text("Gracias ya puedes ver y participar en la transmisión ")
				setTimeout(() => {
					$("#alert").addClass("dissapear")
				}, 3000);
				setTimeout(() => {
					$("#alert").removeClass("dissapear")
					$("#alert").addClass("d-none")
					$(".login-container").addClass("d-none")
				}, 3500);
					return false;
				
			}else{
				$("#alert").text("El correo o la contraseña son incorrectos")
		$("#alert").removeClass("d-none")
		$("#alert").removeClass("dissapear")
		setTimeout(() => {
			$("#alert").addClass("dissapear")
			$("#password").val("")
		}, 6000);
		setTimeout(() => {
			$("#alert").addClass("d-none")
		}, 6500);
			}


		})
	} else{
		$("#alert").text("Completa los campos faltantes")
		$("#alert").removeClass("d-none")
		$("#alert").removeClass("dissapear")
		setTimeout(() => {
			$("#alert").addClass("dissapear")
		}, 6000);
		setTimeout(() => {
			$("#alert").addClass("d-none")
		}, 6500);
	}


	}	


	// Set the date we're counting down to
var countDownDate = new Date("July 24, 2020 15:37:25").getTime();

// Update the count down every 1 second
var x = setInterval(function() {

  // Get today's date and time
  var now = new Date().getTime();
    
  // Find the distance between now and the count down date
  var distance = countDownDate - now;
    
  // Time calculations for days, hours, minutes and seconds
  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
  // Output the result in an element with id="demo"
  document.getElementById("counter").innerHTML = `<p>${days} dias</p> <p>${hours} horas </p><p>${ minutes}  minutos</p><p> ${ seconds } segundos</p>`
    
  // If the count down is over, write some text 
  if (distance < 0) {
    clearInterval(x);
    document.getElementById("counter").innerHTML = "Disfruta";
  }
}, 1000);

const cleanAndChange = (e) =>{
       $("#password").val("")
		$("#nombre").val("")
		$("#password-v").val("")
		$("#correo").val("")
	let btn = $(e).attr("id")
	if (btn == "log-in") {
		$(".dynamic-elements").addClass("d-none")
		$("#dynamic-title").addClass("d-none")
		$("#dynamic p").text("Ingresa tus datos para iniciar sesión")
		$("#terms").addClass("d-none")
		$("#log-in").attr("onclick","grantUser()")
		$("#sign-up").attr("onclick","cleanAndChange(this)")
	}else{
		$(".dynamic-elements").removeClass("d-none")
		$("#dynamic-title").removeClass("d-none")
		$("#dynamic p").text("Por favor ingresa los siguientes datos para registrarte o da click en Ingresar para iniciar sesión y ver la transmisión")
		$("#log-in").attr("onclick","cleanAndChange(this)")
		$("#sign-up").attr("onclick","addUser()")
		$("#terms").removeClass("d-none")
	}

}


	
