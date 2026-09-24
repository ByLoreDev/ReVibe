// =========================================
// ReVibe 💚
// Auth + Inicio + Perfil + Avatar + Amigos
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

const loginForm = document.getElementById("loginForm");
const registerButton = document.getElementById("registerButton");
const googleButton = document.querySelector(".google-button");
const facebookButton = document.querySelector(".facebook-button");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const authCard = document.querySelector(".auth-card");


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

const profileMenuButton =
    document.getElementById("profileMenuButton");

const profileMenu =
    document.getElementById("profileMenu");

const menuEditProfile =
    document.getElementById("menuEditProfile");

const menuSignOut =
    document.getElementById("menuSignOut");

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
// ELEMENTOS - MODAL AMIGOS
// =========================================

const friendModal =
    document.getElementById("friendModal");

const closeFriendModal =
    document.getElementById("closeFriendModal");

const friendSearchInput =
    document.getElementById("friendSearchInput");

const friendSearchResults =
    document.getElementById("friendSearchResults");


// =========================================
// ESTADO
// =========================================

let registerMode = false;

let searchTimeout = null;

let currentUserId = null;

let currentProfile = null;

let chatChannel = null;


// =========================================
// MOSTRAR PANTALLAS
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

    loadFriends();
}


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
// REGISTRO / LOGIN
// =========================================

