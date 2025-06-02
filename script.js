document.addEventListener("DOMContentLoaded", () => {
  const filterBtn = document.getElementById("filterBtn");
  const filterPanel = document.getElementById("filterPanel");
  const closeFilterBtn = document.getElementById("closeFilterBtn");
  const teamList = document.getElementById("teamList");
  const productGrid = document.querySelector(".product-grid");
  const filterSearch = document.getElementById("filterSearch");

  // Sample product data
  const products = [
    {
      id: 1,
      name: "Real Madrid Shirt",
      team: "Real Madrid",
      price: "599kr 6̶9̶9̶kr",
      img: "images/imagess/RMCFMZ0195-01-1.jpg",
    },
    {
      id: 2,
      name: "Barcelona Classic Shirt",
      team: "Barcelona",
      price: "699kr",
      img: "images/imagess/barca.jpg",
    },
    {
      id: 3,
      name: "Manchester United Shirt",
      team: "Manchester United",
      price: "699kr",
      img: "images/imagess/manchester.jpg",
    },
    {
      id: 4,
      name: "Liverpool Classic Shirt",
      team: "Liverpool",
      price: "699kr",
      img: "images/imagess/Nike-Liverpool-FC-Stadium-Home-Jersey-2022-23.jpg",
    },
    {
      id: 5,
      name: "Juventus White Shirt",
      team: "Juventus",
      price: "699kr",
      img: "images/imagess/Juventus.jpg",
    },
    {
      id: 6,
      name: "Paris Saint-Germain Shirt",
      team: "Paris Saint-Germain",
      price: "699kr",
      img: "images/imagess/Paris.jpg",
    },
    {
      id: 7,
      name: "Bayern Munich Shirt",
      team: "Bayern Munich",
      price: "699kr",
      img: "images/imagess/byern.jpg",
    },
  ];

  // Render products helper function
  function renderProducts(filteredProducts) {
    productGrid.innerHTML = "";

    if (!filteredProducts.length) {
      productGrid.innerHTML = `<p style="grid-column: 1/-1; text-align:center; color:#555;">No products found.</p>`;
      return;
    }

    filteredProducts.forEach((product) => {
      const card = document.createElement("div");
      card.className = "product-card";
      card.innerHTML = `
        <a href="product.html?id=${product.id}" class="product-link">
          <img src="${product.img}" alt="${product.name}" />
          <div class="product-info">
            <h3>${product.name}</h3>
            <p>Team: ${product.team}</p>
            <p class="price">${product.price}</p>
          </div>
        </a>
      `;
      productGrid.appendChild(card);
    });
    
  }

  
  renderProducts(products);

  
  filterBtn.addEventListener("click", () => {
    filterPanel.classList.add("active");
    filterPanel.setAttribute("aria-hidden", "false");
    filterSearch.value = "";
    filterSearch.focus();
    filterTeams(""); 
  });

  // Close filter panel
  closeFilterBtn.addEventListener("click", () => {
    filterPanel.classList.remove("active");
    filterPanel.setAttribute("aria-hidden", "true");
  });

  // Extract unique teams
  const teams = [...new Set(products.map((p) => p.team))].sort();

  // Render team list in filter panel
  function filterTeams(searchTerm) {
    const filteredTeams = teams.filter((team) =>
      team.toLowerCase().includes(searchTerm.toLowerCase())
    );
    teamList.innerHTML = "";

    if (!filteredTeams.length) {
      teamList.innerHTML = `<li style="color:#999;">No teams found.</li>`;
      return;
    }

    filteredTeams.forEach((team) => {
      const li = document.createElement("li");
      li.textContent = team;
      li.tabIndex = 0;
      li.setAttribute("role", "button");
      li.addEventListener("click", () => {
        filterPanel.classList.remove("active");
        filterPanel.setAttribute("aria-hidden", "true");
        // Filter products by selected team
        const filteredProducts = products.filter((p) => p.team === team);
        renderProducts(filteredProducts);
      });
      li.addEventListener("keypress", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          li.click();
        }
      });
      teamList.appendChild(li);
    });
  }

  filterSearch.addEventListener("input", () => {
    filterTeams(filterSearch.value);
  });

  // Initially render all teams
  filterTeams("");


  // --- Banner slider logic ---

  const banners = document.querySelectorAll(".banner-slider img");
  let currentBanner = 0;

  function showNextBanner() {
    banners[currentBanner].classList.remove("active");
    currentBanner = (currentBanner + 1) % banners.length;
    banners[currentBanner].classList.add("active");
  }

  // Start with first banner active
  if (banners.length > 0) {
    banners[0].classList.add("active");
    setInterval(showNextBanner, 4000);
  }
});
