const USERS_KEY = 'urubu_users';
const SESSION_KEY = 'urubu_logged_user';

function getUsers() {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
}

function saveUsers(users) {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function setLoggedUser(email) {
    localStorage.setItem(SESSION_KEY, email);
}

function getLoggedUser() {
    const email = localStorage.getItem(SESSION_KEY);
    if (!email) return null;
    return getUsers().find(u => u.email === email) || null;
}

function logout() {
    localStorage.removeItem(SESSION_KEY);
    window.location.href = 'index.html';
}

function showFormError(form, message) {
    let errorEl = form.querySelector('.form-error');
    if (!errorEl) {
        errorEl = document.createElement('p');
        errorEl.className = 'form-error';
        form.prepend(errorEl);
    }
    errorEl.textContent = message;
}

function setupPasswordToggles() {
    document.querySelectorAll('.password-toggle').forEach(function (btn) {
        btn.addEventListener('click', function () {
            const input = document.getElementById(this.dataset.target);
            if (!input) return;

            const icon = this.querySelector('i');
            const showing = input.type === 'password';

            input.type = showing ? 'text' : 'password';
            icon.classList.toggle('fa-eye', !showing);
            icon.classList.toggle('fa-eye-slash', showing);
            this.setAttribute('aria-label', showing ? 'Ocultar senha' : 'Mostrar senha');
        });
    });
}

const PASSWORD_RULES = {
    length: senha => senha.length >= 8,
    uppercase: senha => /[A-Z]/.test(senha),
    lowercase: senha => /[a-z]/.test(senha),
    number: senha => /[0-9]/.test(senha),
};

function validatePassword(senha) {
    const results = {};
    let valid = true;
    for (const rule in PASSWORD_RULES) {
        results[rule] = PASSWORD_RULES[rule](senha);
        if (!results[rule]) valid = false;
    }
    return { valid, results };
}

function setupPasswordRequirements() {
    const senhaInput = document.getElementById('senha');
    const list = document.getElementById('password-requirements');
    if (!senhaInput || !list) return;

    senhaInput.addEventListener('input', function () {
        const { results } = validatePassword(senhaInput.value);
        for (const rule in results) {
            const li = list.querySelector(`[data-rule="${rule}"]`);
            if (!li) continue;
            const icon = li.querySelector('i');
            li.classList.toggle('valid', results[rule]);
            icon.classList.toggle('fa-circle', !results[rule]);
            icon.classList.toggle('fa-circle-check', results[rule]);
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {

    setupPasswordToggles();
    setupPasswordRequirements();

    const formCadastro = document.getElementById('form-cadastro');
    if (formCadastro) {
        formCadastro.addEventListener('submit', function (e) {
            e.preventDefault();
            const nome = document.getElementById('nome').value.trim();
            const email = document.getElementById('email').value.trim().toLowerCase();
            const senha = document.getElementById('senha').value;

            const users = getUsers();
            if (users.some(u => u.email === email)) {
                showFormError(formCadastro, 'Já existe uma conta cadastrada com esse email.');
                return;
            }

            const { valid } = validatePassword(senha);
            if (!valid) {
                showFormError(formCadastro, 'A senha não atende aos requisitos mínimos de segurança.');
                return;
            }

            users.push({ nome, email, senha });
            saveUsers(users);
            setLoggedUser(email);
            window.location.href = 'perfil.html';
        });
    }

    const formLogin = document.getElementById('form-login');
    if (formLogin) {
        formLogin.addEventListener('submit', function (e) {
            e.preventDefault();
            const email = document.getElementById('email').value.trim().toLowerCase();
            const senha = document.getElementById('senha').value;

            const user = getUsers().find(u => u.email === email && u.senha === senha);

            if (!user) {
                showFormError(formLogin, 'Email ou senha incorretos.');
                return;
            }

            setLoggedUser(email);
            window.location.href = 'perfil.html';
        });
    }

    const userNameEl = document.getElementById('user-name');
    if (userNameEl) {
        const user = getLoggedUser();
        if (!user) {
            window.location.href = 'login.html';
        } else {
            userNameEl.textContent = user.nome;
        }
    }

    const logoutLink = document.getElementById('logout-link');
    if (logoutLink) {
        logoutLink.addEventListener('click', function (e) {
            e.preventDefault();
            logout();
        });
    }

    const userActionLink = document.getElementById('user-action-link');
    if (userActionLink) {
        const user = getLoggedUser();
        if (user) {
            userActionLink.setAttribute('href', 'perfil.html');
            userActionLink.innerHTML = '<i class="fa-solid fa-user"></i> Olá, ' + user.nome;
        }
    }
});