import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCqVcCt36eNHJFZm6eeK0ekw8uP1Kx0igA",
  authDomain: "todo-9efbe.firebaseapp.com",
  projectId: "todo-9efbe",
  storageBucket: "todo-9efbe.appspot.com",
  messagingSenderId: "495065408118",
  appId: "1:495065408118:web:d3fea43ae46520ed5d7557",
  measurementId: "G-KB03TG6DZF",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth();
