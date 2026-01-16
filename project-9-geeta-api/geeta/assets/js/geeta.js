
// if (document.getElementById('chaptersinfo')) {

//     fetch('https://vedicscriptures.github.io/chapters')
//         .then(response => response.json())
//         .then(data => {

//             let html = '';

//             data.forEach(chapter => {

//                 if (chapter.summary) {
//                     if (chapter.summary.hi) {
//                         summary = chapter.summary.hi;
//                     }
//                 }
//                 html += `
//             <div class="col-md-6 mb-4">
//                 <div class="card  p-4 shadow-sm">
//                 <h6 class="text-muted">Chapter ${chapter.chapter_number}</h6>
//                 <h4>${chapter.name}</h4>
//                 <p>${summary}</p>
//                 <p><strong>${chapter.verses_count} Verses</strong></p>
//                 </div>
//             </div>
//             `;
//             });

//             document.getElementById('chaptersinfo').innerHTML = html;
//         })
//     }


var chaptersDiv = document.getElementById('chaptersinfo');

if (chaptersDiv) {

    fetch('https://vedicscriptures.github.io/chapters')
        .then(function (response) {
            return response.json();
        })
        .then(function (chapters) {

            var htmlData = '';

            for (var i = 0; i < chapters.length; i++) {

                var chapter = chapters[i];
                var chapterSummary = '';

                if (chapter.summary && chapter.summary.hi) {
                    chapterSummary = chapter.summary.hi;
                } else {
                    chapterSummary = 'Summary not available';
                }

                htmlData += `
                    <div class="col-md-6 mb-4">
                        <div class="card p-4 shadow-sm">
                            <h6 class="text-muted">Chapter ${chapter.chapter_number}</h6>
                            <h4>${chapter.name}</h4>
                            <p>${chapterSummary}</p>
                            <p><strong>${chapter.verses_count} Verses</strong></p>
                        </div>
                    </div>
                `;
            }

            chaptersDiv.innerHTML = htmlData;
        });
}
