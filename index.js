console.log("Test From Argh");

//window.location.replace(browser.extension.getURL('resources/index.html'));

function onSubmitYTReason(val) {
    console.log('onSubmitYTReason', val)
}

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
             <option value="save">I just want to save a video for later</option>
           </select>
           <input type="submit" value="Continue to Video">
         </form>`;

    return d;
}

document.getElementById('container').append(createOverlay());

document.getElementById('argh-form').addEventListener('submit', e => {
    e.preventDefault();
    console.log("Yay");
});
