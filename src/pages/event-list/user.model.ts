import { NativeStorage } from 'ionic-native';

export class UserModel{
  picture: string;
  email: string;
  name: string;

  getUserFromDB(){
     let env = this;
     env.name = "Harshal Gandhe";
      env.email = "";
      env.picture = "https://upload.wikimedia.org/wikipedia/commons/8/86/Victoria_Terminus%2C_Mumbai.jpg";
    NativeStorage.getItem('user')
    .then(function (data){
      env.name = data.name;
      env.email = data.email;
      env.picture = data.picture;
    }, function(error){
      console.log(error);
    });
  }

}