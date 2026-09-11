import Cta from './components/cta';
import Foundmission from './components/foundmission';
import Hero from './components/hero';
import HowItWorks from './components/howItWork';
import Footer from './components/layout/footer';
import Header from './components/layout/Header';
import MatchingShowcase from './components/matchingShowcase';

const App = () => {
  return (
    <main className="w-full min-h-screen font-sans bg-white">
      <div className="relative">
        <Header />
        <section className="h-screen w-full overflow-hidden relative">
          <Hero />
        </section>
        <section id="comment-ca-marche">
          <HowItWorks />
        </section>
        <section>
          <MatchingShowcase />
        </section>
        <section id="missions">
          <Foundmission />
        </section>
        <section>
          <Cta />
        </section>
        <section>
          <Footer />
        </section>
      </div>
    </main>
  );
};

export default App;
