import type { MetaFunction } from "@remix-run/node";
import Footer from "~/components/footer";
import Navbar from "~/components/navbar";

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <div>
      <Navbar />
      <h1>Welcome to Remix!</h1>
      <Footer />
    </div>
  );
}

