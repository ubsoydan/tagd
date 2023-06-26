import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "@/src/network/auth-api";
import { useForm } from "react-hook-form";
import * as z from "zod";
import cn from "@/src/utils/cn";
import { Button } from "@/src/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import { toast } from "@/src/utils/use-toast";
import { Loader2 as SpinnerLogo } from "lucide-react";

type AuthFormProps = React.HTMLAttributes<HTMLDivElement>;

const authSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

function LoginAuthForm({ className, ...props }: AuthFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const form = useForm<z.infer<typeof authSchema>>({
        resolver: zodResolver(authSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    async function onSubmit(data: z.infer<typeof authSchema>) {
        setIsLoading(true);
        const signInResult = await signIn({
            email: data.email.toLowerCase(),
            password: data.password,
        });

        setIsLoading(false);

        if (!signInResult) {
            return toast({
                title: "Something went wrong.",
                description: "Your sign in request failed. Please try again.",
                variant: "destructive",
            });
        }

        return toast({
            title: "Check your email",
            description:
                "We sent you a login link. Be sure to check your spam too.",
        });
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <div className="grid gap-2">
                        <div className="grid gap-1">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem>
                                        {/* <FormLabel>Email</FormLabel> */}
                                        <FormControl>
                                            <Input
                                                placeholder="email"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="grid gap-1">
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        {/* <FormLabel>Password</FormLabel> */}
                                        <FormControl>
                                            <Input
                                                placeholder="password"
                                                type="password"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <Button disabled={isLoading} type="submit">
                            {isLoading && (
                                <SpinnerLogo className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Sign In
                        </Button>
                    </div>
                </form>
            </Form>
            <div className="relative">
                <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-background px-2 text-muted-foreground"></span>
                </div>
            </div>
        </div>
    );
}

export default LoginAuthForm;
