import Link from "next/link";
import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-title">
          <Link href="/">Home</Link>
        </div>
        <div className="nav-links">
          <Link href="/posts" className="nav-item">
            Posts
          </Link>
          <Link href="/profile" className="nav-item">
            Profile
          </Link>
        </div>
        <div>
          <SignedOut>
            <button className="sign-in-button">Sign In</button>
          </SignedOut>
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </div>
    </nav>
  );
}
