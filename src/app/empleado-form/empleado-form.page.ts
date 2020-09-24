import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmpleadosService } from '../services/empleados/empleados.service';
import { NavController, AlertController } from '@ionic/angular';
import { LoadingService } from '../services/loading/loading.service';


@Component({
  selector: 'app-empleado-form',
  templateUrl: './empleado-form.page.html',
  styleUrls: ['./empleado-form.page.scss'],
})
export class EmpleadoFormPage implements OnInit {

  empleado: any = { };

  frmData: FormGroup;

  //Variables de comportamiento de interfaz
  showLabels: boolean = false;
  titlePage = "Nuevo Empleado";
  accion: string = "insert";
  textoBtn = "Guardar Empleado";

  //Default Data
  defaultData: any = {};
  _id_empleado: number = null;
  _identificador: string = null;
  _nombre: string = null;
  _rfc: string = null;
  _direccion: string = null;
  _movil: number = null;
  _telefono: number = null;
  _email: string = null;
  _empresa: string = null;
  _giro: string = null;
  _nota: any = null;
  _nssi: string = null;
  _salario: string = null;
  _categoria: string = null;
  _rol: number = null;

  categorias: string[] = ["Default", "Oficial", "Peón", "Sobre Estante", "Herrero", "Carpintero", "Pintor", "Tablaroquero",
                          "Yesero", "Arquitecto", "Electricista", "Plomero", "Asistente 1", "Asistente 2", "Asistente 3", "Asistente 4"];

  constructor(
    private activatedroute: ActivatedRoute,
    private frmBuilder: FormBuilder,
    private empleadosService: EmpleadosService,
    private alertCtrl: AlertController,  
    public navCtrl: NavController,
    private loadingService: LoadingService,    
  ) { 
    this.activatedroute.params.subscribe(defaultData => {
      debugger;
      if(defaultData.id != null){                
        this._id_empleado = defaultData.id;
        this._identificador = defaultData.identificador;
        this._nombre = defaultData.nombre;
        this._rfc = defaultData.rfc;
        this._direccion = defaultData.direccion;
        this._movil = defaultData.movil;
        this._telefono = defaultData.telefono;
        this._email = defaultData.email;
        this._empresa = defaultData.empresa;
        this._giro = defaultData.giro;
        this._nota = defaultData.nota;
        this._nssi = defaultData.nssi;
        this._salario = defaultData.salario;
        this._categoria = defaultData.categoria;
        this._rol = defaultData.rol;

        this.showLabels = true;
        this.titlePage = "Editar Empleado";
        this.accion = "update";
        this.textoBtn = "Guardar";
      }   
      
      this.frmData = this.frmBuilder.group({
        id_empleado: [this._id_empleado],
        identificador: [this._identificador],
        nombre: [this._nombre, Validators.required],
        rfc: [this._rfc],
        direccion: [this._direccion],
        movil: [this._movil, Validators.required],
        telefono: [this._telefono],
        email: [this._email],
        empresa: [this._empresa],
        giro: [this._giro],
        nota: [this._nota],
        nssi: [this._nssi],
        salario: [this._salario],
        categoria: [this._categoria],
        rol: [this._rol],
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
      this.empleadosService.registrarModificarEmpleado(this.frmData.value).subscribe((data) =>
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
      this.showAlert("¡Ups!", "Complete los campos requeridos", false); 
    }
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
              this.navCtrl.navigateBack('/empleados'); 
            }
          }
        }]
    });
    await promp.present();
  }

}
