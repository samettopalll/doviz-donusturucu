// https://www.exchangerate-api.com/ sitesinden alacağınız API anahtarınızı apiKey değişkeninin içerisindeki değere atayın.

const apiKey = "YOUR_API_KEY";

function fetchExchangeRate() {
    const currency = document.getElementById("currency").value;
    const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${currency}`;

    document.getElementById("rate").textContent = "Yükleniyor...";

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            if (data.result === "success") {
                const rate = data.conversion_rates["TRY"];
                if (rate) {
                    document.getElementById(
                        "rate"
                    ).textContent = `1 ${currency} = ${rate.toFixed(2)} TRY`;
                } else {
                    document.getElementById("rate").textContent = "Veri alınamadı";
                }
            } else {
                document.getElementById("rate").textContent = "Veri alınamadı";
            }
        })
        .catch((error) => {
            document.getElementById("rate").textContent = "Hata oluştu";
            console.error("API hatası:", error);
        });
}

document.addEventListener("DOMContentLoaded", fetchExchangeRate);

setInterval(fetchExchangeRate, 5 * 60 * 1000);
