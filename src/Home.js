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
const SUPABASE_URL = "https://prwvxtwkhcgurjagynvl.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InByd3Z4dHdraGNndXJqYWd5bnZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYxMTU0MDMsImV4cCI6MjA3MTY5MTQwM30.TS7xw27SqrQExXzJQXTTCnbmTh4CcdgNTckKS7U30xQ";
const supabase = (0, supabase_js_1.createClient)(SUPABASE_URL, SUPABASE_ANON_KEY);
function Home({ user, onLogout }) {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [data, setData] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    const [tableType, setTableType] = (0, react_1.useState)("");
    const [searchTerm, setSearchTerm] = (0, react_1.useState)("");
    const [editingId, setEditingId] = (0, react_1.useState)(null);
    const [editRow, setEditRow] = (0, react_1.useState)({});
    const fetchData = (type) => __awaiter(this, void 0, void 0, function* () {
        setLoading(true);
        setError(null);
        setTableType(type);
        try {
            const { data: fetchedData, error } = yield supabase
                .from(type)
                .select("*")
                .order("id", { ascending: true });
            if (error)
                throw error;
            setData(fetchedData);
        }
        catch (err) {
            setError(`Failed to fetch ${type}: ${err.message}`);
        }
        setLoading(false);
    });
    const handleDelete = (id) => __awaiter(this, void 0, void 0, function* () {
        if (!window.confirm("Are you sure you want to delete this record?"))
            return;
        try {
            const { error } = yield supabase.from(tableType).delete().eq("id", id);
            if (error)
                throw error;
            setData(data.filter((item) => item.id !== id));
        }
        catch (err) {
            alert("Delete failed: " + err.message);
        }
    });
    const handleEdit = (item) => {
        setEditingId(item.id);
        setEditRow(item);
    };
    const handleSave = () => __awaiter(this, void 0, void 0, function* () {
        if (editingId === null)
            return;
        try {
            const { error } = yield supabase
                .from(tableType)
                .update(editRow)
                .eq("id", editingId);
            if (error)
                throw error;
            setData(data.map((row) => (row.id === editingId ? Object.assign(Object.assign({}, row), editRow) : row)));
            setEditingId(null);
        }
        catch (err) {
            alert("Update failed: " + err.message);
        }
    });
    const handleCancel = () => setEditingId(null);
    const handleCreateAccount = () => navigate("/register");
    const filteredData = data.filter((item) => Object.values(item).join(" ").toLowerCase().includes(searchTerm.toLowerCase()));
    return ((0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "admin-container" }, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "main-header" }, { children: "JKL Technologies" })), (0, jsx_runtime_1.jsxs)("header", Object.assign({ className: "admin-header" }, { children: [(0, jsx_runtime_1.jsx)("h1", { children: "Admin Dashboard" }), (0, jsx_runtime_1.jsxs)("p", { children: ["Welcome, ", user.username] }), (0, jsx_runtime_1.jsxs)("div", Object.assign({ className: "header-buttons" }, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: () => fetchData("messages"), className: "card-btn" }, { children: "Messages" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: () => fetchData("quotes"), className: "card-btn" }, { children: "Requests" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: handleCreateAccount, className: "card-btn create" }, { children: "Create Account" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: onLogout, className: "card-btn logout" }, { children: "Logout" }))] }))] })), loading && (0, jsx_runtime_1.jsxs)("p", Object.assign({ className: "loading" }, { children: ["Loading ", tableType, "..."] })), error && (0, jsx_runtime_1.jsx)("p", Object.assign({ className: "error" }, { children: error })), tableType && !loading && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("div", Object.assign({ className: "search-bar" }, { children: (0, jsx_runtime_1.jsx)("input", { type: "text", placeholder: "Search records...", value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) }) })), filteredData.length > 0 ? ((0, jsx_runtime_1.jsxs)("table", Object.assign({ className: "admin-table" }, { children: [(0, jsx_runtime_1.jsx)("thead", { children: (0, jsx_runtime_1.jsxs)("tr", { children: [Object.keys(filteredData[0]).map((col) => ((0, jsx_runtime_1.jsx)("th", { children: col }, col))), (0, jsx_runtime_1.jsx)("th", { children: "Actions" })] }) }), (0, jsx_runtime_1.jsx)("tbody", { children: filteredData.map((item) => ((0, jsx_runtime_1.jsxs)("tr", { children: [Object.keys(item).map((col) => {
                                            var _a, _b;
                                            return ((0, jsx_runtime_1.jsx)("td", { children: editingId === item.id ? ((0, jsx_runtime_1.jsx)("input", { value: (_a = editRow[col]) !== null && _a !== void 0 ? _a : "", onChange: (e) => setEditRow(Object.assign(Object.assign({}, editRow), { [col]: e.target.value })) })) : ((_b = item[col]) === null || _b === void 0 ? void 0 : _b.toString()) }, col));
                                        }), (0, jsx_runtime_1.jsx)("td", { children: editingId === item.id ? ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: handleSave }, { children: "Save" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: handleCancel }, { children: "Cancel" }))] })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("button", Object.assign({ onClick: () => handleEdit(item) }, { children: "Edit" })), (0, jsx_runtime_1.jsx)("button", Object.assign({ className: "delete-btn", onClick: () => handleDelete(item.id) }, { children: "Delete" }))] })) })] }, item.id))) })] }))) : ((0, jsx_runtime_1.jsxs)("p", Object.assign({ className: "no-data" }, { children: ["No ", tableType, " found."] })))] })), (0, jsx_runtime_1.jsxs)("footer", Object.assign({ className: "admin-footer" }, { children: ["\u00A9 ", new Date().getFullYear(), " JKL Technologies. All rights reserved."] })), (0, jsx_runtime_1.jsx)("style", { children: `
        * {
          box-sizing: border-box;
        }
        .admin-container {
          font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          background: #f0f2f5;
        }
        .main-header {
          background: linear-gradient(90deg, #00b3a4, #1e3c72);
          color: white;
          font-size: 28px;
          font-weight: 700;
          text-align: center;
          padding: 20px;
          border-radius: 0 0 15px 15px;
          letter-spacing: 1px;
        }
        .admin-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin: 20px 0;
        }
        .admin-header h1 {
          color: #1e3c72;
        }
        .admin-header p {
          color: #555;
          margin-bottom: 15px;
        }
        .header-buttons {
          display: flex;
          flex-wrap: wrap;
          gap: 15px;
          justify-content: center;
        }
        .card-btn {
          padding: 12px 25px;
          border-radius: 10px;
          border: none;
          font-weight: 600;
          font-size: 14px;
          color: white;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        }
        .card-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.15);
        }
        .card-btn.create { background: #00b3a4; }
        .card-btn.logout { background: #d32f2f; }

        .search-bar {
          display: flex;
          justify-content: center;
          margin: 20px 0;
        }
        .search-bar input {
          width: 50%;
          padding: 10px 15px;
          border-radius: 50px;
          border: 1px solid #ccc;
          outline: none;
          font-size: 14px;
          transition: all 0.3s ease;
        }
        .search-bar input:focus {
          border-color: #00b3a4;
          box-shadow: 0 0 10px rgba(0, 179, 164, 0.3);
        }

        .admin-table {
          width: 90%;
          margin: 0 auto 30px auto;
          border-collapse: collapse;
          background: white;
          border-radius: 10px;
          overflow: hidden;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        }
        .admin-table th,
        .admin-table td {
          padding: 12px 15px;
          text-align: left;
        }
        .admin-table th {
          background: #00b3a4;
          color: white;
          font-weight: 600;
        }
        .admin-table tbody tr {
          transition: background 0.3s ease;
        }
        .admin-table tbody tr:hover {
          background: #f1faff;
        }
        .admin-table input {
          padding: 6px 8px;
          width: 100%;
          border-radius: 5px;
          border: 1px solid #ccc;
        }
        button.delete-btn {
          background: #d32f2f;
          color: white;
          padding: 6px 12px;
          border-radius: 5px;
          margin-left: 5px;
        }
        .loading,
        .error,
        .no-data {
          text-align: center;
          color: #555;
          font-weight: 500;
          margin: 15px 0;
        }
        .admin-footer {
          margin-top: auto;
          background: #1e3c72;
          color: white;
          text-align: center;
          padding: 15px 0;
          border-radius: 15px 15px 0 0;
          font-size: 14px;
        }
      ` })] })));
}
exports.default = Home;
