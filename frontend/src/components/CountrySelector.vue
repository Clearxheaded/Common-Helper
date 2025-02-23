<template>
  <div>
    <p>{{ testMessage }}</p>
    <h1 class="text-2xl font-bold">Select Your Country</h1>

    <select v-model="selectedCountry" class="mb-4">
      <option value="">Select Country</option>
      <option value="South Africa">South Africa</option>
    </select>

    <h2 class="text-2xl font-bold">Select Education System</h2>
    <select v-model="selectedSystem" class="mb-4">
      <option value="">Select System</option>
      <option value="matric">Matric</option>
      <option value="a-levels">A-Levels</option>
    </select>

    <button
      @click="handleContinue"
      class="continue-btn"
      :disabled="!selectedCountry || !selectedSystem"
    >
      Continue
    </button>

    <div v-if="error" class="text-red-500">{{ error }}</div>
  </div>
</template>

<script>
import { selectionService } from "../services/selectionService";

export default {
  data() {
    return {
      testMessage: "CountrySelector is mounted!",
      selectedCountry: "",
      selectedSystem: "",
      error: null,
    };
  },
  mounted() {
    console.log("CountrySelector component mounted");
  },
  watch: {
    selectedCountry(newVal) {
      console.log("Country selected:", newVal);
    },
    selectedSystem(newVal) {
      console.log("System selected:", newVal);
    },
  },
  methods: {
    async handleContinue() {
      console.log("Saving selection:", {
        country: this.selectedCountry,
        system: this.selectedSystem,
      });
      try {
        await selectionService.saveSelection(
          this.selectedCountry,
          this.selectedSystem
        );
        console.log("Selection saved successfully");
        // Navigate to next step
        this.$router.push("/upload");
      } catch (error) {
        console.error("Failed to save selection:", error);
        this.error = error.message;
      }
    },
  },
};
</script>
