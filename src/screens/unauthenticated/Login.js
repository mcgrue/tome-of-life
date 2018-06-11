import { AccessToken, LoginManager } from 'react-native-fbsdk'; // import AccessToken and LoginManager
import React from 'react';
import { TextInput, View, Button } from 'react-native';
import firebase from 'react-native-firebase';

export default class Login extends React.Component {
  render() {
    const _facebookLogin = async () => {
      console.log('..._facebookLogin');
      try {
        const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);

        if (result.isCancelled) {
          throw new Error('User cancelled request'); // Handle this however fits the flow of your app
        }

        console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);

        // get the access token
        const data = await AccessToken.getCurrentAccessToken();

        if (!data) {
          throw new Error('Something went wrong obtaining the users access token'); // Handle this however fits the flow of your app
        }

        // create a new firebase credential with the token
        const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);

        // login with credential
        await firebase.auth().signInAndRetrieveDataWithCredential(credential);

      } catch (e) {
        console.error(e);
      }
    };

    return (
        <View>
            {/*}
            <TextInput
                placeholder={'Email Address'}
                onChangeText={this._updateEmail}
                value={this.state.email}
            />

            <TextInput
                placeholder={'Password'}
                onChangeText={this._updatePassword}
                value={this.state.password}
            />

            <Button
              title={'Sign In'}
              onPress={this._signIn}
            />
          */}

            <Button
              title={'Sign In with Facebook'}
              onPress={_facebookLogin}
            />
        </View>
    );
  }
}