// =========================================
// ReVibe 💚
// Auth + Perfil
// =========================================

const SUPABASE_URL =
    "https://bndnqsvhvxskuyjslvag.supabase.co";

const SUPABASE_PUBLISHABLE_KEY =
    "sb_publishable_1gn43buCu9itZk2VmaqvPw_J7c26pdl";

const supabaseClient =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_PUBLISHABLE_KEY
    );


// =========================================
// ELEMENTOS
// =========================================

const loginForm =
    document.getElementById("loginForm");

const registerButton =
    document.getElementById("registerButton");

const googleButton =
    document.querySelector(".google-button");

const facebookButton =
    document.querySelector(".facebook-button");

const emailInput =
    document.getElementById("email");

const passwordInput =
    document.getElementById("password");

const authCard =
    document.querySelector(".auth-card");

const profileSection =
    document.getElementById("profileSection");

const profileForm =
    document.getElementById("profileForm");

const backToLogin =
    document.getElementById("backToLogin");

const displayNameInput =
    document.getElementById("displayName");

const usernameInput =
    document.getElementById("username");

const personalMessageInput =
    document.getElementById("personalMessage");

const statusInput =
    document.getElementById("status");

const nowPlayingInput =
    document.getElementById("nowPlaying");

const usernameHelp =
    document.getElementById("usernameHelp");


// =========================================
// ESTADO
// =========================================

let registerMode = false;


// =========================================
// MOSTRAR LOGIN
// =========================================

function showLogin() {

    authCard.style.display = "block";

    profileSection.classList.remove("active");

}


function showProfile() {

    authCard.style.display = "none";

    profileSection.classList.add("active");

}

// =========================================
// CREAR CUENTA / VOLVER A LOGIN
// =========================================

registerButton.addEventListener(
    "click",
    function () {

        registerMode = !registerMode;

        const title =
            document.querySelector(".auth-card h2");

        const subtitle =
            document.querySelector(".auth-subtitle");

        const submitButton =
            loginForm.querySelector(".primary-button");


        if (registerMode) {

            title.textContent =
                "¡Únete a ReVibe! 💚";

            subtitle.textContent =
                "Crea tu cuenta y empieza a conectar.";

            submitButton.textContent =
                "CREAR CUENTA";

            registerButton.textContent =
                "Ya tengo una cuenta";

        } else {

            title.textContent =
                "¡Qué bueno verte! 💚";

            subtitle.textContent =
                "Conecta con tus personas y vuelve a sentir la vibra.";

            submitButton.textContent =
                "ENTRAR";

            registerButton.textContent =
                "Crear cuenta";
        }

    }
);


// =========================================
// FORMULARIO LOGIN / REGISTRO
// =========================================

loginForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const email =
            emailInput.value.trim();

        const password =
            passwordInput.value.trim();


        if (!email || !password) {

            alert(
                "💚 Completa tu correo y contraseña."
            );

            return;
        }


        if (password.length < 6) {

            alert(
                "🔒 La contraseña debe tener al menos 6 caracteres."
            );

            return;
        }


        const submitButton =
            loginForm.querySelector(".primary-button");

        submitButton.disabled = true;


        try {

            // =================================
            // CREAR CUENTA
            // =================================

            if (registerMode) {

                const {
                    data,
                    error
                } = await supabaseClient.auth.signUp({
                    email,
                    password
                });


                if (error) {
                    throw error;
                }


                if (data.session) {

                    alert(
                        "🎉 ¡Cuenta creada!\n\n" +
                        "Bienvenida a ReVibe 💚"
                    );

                    await loadProfile();

                } else {

                    alert(
                        "💌 ¡Cuenta creada!\n\n" +
                        "Te enviamos un correo para confirmar tu cuenta."
                    );

                }


                registerMode = false;

                document.querySelector(
                    ".auth-card h2"
                ).textContent =
                    "¡Qué bueno verte! 💚";

                document.querySelector(
                    ".auth-subtitle"
                ).textContent =
                    "Conecta con tus personas y vuelve a sentir la vibra.";

                submitButton.textContent =
                    "ENTRAR";

                registerButton.textContent =
                    "Crear cuenta";


                return;
            }


            // =================================
            // LOGIN
            // =================================

            const {
                data,
                error
            } = await supabaseClient.auth.signInWithPassword({
                email,
                password
            });


            if (error) {
                throw error;
            }


            console.log(
                "Sesión iniciada:",
                data.user
            );


            await loadProfile();


        } catch (error) {

            console.error(
                "Error de autenticación:",
                error
            );


            alert(
                "⚠️ " +
                getAuthErrorMessage(error)
            );


        } finally {

            submitButton.disabled = false;

        }

    }
);


// =========================================
// CARGAR PERFIL
// =========================================

