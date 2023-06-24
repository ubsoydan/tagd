import fetchWithError from "@/src/utils/fetch";

export async function fetchAllLists() {
    const res = await fetchWithError("/api/v1/lists", {
        method: "GET",
    });
    // const res = await fetch("/api/v1/lists", { method: "GET" });
    return res.json();
}
