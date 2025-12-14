import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import Cookies from "js-cookie";

/* ================= REGISTER ================= */
export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async ({ fullname, email, password, passwordConfirm }, thunkAPI) => {
    try {
      // Lấy guest token từ cookie
      const guestToken = Cookies.get("guest_token");

      const res = await axios.post(
        "http://localhost:8000/api/register",
        {
          fullname,
          email,
          password,
          password_confirmation: passwordConfirm, // map frontend key sang backend
        },
        {
          headers: guestToken ? { "X-Guest-Token": guestToken } : {},
        }
      );

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.response?.data || "Register failed"
      );
    }
  }
);

/* ================= LOGIN ================= */
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async ({ email, password }, thunkAPI) => {
    try {
      // Lấy guest token từ cookie
      const guestToken = Cookies.get("guest_token");

      const res = await axios.post(
        "http://localhost:8000/api/login",
        { email, password },
        {
          headers: guestToken ? { "X-Guest-Token": guestToken } : {},
        }
      );
      Cookies.remove("guest_token");
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || "Login failed"
      );
    }
  }
);

const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    loading: false,
    error: null,
    success: null,
  },

  reducers: {
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
      state.success = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
  },

  extraReducers: (builder) => {
    builder
      /* ===== REGISTER ===== */
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.success = action.payload.message || "Register successfully";

        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);

        // Nếu register thành công, xóa guest token cookie
        Cookies.remove("guest_token");
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : "Register failed";
      })

      /* ===== LOGIN ===== */
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;

        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("token", action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
