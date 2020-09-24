import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientesService } from '../services/clientes/clientes.service';
import { NavController, AlertController } from '@ionic/angular';
import { LoadingService } from '../services/loading/loading.service';



@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.page.html',
  styleUrls: ['./cliente-form.page.scss'],
})
export class ClienteFormPage implements OnInit {

  cliente: any = { };
  info: any = {};

  frmData: FormGroup;

  //Variables de comportamiento de interfaz
  showLabels: boolean = false;
  titlePage = "Nuevo Cliente";
  accion: string = "insert";
  textoBtn = "Guardar Cliente";
  
  //#region Formulario
  _id_cliente: number = null;
  _identificador: string = null;
  _nombre: string = null;
  _rfc: string = null;
  _calle: string = null;
  _noExt: string = null;
  _noInt: string = null;
  _colonia: string = null;
  _cp: number = null;
  _ciudad: string = null;
  _municipio: string = null;
  _empresa: string = null;
  _email: string = null;
  _movil: number = null;
  _telefono: number = null;
  _nota: string = null;
  //#endregion

  

  
  constructor(
    private activatedroute: ActivatedRoute,
    private frmBuilder: FormBuilder,
    private clienteService: ClientesService,
    private alertCtrl: AlertController,  
    public navCtrl: NavController,
    private loadingService: LoadingService
  ) { 

      this.activatedroute.params.subscribe(defaultData => {
      
      console.log(defaultData);

      //--Asignar datos en caso de editar
      if(defaultData.id != null){      
        

        this._id_cliente = defaultData.id;
        this._identificador = defaultData.identificador;
        this._nombre = defaultData.nombre;
        this._rfc = defaultData.rfc;
        this._calle = defaultData.calle;
        this._noExt = defaultData.numExt;
        this._noInt = defaultData.numInt;
        this._colonia = defaultData.colonia;
        this._cp = defaultData.cp;
        this._ciudad = defaultData.ciudad;
        this._municipio = defaultData.municipio;
        this._empresa = defaultData.empresa;
        this._email = defaultData.email;
        this._movil = defaultData.movil;
        this._telefono = defaultData.telefono;
        this._nota = defaultData.nota;

        this.titlePage = "Editar Cliente";
        this.accion = "update";
        this.textoBtn = "Guardar";
      }
      
      //--Crear Formulario
      this.frmData = this.frmBuilder.group({
        accion: [this.accion],
        id_cliente: [this._id_cliente],
        identificador: [this._identificador],
        nombre: [this._nombre, Validators.required],
        rfc: [this._rfc],
        calle: [this._calle],
        noExt: [this._noExt],
        noInt: [this._noInt],
        colonia: [this._colonia],
        cp: [this._cp],
        ciudad: [this._ciudad],
        municipio: [this._municipio],
        empresa: [this._empresa],
        email: [this._email, Validators.required],
        movil: [this._movil, Validators.required],
        telefono: [this._telefono],
        nota: [this._nota]        
      });

    })    
  }

  ngOnInit() {

  }

  guardarForm() {    
     if (this.frmData.valid) {
      this.loadingService.showLoader();

      this.clienteService.registrarModificarCliente(this.frmData.value).subscribe(
        (data) =>
        {
          this.loadingService.hideLoader();
          if (data["error"] == false)
          { this.showAlert(data["msj"], "Correcto!", true); }
          else
          { this.showAlert(data["msj"], "Ups!", false); }
        },
        (error) => { 
          this.loadingService.hideLoader();
          this.showAlert("Ocurrio un error en los datos", "¡Error!", false); 
          console.error(error); 
        }
      );      
    }
    else{
      this.showAlert("Complete los campos requeridos", "Ups!", false );
    }
  }

  async showAlert(title, subtitle, regresar)
  {
    const promp = await this.alertCtrl.create(
    {
      message: title,
      subHeader: subtitle,
      buttons: [
        {
          text: 'Ok',
          role: 'ok',
          handler: data => {
            if (regresar)
            { 
              this.navCtrl.navigateBack('/clientes'); 
            }
          }
        }]
    });
    await promp.present();
  }

}
