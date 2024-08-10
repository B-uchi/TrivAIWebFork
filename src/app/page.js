

import { Layout, Hero, HowToPlay, MovieMania, AboutUs, Newsletter, Footer } from "@/Components/landing";


export default function Home() {
  return (
    <Layout>
      <Hero />
      <HowToPlay />
      <MovieMania />
      <AboutUs />
      <Newsletter />
      <Footer />
    </Layout>
  );
}
