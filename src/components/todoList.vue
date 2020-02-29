<template>
    <v-app class="todo-list__wrapper">
        <div class="todo-list-header">
            <h1
                class="todo-list-header__title display-3 font-weight-thin text-uppercase text-center"
            >
                Todo
            </h1>
            <v-text-field
                v-model="taskName"
                label="Что надо сделать?"
                class="todo-list-header__input"
                @keyup.enter="addNewTask"
            />
        </div>
        <div class="todo-list-filter__wrapper">
            <v-tabs background-color="primary" dark class="mb-4" v-model="tab" :centered="true">
                <v-tab v-for="item in filteredTodos" :key="item.tab">
                    {{ item.tab }}
                </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
                <v-tab-item v-for="item in filteredTodos" :key="item.tab">
                    <v-card
                        flat
                        outlined
                        centered
                        class="mx-auto mb-1 px-5"
                        max-width="600px"
                        v-for="todo in item.content"
                        :key="todo.id"
                    >
                        <TodoItem
                            :todo="todo"
                            @handleCheckTodo="handleCheckTodo(todo.id)"
                            @handleRemoveTodo="handleRemoveTodo(todo.id)"
                        />
                    </v-card>
                </v-tab-item>
            </v-tabs-items>
        </div>
    </v-app>
</template>

<script>
import TodoItem from '@/components/todoItem';

export default {
    name: 'App',
    components: {
        TodoItem,
    },
    data() {
        return {
            id: 1,
            tabCurrent: null,
            taskName: '',
            todos: [],
            tab: null,
        };
    },
    computed: {
        openedTodos() {
            return this.todos.filter(
                item =>
                    !item.complited &&
                    item.title.toLowerCase().includes(this.taskName.toLowerCase()),
            );
        },
        closedTodos() {
            return this.todos.filter(
                item =>
                    item.complited &&
                    item.title.toLowerCase().includes(this.taskName.toLowerCase()),
            );
        },
        allTodos() {
            return this.todos.filter(item =>
                item.title.toLowerCase().includes(this.taskName.toLowerCase()),
            );
        },
        filteredTodos() {
            return [
                {
                    tab: 'Открытые',
                    content: this.openedTodos,
                },
                {
                    tab: 'Закрытые',
                    content: this.closedTodos,
                },
                {
                    tab: 'Все',
                    content: this.allTodos,
                },
            ];
        },
    },
    methods: {
        addNewTask() {
            if (this.taskName.trim().length) {
                this.todos.unshift({
                    id: (this.id += 1),
                    title: this.taskName,
                    complited: false,
                });
                this.taskName = '';
            }
        },
        handleCheckTodo(id) {
            this.todos.forEach(todo => {
                if (todo.id === id) {
                    todo.complited = !todo.complited;
                }
            });
        },
        handleRemoveTodo(id) {
            this.todos = this.todos.filter(todo => todo.id !== id);
        },
        fliterClosed() {
            this.filterProp = 'Открытые';
        },
        fliterOpened() {
            this.filterProp = 'Закрытые';
        },
        fliterAll() {
            this.filterProp = 'Все';
        },
    },
};
</script>

<style lang="scss">
.todo-list {
    &-header {
        width: 100%;
        padding: 20px 20px 0;

        &__input {
            width: 400px;
            margin: 0 auto;
        }
    }
}
</style>
