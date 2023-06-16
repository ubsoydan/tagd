import * as React from "react";
import { Link } from "react-router-dom";
import cn from "@/src/utils/cn";
import { useLockBody } from "@/src/hooks/use-lock-body";
import { Command as IconLogo, X as IconClose } from "lucide-react";
import NavBarWrapper from "./navbar-wrapper";

const siteConfig = {
    name: "Taxonomy",
    description:
        "An open source application built using the new router, server components and everything new in Next.js 13.",
    url: "https://tx.shadcn.com",
    ogImage: "https://tx.shadcn.com/og.jpg",
    links: {
        twitter: "https://twitter.com/shadcn",
        github: "https://github.com/shadcn/taxonomy",
    },
};

type NavItem = {
    title: string;
    href: string;
    disabled?: boolean;
};

interface MainNavProps {
    items?: NavItem[];
    children?: React.ReactNode;
}

export function NavBar({ items, children }: MainNavProps) {
    const [showMobileMenu, setShowMobileMenu] = React.useState<boolean>(false);

    return (
        <NavBarWrapper>
            <div className="flex gap-6 md:gap-10">
                <Link to="/" className="hidden items-center space-x-2 md:flex">
                    <IconLogo />
                    <span className="hidden font-bold sm:inline-block">
                        {siteConfig.name}
                    </span>
                </Link>
                {items?.length ? (
                    <nav className="hidden gap-6 md:flex">
                        {items?.map((item, index) => (
                            <Link
                                key={index}
                                to={item.disabled ? "#" : item.href}
                                className={cn(
                                    "flex items-center text-lg font-medium transition-colors hover:text-foreground/80 sm:text-sm",
                                    "text-foreground",
                                    item.disabled &&
                                        "cursor-not-allowed opacity-80"
                                )}
                            >
                                {item.title}
                            </Link>
                        ))}
                    </nav>
                ) : null}
                <button
                    className="flex items-center space-x-2 md:hidden"
                    onClick={() => setShowMobileMenu(!showMobileMenu)}
                >
                    {showMobileMenu ? <IconClose /> : <IconLogo />}
                    <span className="font-bold">Menu</span>
                </button>
                {showMobileMenu && items && (
                    <MobileNav items={items}>{children}</MobileNav>
                )}
            </div>
        </NavBarWrapper>
    );
}

interface MobileNavProps {
    items: NavItem[];
    children?: React.ReactNode;
}

export function MobileNav({ items, children }: MobileNavProps) {
    useLockBody();

    return (
        <div
            className={cn(
                "fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden"
            )}
        >
            <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
                <Link to="/" className="flex items-center space-x-2">
                    <IconLogo />
                    <span className="font-bold">{siteConfig.name}</span>
                </Link>
                <nav className="grid grid-flow-row auto-rows-max text-sm">
                    {items.map((item, index) => (
                        <Link
                            key={index}
                            to={item.disabled ? "#" : item.href}
                            className={cn(
                                "flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline",
                                item.disabled && "cursor-not-allowed opacity-60"
                            )}
                        >
                            {item.title}
                        </Link>
                    ))}
                </nav>
                {children}
            </div>
        </div>
    );
}
