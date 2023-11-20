<script setup>
import {computed, ref, watch} from "vue";

const props = defineProps({
  institutions: {
    required: true,
    type: Array,
  },
});

const samaritansUrl = 'https://www.samaritans.org';
const setupUrl = 'https://www.nightline.ac.uk/universities-student-unions/setting-up-a-nightline';

const rawSearchTerm = ref('');
const showApology = ref(false);

const matches = computed(() => {
  const searchTerm = rawSearchTerm.value.toLowerCase().trim();

  if (!searchTerm) {
    return [];
  }

  return props.institutions.filter((institution) => {
    return institution.name.toLowerCase().includes(searchTerm);
  });
});

watch(rawSearchTerm, async () => {
  showApology.value = false;
});
</script>

<template>
  <div id="main">
    <h1 class="title">Find Your Nightline</h1>
    <p class="title">Start typing your University's name to find your Nightline</p>

    <input
        v-model="rawSearchTerm"
        type="text"
        id="search-box"
        placeholder="Your institution here"
        autocomplete="off"
    />

    <section v-if="!showApology && matches.length > 0 && rawSearchTerm.length > 0">
      <h2 id="results-summary-text">Showing results for: {{ rawSearchTerm }}</h2>

      <ul id="results-list">
        <template v-for="institution in matches" :key="institution.name">
          <li v-if="institution.nightline" class="result">
            <a :href="institution.nightlineWebsite ?? '#'" target="_blank">
              <h3>{{ institution.name }}</h3>
              <h4>Nightline: {{ institution.nightline }}</h4>
            </a>
          </li>

          <li @click="showApology = true" v-else class="result">
            <h3>{{ institution.name }}</h3>
          </li>
        </template>

      </ul>
    </section>

    <section v-else-if="showApology">
      <h2 class="title" id="no-nightline-text">
        Unfortunately, your institution is not covered by a Nightline.
      </h2>

      <p>
        You could contact <a :href="samaritansUrl" target="_blank">Samaritans</a> instead.
      </p>

      <p>
        Or, refer to <a :href="setupUrl" target="_blank">our setup guidance</a> if you are interested in
        setting up a Nightline.
      </p>
    </section>

    <section v-else-if="rawSearchTerm.length > 0">
      <p id="results-summary-text">No results found. Try full institution name?</p>
    </section>
  </div>
</template>

<style scoped>
/* Block-level elements should be displayed as block */
article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {
  display: block;
}

/* Remove default list styling */
ol, ul {
  list-style: none;
}

/* Remove quotes from blockquote and q */
blockquote, q {
  quotes: none;
}

/* Remove default table styling */
table {
  border-collapse: collapse;
  border-spacing: 0;
}

/* Remove outline and text decoration from links */
a {
  outline: none;
  text-decoration: none;
}

/* Print styles */
@media print {
  * {
    background: 0 0 !important;
    color: #000 !important;
    text-shadow: none !important;
    filter: none !important;
    -ms-filter: none !important;
  }

  a, a:visited {
    text-decoration: underline;
  }

  a[href]:after {
    content: " (" attr(href) ")";
  }

  abbr[title]:after {
    content: " (" attr(title) ")";
  }

  .ir a:after, a[href^="javascript:"]:after, a[href^="#"]:after {
    content: "";
  }

  pre, blockquote {
    border: 1px solid #999;
    page-break-inside: avoid;
  }

  thead {
    display: table-header-group;
  }

  tr, img {
    page-break-inside: avoid;
  }

  img {
    max-width: 100% !important;
  }

  @page {
    margin: .5cm;
  }

  p, h2, h3 {
    orphans: 3;
    widows: 3;
  }

  h2, h3 {
    page-break-after: avoid;
  }
}

/* Text selection styling */
::selection, ::-moz-selection, ::-webkit-selection {
  background: #4096ee;
  color: #fff;
}

/* Typography */
p {
  font-family: Verdana, Arial, sans-serif;
  line-height: 1.6;
  color: #333;
  font-size: 16px; /* Adjust as needed */
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'ArialRoundedMTBold', 'arial rounded mt 700', Arial, Helvetica, sans-serif;
  font-weight: 700;
  line-height: 1.6;
  color: #353391;
}

h1 {
  font-size: 24px;
  letter-spacing: .033em;
}

h2 {
  font-size: 16px;
}

h3 {
  font-size: 14px;
}

h4, h5 {
  font-size: 12px;
}

h6 {
  font-size: 8px;
}

/* Main content container */
div#main {
  transition: ease-in-out all 0.3s;
  margin: 140px auto 20px;
  max-width: 550px;
  overflow-x: hidden;
  overflow-y: auto;
}

div#main:focus-within {
  margin: 40px auto 20px;
}

/* Search box styling */
input#search-box {
  width: calc(100% - 30px);
  height: 25px;
  padding: 7px 14px;
  border: 2px solid #AED3EE;
  color: #322B7B;
  margin: 15px 0;
  border-radius: 2px;
  outline: none;
  font-size: 20px;
  line-height: 25px;
}

input#search-box:hover, input#search-box:focus {
  box-shadow: rgba(0, 0, 0, .15) 0 1px 3px;
}

ul#results-list {
  list-style: none;
  width: calc(100% - 10px);
  margin-top: 4px;
  border: 1px solid #ababab;
  border-radius: 2px;
  box-shadow: rgba(0, 0, 0, .15) 0 1px 3px;
}

ul#results-list li {
  padding: 8px;
  cursor: pointer;
  border-top: 1px solid #cdcdcd;
  transition: background-color .3s ease-in-out;
}

ul#results-list li:hover {
  background-color: #f7f7f7;
}

ul#results-list li:first-child {
  border-top: none;
}

ul#results-list li h3, ul#results-list li h4 {
  transition: color .3s ease-in-out;
  color: #333;
  line-height: 1.2;
}

ul#results-list li:hover h3, ul#results-list li:hover h4 {
  color: #3b3b3b;
  font-weight: 700;
}
</style>
