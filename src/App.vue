<template>
    <v-app>
        <div class="pa-4">
            <router-link to="/">
                <v-btn color="primary" text>
                    Todos
                </v-btn>
            </router-link>
            |
            <router-link to="/about">
                <v-btn color="primary" text>
                    About
                </v-btn>
            </router-link>
        </div>
        <router-view />
    </v-app>
</template>
