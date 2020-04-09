function createOverlay() {
    let d = document.createElement('div');
    d.setAttribute('id', 'argh-container');
    d.innerHTML =
        `<form id="argh-form">
         You just opened a Youtube Video. Make a note why you want to watch it.
           <select id="argh-reason">
             <option value="music">To listen to music</option>
             <option value="hannibal">To kill some time</option>
             <option value="procrastination">I don't want to work on my next task</option>
             <option value="break">I want to take a break</option>
             <option value="research">I am doing some research</option>
             <option value="friend">Someone send me a video and I want to watch it</option>
           </select>
           <input type="submit" value="Continue to Video">
         </form>`;

    d.classList.add('form-overlay');

    return d;
}

function openWebsite(url) {
    window.location.replace(url);
}

function closeOverlay() {
    let overlay = document.getElementById('argh-container');
    overlay.parentNode.removeChild(overlay);
}

function formSubmitFunction(reason) {
    switch(reason) {
    case "music":
    case "friend":
    case "research":
    case "break":
        return closeOverlay();
    case "hannibal":
        return openWebsite("https://www.youtube.com/watch?v=Ow0lr63y4Mw");
    case "procrastination":
        return openWebsite(browser.extension.getURL("resources/procrastination.html"));
    }

}

const WHITELIST_VIDEOS = [
    "https://www.youtube.com/watch?v=Ow0lr63y4Mw",
];

if (!WHITELIST_VIDEOS.includes(window.location.href)) {
    document.getElementById('container').append(createOverlay());

    document.getElementById('argh-form').addEventListener('submit', e => {
        e.preventDefault();
        formSubmitFunction(document.getElementById('argh-reason').value);
    });
}
