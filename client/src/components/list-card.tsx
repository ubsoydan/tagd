import { ChevronDown, Circle, Plus, Star } from "lucide-react";

import { Button } from "@/src/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/src/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/src/components/ui/dropdown-menu";
import { Separator } from "@/src/components/ui/separator";

interface ListCardProps {
    testew: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ListCard({ testew }: ListCardProps) {
    return (
        <Card>
            <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
                <div className="space-y-1">
                    <CardTitle>shadcn/ui</CardTitle>
                    <CardDescription>{testew}</CardDescription>
                </div>
                <div className="flex items-center space-x-1 rounded-md bg-secondary text-secondary-foreground">
                    <Button variant="secondary" className="px-3">
                        <Star className="mr-2 h-4 w-4" />
                        Star
                    </Button>
                    <Separator orientation="vertical" className="h-[20px]" />
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" className="px-2">
                                <ChevronDown className="h-4 w-4 text-secondary-foreground" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent
                            align="end"
                            alignOffset={-5}
                            className="w-[200px]"
                            forceMount
                        >
                            <DropdownMenuLabel>
                                Suggested Lists
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuCheckboxItem checked>
                                Future Ideas
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem>
                                My Stack
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuCheckboxItem>
                                Inspiration
                            </DropdownMenuCheckboxItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Plus className="mr-2 h-4 w-4" /> Create List
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </CardHeader>
            <CardContent>
                <div className="flex space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center">
                        <Circle className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
                        TypeScipt
                    </div>
                    <div className="flex items-center">
                        <Star className="mr-1 h-3 w-3" />
                        10k
                    </div>
                    <div>Updated April 2023</div>
                </div>
            </CardContent>
        </Card>
    );
}
