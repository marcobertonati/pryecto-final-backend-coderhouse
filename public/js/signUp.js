console.log("SignUp working!");

function onHandleInputChange() {
  const password = document.getElementById("password").value;
  const passwordConfirmed = document.getElementById("passwordConfirmed").value;
  if (password === passwordConfirmed) {
    document.getElementById("btn-signUp").disabled = false;
    document.getElementById("btn-signUp").innerHTML = "¡Registrarme!";
  } else {
    document.getElementById("btn-signUp").disabled = true;
    document.getElementById("btn-signUp").innerHTML =
      "Las contraseñas deben coincidir para registrarse";
  }
}
