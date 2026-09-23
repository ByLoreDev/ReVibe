// =========================================
// ReVibe 💚
// Auth + Inicio + Perfil + Avatar
// =========================================

// =========================================
// SUPABASE
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
// ELEMENTOS - LOGIN
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


// =========================================
// ELEMENTOS - INICIO
// =========================================

const homeSection =
    document.getElementById("homeSection");

const homeAvatar =
    document.getElementById("homeAvatar");

const homeAvatarPlaceholder =
    document.getElementById("homeAvatarPlaceholder");

const homeStatusDot =
    document.getElementById("homeStatusDot");

const homeDisplayName =
    document.getElementById("homeDisplayName");

const homeUsername =
    document.getElementById("homeUsername");

const homePersonalMessage =
    document.getElementById("homePersonalMessage");

const homeNowPlaying =
    document.getElementById("homeNowPlaying");

const editProfileButton =
    document.getElementById("editProfileButton");

const addFriendButton =
    document.getElementById("addFriendButton");

const addFirstFriendButton =
    document.getElementById("addFirstFriendButton");

const friendsList =
    document.getElementById("friendsList");


// =========================================
// ELEMENTOS - PERFIL
// =========================================

const profileSection =
    document.getElementById("profileSection");

const profileForm =
    document.getElementById("profileForm");

const backToHome =
    document.getElementById("backToHome");

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
// ELEMENTOS - AVATAR
// =========================================

const avatarEdit =
    document.getElementById("avatarEdit");

const avatarInput =
    document.getElementById("avatarInput");

const avatarImage =
    document.getElementById("avatarImage");

const avatarLetter =
    document.getElementById("avatarLetter");


// =========================================
// ESTADO
// =========================================

let registerMode = false;


// =========================================
// MOSTRAR LOGIN
// =========================================

function showLogin() {

    if (authCard) {
        authCard.style.display = "block";
    }

    if (homeSection) {
        homeSection.style.display = "none";
    }

    if (profileSection) {
        profileSection.style.display = "none";
    }
}


// =========================================
// MOSTRAR INICIO
// =========================================

function showHome() {

    if (authCard) {
        authCard.style.display = "none";
    }

    if (profileSection) {
        profileSection.style.display = "none";
    }

    if (homeSection) {
        homeSection.style.display = "block";
    }
}


// =========================================
// MOSTRAR PERFIL
// =========================================

function showProfile() {

    if (authCard) {
        authCard.style.display = "none";
    }

    if (homeSection) {
        homeSection.style.display = "none";
    }

    if (profileSection) {
        profileSection.style.display = "block";
    }
}


// =========================================
// CREAR CUENTA / CAMBIAR LOGIN
// =========================================

if (registerButton) {

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

}


// =========================================
// LOGIN / REGISTRO
// =========================================

