<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card border-0 shadow rounded-3 my-5">
          <div class="card-body p-4 p-sm-5">
            <h5 class="card-title text-center mb-5 fw-light fs-5">Sign Up</h5>
            <form @submit.prevent="handleSubmit">
              <div class="form-floating mb-3">
                <input
                  type="email"
                  class="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  v-model="email"
                />
                <label for="floatingInput">Email address</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  type="password"
                  class="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  v-model="password"
                />
                <label for="floatingPassword">Password</label>
              </div>
              <div class="form-floating mb-3">
                <input
                  type="password"
                  class="form-control"
                  id="floatingConfirmPassword"
                  placeholder="Password"
                  v-model="confirmPassword"
                />
                <label for="floatingConfirmPassword">Confirm Password</label>
              </div>

              <div class="d-grid">
                <button
                  class="btn btn-primary btn-login text-uppercase fw-bold"
                  type="submit"
                >
                  Sign up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "@/router";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/firebase";
import { useToast } from "vue-toastification";
const toast = useToast();

export default {
  name: "SignupView",
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    async handleSubmit() {
      if (!this.email || !this.password) {
        return toast.error("All fields are required!");
      }

      const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

      if (!regex.test(this.email)) {
        return toast.error("Email is not valid");
      }

      if (this.password !== this.confirmPassword) {
        return toast.error("Password and confirm password are not same");
      }

      if (this.password.length < 8) {
        return toast.error("Password is too short");
      }

      try {
        await createUserWithEmailAndPassword(auth, this.email, this.password);
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

<style>
.btn-login {
  font-size: 0.9rem;
  letter-spacing: 0.05rem;
  padding: 0.75rem 1rem;
}
</style>
