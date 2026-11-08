import { Routes, Route } from 'react-router';
import { LangProvider } from './context/LangContext';
import { ContentProvider } from './context/ContentContext';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Branches from './pages/Branches';
import Admission from './pages/Admission';
import Results from './pages/Results';

export default function App() {
  return (
    <LangProvider>
      <ContentProvider>
        <Routes>
          {/* Public site */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/results" element={<Results />} />
            <Route path="/branches" element={<Branches />} />
            <Route path="/admission" element={<Admission />} />
          </Route>
        </Routes>
      </ContentProvider>
    </LangProvider>
  );
}
