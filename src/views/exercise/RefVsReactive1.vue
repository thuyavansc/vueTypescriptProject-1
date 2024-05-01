<template>
  <div class="container">
    <header>
      <h1>Refs vs Reactive Data ?</h1>
      <p>Just Intro</p>
      <hr />
    </header>
    <main>
      <h1>{{ numberTwo }}</h1>
      <button @click="numberTwo++" class="bg-red-500 p-2 m-2 rounded-full">
        Increase
      </button>
      <hr />
      <h1>{{ person.name }} & {{ person.age }}</h1>
      <button @click="updatePerson" class="bg-green-500 p-2 m-2 rounded-full">
        Update person details
      </button>
      <hr />
      <h1>Name = {{ personTwo.name }} | {{ personTwo.id }}</h1>
      <button @click="updatePersontwo" class="bg-blue-500 m-2 p-2 rounded-full">
        Change details
      </button>
      <hr />
      <button @click="listofEvents" class="bg-blue-500 m-2 p-2 rounded-full">
        Change listofEvents
      </button>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";

const numberTwo = ref(2);
// const numberThree = reactive(2);
//Create ref variable
const person = ref({ name: "Mark", age: 24 });
// const person = { name: "Mark", age: 24 };

//create method
const updatePerson = () => {
  // console.log(person.value.name);
  person.value.name = "Anthony";
};

const personTwo = reactive({ name: "time", id: 11 });
//
const updatePersontwo = () => {
  console.log(personTwo);
  personTwo.name = "Google";
};

const listofEvents = () => {
  // Log key codes
  //console.log('Key codes:', Object.keys(window).filter(key => key.startsWith('KEY_')));

  // Log event modifiers
  console.log(
    "Event modifiers:",
    Object.keys(window).filter((key) => key.startsWith("on"))
  );
};
</script>

<script></script>

<style></style>
