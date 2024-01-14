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
              <Input
                type="email"
                :value="email"
                name="email"
                placeholder="name@example.com"
                label="Email address"
                @change="handleChange"
              />
              <Input
                type="password"
                :value="password"
                name="password"
                placeholder="Password"
                label="Password"
                @change="handleChange"
              />
              <Input
                v-if="formType === 'signup'"
                type="password"
                :value="confirmPassword"
                name="confirmPassword"
                placeholder="Password"
                label="Confirm Password"
                @change="handleChange"
              />

              <div
                v-if="formType === 'login'"
                class="form-check mb-3 d-flex justify-content-start"
              >
                <input
                  class="form-check-input"
                  type="checkbox"
                  value=""
                  id="rememberPasswordCheck"
                />
                <label
                  class="form-check-label mx-3"
                  for="rememberPasswordCheck"
                >
                  Remember password
                </label>
              </div>

              <div class="d-grid">
                <Button
                  classes="btn btn-primary btn-login text-uppercase fw-bold"
                  type="submit"
                  :name="formType === 'login' ? 'Login' : 'Sign Up'"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Input from "@/components/common/Input.vue";
import Button from "@/components/common/Button.vue";

export default {
  name: "AuthComponent",
  components: { Input, Button },
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
    handleChange(e) {
      this[e.name] = e.value;
    },

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
