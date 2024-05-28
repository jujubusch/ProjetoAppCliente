import { View, Text, TextInput, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useFocusEffect } from '@react-navigation/native';

export default function Busca() {
    
    const[cliente, setCliente ] = useState( [] );
    const[error, setError ] = useState(false);
    const[edicao, setEdicao] = useState(false);
    const[clienteId, setClienteId] = useState(0);
    const[ClienteNome, setClienteNome] = useState();
    const[ClienteEmail, setClienteEmail] = useState();
    const[ClienteSenha, setClienteSenha] = useState();
    const[deleteResposta, setResposta] = useState(false);

    async function getCliente()
    {
        await fetch('http://10.139.75.12:5251/api/Clients/GetAllClients/', {
            method: 'GET',
            headers: {
              'content-type': 'application/json'
            }
          })
            .then( res => res.json())
            .then( json => setCliente( json ) )
            .catch( err => setError( true ) )
    }

    async function getCliente( id )
  {
    await fetch('http://10.139.75.12:5251/api/Clients/GetClientsId/' + id, {
      method:'GET',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then((response) => response.json())
    .then(json => {
      setClienteId(json.clienteId);
      setClienteNome( json.ClienteName);
      setClienteEmail( json.ClienteEmail);
      setClienteSenha( json.ClientePassword);
    });
  }

  async function editCliente()
  {
    await fetch('http://10.139.75.12:5251/api/Clients/UpdateClients/' + clienteId, {
      method:'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
      body:JSON.stringify({
        clienteId: clienteId,
        ClienteEmail: ClienteEmail,
        ClientePassword: ClienteSenha,
        userName: ClienteNome
      })
    })
    .then((response) => response.json())
    .catch(err => console.log( err ) );
    getCliente();
    setEdicao(false);
  }

  function showAlert(id, clienteName) {
    Alert.alert(
      '',
      'Deseja realmente excluir esse cliente ?',
      [
        { text: 'Sim', onPress: () => deleteCliente(id, clienteName)},
        { text: 'Não', onPress: () =>('')},
      ],
      { cancelable: false }
    );
  }

  async function deleteCliente(id, clienteName) {
    await fetch('http://10.139.75.12:5251/api/Clients/DeleteClients/' + id, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
    .then(res => res.json())
    .then(json => setResposta(json))
    .catch(err => setError(true))

    if(deleteResposta == true)
    {
      Alert.alert(
        '',
        'Cliente ' + clienteName + 'Excluído com Sucesso!',
        [
          { text: '', onPress: () => ('')},
          { text: 'Ok', onPress: () =>('')},
        ],
        { cancelable: false }
      );
      getCliente();
    }

    else {
      Alert.alert(
        '',
        'Cliente ' + clienteName + 'Não foi Excluído!',
        [
          { text: '', onPress: () => ('')},
          { text: 'Ok', onPress: () =>('')},
        ],
        { cancelable: false }
      );
      getCliente();
    }
  }

    useEffect( () => {
        getCliente();
    }, [] );

    useFocusEffect(
        React.useCallback(() => {
          getCliente();
        }, [])
      );

return (
    <View style={css.container}>
      {edicao == false ? 
       <FlatList 
       style={css.flat}
       data={cliente}
       keyExtractor={(item) => item.clienteId}
       renderItem={({ item }) => (
        <Text style={css.text}>
          {item.clienteName}
          <TouchableOpacity style={css.btnEdit} onPress={() => { setEdicao(true); getCliente(item.clienteId) }}>
              <Text style={css.btnLoginText}>EDITAR</Text>
          </TouchableOpacity>
          <TouchableOpacity style={css.btnDelete} onPress={() => showAlert(item.clienteId, item.clienteName )} >
              <Text style={css.btnLoginText}>EXCLUIR</Text>
          </TouchableOpacity>
        </Text>
      )}
    />
    :
    <View style={css.editar}>
        <TextInput 
        inputMode="text"
        style={css.input}
        value={ClienteNome}
        onChangeText={(digitado) => setClienteNome(digitado)}
        placeholderTextColor="white"
        />
        <TextInput 
        inputMode="email"
        style={css.input}
        value={ClienteEmail}
        onChangeText={(digitado) => setClienteEmail(digitado)}
        placeholderTextColor="white"
        />
        <TextInput 
        inputMode="text"
        secureTextEntry={true}
        style={css.input}
        value={ClienteSenha}
        onChangeText={(digitado) => setClienteSenha(digitado)}
        placeholderTextColor="white"
        />
        <TouchableOpacity style={css.btnCreate} onPress={() => editCliente()}>
            <Text style={css.btnLoginText}>SALVAR</Text>
        </TouchableOpacity>
    </View>
    }
    </View>

    )
}

const css = StyleSheet.create({
    container: {
        flexGrow: 1,
        width: "100%",
        alignItems: "center",
        backgroundColor: "#191919",
    },
    text: {
        color: "white"
    },
    searchBox: {
        width: "100%",
        height: 100,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    search: {
        width: "96%",
        height: 60,
        borderWidth: 1,
        borderColor: "white",
        borderRadius: 8,
        padding: 10,
        color: "white"
    },
    btnEdit: {
        backgroundColor: "#E1A2FA"
    },
    btnDelete: {
        backgroundColor: "#FA938E"
    },
})