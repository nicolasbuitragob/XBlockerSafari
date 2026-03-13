(() => {
  if (window.top !== window) {
    return;
  }

  if (!/(^|\.)x\.com$/i.test(window.location.hostname)) {
    return;
  }

  // Stop all network activity immediately.
  try {
    window.stop();
  } catch (_) {}

  const escapeHtml = (value) =>
    value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;");

  const attemptedUrl = escapeHtml(window.location.href);

  function injectBlockScreen() {
    // Nuke the entire document tree and replace it.
    const root = document.documentElement;
    root.innerHTML = `<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>X Blocked</title>
    <style>
      :root {
        color-scheme: dark;
        --bg: #090a0e;
        --panel: rgba(14, 18, 28, 0.84);
        --panel-border: rgba(255, 255, 255, 0.08);
        --text: #f4efe3;
        --muted: #b2bccb;
        --accent: #ff6b35;
        --accent-soft: rgba(255, 107, 53, 0.22);
      }

      * {
        box-sizing: border-box;
      }

      html,
      body {
        margin: 0;
        min-height: 100%;
        opacity: 1 !important;
      }

      body {
        min-height: 100vh;
        display: grid;
        place-items: center;
        padding: 24px;
        background:
          radial-gradient(circle at top, rgba(255, 107, 53, 0.24), transparent 38%),
          radial-gradient(circle at bottom left, rgba(32, 76, 255, 0.14), transparent 32%),
          linear-gradient(180deg, #121621 0%, var(--bg) 48%, #040507 100%);
        color: var(--text);
        font-family: "SF Pro Display", "Avenir Next", "Helvetica Neue", sans-serif;
      }

      .shell {
        width: min(720px, 100%);
        padding: 32px;
        border: 1px solid var(--panel-border);
        border-radius: 28px;
        background: var(--panel);
        box-shadow:
          0 40px 120px rgba(0, 0, 0, 0.45),
          inset 0 1px 0 rgba(255, 255, 255, 0.06);
        backdrop-filter: blur(22px);
      }

      .badge {
        display: inline-flex;
        align-items: center;
        gap: 10px;
        padding: 10px 14px;
        border-radius: 999px;
        background: var(--accent-soft);
        color: #ffd8c7;
        font-size: 13px;
        font-weight: 700;
        letter-spacing: 0.08em;
        text-transform: uppercase;
      }

      .badge::before {
        content: "";
        width: 10px;
        height: 10px;
        border-radius: 999px;
        background: var(--accent);
        box-shadow: 0 0 18px rgba(255, 107, 53, 0.8);
      }

      h1 {
        margin: 20px 0 12px;
        font-size: clamp(42px, 8vw, 72px);
        line-height: 0.96;
        letter-spacing: -0.06em;
      }

      p {
        margin: 0;
        max-width: 42rem;
        color: var(--muted);
        font-size: clamp(18px, 3vw, 22px);
        line-height: 1.45;
      }

      .url {
        margin-top: 28px;
        padding: 16px 18px;
        border: 1px solid rgba(255, 255, 255, 0.08);
        border-radius: 18px;
        background: rgba(255, 255, 255, 0.03);
        color: #dbe6f7;
        font-family: "SF Mono", "Menlo", "Monaco", monospace;
        font-size: 14px;
        line-height: 1.5;
        word-break: break-word;
      }

      .note {
        margin-top: 28px;
        font-size: 14px;
        line-height: 1.5;
        color: #8c98ab;
      }

      @media (max-width: 640px) {
        .shell {
          padding: 24px;
          border-radius: 24px;
        }

        .url {
          font-size: 13px;
        }
      }
    </style>
  </head>
  <body>
    <main class="shell" role="main" aria-labelledby="blocked-title">
      <div class="badge">Site Blocked</div>
      <h1 id="blocked-title">Stop Doomscrolling</h1>
      <p>Go build something. Get outside. Do something better with your time.</p>
      <div class="url">${attemptedUrl}</div>
      <div class="note">Every time you type x.com, this screen will be here to remind you.</div>
    </main>
  </body>`;

    root.setAttribute("lang", "en");
    // Mark that we've taken over so the observer knows.
    root.dataset.xblocked = "1";
  }

  // Inject immediately.
  injectBlockScreen();

  // Safari may keep parsing the original HTML and overwrite our content.
  // Use a MutationObserver to re-inject if that happens.
  let guardCount = 0;
  const maxGuards = 50;

  const observer = new MutationObserver(() => {
    if (document.documentElement.dataset.xblocked !== "1") {
      guardCount++;
      injectBlockScreen();
      try { window.stop(); } catch (_) {}
      if (guardCount >= maxGuards) {
        observer.disconnect();
      }
    }
  });

  observer.observe(document.documentElement, {
    childList: true,
    subtree: true,
  });

  // Stop guarding after 5 seconds — the page should be fully blocked by then.
  setTimeout(() => observer.disconnect(), 5000);
})();
