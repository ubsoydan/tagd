import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./scenes/homePage/home.page";
import LoginPage from "./scenes/loginPage/login.page";
import RegisterPage from "./scenes/registerPage/register.page";
import UserPage from "./scenes/userPage/user.page";
import ListPage from "./scenes/listPage/list.page";

function App() {
    return (
        <BrowserRouter>
            <div className="min-h-screen bg-background font-sans antialiased">
                <main className="flex-1">
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/:userId" element={<UserPage />} />
                        <Route path="/:userId/:listId" element={<ListPage />} />
                    </Routes>
                </main>
            </div>
        </BrowserRouter>
    );
}

export default App;
