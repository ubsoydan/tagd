import { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./scenes/homePage/home.page";
import LoginPage from "./scenes/loginPage/login.page";
import RegisterPage from "./scenes/registerPage/register.page";
import UserPage from "./scenes/userPage/user.page";
import ListPage from "./scenes/listPage/list.page";
import { getCurrentUser } from "@/src/network/auth-api";
// REDUX IMPORTS
import { useDispatch } from "react-redux";
import { setLogin } from "./state/index";

function App() {
    // const [loggedInUser, setLoggedInUser] = useState();
    const dispatch = useDispatch();

    useEffect(() => {
        async function fetchLoggedInUser() {
            try {
                const currentUser = await getCurrentUser();
                dispatch(setLogin({ username: currentUser }));
            } catch (error) {
                console.error(error);
            }
        }
        fetchLoggedInUser();
        //     getCurrentUser()
        //         .then((username) => {
        //             setLoggedInUser(username);
        //         })
        //         .catch((err) => console.error(err));
    }, [dispatch]);

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
