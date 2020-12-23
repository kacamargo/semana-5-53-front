<template>
    <v-app id="inspire">

    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Panel de Control</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
    >
      <!--  -->
    <v-card
      class="mx-auto"
      width="300"
    >
      <v-list>
        <v-list-item
        :to="{name: 'Home'}">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>
  
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>
  
        <v-list-group
          prepend-icon="mdi-clipboard-list"
        >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Inventarios</v-list-item-title>
              </v-list-item-content>
            </template>
  
            <v-list-item
              v-for="([title, icon, ruta], i) in admins"
              :key="i"
              link
              :to="{name: ruta}"
              exact
            >
              <v-list-item-title v-text="title"></v-list-item-title>
  
              <v-list-item-icon>
                <v-icon v-text="icon"></v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
  
          <v-list-group
          prepend-icon="mdi-account-supervisor-circle-outline"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>Gestor Users</v-list-item-title>
              </v-list-item-content>
            </template>
  
            <v-list-item
              v-for="([title, icon, ruta], i) in cruds"
              :key="i"
              link
              :to="{name: ruta}"
              exact
            >
              <v-list-item-title v-text="title"></v-list-item-title>
  
              <v-list-item-icon>
                <v-icon v-text="icon"></v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
      </v-list>
    </v-card>
    </v-navigation-drawer>

    <v-main class="grey lighten-2">
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'ZonaSegura',

  components: {

  },

  data: () => ({
    //
    drawer: null,
    admins: [
      ['Categorias', 'mdi-floor-plan', 'Categoria'],
      ['Productos', 'mdi-microsoft-xbox-controller-battery-empty', 'Articulo'],
    ],
    cruds: [
      ['Usuarios', 'mdi-account-box-multiple-outline', 'Usuario'],

    ]
  }),
};
</script>