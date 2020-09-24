import { Component, OnInit } from '@angular/core';
import { NavController, AlertController } from '@ionic/angular';


import { UsersService } from '../services/users/users.service';
import { LoadingService } from '../services/loading/loading.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  postData = {
    user: '',
    password: ''
  };

  isLoading = false;


  constructor(      
    private usersService: UsersService,
    private navCtrl: NavController,
    private alertCtrl: AlertController,    
    private loadingService: LoadingService
  ) {  }

  ngOnInit() {
  }

  validateInputs() {
    let username = this.postData.user.trim();
    let password = this.postData.password.trim();
    return (
      this.postData.user &&
      this.postData.password &&
      username.length > 0 &&
      password.length > 0
    );
  }
    

  iniciarSesion()
  {    
    if(this.validateInputs()){
      this.loadingService.showLoader();
      this.usersService.getUsers(this.postData).subscribe(
        (data) => {          
          this.loadingService.hideLoader();
          if (data["data"].length > 0 && data["data"][0].usuario == this.postData.user && data["data"][0].pass == this.postData.password){            
            this.usersService.logeedUserId = data["data"][0].id;
            this.usersService.logeedUserPerfil = data["data"][0].perfil;
            this.usersService.logeedUserObj = data["data"][0];            

            if(data["data"][0].perfil == "administrador")
              this.navCtrl.navigateRoot('/inicio');            
            else if(data["data"][0].perfil == "cliente")
              this.navCtrl.navigateRoot('/inicio');     
            else if(data["data"][0].perfil == "empleado")
              this.navCtrl.navigateRoot('/inicio');            
          }

          else {             
            this.showAlert("¡Error!", "Datos de inicio de sesión incorrectos..."); 
          }          
        },
        (error) => { 
          this.loadingService.hideLoader();
          this.showAlert("¡Error!", "Ocurrio un error en los datos"); 
          console.error(error); 
        }
      );
    }
  }
   

  async showAlert(title, subtitle)
  {
    const promp = await this.alertCtrl.create(
    {
      message: subtitle,
      subHeader: title,
      buttons: ['OK']
    });
    await promp.present();
  }
}
