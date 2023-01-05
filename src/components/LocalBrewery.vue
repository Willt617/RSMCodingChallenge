<template>
  <h1>Find Your Local Brewery</h1>
  <v-select
    :items="states"
    v-model="state"
    label="Select State"
    :change="getBreweriesList(state, 1, true)"
  ></v-select>

  <v-row>
    <v-container v-if="state" fluid>
      <v-row dense>
        <v-expansion-panels variant="inset" class="my-4">
          <v-expansion-panel v-for="brewery in breweries" :key="brewery.name">
            <v-expansion-panel-title>{{
              brewery.name
            }}</v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-row class="mt-2">
                <v-col>
                  <v-row v-if="brewery.url"
                    ><a :href="brewery.url">{{ brewery.url }}</a></v-row
                  >
                  <v-row>
                    <span>{{
                      ` ${brewery.street} ${brewery.city}, ${brewery.state} `
                    }}</span></v-row
                  >
                </v-col>
              </v-row>
              <v-container>
                <GMapMap
                  v-if="brewery.pos"
                  :center="brewery.pos"
                  :zoom="7"
                  map-type-id="terrain"
                  style="width: 500px; height: 400px"
                >
                  <GMapMarker :position="brewery.pos"></GMapMarker>
                </GMapMap>
              </v-container>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
        <v-pagination
          v-model="page"
          :length="5"
          :change="getBreweriesList(state, page, false)"
        ></v-pagination>
      </v-row>
    </v-container>
  </v-row>
</template>

<script lang="ts">
import axios from "axios";

export default {
  data() {
    return {
      page: 1,
      breweries: [],
      states: [
        "Alabama",
        "Alaska",
        "Arizona",
        "Arkansas",
        "California",
        "Colorado",
        "Connecticut",
        "Delaware",
        "Florida",
        "Georgia",
        "Hawaii",
        "Idaho",
        "Illinois",
        "Indiana",
        "Iowa",
        "Kansas",
        "Kentucky",
        "Louisiana",
        "Maine",
        "Maryland",
        "Massachusetts",
        "Michigan",
        "Minnesota",
        "Mississippi",
        "Missouri",
        "Montana",
        "Nebraska",
        "Nevada",
        "New Hampshire",
        "New Jersey",
        "New Mexico",
        "New York",
        "North Carolina",
        "North Dakota",
        "Ohio",
        "Oklahoma",
        "Oregon",
        "Pennsylvania",
        "Rhode Island",
        "South Carolina",
        "South Dakota",
        "Tennessee",
        "Texas",
        "Utah",
        "Vermont",
        "Virginia",
        "Washington",
        "West Virginia",
        "Wisconsin",
        "Wyoming",
      ],
      state: "",
    };
  },
  created() {
    //this.getBreweriesList();
  },
  computed: {},
  watch: {},
  methods: {
    async getBreweriesList(state, page, stateChange) {
      state = state.replace(" ", "_");
      if (stateChange) {
        page = 1;
      }
      console.log("State: ", state);
      let response = await axios.get(
        "https://api.openbrewerydb.org/breweries?by_state=" +
          state +
          "&page=" +
          page +
          "&per_page=10"
      );
      this.breweries = response.data.map(this.formatBrewery);
      console.log("Response: ", response);
      console.log("Breweries", this.breweries);
      console.log("First Brewery: ", this.breweries[0]);
    },
    formatBrewery(d) {
      //Should be model
      return {
        name: d.name,
        street: d.street,
        city: d.city,
        state: d.state,
        url: d.website_url,
        pos:
          d.latitude && d.longitude
            ? { lat: Number(d.latitude), lng: Number(d.longitude) }
            : null,
      };
    },
  },
};
</script>
<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
  color: yellow;
  text-align: center;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
