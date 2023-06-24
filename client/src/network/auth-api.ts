import fetchWithError from "@/src/utils/fetch";

/**
 * SIGN UP
 */
export interface SignUpCredentials {
    username: string;
    email: string;
    password: string;
}

export async function signUp(credentials: SignUpCredentials) {
    const res = await fetchWithError("/api/v1/auth/signup", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
    });
    return res.json();
}

/**
 * SIGN IN
 */
export interface SignInCredentials {
    email: string;
    password: string;
}

export async function signIn(credentials: SignInCredentials) {
    const res = await fetchWithError("/api/v1/auth/login", {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
    });
    return res.json();
}

/**
 * LOG OUT
 */
export async function logOut() {
    await fetchWithError("/api/v1/auth/logout", { method: "POST" });
}

/**
 * GET LOGGED IN USER
 */

export async function getCurrentUser() {
    const res = await fetchWithError("/api/v1/auth", { method: "GET" });
    return res.json();
}
