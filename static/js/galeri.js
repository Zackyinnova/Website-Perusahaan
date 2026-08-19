const btnFilter = document.querySelectorAll(".btn-filter");

const imgContainer = document.getElementById("img-container");

const prevBtn = document.getElementById("prevPage");
const nextBtn = document.getElementById("nextPage");

const pageNumbers = document.getElementById("pageNumbers");


const MOBILE_BREAKPOINT = 768;

let currentPage = 1;
let currentFilter = "Semua";


// ========================================
// JUMLAH ITEM PER PAGE
// ========================================

function getItemsPerPage() {

    return window.innerWidth < MOBILE_BREAKPOINT
        ? 4
        : 12;

}


// ========================================
// AMBIL SEMUA CARD
// ========================================

function getAllCards() {

    return Array.from(
        imgContainer.children
    );

}


// ========================================
// AMBIL CARD SESUAI FILTER
// ========================================

function getFilteredCards() {

    const all = getAllCards();

    if (currentFilter === "Semua") {
        return all;
    }

    return all.filter((card) => {
        return card.dataset.value === currentFilter;
    });

}


// ========================================
// FILTER BUTTON
// ========================================

btnFilter.forEach((button) => {

    button.addEventListener("click", () => {

        // Reset semua button
        btnFilter.forEach((item) => {

            item.classList.remove(
                "bg-[#0B1E3D]",
                "text-white"
            );

            item.classList.add(
                "bg-white",
                "text-[#0B1E3D]"
            );

        });


        // Aktifkan button yang diklik
        button.classList.remove(
            "bg-white",
            "text-[#0B1E3D]"
        );

        button.classList.add(
            "bg-[#0B1E3D]",
            "text-white"
        );


        // Simpan filter
        currentFilter = button.dataset.value || "Semua";


        // Kembali ke halaman pertama
        currentPage = 1;


        // Render ulang
        renderPagination();

    });

});


// ========================================
// RENDER PAGINATION
// ========================================

function renderPagination() {

    const cards = getFilteredCards();

    const itemsPerPage = getItemsPerPage();

    const totalPages = Math.ceil(
        cards.length / itemsPerPage
    );


    // Kalau halaman sekarang lebih besar
    // dari jumlah halaman yang tersedia
    if (currentPage > totalPages) {
        currentPage = totalPages || 1;
    }


    // ====================================
    // SEMBUNYIKAN SEMUA CARD
    // ====================================

    getAllCards().forEach((card) => {

        card.style.display = "none";

    });


    // ====================================
    // TENTUKAN CARD YANG DITAMPILKAN
    // ====================================

    const startIndex =
        (currentPage - 1) * itemsPerPage;

    const endIndex =
        startIndex + itemsPerPage;


    cards
        .slice(startIndex, endIndex)
        .forEach((card) => {

            card.style.display = "block";

        });


    // ====================================
    // BUAT NOMOR PAGE
    // ====================================

    pageNumbers.innerHTML = "";


    for (let i = 1; i <= totalPages; i++) {

        const button = document.createElement("button");

        button.textContent = i;

        button.className =
            "px-4 py-2 border border-[#C5C6CF]";


        // Active page
        if (i === currentPage) {

            button.classList.add(
                "bg-[#0B1E3D]",
                "text-white"
            );

        } else {

            button.classList.add(
                "bg-white",
                "text-[#0B1E3D]"
            );

        }


        button.addEventListener("click", () => {

            currentPage = i;

            renderPagination();

        });


        pageNumbers.appendChild(button);

    }


    // ====================================
    // DISABLE PREVIOUS
    // ====================================

    prevBtn.disabled = currentPage === 1;


    // ====================================
    // DISABLE NEXT
    // ====================================

    nextBtn.disabled =
        currentPage === totalPages ||
        totalPages === 0;

}


// ========================================
// BUTTON PREVIOUS
// ========================================

prevBtn.addEventListener("click", () => {

    if (currentPage > 1) {

        currentPage--;

        renderPagination();

    }

});


// ========================================
// BUTTON NEXT
// ========================================

nextBtn.addEventListener("click", () => {

    const cards = getFilteredCards();

    const itemsPerPage = getItemsPerPage();

    const totalPages = Math.ceil(
        cards.length / itemsPerPage
    );


    if (currentPage < totalPages) {

        currentPage++;

        renderPagination();

    }

});


// ========================================
// RESPONSIVE
// ========================================

window.addEventListener("resize", () => {

    currentPage = 1;

    renderPagination();

});


// ========================================
// INITIAL LOAD
// ========================================

renderPagination();