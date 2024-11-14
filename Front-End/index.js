const url = "http://localhost:3000/data";
let listaNumeros = [];
let listaElegidos = [];
let actualPlayer = {
  name: "",
  tel: "",
  opc1: null,
  opc2: null,
};

const sendInfo = async (e) => {
  actualPlayer.name = document.getElementById("name").value;
  actualPlayer.tel = document.getElementById("tel").value;

  if (
    !actualPlayer.opc1 ||
    !actualPlayer.opc2 ||
    !actualPlayer.name ||
    !actualPlayer.tel
  ) {
    alert("Por favor, complete todos los campos y elija dos números.");
    return;
  }

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(actualPlayer),
    });

    const data = await response.json();
    console.log("Success:", data);
    resetPlayer();
    await createPage(); // Actualiza la página después de enviar la información
  } catch (error) {
    console.error("Error:", error);
  }
};

const resetPlayer = () => {
  actualPlayer = { name: "", tel: "", opc1: null, opc2: null };
  document.getElementById("name").value = "";
  document.getElementById("tel").value = "";
  document
    .querySelectorAll(".chosen")
    .forEach((el) => el.classList.remove("chosen"));
};

const getInfo = async () => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    listaElegidos = data.flatMap((player) => [player.opc1, player.opc2]);
  } catch (error) {
    console.error("Error:", error);
  }
};

const select = (e) => {
  const selectedNumber = Number(e.target.innerHTML);

  if (actualPlayer.opc1 === selectedNumber) {
    actualPlayer.opc1 = null;
    e.target.classList.remove("chosen");
  } else if (actualPlayer.opc2 === selectedNumber) {
    actualPlayer.opc2 = null;
    e.target.classList.remove("chosen");
  } else if (!actualPlayer.opc1) {
    actualPlayer.opc1 = selectedNumber;
    e.target.classList.add("chosen");
  } else if (!actualPlayer.opc2) {
    actualPlayer.opc2 = selectedNumber;
    e.target.classList.add("chosen");
  } else {
    alert("Solo puedes seleccionar dos números.");
  }
};

const createPage = async () => {
  await getInfo();
  console.log(listaElegidos);
  const page = document.querySelector(".grid-container");
  page.innerHTML = "";

  for (let i = 1; i <= 100; i++) {
    const div = document.createElement("div");
    div.textContent = i;
    div.className = "grid-item";

    if (listaElegidos.includes(i)) {
      div.classList.add("selected");
    } else {
      div.addEventListener("click", select);
    }

    page.appendChild(div);
  }
};

document.addEventListener("DOMContentLoaded", createPage);