if (registerButton && loginForm) {

    registerButton.addEventListener(
        "click",
        function () {

            registerMode =
                !registerMode;

            const title =
                document.querySelector(
                    ".auth-card h2"
                );

            const subtitle =
                document.querySelector(
                    ".auth-subtitle"
                );

            const submitButton =
                loginForm.querySelector(
                    ".primary-button"
                );


            if (registerMode) {

                if (title) {
                    title.textContent =
                        "¡Únete a ReVibe! 💚";
                }

                if (subtitle) {
                    subtitle.textContent =
                        "Crea tu cuenta y empieza a conectar.";
                }

                if (submitButton) {
                    submitButton.textContent =
                        "CREAR CUENTA";
                }

                registerButton.textContent =
                    "Ya tengo una cuenta";


            } else {

                if (title) {
                    title.textContent =
                        "¡Qué bueno verte! 💚";
                }

                if (subtitle) {
                    subtitle.textContent =
                        "Conecta con tus personas y vuelve a sentir la vibra.";
                }

                if (submitButton) {
                    submitButton.textContent =
                        "ENTRAR";
                }

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
                emailInput?.value.trim();

            const password =
                passwordInput?.value.trim();


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
                loginForm.querySelector(
                    ".primary-button"
                );


            if (submitButton) {
                submitButton.disabled = true;
            }


            try {

                // =============================
                // CREAR CUENTA
                // =============================

                if (registerMode) {

                    const {
                        data,
                        error
                    } =
                        await supabaseClient
                            .auth
                            .signUp({
                                email,
                                password
                            });


                    if (error) {
                        throw error;
                    }


                    registerMode = false;


                    const title =
                        document.querySelector(
                            ".auth-card h2"
                        );

                    const subtitle =
                        document.querySelector(
                            ".auth-subtitle"
                        );


                    if (title) {
                        title.textContent =
                            "¡Qué bueno verte! 💚";
                    }

                    if (subtitle) {
                        subtitle.textContent =
                            "Conecta con tus personas y vuelve a sentir la vibra.";
                    }

                    if (submitButton) {
                        submitButton.textContent =
                            "ENTRAR";
                    }

                    if (registerButton) {
                        registerButton.textContent =
                            "Crear cuenta";
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


                    return;
                }


                // =============================
                // LOGIN
                // =============================

                const {
                    data,
                    error
                } =
                    await supabaseClient
                        .auth
                        .signInWithPassword({
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

                if (submitButton) {
                    submitButton.disabled = false;
                }

            }

        }
    );
}


// =========================================
// CARGAR PERFIL
// =========================================

async function loadProfile() {

    console.log(
        "💚 Cargando perfil..."
    );


    const {
        data: sessionData,
        error: sessionError
    } =
        await supabaseClient
            .auth
            .getSession();


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

        currentUserId = null;

        currentProfile = null;

        showLogin();

        return;
    }


    const user =
        session.user;


    currentUserId =
        user.id;


    let {
        data: profile,
        error
    } =
        await supabaseClient
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
            .eq(
                "id",
                user.id
            )
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
    // CREAR PERFIL SI NO EXISTE
    // =========================================

    if (!profile) {

        const defaultName =
            user.user_metadata?.name ||
            user.email?.split("@")[0] ||
            "ReViber";


        const {
            data: newProfile,
            error: createError
        } =
            await supabaseClient
                .from("profiles")
                .insert({
                    id: user.id,
                    display_name:
                        defaultName,
                    status:
                        "online"
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


    currentProfile =
        profile;


    // =========================================
    // CARGAR FORMULARIO
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
    // CARGAR AVATAR
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

    updateHomeProfile(
        profile
    );


    console.log(
        "💚 Perfil cargado correctamente."
    );


    showHome();
}


// =========================================
// ACTUALIZAR PERFIL EN INICIO
// =========================================

function updateHomeProfile(
    profile
) {

    if (!profile) {
        return;
    }


    if (homeDisplayName) {

        homeDisplayName.textContent =
            profile.display_name ||
            "ReViber";
    }


    if (homeUsername) {

        homeUsername.textContent =
            profile.username
                ? "@" + profile.username
                : "@usuario";
    }


    if (homePersonalMessage) {

        homePersonalMessage.textContent =
            profile.personal_message
                ? "💭 " +
                  profile.personal_message
                : "💭 Sin mensaje personal";
    }


    if (homeNowPlaying) {

        homeNowPlaying.textContent =
            profile.now_playing ||
            "Nada por ahora";
    }


    updateStatusDot(
        profile.status ||
        "online"
    );


    updateHomeAvatar(
        profile.avatar_url,
        profile.display_name
    );
}


// =========================================
// ESTADO
// =========================================

function updateStatusDot(
    status
) {

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


function getStatusText(
    status
) {

    const statuses = {

        online:
            "Conectada",

        away:
            "Ausente",

        busy:
            "Ocupada",

        offline:
            "Desconectada"
    };


    return statuses[status] ||
        "Conectada";
}


// =========================================
// AVATAR EN INICIO
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
// MENÚ DEL PERFIL
// =========================================

if (profileMenuButton && profileMenu) {

    profileMenuButton.addEventListener(
        "click",
        function (event) {

            event.stopPropagation();

            profileMenu.classList.toggle(
                "active"
            );

        }
    );
}


// =========================================
// CERRAR MENÚ AL HACER CLIC AFUERA
// =========================================

document.addEventListener(
    "click",
    function (event) {

        if (
            profileMenu &&
            profileMenuButton &&
            !profileMenu.contains(
                event.target
            ) &&
            !profileMenuButton.contains(
                event.target
            )
        ) {

            profileMenu.classList.remove(
                "active"
            );

        }

    }
);


// =========================================
// EDITAR PERFIL
// =========================================

if (editProfileButton) {

    editProfileButton.addEventListener(
        "click",
        function () {

            showProfile();

        }
    );
}


if (menuEditProfile) {

    menuEditProfile.addEventListener(
        "click",
        function () {

            if (profileMenu) {

                profileMenu.classList.remove(
                    "active"
                );
            }


            showProfile();

        }
    );
}


// =========================================
// CERRAR SESIÓN
// =========================================

if (menuSignOut) {

    menuSignOut.addEventListener(
        "click",
        async function () {

            const confirmar =
                confirm(
                    "¿Quieres cerrar sesión de ReVibe? 💚"
                );


            if (!confirmar) {
                return;
            }


            try {

                const {
                    error
                } =
                    await supabaseClient
                        .auth
                        .signOut();


                if (error) {
                    throw error;
                }


                currentUserId =
                    null;

                currentProfile =
                    null;


                if (profileMenu) {

                    profileMenu.classList.remove(
                        "active"
                    );
                }


                if (loginForm) {
                    loginForm.reset();
                }


                showLogin();


                console.log(
                    "👋 Sesión cerrada."
                );


            } catch (error) {

                console.error(
                    "❌ Error cerrando sesión:",
                    error
                );


                alert(
                    "⚠️ No pudimos cerrar la sesión.\n\n" +
                    error.message
                );

            }

        }
    );
}


// =========================================
// VOLVER A INICIO DESDE PERFIL
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
// MODAL AGREGAR AMIGO
// =========================================

function openFriendModal() {

    if (!friendModal) {
        return;
    }


    friendModal.style.display =
        "flex";


    if (friendSearchInput) {

        friendSearchInput.value =
            "";

        setTimeout(
            function () {

                friendSearchInput.focus();

            },
            50
        );
    }


    if (friendSearchResults) {

        friendSearchResults.innerHTML = `
            <div class="friend-search-empty">
                👥
                <p>
                    Busca a alguien para encontrarlo.
                </p>
            </div>
        `;

    }

}


function closeFriendModalWindow() {

    if (!friendModal) {
        return;
    }


    friendModal.style.display =
        "none";


    if (friendSearchInput) {

        friendSearchInput.value =
            "";
    }

}


// =========================================
// BOTÓN + AGREGAR
// =========================================

if (addFriendButton) {

    addFriendButton.addEventListener(
        "click",
        function () {

            openFriendModal();

        }
    );
}


// =========================================
// BOTÓN AGREGAR PRIMER AMIGO
// =========================================

if (addFirstFriendButton) {

    addFirstFriendButton.addEventListener(
        "click",
        function () {

            openFriendModal();

        }
    );
}


// =========================================
// CERRAR MODAL CON X
// =========================================

if (closeFriendModal) {

    closeFriendModal.addEventListener(
        "click",
        function () {

            closeFriendModalWindow();

        }
    );
}


// =========================================
// CERRAR AL HACER CLIC FUERA
// =========================================

if (friendModal) {

    friendModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                friendModal
            ) {

                closeFriendModalWindow();

            }

        }
    );
}


// =========================================
// CERRAR CON ESC
// =========================================

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            friendModal &&
            friendModal.style.display !== "none"
        ) {

            closeFriendModalWindow();

        }

    }
);


// =========================================
// BUSCAR USUARIOS
// =========================================

if (friendSearchInput) {

    friendSearchInput.addEventListener(
        "input",
        function () {

            clearTimeout(
                searchTimeout
            );


            const search =
                friendSearchInput.value
                    .trim()
                    .toLowerCase()
                    .replace(
                        /^@/,
                        ""
                    );


            if (
                search.length < 3
            ) {

                if (friendSearchResults) {

                    friendSearchResults.innerHTML = `
                        <div class="friend-search-empty">
                            👥
                            <p>
                                Escribe al menos 3 caracteres.
                            </p>
                        </div>
                    `;

                }

                return;
            }


            if (friendSearchResults) {

                friendSearchResults.innerHTML = `
                    <div class="friend-search-empty">
                        🔍
                        <p>Buscando...</p>
                    </div>
                `;

            }


            searchTimeout =
                setTimeout(
                    function () {

                        searchUsers(
                            search
                        );

                    },
                    350
                );

        }
    );
}

// =========================================
// SOLICITUDES DE AMISTAD
// =========================================

async function loadFriendRequests() {

    if (!currentUserId) {
        return;
    }

    try {

        const {
            data: requests,
            error
        } = await supabaseClient
            .from("friendships")
            .select(`
                id,
                requester_id,
                receiver_id,
                status,
                created_at
            `)
            .eq("receiver_id", currentUserId)
            .eq("status", "pending")
            .order("created_at", {
                ascending: false
            });

        if (error) {
            throw error;
        }

        let requestsContainer =
            document.getElementById(
                "friendRequestsContainer"
            );

        if (!requestsContainer) {

            requestsContainer =
                document.createElement("div");

            requestsContainer.id =
                "friendRequestsContainer";

            requestsContainer.className =
                "friend-requests-container";

            if (friendsList) {

                friendsList.parentNode.insertBefore(
                    requestsContainer,
                    friendsList
                );

            }
        }

        if (!requests || requests.length === 0) {

            requestsContainer.style.display =
                "none";

            return;
        }

        requestsContainer.style.display =
            "block";

        requestsContainer.innerHTML = `
            <div class="friend-requests-header">

                <div>
                    <h3>💌 Solicitudes de amistad</h3>

                    <span>
                        ${requests.length}
                        ${requests.length === 1
                            ? "solicitud pendiente"
                            : "solicitudes pendientes"}
                    </span>
                </div>

            </div>

            <div
                class="friend-requests-list"
                id="friendRequestsList"
            ></div>
        `;

        const requestsList =
            document.getElementById(
                "friendRequestsList"
            );

        const requesterIds =
            requests.map(
                request =>
                    request.requester_id
            );

        const {
            data: profiles,
            error: profilesError
        } =
            await supabaseClient
                .from("profiles")
                .select(`
                    id,
                    username,
                    display_name,
                    avatar_url,
                    status
                `)
                .in(
                    "id",
                    requesterIds
                );

        if (profilesError) {
            throw profilesError;
        }

        requests.forEach(request => {

            const person =
                profiles.find(
                    profile =>
                        profile.id ===
                        request.requester_id
                );

            if (!person) {
                return;
            }

            const card =
                createFriendRequestCard(
                    request,
                    person
                );

            requestsList.appendChild(card);

        });

    } catch (error) {

        console.error(
            "❌ Error cargando solicitudes:",
            error
        );

    }

}
// =========================================
// CONSULTAR USUARIOS EN SUPABASE
// =========================================

async function searchUsers(
    search
) {

    try {

        const {
            data: sessionData,
            error: sessionError
        } =
            await supabaseClient
                .auth
                .getSession();


        if (
            sessionError ||
            !sessionData.session
        ) {

            throw new Error(
                "Tu sesión ya no está activa."
            );
        }


        const currentUser =
            sessionData.session.user;


        const {
            data: users,
            error
        } =
            await supabaseClient
                .from("profiles")
                .select(`
                    id,
                    username,
                    display_name,
                    avatar_url,
                    status
                `)
                .ilike(
                    "username",
                    `${search}%`
                )
                .neq(
                    "id",
                    currentUser.id
                )
                .limit(10);


        if (error) {
            throw error;
        }


        if (
            !users ||
            users.length === 0
        ) {

            if (friendSearchResults) {

                friendSearchResults.innerHTML = `
                    <div class="friend-search-empty">
                        😕
                        <p>
                            No encontramos a nadie con
                            <strong>@${escapeHtml(search)}</strong>
                        </p>
                    </div>
                `;

            }

            return;
        }


        await renderFriendResults(
            users
        );


    } catch (error) {

        console.error(
            "❌ Error buscando usuarios:",
            error
        );


        if (friendSearchResults) {

            friendSearchResults.innerHTML = `
                <div class="friend-search-empty">
                    ⚠️
                    <p>
                        No pudimos realizar la búsqueda.
                    </p>
                </div>
            `;

        }

    }

}


// =========================================
// MOSTRAR RESULTADOS
// =========================================

async function renderFriendResults(
    users
) {

    if (!friendSearchResults) {
        return;
    }


    friendSearchResults.innerHTML =
        "";


    for (
        const user of users
    ) {

        const relation =
            await getFriendshipStatus(
                user.id
            );


        const result =
            document.createElement(
                "div"
            );


        result.className =
            "friend-result";


        const avatar =
            document.createElement(
                "div"
            );


        avatar.className =
            "friend-result-avatar";


        if (user.avatar_url) {

            const img =
                document.createElement(
                    "img"
                );

            img.src =
                user.avatar_url;

            img.alt =
                user.display_name ||
                "Usuario";


            avatar.appendChild(
                img
            );

        } else {

            avatar.textContent =
                (
                    user.display_name ||
                    user.username ||
                    "R"
                )
                .charAt(0)
                .toUpperCase();

        }


        const info =
            document.createElement(
                "div"
            );


        info.className =
            "friend-result-info";


        const name =
            document.createElement(
                "p"
            );


        name.className =
            "friend-result-name";


        name.textContent =
            user.display_name ||
            "ReViber";


        const username =
            document.createElement(
                "p"
            );


        username.className =
            "friend-result-username";


        username.textContent =
            user.username
                ? "@" + user.username
                : "@usuario";


        info.appendChild(
            name
        );

        info.appendChild(
            username
        );


        const button =
            document.createElement(
                "button"
            );


        button.type =
            "button";


        button.className =
            "friend-result-button";


        if (
            relation ===
            "accepted"
        ) {

            button.textContent =
                "✓ Amigos";

            button.classList.add(
                "friend"
            );

            button.disabled =
                true;


        } else if (
            relation ===
            "pending_sent"
        ) {

            button.textContent =
                "Solicitud enviada";

            button.classList.add(
                "pending"
            );

            button.disabled =
                true;


        } else if (
            relation ===
            "pending_received"
        ) {

            button.textContent =
                "💌 Solicitud recibida";


            button.addEventListener(
                "click",
                function () {

                    acceptFriendRequest(
                        user.id
                    );

                }
            );


        } else {

            button.textContent =
                "+ Agregar";


            button.addEventListener(
                "click",
                async function () {

                    button.disabled =
                        true;

                    button.textContent =
                        "Enviando...";


                    const success =
                        await sendFriendRequest(
                            user.id
                        );


                    if (success) {

                        button.textContent =
                            "Solicitud enviada";

                        button.classList.add(
                            "pending"
                        );

                    } else {

                        button.disabled =
                            false;

                        button.textContent =
                            "+ Agregar";

                    }

                }
            );

        }


        result.appendChild(
            avatar
        );

        result.appendChild(
            info
        );

        result.appendChild(
            button
        );


        friendSearchResults.appendChild(
            result
        );

    }

}
// =========================================
// ENVIAR SOLICITUD DE AMISTAD
// =========================================

async function sendFriendRequest(receiverId) {

    if (!currentUserId) {

        alert(
            "⚠️ Tu sesión ya no está activa."
        );

        return false;
    }

    if (
        receiverId === currentUserId
    ) {

        return false;
    }

    try {

        console.log(
            "👥 Enviando solicitud...",
            {
                requester_id:
                    currentUserId,

                receiver_id:
                    receiverId
            }
        );


        const {
            data,
            error
        } =
            await supabaseClient
                .from("friendships")
                .insert({
                    requester_id:
                        currentUserId,

                    receiver_id:
                        receiverId,

                    status:
                        "pending"
                })
                .select()
                .single();


        if (error) {

            console.error(
                "❌ Error de Supabase:",
                error
            );

            throw error;
        }


        console.log(
            "💚 Solicitud creada:",
            data
        );


        return true;


    } catch (error) {

        console.error(
            "❌ No se pudo enviar la solicitud:",
            error
        );


        if (
            error.code === "23505"
        ) {

            alert(
                "💚 Ya existe una solicitud o amistad con esta persona."
            );

        } else {

            alert(
                "⚠️ No pudimos enviar la solicitud.\n\n" +
                error.message
            );

        }


        return false;
    }
}

// =========================================
// CARGAR AMIGOS
// =========================================

async function loadFriends() {

    if (!friendsList) return;

    try {

        const {
            data: sessionData,
            error: sessionError
        } = await supabaseClient.auth.getSession();

        if (sessionError) {
            throw sessionError;
        }

        if (!sessionData.session) {
            console.log("⚠️ No hay sesión activa.");
            return;
        }

        currentUserId =
            sessionData.session.user.id;

        console.log(
            "👤 Usuario actual:",
            currentUserId
        );

        const {
            data: relationships,
            error
        } = await supabaseClient
            .from("friendships")
            .select(`
                id,
                requester_id,
                receiver_id,
                status,
                created_at
            `)
            .or(
                `requester_id.eq.${currentUserId},receiver_id.eq.${currentUserId}`
            )
            .order("created_at", {
                ascending: false
            });

        if (error) {
            throw error;
        }

        console.log(
            "💚 Relaciones:",
            relationships
        );

        // Amigos aceptados
        const accepted =
            (relationships || []).filter(
                friendship =>
                    friendship.status === "accepted"
            );

        // Solicitudes recibidas
        const received =
            (relationships || []).filter(
                friendship =>
                    friendship.status === "pending" &&
                    friendship.receiver_id === currentUserId
            );

        // IDs de las otras personas
        const otherIds = [
            ...accepted.map(friendship =>
                friendship.requester_id === currentUserId
                    ? friendship.receiver_id
                    : friendship.requester_id
            ),

            ...received.map(
                friendship =>
                    friendship.requester_id
            )
        ];

        const uniqueIds = [
            ...new Set(otherIds)
        ];

        let profiles = [];

        if (uniqueIds.length > 0) {

            const {
                data,
                error: profilesError
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
                .in("id", uniqueIds);

            if (profilesError) {
                throw profilesError;
            }

            profiles = data || [];
        }

        renderFriendsHome(
            accepted,
            received,
            profiles
        );

    } catch (error) {

        console.error(
            "❌ Error cargando amigos:",
            error
        );

        friendsList.innerHTML = `
            <div class="friend-search-empty">
                ⚠️
                <p>No pudimos cargar tus amigos.</p>
                <small>
                    ${escapeHtml(
                        error.message ||
                        "Error desconocido"
                    )}
                </small>
            </div>
        `;
    }
}


// =========================================
// MOSTRAR AMIGOS EN INICIO
// =========================================

function renderFriendsHome(
    accepted,
    received,
    profiles
) {

    if (!friendsList) return;

    friendsList.innerHTML = "";

    // =========================================
    // SOLICITUDES RECIBIDAS
    // =========================================

    if (received.length > 0) {

        const requestsBox =
            document.createElement("div");

        requestsBox.className =
            "friend-requests-box";

        const title =
            document.createElement("h3");

        title.textContent =
            `💌 Solicitudes (${received.length})`;

        requestsBox.appendChild(title);

        received.forEach(request => {

            const person =
                profiles.find(
                    profile =>
                        profile.id ===
                        request.requester_id
                );

            if (!person) return;

            const requestCard =
                createFriendRequestCard(
                    request,
                    person
                );

            requestsBox.appendChild(
                requestCard
            );
        });

        friendsList.appendChild(
            requestsBox
        );
    }

    // =========================================
    // SI NO TIENE AMIGOS
    // =========================================

    if (accepted.length === 0) {

        const empty =
            document.createElement("div");

        empty.className =
            "empty-friends";

        empty.innerHTML = `
            <div class="empty-friends-icon">
                👥
            </div>

            <h3>
                Aún no tienes amigos
            </h3>

            <p>
                Agrega a alguien y empieza
                a crear tu vibra. ✨
            </p>

            <button
                type="button"
                class="primary-button"
                id="dynamicAddFriendButton"
            >
                💚 AGREGAR MI PRIMER AMIGO
            </button>
        `;

        const button =
            empty.querySelector(
                "#dynamicAddFriendButton"
            );

        if (button) {
            button.addEventListener(
                "click",
                openFriendModal
            );
        }

        friendsList.appendChild(
            empty
        );

        return;
    }

 

    // =========================================
    // TARJETAS
    // =========================================

    accepted.forEach(friendship => {

        const friendId =
            friendship.requester_id === currentUserId
                ? friendship.receiver_id
                : friendship.requester_id;

        const person =
            profiles.find(
                profile =>
                    profile.id === friendId
            );

        if (!person) return;

        friendsList.appendChild(
            createFriendCard(
                person,
                friendship
            )
        );
    });
}


// =========================================
// TARJETA DE SOLICITUD
// =========================================

function createFriendRequestCard(
    request,
    person
) {

    const card =
        document.createElement("div");

    card.className =
        "friend-request-row";

    const avatar =
        document.createElement("div");

    avatar.className =
        "friend-result-avatar";

    if (person.avatar_url) {

        const img =
            document.createElement("img");

        img.src =
            person.avatar_url;

        img.alt =
            "Foto de " +
            (person.display_name || "usuario");

        avatar.appendChild(img);

    } else {

        avatar.textContent =
            (
                person.display_name ||
                person.username ||
                "R"
            )
                .charAt(0)
                .toUpperCase();
    }

    const info =
        document.createElement("div");

    info.className =
        "friend-result-info";

    const name =
        document.createElement("p");

    name.className =
        "friend-result-name";

    name.textContent =
        person.display_name ||
        "ReViber";

    const username =
        document.createElement("p");

    username.className =
        "friend-result-username";

    username.textContent =
        "@" +
        (person.username || "usuario");

    info.appendChild(name);
    info.appendChild(username);

    const actions =
        document.createElement("div");

    actions.className =
        "friend-request-actions";

    const accept =
        document.createElement("button");

    accept.type = "button";

    accept.className =
        "friend-result-button";

    accept.textContent =
        "✓ Aceptar";

    accept.addEventListener(
        "click",
        async function () {

            accept.disabled = true;

            const success =
                await updateFriendship(
                    request.id,
                    "accepted"
                );

            if (success) {
                await loadFriends();
            } else {
                accept.disabled = false;
            }
        }
    );

    const reject =
        document.createElement("button");

    reject.type = "button";

    reject.className =
        "friend-result-button pending";

    reject.textContent =
        "✕ Rechazar";

    reject.addEventListener(
        "click",
        async function () {

            reject.disabled = true;

            const success =
                await updateFriendship(
                    request.id,
                    "rejected"
                );

            if (success) {
                await loadFriends();
            } else {
                reject.disabled = false;
            }
        }
    );

    actions.appendChild(accept);
    actions.appendChild(reject);

    card.appendChild(avatar);
    card.appendChild(info);
    card.appendChild(actions);

    return card;
}
// =========================================
// CARGAR AMIGOS
// =========================================

async function loadFriends() {

    if (!friendsList) return;

    try {

        const {
            data: sessionData,
            error: sessionError
        } = await supabaseClient.auth.getSession();

        if (sessionError) {
            throw sessionError;
        }

        if (!sessionData.session) {
            console.log("⚠️ No hay sesión activa.");
            return;
        }

        currentUserId =
            sessionData.session.user.id;

        console.log(
            "👤 Usuario actual:",
            currentUserId
        );

        const {
            data: relationships,
            error
        } = await supabaseClient
            .from("friendships")
            .select(`
                id,
                requester_id,
                receiver_id,
                status,
                created_at
            `)
            .or(
                `requester_id.eq.${currentUserId},receiver_id.eq.${currentUserId}`
            )
            .order("created_at", {
                ascending: false
            });

        if (error) {
            throw error;
        }

        const accepted =
            (relationships || []).filter(
                friendship =>
                    friendship.status === "accepted"
            );

        const received =
            (relationships || []).filter(
                friendship =>
                    friendship.status === "pending" &&
                    friendship.receiver_id === currentUserId
            );

        const otherIds = [

            ...accepted.map(friendship =>
                friendship.requester_id === currentUserId
                    ? friendship.receiver_id
                    : friendship.requester_id
            ),

            ...received.map(
                friendship =>
                    friendship.requester_id
            )
        ];

        const uniqueIds =
            [...new Set(otherIds)];

        let profiles = [];

        if (uniqueIds.length > 0) {

            const {
                data,
                error: profilesError
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
                .in("id", uniqueIds);

            if (profilesError) {
                throw profilesError;
            }

            profiles = data || [];
        }

        renderFriendsHome(
            accepted,
            received,
            profiles
        );

    } catch (error) {

        console.error(
            "❌ Error cargando amigos:",
            error
        );

        friendsList.innerHTML = `
            <div class="friend-search-empty">
                ⚠️
                <p>No pudimos cargar tus amigos.</p>
                <small>
                    ${escapeHtml(
                        error.message ||
                        "Error desconocido"
                    )}
                </small>
            </div>
        `;
    }
}


// =========================================
// MOSTRAR AMIGOS
// =========================================

function renderFriendsHome(
    accepted,
    received,
    profiles
) {

    if (!friendsList) return;

    friendsList.innerHTML = "";

    // Solicitudes recibidas
    if (received.length > 0) {

        const requestsBox =
            document.createElement("div");

        requestsBox.className =
            "friend-requests-box";

        const title =
            document.createElement("h3");

        title.textContent =
            `💌 Solicitudes (${received.length})`;

        requestsBox.appendChild(title);

        received.forEach(request => {

            const person =
                profiles.find(
                    profile =>
                        profile.id ===
                        request.requester_id
                );

            if (!person) return;

            requestsBox.appendChild(
                createFriendRequestCard(
                    request,
                    person
                )
            );
        });

        friendsList.appendChild(
            requestsBox
        );
    }

    // Sin amigos
    if (accepted.length === 0) {

        const empty =
            document.createElement("div");

        empty.className =
            "empty-friends";

        empty.innerHTML = `
            <div class="empty-friends-icon">
                👥
            </div>

            <h3>Aún no tienes amigos</h3>

            <p>
                Agrega a alguien y empieza
                a crear tu vibra. ✨
            </p>

            <button
                type="button"
                class="primary-button"
                id="dynamicAddFriendButton"
            >
                💚 AGREGAR MI PRIMER AMIGO
            </button>
        `;

        const button =
            empty.querySelector(
                "#dynamicAddFriendButton"
            );

        if (button) {
            button.addEventListener(
                "click",
                openFriendModal
            );
        }

        friendsList.appendChild(empty);

        return;
    }

    
   

    // Mostrar amigos
    accepted.forEach(friendship => {

        const friendId =
            friendship.requester_id === currentUserId
                ? friendship.receiver_id
                : friendship.requester_id;

        const person =
            profiles.find(
                profile =>
                    profile.id === friendId
            );

        if (!person) return;

        friendsList.appendChild(
            createFriendCard(
                person,
                friendship
            )
        );
    });
}


// =========================================
// TARJETA DE SOLICITUD
// =========================================

function createFriendRequestCard(
    request,
    person
) {

    const card =
        document.createElement("div");

    card.className =
        "friend-request-row";

    const avatar =
        document.createElement("div");

    avatar.className =
        "friend-result-avatar";

    if (person.avatar_url) {

        const img =
            document.createElement("img");

        img.src =
            person.avatar_url;

        img.alt =
            "Foto de " +
            (person.display_name || "usuario");

        avatar.appendChild(img);

    } else {

        avatar.textContent =
            (
                person.display_name ||
                person.username ||
                "R"
            )
                .charAt(0)
                .toUpperCase();
    }

    const info =
        document.createElement("div");

    info.className =
        "friend-result-info";

    const name =
        document.createElement("p");

    name.className =
        "friend-result-name";

    name.textContent =
        person.display_name ||
        "ReViber";

    const username =
        document.createElement("p");

    username.className =
        "friend-result-username";

    username.textContent =
        "@" +
        (person.username || "usuario");

    info.appendChild(name);
    info.appendChild(username);

    const actions =
        document.createElement("div");

    actions.className =
        "friend-request-actions";

    const accept =
        document.createElement("button");

    accept.type = "button";
    accept.className =
        "friend-result-button";
    accept.textContent =
        "✓ Aceptar";

    accept.addEventListener(
        "click",
        async function () {

            accept.disabled = true;

            const success =
                await updateFriendship(
                    request.id,
                    "accepted"
                );

            if (success) {
                await loadFriends();
            } else {
                accept.disabled = false;
            }
        }
    );

    const reject =
        document.createElement("button");

    reject.type = "button";
    reject.className =
        "friend-result-button pending";
    reject.textContent =
        "✕ Rechazar";

    reject.addEventListener(
        "click",
        async function () {

            reject.disabled = true;

            const success =
                await updateFriendship(
                    request.id,
                    "rejected"
                );

            if (success) {
                await loadFriends();
            } else {
                reject.disabled = false;
            }
        }
    );

    actions.appendChild(accept);
    actions.appendChild(reject);

    card.appendChild(avatar);
    card.appendChild(info);
    card.appendChild(actions);

    return card;
}
// =========================================
// ESTADO DE AMISTAD
// =========================================

async function getFriendshipStatus(
    otherUserId
) {

    if (!currentUserId) {
        return "none";
    }


    const {
        data,
        error
    } =
        await supabaseClient
            .from("friendships")
            .select(`
                id,
                requester_id,
                receiver_id,
                status
            `)
            .or(
                `and(requester_id.eq.${currentUserId},receiver_id.eq.${otherUserId}),and(requester_id.eq.${otherUserId},receiver_id.eq.${currentUserId})`
            )
            .maybeSingle();


    if (error) {

        console.error(
            "❌ Error consultando amistad:",
            error
        );

        return "none";
    }


    if (!data) {
        return "none";
    }


    if (
        data.status ===
        "accepted"
    ) {

        return "accepted";
    }


    if (
        data.status ===
        "pending"
    ) {

        if (
            data.requester_id ===
            currentUserId
        ) {

            return "pending_sent";

        } else {

            return "pending_received";
        }
    }


    return "none";
}


// =========================================
// ESCAPAR HTML
// =========================================

function escapeHtml(
    text
) {

    const div =
        document.createElement(
            "div"
        );

    div.textContent =
        text;

    return div.innerHTML;
}

// =========================================
// ACEPTAR / RECHAZAR SOLICITUD
// =========================================

async function updateFriendship(friendshipId, status) {

    try {

        const {
            error
        } = await supabaseClient
            .from("friendships")
            .update({
                status: status,
                updated_at:
                    new Date().toISOString()
            })
            .eq(
                "id",
                friendshipId
            );


        if (error) {
            throw error;
        }


        return true;


    } catch (error) {

        console.error(
            "❌ Error actualizando amistad:",
            error
        );


        alert(
            "⚠️ No pudimos actualizar la solicitud.\n\n" +
            error.message
        );


        return false;

    }

}

// =========================================
// ELIMINAR AMIGO
// =========================================

async function deleteFriendship(
    friendshipId
) {

    try {

        const {
            error
        } = await supabaseClient
            .from("friendships")
            .delete()
            .eq(
                "id",
                friendshipId
            );

        if (error) {
            throw error;
        }

        console.log(
            "🗑️ Amigo eliminado correctamente."
        );

        return true;

    } catch (error) {

        console.error(
            "❌ Error eliminando amigo:",
            error
        );

        alert(
            "⚠️ No pudimos eliminar al amigo.\n\n" +
            error.message
        );

        return false;
    }
}


// =========================================
// ACEPTAR SOLICITUD DESDE BÚSQUEDA
// =========================================

async function acceptFriendRequest(
    requesterId
) {

    if (!currentUserId) {
        return false;
    }


    try {

        const {
            data,
            error
        } = await supabaseClient
            .from("friendships")
            .select("id")
            .eq(
                "requester_id",
                requesterId
            )
            .eq(
                "receiver_id",
                currentUserId
            )
            .eq(
                "status",
                "pending"
            )
            .maybeSingle();


        if (error) {
            throw error;
        }


        if (!data) {

            alert(
                "⚠️ La solicitud ya no está disponible."
            );

            return false;
        }


        const success =
            await updateFriendship(
                data.id,
                "accepted"
            );


        if (success) {

            await loadFriends();

            await searchUsers(
                friendSearchInput
                    ?.value
                    .trim()
                    .toLowerCase()
                    .replace(/^@/, "") || ""
            );

        }


        return success;


    } catch (error) {

        console.error(
            "❌ Error aceptando solicitud:",
            error
        );


        alert(
            "⚠️ No pudimos aceptar la solicitud.\n\n" +
            error.message
        );


        return false;

    }

}


// =========================================
// CREAR TARJETA DE AMIGO
// =========================================

function createFriendCard(
    person,
    friendship
) {

      
    const card =
    document.createElement("div");

card.className =
    "friend-result friend-home-card";


// =========================================
// ABRIR CHAT AL HACER CLIC EN LA TARJETA
// =========================================

card.style.cursor = "pointer";

card.addEventListener(
    "click",
    function () {

        openChat(person);

    }
);


const avatar =
    document.createElement("div");

    avatar.className =
    "friend-result-avatar";

    if (person.avatar_url) {

        const img =
            document.createElement("img");

        img.src = person.avatar_url;

        img.alt =
            "Foto de " +
            (person.display_name || "usuario");

        avatar.appendChild(img);

    } else {

        avatar.textContent =
            (
                person.display_name ||
                person.username ||
                "R"
            )
                .charAt(0)
                .toUpperCase();
    }

    const info =
        document.createElement("div");

    info.className =
        "friend-result-info";

    const name =
        document.createElement("p");

    name.className =
        "friend-result-name";

    name.textContent =
        person.display_name ||
        "ReViber";

    const username =
        document.createElement("p");

    username.className =
        "friend-result-username";

    username.textContent =
        "@" +
        (person.username || "usuario");

    const status =
    document.createElement("span");

status.className =
    "friend-status-dot status-" +
    (person.status || "online");

const statusMap = {
    online: "🟢",
    away: "🟡",
    busy: "🔴",
    offline: "⚫"
};

status.textContent =
    statusMap[person.status] ||
    "🟢";

status.title =
    person.status === "online"
        ? "Conectado"
        : person.status === "away"
            ? "Ausente"
            : person.status === "busy"
                ? "Ocupado"
                : "Desconectado";



    info.appendChild(name);
    info.appendChild(username);
    info.appendChild(status);

    if (person.personal_message) {

        const message =
            document.createElement("small");

        message.className =
            "friend-personal-message";

        message.textContent =
            "💭 " +
            person.personal_message;

        info.appendChild(message);
    }

   

 // MENÚ ⋮

const actions =
    document.createElement("div");

actions.className =
    "friend-card-actions";

const menuButton =
    document.createElement("button");

menuButton.type = "button";

menuButton.className =
    "friend-card-menu-button";

menuButton.textContent = "⋮";

menuButton.title = "Opciones";


// CONTENEDOR DEL MENÚ

const menu =
    document.createElement("div");

menu.className =
    "friend-card-menu";


// 👤 VER PERFIL

const profileButton =
    document.createElement("button");

profileButton.type = "button";

profileButton.className =
    "view-friend-profile-button";

profileButton.textContent =
    "👤 Ver perfil";

profileButton.addEventListener(
    "click",
    function(event) {

        event.stopPropagation();

        menu.classList.remove("active");

        openFriendProfile(person);
    }
);


// 🗑️ ELIMINAR AMIGO

const deleteButton =
    document.createElement("button");

deleteButton.type = "button";

deleteButton.className =
    "delete-friend-button";

deleteButton.textContent =
    "🗑️ Eliminar amigo";


// ABRIR / CERRAR MENÚ ⋮

menuButton.addEventListener(
    "click",
    function(event) {

        event.stopPropagation();

        menu.classList.toggle("active");
    }
);


// ELIMINAR AMIGO

deleteButton.addEventListener(
    "click",
    async function(event) {

        event.stopPropagation();

        const confirmDelete =
            confirm(
                `¿Quieres eliminar a @${person.username || "usuario"} de tus amigos? 💚`
            );

        if (!confirmDelete) {
            return;
        }

        deleteButton.disabled = true;

        deleteButton.textContent =
            "Eliminando...";

        const success =
            await deleteFriendship(
                friendship.id
            );

        if (success) {

            await loadFriends();

        } else {

            deleteButton.disabled = false;

            deleteButton.textContent =
                "🗑️ Eliminar amigo";
        }
    }
);


// AGREGAR OPCIONES AL MENÚ

menu.appendChild(profileButton);

menu.appendChild(deleteButton);


// AGREGAR MENÚ A LA TARJETA

actions.appendChild(menuButton);

actions.appendChild(menu);


// AGREGAR TODO A LA TARJETA

card.appendChild(avatar);

card.appendChild(info);


card.appendChild(actions);

return card;
}

function openFriendProfile(person) {

    const overlay =
        document.createElement("div");

    overlay.className =
        "friend-profile-overlay";

    const modal =
        document.createElement("div");

    modal.className =
        "friend-profile-modal";


    // CERRAR

    const closeButton =
        document.createElement("button");

    closeButton.type = "button";

    closeButton.className =
        "friend-profile-close";

    closeButton.textContent = "✕";

    closeButton.addEventListener(
        "click",
        function() {
            overlay.remove();
        }
    );


    // AVATAR

    const avatarContainer =
        document.createElement("div");

    avatarContainer.className =
        "friend-profile-avatar";


    if (person.avatar_url) {

        const image =
            document.createElement("img");

        image.src =
            person.avatar_url;

        image.alt =
            "Foto de perfil";

        avatarContainer.appendChild(image);

    } else {

        avatarContainer.textContent =
            (person.display_name ||
             person.username ||
             "U")
             .charAt(0)
             .toUpperCase();
    }


    // NOMBRE

    const name =
        document.createElement("h2");

    name.textContent =
        person.display_name ||
        person.username ||
        "Usuario";


    // USUARIO

    const username =
        document.createElement("p");

    username.className =
        "friend-profile-username";

    username.textContent =
        "@" +
        (person.username || "usuario");


    // ESTADO

    const status =
        document.createElement("div");

    status.className =
        "friend-profile-status";


    const statusDot =
        document.createElement("span");

    statusDot.className =
        "friend-status-dot status-" +
        (person.status || "offline");


    const statusText = {
        online: "Conectado",
        away: "Ausente",
        busy: "Ocupado",
        offline: "Desconectado"
    };


    const statusLabel =
        document.createElement("span");

    statusLabel.textContent =
        statusText[person.status] ||
        "Desconectado";


    status.appendChild(statusDot);

    status.appendChild(statusLabel);


    // MENSAJE PERSONAL

    const message =
        document.createElement("p");

    message.className =
        "friend-profile-message";

    message.textContent =
        person.personal_message ||
        "Sin mensaje personal 💚";


    // NOW PLAYING

    const nowPlaying =
        document.createElement("div");

    nowPlaying.className =
        "friend-profile-now-playing";

    nowPlaying.textContent =
        "🎵 " +
        (
            person.now_playing ||
            "Nada reproduciendo"
        );


    // ARMAR MODAL

    modal.appendChild(closeButton);

    modal.appendChild(avatarContainer);

    modal.appendChild(name);

    modal.appendChild(username);

    modal.appendChild(status);

    modal.appendChild(message);

    modal.appendChild(nowPlaying);


    overlay.appendChild(modal);

    document.body.appendChild(overlay);


    // CERRAR AL HACER CLICK FUERA

    overlay.addEventListener(
        "click",
        function(event) {

            if (event.target === overlay) {

                overlay.remove();
            }
        }
    );
}


// =========================================
// ABRIR CHAT
// =========================================

function openChat(person) {

    // Si ya existe un chat abierto, lo cerramos
    const existingChat =
        document.getElementById("revibeChat");

    if (existingChat) {
        existingChat.remove();
    }


    // =========================================
    // CONTENEDOR PRINCIPAL
    // =========================================

    const chat =
        document.createElement("div");

    chat.id =
        "revibeChat";

        // =========================================
// ⚡ CANAL REALTIME DEL CHAT
// =========================================


    chat.className =
        "revibe-chat";


    // =========================================
    // HEADER
    // =========================================

    const header =
        document.createElement("div");

    header.className =
        "revibe-chat-header";


    // BOTÓN VOLVER

    const backButton =
        document.createElement("button");

    backButton.type =
        "button";

    backButton.className =
        "revibe-chat-back";

    backButton.textContent =
        "←";

    backButton.title =
        "Volver";


  backButton.addEventListener(
    "click",
    function () {

        if (chatChannel) {
            supabaseClient.removeChannel(chatChannel);
            chatChannel = null;
        }

        chat.remove();
    }
);


    // AVATAR

    const avatar =
        document.createElement("div");

    avatar.className =
        "revibe-chat-avatar";


    if (person.avatar_url) {

        const image =
            document.createElement("img");

        image.src =
            person.avatar_url;

        image.alt =
            "Foto de perfil";

        avatar.appendChild(image);

    } else {

        avatar.textContent =
            (
                person.display_name ||
                person.username ||
                "U"
            )
            .charAt(0)
            .toUpperCase();
    }


    // INFORMACIÓN

    const info =
        document.createElement("div");

    info.className =
        "revibe-chat-info";


    const name =
        document.createElement("h2");

    name.textContent =
        person.display_name ||
        person.username ||
        "Usuario";


    const status =
        document.createElement("span");

    status.className =
        "revibe-chat-status";


    const statusMap = {
        online: "🟢 Conectado",
        away: "🟡 Ausente",
        busy: "🔴 Ocupado",
        offline: "⚫ Desconectado"
    };


    status.textContent =
        statusMap[person.status] ||
        "🟢 Conectado";


    info.appendChild(name);

    info.appendChild(status);

    if (person.now_playing) {

    const nowPlaying =
        document.createElement("span");

    nowPlaying.className =
        "revibe-chat-now-playing";

    nowPlaying.textContent =
        "🎵 " +
        person.now_playing;

    info.appendChild(nowPlaying);
}


    // BOTÓN CERRAR

    const closeButton =
        document.createElement("button");

    closeButton.type =
        "button";

    closeButton.className =
        "revibe-chat-close";

    closeButton.textContent =
        "✕";

    closeButton.title =
        "Cerrar";


    closeButton.addEventListener(
    "click",
    function () {

        if (chatChannel) {
            supabaseClient.removeChannel(chatChannel);
            chatChannel = null;
        }

        chat.remove();
    }
);


    header.appendChild(backButton);

    header.appendChild(avatar);

    header.appendChild(info);

    header.appendChild(closeButton);


    // =========================================
    // ÁREA DE MENSAJES
    // =========================================

    const messages =
        document.createElement("div");

    messages.className =
        "revibe-chat-messages";


    const empty =
        document.createElement("div");

    empty.className =
        "revibe-chat-empty";


    empty.innerHTML = `
        <div class="revibe-chat-empty-icon">💚</div>
        <h3>¡Hola!</h3>
        <p>
            Empieza una conversación con
            <strong>
                ${escapeHtml(
                    person.display_name ||
                    person.username ||
                    "tu amigo"
                )}
            </strong>.
        </p>
    `;


    messages.appendChild(empty);

    // =========================================
// CARGAR MENSAJES
// =========================================

async function loadChatMessages() {

    try {

        const {
            data,
            error
        } = await supabaseClient
            .from("messages")
            .select("*")
            .or(
                `and(sender_id.eq.${currentUserId},receiver_id.eq.${person.id}),and(sender_id.eq.${person.id},receiver_id.eq.${currentUserId})`
            )
            .order(
                "created_at",
                {
                    ascending: true
                }
            );

        if (error) {
            throw error;
        }


        // Limpiar mensajes anteriores

        messages.innerHTML = "";


        // Si no hay mensajes

        if (!data || data.length === 0) {

            messages.appendChild(empty);

            return;
        }


        // Crear cada mensaje

        data.forEach(function(message) {

            const bubble =
                document.createElement("div");

            bubble.className =
                message.sender_id === currentUserId
                    ? "revibe-message sent"
                    : "revibe-message received";

                    bubble.dataset.messageId =
    message.id;


            const text =
                document.createElement("div");

            text.className =
                "revibe-message-text";

            text.textContent =
                message.content;


            const time =
                document.createElement("small");

            time.className =
                "revibe-message-time";

            time.textContent =
                new Date(
                    message.created_at
                ).toLocaleTimeString(
                    [],
                    {
                        hour: "2-digit",
                        minute: "2-digit"
                    }
                );


            bubble.appendChild(text);

            bubble.appendChild(time);

            messages.appendChild(bubble);

        });


        // Ir al último mensaje

        messages.scrollTop =
            messages.scrollHeight;


    } catch (error) {

        console.error(
            "❌ Error cargando mensajes:",
            error
        );

    }
}
loadChatMessages();

// =========================================
// ⚡ RECIBIR MENSAJES EN TIEMPO REAL
// =========================================

chatChannel = supabaseClient
    .channel(
        "chat-" +
        currentUserId +
        "-" +
        person.id
    )
    .on(
        "postgres_changes",
        {
            event: "INSERT",
            schema: "public",
            table: "messages",
            filter:
                "receiver_id=eq." +
                currentUserId
        },
        function (payload) {

            const message = payload.new;

            // Solo mostrar mensajes de la persona
            // con la que estamos conversando
            if (message.sender_id !== person.id) {
                return;
            }

            // Evitar duplicados
            const existing =
                messages.querySelector(
                    '[data-message-id="' +
                    message.id +
                    '"]'
                );

            if (existing) {
                return;
            }

            // Quitar mensaje de "no hay mensajes"
            if (empty && empty.parentNode) {
                empty.remove();
            }

            const bubble =
                document.createElement("div");

            bubble.className =
                "revibe-message received";

            bubble.dataset.messageId =
                message.id;

            const text =
                document.createElement("div");

            text.className =
                "revibe-message-text";

            text.textContent =
                message.content;

            const time =
                document.createElement("small");

            time.className =
                "revibe-message-time";

            time.textContent =
                new Date(
                    message.created_at
                ).toLocaleTimeString(
                    [],
                    {
                        hour: "2-digit",
                        minute: "2-digit"
                    }
                );

            bubble.appendChild(text);
            bubble.appendChild(time);

            messages.appendChild(bubble);

            messages.scrollTop =
                messages.scrollHeight;

            console.log(
                "💬 Nuevo mensaje recibido:",
                message.content
            );
        }
    )
    .subscribe(function (status) {

        console.log(
            "⚡ Realtime chat:",
            status
        );

    });

    // =========================================
    // ÁREA DE ESCRIBIR
    // =========================================

    const composer =
        document.createElement("div");

    composer.className =
        "revibe-chat-composer";


    const input =
        document.createElement("input");

    input.type =
        "text";

    input.className =
        "revibe-chat-input";

    input.placeholder =
        "Escribe un mensaje...";

    input.maxLength =
        1000;

    input.autocomplete =
        "off";


    const sendButton =
        document.createElement("button");

    sendButton.type =
        "button";

    sendButton.className =
        "revibe-chat-send";

    sendButton.textContent =
        "➤";

    sendButton.title =
        "Enviar";

       // =========================================
// ENVIAR MENSAJE
// =========================================

async function sendChatMessage() {

    const content =
        input.value.trim();

    if (!content) {
        return;
    }

    if (!currentUserId) {

        alert(
            "⚠️ Tu sesión no está activa."
        );

        return;
    }


    // =========================================
    // CREAR BURBUJA INMEDIATAMENTE
    // =========================================

    const bubble =
        document.createElement("div");

    bubble.className =
        "revibe-message sent";


    const text =
        document.createElement("div");

    text.className =
        "revibe-message-text";

    text.textContent =
        content;


    const time =
        document.createElement("small");

    time.className =
        "revibe-message-time";

    time.textContent =
        new Date().toLocaleTimeString(
            [],
            {
                hour: "2-digit",
                minute: "2-digit"
            }
        );


    bubble.appendChild(text);

    bubble.appendChild(time);

    messages.appendChild(bubble);


    // Quitar mensaje de bienvenida si todavía está visible

    if (empty && empty.parentNode) {
        empty.remove();
    }


    // Limpiar input inmediatamente

    input.value = "";

    input.focus();


    // Bajar automáticamente al último mensaje

    messages.scrollTop =
        messages.scrollHeight;


    // =========================================
    // GUARDAR EN SUPABASE
    // =========================================

    try {

        const {
            error
        } = await supabaseClient
            .from("messages")
            .insert({
                sender_id:
                    currentUserId,

                receiver_id:
                    person.id,

                content:
                    content
            });


        if (error) {
            throw error;
        }


        console.log(
            "💚 Mensaje enviado correctamente."
        );


    } catch (error) {

        console.error(
            "❌ Error enviando mensaje:",
            error
        );


        // Quitar la burbuja si no pudo guardarse

        bubble.remove();


        // Recuperar el texto

        input.value =
            content;

        input.focus();


        alert(
            "⚠️ No pudimos enviar el mensaje.\n\n" +
            error.message
        );
    }
}


// =========================================
// BOTÓN ENVIAR
// =========================================

sendButton.addEventListener(
    "click",
    sendChatMessage
);


// =========================================
// ENTER PARA ENVIAR
// =========================================

input.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Enter" &&
            !event.shiftKey
        ) {

            event.preventDefault();

            sendChatMessage();
        }
    }
);



    composer.appendChild(input);

    composer.appendChild(sendButton);


    // =========================================
    // ARMAR CHAT
    // =========================================

    chat.appendChild(header);

    chat.appendChild(messages);

    chat.appendChild(composer);

    document.body.appendChild(chat);


    // =========================================
    // ENFOCAR INPUT
    // =========================================

    setTimeout(
        function () {

            input.focus();

        },
        100
    );
}
function openFriendProfile(person) {

    const overlay =
        document.createElement("div");

    overlay.className =
        "friend-profile-overlay";

    const modal =
        document.createElement("div");

    modal.className =
        "friend-profile-modal";


    // CERRAR

    const closeButton =
        document.createElement("button");

    closeButton.type = "button";

    closeButton.className =
        "friend-profile-close";

    closeButton.textContent = "✕";

    closeButton.addEventListener(
        "click",
        function() {
            overlay.remove();
        }
    );


    // AVATAR

    const avatarContainer =
        document.createElement("div");

    avatarContainer.className =
        "friend-profile-avatar";


    if (person.avatar_url) {

        const image =
            document.createElement("img");

        image.src =
            person.avatar_url;

        image.alt =
            "Foto de perfil";

        avatarContainer.appendChild(image);

    } else {

        avatarContainer.textContent =
            (person.display_name ||
             person.username ||
             "U")
             .charAt(0)
             .toUpperCase();
    }


    // NOMBRE

    const name =
        document.createElement("h2");

    name.textContent =
        person.display_name ||
        person.username ||
        "Usuario";


    // USUARIO

    const username =
        document.createElement("p");

    username.className =
        "friend-profile-username";

    username.textContent =
        "@" +
        (person.username || "usuario");


    // ESTADO

    const status =
        document.createElement("div");

    status.className =
        "friend-profile-status";


    const statusDot =
        document.createElement("span");

    statusDot.className =
        "friend-status-dot status-" +
        (person.status || "offline");


    const statusText = {
        online: "Conectado",
        away: "Ausente",
        busy: "Ocupado",
        offline: "Desconectado"
    };


    const statusLabel =
        document.createElement("span");

    statusLabel.textContent =
        statusText[person.status] ||
        "Desconectado";


    status.appendChild(statusDot);

    status.appendChild(statusLabel);


    // MENSAJE PERSONAL

    const message =
        document.createElement("p");

    message.className =
        "friend-profile-message";

    message.textContent =
        person.personal_message ||
        "Sin mensaje personal 💚";


    // NOW PLAYING

    const nowPlaying =
        document.createElement("div");

    nowPlaying.className =
        "friend-profile-now-playing";

    nowPlaying.textContent =
        "🎵 " +
        (
            person.now_playing ||
            "Nada reproduciendo"
        );


    // ARMAR MODAL

    modal.appendChild(closeButton);

    modal.appendChild(avatarContainer);

    modal.appendChild(name);

    modal.appendChild(username);

    modal.appendChild(status);

    modal.appendChild(message);

    modal.appendChild(nowPlaying);


    overlay.appendChild(modal);

    document.body.appendChild(overlay);


    // CERRAR AL HACER CLICK FUERA

    overlay.addEventListener(
        "click",
        function(event) {

            if (event.target === overlay) {

                overlay.remove();
            }
        }
    );
}

