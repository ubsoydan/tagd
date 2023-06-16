import "@/src/styles/global.css";
import cn from "@/src/utils/cn";

interface RootLayoutProps {
    children: React.ReactNode;
    nav: React.ReactNode;
}

export default function RootLayout({ children, nav }: RootLayoutProps) {
    return (
        <div className={cn("min-h-screen bg-background font-sans antialiased")}>
            <div className="flex min-h-screen flex-col">
                <header className="container z-40 bg-background">
                    <div className="flex h-20 items-center justify-between py-6">
                        {nav}
                    </div>
                </header>
                <main className="flex-1">{children}</main>
            </div>
        </div>
    );
}
