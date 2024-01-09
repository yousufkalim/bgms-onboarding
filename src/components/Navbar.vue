<template>
  <nav class="d-flex justify-content-between align-items-center">
    <div class="font-monospace fs-5">BGMS</div>
    <div>
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <div v-if="user">
      <button class="btn btn-danger" @click="logout">Logout</button>
    </div>
    <div v-else>
      <router-link to="/login">Login</router-link> |
      <router-link to="/signup">Signup</router-link>
    </div>
  </nav>
</template>

<script>
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "@/firebase";
import router from "@/router";
import { ref } from "vue";

export default {
  name: "NavbarComponent",
  setup() {
    const user = ref(null);

    onAuthStateChanged(auth, (firebaseUser) => {
      user.value = firebaseUser;
    });

    const logout = async () => {
      await signOut(auth);
      router.push("/login");
    };

    return { user, logout };
  },
};
</script>
