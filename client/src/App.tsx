import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Preview from "./pages/Preview"
import Pricing from "./pages/Pricing"
import View from "./pages/View"
import Community from "./pages/Community"
import Projects from "./pages/Projects"
import Navbar from "./components/Navbar"
import MyProjects from "./pages/MyProjects"


function App() {

  return (
    <>
    <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/projects/:projectId" element={<Projects />} />
        <Route path="/projects" element={<MyProjects />} />
        <Route path="/preview/:projectId" element={<Preview />} />
        <Route path="/preview/:projectId/:versionId" element={<Preview />} />
        <Route path="/community" element={<Community />} />
        <Route path="/view/:projectId" element={<View />} />
      </Routes>
    </>
    
  )
}

export default App
