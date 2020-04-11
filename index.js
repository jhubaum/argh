function createOverlayIndexElement() {
    let d = document.createElement('div');
    d.setAttribute('id', 'argh-container');

    document.getElementById('container').append(d);

    return d;
}

function deleteOverlay() {
    let overlay = document.getElementById('argh-container');
    overlay.parentNode.removeChild(overlay);
}

function showSuccess() {
    window.location.replace(browser.extension.getURL('resources/success.html'));
}

function createActionLink(text, action) {
    let a = document.createElement('button');
    a.classList.add('link');
    a.innerHTML = text;
    a.addEventListener('click', action);
    return a;
}

function fillParagraph(p, textBefore, linkText, textAfter, action) {
    p.innerHTML = textBefore;
    p.appendChild(createActionLink(linkText, action));
    p.append(textAfter);

    return p;
}

function createIndexPage(parent) {
    let root = document.createElement('div')
    parent.appendChild(root);
    root.innerHTML =
        `<p>
           You just opened a Youtube Video, but you have installed Argh, the Youtube Blocker. This means you want to spend less time watching videos.
         </p>
         <p>
           I'm glad that you are here and I know how hard it can be to break a bad
           habit. So let's make it easy for you. <span class="bold">Instead of watching this one video
           now, do ten pushups and drink a glass of water.</span>
         </p>
         <p>
           If you still want to watch Youtube after that, that's perfectly fine.
           Feel free to do so. Just do it later.
         </p>`;

    let mainButton = document.createElement('button');
    mainButton.classList.add('main');
    mainButton.innerHTML = "Yes, I want to improve";
    mainButton.addEventListener('click', showSuccess);

    root.appendChild(mainButton);

    let p = document.createElement('p');
    p.classList.add('small');
    fillParagraph(p, 'This time, I will ', 'indulge anyways', '.',
                  () => createIndulgementTimer(root));

    root.appendChild(p);
}

function createIndulgementTimer(parent, length=20) {
    parent.innerHTML =
        `<p>
         You chose to watch this video anyways. That's perfectly fine.
         Maybe a friend send you a video for you to watch, or a new episode of your favourite series was released just now.
         After all, you wouldn't be here, if you didn't get any value from spending time
         on Youtube.
         </p><br>
         <p>
           But if this video is worth watching, it's also worth to wait ${length} seconds for it
           to begin.
           Use this time to think about, why you started the video and whether watching it
           now is not just procrastination. <br>What would the person you want to be do
           right now?
         </p><br>`;

    parent.appendChild(createTimerParagraph(length));
    let nevermind = fillParagraph(document.createElement('p'), "",
                                  "Nevermind", ", I will watch the video later.",
                                  showSuccess);
    nevermind.getElementsByTagName('button')[0].classList.add('big');
    parent.appendChild(nevermind);
}

function createTimerParagraph(length) {
    let p = document.createElement('p');

    let focus = true;
    window.addEventListener('blur', () => focus = false);
    window.addEventListener('focus', () => focus = true);

    let updateParagraph = remaining => p.innerHTML = `Wait ${remaining} seconds to watch the video.`
    updateParagraph(length);
    let timer = setInterval(() => {
        if (!focus)
            return;
       
        length -= 1;
        updateParagraph(length);

        if (length === 0) {
            clearInterval(timer);
            p.innerHTML = '';
            p.appendChild(createActionLink("Continue to video", deleteOverlay));
        }
    }, 1000);

    return p;
}

createIndexPage(createOverlayIndexElement());
