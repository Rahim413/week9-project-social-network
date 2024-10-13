import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@radix-ui/react-dropdown-menu";
import Link from 'next/link'; 

export default function UserMenu() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="user-button">User Menu</button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="radix-dropdown-content">
                <DropdownMenuItem className="radix-dropdown-item">
                    <Link href="/posts">Posts</Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="radix-dropdown-item">
                    <Link href="/profiles">Profile</Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}