// =========================================
// AVATAR
// =========================================

if (
    avatarEdit &&
    avatarInput
) {

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
                avatarInput.files?.[0];


            if (!file) {
                return;
            }


            if (
                ![
                    "image/jpeg",
                    "image/png",
                    "image/webp"
                ].includes(
                    file.type
                )
            ) {

                alert(
                    "⚠️ Solo puedes subir JPG, PNG o WEBP."
                );


                avatarInput.value =
                    "";


                return;

            }


            if (
                file.size >
                5 * 1024 * 1024
            ) {

                alert(
                    "⚠️ La foto no puede superar los 5 MB."
                );


                avatarInput.value =
                    "";


                return;

            }


            avatarEdit.disabled =
                true;


            avatarEdit.textContent =
                "…";


            try {

                const {
                    data: sessionData,
                    error: sessionError
                } =
                    await supabaseClient
                        .auth
                        .getSession();


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


                const extension =
                    file.name
                        .split(".")
                        .pop()
                        .toLowerCase();


                const filePath =
                    `${user.id}/avatar-${Date.now()}.${extension}`;


                const {
                    error: uploadError
                } =
                    await supabaseClient
                        .storage
                        .from("avatars")
                        .upload(
                            filePath,
                            file,
                            {
                                cacheControl:
                                    "3600",
                                upsert:
                                    false,
                                contentType:
                                    file.type
                            }
                        );


                if (uploadError) {
                    throw uploadError;
                }


                const {
                    data: publicUrlData
                } =
                    supabaseClient
                        .storage
                        .from("avatars")
                        .getPublicUrl(
                            filePath
                        );


                const avatarUrl =
                    publicUrlData.publicUrl;


                const {
                    error: profileError
                } =
                    await supabaseClient
                        .from("profiles")
                        .update({
                            avatar_url:
                                avatarUrl,

                            updated_at:
                                new Date()
                                    .toISOString()
                        })
                        .eq(
                            "id",
                            user.id
                        );


                if (profileError) {
                    throw profileError;
                }


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


                if (currentProfile) {

                    currentProfile.avatar_url =
                        avatarUrl;


                    updateHomeAvatar(
                        avatarUrl,
                        currentProfile.display_name
                    );

                }


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


                avatarInput.value =
                    "";

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
            } =
                await supabaseClient
                    .auth
                    .getSession();


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
                usernameInput?.value
                    .trim()
                    .toLowerCase() ||
                "";


            const displayName =
                displayNameInput?.value
                    .trim() ||
                "";


            const personalMessage =
                personalMessageInput?.value
                    .trim() ||
                "";


            const status =
                statusInput?.value ||
                "online";


            const nowPlaying =
                nowPlayingInput?.value
                    .trim() ||
                "";


            if (
                username &&
                !/^[a-z0-9_]{3,20}$/.test(
                    username
                )
            ) {

                if (usernameHelp) {

                    usernameHelp.textContent =
                        "⚠️ Usa entre 3 y 20 caracteres: letras, números y _";


                    usernameHelp.style.color =
                        "#d9534f";

                }


                usernameInput?.focus();


                return;

            }


            if (usernameHelp) {

                usernameHelp.textContent =
                    "3–20 caracteres: letras, números y _";


                usernameHelp.style.color =
                    "";

            }


            const saveButton =
                profileForm.querySelector(
                    ".primary-button"
                );


            if (saveButton) {

                saveButton.disabled =
                    true;


                saveButton.textContent =
                    "GUARDANDO...";

            }


            try {

                const {
                    error
                } =
                    await supabaseClient
                        .from("profiles")
                        .update({

                            username:
                                username ||
                                null,

                            display_name:
                                displayName ||
                                null,

                            personal_message:
                                personalMessage ||
                                null,

                            status,

                            now_playing:
                                nowPlaying ||
                                null,

                            updated_at:
                                new Date()
                                    .toISOString()

                        })
                        .eq(
                            "id",
                            user.id
                        );


                if (error) {
                    throw error;
                }


                currentProfile = {

                    ...(currentProfile ||
                        {}),

                    id:
                        user.id,

                    username:
                        username ||
                        null,

                    display_name:
                        displayName ||
                        null,

                    personal_message:
                        personalMessage ||
                        null,

                    status,

                    now_playing:
                        nowPlaying ||
                        null,

                    avatar_url:
                        currentProfile?.avatar_url ||
                        null

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
                    error.code ===
                    "23505"
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

                if (saveButton) {

                    saveButton.disabled =
                        false;


                    saveButton.textContent =
                        "💚 GUARDAR PERFIL";

                }

            }

        }
    );

}


