const section_form = document.querySelector('.section_form')
const form_cont = document.querySelector('#form')
const close = document.getElementById("close")
add_new_worker.addEventListener('click', () => {
    section_form.classList.remove('hidden')
})
close.addEventListener("click", () => {
    section_form.classList.add("hidden")
})





let list_staf = JSON.parse(localStorage.getItem("list_staf_local")) || []
let i = 0
let staf = {
    id: i,
    name: '',
    role: '',
    photo: '',
    email: '',
    numero: '',
    experiences: [],
}
let exp_employent = {
    entreprise: '',
    role_ent: '',
    date_debut: '',
    date_fin: '',
}

const experience = document.getElementById('experience')
const add_experience = document.getElementById('add_experience')

add_experience.addEventListener('click', (e) => {

    e.preventDefault()
    affiche_exp()


})
let container_exps = []

function affiche_exp() {

    let input_nom_entreprise = document.createElement("input")
    const div = document.createElement("div")
    div.className = "exp flex flex-wrap border-2 border-black rounded-[10px] m-1 p-2 w-full items-center gap-1"

    input_nom_entreprise.className = "nom_entreprise p-2 mb-2 h-10 border-b-3 border rounded-[5px] w-full"
    input_nom_entreprise.type = "text"
    input_nom_entreprise.placeholder = "le Nom de l'entreprise"
    input_nom_entreprise.setAttribute('required', '')


    let input_nom_poste = document.createElement("input")
    input_nom_poste.className = "nom_poste p-2 mb-2 h-10 border-b-3 border rounded-[5px] w-full"
    input_nom_poste.type = "text"
    input_nom_poste.placeholder = "le Nom de poste"
    input_nom_poste.setAttribute('required', '')



    let input_date_debut = document.createElement("input")
    input_date_debut.className = "date_start p-2 mb-2 h-10 border-b-3 border rounded-[5px] w-full"
    input_date_debut.type = "date"
    input_date_debut.placeholder = "la date de debut"
    input_date_debut.setAttribute('required', '')



    let input_date_fin = document.createElement("input")
    input_date_fin.className = "date_end p-2 mb-2 h-10 border-b-3 border rounded-[5px] w-full"
    input_date_fin.type = "date"
    input_date_fin.placeholder = "la date de fin"
    input_date_fin.setAttribute('required', '')



    const button = document.createElement("button")
    button.className = "font-[500] w-full rounded-[10px] bg-red-600 text-white text-[12px] p-1 h-8 border-2 hover:bg-red-400"
    button.textContent = "remove"

    div.addEventListener('change', () => {
        if (input_date_fin.value && input_date_fin.value < input_date_debut.value) {

            div.classList.add("bg-red-500/80")
            input_date_fin.value = '';
            Toastify({
                text: "verifie la date",
                duration: 3000,
                gravity: "top",
                position: "center",
                style: {
                    background: "red",
                    borderRadius: "10px",
                }
            }).showToast();
        }

        else {
            div.classList.remove("bg-red-500/80")
        }

    });

    button.addEventListener("click", (e) => {
        e.preventDefault()
        div.remove()
    })

    div.appendChild(input_nom_entreprise)
    div.appendChild(input_nom_poste)
    div.appendChild(input_date_debut)
    div.appendChild(input_date_fin)
    div.appendChild(button)
    experience.appendChild(div)
}

affiche_exp()


