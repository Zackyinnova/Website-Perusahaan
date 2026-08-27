// ==========================================
// FILTER + PAGINATION CATALOG MESIN
// 6 item/halaman di desktop, 3 item/halaman di mobile
// ==========================================

const machineContainer = document.getElementById("machine-container");
const pageNumbers = document.getElementById("pageNumbers");
const prevBtn = document.getElementById("prevPage");
const nextBtn = document.getElementById("nextPage");
const btnFilter = document.querySelectorAll(".btn-filter");

const MOBILE_BREAKPOINT = 768;
let currentPage = 1;
let currentFilter = "Semua";

// tentukan jumlah item per halaman berdasarkan lebar layar
function getItemsPerPage() {
    return window.innerWidth < MOBILE_BREAKPOINT ? 3 : 6;
}

// ambil semua card di dalam container
function getAllCards() {
    return Array.from(machineContainer.children);
}

// ambil card yang lolos filter aktif
function getFilteredCards() {
    const all = getAllCards();
    if (currentFilter === "Semua") return all;
    return all.filter((card) => card.dataset.value === currentFilter);
}

// pasang event klik ke tombol filter (per grup, sesuai struktur kamu)
btnFilter.forEach((group) => {
    const buttons = group.querySelectorAll(".items-filter");

    buttons.forEach((button) => {
        button.addEventListener("click", () => {
            // Reset semua button dalam grup ini
            buttons.forEach((item) => {
                item.classList.remove("bg-[#0B1E3D]", "text-white");
                item.classList.add("bg-white", "text-[#0B1E3D]");
            });

            // Aktifkan button yang diklik
            button.classList.remove("bg-white", "text-[#0B1E3D]");
            button.classList.add("bg-[#0B1E3D]", "text-white");

            // Update filter aktif & reset ke halaman 1
            currentFilter = button.dataset.value || "Semua";
            currentPage = 1;

            renderPagination();
        });
    });
});

function renderPagination() {
    const allCards = getAllCards();
    const filteredCards = getFilteredCards();
    const itemsPerPage = getItemsPerPage();
    const totalPages = Math.ceil(filteredCards.length / itemsPerPage) || 1;

    // jaga-jaga kalau currentPage kelebihan saat resize/filter
    if (currentPage > totalPages) currentPage = totalPages;

    // sembunyikan semua card dulu (termasuk yang tidak lolos filter)
    allCards.forEach((card) => card.classList.add("hidden"));

    // tampilkan hanya card hasil filter sesuai halaman aktif
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    filteredCards.slice(start, end).forEach((card) => card.classList.remove("hidden"));

    // render ulang tombol angka halaman (1, 2, 3, ...)
    pageNumbers.innerHTML = "";
    for (let i = 1; i <= totalPages; i++) {
        const btn = document.createElement("button");
        btn.className = `btn-list icon-page text-center border border-[#C5C6CF] p-2 ${
            i === currentPage
                ? "bg-[#0B1E3D] text-white"
                : "bg-white text-[#0B1E3D]"
        }`;

        const label = document.createElement("p");
        label.className = "w-[20px] h-[20px]";
        label.textContent = i;

        btn.appendChild(label);

        btn.addEventListener("click", () => {
            currentPage = i;
            renderPagination();
        });

        pageNumbers.appendChild(btn);
    }

    // disable tombol prev/next kalau di ujung halaman
    prevBtn.disabled = currentPage === 1;
    nextBtn.disabled = currentPage === totalPages;
    prevBtn.classList.toggle("opacity-40", currentPage === 1);
    nextBtn.classList.toggle("opacity-40", currentPage === totalPages);
}

prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        renderPagination();
    }
});

nextBtn.addEventListener("click", () => {
    const totalPages = Math.ceil(getFilteredCards().length / getItemsPerPage()) || 1;
    if (currentPage < totalPages) {
        currentPage++;
        renderPagination();
    }
});

// render ulang tiap kali layar di-resize (desktop <-> mobile)
window.addEventListener("resize", renderPagination);

// jalankan pertama kali saat halaman dimuat
renderPagination();


const overlayNavbar = document.getElementById("overlay-navbar");
const btnNavbar = document.getElementById("btn-navbar");

btnNavbar.addEventListener("click", () =>{
    overlayNavbar.style.display = "flex";
});

overlayNavbar.addEventListener("click", (e) =>{
    if(e.target === overlayNavbar){
        overlayNavbar.style.display = "none";
    }
});

const navbarLinks = overlayNavbar.querySelectorAll("a");

navbarLinks.forEach((link) =>{
    link.addEventListener("click",() =>{
        overlayNavbar.style.display = "none";
    });
});


const cards = document.querySelectorAll(".card-catalog");

cards.forEach((card) => {

    card.style.transition = "transform 0.3s ease";

    card.addEventListener("mouseenter", () => {
        card.style.transform = "translate(-2px, -2px)";
    });

    card.addEventListener("mouseleave", () => {
        card.style.transform = "translate(0, 0)";
    });

});