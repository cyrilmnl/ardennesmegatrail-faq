<script lang="ts">
  import type { Question } from "../types/Question";
  import { locale } from "../stores/i18n";

  export let questions: Question[] = [];

  function toggleAccordion(index: number) {
    const content = document.getElementById(`content-${index}`);
    const icon = document.getElementById(`icon-${index}`);

    const downSVG = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4">
        <path fill-rule="evenodd" d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z" clip-rule="evenodd" />
      </svg>
    `;

    const upSVG = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="w-4 h-4">
        <path fill-rule="evenodd" d="M11.78 9.78a.75.75 0 0 1-1.06 0L8 7.06 5.28 9.78a.75.75 0 0 1-1.06-1.06l3.25-3.25a.75.75 0 0 1 1.06 0l3.25 3.25a.75.75 0 0 1 0 1.06Z" clip-rule="evenodd" />
      </svg>
    `;

    if (content && icon) {
      if (content.style.maxHeight && content.style.maxHeight !== "0px") {
        content.style.maxHeight = "0";
        icon.innerHTML = downSVG;
      } else {
        content.style.maxHeight = content.scrollHeight + "px";
        icon.innerHTML = upSVG;
      }
    }
  }
</script>

{#each questions as question (question.id)}
  <div class="border-b border-slate-200">
    <button
      on:click={() => toggleAccordion(question.id)}
      class="w-full flex justify-between items-center py-5 text-slate-800"
    >
      <span class="text-xl font-bold">
        {$locale === "fr" ? question.question_fr : question.question_en}
      </span>
      <span
        id="icon-{question.id}"
        class="text-slate-800 transition-transform duration-300"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
          fill="currentColor"
          class="w-4 h-4"
        >
          <path
            fill-rule="evenodd"
            d="M4.22 6.22a.75.75 0 0 1 1.06 0L8 8.94l2.72-2.72a.75.75 0 1 1 1.06 1.06l-3.25 3.25a.75.75 0 0 1-1.06 0L4.22 7.28a.75.75 0 0 1 0-1.06Z"
            clip-rule="evenodd"
          />
        </svg>
      </span>
    </button>
    <div
      id="content-{question.id}"
      class="max-h-0 overflow-hidden transition-all duration-300 ease-in-out"
    >
      <p class="pb-5 text-lg text-slate-500">
        {$locale === "fr" ? question.answer_fr : question.answer_en}
      </p>
    </div>
  </div>
{/each}