let Unassigned_Staff = document.querySelector("#Unassigned_Staff")
let exps = []
form_cont.addEventListener('submit', (e) => {
    e.preventDefault()

    console.log(container_exps);


    //regex name
    let name = document.getElementById('name').value.trim()
    let regex_name = /^[a-zA-Z\s]+$/

    //regex email
    let email = document.getElementById('email').value.trim()
    let regex_email = /^[a-zA-Z_.\d]+@[a-zA-Z]{1,7}\.(com|fr)$/

    //regex numero
    let numero = document.getElementById('numero').value.trim()
    let regex_numero = /^[0-9]{10}$/

    let role = document.getElementById('role').value.trim()
    let url = document.getElementById('url').value.trim()
    if (url === "") {
        url = "https://www.shutterstock.com/shutterstock/photos/1131880403/display_1500/stock-vector-user-profile-avatar-1131880403.jpg"
    }

    i = Number(localStorage.getItem("id")) || 0

    if (regex_name.test(name) && regex_email.test(email) && regex_numero.test(numero)) {
        let exp = document.querySelectorAll('.exp')
        exp.forEach(el => {
            let nom_entreprise = el.querySelector('.nom_entreprise').value
            let nom_poste = el.querySelector('.nom_poste').value
            let date_start = el.querySelector('.date_start').value
            let date_end = el.querySelector('.date_end').value
            exp_employent = {
                entreprise: nom_entreprise,
                role_ent: nom_poste,
                date_debut: date_start,
                date_fin: date_end,
            }
            container_exps.push(exp_employent)
            console.log(exp_employent);
            console.log(container_exps);

        })


        staf = {
            id: ++i,
            name: name,
            role: role,
            photo: url,
            email: email,
            numero: numero,
            experiences: container_exps,
        }

        // document.getElementById('url').value = ''
        container_exps = []
        form_cont.reset();
        localStorage.setItem("id", i)
        list_staf.push(staf)
        localStorage.setItem("list_staf_local", JSON.stringify(list_staf))
        function affiche_one_Unassigned_Staff() {

            Unassigned_Staff.innerHTML += `
            <div style="background: linear-gradient(45deg,rgba(10, 72, 37, 0.60),rgba(65, 100, 100, 0.60),rgba(10, 72, 37, 0.60));" class="flex p-2 duration-150 hover:scale-105 items-center text-white font-[800] border-2 border-green-500 rounded-[10px]">
                    <div class="flex gap-5 items-center">
                        <img onclick='affiche_info(${JSON.stringify(staf)},"Unassigned Staff")' src="${url}" width="18%" alt="Photo">
                        <div>
                            <p class="">${name}</p>
                            <p class="font-[400]">${role}</p>
                        </div>
                    </div>
                    <button onclick="suprime_empl(${i},'${name}')" class=" font-[500]  rounded-[10px] text-red-500 text-[12px] p-1 border-2 hover:bg-red-500 hover:text-white">remove</button>
                </div>
            `
        }
        affiche_one_Unassigned_Staff()
        photo.src = ""
        Toastify({
            text: "un nouveau employent : " + name + " / " + role,
            duration: 3000,
            gravity: "top",
            position: "center",
            style: {
                background: "green",
                borderRadius: "10px",
            }
        }).showToast();

    }
    else {
        Toastify({
            text: "enter votre donner correcte",
            duration: 3000,
            gravity: "top",
            position: "center",
            style: {
                background: "red",
                borderRadius: "10px",
            }
        }).showToast();
    }
})



let photo = document.getElementById("photo")
let url = document.getElementById("url")
url.addEventListener("input", () => {
    if (url.value.trim() !== "") {
        photo.src = url.value.trim()
    }
    else
        photo.src = "https://www.shutterstock.com/shutterstock/photos/1131880403/display_1500/stock-vector-user-profile-avatar-1131880403.jpg"

})

function suprime_empl(id, name) {
    list_staf = list_staf.filter(el => el.id !== id)
    localStorage.setItem("list_staf_local", JSON.stringify(list_staf))
    affiche_tous_Unassigned_Staff()
    console.log(name);

    Toastify({
        text: "vous avez suprimer : " + name,
        duration: 3000,
        gravity: "top",
        position: "center",
        style: {
            background: "red",
            borderRadius: "10px",
        }
    }).showToast();
}

function affiche_tous_Unassigned_Staff() {
    Unassigned_Staff.innerHTML = "";
    list_staf.forEach(el => {

        Unassigned_Staff.innerHTML += `
            <div style="background: linear-gradient(45deg,rgba(10, 72, 37, 0.60),rgba(65, 100, 100, 0.60),rgba(10, 72, 37, 0.60));" class="flex p-2 duration-150 hover:scale-105 items-center text-white font-[800] border-2 border-green-500 rounded-[10px]">
                    <div class="flex gap-5 items-center">
                        <img src="${el.photo}" onclick='affiche_info(${JSON.stringify(el)} , "Unassigned Staff")' width="18%" alt="Photo">
                        <div>
                            <p class="">${el.name}</p>
                            <p class="font-[400]">${el.role}</p>
                        </div>
                    </div>
                    <button onclick="suprime_empl((${el.id}),'${el.name}')" class=" font-[500]  rounded-[10px] text-red-500 text-[12px] p-1 border-2 hover:bg-red-500 hover:text-white">remove</button>
                </div>
            `
    })
}
affiche_tous_Unassigned_Staff()
let list_conference = []
let list_Receptionnistes = []
let list_serveurs = []
let list_securite = []
let list_personnel = []
let list_archive = []
let type_role = document.getElementById("type_role")

