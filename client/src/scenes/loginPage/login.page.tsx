import { Link } from "react-router-dom";
import cn from "@/src/utils/cn";
import { buttonVariants } from "@/src/components/ui/button";
import { Command as IconLogo, ChevronLeft as IconLeft } from "lucide-react";
import RegisterAuthForm from "@/src/scenes/loginPage/components/login-form";

export default function LoginPage() {
    return (
        <div className="container flex h-screen w-screen flex-col items-center justify-center">
            <Link
                to="/"
                className={cn(
                    buttonVariants({ variant: "ghost" }),
                    "absolute left-4 top-4 md:left-8 md:top-8"
                )}
            >
                <>
                    <IconLeft className="mr-2 h-4 w-4" />
                    Back
                </>
            </Link>
            <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                <div className="flex flex-col space-y-2 text-center">
                    <IconLogo className="mx-auto h-6 w-6" />
                    <h1 className="text-2xl font-semibold tracking-tight">
                        Welcome back
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Enter your email to sign in to your account
                    </p>
                </div>
                <RegisterAuthForm />
                <p className="px-8 text-center text-sm text-muted-foreground">
                    <Link
                        to="/register"
                        className="hover:text-brand underline underline-offset-4"
                    >
                        Don&apos;t have an account? Sign Up
                    </Link>
                </p>
            </div>
        </div>
    );
}
