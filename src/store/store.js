import { createStore } from "vuex";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "@firebase/auth";
import {
  doc,
  setDoc,
  collection,
  onSnapshot,
  query,
  updateDoc,
  where,
  deleteDoc,
  getDocs,
} from "@firebase/firestore";
import { auth, db } from "../firebase";
import router from "../router";

const store = createStore({
  state() {
    return {
      todos: [],
      todosDemo: [],
      userAuth: false,
      userEmail: "",
    };
  },
  mutations: {
    // ***** MUTATIONS FOR DEMO ***** //
    addDemo(state, payload) {
      state.todosDemo.push(payload);
    },
    changeStatus(state, payload) {
      state.todosDemo[payload.index].checked = payload.checked;
    },
    deleteTodos(state) {
      state.todosDemo = [];
    },
    fillArr(state, payload) {
      state.todosDemo = payload;
      setTimeout(() => {
        for (let i = 0; i < state.todosDemo.length; i++) {
          state.todosDemo[i].index = i;
        }
      }, 50);
    },
    // ***** MUTATIONS FOR USER AUTH ***** //
    authTrue(state) {
      state.userAuth = true;
    },
    authFalse(state) {
      state.userAuth = false;
    },
    setUserEmail(state, payload) {
      state.userEmail = payload.userEmail;
    },
    resetUserEmail(state) {
      state.userEmail = "";
    },
    // ***** MUTATIONS FOR TODOS ***** //
    pushTodo(state, payload) {
      state.todos = [];
      payload.forEach((doc) => {
        state.todos.push(doc.data());
      });
      state.todos.sort(function (a, b) {
        return a.index - b.index;
      });
    },
    mutateStatusTodo(state, payload) {
      state.todos[payload.index].checked = payload.checked;
    },
    resetTodos(state) {
      state.todos = [];
    },
  },
  actions: {
    // ***** ACTIONS FOR DEMO ***** //
    changeArr(context) {
      const newList = context.state.todosDemo.filter(
        (todo) => todo.checked === false
      );
      context.commit("deleteTodos");
      context.commit("fillArr", newList);
    },
    // ***** ACTIONS FOR USER AUTH ***** //
    signUp(context, payload) {
      createUserWithEmailAndPassword(auth, payload.email, payload.password)
        .then((user) => {
          context.dispatch("setUser", { email: payload.email });
          context.commit("authTrue");
          context.commit("setUserEmail", {
            userEmail: payload.email,
          });
          router.push("/start");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    login(context, payload) {
      signInWithEmailAndPassword(auth, payload.email, payload.password)
        .then((user) => {
          context.commit("authTrue");
          context.commit("setUserEmail", {
            userEmail: payload.email,
          });
          router.push("/start");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    checkAuth(context) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          context.commit("authTrue");
          context.commit("setUserEmail", {
            userEmail: user.email,
          });
          context.dispatch("getTodos");
          router.push("/start");
        } else {
          context.commit("authFalse");
          router.push("/");
        }
      });
    },
    signOut(context) {
      signOut(auth)
        .then(() => {
          context.commit("authFalse");
          context.commit("resetUserEmail");
          context.commit("resetTodos");
          router.push("/login");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    // ***** ACTIONS FOR FIRESTORE ***** //
    async setUser(context, payload) {
      await setDoc(doc(db, "users", payload.email), {
        email: payload.email,
      });
    },
    async addTodo(context, payload) {
      const num = context.state.todos.length.toString();
      await setDoc(doc(db, "users", context.state.userEmail, "todos", num), {
        todo: payload.todo,
        important: payload.important,
        checked: payload.checked,
        index: context.state.todos.length,
      });
    },
    getTodos(context) {
      const todoRef = query(
        collection(db, "users", context.state.userEmail, "todos")
      );
      const unsub = onSnapshot(todoRef, (snap) => {
        context.commit("pushTodo", snap);
      });
      onAuthStateChanged(auth, (user) => {
        if (user) {
        } else {
          unsub();
        }
      });
    },
    async changeStatusTodo(context, payload) {
      context.commit("mutateStatusTodo", payload);
      const todoIndex = payload.index.toString();
      await updateDoc(
        doc(db, "users", context.state.userEmail, "todos", todoIndex),
        {
          checked: payload.checked,
        }
      );
    },
    deleteTodos(context) {
      const todosDelete = query(
        collection(db, "users", context.state.userEmail, "todos"),
        where("checked", "==", true)
      );
      const unsub = onSnapshot(todosDelete, (querySnap) => {
        querySnap.forEach((element) => {
          const num = element.data().index.toString();
          deleteDoc(doc(db, "users", context.state.userEmail, "todos", num));
        });
        context.dispatch("sortTodos");
        unsub();
      });
    },
    async sortTodos(context) {
      const todoRef = query(
        collection(db, "users", context.state.userEmail, "todos")
      );
      const snap = await getDocs(todoRef);
      let i = 0;
      snap.forEach((element) => {
        const num = element.data().index.toString();
        deleteDoc(doc(db, "users", context.state.userEmail, "todos", num));
        let newNum = i.toString();
        setDoc(doc(db, "users", context.state.userEmail, "todos", newNum), {
          todo: element.data().todo,
          important: element.data().important,
          checked: element.data().checked,
          index: i,
        });
        i++;
      });
    },
  },
});

export default store;
