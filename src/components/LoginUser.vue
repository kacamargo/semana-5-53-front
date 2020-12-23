<template>
    <div>
        <v-container>
            <v-row class="justify-center">
                <div>
                    <v-sheet
                        height=40rem
                        width=30rem
                        class="indigo darken-2"
                        >
                    </v-sheet>
                </div>
                <div>
                    <v-sheet
                        color="white"
                        height=40rem
                        width=30rem
                        class="pa-10"
                        >
                        <div class=" pa-8">
                        <h3 class="text--secondary">Crear nueva cuenta</h3>
                        <div class="d-flex justify-center pa-8">
                            <h1>INICIO DE SESION</h1>
                        </div>
                        <div class="d-flex align-center">
                            <v-col
                            cols="12"
                            md="30"
                            >  
                            <v-text-field
                                label="E-mail"
                                hide-details="auto"
                                outlined
                                v-model="login.email"
                            ></v-text-field>
                            </v-col>
                        </div>
                        <div>
                            <v-col
                            cols="12"
                            md="30"
                            >
                            <v-text-field
                                label="Contraseña"
                                v-model="login.password"
                                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="show ? 'text' : 'password'"
                                name="input-10-2"
                                value=""
                                class="input-group--focused"
                                @click:append="show = !show"
                                outlined
                            ></v-text-field>
                            </v-col>
                            <v-col
                            cols = "12"
                            md= "15"
                            >
                            <div class="d-flex justify-space-between text-color">
                            <p class="text--secondary">Olvide mi contraseña?</p>
                            <p class="text--secondary">No eres miembro aun?</p>
                            </div>
                            </v-col>
                        </div>
                    </div>
                    <div class="d-flex justify-center my-2">
                        <v-btn
                        x-large
                        color="indigo darken-2"
                        dark
                        @click="loginUser"
                        >
                        Iniciar Sesion
                        </v-btn>
                    </div>
                    </v-sheet>
                </div>
            </v-row>
        </v-container>
        <pre>
    </pre>
    </div>
</template>

<script>
import swal from 'sweetalert'

export default {

 data: () => {
    return {
        login: {
            email: '',
            password: ''
        },
    show: false,
    password: 'Password',
    rules: {
        required: value => !!value || 'Required.',
        emailMatch: () => (`The username and password you entered don't match`),
            },
        }
  },
  methods: {
      async loginUser(){
          try {
            this.$axios.post('/usuario/login', this.login)
              .then((response) =>{
                let token = response.data.tokenReturn
                if (token){
                  localStorage.setItem('token', token)
                  swal('Exito!', "Ha iniciado sesion correctamente","success")
                  this.$router.push('/segura')
                }
              })
              .catch(error => { 
                swal("Ooops!", "Usuario o contraseña incorrecta!", "error")

              })
          } catch (error) {
              swal("Ooops!", "Algo salió mal!", "error")
          }

      }
  }
}
</script>