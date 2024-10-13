import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import "./globals.css"

export default function HomePage() {
  return (
    <div className="homepage"> 
      <h1>Welcome to Week09 Project</h1>

      <SignedOut>
        <p>Please sign in to manage your posts and profile.</p>
      </SignedOut>

      <SignedIn>
        <p>You logged in successfully.<br></br> Go to the user menu to create posts and edit your profile.</p>
      </SignedIn>
    </div>
  );
}
