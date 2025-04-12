import { HashRouter, Routes, Route } from "react-router-dom"
import A2Z from "./pages/a2z"
import Landing from "./pages/landing"
import S79 from "./pages/79"
import S75 from "./pages/75"
import SDE from "./pages/sde"

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Landing />}/>
        <Route path="/a2z" element={<A2Z />}/>
        <Route path="/79" element={<S79/>}/>
        <Route path="/75" element={<S75/>}/>
        <Route path="/sde" element={<SDE/>}/>
      </Routes>
    </HashRouter>
  )
}

export default App