function affiche_Salle_conference() {
    type_role.textContent = "Salle de conférence"
    list_conference = list_staf
    let Worker = document.getElementById('Worker')
    Worker.innerHTML = "";
    list_conference.forEach(el => {

        Worker.innerHTML += `
            <div style="background: linear-gradient(45deg,rgba(10, 72, 37, 0.6),rgba(65, 100, 100, 0.7),rgba(10, 72, 37, 0.60));" class="duration-150 text-white hover:scale-105 flex p-2 items-center rounded-[10px]">
                    <div class="flex gap-5 items-center">
                        <img src="${el.photo}" width="18%" alt="Photo">
                        <div>
                            <p class="">${el.name}</p>
                            <p class="font-[400]">${el.role}</p>
                        </div>
                    </div>
                    <button onclick="add_conference(${el.id})"  class=" font-[500]  rounded-[10px] bg-green-700  text-[12px] p-2 hover:bg-green-500 ">add</button>
                </div>
                
            `
    })
}


function affiche_Salle_Reception() {
    type_role.textContent = "Réception"
    list_Receptionnistes = list_staf.filter(el => el.role === "Réceptionnistes" || el.role === "Manager" || el.role === "Nettoyage")
    let Worker = document.getElementById('Worker')
    Worker.innerHTML = "";
    list_Receptionnistes.forEach(el => {

        Worker.innerHTML += `
            <div style="background: linear-gradient(45deg,rgba(10, 72, 37, 0.6),rgba(65, 100, 100, 0.7),rgba(10, 72, 37, 0.60));" class="duration-150 text-white hover:scale-105 flex p-2 items-center rounded-[10px]">
                    <div class="flex gap-5 items-center">
                        <img src="${el.photo}" width="18%" alt="Photo">
                        <div>
                            <p class="">${el.name}</p>
                            <p class="font-[400]">${el.role}</p>
                        </div>
                    </div>
                    <button onclick="add_reception(${el.id})" class=" font-[500]  rounded-[10px] bg-green-700 text-white text-[12px] p-2 hover:bg-green-500 ">add</button>
                </div>
            `
    })
}

function affiche_Salle_serveurs() {
    type_role.textContent = "Salle des serveurs"
    list_serveurs = list_staf.filter(el => el.role === "Techniciens IT" || el.role === "Manager" || el.role === "Nettoyage")
    let Worker = document.getElementById('Worker')
    Worker.innerHTML = "";
    list_serveurs.forEach(el => {

        Worker.innerHTML += `
            <div style="background: linear-gradient(45deg,rgba(10, 72, 37, 0.6),rgba(65, 100, 100, 0.7),rgba(10, 72, 37, 0.60));" class="duration-150 text-white hover:scale-105 flex p-2 items-center rounded-[10px]">
                    <div class="flex gap-5 items-center">
                        <img src="${el.photo}" width="18%" alt="Photo">
                        <div>
                            <p class="">${el.name}</p>
                            <p class="font-[400]">${el.role}</p>
                        </div>
                    </div>
                    <button onclick="add_serveur(${el.id})" class=" font-[500]  rounded-[10px] bg-green-700 text-white text-[12px] p-2 hover:bg-green-500 ">add</button>
                </div>
            `
    })
}


function affiche_Salle_securite() {
    type_role.textContent = "Salle de sécurité"
    list_securite = list_staf.filter(el => el.role === "Sécurité" || el.role === "Manager" || el.role === "Nettoyage")
    let Worker = document.getElementById('Worker')
    Worker.innerHTML = "";
    list_securite.forEach(el => {

        Worker.innerHTML += `
            <div style="background: linear-gradient(45deg,rgba(10, 72, 37, 0.6),rgba(65, 100, 100, 0.7),rgba(10, 72, 37, 0.60));" class="duration-150 text-white hover:scale-105 flex p-2 items-center rounded-[10px]">
                    <div class="flex gap-5 items-center">
                        <img src="${el.photo}" width="18%" alt="Photo">
                        <div>
                            <p class="">${el.name}</p>
                            <p class="font-[400]">${el.role}</p>
                        </div>
                    </div>
                    <button onclick="add_securite(${el.id})" class=" font-[500]  rounded-[10px] bg-green-700 text-white text-[12px] p-2 hover:bg-green-500 ">add</button>
                </div>
            `
    })
}


