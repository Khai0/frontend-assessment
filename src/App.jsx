import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import BackToHomeButton from "./components/BackToHomeButton";
import HomePage from "./pages/HomePage";
import Exercise1 from "./pages/Exercise1";
import Exercise2 from "./pages/Exercise2";

function ScrollManager() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace("#", "");

      if (!targetId) {
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      }

      const targetElement = document.getElementById(targetId);

      if (targetElement) {
        requestAnimationFrame(() => {
          targetElement.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        });
        return;
      }
    }

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [pathname, hash]);

  return null;
}

function ExerciseRoute({ children }) {
  return (
    <div className="relative min-h-screen bg-gray-bg">
      <BackToHomeButton />
      <MainLayout>{children}</MainLayout>
    </div>
  );
}

export default function App() {
  return (
    <>
      <ScrollManager />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route
          path="/exercise1"
          element={
            <ExerciseRoute>
              <Exercise1 />
            </ExerciseRoute>
          }
        />
        <Route
          path="/exercise2"
          element={
            <ExerciseRoute>
              <Exercise2 />
            </ExerciseRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
