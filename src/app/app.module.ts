import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule }    from '@angular/common/http';

import { UsersService } from './services/users/users.service';
import { ClientesService } from './services/clientes/clientes.service';

import { FormsModule } from '@angular/forms'  
import { ReactiveFormsModule} from '@angular/forms' 

import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { DatePipe } from '@angular/common';



@NgModule({
  declarations: [
    AppComponent,    
  ],
  entryComponents: [

  ],
  imports: [        
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    UsersService,
    ClientesService,    
    StatusBar,
    SplashScreen,
    Camera,    
    DatePipe,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
