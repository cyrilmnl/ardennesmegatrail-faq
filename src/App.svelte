<svelte:options
  customElement={{ tag: "ardennesmegatrail-faq", shadow: "none" }}
/>

<script lang="ts">
  import { onMount } from "svelte";
  import { getThemes } from "./lib/api/theme";
  import { getQuestions } from "./lib/api/question";
  import type { Theme } from "./lib/types/Theme";
  import type { Question } from "./lib/types/Question";
  import Accordion from "./lib/components/Accordion.svelte";
  import { t, locale, locales } from "./lib/stores/i18n";
  import "./app.css";

  let themes: Theme[] = [];
  let questions: Question[] = [];

  onMount(() => {
    getThemes().then((data) => {
      themes = data as Theme[];
    });

    getQuestions().then((data) => {
      questions = data as Question[];
    });
  });
</script>

<main class="container mx-auto p-4">
  <p>
    <select bind:value={$locale} class="text-gray-800 bg-white">
      {#each locales as l}
        <option value={l} class="text-gray-800 bg-white">
          {l.toUpperCase()}
        </option>
      {/each}
    </select>
  </p>

  <h2 class="text-5xl text-gray-800 font-title text-center">
    {$t("faqTitle")}
  </h2>

  <h3 class="text-2xl text-gray-400 uppercase font-black text-center">
    {$t("faqSubtitle")}
  </h3>

  <div class="flex flex-col items-center">
    {#each themes as theme (theme.id)}
      <div class="my-4 w-full xl:w-5/6 2xl:w-3/4 mx-auto">
        <h4 class="text-3xl font-bold text-center my-4 w-full">
          {$locale === "fr" ? theme.name_fr : theme.name_en}
        </h4>

        <Accordion
          questions={questions.filter((q) => q.theme_id === theme.id)}
        />
      </div>
    {/each}
  </div>
</main>
