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
const react_router_dom_1 = require("react-router-dom");
const supabase_js_1 = require("@supabase/supabase-js");
const SUPABASE_URL = "https://vhztoaoderjbeientrtn.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_1a9vPsiBaUTqk5diLkpLQA_AWVa3J3n";
const supabase = (0, supabase_js_1.createClient)(SUPABASE_URL, SUPABASE_ANON_KEY);
function Register() {
    const [username, setUsername] = (0, react_1.useState)("");
    const [password, setPassword] = (0, react_1.useState)("");
    const [role, setRole] = (0, react_1.useState)("admin");
    const [error, setError] = (0, react_1.useState)("");
    const [loading, setLoading] = (0, react_1.useState)(false);
    const navigate = (0, react_router_dom_1.useNavigate)();
    const handleSubmit = (e) => __awaiter(this, void 0, void 0, function* () {
        e.preventDefault();
        setError("");
        setLoading(true);
        try {
            const { data: existingUser, error: fetchError } = yield supabase
                .from("users")
                .select("id")
                .eq("username", username)
                .single();
            if (fetchError && fetchError.code !== "PGRST116")
                throw new Error(fetchError.message);
            if (existingUser) {
                setError("⚠ Username already exists");
                setLoading(false);
                return;
            }
            const { error: insertError } = yield supabase
                .from("users")
                .insert([{ username, password, role }]);
            if (insertError)
                throw new Error(insertError.message);
            alert("✅ Registration successful! Please login.");
            navigate("/login");
        }
        catch (err) {
            setError("Registration failed: " + err.message);
        }
        finally {
            setLoading(false);
        }
    });
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "register-container" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "register-header" }, { children: "SparkleSmart Technologies" })), (0, jsx_runtime_1.jsxs)("form", Object.assign({ onSubmit: handleSubmit, className: "register-form" }, { children: [(0, jsx_runtime_1.jsx)("h2", { children: "Create an Account" }), error && (0, jsx_runtime_1.jsx)("div", Object.assign({ className: "error-msg" }, { children: error })), (0, jsx_runtime_1.jsx)("input", { type: "text", value: username, onChange: (e) => setUsername(e.target.value), placeholder: "Username" }), (0, jsx_runtime_1.jsx)("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), placeholder: "Password" }), (0, jsx_runtime_1.jsxs)("select", Object.assign({ value: role, onChange: (e) => setRole(e.target.value) }, { children: [(0, jsx_runtime_1.jsx)("option", Object.assign({ value: "admin" }, { children: "Admin" })), (0, jsx_runtime_1.jsx)("option", Object.assign({ value: "user" }, { children: "User (no access)" }))] })), (0, jsx_runtime_1.jsx)("button", Object.assign({ type: "submit", disabled: loading }, { children: loading ? "Registering..." : "Register" }))] })), (0, jsx_runtime_1.jsxs)("footer", Object.assign({ className: "register-footer" }, { children: ["\u00A9 ", new Date().getFullYear(), " SparkleSmart Technologies. All rights reserved."] })), (0, jsx_runtime_1.jsx)("style", { children: `
        * { box-sizing: border-box; }
        body { margin: 0; font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif; }
        .register-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          min-height: 100vh;
          background: #f0f2f5;
          padding: 20px;
        }
        .register-header {
          font-size: 28px;
          font-weight: 700;
          color: white;
          background: linear-gradient(90deg, #00b3a4, #1e3c72);
          text-align: center;
          padding: 20px;
          border-radius: 0 0 15px 15px;
          width: 100%;
          max-width: 400px;
          margin-bottom: 30px;
        }
        .register-form {
          background: white;
          padding: 30px;
          border-radius: 15px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          width: 100%;
          max-width: 400px;
          display: flex;
          flex-direction: column;
          gap: 15px;
        }
        .register-form h2 {
          text-align: center;
          color: #1e3c72;
          margin-bottom: 10px;
        }
        .register-form input,
        .register-form select {
          padding: 12px 15px;
          border-radius: 8px;
          border: 1px solid #ccc;
          font-size: 14px;
          outline: none;
          transition: all 0.3s ease;
        }
        .register-form input:focus,
        .register-form select:focus {
          border-color: #00b3a4;
          box-shadow: 0 0 10px rgba(0,179,164,0.3);
        }
        .register-form button {
          padding: 12px 15px;
          border-radius: 10px;
          border: none;
          background: linear-gradient(90deg, #00b3a4, #1e3c72);
          color: white;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          margin-top: 10px;
        }
        .register-form button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.15);
        }
        .register-form button:disabled {
          background: #999;
          cursor: not-allowed;
        }
        .error-msg {
          color: #d32f2f;
          background: #ffe6e6;
          padding: 8px;
          border-radius: 5px;
          font-size: 14px;
          text-align: center;
        }
        .register-footer {
          margin-top: auto;
          text-align: center;
          padding: 15px 0;
          font-size: 14px;
          color: white;
          background: #1e3c72;
          border-radius: 15px 15px 0 0;
          width: 100%;
          max-width: 400px;
          margin-top: 30px;
        }
      ` })] })));
}
exports.default = Register;
