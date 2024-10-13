import { ClerkProvider, SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import "./globals.css";
import Link from 'next/link';
import UserMenu from "@/components/UserMenu";
import Image from 'next/image'; 

export default function RootLayout({ children }) {
  return (
    <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}>
      <html lang="en">
        <body>
          <header className="navbar">
            <div className="nav-container">
              <Link href="/" className="logo">
                <Image 
                  src="/week09-logo.png" 
                  alt="App Logo" 
                  width={170}  
                  height={140} 
                />
              </Link>
              <nav className="nav-links">
                <Link href="/" className="nav-item">Home</Link>
                <SignedOut>
                  <SignInButton className="nav-item">Login</SignInButton>
                </SignedOut>
                <SignedIn>
                  <UserMenu /> 
                  <UserButton className="nav-item" />
                </SignedIn>
              </nav>
            </div>
          </header>
          <main>{children}</main>
        </body>
      </html>
    </ClerkProvider>
  );
}
