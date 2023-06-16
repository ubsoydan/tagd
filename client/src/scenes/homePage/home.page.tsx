import { NavBar } from "../navbar/navbar";

function HomePage() {
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
        </div>
    );
}

export default HomePage;
