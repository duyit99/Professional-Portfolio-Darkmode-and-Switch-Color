
window.addEventListener("load", function(){
   
    document.querySelector(".preloader").classList.add("opacity-0");
    setTimeout(()=>{
        document.querySelector(".preloader").style.display="none"
        },1000)
})



/// Portfolio Item Filter
const FilterContiner = document.querySelector(".portfolio-filter"),
        filterBtns = FilterContiner.children;
        totalFilterBtn=filterBtns.length;
        portfolioItems=document.querySelectorAll(".portfolio-item")
        totalPortfolioItem=portfolioItems.length;
        // console.log(totalPortfolioItem)
for(let i=0;i<totalFilterBtn;i++){
    filterBtns[i].addEventListener("click",function(){
        FilterContiner.querySelector(".active").classList.remove("active");
        this.classList.add("active");

        const filterValue=this.getAttribute("data-filter");
        // console.log(filterValue)
        for(let k=0; k<totalPortfolioItem;k++){
            if(filterValue===portfolioItems[k].getAttribute("data-category")){
                portfolioItems[k].classList.remove("hide");
                portfolioItems[k].classList.add("show");
            }
            else{
                portfolioItems[k].classList.remove("show");
                portfolioItems[k].classList.add("hide");
            }
            if(filterValue==='all'){
                portfolioItems[k].classList.remove("hide");
                portfolioItems[k].classList.add("show");
            }
        }
    })
}


/// Portfolio LightBox
const lightbox=document.querySelector(".lightbox"),
        lightboxImg=lightbox.querySelector(".lightbox-img"),
        lightboxText=lightbox.querySelector(".caption-text"),
        lightboxCouter=lightbox.querySelector(".caption-counter"),
        lightboxCloseIcon=lightbox.querySelector(".fa-close"),
        lightboxClose=lightbox.querySelector(".lightbox-close");
        
let itemIndex=0;
for(let i=0; i<totalPortfolioItem;i++){
    portfolioItems[i].addEventListener("click", function(){
        itemIndex=i;
        changeItem();
        toggleLightbox();
    })
}
function nextItem(){
    if(itemIndex===totalPortfolioItem -1){
        itemIndex=0
    }
    else{
        itemIndex ++
    }
    // console.log(itemIndex)
    changeItem();
}
function prevItem(){
    if(itemIndex===0){
        itemIndex=totalPortfolioItem-1;
    }
    else{
        itemIndex --
    }
    // console.log(itemIndex)
    changeItem();
}
function toggleLightbox(){
    lightbox.classList.toggle("open");
}
function changeItem(){
    imgSrc=portfolioItems[itemIndex].querySelector(".portfolio-img img").getAttribute("src");
    // console.log(imgSrc)
    lightboxImg.src=imgSrc;
    lightboxText.innerHTML=portfolioItems[itemIndex].querySelector("h4").innerHTML;
    lightboxCouter.innerHTML=(itemIndex + 1) + " of " + totalPortfolioItem;
}
// close Light Box
lightbox.addEventListener("click", function(event){
    // console.log(event.target)
    if(event.target===lightboxCloseIcon || event.target===lightbox){
          toggleLightbox();
     }
    // || event.target===lightbox
})

/// Aside Navbar
const nav=document.querySelector(".nav"),
        navList=nav.querySelectorAll("li"),
        totalNavList=navList.length,
        allSection=document.querySelectorAll(".section"),
        totalSetion=allSection.length;
for(let i=0; i<totalNavList;i++){
    const a=navList[i].querySelector("a");
    a.addEventListener("click", function(){

        /// remove back section class
        removeBackSectionClass();
        
        for(let j=0;j<totalNavList;j++){
            if(navList[j].querySelector("a").classList.contains("active")){
                // console.log("back-section" + navList[j].querySelector("a"))

                /// add back section
                allSection[j].classList.add("back-section")
            }
            navList[j].querySelector("a").classList.remove("active");
        }
        this.classList.add("active");
        showSection(this);
        if(window.innerWidth < 1200){
            asideSectionTogglerBtn();
        }
    })
}
function showSection(element){
    for(let i=0;i<totalSetion;i++){
        allSection[i].classList.remove("active");
    }
    const target =(element.getAttribute("href").split("#"))[1];
    
    // console.log(target)
    document.querySelector("#"+target).classList.add("active")
}
function upadte(element){
    // console.log(element.getAttribute("href").split("#")[1])
    for(let i=0;i<totalNavList;i++){
        navList[i].querySelector("a").classList.remove("active");
        const target=element.getAttribute("href").split("#")[1];
        if(target===navList[i].querySelector("a").getAttribute("href").split("#")[1]){
            navList[i].querySelector("a").classList.add("active");
        }
    }
}
document.querySelector(".hire-me").addEventListener("click",function(){
    const sectionIndex=this.getAttribute("data-section-index");
    console.log(sectionIndex)
    showSection(this);
    upadte(this);
})
const navTogglerBtn=document.querySelector(".nav-toggler"),
    aside=document.querySelector(".aside");
navTogglerBtn.addEventListener("click",()=>{
    asideSectionTogglerBtn();
})
function asideSectionTogglerBtn(){
    aside.classList.toggle("open");
    navTogglerBtn.classList.toggle("open");

    /// open section
    for(let i=0;i<totalSetion;i++){
        allSection[i].classList.toggle("open");
    }
}
function removeBackSectionClass(){
    for(let i=0;i<totalSetion;i++){
        allSection[i].classList.remove("back-section");
    }
}