import React, {useState, useEffect} from "react";
import { 
  StyleSheet,
  View,
  Text,
  Button,
  ScrollView,
  TextInput,
  } from 'react-native';

  import CheckBox from "@react-native-community/checkbox";
  import {
    ref,
    onValue,
    push,
    update,
    remove,
  } from 'firebase/database';

  import {db} from './firebase-config';

  const App = () => {

    const [todos, setTodos] = useState({});
    const [presentTodo, setPresentTodo] = useState('');
    const todosKeys = Object.keys(todos);

    useEffect( ()=> {
      return onValue(ref(db, '/todos'), querySnapshot => {
        let data = querySnapshot.val() || {};
        let todoItens = {... data};
        setTodos(todoItens);
      });
    }, []);

    function addNewTodo(){
      push(ref(db,'/todos'), {
        done : false,
        title : presentTodo,
      });
      setPresentTodo('');
    }

    function clearTodos() {
      remove(ref(db, '/todos'));
    }

    return (
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.contentContentStyle}>

        <TextInput
            placeholder="Nova Tarefa"
            value={presentTodo}
            style={styles.textImput}
            onChangeText={text => {
              setPresentTodo(text);
            }}
            onSubmitEditing={addNewTodo}
        />

          <View
            style={{marginTop:0}}>
            <Button
              title="Limpar Lista de Tarefas"
              onPress={clearTodos}
              color="red"
            />
          </View>

          <View>
            {todosKeys.length> 0 ? (
              todosKeys.map(key => (
                <ToDoItem key={key} id={key} todoItem={todos[key]}/>
              ))
            ) : (
              <Text style={{marginTop:10}}>
                Não há tarefas pendentes...
              </Text>
            )}
          </View>
      </ScrollView>
    );

  };

  const ToDoItem = ({todoItem: {title, done}, id}) => {

    const [doneState, setDone] = useState(done);

    const onCheck = isChecked => {
      setDone(isChecked);
      update(ref(db, '/todos'), {
        [id]: {
          title,
          done: !doneState,
        },
      });
    };
    return(
      <View style={styles.todoItem}>
        <CheckBox onValueChange={onCheck} value={doneState}/>
        <Text style={[styles.todoText, {opacity: doneState ? 0.2 : 1 }]}>
          {title}
        </Text>
      </View>
    );
  };

  const styles = StyleSheet.create({
    todoItem: {
      flexDirection: 'row',
      marginVertical: 10,
      alignItems: 'center',
    },

    todoText: {
      paddingHorizontal: 5,
      fontSize: 16,
    },

    container: {
      flex: 1,
      paddingTop: 12,
    },

    contentContentStyle: {
      padding: 24,
    },

    textImput:{
      borderWidth: 1,
      borderColor: '#afafaf',
      borderRadius: 5,
      paddingHorizontal: 10,
      marginVertical: 20,
      fontSize: 20,
    },

  });

  export default App;


