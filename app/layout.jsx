import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {" "}
        <nav>
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
        </nav>{" "}
        <main>{children}</main>
        <footer>[footer]</footer>
      </body>
    </html>
  );
}
