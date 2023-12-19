// import Link from "next/link";
import NavBar from "../components/NavBar";
import { exo2, orbitron } from "./fonts";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${exo2.variable} ${orbitron.variable}`}>
      <body className="bg-orange-50 flex flex-col px-4 py-2 min-h-screen">
        {" "}
        <NavBar />
        {/* <nav className="flex gap-2">
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/reviews">Reviews</Link>
            </li>
            <li>
              <Link href="/about" prefetch={false}>
                About
              </Link>
            </li>
          </ul>
        </nav> */}{" "}
        <main className="grow py-3">{children}</main>
        <footer className="border-t text-center text-xs">
          Game data and images courtesy of{" "}
          <a
            href="https://rawg.io/"
            target="_blank"
            className="text-orange-800 hover:underline"
          >
            RAWG
          </a>
        </footer>
      </body>
    </html>
  );
}
