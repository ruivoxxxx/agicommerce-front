import { TaskManager } from "@/modules/taskManager/page";
import { Route, Routes } from "react-router-dom";
import { ProductDetail } from "./modules/productDetail/page";

function App() {
  return (
    <Routes>
      <Route path="/" element={<TaskManager />} />
      <Route path="/produto/:id" element={<ProductDetail />} />
    </Routes>
  );
}

export default App;