function affiche_Salle_personnel() {
    type_role.textContent = "Salle du personnel"
    list_personnel = list_staf
    let Worker = document.getElementById('Worker')
    Worker.innerHTML = "";
    list_personnel.forEach(el => {

        Worker.innerHTML += `
            <div style="background: linear-gradient(45deg,rgba(10, 72, 37, 0.6),rgba(65, 100, 100, 0.7),rgba(10, 72, 37, 0.60));" class="duration-150 text-white hover:scale-105 flex p-2 items-center rounded-[10px]">
                    <div class="flex gap-5 items-center">
                        <img src="${el.photo}" width="18%" alt="Photo">
                        <div>
                            <p class="">${el.name}</p>
                            <p class="font-[400]">${el.role}</p>
                        </div>
                    </div>
                    <button onclick="add_perssone(${el.id})" class=" font-[500]  rounded-[10px] bg-green-700 text-white text-[12px] p-2 hover:bg-green-500 ">add</button>
                </div>
            `
    })
}


function affiche_Salle_archive() {
    type_role.textContent = "Salle d’archives"
    list_archive = list_staf.filter(el => el.role === "Manager")
    let Worker = document.getElementById('Worker')
    Worker.innerHTML = "";
    list_archive.forEach(el => {

        Worker.innerHTML += `
            <div style="background: linear-gradient(45deg,rgba(10, 72, 37, 0.6),rgba(65, 100, 100, 0.7),rgba(10, 72, 37, 0.60));" class="duration-150 text-white hover:scale-105 flex p-2 items-center rounded-[10px]">
                    <div class="flex gap-5 items-center">
                        <img src="${el.photo}" width="18%" alt="Photo">
                        <div>
                            <p class="">${el.name}</p>
                            <p class="font-[400]">${el.role}</p>
                        </div>
                    </div>
                    <button onclick="add_archive(${el.id})" class=" font-[500]  rounded-[10px] bg-green-700 text-white text-[12px] p-2 hover:bg-green-500 ">add</button>
                </div>
            `
    })
}




const open_worker = document.getElementById('open_worker')
const Salle_conference = document.getElementById('Salle_conference')
const Salle_Reception = document.getElementById('Salle_Reception')
const Salle_serveurs = document.getElementById('Salle_serveurs')
const Salle_scurite = document.getElementById('Salle_scurite')
const Salle_personnel = document.getElementById('Salle_personnel')
const Salle_archives = document.getElementById('Salle_archives')

const close_list = document.getElementById("close_list")

Salle_conference.addEventListener('click', () => {
    open_worker.classList.remove('hidden')
})

Salle_Reception.addEventListener('click', () => {
    open_worker.classList.remove('hidden')
})

Salle_serveurs.addEventListener('click', () => {
    open_worker.classList.remove('hidden')
})

Salle_scurite.addEventListener('click', () => {
    open_worker.classList.remove('hidden')
})

Salle_personnel.addEventListener('click', () => {
    open_worker.classList.remove('hidden')
})

Salle_archives.addEventListener('click', () => {
    open_worker.classList.remove('hidden')
})

close_list.addEventListener("click", () => {
    open_worker.classList.add("hidden")
})

let employent_dans_conference = JSON.parse(localStorage.getItem("conference")) || []
let employent_dans_reception = JSON.parse(localStorage.getItem("reception")) || []
let employent_dans_serveur = JSON.parse(localStorage.getItem("serveur")) || []
let employent_dans_securite = JSON.parse(localStorage.getItem("securite")) || []
let employent_dans_perssone = JSON.parse(localStorage.getItem("perssone")) || []
let employent_dans_archive = JSON.parse(localStorage.getItem("archive")) || []

function toast_add_worker(name , zone) {
    Toastify({
        text: "ajouter "+name+" au "+zone,
        duration: 3000,
        gravity: "top",
        position: "center",
        style: {
            background: "Downy",
            borderRadius: "10px",
        }
    }).showToast();
}

let cont_Salle_conference = document.getElementById("cont_Salle_conference")
function add_conference(id) {
    if (cont_Salle_conference.children.length < 8) {
        list_conference.forEach(el => {
            if (el.id === id) {
                employent_dans_conference.push(el)
                localStorage.setItem("conference", JSON.stringify(employent_dans_conference))
                affiche_conference()
                list_staf = list_staf.filter(el => el.id !== id)
                localStorage.setItem("list_staf_local", JSON.stringify(list_staf))
                affiche_tous_Unassigned_Staff()
                affiche_Salle_conference()
                toast_add_worker(el.name , 'Salle Conference')
            }
        })
    }
}

