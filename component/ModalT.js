import React, {Component, useEffect, useRef, useState} from 'react';
import * as Animatable from 'react-native-animatable';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Left,
  Right,
  Icon,
  Badge,
  Button,
  List,
  ListItem,
  Thumbnail,
  Accordion,
  View,
  Item,
  FooterTab,
  Footer,
} from 'native-base';
import {
  TouchableWithoutFeedback,
  ScrollView,
  StyleSheet,
  SectionList,
  TouchableOpacity,
} from 'react-native';
import SectionListContacts from 'react-native-sectionlist-contacts';
import axios from 'axios';
import {getColorByLetter} from './ColorGenerator';
function ExampleView() {
  const [iscontactSaved, setcontactSaved] = useState(false);
  const [showContent, setshowContent] = useState(false);
  let sectionList = useRef([]);
  const [data, setdata] = useState([]);
  const hiddenListRef = useRef([]);

  const bounce = () => {};
  useEffect(() => {
    axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then(res => {
        setdata(res.data);
      })
      .catch(err => console.log(`err`, err));
  }, []);

  const _renderItem = (item, index, section) => {
    // console.log('---custom-renderItem--', item, index, section);
    return (
      <View style={{backgroundColor: ''}}>
        <Text>{item.name}</Text>
      </View>
    );
  };
  let getdata = () => {
    let contactsArray = [];
    let aCode = 'A'.charCodeAt(0);
    for (let i = 0; i < 26; i++) {
      let currchar = String.fromCharCode(aCode + i);
      let obj = {
        title: currchar,
      };
      let currntcontacts = data.filter(item => {
        return item.name[0].toUpperCase() === currchar;
      });
      if (currntcontacts.length > 0) {
        currntcontacts.sort((a, b) => a.name.localeCompare(b.name));
        obj.data = currntcontacts;
        contactsArray.push(obj);
      }
    }
    return contactsArray;
  };
  console.log(`getdata`, getdata);
  const _renderHeader = item => {
    const name = item.item.name;
    let colo = getColorByLetter(name[0]);

    return (
      <View style={{marginLeft: 5, marginRight: 5, borderRadius: 20}}>
        <TouchableOpacity
          style={{backgroundColor: ''}}
          onPress={() => setshowContent(showContent != true)}
          // onPress={() => console.log(` item.item.name`, item.item.id)}
        >
          <List style={styles.headMain}>
            <View style={[styles.headerIcon, {backgroundColor: colo}]}>
              <Text>{name[0]}</Text>
            </View>

            <View style={{marginLeft: 9}}>
              <Text style={styles.headTitle}>{name}</Text>

              {iscontactSaved && (
                <View
                  style={{display: 'flex', flexDirection: 'row', marginTop: 0}}>
                  <Icon
                    style={{color: 'green', fontSize: 14, marginTop: 5}}
                    type="FontAwesome"
                    // name="phone"
                  />
                  <Text
                    style={{
                      color: 'green',
                      fontSize: 14,
                      marginLeft: 5,
                    }}>
                    Unsaved
                  </Text>
                </View>
              )}
            </View>

            <Right>
              <Text note>3:41pm</Text>
            </Right>
          </List>
        </TouchableOpacity>

        {showContent ? (
          <Animatable.View
            // ref={el => (hiddenListRef.current[index] = el)}
            style={{
              marginLeft: 20,
              marginTop: 0,
              padding: 10,
            }}
            animation="slideInDown"
            duration={100}>
            {iscontactSaved ? (
              <Text style={styles.addtoContact}>
                <Icon
                  style={{color: 'green', fontSize: 17}}
                  type="FontAwesome"
                  name="plus"
                />
                Add to contact
              </Text>
            ) : (
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 17,
                  fontFamily: 'sans-serif',
                }}>
                {/* mobile {item.phone} */}
                9087986876
              </Text>
            )}

            <View style={styles.contactDropdown}>
              <View style={styles.biWhite}>
                <Icon
                  type="FontAwesome"
                  name="phone"
                  style={{color: 'green'}}
                  onPress={() => Linking.openURL(`tel:${item.phone}`)}
                />
              </View>
              <View style={styles.biWhite}>
                <Icon
                  type="FontAwesome5"
                  name="comment-alt"
                  style={{color: '#7DCAF8'}}
                  onPress={() => Linking.openURL(`sms:${item.phone}`)}
                />
              </View>
              <View
                rounded
                style={styles.biWhite}
                onPress={() => alert('blok')}>
                <Icon
                  type="FontAwesome5"
                  name="video"
                  style={{color: 'green'}}
                />
              </View>
              <View
                rounded
                style={styles.biWhite}
                onPress={() => alert('blok')}>
                <Icon
                  type="FontAwesome5"
                  name="info-circle"
                  style={{color: 'gray'}}
                />
              </View>
            </View>
          </Animatable.View>
        ) : (
          <></>
        )}
      </View>

      //
    );
  };

  return (
    <Container>
      <ScrollView>
        <View style={{height: '100%', backgroundColor: '#E8F0F0'}}>
          <SectionList
            style={{
              backgroundColor: 'white',
              borderRadius: 20,

              marginTop: 20,
            }}
            sections={getdata()}
            // keyExtractor={(item, index, console.log(`object`, index))}

            keyExtractor={item => console.log(`index key--`, item)}
            renderSectionHeader={({section, index}) => (
              <View style={{backgroundColor: '', padding: 10}}>
                <Text style={{backgroundColor: '#E8F3F3'}}>
                  {section.title}
                </Text>
                {console.log(`index`, index)}
              </View>
            )}
            renderItem={_renderHeader}
          />
        </View>
      </ScrollView>
      <Footer style={{backgroundColor: '#f0f0f0'}}>
        <FooterTab style={styles.footartab}>
          <Text
            onPress={() => Linking.openURL(`tel:`)}
            style={styles.footerText}>
            Keypad
          </Text>

          <Text style={styles.footerText} onPress={() => alert('recent')}>
            Recent
          </Text>

          <Text style={styles.footerText} onPress={() => alert('recent')}>
            Contacts
          </Text>
        </FooterTab>
      </Footer>
    </Container>
  );
}

