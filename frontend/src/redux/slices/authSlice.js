import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "@/firebase/config";
import { capitalizeLetter } from "@/lib/helpers";
import api from "@/api";

export const register = createAsyncThunk(
  "auth/register",
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const res = await api.post("/auth/register", {
        displayName: username,
        email,
      });

      if (res.status === 201) {
        const newUser = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        await updateProfile(newUser.user, {
          displayName: capitalizeLetter(username),
        });

        await auth.signOut();

        return res.data.message;
      }
    } catch (err) {
      console.error(err);
      return rejectWithValue(err?.response?.data?.message || "Failed to register! Try again later.");
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
      if (err.code.split("/")[1] === "invalid-credential")
        return rejectWithValue("Wrong email or password!");
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await signOut(auth);
      return "You're logged out";
    } catch (err) {
      console.error(err);
      return rejectWithValue("Error when logout! Try again later.");
    }
  }
);

const initialState = {
  isRegistering: false,
  status: "idle",
  message: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetMessage: (state) => {
      state.message = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.status = "loading";
        state.isRegistering = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isRegistering = false;
        state.message = action.payload;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.isRegistering = false;
        state.message = null;
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state) => {
        state.status = "succeeded";
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.message = null;
        state.error = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.message = action.payload;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
        state.message = null;
      });
  },
});

export const { resetMessage } = authSlice.actions;
export default authSlice.reducer;