let cont_Salle_Reception = document.getElementById("cont_Salle_Reception")
function add_reception(id) {
    if (cont_Salle_Reception.children.length < 12) {

        list_Receptionnistes.forEach(el => {
            if (el.id === id) {
                employent_dans_reception.push(el)
                localStorage.setItem("reception", JSON.stringify(employent_dans_reception))
                affiche_reception()
                list_staf = list_staf.filter(el => el.id !== id)
                localStorage.setItem("list_staf_local", JSON.stringify(list_staf))
                affiche_tous_Unassigned_Staff()
                affiche_Salle_Reception()
                zone_restreinte_reception()
                toast_add_worker(el.name , 'Salle Reception')

            }
        })
    }

}

let cont_Salle_serveurs = document.getElementById("cont_Salle_serveurs")
function add_serveur(id) {
    if (cont_Salle_serveurs.children.length < 4) {

        list_serveurs.forEach(el => {
            if (el.id === id) {
                employent_dans_serveur.push(el)
                localStorage.setItem("serveur", JSON.stringify(employent_dans_serveur))
                affiche_serveur()
                list_staf = list_staf.filter(el => el.id !== id)
                localStorage.setItem("list_staf_local", JSON.stringify(list_staf))
                affiche_tous_Unassigned_Staff()
                affiche_Salle_serveurs()
                zone_restreinte_serveurs()
                toast_add_worker(el.name , 'Salle Serveur')
            }
        })
    }

}

let cont_Salle_scurite = document.getElementById("cont_Salle_scurite")
function add_securite(id) {
    if (cont_Salle_scurite.children.length < 4) {
        list_securite.forEach(el => {
            if (el.id === id) {
                employent_dans_securite.push(el)
                localStorage.setItem("securite", JSON.stringify(employent_dans_securite))
                affiche_securite()
                list_staf = list_staf.filter(el => el.id !== id)
                localStorage.setItem("list_staf_local", JSON.stringify(list_staf))
                affiche_tous_Unassigned_Staff()
                affiche_Salle_securite()
                zone_restreinte_securite()
                toast_add_worker(el.name , 'Salle Securite')
            }
        })
    }


}

let cont_Salle_personnel = document.getElementById("cont_Salle_personnel")
function add_perssone(id) {
    if (cont_Salle_personnel.children.length < 4) {

        list_personnel.forEach(el => {
            if (el.id === id) {
                employent_dans_perssone.push(el)
                localStorage.setItem("perssone", JSON.stringify(employent_dans_perssone))
                affiche_perssone()
                list_staf = list_staf.filter(el => el.id !== id)
                localStorage.setItem("list_staf_local", JSON.stringify(list_staf))
                affiche_tous_Unassigned_Staff()
                affiche_Salle_personnel()
                toast_add_worker(el.name , 'Salle Personel')
            }
        })
    }


}

let cont_Salle_archives = document.getElementById("cont_Salle_archives")
function add_archive(id) {
    if (cont_Salle_archives.children.length < 4) {

        list_archive.forEach(el => {
            if (el.id === id) {
                employent_dans_archive.push(el)
                localStorage.setItem("archive", JSON.stringify(employent_dans_archive))
                affiche_archive()
                list_staf = list_staf.filter(el => el.id !== id)
                localStorage.setItem("list_staf_local", JSON.stringify(list_staf))
                affiche_tous_Unassigned_Staff()
                affiche_Salle_archive()
                zone_restreinte_archive()
                toast_add_worker(el.name , 'Salle Archive')
            }
        })
    }

}

