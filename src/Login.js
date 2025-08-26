"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const supabase_js_1 = require("@supabase/supabase-js");
const react_router_dom_1 = require("react-router-dom");
const SUPABASE_URL = "https://prwvxtwkhcgurjagynvl.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InByd3Z4dHdraGNndXJqYWd5bnZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxMTU0MDMsImV4cCI6MjA3MTY5MTQwM30.TS7xw27SqrQExXzJQXTTCnbmTh4CcdgNTckKS7U30xQ";
const supabase = (0, supabase_js_1.createClient)(SUPABASE_URL, SUPABASE_ANON_KEY);
function Login({ onLogin }) {
    const [username, setUsername] = (0, react_1.useState)("");
    const [password, setPassword] = (0, react_1.useState)("");
    const [error, setError] = (0, react_1.useState)("");
    const [loading, setLoading] = (0, react_1.useState)(false);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const handleSubmit = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const { data: user, error: fetchError } = yield supabase
                .from("users")
                .select("*")
                .eq("username", username)
                .single();
            if (fetchError) {
                setError("Login failed: " + fetchError.message);
                setLoading(false);
                return;
            }
            if (!user || user.password !== password) {
                setError("Invalid username or password");
                setLoading(false);
                return;
            }
            if (user.role !== "admin") {
                setError("Access denied: only Admins can login here");
                setLoading(false);
                return;
            }
            onLogin(user);
        }
        catch (err) {
            setError("Unexpected error: " + err.message);
        }
        finally {
            setLoading(false);
        }
    });
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "login-container" }, { children: [(0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "login-card" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Welcome Back" }), error && (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "error-msg" }, { children: error })), (0, jsx_runtime_1.jsxs)("form", Object.assign({ onSubmit: handleSubmit }, { children: [(0, jsx_runtime_1.jsx)("input", { type: "text", value: username, onChange: (e) => setUsername(e.target.value), placeholder: "Username", required: true }), (0, jsx_runtime_1.jsx)("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "Password", required: true }), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "submit", disabled: loading }, { children: loading ? "Logging in..." : "Login" }))] }))] })), (0, jsx_runtime_1.jsx)("style", { children: `
          .login-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
            background: linear-gradient(135deg, #007bff, #00c6ff);
            font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          }
          .login-card {
            background: #fff;
            padding: 40px 30px;
            border-radius: 15px;
            width: 100%;
            max-width: 400px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
            text-align: center;
          }
          .login-card h2 {
            color: #1e3c72;
            margin-bottom: 20px;
          }
          input {
            width: 100%;
            padding: 12px 15px;
            margin: 10px 0;
            border: 1px solid #ccc;
            border-radius: 8px;
            outline: none;
            font-size: 14px;
          }
          input:focus {
            border-color: #00b3a4;
            box-shadow: 0 0 8px rgba(0, 179, 164, 0.3);
          }
          button {
            width: 100%;
            padding: 12px;
            margin-top: 15px;
            border: none;
            border-radius: 8px;
            background: #00b3a4;
            color: white;
            font-size: 16px;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          }
          button:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0,0,0,0.15);
          }
          .error-msg {
            background: #ffe6e6;
            color: #d32f2f;
            padding: 10px;
            border-radius: 5px;
            margin-bottom: 15px;
            font-size: 14px;
          }
          .register-link {
            margin-top: 15px;
            font-size: 14px;
            color: #555;
          }
          .register-link span {
            color: #00b3a4;
            font-weight: bold;
            cursor: pointer;
          }
          .register-link span:hover {
            text-decoration: underline;
          }
        ` })] })));
}
exports.default = Login;
