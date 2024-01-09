<template>
  <div class="container">
    <div class="row">
      <div class="col-sm-9 col-md-7 col-lg-5 mx-auto">
        <div class="card border-0 shadow rounded-3 my-5">
          <div class="card-body p-4 p-sm-5">
            <h5 class="card-title text-center mb-5 fw-light fs-5">
              {{ formType === "login" ? "Login" : "Sign Up" }}
            </h5>
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
              <div class="form-floating mb-3" v-if="formType === 'signup'">
                <input
                  type="password"
                  class="form-control"
                  id="floatingConfirmPassword"
                  placeholder="Password"
                  v-model="confirmPassword"
                />
                <label for="floatingConfirmPassword">Confirm Password</label>
              </div>

              <div
                v-if="formType === 'login'"
                class="form-check mb-3 d-flex justify-content-start"
              >
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="rememberPasswordCheck"
                  v-model="remember"
                />
                <label
                  class="form-check-label mx-3"
                  for="rememberPasswordCheck"
                >
                  Remember password
                </label>
              </div>

              <div class="d-grid">
                <button
                  class="btn btn-primary btn-login text-uppercase fw-bold"
                  type="submit"
                >
                  {{ formType === "login" ? "Login" : "Sign Up" }}
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
export default {
  name: "AuthComponent",
  props: {
    formType: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      email: "",
      password: "",
      confirmPassword: "",
    };
  },
  methods: {
    handleSubmit() {
      const data = {
        email: this.email,
        password: this.password,
        confirmPassword: this.confirmPassword,
      };

      this.$emit(this.formType, data);
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