const section_info = document.getElementById('section_info')
function affiche_info(el, zone) {

    section_info.classList.remove("hidden")
    section_info.innerHTML = `
    <div style="background: linear-gradient(45deg,rgba(0, 0, 0, 0.87),rgba(87, 87, 87, 0.81),rgba(0, 0, 0, 0.87));" class="relative w-95 items-center flex flex-col lg:p-4 p-4 gap-2 lg:w-160 text-white rounded-[10px] font-[400]">
        <h2 class="font-[800] text-gray-300 lg:text-[50px] text-[20px]">${el.name}</h2>
        <div class="flex flex-col items-center lg:gap-4 gap-2 ">
        <div class="flex justify-center items-center gap-5 lg:gap-7">
        <img src="${el.photo}" alt="photo" class="w-[35%] rounded-[15px] ">
        <div class="flex w-[65%] flex-col text-[15px] lg:text-[18px] justify-center gap-2">
        <h3><span class="font-[700]">Role :</span> ${el.role}</h3>
        <p><span class="font-[700]">email :</span> ${el.email}</p>
        <p><span class="font-[700]">numero :</span> ${el.numero}</p>
        </div>
        </div>
        <h3 class="font-[700]">Expériences</h3>
            <div class="flex lg:items-start flex-col gap-2 h-50 lg:ml-5 lg:h-65 overflow-y-scroll [scrollbar-width:none]">
                <div id="list_experience" class="font-[400] lg:text-[16px] text-[12px]">
                
                </div>
                
            </div>
        </div>
        <p class="font-[500]">localisation actuelle : <span class="font-[700]  text-[18px]">${zone}</span></p>
        <button id="close_info" class="rounded-[5px] w-8 bg-red-700 text-white absolute lg:left-145 left-82 hover:bg-red-400">X</button>
    </div> 
    
    `
    let list_experience = document.getElementById("list_experience")

    el.experiences.forEach(exp => {

        list_experience.innerHTML += ` 
            <p class="flex gap-2 w-full"><span class="p-2 border-1 rounded-[10px] border-b-3 w-[25%] text-center flex flex-wrap justify-center items-center">entreprise : ${exp.entreprise}</span><span class="p-2 border-1 rounded-[10px] border-b-3 w-[25%] text-center flex flex-wrap justify-center items-center ">poste : ${exp.role_ent}</span><span class="p-2 border-1 rounded-[10px] border-b-3 w-[25%] text-center flex flex-wrap justify-center items-center">date debut : ${exp.date_debut}</span><span class="p-2 border-1 rounded-[10px] border-b-3 w-[25%] text-center flex flex-wrap justify-center items-center">date de fin :  ${exp.date_fin}</span></p>

        `

    })


    let close_info = document.getElementById("close_info")
    close_info.addEventListener('click', () => {
        section_info.classList.add("hidden")
    })




}

function retour_conference_Staff(el) {
    list_staf.push(el)
    localStorage.setItem("list_staf_local", JSON.stringify(list_staf))
    affiche_tous_Unassigned_Staff()
    supprime_conference(el.id)
}

function supprime_conference(id) {
    employent_dans_conference = employent_dans_conference.filter(el => el.id !== id)
    localStorage.setItem("conference", JSON.stringify(employent_dans_conference))
    affiche_conference()

}


function retour_reception_Staff(el) {
    list_staf.push(el)
    localStorage.setItem("list_staf_local", JSON.stringify(list_staf))
    affiche_tous_Unassigned_Staff()
    supprime_reception(el.id)

}

function supprime_reception(id) {
    employent_dans_reception = employent_dans_reception.filter(el => el.id !== id)
    localStorage.setItem("reception", JSON.stringify(employent_dans_reception))
    affiche_reception()
    zone_restreinte_reception()


}


function retour_serveur_Staff(el) {

    list_staf.push(el)
    localStorage.setItem("list_staf_local", JSON.stringify(list_staf))
    affiche_tous_Unassigned_Staff()
    supprime_serveur(el.id)

}

function supprime_serveur(id) {
    employent_dans_serveur = employent_dans_serveur.filter(el => el.id !== id)
    localStorage.setItem("serveur", JSON.stringify(employent_dans_serveur))
    affiche_serveur()
    zone_restreinte_serveurs()

}

function retour_securite_Staff(el) {

    list_staf.push(el)
    localStorage.setItem("list_staf_local", JSON.stringify(list_staf))
    affiche_tous_Unassigned_Staff()
    supprime_securite(el.id)

}

function supprime_securite(id) {
    employent_dans_securite = employent_dans_securite.filter(el => el.id !== id)
    localStorage.setItem("securite", JSON.stringify(employent_dans_securite))
    affiche_securite()
    zone_restreinte_securite()
}

function retour_perssone_Staff(el) {

    list_staf.push(el)
    localStorage.setItem("list_staf_local", JSON.stringify(list_staf))
    affiche_tous_Unassigned_Staff()
    supprime_perssone(el.id)

}

function supprime_perssone(id) {
    employent_dans_perssone = employent_dans_perssone.filter(el => el.id !== id)
    localStorage.setItem("perssone", JSON.stringify(employent_dans_perssone))
    affiche_perssone()
}

function retour_archive_Staff(el) {

    list_staf.push(el)
    localStorage.setItem("list_staf_local", JSON.stringify(list_staf))
    affiche_tous_Unassigned_Staff()
    supprime_archive(el.id)

}

