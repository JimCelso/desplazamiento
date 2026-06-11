const especies =
document.querySelectorAll(".especie");

const popup =
document.getElementById("popup");

const titulo =
document.getElementById("titulo");

const imagen =
document.getElementById("imagen");

const descripcion =
document.getElementById("descripcion");

const grupo =
document.getElementById("grupo");

const estado =
document.getElementById("estado");

const habitat =
document.getElementById("habitat");

const amenaza =
document.getElementById("amenaza");

const importancia =
document.getElementById("importancia");

const cerrar =
document.getElementById("cerrar");

const audio =
document.getElementById("audio");

const ambienteBtn =
document.getElementById("ambienteBtn");

const filtros =
document.querySelectorAll(".filtro");

const nombresGrupo = {
    ave:"Ave",
    anfibio:"Anfibio",
    pez:"Pez",
    mamifero:"Mamifero",
    reptil:"Reptil"
};

function cerrarPopup(){

    popup.style.display = "none";
}

function marcarAudioActivo(){

    ambienteBtn.innerText = "Pausar sonido ambiental";
    ambienteBtn.classList.add("reproduciendo");
}

function marcarAudioInactivo(){

    ambienteBtn.innerText = "Activar sonido ambiental";
    ambienteBtn.classList.remove("reproduciendo");
}

function reproducirAmbiente(){

    const reproduccion =
    audio.play();

    if(reproduccion !== undefined){

        reproduccion
        .then(()=>{
            marcarAudioActivo();
        })
        .catch(()=>{
            marcarAudioInactivo();
        });
    }
}

especies.forEach(caja=>{

    caja.addEventListener("click",()=>{

        const nombre =
        caja.dataset.nombre;

        const img =
        caja.dataset.imagen;

        const texto =
        caja.dataset.texto;

        const datosGrupo =
        caja.dataset.grupo;

        const datosEstado =
        caja.dataset.estado;

        const datosHabitat =
        caja.dataset.habitat;

        const datosAmenaza =
        caja.dataset.amenaza;

        const datosImportancia =
        caja.dataset.importancia;

        if(!nombre) return;

        titulo.innerText = nombre;
        imagen.src = img;
        imagen.alt = nombre;
        descripcion.innerText = texto;
        grupo.innerText = nombresGrupo[datosGrupo] || datosGrupo;
        estado.innerText = datosEstado;
        habitat.innerText = datosHabitat;
        amenaza.innerText = datosAmenaza;
        importancia.innerText = datosImportancia;

        popup.style.display = "flex";
    });

});

filtros.forEach(boton=>{

    boton.addEventListener("click",()=>{

        const filtro =
        boton.dataset.filtro;

        filtros.forEach(opcion=>{
            opcion.classList.remove("activo");
        });

        boton.classList.add("activo");

        especies.forEach(caja=>{

            const coincide =
            filtro === "todas" || caja.dataset.grupo === filtro;

            caja.classList.toggle("oculta", !coincide);
        });
    });
});

cerrar.addEventListener("click",()=>{

    cerrarPopup();
});

popup.addEventListener("click",(evento)=>{

    if(evento.target === popup){
        cerrarPopup();
    }
});

document.addEventListener("keydown",(evento)=>{

    if(evento.key === "Escape" && popup.style.display === "flex"){
        cerrarPopup();
    }
});

ambienteBtn.addEventListener("click",()=>{

    if(audio.paused){

        reproducirAmbiente();

        return;
    }

    audio.pause();
    marcarAudioInactivo();
});

window.addEventListener("load",()=>{

    reproducirAmbiente();
});

document.addEventListener("click",()=>{

    if(audio.paused){
        reproducirAmbiente();
    }
},{once:true});
