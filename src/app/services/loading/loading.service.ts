import { Injectable } from '@angular/core';
import { LoadingController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class LoadingService {
  isLoading = false;

  constructor(
    public loadingController: LoadingController
  ) { }

   // This will show then autohide the loader
   showHideAutoLoader() {

    this.loadingController.create({
      message: 'This Loader Will Auto Hide in 2 Seconds',
      duration: 2000
    }).then((res) => {
      res.present();

      res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed! after 2 Seconds', dis);
      });
    });

  }

  // Show the loader for infinite time
  // async showLoader() {

  //   this.loadingController.create({
  //     message: 'Cargando...'
  //   }).then((res) => {
  //     res.present();
  //   });

  // }

  // Hide the loader if already created otherwise return error
  // async hideLoader() {

  //   this.loadingController.dismiss().then((res) => {
  //     console.log('Loading dismissed!', res);
  //   }).catch((error) => {
  //     console.log('error', error);
  //   });

  // }

  async showLoader() {
    this.isLoading = true;
    return await this.loadingController.create({
      message: 'Please wait ...',
      spinner: 'circles' 
    }).then(a => {
      a.present().then(() => {
        console.log('loading presented');
        if (!this.isLoading) {
          a.dismiss().then(() => console.log('abort laoding'));
        }
      });
    });
  }

  async hideLoader() {
    this.isLoading = false;
    return await this.loadingController.dismiss().then(() => console.log('loading dismissed'));
  }

  

}
