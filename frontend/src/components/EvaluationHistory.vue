<template>
  <div class="evaluation-history">
    <h2 class="text-2xl font-bold mb-4">Previous Evaluations</h2>
    <div v-if="loading" class="text-center">Loading...</div>
    <div v-else-if="error" class="text-red-500">{{ error }}</div>
    <div v-else class="grid gap-4">
      <div
        v-for="eval in evaluations"
        :key="eval.id"
        class="bg-white p-4 rounded-lg shadow"
      >
        <div class="flex justify-between items-center mb-2">
          <h3 class="font-bold">{{ eval.file_name }}</h3>
          <span class="text-gray-500">{{
            new Date(eval.created_at).toLocaleDateString()
          }}</span>
        </div>
        <div class="text-lg font-bold">GPA: {{ eval.ai_analysis.gpa }}/4.0</div>
      </div>
    </div>
  </div>
</template>

<script>
import { databaseService } from "../services/database";

export default {
  name: "EvaluationHistory",
  data() {
    return {
      evaluations: [],
      loading: false,
      error: null,
    };
  },
  async created() {
    try {
      this.loading = true;
      this.evaluations = await databaseService.getEvaluations();
    } catch (error) {
      this.error = error.message;
    } finally {
      this.loading = false;
    }
  },
};
</script>
