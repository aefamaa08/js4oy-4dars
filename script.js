const apiUrl = "https://translate.googleapis.com/translate_a/single?client=gtx&sl=";

const languages = {
    "en": "English",
    "uz": "Uzbek",
    "ru": "Russian",
    "fr": "French",
    "de": "German",
    "es": "Spanish",
    "zh": "Chinese",
    "ar": "Arabic",
    "it": "Italian",
    "tr": "Turkish",
    "ja": "Japanese",
    "ko": "Korean"
};

document.addEventListener("DOMContentLoaded", () => {
    const inputLang = document.getElementById("inputLang");
    const outputLang = document.getElementById("outputLang");

    Object.entries(languages).forEach(([code, name]) => {
        inputLang.innerHTML += `<option value="${code}">${name}</option>`;
        outputLang.innerHTML += `<option value="${code}">${name}</option>`;
    });
});

document.getElementById("translateBtn").addEventListener("click", async () => {
    const text = document.getElementById("inputText").value;
    const fromLang = document.getElementById("inputLang").value;
    const toLang = document.getElementById("outputLang").value;
    
    if (!text) return;

    try {
        const response = await fetch(`${apiUrl}${fromLang}&tl=${toLang}&dt=t&q=${encodeURIComponent(text)}`);
        const data = await response.json();

        document.getElementById("outputText").value = data[0][0][0];  // Берем только переведенный текст
    } catch (error) {
        console.error("Ошибка при переводе:", error);
    }
});

// 🎤 Голосовое воспроизведение
function speakText(targetId) {
    const text = document.getElementById(targetId).value;
    if (!text) return;

    const lang = targetId === "inputText"
        ? document.getElementById("inputLang").value
        : document.getElementById("outputLang").value;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang;
    speechSynthesis.speak(utterance);
}

// Привязываем кнопки к голосу
document.querySelectorAll(".speak-btn").forEach(button => {
    button.addEventListener("click", () => speakText(button.dataset.target));
});
