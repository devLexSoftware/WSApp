import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProveedoresService } from '../services/proveedores/proveedores.service';
import { NavController, AlertController } from '@ionic/angular';
import { LoadingService } from '../services/loading/loading.service';

@Component({
  selector: 'app-proveedor-form',
  templateUrl: './proveedor-form.page.html',
  styleUrls: ['./proveedor-form.page.scss'],
})
export class ProveedorFormPage implements OnInit {

  frmData: FormGroup;

  //Variables de comportamiento de interfaz
  showLabels: boolean = false;
  titlePage = "Nuevo Proveedor";
  accion: string = "insert";
  textoBtn = "Guardar Proveedor";
  estadoOriginal = "";

  //Default Data
  defaultData: any = {};
  _id_proveedor: number = null;
  _identificador: string = null;
  _empresa: string = null;
  _proveedor: string = null;
  _descripcion: string = null;
  _rfc: string = null;
  _importe: any = null;
  _unidad: string = null;
  _contacto1: number = null;
  _contacto2: number = null;
  _email: string = null;
  _direccion: string = null;
  _comentario: string = null;

  constructor(
    private activatedroute: ActivatedRoute,
    private frmBuilder: FormBuilder,
    private proveedorService: ProveedoresService,
    private alertCtrl: AlertController,  
    public navCtrl: NavController,
    private loadingService: LoadingService,    
  ) {
    this.activatedroute.params.subscribe(defaultData => {
      debugger;
      console.log(defaultData);

      if(defaultData.id != null){                

        this._id_proveedor = defaultData.id;
        this._identificador = defaultData.identificador;
        this._empresa = defaultData.empresa;
        this._proveedor = defaultData.proveedor;
        this._descripcion = defaultData.descripcion;
        this._rfc = defaultData.rfc;
        this._importe = defaultData.importe;
        this._unidad = defaultData.unidad;
        this._contacto1 = defaultData.contacto1;
        this._contacto2 = defaultData.contacto2;
        this._email = defaultData.email;
        this._direccion = defaultData.direccion;
        this._comentario = defaultData.comentario;
  
        this.showLabels = true;
        this.titlePage = "Editar Proveedor";
        this.accion = "update";
        this.textoBtn = "Guardar";
      }

      this.frmData = this.frmBuilder.group({
        id_proveedor: [this._id_proveedor],
        identificador: [this._identificador],
        empresa: [this._empresa, Validators.required],
        proveedor: [this._proveedor],
        descripcion: [this._descripcion],
        rfc: [this._rfc],
        importe: [this._importe],
        unidad: [this._unidad],
        contacto1: [this._contacto1, Validators.required],
        contacto2: [this._contacto2],
        email: [this._email],
        direccion: [this._direccion],
        comentario: [this._comentario],
        accion: [this.accion]
      });


    });
   }

  ngOnInit() {
  }

  guardarForm()
  {
    if(this.frmData.valid)
    {
      this.loadingService.showLoader();
      this.proveedorService.registrarModificarProveedor(this.frmData.value).subscribe((data) =>
      {
        this.loadingService.hideLoader();             
        if (data["error"] == false)
        { this.showAlert("¡Correcto!", data["msj"], true); }
        else
        { this.showAlert("¡Ups!", data["msj"], true); }
      },
      (error) => { 
        this.loadingService.hideLoader();      
        console.log(error); });
    }
    else
    {
      console.log("Error");
      let msj = (this.accion == "insert") ? "Campos incompletos para el registro de la obra":"Campos incompletos para la modificación de la obra";
      this.showAlert("¡Ups!", msj , false); }
  }

  async showAlert(title, subtitle, regresar)
  {
    const promp = await this.alertCtrl.create(
    {
      message: subtitle,
      subHeader: title,
      buttons: [
        {
          text: 'Ok',
          role: 'ok',
          handler: data => {
            if (regresar)
            { 
              // this.navCtrl.pop(); 
              this.navCtrl.navigateBack('/proveedores'); 
            }
          }
        }]
    });
    await promp.present();
  }

}
