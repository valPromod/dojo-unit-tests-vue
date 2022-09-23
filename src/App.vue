<template>
  <v-app>
    <div class="d-flex">
      <v-navigation-drawer permanent app>
        <v-list-item link :href=home>
          <v-list-item-content>
            <v-list-item-title class="text-h6">
              {{ projet }}
            </v-list-item-title>
            <v-list-item-subtitle>
              v1.0.0
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list
          dense
          nav
        >
          <v-list-item
            v-for="(compo, i) in MyComponents"
            :key="i"
            link
            :to="compo.href"
          >
            <v-list-item-content>
              <v-list-item-title>{{ compo.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main>
        <v-container fluid>
          <router-view />
        </v-container>
      </v-main>
    </div>
  </v-app>
</template>

<script lang="ts">
import Vue from "vue";

export default Vue.extend({
  name: "App",

  data: () => ({
    projet: "Pilotage GCom",
    home: "/",
    MyComponents : [
      {
        text: "Projection du parc Magasin",
        href: "/shops/estimated",
      }
    ],
  }),

  mounted() {
    this.$log.error("Une erreur est survenue");
  },

});

</script>
