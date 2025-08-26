"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const Login_1 = __importDefault(require("./Login"));
const Register_1 = __importDefault(require("./Register"));
const Home_1 = __importDefault(require("./Home"));
function App() {
    const [user, setUser] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        const savedUser = localStorage.getItem("user");
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);
    const login = (userData) => {
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
    };
    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };
    return ((0, jsx_runtime_1.jsxs)(react_router_dom_1.Routes, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/", element: user ? (0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, { to: "/home" }) : (0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, { to: "/login" }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/login", element: user ? (0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, { to: "/home" }) : (0, jsx_runtime_1.jsx)(Login_1.default, { onLogin: login }) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/register", element: (0, jsx_runtime_1.jsx)(Register_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/home", element: user && user.role === "admin" ? ((0, jsx_runtime_1.jsx)(Home_1.default, { user: user, onLogout: logout })) : ((0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, { to: "/login" })) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "*", element: (0, jsx_runtime_1.jsx)(react_router_dom_1.Navigate, { to: "/" }) })] }));
}
exports.default = App;
