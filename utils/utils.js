
export class utils{

    highlightActivePage(){
        const currentPage = window.location.pathname.split('/').pop()
        const links = document.querySelectorAll(".navList a")

        links.forEach(link => {
            const linkHref = link.getAttribute('href')
            if(linkHref === currentPage){
                link.classList.add("active")
                console.log("added")
            }else{
                link.classList.remove("active")
            }
        })
    }
}