import React from 'react';
import {Text, View,} from 'react-native';
import {Button, Card} from 'react-native-elements';
import Deck from "./src/components/Deck";

const DATA = [
    {id: 1, text: 'Card #1', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg'},
    {id: 2, text: 'Card #2', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg'},
    {id: 3, text: 'Card #3', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg'},
    {id: 4, text: 'Card #4', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg'},
    {id: 5, text: 'Card #5', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-04.jpg'},
    {id: 6, text: 'Card #6', uri: 'http://www.fluxdigital.co/wp-content/uploads/2015/04/Unsplash.jpg'},
    {id: 7, text: 'Card #7', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-09.jpg'},
    {id: 8, text: 'Card #8', uri: 'http://imgs.abduzeedo.com/files/paul0v2/unsplash/unsplash-01.jpg'},
];

class App extends React.Component {

    render() {
        return (
            <View style={styles.container}>
                <Deck
                    data={DATA}
                    renderCard={App.renderCard}
                    renderNoMoreCards={App.renderNoMoreCards}
                />
            </View>
        );
    }

    static renderCard(item) {
        return (
            <Card
                key={item.id}
                image={{uri: item.uri}}
                title={item.text}>

                <Button title={'View Now'} onPress={() => {
                }} icon={{name: 'code'}} backgroundColor={'#03a9f4'}/>

            </Card>
        );
    }

    static renderNoMoreCards() {
        return (
            <Card title="All Done!">
                <Text style={{marginBottom: 10, alignSelf: 'center'}}>
                    There's no more content here!
                </Text>

                <Button
                    backgroundColor="#03A9F4"
                    title="Get more!"
                    onPress={() => {
                    }}/>
            </Card>
        );
    }

}

const styles = {
    container: {
        marginTop: 20,
        backgroundColor: '#fff',
        flex: 1,
        flexDirection: 'column',
    }
};

export default App