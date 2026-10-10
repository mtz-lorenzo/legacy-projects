async function handleLogin() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    console.log(username, password);

    let datos = {
        username: username,
        password: password
    }

    const response = await fetch("http://localhost:4000/login", {
        method: "POST",
        body: JSON.stringify(datos),
        headers: {
            "Content-Type": "application/json",
        },
    })

    const respuesta = await response.json();
    if (respuesta.length != 0) {
        changeScreen();
    } else
        alert("Datos incorrectos");
}


async function handleRegister() {
    const username = document.getElementById("newUsername").value;
    const password = document.getElementById("newPassword").value;
    console.log(username, password);

    let datos = {
        username: username,
        password: password
    }

    const response = await fetch("http://localhost:4000/register", {
        method: "POST",
        body: JSON.stringify(datos),
        headers: {
            "Content-Type": "application/json",
        },
    })

    const respuesta = await response.json();
    if (respuesta.length != 0) {
        changeScreen();
    } else
        alert("Datos incorrectos");
}



async function handleCheckGuess(){
    const userGuess = document.getElementById("teamGuess").value.toUpperCase();
    console.log(userGuess);

    let datos = {
        userGuess: userGuess,
    }

    const response = await fetch("http://localhost:4000/checkGuess",{
        method: "POST",
        body: JSON.stringify(datos),
        headers: {
            "Content-Type": "application/json",
        },
    })
    
    const respuesta = await response.json();
    if (respuesta.length != 0 & userGuess == currentImage & score < 300){
        score = score + 10;
        console.log(score);
        updateScore(score);
        changeToNext();
        document.getElementById("teamGuess").value = "";
    } else {
        handleScoreFeedback();
    }
    
}

