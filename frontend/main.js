const toggle = document.querySelector(".navbar-toggle");
const navItems = document.querySelector(".nav-items");

toggle.addEventListener("click", () => {
  navItems.classList.toggle("open");
});

const form = document.getElementById("contact-form");
const submitButton = document.getElementById("submit-button");

// Phone number formatting
const phoneInput = document.getElementById("phone");
phoneInput.addEventListener("input", (e) => {
  let value = e.target.value.replaceAll(/\D/g, "");

  if (value.length >= 11) {
    value = value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
  } else if (value.length >= 7) {
    value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3");
  } else if (value.length >= 3) {
    value = value.replace(/(\d{2})(\d{0,5})/, "($1) $2");
  }

  e.target.value = value.substring(0, 15); // Limit to 15 characters
});

// Show success message
const showSuccess = () => {
  const successContainer = document.createElement("div");
  successContainer.className = "success-message";
  successContainer.textContent = "Mensagem enviada com sucesso!";

  form.insertBefore(successContainer, form.firstChild);

  // Remove success message after 5 seconds
  setTimeout(() => {
    successContainer.remove();
  }, 5000);
};

const showError = (message) => {
  const errorContainer = document.createElement("div");
  errorContainer.className = "error-message";
  errorContainer.textContent = message;

  form.insertBefore(errorContainer, form.firstChild);

  // Remove error message after 5 seconds
  setTimeout(() => {
    errorContainer.remove();
  }, 5000);
};

// Form submission
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  // Show loading state
  submitButton.disabled = true;
  submitButton.classList.add("loading");
  submitButton.textContent = "Enviando...";

  await fetch("http://localhost:3000/send-mail", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: document.getElementById("email").value,
      subject: "Contato do site",
      html: [
        `<p><strong>Nome:</strong> ${document.getElementById("name").value}</p>`,
        `<p><strong>Email:</strong> ${document.getElementById("email").value}</p>`,
        `<p><strong>Telefone:</strong> ${document.getElementById("phone").value}</p>`,
        `<p><strong>Mensagem:</strong> ${document.getElementById("message").value}</p>`
      ].join(''), 
    })
  }).then((res) => {
    if (!res.ok) {
      throw res.json();
    }

    return res.json();
  }).then(() => {
    showSuccess();
    form.reset();
  }).catch((err) => {
    showError("Erro ao enviar a mensagem. Por favor, verifique os campos e tente novamente!");
    console.error(err); // TEMP
  });

  submitButton.disabled = false;
  submitButton.classList.remove("loading");
  submitButton.textContent = "Enviar";
});