if (loginForm) {

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


                    const title =
                        document.querySelector(".auth-card h2");

                    const subtitle =
                        document.querySelector(".auth-subtitle");


                    title.textContent =
                        "¡Qué bueno verte! 💚";

                    subtitle.textContent =
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
                    "💚 Sesión iniciada:",
                    data.user
                );


                await loadProfile();

            } catch (error) {

                console.error(
                    "❌ Error de autenticación:",
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

}


// =========================================
// CARGAR PERFIL
// =========================================

async function loadProfile() {

    console.log("💚 Cargando perfil...");


    const {
        data: sessionData,
        error: sessionError
    } = await supabaseClient.auth.getSession();


    if (sessionError) {

        console.error(
            "❌ Error obteniendo sesión:",
            sessionError
        );

        showLogin();

        return;
    }


    const session =
        sessionData.session;


    if (!session) {

        console.log(
            "⚠️ No hay sesión activa."
        );

        showLogin();

        return;
    }


    const user =
        session.user;


    console.log(
        "👤 Usuario:",
        user.id
    );


    // =========================================
    // BUSCAR PERFIL
    // =========================================

    let {
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
            "❌ Error cargando perfil:",
            error
        );

        alert(
            "⚠️ No pudimos cargar tu perfil.\n\n" +
            error.message
        );

        return;
    }


    // =========================================
    // SI NO EXISTE PERFIL
    // =========================================

    if (!profile) {

        console.log(
            "⚠️ No existe perfil. Creándolo..."
        );


        const defaultName =
            user.user_metadata?.name ||
            user.email?.split("@")[0] ||
            "ReViber";


        const {
            data: newProfile,
            error: createError
        } = await supabaseClient
            .from("profiles")
            .insert({
                id: user.id,
                display_name: defaultName,
                status: "online"
            })
            .select()
            .single();


        if (createError) {

            console.error(
                "❌ Error creando perfil:",
                createError
            );

            alert(
                "⚠️ No pudimos crear tu perfil.\n\n" +
                createError.message
            );

            return;
        }


        profile =
            newProfile;
    }


    // =========================================
    // FORMULARIO
    // =========================================

    if (displayNameInput) {
        displayNameInput.value =
            profile.display_name || "";
    }


    if (usernameInput) {
        usernameInput.value =
            profile.username || "";
    }


    if (personalMessageInput) {
        personalMessageInput.value =
            profile.personal_message || "";
    }


    if (statusInput) {
        statusInput.value =
            profile.status || "online";
    }


    if (nowPlayingInput) {
        nowPlayingInput.value =
            profile.now_playing || "";
    }


    // =========================================
    // AVATAR DEL PERFIL
    // =========================================

    if (profile.avatar_url) {

        if (avatarImage) {
            avatarImage.src =
                profile.avatar_url;

            avatarImage.style.display =
                "block";
        }

        if (avatarLetter) {
            avatarLetter.style.display =
                "none";
        }

    } else {

        if (avatarImage) {
            avatarImage.style.display =
                "none";
        }

        if (avatarLetter) {
            avatarLetter.style.display =
                "block";
        }
    }


    // =========================================
    // ACTUALIZAR INICIO
    // =========================================

    updateHomeProfile(profile);


    console.log(
        "💚 Perfil cargado correctamente."
    );


    showHome();
}


// =========================================
// ACTUALIZAR PERFIL EN INICIO
// =========================================

function updateHomeProfile(profile) {

    if (!profile) {
        return;
    }


    // =========================================
    // NOMBRE
    // =========================================

    if (homeDisplayName) {

        homeDisplayName.textContent =
            profile.display_name ||
            "ReViber";
    }


    // =========================================
    // USERNAME
    // =========================================

    if (homeUsername) {

        homeUsername.textContent =
            profile.username
                ? "@" + profile.username
                : "@usuario";
    }


    // =========================================
    // MENSAJE
    // =========================================

    if (homePersonalMessage) {

        homePersonalMessage.textContent =
            profile.personal_message
                ? "💭 " + profile.personal_message
                : "💭 Sin mensaje personal";
    }


    // =========================================
    // NOW PLAYING
    // =========================================

    if (homeNowPlaying) {

        homeNowPlaying.textContent =
            profile.now_playing ||
            "Nada por ahora";
    }


    // =========================================
    // ESTADO
    // =========================================

    updateStatusDot(
        profile.status || "online"
    );


    // =========================================
    // AVATAR
    // =========================================

    updateHomeAvatar(
        profile.avatar_url,
        profile.display_name
    );
}


// =========================================
// ACTUALIZAR PUNTO DE ESTADO
// =========================================

function updateStatusDot(status) {

    if (!homeStatusDot) {
        return;
    }


    homeStatusDot.classList.remove(
        "status-online",
        "status-away",
        "status-busy",
        "status-offline"
    );


    homeStatusDot.classList.add(
        "status-" + status
    );


    homeStatusDot.title =
        getStatusText(status);
}


// =========================================
// TEXTO DEL ESTADO
// =========================================

function getStatusText(status) {

    const statuses = {

        online: "Conectada",

        away: "Ausente",

        busy: "Ocupada",

        offline: "Desconectada"

    };


    return statuses[status] ||
        "Conectada";
}


// =========================================
// ACTUALIZAR AVATAR EN INICIO
// =========================================

function updateHomeAvatar(
    avatarUrl,
    displayName
) {

    const letter =
        (
            displayName ||
            "R"
        )
        .trim()
        .charAt(0)
        .toUpperCase();


    if (avatarUrl) {

        if (homeAvatar) {

            homeAvatar.src =
                avatarUrl;

            homeAvatar.style.display =
                "block";
        }

        if (homeAvatarPlaceholder) {

            homeAvatarPlaceholder.style.display =
                "none";
        }

    } else {

        if (homeAvatar) {

            homeAvatar.style.display =
                "none";
        }

        if (homeAvatarPlaceholder) {

            homeAvatarPlaceholder.textContent =
                letter;

            homeAvatarPlaceholder.style.display =
                "flex";
        }
    }
}


