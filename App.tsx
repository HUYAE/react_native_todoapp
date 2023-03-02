/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {SafeAreaView, StyleSheet} from 'react-native';
import React, {useState, useEffect} from 'react';
import DateHead from './components/DateHead';
import AddTodo from './components/AddTodo';
import Empty from './components/Empty';
import TodoList from './components/TodoList';
import AsyncStorage from '@react-native-community/async-storage';

const App = () => {
  const today = new Date();

  const [todos, setTodos] = useState([
    {id: 1, text: '작업확경 설정', done: true},
    {id: 2, text: '리액트 네이티브 기초 공부', done: false},
    {id: 3, text: '투두리스트 만들기', done: false},
  ]);

  useEffect(() => {
    console.log(todos);
    async function save() {
      try {
        await AsyncStorage.setItem('todos', JSON.stringify(todos));
      } catch (err) {
        console.log('Failed to save todos');
      }
    }
    save();
  }, [todos]);

  const onInsert = (text: string) => {
    const nextId =
      todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;

    const todo = {
      id: nextId,
      text,
      done: false,
    };

    setTodos(todos.concat(todo));
  };

  const onToggle = (id: any) => {
    const nextTodos = todos.map(todo =>
      todo.id === id ? {...todo, done: !todo.done} : todo,
    );
    setTodos(nextTodos);
  };

  const onRemove = (id: any) => {
    const nextTodos = todos.filter(todo => todo.id != id);
    setTodos(nextTodos);
  };

  return (
    <SafeAreaView style={styles.block}>
      <DateHead date={today} />
      {todos.length === 0 ? (
        <Empty />
      ) : (
        <TodoList todos={todos} onToggle={onToggle} onRemove={onRemove} />
      )}
      <AddTodo onInsert={onInsert} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  block: {
    flex: 1,
    backgroundColor: 'white',
  },
});

export default App;
