import { useEffect, useState } from "react";
import { NavBar } from "../navbar/navbar";
import * as ListsApi from "@/src/network/lists-api";
import { ListCard } from "@/src/components/list-card";
// REDUX IMPORTS
import { useSelector } from "react-redux";
import { RootState } from "../../main";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function HomePage() {
    const [allLists, setAllLists] = useState([]);
    const loggedInUser = useSelector((state: RootState) => state.auth);

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
            {/* <button onClick={fetchLoggedInUser}>TIKLA</button> */}
            {loggedInUser ? (
                <h3>{loggedInUser.username}</h3>
            ) : (
                <h3>NOT FOJUND</h3>
            )}

            {allLists.map((list) => (
                <ListCard key={list.listId} testew={list.listDescription} />
            ))}
        </div>
    );
}

export default HomePage;
