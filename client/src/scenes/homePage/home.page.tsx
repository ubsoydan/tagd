import { useEffect, useState } from "react";
import { NavBar } from "../navbar/navbar";
import * as ListsApi from "@/src/network/lists-api";
import { ListCard } from "@/src/components/list-card";

function HomePage() {
    const [allLists, setAllLists] = useState([]);

    useEffect(() => {
        async function loadAllLists() {
            try {
                const lists = await ListsApi.fetchAllLists();
                setAllLists(lists);
            } catch (error) {
                console.error(error);
                alert(error);
            }
        }
        loadAllLists();
    }, []);

    const items = [
        {
            title: "baslik",
            href: "dsaga",
        },
    ];

    return (
        <div>
            <NavBar items={items} />
            <div className="text-orange-950">homepage</div>
            {allLists.map((list) => (
                <ListCard key={list.listId} testew={list.listDescription} />
            ))}
        </div>
    );
}

export default HomePage;
