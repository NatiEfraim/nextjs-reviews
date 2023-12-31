import Image from "next/image";
import Heading from "../../components/Heading";
import { getReviews } from "@/lib/reviews";
import Link from "next/link";
export const metadata = {
  title: "Reviews",
};
export default async function ReviewsPage() {
  const reviews = await getReviews(6);
  // console.log("[ReviewsPage] reviews:", reviews);
  return (
    <>
      <Heading>Reviews</Heading>
      {/* <p>Here we'll list all the reviews.</p> */}
      <ul className="flex flex-row flex-wrap gap-3">
        {reviews.map((review, index) => (
          <li
            key={review.slug}
            className="bg-white border rounded shadow w-80 hover:shadow-xl"
          >
            <Link href={`/reviews/${review.slug}`}>
              <Image
                priority={index === 0}
                src={review.image}
                alt=""
                width="320"
                height="180"
                className="rounded-t"
              />
              <h2 className="font-orbitron font-semibold py-1 text-center">
                {review.title}
              </h2>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
