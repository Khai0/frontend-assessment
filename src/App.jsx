import { useState } from "react";
import "./styles/app.scss";
import MainLayout from "./layouts/MainLayout";
import Exercise1 from "./pages/Exercise1";
import Exercise2 from "./pages/Exercise2";

export default function App() {
  const [page, setPage] = useState("ex1");

  return (
    <>
      <nav className="app-nav">
        <button
          className={`app-nav__btn ${page === "ex1" ? "app-nav__btn--active" : ""}`}
          onClick={() => setPage("ex1")}
        >
          Exercise 1
        </button>
        <button
          className={`app-nav__btn ${page === "ex2" ? "app-nav__btn--active" : ""}`}
          onClick={() => setPage("ex2")}
        >
          Exercise 2
        </button>
        <div
          className="app-nav__slider"
          style={{
            transform: page === "ex1" ? "translateX(0)" : "translateX(100%)",
          }}
        />
      </nav>

      <div className="app-page-wrapper">
        <div
          className={`app-page ${page === "ex1" ? "app-page--active" : "app-page--hidden"}`}
        >
          <MainLayout>
            <Exercise1 onNavigate={setPage} />
          </MainLayout>
        </div>
        <div
          className={`app-page ${page === "ex2" ? "app-page--active" : "app-page--hidden"}`}
        >
          <Exercise2 />
        </div>
      </div>
    </>
  );
}
