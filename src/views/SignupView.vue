<template>
  <Auth form-type="signup" @signup="handleSubmit" />
</template>

<script>
import router from "@/router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import { useToast } from "vue-toastification";
import Auth from "@/components/Auth.vue";
const toast = useToast();

export default {
  name: "SignupView",
  components: { Auth },
  methods: {
    async handleSubmit({ email, password, confirmPassword }) {
      if (!email || !password) {
        return toast.error("All fields are required!");
      }

      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (!regex.test(email)) {
        return toast.error("Email is not valid");
      }

      if (password !== confirmPassword) {
        return toast.error("Password and confirm password are not same");
      }

      if (password.length < 8) {
        return toast.error("Password is too short");
      }

      try {
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success("You has been registered");

        setTimeout(() => {
          router.push("/");
        }, 1000);
      } catch (e) {
        console.log(e);
      }
    },
  },
};
</script>
