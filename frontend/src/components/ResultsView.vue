<template>
  <div class="results">
    <h1 class="text-2xl font-bold">Your Results</h1>

    <div class="gpa-card bg-white rounded-lg p-6 my-8">
      <h2 class="text-xl mb-2">Overall GPA Equivalent</h2>
      <div class="text-4xl font-bold">{{ result.aiAnalysis.gpa }}/4.0</div>
    </div>

    <h2 class="text-2xl font-bold mb-6">Subject Analysis</h2>
    <div class="grid grid-cols-2 gap-6">
      <div
        v-for="(subject, index) in result.aiAnalysis.subjects"
        :key="index"
        class="subject-card bg-white rounded-lg p-6"
      >
        <h3 class="text-xl font-bold mb-4">{{ subject }}</h3>
        <div class="progress-bar mb-4">
          <div
            class="bg-black h-2 rounded"
            :style="{ width: `${result.aiAnalysis.matchPercentages[index]}%` }"
          ></div>
        </div>
        <div class="flex justify-between mb-2">
          <span>Equivalency</span>
          <span>{{ result.aiAnalysis.matchPercentages[index] }}%</span>
        </div>
        <p class="text-gray-600">{{ result.aiAnalysis.analysis[index] }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResultsView",
  props: {
    result: {
      type: Object,
      required: true,
    },
  },
};
</script>
