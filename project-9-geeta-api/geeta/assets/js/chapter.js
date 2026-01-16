const params = new URLSearchParams(window.location.search);
const chapterNo = Number(params.get("chapter")) || 1;

fetch("https://vedicscriptures.github.io/chapters")
    .then(res => res.json())
    .then(chapters => {

        const chapter = chapters.find(c => c.chapter_number === chapterNo);

        document.getElementById("chapterHeader").innerHTML = `
            <h2>Chapter ${chapter.chapter_number}: ${chapter.name}</h2>
            <p class="text-muted">${chapter.verses_count} Verses</p>
        `;

        loadVerses(chapterNo, chapter.verses_count);

        document.getElementById("prevChapter").onclick = () => {
            if (chapterNo > 1) location.href = "?chapter=" + (chapterNo - 1);
        };

        document.getElementById("nextChapter").onclick = () => {
            if (chapterNo < chapters.length) location.href = "?chapter=" + (chapterNo + 1);
        };
    });

function loadVerses(chapterNo, total) {
    let verseHTML = "";
    let btnHTML = "";

    const requests = [];

    for (let i = 1; i <= total; i++) {
        requests.push(
            fetch(`https://vedicscriptures.github.io/slok/${chapterNo}/${i}`)
                .then(res => res.json())
        );
    }

    Promise.all(requests).then(data => {
        data.forEach(v => {
            verseHTML += `
                <div id="verse-${v.verse}">
                    <span>Verse ${v.verse}</span>
                    <p>${v.slok}</p>
                </div>
            `;

            btnHTML += `
                <button onclick="scrollToVerse(${v.verse})">${v.verse}</button>
            `;
        });

        document.getElementById("versesContent").innerHTML = verseHTML;
        document.getElementById("verseButtons").innerHTML = btnHTML;
    });
}

function scrollToVerse(num) {
    document.getElementById("verse-" + num)
        .scrollIntoView({ behavior: "smooth", block: "start" });
}
