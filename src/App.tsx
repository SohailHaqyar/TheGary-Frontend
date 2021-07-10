import React, { useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { PostsProvider } from "./context/PostsContext";
import { Routes as AnimatedRoutes } from "./Routes";

const App = () => {
  useEffect(() => {
    if (localStorage.theme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);
  return (
    <AuthProvider>
      <PostsProvider>
        <div className="bg-gray-100 dark:bg-dracula-900">
          <Router>
            <Route path="*">
              <AnimatedRoutes />
            </Route>
          </Router>
        </div>
      </PostsProvider>
    </AuthProvider>
  );
};

export default App;