function supprime_archive(id) {
    employent_dans_archive = employent_dans_archive.filter(el => el.id !== id)
    localStorage.setItem("archive", JSON.stringify(employent_dans_archive))
    affiche_archive()
    zone_restreinte_archive()
}

function affiche_conference() {
    cont_Salle_conference.innerHTML = ""
    employent_dans_conference.forEach(el => {
        cont_Salle_conference.innerHTML += `
        <div class="hover:scale-105 duration-150 relative rounded-[5px] flex bg-gray-400  p-[4px]">
            <div onclick='affiche_info(${JSON.stringify(el)} ,"Salle Conference")' class="flex relative flex-col items-center text-white lg:text-[9px] text-[3px] font-[700]">
                <img id="${el.id}"  src="${el.photo}" alt="photo" class="w-4 lg:w-10 lg:h-10 relative h-4 bg-blue-500 rounded-full">
                <p class="absolute bg-black lg:red-500 lg:w-12 lg:top-10 w-6 px-[1px] py-[1px] top-4 rounded-full">${el.name}</p> 
            </div>
            <div class="flex items-start">
                <button onclick='retour_conference_Staff(${JSON.stringify(el)})' class="absolute lg:bottom-10 right-[0px] bottom-5 rounded-full lg:w-3 lg:text-[8px] text-[5px] bg-red-600 text-white w-2 hover:bg-red-400">X</button>
             </div>
        </div>


            `
    })
}

function affiche_reception() {
    cont_Salle_Reception.innerHTML = ""
    employent_dans_reception.forEach(el => {
        cont_Salle_Reception.innerHTML += `
        <div class="hover:scale-105 duration-150 relative rounded-[5px] flex bg-gray-400  p-[4px]">
            <div onclick='affiche_info(${JSON.stringify(el)} , "Salle Reception")' class="flex relative flex-col items-center text-white lg:text-[9px] text-[3px] font-[700]">
                <img id="${el.id}"  src="${el.photo}" alt="photo" class="w-4 lg:w-10 lg:h-10 relative h-4 bg-blue-500 rounded-full">
                <p class="absolute bg-black lg:red-500 lg:w-12 lg:top-10 w-6 px-[1px] py-[1px] top-4 rounded-full">${el.name}</p> 
            </div>
            <div class="flex items-start">
                <button onclick='retour_reception_Staff(${JSON.stringify(el)})' class="absolute lg:bottom-10 right-[0px] bottom-5 rounded-full lg:w-3 lg:text-[8px] text-[5px] bg-red-600 text-white w-2 hover:bg-red-400">X</button>
            </div>
        </div>
            `
    })
}


function affiche_serveur() {
    cont_Salle_serveurs.innerHTML = ""
    employent_dans_serveur.forEach(el => {
        cont_Salle_serveurs.innerHTML += `
        <div class="hover:scale-105 duration-150 relative rounded-[5px] flex bg-gray-400  p-[4px]">
            <div onclick='affiche_info(${JSON.stringify(el)} , "Salle Serveur")' class="flex relative flex-col items-center text-white lg:text-[9px] text-[3px] font-[700]">
                <img id="${el.id}"  src="${el.photo}" alt="photo" class="w-4 lg:w-10 lg:h-10 relative h-4 bg-blue-500 rounded-full">
                <p class="absolute bg-black lg:red-500 lg:w-12 lg:top-10 w-6 px-[1px] py-[1px] top-4 rounded-full">${el.name}</p> 
            </div>
            <div class="flex items-start">
                <button onclick='retour_serveur_Staff(${JSON.stringify(el)})' class="absolute lg:bottom-10 right-[0px] bottom-5 rounded-full lg:w-3 lg:text-[8px] text-[5px] bg-red-600 text-white w-2 hover:bg-red-400">X</button>
            </div>
        </div>
            `
    })
}


function affiche_securite() {
    cont_Salle_scurite.innerHTML = ""
    employent_dans_securite.forEach(el => {
        cont_Salle_scurite.innerHTML += `
        <div class="hover:scale-105 duration-150 relative rounded-[5px] flex bg-gray-400  p-[4px]">
            <div onclick='affiche_info(${JSON.stringify(el)}, "Salle Securite")' class="flex relative flex-col items-center text-white lg:text-[9px] text-[3px] font-[700]">
                <img id="${el.id}"  src="${el.photo}" alt="photo" class="w-4 lg:w-10 lg:h-10 relative h-4 bg-blue-500 rounded-full">
                <p class="absolute bg-black lg:red-500 lg:w-12 lg:top-10 w-6 px-[1px] py-[1px] top-4 rounded-full">${el.name}</p> 
            </div>
            <div class="flex items-start">
                <button onclick='retour_securite_Staff(${JSON.stringify(el)})' class="absolute lg:bottom-10 right-[0px] bottom-5 rounded-full lg:w-3 lg:text-[8px] text-[5px] bg-red-600 text-white w-2 hover:bg-red-400">X</button>
            </div>
        </div>
            `
    })
}