async function loadProfile() {

    const {
        data: sessionData,
        error: sessionError
    } = await supabaseClient.auth.getSession();


    if (sessionError) {

        console.error(sessionError);

        return;
    }


    const session =
        sessionData.session;


    if (!session) {

        showLogin();

        return;
    }


    const user =
        session.user;


    const {
        data: profile,
        error
    } = await supabaseClient
        .from("profiles")
        .select(`
            id,
            username,
            display_name,
            avatar_url,
            status,
            personal_message,
            now_playing
        `)
        .eq("id", user.id)
        .maybeSingle();


    if (error) {

        console.error(
            "Error cargando perfil:",
            error
        );

        alert(
            "⚠️ No pudimos cargar tu perfil."
        );

        return;
    }


    if (!profile) {

        console.log(
            "El usuario todavía no tiene perfil."
        );

        return;
    }


    // =================================
    // CARGAR DATOS EN EL FORMULARIO
    // =================================

    displayNameInput.value =
        profile.display_name || "";

    usernameInput.value =
        profile.username || "";

    personalMessageInput.value =
        profile.personal_message || "";

    statusInput.value =
        profile.status || "online";

    nowPlayingInput.value =
        profile.now_playing || "";


    showProfile();

}


// =========================================
// GUARDAR PERFIL
// =========================================

profileForm.addEventListener(
    "submit",
    async function (event) {

        event.preventDefault();


        const {
            data: sessionData
        } = await supabaseClient.auth.getSession();


        const session =
            sessionData.session;


        if (!session) {

            alert(
                "⚠️ Tu sesión ya no está activa."
            );

            showLogin();

            return;
        }


        const user =
            session.user;


        const username =
            usernameInput.value
                .trim()
                .toLowerCase();

        const displayName =
            displayNameInput.value.trim();

        const personalMessage =
            personalMessageInput.value.trim();

        const status =
            statusInput.value;

        const nowPlaying =
            nowPlayingInput.value.trim();


        // =================================
        // VALIDAR USERNAME
        // =================================

        if (
            username &&
            !/^[a-z0-9_]{3,20}$/.test(username)
        ) {

            usernameHelp.textContent =
                "⚠️ Usa entre 3 y 20 caracteres: letras, números y _";

            usernameHelp.style.color =
                "#d9534f";

            usernameInput.focus();

            return;
        }


        usernameHelp.textContent =
            "3–20 caracteres: letras, números y _";

        usernameHelp.style.color =
            "";


        const saveButton =
            profileForm.querySelector(".primary-button");

        saveButton.disabled = true;

        saveButton.textContent =
            "GUARDANDO...";


        try {

            const {
                error
            } = await supabaseClient
                .from("profiles")
                .update({
                    username:
                        username || null,

                    display_name:
                        displayName || null,

                    personal_message:
                        personalMessage || null,

                    status,

                    now_playing:
                        nowPlaying || null,

                    updated_at:
                        new Date().toISOString()
                })
                .eq("id", user.id);


            if (error) {
                throw error;
            }


            alert(
                "💚 ¡Perfil guardado!\n\n" +
                "Tu perfil de ReVibe está listo."
            );


        } catch (error) {

            console.error(
                "Error guardando perfil:",
                error
            );


            if (
                error.code === "23505"
            ) {

                alert(
                    "⚠️ Ese @usuario ya está ocupado.\n\n" +
                    "Prueba con otro."
                );

            } else {

                alert(
                    "⚠️ No pudimos guardar tu perfil."
                );
            }


        } finally {

            saveButton.disabled = false;

            saveButton.textContent =
                "💚 GUARDAR PERFIL";

        }

    }
);


// =========================================
// VOLVER / CERRAR SESIÓN
// =========================================

backToLogin.addEventListener(
    "click",
    async function () {

        const confirmar =
            confirm(
                "¿Quieres cerrar sesión de ReVibe?"
            );


        if (!confirmar) {
            return;
        }


        await supabaseClient.auth.signOut();

        showLogin();

    }
);


// =========================================
// GOOGLE
// =========================================

googleButton.addEventListener(
    "click",
    async function () {

        const {
            error
        } = await supabaseClient.auth.signInWithOAuth({
            provider: "google"
        });


        if (error) {

            console.error(error);

            alert(
                "⚠️ No pudimos iniciar sesión con Google."
            );

        }

    }
);


// =========================================
// FACEBOOK
// =========================================

facebookButton.addEventListener(
    "click",
    async function () {

        const {
            error
        } = await supabaseClient.auth.signInWithOAuth({
            provider: "facebook"
        });


        if (error) {

            console.error(error);

            alert(
                "⚠️ No pudimos iniciar sesión con Facebook."
            );

        }

    }
);


// =========================================
// MENSAJES DE ERROR
// =========================================

function getAuthErrorMessage(error) {

    const message =
        error?.message || "";


    if (
        message.includes(
            "Invalid login credentials"
        )
    ) {

        return "El correo o la contraseña no son correctos.";

    }


    if (
        message.includes(
            "User already registered"
        )
    ) {

        return "Este correo ya tiene una cuenta en ReVibe.";

    }


    if (
        message.includes(
            "Password should be at least"
        )
    ) {

        return "La contraseña debe tener al menos 6 caracteres.";

    }


    return message ||
        "Ocurrió un error. Inténtalo nuevamente.";
}


// =========================================
// CAMBIOS DE SESIÓN
// =========================================

supabaseClient.auth.onAuthStateChange(
    function (event, session) {

        console.log(
            "ReVibe Auth:",
            event
        );

    }
);


// =========================================
// COMPROBAR SESIÓN AL ABRIR
// =========================================

async function initializeReVibe() {

    const {
        data,
        error
    } = await supabaseClient.auth.getSession();


    if (error) {

        console.error(error);

        showLogin();

        return;
    }


    if (data.session) {

        await loadProfile();

    } else {

        showLogin();

    }

}


initializeReVibe();