// Sélection des éléments
const projects = document.querySelectorAll(".project");
const details = document.getElementById("project-details");
const closeBtn = document.getElementById("close-details");
const detailTitle = document.getElementById("detail-title");
const detailDescription = document.getElementById("detail-description");
const detailTech = document.getElementById("detail-tech");
const detailLink = document.getElementById("detail-link");

// Ouvrir le pop-up
projects.forEach(project => {
    project.addEventListener("click", () => {
        detailTitle.textContent = project.dataset.title;
        detailDescription.textContent = project.dataset.description;
        detailTech.textContent = project.dataset.tech;
        detailLink.href = project.dataset.link;
        details.classList.add("active");
    });
});

// Fermer le pop-up
closeBtn.addEventListener("click", () => {
    details.classList.remove("active");
});

// Fermer si clic à l'extérieur du pop-up
window.addEventListener("click", (e) => {
    if(e.target === details) {
        details.classList.remove("active");
    }
});