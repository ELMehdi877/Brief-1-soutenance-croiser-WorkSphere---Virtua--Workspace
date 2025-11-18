const form = document.querySelector('.form')
const form_cont = document.querySelector('#form')
const close = document.getElementById("close")
add_new_worker.addEventListener('click', () => {
    form.classList.remove('hidden')
})
close.addEventListener("click", () => {
    form.classList.add("hidden")
})



// console.log(list_staf);
// console.log(staf);

let list_staf = JSON.parse(localStorage.getItem("list_staf_local")) || []
// let list_staf = []
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

const experience = document.getElementById('experience')
const add_experience = document.getElementById('add_experience')
add_experience.addEventListener('click', () => {
    const div = document.createElement("div")
    div.className = "flex w-full items-center gap-1"

    let input = document.createElement("input")
    input.className = "exp bg-white/30 border-1 h-10 border-black w-[100%] rounded-[5px]"
    input.type = "text"

    const button = document.createElement("button")
    button.className = "font-[500]  rounded-[10px] text-red-500 text-[12px] p-1 h-8 border-2"
    button.textContent = "remove"

    button.addEventListener("click", () => {
        div.remove()
    })

    div.appendChild(input)
    div.appendChild(button)
    experience.appendChild(div)

})


let Unassigned_Staff = document.querySelector("#Unassigned_Staff")
form_cont.addEventListener('submit', (e) => {
    e.preventDefault()
    //regex name
    let name = document.getElementById('name').value.trim()
    let regex_name = /^[a-zA-Z\s]+$/

    //regex email
    let email = document.getElementById('email').value.trim()
    let regex_email = /^[a-zA-Z_.\d]+@[a-zA-Z]{1,7}\.(com|fr)$/

    //regex numero
    let numero = document.getElementById('numero').value.trim()
    let regex_numero = /^\+[0-9]{1,3}[0-9]{9,}$/

    let role = document.getElementById('role').value.trim()
    let url = document.getElementById('url').value.trim()
    if (url === "") {
        url = "https://www.shutterstock.com/shutterstock/photos/1131880403/display_1500/stock-vector-user-profile-avatar-1131880403.jpg"
    }
    // let exp = document.getElementById('exp').value.trim()
    let exps_inputs = document.querySelectorAll('.exp')
    let exps = []
    exps_inputs.forEach(e => {
        exps.push(e.value.trim())
    })
    // console.log(exps);
    staf.experiences.push(exps)
    i = Number(localStorage.getItem("id"))

    if (regex_name.test(name) && regex_email.test(email) && regex_numero.test(numero)) {
        staf = {
            id: i++,
            name: name,
            role: role,
            photo: url,
            email: email,
            numero: numero,
            experiences: exps,
        }
        localStorage.setItem("id", i)
        console.log('valid')
        console.log(staf)
        list_staf.push(staf)
        // console.log(list_staf);
        localStorage.setItem("list_staf_local", JSON.stringify(list_staf))


        // Unassigned_Staff.innerHTML += `

        //     <div class="flex p-2 items-center bg-blue-300 rounded-[10px]">
        //             <div  class="flex gap-5 items-center">
        //                 <img src="${url}" width="18%" alt="Photo">
        //                 <div>
        //                     <p class="">${name}</p>
        //                     <p class="font-[400]">${role}</p>
        //                 </div>
        //             </div>
        //             <button  class="font-[500]  rounded-[10px] text-red-500 text-[12px] p-1 border-2">remove</button>
        //         </div>

        //     `
        function affiche_one_Unassigned_Staff() {
            Unassigned_Staff.innerHTML += `

            <div class="flex p-2 items-center bg-blue-300 rounded-[10px]">
                    <div  class="flex gap-5 items-center">
                        <img src="${url}" width="18%" alt="Photo">
                        <div>
                            <p class="">${name}</p>
                            <p class="font-[400]">${role}</p>
                        </div>
                    </div>
                    <button  class="font-[500]  rounded-[10px] text-red-500 text-[12px] p-1 border-2">remove</button>
                </div>

            `
        }

        affiche_one_Unassigned_Staff()

        // if (!romove_employent)
        //     return
        // romove_employent.addEventListener("click", () => {
        //     console.log('true');

        //     div.remove()
        // })



    }
    else
        console.log('false');


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

function suprime_empl(id) {
    list_staf = list_staf.filter(el => el.id !== id)
    localStorage.setItem("list_staf_local", JSON.stringify(list_staf))
    affiche_tous_Unassigned_Staff()
}

function affiche_tous_Unassigned_Staff() {
    Unassigned_Staff.innerHTML = "";
    list_staf.forEach(el => {

        Unassigned_Staff.innerHTML += `
            <div class="flex p-2 items-center bg-blue-300 rounded-[10px]">
                    <div class="flex gap-5 items-center">
                        <img src="${el.photo}" width="18%" alt="Photo">
                        <div>
                            <p class="">${el.name}</p>
                            <p class="font-[400]">${el.role}</p>
                        </div>
                    </div>
                    <button onclick="suprime_empl(${el.id})" class=" font-[500]  rounded-[10px] text-red-500 text-[12px] p-1 border-2">remove</button>
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
            <div class="flex p-2 items-center bg-blue-300 rounded-[10px]">
                    <div class="flex gap-5 items-center">
                        <img src="${el.photo}" width="18%" alt="Photo">
                        <div>
                            <p class="">${el.name}</p>
                            <p class="font-[400]">${el.role}</p>
                        </div>
                    </div>
                    <button onclick="add_conference(${el.id})" class=" font-[500]  rounded-[10px] bg-green-700 text-white text-[12px] p-2 ">add</button>
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
            <div class="flex p-2 items-center bg-blue-300 rounded-[10px]">
                    <div class="flex gap-5 items-center">
                        <img src="${el.photo}" width="18%" alt="Photo">
                        <div>
                            <p class="">${el.name}</p>
                            <p class="font-[400]">${el.role}</p>
                        </div>
                    </div>
                    <button onclick="add_reception(${el.id})" class=" font-[500]  rounded-[10px] bg-green-700 text-white text-[12px] p-2 ">add</button>
                </div>
            `
    })
}
// affiche_Salle_conference()

function affiche_Salle_serveurs() {
    type_role.textContent = "Salle des serveurs"
    list_serveurs = list_staf.filter(el => el.role === "Techniciens IT" || el.role === "Manager" || el.role === "Nettoyage")
    let Worker = document.getElementById('Worker')
    Worker.innerHTML = "";
    list_serveurs.forEach(el => {

        Worker.innerHTML += `
            <div class="flex p-2 items-center bg-blue-300 rounded-[10px]">
                    <div class="flex gap-5 items-center">
                        <img src="${el.photo}" width="18%" alt="Photo">
                        <div>
                            <p class="">${el.name}</p>
                            <p class="font-[400]">${el.role}</p>
                        </div>
                    </div>
                    <button onclick="add_serveur(${el.id})" class=" font-[500]  rounded-[10px] bg-green-700 text-white text-[12px] p-2 ">add</button>
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
            <div class="flex p-2 items-center bg-blue-300 rounded-[10px]">
                    <div class="flex gap-5 items-center">
                        <img src="${el.photo}" width="18%" alt="Photo">
                        <div>
                            <p class="">${el.name}</p>
                            <p class="font-[400]">${el.role}</p>
                        </div>
                    </div>
                    <button onclick="add_securite(${el.id})" class=" font-[500]  rounded-[10px] bg-green-700 text-white text-[12px] p-2 ">add</button>
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
            <div class="flex p-2 items-center bg-blue-300 rounded-[10px]">
                    <div class="flex gap-5 items-center">
                        <img src="${el.photo}" width="18%" alt="Photo">
                        <div>
                            <p class="">${el.name}</p>
                            <p class="font-[400]">${el.role}</p>
                        </div>
                    </div>
                    <button onclick="add_perssone(${el.id})" class=" font-[500]  rounded-[10px] bg-green-700 text-white text-[12px] p-2 ">add</button>
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
            <div class="flex p-2 items-center bg-blue-300 rounded-[10px]">
                    <div class="flex gap-5 items-center">
                        <img src="${el.photo}" width="18%" alt="Photo">
                        <div>
                            <p class="">${el.name}</p>
                            <p class="font-[400]">${el.role}</p>
                        </div>
                    </div>
                    <button onclick="add_archive(${el.id})" class=" font-[500]  rounded-[10px] bg-green-700 text-white text-[12px] p-2 ">add</button>
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


function add_conference(id) {
    let cont_Salle_conference = document.getElementById("cont_Salle_conference")
    list_conference.forEach(el => {
        if (el.id === id) {
            cont_Salle_conference.innerHTML += `
            <img id="${el.id}" src="${el.photo}" alt="photo" class="w-5 lg:w-10 lg:h-10 relative h-5 bg-blue-500 rounded-full">
            `
        }
    })
}

function add_reception(id) {
    let cont_Salle_Reception = document.getElementById("cont_Salle_Reception")
    list_Receptionnistes.forEach(el => {
        if (el.id === id) {
            cont_Salle_Reception.innerHTML += `
            <img id="${el.id}" src="${el.photo}" alt="photo" class="w-5 lg:w-10 lg:h-10 relative h-5 bg-blue-500 rounded-full">
            `
        }
    })

}

function add_serveur(id) {
    let cont_Salle_serveurs = document.getElementById("cont_Salle_serveurs")
    list_serveurs.forEach(el => {
        if (el.id === id) {
            cont_Salle_serveurs.innerHTML += `
            <img id="${el.id}" src="${el.photo}" alt="photo" class="w-5 lg:w-10 lg:h-10 relative h-5 bg-blue-500 rounded-full">
            `
        }
    })

}

function add_securite(id) {
    let cont_Salle_scurite = document.getElementById("cont_Salle_scurite")
    list_securite.forEach(el => {
        if (el.id === id) {
            cont_Salle_scurite.innerHTML += `
            <img id="${el.id}" src="${el.photo}" alt="photo" class="w-5 lg:w-10 lg:h-10 relative h-5 bg-blue-500 rounded-full">
            `
        }
    })


}

function add_perssone(id) {
    let cont_Salle_personnel = document.getElementById("cont_Salle_personnel")
    list_personnel.forEach(el => {
        if (el.id === id) {
            cont_Salle_personnel.innerHTML += `
            <img id="${el.id}" src="${el.photo}" alt="photo" class="w-5 lg:w-10 lg:h-10 relative h-5 bg-blue-500 rounded-full">
            `
        }
    })


}

function add_archive(id) {
    let cont_Salle_archives = document.getElementById("cont_Salle_archives")
    list_archive.forEach(el => {
        if (el.id === id) {
            cont_Salle_archives.innerHTML += `
            <img id="${el.id}" onclick="affiche_info('${el.name}','${el.photo}','${el.email}','${el.numero}','${el.experiences[0]}')"  src="${el.photo}" alt="photo" class="w-5 lg:w-10 lg:h-10 relative h-5 bg-blue-500 rounded-full">
            `
        }
    })

}

const section_info = document.getElementById('section_info')
function affiche_info(name, photo, email, numero,exp) {
    section_info.classList.remove("hidden")

    section_info.innerHTML = `
    <div class="relative w-95 flex flex-col p-5 gap-2 lg:w-160 bg-gray-400 rounded-[10px] font-[400]">
    <h2 class="font-[700]">${name}</h2>
    <div class="flex gap-4 items-start">
    <img src="${photo}" alt="photo" class="w-[40%] lg:w-[20%]">
    <div class="flex flex-col gap-2">
    <h3 class="font-[700]">Manager</h3>
    <p>${email}</p>
    <p>${numero}</p>
    <h3 class="font-[700]">Expériences</h3>
    <ul class="list-disc ml-10">
    <li>${exp}</li>
    <li>exp2</li>
    </ul>
                    <p>localisation actuelle : reception</p>
                    </div>
                    </div>
                    <button id="close_info" class=" rounded-[5px] w-8 bg-red-800 text-white absolute lg:left-145 left-80">X</button>
                    </div> 
                    
                    `
    let close_info = document.getElementById("close_info")
    close_info.addEventListener('click', () => {
        section_info.classList.add("hidden")
    })
}
