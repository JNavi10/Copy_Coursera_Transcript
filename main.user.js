// ==UserScript==
// @name         Copy Coursera Lecture Transcript
// @namespace    http://tampermonkey.net/
// @version      1.2
// @description  Copies all innerHTML of span.css-4s48ix inside div.phrases to clipboard when clicked
// @author       Jun Hyeok Bae
// @match        https://www.coursera.org/learn/*
// @grant        GM_setClipboard
// @updateURL    https://github.com/JNavi10/Copy_Coursera_Transcript/blob/main/main.user.js
// @downloadURL  https://github.com/JNavi10/Copy_Coursera_Transcript/blob/main/main.user.js
// ==/UserScript==

(function () {
    'use strict';

    function showToast(message, success = true) {
        const toast = document.createElement("div");
        toast.innerText = message;
        toast.style.position = "fixed";
        toast.style.bottom = "20px";
        toast.style.right = "20px";
        toast.style.padding = "10px 20px";
        toast.style.backgroundColor = success ? "green" : "red";
        toast.style.color = "#fff";
        toast.style.borderRadius = "5px";
        toast.style.fontSize = "14px";
        toast.style.zIndex = "1000";
        toast.style.boxShadow = "0px 2px 5px rgba(0,0,0,0.3)";
        toast.style.opacity = "1";
        toast.style.transition = "opacity 0.5s ease";

        document.body.appendChild(toast);

        setTimeout(() => {
            toast.style.opacity = "0";
            setTimeout(() => toast.remove(), 500); // Wait for transition to finish
        }, 3000);
    }

    function copyText() {
        const spans = document.querySelectorAll('div.phrases span.css-4s48ix');
        const textContent = Array.from(spans).map(span => span.innerHTML).join("\n");

        if (textContent.trim() !== "") {
            GM_setClipboard(textContent);
            showToast("Transcript copied to clipboard!\n", true);
        } else {
            showToast("No matching elements found.", false);
        }
    }

    // Create a floating button to trigger the copy manually
    const btn = document.createElement("button");
    btn.innerText = "Copy Phrases";
    btn.style.position = "fixed";
    btn.style.bottom = "20px";
    btn.style.right = "20px";
    btn.style.padding = "10px";
    btn.style.backgroundColor = "#007bff";
    btn.style.color = "#fff";
    btn.style.border = "none";
    btn.style.borderRadius = "5px";
    btn.style.cursor = "pointer";
    btn.style.zIndex = "1000";
    btn.style.fontSize = "14px";
    btn.style.boxShadow = "0px 2px 5px rgba(0,0,0,0.3)";

    btn.addEventListener("click", copyText);
    document.body.appendChild(btn);
})();
