//----- toggle style switcher-------

const styleToggler = document.querySelector(".style-s-toggler");
styleToggler.addEventListener("click",()=>{
    document.querySelector(".style-switcher").classList.toggle("open");
})
//hide style switcher on scroll
window.addEventListener("scroll", ()=>{
    if(document.querySelector(".style-switcher").classList.contains("open")){
        document.querySelector(".style-switcher").classList.remove("open");
    }
})

// --------color theme-----
var obj = JSON.parse(localStorage.getItem("color"));
const sltStyle = document.querySelectorAll(".alt-style");

//getting store vale and setting it up
if(obj !== null){
    setColor(obj.loadColor);
}else{
    obj =new Object();
    obj.ligdrk = "light";
    obj.loadColor= "color-1";
}
if(obj.ligdrk === "dark"){
    document.body.classList.add("dark");
}

function setColor(color){
    //setting color
    obj.loadColor= color;
    localStorage.setItem("color",JSON.stringify(obj));
    //toggle
    sltStyle.forEach((style)=>{
        if(color=== style.getAttribute("title")){
            style.removeAttribute("disabled");
        }else{
            style.setAttribute("disabled","true");
        }
    })
}
//--------light dark------
const lightDrk = document.querySelector(".light-dark");
lightDrk.addEventListener("click",()=>{
    //seeting localstorage
    if(obj.ligdrk==="dark"){
        obj.ligdrk="light";
    }else{
        obj.ligdrk="dark";
    }
    localStorage.setItem("color",JSON.stringify(obj));
    //toggle mode
    lightDrk.querySelector("i").classList.toggle("fa");
    lightDrk.querySelector("i").classList.toggle("fas");
    document.body.classList.toggle("dark");
})
window.addEventListener("load",()=>{
    if(document.body.classList.contains("dark")){
         lightDrk.querySelector("i").classList.add("fa");
    }else{
        lightDrk.querySelector("i").classList.add("fas");
    }
})