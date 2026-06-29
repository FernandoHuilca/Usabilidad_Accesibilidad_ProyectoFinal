(function () {
  "use strict";

  const form          = document.getElementById("suggestion-form");
  const modalBackdrop = document.getElementById("modal-backdrop");
  const modalCloseBtn = document.getElementById("modal-close-btn");
  const submitBtn     = document.getElementById("submit-btn");

  const requiredFields = {
    "book-title": {
      input: document.getElementById("book-title"),
      error: document.getElementById("book-title-error"),
    },
    "book-authors": {
      input: document.getElementById("book-authors"),
      error: document.getElementById("book-authors-error"),
    },
  };

  /* ── Validación ────────────────────────────────────────────────────── */

  function validateField(key) {
    const { input, error } = requiredFields[key];
    const empty = input.value.trim() === "";
    input.setAttribute("aria-invalid", empty ? "true" : "false");
    error.classList.toggle("visible", empty);
    return !empty;
  }

  Object.keys(requiredFields).forEach(function (key) {
    const { input } = requiredFields[key];
    // Validar al salir del campo (WCAG 3.3.1)
    input.addEventListener("blur", () => validateField(key));
    // Limpiar error en cuanto el usuario corrige
    input.addEventListener("input", function () {
      if (input.getAttribute("aria-invalid") === "true") validateField(key);
    });
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    let firstInvalid = null;

    Object.keys(requiredFields).forEach(function (key) {
      if (!validateField(key) && !firstInvalid) firstInvalid = key;
    });

    if (firstInvalid) {
      requiredFields[firstInvalid].input.focus(); // WCAG 3.3.1
      return;
    }

    openModal();
  });

  /* ── Modal ─────────────────────────────────────────────────────────── */

  function openModal() {
    modalBackdrop.classList.add("open");
    document.body.style.overflow = "hidden";
    requestAnimationFrame(() => modalCloseBtn.focus()); // WCAG 2.4.3
    document.addEventListener("keydown", handleModalKeydown);
  }

  function closeModal() {
    modalBackdrop.classList.remove("open");
    document.body.style.overflow = "";
    document.removeEventListener("keydown", handleModalKeydown);

    // Resetear formulario y estados de validación
    form.reset();
    Object.keys(requiredFields).forEach(function (key) {
      requiredFields[key].input.setAttribute("aria-invalid", "false");
      requiredFields[key].error.classList.remove("visible");
    });

    submitBtn.focus(); // WCAG 2.4.3 – devolver foco al disparador
  }

  function handleModalKeydown(e) {
    if (e.key === "Escape") { closeModal(); return; }
    if (e.key !== "Tab") return;

    // Trampa de foco (WCAG 2.1.2)
    const focusable = Array.from(
      modalBackdrop.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      )
    );
    if (!focusable.length) return;

    const first = focusable[0];
    const last  = focusable[focusable.length - 1];

    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault(); last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault(); first.focus();
    }
  }

  modalCloseBtn.addEventListener("click", closeModal);
  modalBackdrop.addEventListener("click", function (e) {
    if (e.target === modalBackdrop) closeModal();
  });
})();