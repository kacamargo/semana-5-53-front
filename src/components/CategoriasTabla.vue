<template>
  <div id="app">
    <v-app id="inspire">
      <v-data-table
        :headers="headers"
        :items="categorias"
        sort-by="id"
        class="elevation-1"
        :loading= "barraCargando"
        loading-text="Cargando datos... Por favor espere"
      >
        <template v-slot:top>
          <v-toolbar
            flat
          >
            <v-toolbar-title>Lista de Categorías</v-toolbar-title>
            <v-divider
              class="mx-4"
              inset
              vertical
            ></v-divider>
            <v-spacer></v-spacer>
            <v-dialog
              v-model="dialog"
              max-width="500px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="primary"
                  dark
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  Agregar Categoria
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">{{ formTitle }}</span>
                </v-card-title>
    
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col
                        cols="12"
                        sm="12"
                        md="12"
                      >
                        <v-text-field
                          v-model="editedItem.nombre"
                          label="Nombre de categoría"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col
                        cols="12"
                        sm="12"
                        md="12"
                      >
                        <v-textarea
                          outlined
                          counter="250"
                          v-model="editedItem.descripcion"
                          label="Descripción"
                          no-resize
                          auto-grow
                        ></v-textarea>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
    
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="close"
                  >
                    Cancelar
                  </v-btn>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="save"
                  >
                    Guardar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="subtitle-1 mb-1" >¿Estás seguro de cambiar el estado de la categoría?</v-card-title >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete">Cancelar</v-btn>
                  <v-btn color="blue darken-1" text @click="changeStateItem">OK</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">         
              <v-icon
                v-bind="attrs"
                v-on="on"
                small
                class="mr-2"
                @click="editItem(item)"
              >
                mdi-pencil
              </v-icon>
            </template>
            <span>Editar</span>
          </v-tooltip>

          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">           
              <v-icon
                v-bind="attrs"
                v-on="on"
                medium
                @click="deleteItem(item)"
              >
                <template v-if= "item.estado">
                  mdi-toggle-switch
                </template>
                <template v-else>
                  mdi-toggle-switch-off-outline
                </template>
              </v-icon>
            </template>
            <span>Cambiar</span>
          </v-tooltip>
        </template>
        <template v-slot:no-data>
          <v-btn
            color="primary"
            @click="initialize"
          >
            Reset
          </v-btn>
        </template>
      </v-data-table>
    </v-app>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  
  data: () => ({
    dialog: false,
    dialogDelete: false,
    barraCargando: true,
    headers: [
      { text: 'ID' , value: 'id'},
      {
        text: 'Categoria',
        align: 'start',
        sortable: true,
        value: 'nombre',
      },
      { text: 'Descripción', value: 'descripcion' },
      { text: 'Estado', value: 'estado' },
      { text: 'Acciones', value: 'actions', sortable: false },
    ],
    desserts: [],
    categorias: [],
    editedIndex: -1,
    editedItem: {
      id: 0,
      nombre: '',
      descripcion: '',
      estado: 0,
    },
    defaultItem: {
      id: 0,
      nombre: '',
      descripcion: '',
      estado: 0,
    },
  }),

  computed: {
    formTitle () {
      return this.editedIndex === -1 ? 'Nueva Categoría' : 'Editar Categoría'
    },
  },

  watch: {
    dialog (val) {
      val || this.close()
    },
    dialogDelete (val) {
      val || this.closeDelete()
    },
  },

  created () {
    this.list()
  },

  methods: {
    initialize () {
      this.desserts = [
        {
          nombre: 'Frozen Yogurt',
          descripcion: 159,
          estado: 6.0,
        }
      ]
    },

    list(){
      axios.get('http://localhost:3000/api/categoria/list')
      .then(response => {
        this.categorias = response.data
        this.barraCargando= false
      })
      .catch(error => {
        return error
      })
    },

    editItem (item) {
      this.editedIndex = item.id
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      this.editedIndex = this.categorias.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    changeStateItem () {
      if(this.editedItem.estado === 1) {
        axios.put('http://localhost:3000/api/categoria/deactivate' , {
          "id": this.editedItem.id
        }) 
        .then( response => {
          this.list()
        })
        .catch( error =>{
          return error
        })
      } else {
        axios.put('http://localhost:3000/api/categoria/activate' , {
          "id": this.editedItem.id
        })
        .then( response => {
          this.list()
        })
        .catch( error =>{
          return error
        })
      }
      this.closeDelete()
    },

    close () {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete () {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    save () {
      if (this.editedIndex > -1) {
        axios.put('http://localhost:3000/api/categoria/update', {
          "nombre": this.editedItem.nombre, 
          "id": this.editedItem.id, 
          "descripcion": this.editedItem.descripcion })
          .then(response => {
             this.list()
          })
          .catch(error => {
            return error
          })
        Object.assign(this.categorias[this.editedIndex], this.editedItem)
      } else {
        axios.post('http://localhost:3000/api/categoria/add', {
          "nombre": this.editedItem.nombre, 
          "descripcion": this.editedItem.descripcion,
          "estado": 1 })
          .then(response => {
             this.list()
          })
          .catch(error => {
            return error
          })
      }
      this.close()
    }
  },

}
</script>