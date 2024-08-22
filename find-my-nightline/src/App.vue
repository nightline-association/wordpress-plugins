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
    <p class="title">Start typing the name of your university to find your Nightline.</p>

    <input
        v-model="rawSearchTerm"
        type="text"
        id="search-box"
        placeholder="University of..."
        autocomplete="off"
    />

    <section v-if="!showApology && matches.length > 0 && rawSearchTerm.length > 0">
      <p class="results-summary-text">Showing results for: <span>{{ rawSearchTerm }}</span></p>

      <ul class="results-list">
        <template v-for="institution in matches" :key="institution.name">
          <li v-if="institution.nightline" class="result">
            <a :href="institution.nightlineWebsite ?? '#'" target="_blank">
              <p class="institution">{{ institution.name }}</p>
              <p class="nightline">Nightline: {{ institution.nightline }}</p>
            </a>
          </li>

          <li @click="showApology = true" v-else class="result">
            <p class="institution">{{ institution.name }}</p>
          </li>
        </template>

      </ul>
    </section>

    <section class="no-nightline" v-else-if="showApology">
      <h2>
        Unfortunately, your institution is not yet covered by a Nightline.
      </h2>

      <p>
        To speak to someone, you could <a :href="samaritansUrl" target="_blank">contact the Samaritans</a> instead.
      </p>

      <p>
        Alternatively, you can refer to <a :href="setupUrl" target="_blank">our setup guidance</a> if you are interested in
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
  font-family: 'Lexend Deca',Helvetica,Arial,Lucida,sans-serif;
  color: #333;
  font-size: 16px;
  line-height: normal;
}

h1, h2, h3, h4, h5, h6 {
  font-family: 'Lexend Deca',Helvetica,Arial,Lucida,sans-serif;
  font-weight: 700;
  color: #133c8c;
}

h1 {
  font-size: 40px;
}

p.results-summary-text {
  font-size: 16px;
  color: #133c8c;
}

.results-summary-text span{
  color: #3b3b3b;
}

p.institution {
  font-weight: 700;
  color: #133c8c;
  font-size: 20px;
  padding: 5px 10px 5px 10px;
}

p.nightline {
  font-weight: 700;
  color: #133c8c;
  font-size: 16px;
  padding: 0px 10px 5px 10px;
}

/* Main content container */
div#main {
  transition: ease-in-out all 0.3s;
  margin: 40px auto 40px;
  max-width: 550px;
  overflow-x: hidden;
  overflow-y: auto;
}

div#main:focus-within {
  margin: 40px auto 40px;
}

/* Search box styling */
input#search-box {
  width: 100%;
  height: 25px;
  padding: 20px 10px;
  border: 3px solid #133c8c;
  color: #133c8c;
  margin: 15px 0;
  border-radius: 2px;
  outline: none;
  font-size: 20px;
  line-height: 25px;
}

input#search-box:hover, input#search-box:focus {
  box-shadow: rgba(0, 0, 0, .15) 0 1px 3px;
}

.results-list {
  list-style: none;
  width: 100%;
  border: 1px solid #ababab;
  border-radius: 2px;
  box-shadow: rgba(0, 0, 0, .15) 0 1px 3px;
  background-color: #ffffff;
  padding: 0;
}

.results-list li {
  padding: 8px;
  cursor: pointer;
  border-top: 1px solid #cdcdcd;
  transition: background-color .3s ease-in-out;
}

.results-list li:hover {
  background-color: #f7f7f7;
}

.results-list li:first-child {
  border-top: none;
}

.results-list .result a {
  text-decoration: none;
}

.no-nightline h2 {
  font-size: 20px;
}

.no-nightline p {
  line-height: normal;
  padding: 0px 0px 10px 0px;
}

</style>
