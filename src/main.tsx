import { createRoot } from "react-dom/client"
import "./index.css"
import "./i18n"
import "./tracking"
import App from "./MainApp.tsx"

createRoot(document.getElementById("root")!).render(
  <App />
)
