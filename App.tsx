import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { NativeRouter, Route } from "react-router-native";
import { ApolloProvider } from '@apollo/client/react';
import { Switch } from 'react-router-dom';

import CharacterList from './pages/CharacterList';
import CharacterPage from './pages/CharacterPage';

const client = new ApolloClient({
  uri: 'https://rickandmortyapi.com/graphql',
  cache: new InMemoryCache()
});

export default function App() {
  return (    
    <View style={styles.container}>
      <ApolloProvider client={client}>
        <NativeRouter>
          <Switch>
            <Route path="/:id" component={CharacterPage} />
            <Route exact path="/" component={CharacterList} />
          </Switch>
        </NativeRouter>
      </ApolloProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
