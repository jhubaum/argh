function createOverlayIndexElement() {
    let d = document.createElement('div');
    d.setAttribute('id', 'argh-container');

    let root = document.getElementById('container');

    // if root is null, website is the mobile version
    if (root === null) {
        document.getElementsByTagName('header')[0].append(d);
    } else {
        root.append(d);
    }

    return d;
}

function deleteOverlay() {
    let overlay = document.getElementById('argh-container');
    overlay.parentNode.removeChild(overlay);
}

function showResearchOverlay(contentNode) {
    // clear overlay first
    contentNode.innerHTML = `
        <p>
            Ok, ready your notebook? Watching a video without taking notes is no research.
        </p><br>
        <p>Also, what is the question you seek to answer?</p>`;

    let form = document.createElement('form');
    let input = form.appendChild(document.createElement('input'));
    let submit = form.appendChild(document.createElement('input'));
    submit.setAttribute('type', 'submit');
    submit.value = 'Continue to video';
    submit.classList.add('button');

    input.addEventListener('input', e => {
        let value = e.target.value;

        function isValueValid() {
            return value.length > 0;
        }

        if (isValueValid())
            submit.removeAttribute('disabled');
        else
            submit.setAttribute('disabled', '');
    });

    submit.setAttribute('disabled', '');

    contentNode.appendChild(form);
    console.log(form);
    form.addEventListener('submit', e => {
        e.preventDefault();
        deleteOverlay();
    });
}

function showProcrastinationPage() {
    window.location.replace(browser.extension.getURL('resources/message.html'));
}

function createIndexPage(parent) {
    let root = document.createElement('div')
    root.setAttribute('id', 'argh-window');
    parent.appendChild(root);
    root.append('What is your reason to click on this video?');

    function createButton(content, action) {
        let button = document.createElement('button');
        button.innerHTML = content;
        button.addEventListener('click', action);
        return button;
    }

    let buttonContainer = root.appendChild(document.createElement('div'));
    buttonContainer.classList.add('button-container');

    buttonContainer.appendChild(createButton("I want to listen to music", deleteOverlay));
    buttonContainer.appendChild(createButton("A friend send me this video", deleteOverlay));
    buttonContainer.appendChild(createButton("I want to do some research", () => showResearchOverlay(root)));
    buttonContainer.appendChild(createButton("None of the above", showProcrastinationPage));
}


function checkOverlayTrigger() {
    if (window.location.pathname == '/watch' && document.getElementById('argh-container') === null)
        createIndexPage(createOverlayIndexElement());
}

window.addEventListener('yt-navigate-finish', checkOverlayTrigger);
window.addEventListener('state-navigateend', checkOverlayTrigger);
checkOverlayTrigger();
