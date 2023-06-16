// import { NavBar } from "@/src/scenes/navbar/navbar";
import { buttonVariants } from "@/src/components/ui/button";
import cn from "@/src/utils/cn";
import { Link } from "react-router-dom";

function NavBarWrapper({ children }: any) {
    return (
        <div className="flex flex-col">
            <header className="container z-40 bg-background">
                <div className="flex items-center justify-between pt-2 pb-6">
                    {children}
                    {/* LOGIN BUTTON */}
                    <nav>
                        <Link
                            to="/login"
                            className={cn(
                                buttonVariants({
                                    variant: "secondary",
                                    size: "sm",
                                }),
                                "px-4"
                            )}
                        >
                            Login
                        </Link>
                    </nav>
                </div>
            </header>
        </div>
    );
}

export default NavBarWrapper;
