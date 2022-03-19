//------navigation------
(()=>{
    const hamburgerBtn = document.querySelector(".hamburger-btn");
    const navmenu = document.querySelector(".nav-menu");
    const closeNavBtn = document.querySelector(".close-nav-menu");
    hamburgerBtn.addEventListener("click", showNavMenu);
    closeNavBtn.addEventListener("click", hideNavMenu);


    function showNavMenu(){
        navmenu.classList.add("open");
        //fadeOutEffect();
        document.body.classList.toggle("stop-scroll");
        // add blur and removing header
        document.querySelector(".section.active").classList.add("blur");
        document.querySelector(".style-switcher").classList.add("blur");
        document.querySelector(".header").style.display="none";
    }
    function hideNavMenu(){
        //remove blur and adding header
        document.querySelector(".section.active").classList.remove("blur");
        document.querySelector(".style-switcher").classList.remove("blur");
        document.querySelector(".header").style.display="block";

        navmenu.classList.remove("open");
        fadeOutEffect();
        document.body.classList.toggle("stop-scroll");
    }
    function fadeOutEffect(){
        document.querySelector(".fade-out-effect").classList.add("active");
        setTimeout(()=>{
            document.querySelector(".fade-out-effect").classList.remove("active");
        },200)
    }
    //attach and event handle to document
    document.addEventListener("click",(event)=>{
        if(event.target.classList.contains('link-item')){
            if(event.target.hash !=""){
                //deactive defulf action
                event.preventDefault();
                const hashs= event.target.hash;
                document.querySelector(".section.active").classList.remove("active","blur");
                //document.querySelector(".section.active").classList.add("hide");
                console.log(hashs);
                document.querySelector(hashs).classList.add("active");
                //deactive existing active nav menu link-item and adding the target one
                navmenu.querySelector(".active").classList.add("outer-shadow","hover-in-shadow");
                navmenu.querySelector(".active").classList.remove("active","inner-shadow");
                //if target is nav item
                if(navmenu.classList.contains("open")){
                    event.target.classList.add("inner-shadow","active");
                    event.target.classList.remove("outer-shadow","hover-in-shadow");
                    hideNavMenu();
                }else{
                    // it the item is about or contact button
                    let navItems= navmenu.querySelectorAll(".link-item");
                    navItems.forEach((item)=>{
                        if(hashs===item.hash){
                            item.classList.add("inner-shadow","active");
                            item.classList.remove("outer-shadow","hover-in-shadow");
                        }
                    })
                    fadeOutEffect();
                }
                //window.location.hash= hashs;
            }
        }
    })

})();
//------typing span-------
$(document).ready(function(){
    //home typing
    var typed = new Typed(".typing", {
        strings: ["Programmer", "Developer", "Student", "Designer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });
    //about typing
    var typed = new Typed(".typing-2", {
        strings: ["Programmer", "Developer", "Student", "Designer"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });
    //contect typing
     var typed = new Typed(".typing-3", {
        strings: ["Thank you for visiting", "Have a nice day"],
        typeSpeed: 100,
        backSpeed: 60,
        loop: true
    });
});
//-----------about section tab---------
(() => {
    const aboutSection = document.querySelector(".about-section"),
    tabContainer = document.querySelector(".about-tabs");

    tabContainer.addEventListener("click", (event) =>{
        //if  event.traget have tab-item class and dont have active class
        if(event.target.classList.contains("tab-item") && !event.target.classList.contains("active")){
            
            const target= event.target.getAttribute("data-target");
            // removing current active class
            tabContainer.querySelector(".active").classList.remove("outer-shadow","active");
            //adding active to target
            event.target.classList.add("outer-shadow","active");
            ``
            aboutSection.querySelector(".tab-content.active").classList.remove("active");
            aboutSection.querySelector(target).classList.add("active");
        }
    })
})();

/*function bodyScrollTog(){  
    document.body.classList.toggle("stop-scroll");
}*/

//---------project filter and popup-----------
(() => {
    const filterCon = document.querySelector(".project-filter");
    const projectItemCon =document.querySelector(".project-items");
    const projectItems =document.querySelectorAll(".project-item");
    const popup = document.querySelector(".project-popup");
    const prevBtn =popup.querySelector(".pp-prev");
    const nextBtn =popup.querySelector(".pp-next");
    const closeBtn =popup.querySelector(".pp-close");
    const projectDetailsCon =popup.querySelector(".pp-details");
    const projectDetailsBtn =popup.querySelector(".pp-project-details-btn");
    let itemIndex, slideIndex, screenshots;

    //filter items
    filterCon.addEventListener("click", (event)=> {
        if(event.target.classList.contains("filter-item") && !event.target.classList.contains("active")){
            // removing the currnt active
            filterCon.querySelector(".active").classList.remove("outer-shadow","active");
            //active event item
            event.target.classList.add("outer-shadow","active");
            const targetA =event.target.getAttribute("data-target");
            projectItems.forEach((item) => {
                if(targetA === item.getAttribute("data-category") || targetA === "all"){
                    item.classList.remove("hide");
                    item.classList.add("show");
                }else{
                    item.classList.remove("show");
                    item.classList.add("hide");
                }
            })
        }
    })

    projectItemCon.addEventListener("click", (event)=> {
        if(event.target.closest(".project-item-inner")){
            const projectItem =event.target.closest(".project-item-inner").parentElement;
            //get project index
            itemIndex = Array.from(projectItem.parentElement.children).indexOf(projectItem);
            screenshots= projectItems[itemIndex].querySelector(".project-item-img img").getAttribute("data-screenshots");
            // screenshot to array
            screenshots=screenshots.split(",");
            if(screenshots.length===1){
                prevBtn.style.display="none";
                nextBtn.style.display="none";
            }else{
                prevBtn.style.display="block";
                nextBtn.style.display="block";
            }
            slideIndex=0;
            popupTog();
            popupSlideShow();
            //popupDetails();
        }
    })

    closeBtn.addEventListener("click", (event)=>{
        popupTog();
        if(projectDetailsCon.classList.contains("active")){
            popupDetailsTog();
        }
    })

    function popupTog(){
        popup.classList.toggle("open");
        document.body.classList.toggle("hidden-scroll");
    }
    function popupSlideShow(){
        const imgSrc= screenshots[slideIndex];
        const popupImg = popup.querySelector(".pp-img");
        popup.querySelector(".pp-loader").classList.add("active");
        popupImg.src= imgSrc;
        popupImg.onload = () => {
            //deactive pp loader
            setTimeout(function (){
                popup.querySelector(".pp-loader").classList.remove("active");
              }, 300);
        }
        popup.querySelector(".pp-counter").innerHTML= (slideIndex+1) + " of " + screenshots.length;
    }
    //nxt btn slide
    nextBtn.addEventListener("click", (event) => {
        slideIndex = (slideIndex+1)%screenshots.length;
        popupSlideShow();
    })
    //prev btn slide
    prevBtn.addEventListener("click", (event) => {
        slideIndex--;
        if(slideIndex<0){
            slideIndex=screenshots.length-1;
        }
        popupSlideShow();
    })
    function popupDetails(){
        //get details
        if(projectItems[itemIndex].querySelector(".project-item-details")){
            const details= projectItems[itemIndex].querySelector(".project-item-details").innerHTML;
            popup.querySelector(".pp-project-details").innerHTML=details;
            popup.querySelector(".pp-title h2").innerHTML=projectItems[itemIndex].querySelector(".project-item-title").innerHTML;
            popup.querySelector(".pp-project-category").innerHTML= projectItems[itemIndex].getAttribute("data-category");
        }
    }

    projectDetailsBtn.addEventListener("click", (event) => {
        popupDetailsTog();
        popupDetails();
    })

    function popupDetailsTog(){
        if(projectDetailsCon.classList.contains("active")){
            /*projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
            projectDetailsBtn.querySelector("i").classList.add("fa-plus");*/
            projectDetailsCon.classList.remove("active");
            projectDetailsBtn.innerHTML='More Details <i class="fa fa-plus"></i>';
            projectDetailsCon.style.maxHeight= 0 + "px";
        }else{
            /*projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
            projectDetailsBtn.querySelector("i").classList.add("fa-minus");*/
            projectDetailsCon.classList.add("active");
            projectDetailsBtn.innerHTML='Less Details <i class="fa fa-minus"></i>';
            projectDetailsCon.style.maxHeight= (projectDetailsCon.scrollHeight*1.5) + "px";
        }
        popup.scrollTo(0,projectDetailsCon.offsetTop);
    }


})();

// -----------Accomp slider-------
(() => {
    document.querySelector(".accomp-section").classList.add("active");
    const sliderCon = document.querySelector(".accomp-slider-container");
    const slides = sliderCon.querySelectorAll(".accomp-item");
    const slideWidth = sliderCon.offsetWidth;
    document.querySelector(".accomp-section").classList.remove("active");
    const prevBtn2 =document.querySelector(".accomp-slider-nav .accomp-prev");
    const nextBtn2 =document.querySelector(".accomp-slider-nav .accomp-next");
    const activeSlider =sliderCon.querySelector(".accomp-item.active");
    let slideIndex =0;
    slides.forEach((slide) => {
        slide.style.width =slideWidth +"px";
    })
    //set width for container
    console.log(slideWidth);
    sliderCon.style.width = slideWidth * slides.length+"px";

    nextBtn2.addEventListener("click",(event) => {
        slideIndex= (slideIndex+1)%slides.length;
        sliderCon.style.marginLeft = - (slideWidth * slideIndex) + "px";
    })
    prevBtn2.addEventListener("click",(event) => {
        if(slideIndex < 1){
            slideIndex=slides.length;
        }
        slideIndex--;
        sliderCon.style.marginLeft = - (slideWidth * slideIndex) + "px";
    })

})();
