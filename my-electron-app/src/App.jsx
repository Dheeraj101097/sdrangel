import { useState } from "react";
import Page_one from "./pages/page_one";
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Page_one />
    </>
  );
}

export default App;
