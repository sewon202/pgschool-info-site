document.addEventListener("DOMContentLoaded", function () {
    function displayClubs(category) {
        let clubContainer = document.getElementById("club-list");
        if (!clubContainer) {
            console.error("club-list 요소를 찾을 수 없음!");
            return;
        }

        clubContainer.innerHTML = ""; 

        let filteredClubs = clubsData.filter(club => category === "all" || club.category === category);

        filteredClubs.forEach(club => {
            let clubDiv = document.createElement("div");
            clubDiv.classList.add("club");
            clubDiv.innerHTML = `
                <img src="${club.image}" alt="${club.name} 포스터">
                <h3>${club.name}</h3>
                <p>${club.description}</p>
                <a href="${club.link}" target="_blank" class="club-button">동아리 신청하기</a>
            `;
            clubContainer.appendChild(clubDiv);
        });
    }

    let clubsData = [];
    fetch("clubs.json")
        .then(response => response.json())
        .then(clubs => {
            clubsData = clubs;
            displayClubs("all");
        })
        .catch(error => console.error("동아리 데이터를 불러오는 중 오류 발생:", error));

    document.getElementById("category").addEventListener("change", function() {
        displayClubs(this.value);
    });
});