import * as React from 'react';
import { Button, Image, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Constants from 'expo-constants';
import * as Permissions from 'expo-permissions';

export default class App extends React.Component {
  state = {
    image: null,
  };

  render() {
    let { image } = this.state;

    return (
      <View style={{ flex: 1, justifyContent:'center' }}>
        
        <View style={{ backgroundColor:'yellow', alignItems:'center', justifyContent:'center', height: 250 }}>  
          {image &&
            <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
        </View>

        <View style={{ flexDirection:'row', justifyContent: 'space-between', }}>  
          <Button
            title="Tomar Foto"
            onPress={this._takePicture}
          />        
          <Button
            title="Subir Imagen"
            onPress={this._loadImage}
          />
        </View>

      </View>
    );
  }

  componentDidMount() {
    this.getPermissionAsync();
  }

  getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!');
      }
    }
  }

  /*
  * response: 
  *  Object {
  *    "cancelled": false,
  *    "height": 574,
  *    "type": "image",
  *    "uri": "file://path.png",
  *    "width": 766,
  *  }
  * 
  */

  _loadImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      //base64 : true,
    });

    console.log(result.mediaTypes);
    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

  _takePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      //base64 : true,
    });

    console.log(result.mediaTypes);
    console.log(result);

    if (!result.cancelled) {
      this.setState({ image: result.uri });
    }
  };

}