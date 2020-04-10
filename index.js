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
}

function indulgeTimer(length=15) {
    // parent element
    let p = document.createElement('p');

    let startTimer = () => {
        let remainingTime = length;
        p.innerHTML = `Wait ${remainingTime} seconds to indulge`;
        let timer = setInterval(() => {
            remainingTime -= 1;
            p.innerHTML = `Wait ${remainingTime} seconds to indulge`;
            if (remainingTime === 0) {
                clearInterval(timer);
                p.innerHTML = '';
                fillParagraph(p,
                    `You don't really want to indulge, do you?
                     Think about how often you have regretted this decision.
                     If you want to do it despite everything, click `, 'here', '.',
                              deleteOverlay);
            }
        }, 1000);
        window.addEventListener('blur', () => {
            if (remainingTime <= 0)
                return;

            clearInterval(timer);
            fillParagraph(p, 'You left the tab. Click ', 'here', ' to restart timer. Add nevermind, I changed my mind', startTimer);
        });
    };
    p.appendChild(createActionLink("Indulge anwayws", startTimer));
    return p;
}


function createContent() {
    let parent = createOverlayIndexElement();
    let b = document.createElement('button')
    b.addEventListener('click', () => window.location.replace('about:blank'));
    b.innerHTML = "Improve Now";

    parent.append(b);

    parent.append(indulgeTimer());
}

createContent();