// =========================================
// BOTÓN EDITAR PERFIL
// =========================================

if (editProfileButton) {

    editProfileButton.addEventListener(
        "click",
        function () {

            showProfile();

        }
    );
}


// =========================================
// BOTÓN VOLVER A INICIO
// =========================================

if (backToHome) {

    backToHome.addEventListener(
        "click",
        function () {

            showHome();

        }
    );
}


// =========================================
// AGREGAR AMIGO
// =========================================

function comingSoonFriends() {

    alert(
        "👥 ¡Muy pronto!\n\n" +
        "Aquí podrás buscar personas por su @usuario y agregarlas a tus amigos. 💚"
    );
}


if (addFriendButton) {

    addFriendButton.addEventListener(
        "click",
        comingSoonFriends
    );
}


if (addFirstFriendButton) {

    addFirstFriendButton.addEventListener(
        "click",
        comingSoonFriends
    );
}


// =========================================
// FOTO DE PERFIL
// =========================================

if (avatarEdit && avatarInput) {

    avatarEdit.addEventListener(
        "click",
        function () {

            avatarInput.click();

        }
    );


    avatarInput.addEventListener(
        "change",
        async function () {

            const file =
                avatarInput.files[0];


            if (!file) {
                return;
            }


            // =========================================
            // VALIDAR TIPO
            // =========================================

            const allowedTypes = [
                "image/jpeg",
                "image/png",
                "image/webp"
            ];


            if (!allowedTypes.includes(file.type)) {

                alert(
                    "⚠️ Solo puedes subir imágenes JPG, PNG o WEBP."
                );

                avatarInput.value = "";

                return;
            }


            // =========================================
            // VALIDAR TAMAÑO
            // =========================================

            const maxSize =
                5 * 1024 * 1024;


            if (file.size > maxSize) {

                alert(
                    "⚠️ La imagen no puede superar los 5 MB."
                );

                avatarInput.value = "";

                return;
            }


            try {

                avatarEdit.disabled =
                    true;

                avatarEdit.textContent =
                    "…";


                // =========================================
                // SESIÓN
                // =========================================

                const {
                    data: sessionData,
                    error: sessionError
                } = await supabaseClient.auth.getSession();


                if (
                    sessionError ||
                    !sessionData.session
                ) {

                    throw new Error(
                        "Tu sesión ya no está activa."
                    );
                }


                const user =
                    sessionData.session.user;


                // =========================================
                // ARCHIVO
                // =========================================

                const extension =
                    file.name
                        .split(".")
                        .pop()
                        .toLowerCase();


                const filePath =
                    `${user.id}/avatar-${Date.now()}.${extension}`;


                console.log(
                    "📸 Subiendo avatar:",
                    filePath
                );


                // =========================================
                // SUBIR STORAGE
                // =========================================

                const {
                    error: uploadError
                } = await supabaseClient
                    .storage
                    .from("avatars")
                    .upload(
                        filePath,
                        file,
                        {
                            cacheControl: "3600",
                            upsert: false,
                            contentType: file.type
                        }
                    );


                if (uploadError) {
                    throw uploadError;
                }


                // =========================================
                // URL PÚBLICA
                // =========================================

                const {
                    data: publicUrlData
                } = supabaseClient
                    .storage
                    .from("avatars")
                    .getPublicUrl(
                        filePath
                    );


                const avatarUrl =
                    publicUrlData.publicUrl;


                // =========================================
                // GUARDAR EN PROFILES
                // =========================================

                const {
                    error: profileError
                } = await supabaseClient
                    .from("profiles")
                    .update({
                        avatar_url: avatarUrl,
                        updated_at:
                            new Date().toISOString()
                    })
                    .eq(
                        "id",
                        user.id
                    );


                if (profileError) {
                    throw profileError;
                }


                // =========================================
                // MOSTRAR EN PERFIL
                // =========================================

                if (avatarImage) {

                    avatarImage.src =
                        avatarUrl;

                    avatarImage.style.display =
                        "block";
                }


                if (avatarLetter) {

                    avatarLetter.style.display =
                        "none";
                }


                // =========================================
                // MOSTRAR EN INICIO
                // =========================================

                updateHomeAvatar(
                    avatarUrl,
                    displayNameInput?.value
                );


                alert(
                    "📸 ¡Foto de perfil actualizada!"
                );


            } catch (error) {

                console.error(
                    "❌ Error subiendo avatar:",
                    error
                );


                alert(
                    "⚠️ No pudimos subir tu foto.\n\n" +
                    error.message
                );


            } finally {

                avatarEdit.disabled =
                    false;

                avatarEdit.textContent =
                    "+";

                avatarInput.value = "";

            }

        }
    );
}


