document.addEventListener("DOMContentLoaded", function () {
    function displaylocation(category) {
        let locationContainer = document.getElementById("location-list");
        if (!locationContainer) {
            console.error("location-list 요소를 찾을 수 없음!");
            return;
        }

        locationContainer.innerHTML = ""; 

        let filteredLocation = locationData.filter(location => category === "all" || location.floor === category);

        filteredLocation.forEach(location => {
            let locationDiv = document.createElement("div");
            locationDiv.classList.add("location");
            locationDiv.innerHTML = `
                <img src="${location.image}" alt="${location.name} ">
                <h3>${location.name}</h3>
                <p>${location.description}</p>
            `;
            locationContainer.appendChild(locationDiv);
        });
    }

    let locationData = [];
    fetch("location.json")
        .then(response => response.json())
        .then(data => {
            locationData = data;
            displaylocation("all");
        })
        .catch(error => console.error("장소 데이터를 불러오는 중 오류 발생:", error));

    document.getElementById("floor").addEventListener("change", function() {
        displaylocation(this.value);
    });
});