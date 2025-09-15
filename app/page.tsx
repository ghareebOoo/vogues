import NewArrivals from "@/components/NewArrivals";
import Features from "../components/Features";
import Hero from "../components/Hero";
import Popular from "../components/Popular";
import Beauty from "../components/Beauty";
import Users from "../components/Users";

export default function Home() {
  return (
    <div>
      <Hero />
      <Features />
      <NewArrivals />
      <Popular />
      <Beauty />
      <Users />
    </div>
  );
}
