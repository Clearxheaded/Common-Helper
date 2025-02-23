<template>
  <div class="pdf-uploader">
    <h1 class="text-2xl font-bold">Upload Required Documents</h1>
    <p class="text-gray-600 mb-8">
      Please upload the following documents for your {{ system }} evaluation
    </p>

    <div class="upload-section">
      <label class="font-medium mb-2 block">Senior Academic Transcript</label>
      <div class="flex items-center">
        <input
          type="file"
          accept=".pdf"
          @change="handleFileChange"
          class="hidden"
          ref="fileInput"
        />
        <button @click="$refs.fileInput.click()" class="choose-file-btn">
          Choose File
        </button>
        <span class="ml-2 text-gray-600">{{
          fileName || "No file chosen"
        }}</span>
      </div>
    </div>

    <button
      @click="handleUpload"
      class="continue-btn"
      :disabled="!file || loading"
    >
      Continue
    </button>

    <div v-if="loading" class="mt-4">Processing...</div>
    <div v-if="error" class="mt-4 text-red-500">{{ error }}</div>
    <div v-if="result?.aiAnalysis" class="mt-4">
      <h3>AI Analysis:</h3>
      <div class="analysis-results">
        <h4>GPA: {{ result.aiAnalysis.gpa }}</h4>
        <div class="subjects">
          <h4>Subjects and Grades:</h4>
          <ul>
            <li
              v-for="(subject, index) in result.aiAnalysis.subjects"
              :key="index"
            >
              {{ subject }}: {{ result.aiAnalysis.grades[index] }} (US:
              {{ result.aiAnalysis.usGrades[index] }})
            </li>
          </ul>
        </div>
        <div class="analysis">
          <h4>Analysis:</h4>
          <p>{{ result.aiAnalysis.analysis }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import apiService from "../api/api.service";
import { databaseService } from "../services/database";

export default {
  name: "PDFUploader",
  props: {
    system: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
      result: null,
      error: null,
      file: null,
      fileName: "",
    };
  },
  methods: {
    async handleFileChange(event) {
      const file = event.target.files[0];
      if (!file) return;
      this.file = file;
      this.fileName = file.name;
      this.error = null;
    },
    async handleUpload() {
      if (!this.file) return;
      this.loading = true;
      try {
        console.log("Sending file to backend...");
        const pdfResult = await apiService.uploadPDF(this.file);
        console.log("Response from backend:", pdfResult);

        // Save to Supabase
        await databaseService.saveEvaluation({
          file_name: this.file.name,
          original_text: pdfResult.originalText,
          grade_info: pdfResult.gradeInfo,
          ai_analysis: pdfResult.aiAnalysis,
        });

        this.result = {
          ...pdfResult,
        };
        this.$emit("upload-complete", this.result);
      } catch (error) {
        console.error("Error processing PDF:", error);
        this.error = error.message || "Error processing PDF";
      } finally {
        this.loading = false;
      }
    },
  },
};
</script>
