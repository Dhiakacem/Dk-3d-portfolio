import './i18n'; // initialize i18n
import { BrowserRouter } from "react-router-dom";

import { About, Contact, Experience, CV, Hero, Navbar, Tech, Works } from "./components";

const App = () => {
  return (
    <BrowserRouter>
      <div className='relative z-0 bg-primary dark:bg-primary-dark transition-colors duration-300 ease-out'>
        <div className='bg-hero-pattern bg-cover bg-no-repeat bg-center transition-colors duration-300 ease-out'>
          <Navbar />
          <Hero />
        </div>
        <About />
        <Experience />
        <Tech />
        <Works />
        <CV />
          <Contact />
      </div>
    </BrowserRouter>
  );
}

export default App;
