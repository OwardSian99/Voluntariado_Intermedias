const ctxlineas = document.getElementById("lineas")
const ctxbarras = document.getElementById("barras")
const ctxpastel = document.getElementById("pastel")

const nombres = []
const edades = []

const graficaLineas = new Chart(ctxlineas,
    {
        type:'line',
        data:{
            labels: nombres,
            datasets:[{
                label:'Edades',
                data:edades,
                backgroundColor:[
                    'rgba(65, 39, 245, 0.8)',
                    'rgba(39, 245, 116, 0.8)',
                    'rgba(241, 245, 39, 0.8)',
                    'rgba(245, 39, 39, 0.8)',
                    'rgba(0, 0, 245, 0.8)'
                ],
                borderColor:[
                    'rgba(255, 0, 0, 0.2)'
                ],
                tension:0,
                borderWith:1.5
            }]
        }
    })

const graficaBarras = new Chart(ctxbarras, {
    type:'bar',
    data:{
        labels: nombres,
        datasets:[
            {
                label:'Edad',
                data:edades,
                backgroundColor:[
                    'rgba(65, 39, 245, 0.4)',
                    'rgba(39, 245, 116, 0.4)',
                    'rgba(241, 245, 39, 0.4)',
                    'rgba(245, 39, 39, 0.4)',
                    'rgba(0, 0, 245, 0.4)'
                ]
            }
        ]
    }
}

)

const graficaPastel = new Chart(ctxpastel,
    {
        type:'pie',
        data:{
            labels:nombres,
            datasets:[{
                label:'Edad',
                data:edades,
                backgroundColor:[
                    'rgba(65, 39, 245, 0.4)',
                    'rgba(39, 245, 116, 0.4)',
                    'rgba(241, 245, 39, 0.4)',
                    'rgba(245, 39, 39, 0.4)',
                    'rgba(0, 0, 245, 0.4)'
                ]
            }]
        }
    }

)




const navToggle = document.querySelector(".nav-toggle")
const navMenu = document.querySelector(".nav-menu")
const navItem = document.querySelector(".nav-menu")

navToggle.addEventListener("click", () =>{
    navMenu.classList.toggle("nav-menu_visible");
    if (navMenu.classList.contains("nav-menu_visible")){
        navToggle.setAttribute("aria-label","Cerrar menú")
    }else{
        navToggle.setAttribute("aria-label","Abrir menú")
    }
})

navItem.addEventListener("click", () =>{
    navMenu.classList.toggle("nav-menu_visible");
    if (navMenu.classList.contains("nav-menu_visible")){
        navToggle.setAttribute("aria-label","Cerrar menú")
    }else{
        navToggle.setAttribute("aria-label","Abrir menú")
    }
})


/*CONEXIÓN CON EL BACKEND*/
async function guardarDatos(){
    var nombre = document.querySelector('#nombre').value
    var edad = document.querySelector('#edad').value

    var datos = {
        "nombre":nombre,
        "edad":edad
    }

    fetch('http://127.0.0.1:5000/agregarPersona',{
        method:'POST',
        body: JSON.stringify(datos),
        headers:{
            'Content-Type':'application/json',
            'Access-Control-Allo-Origin':'*'}})
        .then(response => response.json())
        .then(data =>{
            nombres.splice(0, nombres.length)
            edades.splice(0, edades.length)
            
            for(let i = 0; i < data.nombres.length; i++){
                nombres.push(data.nombres[i])
                edades.push(data.edades[i])
            }

            alert(data.mensaje)
            document.querySelector('#nombre').value = ""
            document.querySelector('#edad').value = 0

            graficaLineas.update()
            graficaBarras.update()
            graficaPastel.update()

        }

        )
        .catch(error =>{
            alert(error)
        }
            
        )
            ;



}