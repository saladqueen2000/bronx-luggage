import { useState } from "react";
import axios from "axios";

export default function Login() {
  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    const res = await axios.post("http://localhost:8000/api/login", form);

    localStorage.setItem("token", res.data.token);
    alert("Đăng nhập thành công!");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Đăng nhập</h2>

      <input name="email" placeholder="Email" onChange={handleChange} />
      <input type="password" name="password" placeholder="Mật khẩu" onChange={handleChange} />

      <button type="submit">Đăng nhập</button>
    </form>
  );
}
