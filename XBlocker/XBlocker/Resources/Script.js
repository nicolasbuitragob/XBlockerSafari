function show(enabled, useSettingsInsteadOfPreferences) {
    if (useSettingsInsteadOfPreferences) {
        document.getElementsByClassName('state-on')[0].innerText = "The blocker is on. Visiting x.com should now show the blocked screen immediately.";
        document.getElementsByClassName('state-off')[0].innerText = "The blocker is off. Turn it on in the Extensions section of Safari Settings to start blocking x.com.";
        document.getElementsByClassName('state-unknown')[0].innerText = "Check the Extensions section of Safari Settings to turn the blocker on.";
        document.getElementsByClassName('open-preferences')[0].innerText = "Open Safari Settings";
    }

    if (typeof enabled === "boolean") {
        document.body.classList.toggle(`state-on`, enabled);
        document.body.classList.toggle(`state-off`, !enabled);
    } else {
        document.body.classList.remove(`state-on`);
        document.body.classList.remove(`state-off`);
    }
}

function openPreferences() {
    webkit.messageHandlers.controller.postMessage("open-preferences");
}

document.querySelector("button.open-preferences").addEventListener("click", openPreferences);
