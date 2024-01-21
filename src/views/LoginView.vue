<template>
  <Auth form-type="login" @login="handleSubmit" />
</template>

<script>
import router from "@/router";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import Auth from "@/components/Auth.vue";
import { useToast } from "vue-toastification";
const toast = useToast();

export default {
  name: "LoginView",
  components: { Auth },
  methods: {
    async handleSubmit({ email, password }) {
      if (!email || !password) {
        return toast.error("All fields are required!");
      }

      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (!regex.test(email)) {
        return toast.error("Email is not valid");
      }

      if (password.length < 8) {
        return toast.error("Password is too short");
      }

      try {
        await signInWithEmailAndPassword(auth, email, password);

        router.push("/");
      } catch (e) {
        toast.error(e.message);
        console.log(e);
      }
    },
  },
};
</script>