// =========================================
// GUARDAR PERFIL
// =========================================

if (profileForm) {

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


            // =========================================
            // VALIDAR USERNAME
            // =========================================

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
                profileForm.querySelector(
                    ".primary-button"
                );


            saveButton.disabled =
                true;

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
                    .eq(
                        "id",
                        user.id
                    );


                if (error) {
                    throw error;
                }


                // =========================================
                // ACTUALIZAR INICIO INMEDIATAMENTE
                // =========================================

                const currentProfile = {

                    id: user.id,

                    username:
                        username || null,

                    display_name:
                        displayName || null,

                    personal_message:
                        personalMessage || null,

                    status,

                    now_playing:
                        nowPlaying || null,

                    avatar_url:
                        avatarImage?.style.display !== "none"
                            ? avatarImage?.src
                            : null

                };


                updateHomeProfile(
                    currentProfile
                );


                alert(
                    "💚 ¡Perfil guardado!\n\n" +
                    "Tu perfil de ReVibe está listo."
                );


                showHome();


            } catch (error) {

                console.error(
                    "❌ Error guardando perfil:",
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
                        "⚠️ No pudimos guardar tu perfil.\n\n" +
                        error.message
                    );

                }


            } finally {

                saveButton.disabled =
                    false;

                saveButton.textContent =
                    "💚 GUARDAR PERFIL";

            }

        }
    );
}


// =========================================
// GOOGLE
// =========================================

if (googleButton) {

    googleButton.addEventListener(
        "click",
        async function () {

            const {
                error
            } = await supabaseClient.auth.signInWithOAuth({
                provider: "google"
            });


            if (error) {

                console.error(
                    error
                );


                alert(
                    "⚠️ No pudimos iniciar sesión con Google.\n\n" +
                    error.message
                );

            }

        }
    );
}


// =========================================
// FACEBOOK
// =========================================

if (facebookButton) {

    facebookButton.addEventListener(
        "click",
        async function () {

            const {
                error
            } = await supabaseClient.auth.signInWithOAuth({
                provider: "facebook"
            });


            if (error) {

                console.error(
                    error
                );


                alert(
                    "⚠️ No pudimos iniciar sesión con Facebook.\n\n" +
                    error.message
                );

            }

        }
    );
}


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

        return (
            "El correo o la contraseña no son correctos."
        );

    }


    if (
        message.includes(
            "User already registered"
        )
    ) {

        return (
            "Este correo ya tiene una cuenta en ReVibe."
        );

    }


    if (
        message.includes(
            "Password should be at least"
        )
    ) {

        return (
            "La contraseña debe tener al menos 6 caracteres."
        );

    }


    if (
        message.includes(
            "Email not confirmed"
        )
    ) {

        return (
            "Primero debes confirmar tu correo electrónico."
        );

    }


    return (
        message ||
        "Ocurrió un error. Inténtalo nuevamente."
    );
}


// =========================================
// CAMBIOS DE SESIÓN
// =========================================

supabaseClient.auth.onAuthStateChange(
    function (event, session) {

        console.log(
            "💚 ReVibe Auth:",
            event
        );


        if (
            event === "SIGNED_OUT"
        ) {

            showLogin();

        }

    }
);


// =========================================
// COMPROBAR SESIÓN AL ABRIR
// =========================================

async function initializeReVibe() {

    console.log(
        "🚀 Iniciando ReVibe..."
    );


    const {
        data,
        error
    } = await supabaseClient.auth.getSession();


    if (error) {

        console.error(
            "❌ Error comprobando sesión:",
            error
        );

        showLogin();

        return;
    }


    if (data.session) {

        console.log(
            "💚 Sesión encontrada."
        );

        await loadProfile();

    } else {

        console.log(
            "👋 No hay sesión."
        );

        showLogin();

    }

}


// =========================================
// INICIAR REVIBE
// =========================================

initializeReVibe();