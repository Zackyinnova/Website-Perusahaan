const btnFilter = document.querySelectorAll(".btn-filter");

btnFilter.forEach((group) => {

    const buttons = group.querySelectorAll(".items-filter");

    buttons.forEach((button) => {

        button.addEventListener("click", () => {

            // Reset semua button
            buttons.forEach((item) => {
                item.classList.remove("bg-[#0B1E3D]", "text-white");
                item.classList.add("bg-white", "text-[#0B1E3D]");
            });

            // Aktifkan button yang diklik
            button.classList.remove("bg-white", "text-[#0B1E3D]");
            button.classList.add("bg-[#0B1E3D]", "text-white");

        });

    });

});