// =========================================
// OAUTH
// =========================================

if (googleButton) {

    googleButton.addEventListener(
        "click",
        async function () {

            const {
                error
            } =
                await supabaseClient
                    .auth
                    .signInWithOAuth({
                        provider:
                            "google"
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


if (facebookButton) {

    facebookButton.addEventListener(
        "click",
        async function () {

            const {
                error
            } =
                await supabaseClient
                    .auth
                    .signInWithOAuth({
                        provider:
                            "facebook"
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

function getAuthErrorMessage(
    error
) {

    const message =
        error?.message ||
        "";


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


    if (
        message.includes(
            "Email not confirmed"
        )
    ) {

        return "Primero debes confirmar tu correo electrónico.";

    }


    return (
        message ||
        "Ocurrió un error. Inténtalo nuevamente."
    );

}


// =========================================
// ESCUCHAR CAMBIOS DE SESIÓN
// =========================================

supabaseClient.auth.onAuthStateChange(
    function (
        event,
        session
    ) {

        console.log(
            "💚 ReVibe Auth:",
            event
        );


        if (
            event ===
            "SIGNED_OUT"
        ) {

            currentUserId =
                null;


            currentProfile =
                null;


            showLogin();

        }

    }
);


// =========================================
// ESCAPE HTML
// =========================================

function escapeHtml(
    value
) {

    return String(
        value ?? ""
    )
        .replace(
            /&/g,
            "&amp;"
        )
        .replace(
            /</g,
            "&lt;"
        )
        .replace(
            />/g,
            "&gt;"
        )
        .replace(
            /"/g,
            "&quot;"
        )
        .replace(
            /'/g,
            "&#039;"
        );

}


// =========================================
// INICIAR REVIBE
// =========================================

async function initializeReVibe() {

    console.log(
        "🚀 Iniciando ReVibe..."
    );


    const {
        data,
        error
    } =
        await supabaseClient
            .auth
            .getSession();


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




initializeReVibe();