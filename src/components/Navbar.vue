<template>
  <nav class="d-flex justify-content-between align-items-center">
    <div class="logo font-monospace fs-5">BGMS</div>
    <div>
      <router-link to="/">Home</router-link> |
      <router-link to="/map">Map</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <div v-if="user">
      <Button classes="btn btn-danger" :click="logout" name="Logout" />
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
import Button from "@/components/common/Button.vue";

export default {
  name: "NavbarComponent",
  components: { Button },
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

<style>
@media screen and (max-width: 399px) {
  .logo {
    display: none;
  }
}
</style>
