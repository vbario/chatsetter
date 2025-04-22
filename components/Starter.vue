<template>
    <div class="bg-white shadow sm:rounded-lg p-6">        
        <!-- <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.1.2/dist/tailwind.min.css" rel="stylesheet"> -->
        <!-- <div class="test">
            <p @click="setUid()">{{$store.state.auth.uid}}</p>
            <p @click="addToUid()">+ '1'</p>
            <ul>
                <li v-for="todo in todos" :key="todo.text">
                    <input :checked="todo.done" @change="toggle(todo)" type="checkbox">
                    <span :class="{ done: todo.done }">{{ todo.text }}</span>
                </li>
                <li><input @keyup.enter="addTodo" placeholder="What needs to be done?"></li>
            </ul>
        </div> -->

      <h2 class="text-2xl leading-7 font-semibold">Demo</h2>
      <!-- <p>bbb</p> -->
    </div>
</template>

<script>
export default {
  name: 'Starter'
}
</script>

<style lang="scss">
</style>
