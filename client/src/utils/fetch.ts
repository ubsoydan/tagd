// Normal web fetch api doesn't help with returning and grabbing any error.
const BASE_URL = "http://localhost:5000";

async function fetchWithError(input: RequestInfo, init?: RequestInit) {
    const url = `${BASE_URL}${input}`;
    const res = await fetch(url, init);
    if (res.ok) {
        return res;
    } else {
        // REF. error middleware (last block) in server app.ts
        const errorBody = await res.json();
        const errorMessage = errorBody.error;
        throw Error(errorMessage);
    }
}

export default fetchWithError;
