(function () {
    'use strict';
    var btn = document.getElementById('transcript-toggle-btn');
    var panel = document.getElementById('transcript-panel');
    if (!btn || !panel) return;
    btn.addEventListener('click', function () {
        var expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!expanded));
        if (expanded) { panel.setAttribute('hidden', ''); } else { panel.removeAttribute('hidden'); }
    });
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && btn.getAttribute('aria-expanded') === 'true') {
            panel.setAttribute('hidden', '');
            btn.setAttribute('aria-expanded', 'false');
            btn.focus();
        }
    });
})();


(function () {
    'use strict';
    document.addEventListener('DOMContentLoaded', function () {
        setTimeout(function () {
            var links = document.querySelectorAll('#header-container nav a');
            links.forEach(function (l) {
                if (l.getAttribute('href') === 'acercaDe.html') {
                    l.setAttribute('aria-current', 'page');
                    l.style.color = 'var(--color-primary)';
                    l.style.borderBottomColor = 'var(--color-accent)';
                }
            });
        }, 200);
    });
})();