function affiche_perssone() {
    cont_Salle_personnel.innerHTML = ""
    employent_dans_perssone.forEach(el => {
        cont_Salle_personnel.innerHTML += `
        <div class="hover:scale-105 duration-150 relative rounded-[5px] flex bg-gray-400  p-[4px]">
            <div onclick='affiche_info(${JSON.stringify(el)} , "Salle Personel")' class="flex relative flex-col items-center text-white lg:text-[9px] text-[3px] font-[700]">
                <img id="${el.id}"  src="${el.photo}" alt="photo" class="w-4 lg:w-10 lg:h-10 relative h-4 bg-blue-500 rounded-full">
                <p class="absolute bg-black lg:red-500 lg:w-12 lg:top-10 w-6 px-[1px] py-[1px] top-4 rounded-full">${el.name}</p> 
            </div>
            <div class="flex items-start">
                <button onclick='retour_perssone_Staff(${JSON.stringify(el)},"perssone")' class="absolute lg:bottom-10 right-[0px] bottom-5 rounded-full lg:w-3 lg:text-[8px] text-[5px] bg-red-600 text-white w-2 hover:bg-red-400">X</button>
            </div>
        </div>
            `
    })
}


function affiche_archive() {
    cont_Salle_archives.innerHTML = ""
    employent_dans_archive.forEach(el => {
        cont_Salle_archives.innerHTML += `
        <div class="hover:scale-105 duration-150 relative rounded-[5px] flex bg-gray-400  p-[4px]">
            <div onclick='affiche_info(${JSON.stringify(el)},"Salle Archive")' class="flex relative flex-col items-center text-white lg:text-[9px] text-[3px] font-[700]">
                <img id="${el.id}"  src="${el.photo}" alt="photo" class="w-4 lg:w-10 lg:h-10 relative h-4 bg-blue-500 rounded-full">
                <p class="absolute bg-black lg:red-500 lg:w-12 lg:top-10 w-6 px-[1px] py-[1px] top-4 rounded-full">${el.name}</p> 
            </div>
            <div class="flex items-start">
                <button onclick='retour_archive_Staff(${JSON.stringify(el)})' class="absolute lg:bottom-10 right-[0px] bottom-5 rounded-full lg:w-3 lg:text-[8px] text-[5px] bg-red-600 text-white w-2 hover:bg-red-400">X</button>
            </div>
        </div>
            `
    })
    zone_restreinte_archive()

}

affiche_conference()
affiche_reception()
affiche_serveur()
affiche_securite()
affiche_perssone()
affiche_archive()

function zone_restreinte_reception() {
    const zone_reception = document.getElementById('zone_reception')

    if (cont_Salle_Reception.children.length === 0) {
        zone_reception.classList.add("bg-red-500/70", "animate-pulse")
    }
    else
        zone_reception.classList.remove("bg-red-500/70", "animate-pulse")

}

function zone_restreinte_serveurs() {
    const zone_serveurs = document.getElementById('zone_serveurs')

    if (cont_Salle_serveurs.children.length == 0) {
        zone_serveurs.classList.add("bg-red-500/70", "animate-pulse")
    }
    else
        zone_serveurs.classList.remove("bg-red-500/70", "animate-pulse")

}

function zone_restreinte_securite() {
    const zone_securite = document.getElementById('zone_securite')

    if (cont_Salle_scurite.children.length == 0) {
        zone_securite.classList.add("bg-red-500/70", "animate-pulse")
    }
    else
        zone_securite.classList.remove("bg-red-500/70", "animate-pulse")

}

function zone_restreinte_archive() {
    const zone_archive = document.getElementById('zone_archive')

    if (cont_Salle_archives.children.length == 0) {
        zone_archive.classList.add("bg-red-500/70", "animate-pulse")
    }
    else
        zone_archive.classList.remove("bg-red-500/70", "animate-pulse")

}
zone_restreinte_reception()
zone_restreinte_serveurs()
zone_restreinte_securite()
zone_restreinte_archive()


