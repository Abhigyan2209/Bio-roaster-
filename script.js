// =======================
// ELEMENTS
// =======================

const bio = document.getElementById("bio");
const chars = document.getElementById("chars");

const generate = document.getElementById("generate");
const clear = document.getElementById("clear");

const loader = document.getElementById("loader");
const result = document.getElementById("result");

const homePage = document.getElementById("homePage");
const resultPage = document.getElementById("resultPage");

const bar1 = document.getElementById("bar1");
const bar2 = document.getElementById("bar2");
const bar3 = document.getElementById("bar3");

const bioResult = document.getElementById("bioResult");
const roast = document.getElementById("roast");
const hype = document.getElementById("hype");
const vibe = document.getElementById("vibe");


// =======================
// CHARACTER COUNT
// =======================

bio.addEventListener("input", () => {
    chars.innerText = bio.value.length;
});

// =======================
// CLEAR
// =======================

clear.onclick = () => {
    bio.value = "";
    chars.innerText = "0";
};

// =======================
// DELAY
// =======================

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// =======================
// LOADER
// =======================

async function playLoader() {

    loader.classList.remove("hidden");
    result.classList.add("hidden");

    bar1.style.width = "0%";
    bar2.style.width = "0%";
    bar3.style.width = "0%";

    await delay(500);
    bar1.style.width = "100%";

    await delay(700);
    bar2.style.width = "100%";

    await delay(700);
    bar3.style.width = "100%";

    await delay(300);

    loader.classList.add("hidden");
}

// =======================
// BUTTON
// =======================

generate.onclick = async () => {

    if (!bio.value.trim()) {
        alert("Enter Bio");
        return;
    }

    await playLoader();

    generateAI();

};

// =======================
// GROQ API
// =======================
async function generateAI() {

    try {

        const response = await fetch("/api/generate", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                bio: bio.value
            })
        });

        const data = await response.json();

        console.log(data);

        if (!response.ok) {
            alert(data.error?.message || "API Error");
            return;
        }

        const text = data.choices[0].message.content.trim();

        const ai = JSON.parse(text);

        showResult(ai);

    } catch (err) {

        console.log(err);

        alert(err.message);

    }

}



// =======================
// SHOW RESULT
// =======================

function showResult(ai){

    result.classList.remove("hidden");

    bioResult.innerText = bio.value;
    vibe.innerText = ai.vibe || "Unknown Vibe";
    roast.innerText = ai.roast || "No roast generated.";
    hype.innerText = ai.hype || "No hype generated.";
    

    window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth"
    });

}

// =============================
// DOWNLOAD IMAGE
// =============================

const downloadBtn = document.getElementById("download");

downloadBtn.addEventListener("click", async () => {

    const card = document.getElementById("postcard");

    const canvas = await html2canvas(card,{
        scale:2,
        useCORS:true,
        backgroundColor:"#081321"
    });

    const img = canvas.toDataURL("image/png");

    const a = document.createElement("a");

    a.href = img;
    a.download = "AI-Bio-Vibes.png";
    a.click();

});

// =============================
// SHARE ON X
// =============================

const shareBtn = document.getElementById("share");

shareBtn.addEventListener("click",()=>{

const tweet = `Bio:
"${bio.value}"
✨ Vibe
${vibe.innerText}
🔥 Roast
${roast.innerText}
😎 Hype
${hype.innerText}`;

window.open(
"https://twitter.com/intent/tweet?text="+encodeURIComponent(tweet),
"_blank"
);

});

// =============================
// GENERATE AGAIN
// =============================

const againBtn = document.getElementById("again");

againBtn.addEventListener("click",()=>{

result.classList.add("hidden");

loader.classList.add("hidden");

bio.value="";

chars.innerText="0";

bar1.style.width="0%";
bar2.style.width="0%";
bar3.style.width="0%";

window.scrollTo({
top:0,
behavior:"smooth"
});

});




// =============================
// CTRL + ENTER SUPPORT
// =============================

bio.addEventListener("keydown", (e) => {

    if (e.ctrlKey && e.key === "Enter") {
        generate.click();
    }

});

// =============================
// RANDOM LOADING TITLES
// =============================

const titles = [

    "Reading Bio...",
    "Finding Internet Aura...",
    "Cooking Roast...",
    "Generating Hype...",
    "Analyzing Personality...",
    "Scanning Sigma Level...",
    "Measuring Main Character Energy..."

];

const loaderTitle = document.querySelector("#loader h2");

setInterval(() => {

    if (!loader.classList.contains("hidden")) {

        loaderTitle.innerText =
            titles[Math.floor(Math.random() * titles.length)];

    }

}, 1200);

// =============================
// PAGE FADE
// =============================

window.addEventListener("load", () => {

    document.body.style.opacity = "0";

    setTimeout(() => {

        document.body.style.transition = "opacity .7s ease";
        document.body.style.opacity = "1";

    }, 100);

});
