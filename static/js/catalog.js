const machineContainer = document.getElementById("machine-container");
const pagination = document.getElementById("pagination");
const filterButtons = document.querySelectorAll(".btn-filter");
const machineCards = Array.from(
    document.querySelectorAll(".machine-card")
);

let currentPage = 1;
let currentCategory = "all";


/* =========================
   JUMLAH CARD PER HALAMAN
========================= */

function getItemsPerPage() {

    if (window.innerWidth < 768) {
        return 3;
    }

    return 6;
}


/* =========================
   FILTER CARD
========================= */

function getFilteredCards() {

    return machineCards.filter(card => {

        if (currentCategory === "all") {
            return true;
        }

        return card.dataset.category === currentCategory;

    });

}


/* =========================
   RENDER CARD
========================= */

function renderCards() {

    const filteredCards = getFilteredCards();

    const itemsPerPage = getItemsPerPage();

    const totalPages = Math.ceil(
        filteredCards.length / itemsPerPage
    );


    // Kalau halaman sekarang melebihi jumlah halaman
    if (currentPage > totalPages && totalPages > 0) {
        currentPage = totalPages;
    }


    const startIndex =
        (currentPage - 1) * itemsPerPage;

    const endIndex =
        startIndex + itemsPerPage;


    // Sembunyikan semua card
    machineCards.forEach(card => {
        card.classList.add("hidden");
    });


    // Tampilkan card halaman sekarang
    filteredCards
        .slice(startIndex, endIndex)
        .forEach(card => {

            card.classList.remove("hidden");

        });


    renderPagination(totalPages);
}


/* =========================
   PAGINATION
========================= */

function renderPagination(totalPages) {

    pagination.innerHTML = "";


    // Kalau cuma 1 halaman
    if (totalPages <= 1) {
        return;
    }


    // Previous
    const previousButton = document.createElement("button");

    previousButton.innerHTML = `
        <i data-lucide="chevron-left"></i>
    `;

    previousButton.disabled = currentPage === 1;

    previousButton.className = `
        w-10 h-10
        flex items-center justify-center
        rounded-lg
        border border-[#C5C6CF]
        disabled:opacity-40
    `;


    previousButton.addEventListener("click", () => {

        if (currentPage > 1) {

            currentPage--;

            renderCards();

            scrollToCatalog();

        }

    });


    pagination.appendChild(previousButton);


    // Number
    for (let page = 1; page <= totalPages; page++) {

        const pageButton =
            document.createElement("button");

        pageButton.textContent = page;

        pageButton.className = `
            w-10 h-10
            rounded-lg
            border border-[#C5C6CF]
            font-medium
        `;


        if (page === currentPage) {

            pageButton.classList.add(
                "bg-[#0B1E3D]",
                "text-white"
            );

        }


        pageButton.addEventListener("click", () => {

            currentPage = page;

            renderCards();

            scrollToCatalog();

        });


        pagination.appendChild(pageButton);

    }


    // Next
    const nextButton = document.createElement("button");

    nextButton.innerHTML = `
        <i data-lucide="chevron-right"></i>
    `;

    nextButton.disabled =
        currentPage === totalPages;

    nextButton.className = `
        w-10 h-10
        flex items-center justify-center
        rounded-lg
        border border-[#C5C6CF]
        disabled:opacity-40
    `;


    nextButton.addEventListener("click", () => {

        if (currentPage < totalPages) {

            currentPage++;

            renderCards();

            scrollToCatalog();

        }

    });


    pagination.appendChild(nextButton);


    // Aktifkan Lucide
    if (typeof lucide !== "undefined") {
        lucide.createIcons();
    }

}


/* =========================
   FILTER BUTTON
========================= */

filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        currentCategory =
            button.dataset.category;

        currentPage = 1;


        // Reset semua button
        filterButtons.forEach(item => {

            item.classList.remove(
                "bg-[#0B1E3D]",
                "text-white"
            );

            item.classList.add(
                "border",
                "border-[#C5C6CF]"
            );

        });


        // Button aktif
        button.classList.add(
            "bg-[#0B1E3D]",
            "text-white"
        );

        button.classList.remove(
            "border",
            "border-[#C5C6CF]"
        );


        renderCards();

    });

});


/* =========================
   SCROLL KE CATALOG
========================= */

function scrollToCatalog() {

    const catalog =
        document.getElementById("catalog");

    if (!catalog) {
        return;
    }

    catalog.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* =========================
   RESPONSIVE
========================= */

let previousItemsPerPage =
    getItemsPerPage();


window.addEventListener("resize", () => {

    const currentItemsPerPage =
        getItemsPerPage();


    // Hanya render ulang kalau
    // jumlah card/page berubah
    if (
        currentItemsPerPage !==
        previousItemsPerPage
    ) {

        previousItemsPerPage =
            currentItemsPerPage;

        currentPage = 1;

        renderCards();

    }

});


/* =========================
   INITIAL RENDER
========================= */

renderCards();