export default ExampleView;
const styles = StyleSheet.create({
  biWhite: {
    backgroundColor: 'white',
  },
  headTitle: {
    marginRight: 100,
    justifyContent: 'flex-start',
    padding: 5,

    fontFamily: 'sans-serif',
    fontSize: 19,

    marginTop: 3,
  },
  headMain: {
    flexDirection: 'row',
    justifyContent: 'space-between',

    padding: 3,
    // backgroundColor: '',

    // borderBottomWidth: 0.15,
    // borderTopWidth: 0.15,
    fontFamily: 'sans-serif',
    marginLeft: 5,
    marginTop: 5,

    borderBottomWidth: 0.2,
  },
  addtoContact: {
    textAlign: 'center',
    fontSize: 17,
    color: 'green',
    fontWeight: 'bold',
    fontFamily: 'sans-serif',
  },
  contactDropdown: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 50,
    marginRight: 50,
    marginTop: 10,
    fontFamily: 'sans-serif',
  },

  clrWhite: {color: 'white'},
  accrodion: {
    padding: 15,
    backgroundColor: 'white',
    marginTop: 20,
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
  },
  footartab: {
    backgroundColor: '#f0f0f0',
    // backgroundColor: 'white',
    justifyContent: 'space-between',
    textAlign: 'center',
    padding: 8,
    marginLeft: 40,
    marginRight: 40,
  },
  footerText: {fontWeight: 'bold', color: 'green', fontSize: 18},
  headerIcon: {
    width: 40,
    height: 40,
    backgroundColor: 'skyblue',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  //
});
