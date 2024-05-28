import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Animated } from 'react-native'
import React, { useState, useRef } from 'react'
import { useFocusEffect } from '@react-navigation/native';

export default function Inserir() {

  const fade = useRef( new Animated.Value(0) ).current;

  useFocusEffect(
    React.useCallback( () => {
      fade.setValue(0);
      Animated.timing(fade, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }).start();
    }, [] )
  );

  const[nome, setNome] = useState ("");
  const[sobrenome, setSobrenome] = useState("");
  const[email, setEmail] = useState("");
  const[senha, setSenha] = useState("");
  const[rua, setRua] = useState("");
  const[numero, setNumero] = useState("");
  const[cidade, setCidade] = useState("");
  const[Cep, setCEP] = useState("");
  const[telefone, setTelefone] = useState("");
  const[erro, setErro] = useState("");
  const[sucesso, setSucesso] = useState("");

  async function Cadastro() 
  {
    await fetch('https://fakestoreapi.com/users',{
            method: 'POST',
            headers:{
                'content-type' : 'application/json'
            },
            body: JSON.stringify({
              email: email,
              password: senha,
              name:{
                  firstname: nome,
                  lastname: sobrenome
              },
              address:{
                  city: cidade,
                  street: rua,
                  number: numero,
                  zipcode: Cep,
                  geolocation:{
                      lat:'-37.3159',
                      long:'81.1496'
                  }
              },
              phone:telefone
          })
        })
        .then( res => (res.ok == true) ? res.json () : false)
        .then(json => {
          setSucesso((json.id) ? true : false);
          setErro((json.id) ? false : true);
      } )
        .catch(err => setErro( true ) )
  }

  return (
    <ScrollView contentContainerStyle={css.container}>
      <Animated.View style={{ opacity: fade }}>
      <Text style={css.text}>Inserir Cliente</Text>
      { sucesso ? 
        <Text>Seu Cliente foi Realizado com Sucesso!</Text>
      :
      <>
      <TextInput 
        style={css.campos}
        placeholder="Nome:"
        placeholderTextColor={"gray"}
        TextInput={nome}
        onChangeText={(digitado) => setNome( digitado ) }
      />
      <TextInput 
        style={css.campos}
        placeholder="Sobrenome:"
        placeholderTextColor={"gray"}
        TextInput={sobrenome}
        onChangeText={(digitado) => setSobrenome( digitado ) }
      />
      <TextInput 
        style={css.campos}
        placeholder="Email:"
        placeholderTextColor={"gray"}
        TextInput={email}
        onChangeText={(digitado) => setEmail( digitado ) }
      />
      <TextInput 
        style={css.campos}
        placeholder="Senha:"
        placeholderTextColor={"gray"}
        TextInput={senha}
        onChangeText={(digitado) => setSenha( digitado ) }
      />
      <TextInput 
        style={css.campos}
        placeholder="Rua:"
        placeholderTextColor={"gray"}
        TextInput={rua}
        onChangeText={(digitado) => setRua( digitado ) }
      />
      <TextInput 
        style={css.campos}
        placeholder="Número da Casa:"
        placeholderTextColor={"gray"}
        TextInput={numero}
        onChangeText={(digitado) => setNumero( digitado ) }
      />
      <TextInput 
        style={css.campos}
        placeholder="Cidade:"
        placeholderTextColor={"gray"}
        TextInput={cidade}
        onChangeText={(digitado) => setCidade( digitado ) }
      />
      <TextInput 
        style={css.campos}
        placeholder="CEP:"
        placeholderTextColor={"gray"}
        TextInput={Cep}
        onChangeText={(digitado) => setCEP( digitado ) }
      />
      <TextInput 
        style={css.campos}
        placeholder="Telefone:"
        placeholderTextColor={"gray"}
        TextInput={telefone}
        onChangeText={(digitado) => setTelefone( digitado ) }
      />
      <TouchableOpacity style={css.btnCadastrar}>
        <Text style={css.btnCadastrarText} onPress={Cadastro}>CADASTRAR</Text>
      </TouchableOpacity>
      {erro && <Text style={css.text}>Revise cuidadosamente os campos!</Text>}
    </>
  }
      </Animated.View>
    </ScrollView>
  )
}

const css = StyleSheet.create({
  container: {
    backgroundColor: "#191919",
    color: "white",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    marginTop: 35,
    fontSize: 30,
    color: "white"
  },
  campos: {
    backgroundColor: "white",
    width: 350,
    height: 60,
    marginTop: 30,
    marginLeft: -10,
    borderRadius: 10,
    fontSize: 15,
  },
  btnCadastrar: {
    backgroundColor: "pink",
    width: 300,
    height: 50,
    marginTop: 30,
    borderRadius: 5,
    margin: 30
  },
  btnCadastrarText: {
    fontSize: 27,
    textAlign: "center"
  }
})