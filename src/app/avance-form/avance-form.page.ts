import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, AlertController, Platform, ToastController, ActionSheetController } from '@ionic/angular';
import { LoadingService } from '../services/loading/loading.service';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';



import { AvancesService } from '../services/avances/avances.service';
import { ObrasService } from '../services/obras/obras.service';
import { Ionic4DatepickerModalComponent } from '@logisticinfotech/ionic4-datepicker';
import { ModalController } from '@ionic/angular';

import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { ImageModalPage } from '../image-modal/image-modal.page';


@Component({
  selector: 'app-avance-form',
  templateUrl: './avance-form.page.html',
  styleUrls: ['./avance-form.page.scss'],
})
export class AvanceFormPage implements OnInit {
  
  fotoComprobante = "No se ha adjuntado fotografía";
  image: string = ""; //Variable para almacenar el string base64 de la imagen tomada
  imagenes: any[] = [];
  _fechaAvance: any;
  

  datePickerObjFecha: any = {};
  datePickerObjPeriodo: any = {};
  selectedDate;
  defaultDate: any;

  urlOrigen = "";
  idObra = "";
  datas: any = {};

  //Variables para almacenar datos de los WS
  obras: any[] = [];

  //Variables de comportamiento de interfaz
  showLabels: boolean = false;
  titlePage = "Nuevo Avance";
  accion: string = "insert";
  textoBtn = "Guardar Avance";

  flagSemana = false;

  //Arreglos estaticos
  arrDias: string[] = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

  //Variable para el formulario
  frmData: FormGroup;
  //#region 
  _id_avance: number = null;
  _fk_obra: number = null;
  
  _semana: any = "";
  
  _fecha_compra: any = "";  
  _perio_inicial: any = "";
  _perio_final: any = "";
  _fecha_inicial: any = "";
  _fecha_final: any = "";
  _descripcion: any = "";
  _dia: any = "";
  _imagenes: any[] = [];
  
  _foto: any = null;
  //#endregion


  constructor(
    public navCtrl: NavController,            
    public alertCtrl: AlertController,
    private frmBuilder: FormBuilder,
    private obraService: ObrasService,    
    private avanceService: AvancesService,
    private activatedroute: ActivatedRoute,    
    private camera: Camera,
    public modalCtrl: ModalController,
    public datepipe: DatePipe,
    private router: Router,
    private loadingService: LoadingService,
    private modalCtr: ModalController,
    private plt: Platform,
    private toastController: ToastController,
    private actionSheetController: ActionSheetController
  ) {
    this.activatedroute.params.subscribe(defaultData => {
      this.urlOrigen = "/tabs/avances";
      if(defaultData.id != null){      
        
        //--Convertir fecha bd a type        
        
        // let newFechaIni = this.convertToDate(defaultData.periodoInicial).toDateString();        
        // let newFechaFin = this.convertToDate(defaultData.periodoFinal).toDateString();
        
        this._id_avance = defaultData.id;
        this._fk_obra = defaultData.fk_obra;        
        this._semana = defaultData.semana;
        this._dia = defaultData.dia;
        // this._fecha_compra = newFecha;//defaultData.fecha;
        this._fecha_inicial = defaultData.periodoInicial;//defaultData.fechInicial;
        this._fecha_final = defaultData.periodoFinal;//defaultData.fechFinal;
        this._descripcion = defaultData.comentario;                        
        
        
        this.titlePage = "Editar Avance";
        this.accion = "update";
        this.textoBtn = "Guardar";

        this.idObra = defaultData.fk_obra;
        this.urlOrigen = defaultData.url;
      }

      this.frmData = this.frmBuilder.group({
        id_avance: [this._id_avance],        
        descripcion: [this._descripcion, Validators.required],
        semana: [this._semana, Validators.required],
        
        // fecha: [this._fecha_compra, Validators.required],
        dia: [this._dia, Validators.required],
        
        fk_obra: [this._fk_obra, Validators.required],
        imagenes: [this._imagenes],
        fechInicial: [this._fecha_inicial, Validators.required],
        fechFinal: [this._fecha_final, Validators.required],
      });

      this.defaultDate = this._fechaAvance;
      this.onCreateDate(this.defaultDate);      
    });
   }

  ngOnInit() {    
  }

  async presentToast(text){
    const toast = await this.toastController.create({
      message: text,
      position: 'bottom',
      duration: 300
    });
    toast.present();
  }

  async selectImage(){
    const actionSheet = await this.actionSheetController.create({
      header: "Cargar Imagen",
      buttons:[{
        text: "Cargar",
        icon: 'images',
        handler: () => {
          this.tomarArchivo(this.camera.PictureSourceType.PHOTOLIBRARY);
        }
      },
      {
        text: "Camara",
        icon: 'camera',
        handler: () => {
          this.tomarArchivo(this.camera.PictureSourceType.CAMERA);
        }
      },
      {
        text: "Cerrar",
        icon: 'close',

        role: "cancel"
      },
    ]
    });
    await actionSheet.present();
  }

  ionViewWillEnter(){
    this.loadingService.showLoader();
    

    this.obraService.getObras().subscribe(
      (data) =>
      {        
        this.loadingService.hideLoader();

        if (data["error"] == false)
        {
          if (data["data"].length > 0)
          {
            this.obras = data["data"];
          }
          else
          { this.showAlert("¡Ups!", "No hay obras registradas", true); }          
        }
        else
        {
          this.showAlert("¡Error!", data["msj"], true);
        }
        this.getFotos(this.frmData.controls['id_avance'].value);
      },
      (error) => { 
        this.loadingService.hideLoader();
        console.error(error); }
    );
  }

  guardarForm(){  
    if(this.frmData.valid)    
    {    
      this.loadingService.showLoader();
      this.frmData.controls['imagenes'].setValue(this.imagenes);
      this.avanceService.registrarModificarAvance(this.frmData.value).subscribe((data) =>
      {       
        this.loadingService.hideLoader();
        if (data["error"] == false)
        { this.showAlert(  "¡Correcto!", data["msj"], true); }
        else
        { this.showAlert( "¡Ups!", data["msj"],true); }
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

  getFotos(id){
    this.loadingService.showLoader();    
    this.avanceService.getfotos(id).subscribe(
      (data) =>
      {        
        this.loadingService.hideLoader();
        if (data["error"] == false)
        {
          if (data["data"].length > 0)
          {            
            data["data"].forEach(element => {              
              this.imagenes.push(element.imagen);
            });
            // this.imagenes = data["data"];
          }
          else
          { this.showAlert("¡Ups!", "No hay fotos registradas", false); }          
        }
        else
        {
          this.showAlert("¡Error!", data["msj"], true);
        }
      },
      (error) => { 
        this.loadingService.hideLoader();
        console.error(error); }
    );
  }

  onChangeDays(){
    let fechInicial = this.frmData.controls['fechInicial'].value;
    let fechFinal = this.frmData.controls['fechFinal'].value;    
    let fk_obra = this.frmData.controls['fk_obra'].value;

    this.loadingService.showLoader();
    this.avanceService.getDias(fechInicial, fechFinal, fk_obra).subscribe(
      (data) =>
      {        
        this.loadingService.hideLoader();

        if (data["error"] == false)
        {
          if (data["data"].length > 0)
          {            
            this.frmData.controls['semana'].setValue(data["data"][0]["semana"]);
            this.flagSemana = true;
            data["data"].forEach(element => {              
              this.arrDias.splice(this.arrDias.indexOf(element["dia"]), 1)
            });
            
          }
          // else
          // { this.showAlert("¡Ups!", "No hay dias registrados", true); }          
        }
        else
        {
          // this.showAlert("¡Error!", data["msj"], true);
        }
      },
      (error) => { 
        this.loadingService.hideLoader();
        console.error(error); }
    );

  }

  //#region Camara

  openImage(image){    
    this.modalCtr.create({
      component: ImageModalPage,
      componentProps:{
        img: image
      }
    }).then(modal => modal.present());
  }

  tomarArchivo(sourceType: PictureSourceType){    
    var options: CameraOptions = {
      destinationType: this.camera.DestinationType.DATA_URL,
      // targetWidth: 800,
      sourceType: sourceType,
      correctOrientation: true,
      quality: 70
    };

    this.camera.getPicture(options).then(imageData =>
    {
      // this.images.push(`data:image/jpeg;base64,${imageData}`);
      this.image = `data:image/jpeg;base64,${imageData}`;      
      this.fotoComprobante = "Fotografía adjunta";
      this.imagenes.push(this.image);      
    }).catch(error => { console.error( error ); });
  }

  borrarImg(img){    
    this.showConfirm(img);    
  }
  //#endregion

   //#region Calendario  
   onCreateDate(fecha) {    
    if(fecha == undefined || fecha == null){
      fecha = new Date();      
      fecha.setDate(fecha.getDate() +1);   
      this.defaultDate = this.getNextMonday(fecha);  
    }
      
    this.datePickerObjFecha = {     
      inputDate: this.defaultDate,      
      dateFormat: "DD-MM-yyyy",      
      // disableWeekDays: [0,2,3,4,5,6,7], // default []
      mondayFirst: false, // default false      
      titleLabel: "Seleccione", // default null
      monthsList: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],      
      momentLocale: "es-MX",
      yearInAscending: true,
      clearButton: false,
      setLabel: "Seleccionar",
      closeLabel: "Cerrar",
      showTodayButton: false, // default true:      
      tipo:"1"
      // closeOnSelect: true
    };

    this.datePickerObjPeriodo = {     
      inputDate: this.defaultDate,      
      dateFormat: "DD-MM-yyyy",      
      disableWeekDays: [0,2,3,4,5,6,7], // default []
      mondayFirst: false, // default false      
      titleLabel: "Seleccione", // default null
      monthsList: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
      weeksList: ["D","L", "M", "M", "J", "V", "S"],
      momentLocale: "es-MX",
      yearInAscending: true,
      clearButton: false,
      setLabel: "Seleccionar",
      closeLabel: "Cerrar",
      showTodayButton: false, // default true:      
      // closeOnSelect: true
      tipo:"2"
    };
  }

  async openDatePicker(tipo) { 
    
    let obj = null;
    if(tipo == 1)
      obj = this.datePickerObjFecha;
    else if(tipo == 2)    
      obj = this.datePickerObjPeriodo;
    
    const datePickerModal = await this.modalCtrl.create({
      component: Ionic4DatepickerModalComponent,
      cssClass: 'li-ionic4-datePicker',      
      componentProps: { 
         'objConfig': obj, 
         'selectedDate': this.selectedDate 
      }
    });
    
    await datePickerModal.present();
 
    datePickerModal.onDidDismiss()
      .then((data) => {        
        let date = ""
        if(data.data.date != undefined && data.data.date != null && data.data.date != "Fecha invalida"){      
          // date = this.selectedDate;
          date = data.data.date;   
          if(obj.tipo == "1"  )
            this.frmData.controls['fecha'].setValue(date);
          else if(obj.tipo == "2" ){            
            let dateFinal = this.convertToDate(date);

            let nextdate = new Date(dateFinal.getFullYear(),dateFinal.getMonth(),dateFinal.getDate()+6);
            let x = this.datepipe.transform(nextdate, 'dd-MM-yyyy');

            this.frmData.controls['fechInicial'].setValue(date);
            this.frmData.controls['fechFinal'].setValue(x);

            this.onChangeDays();
          }
            
        }                        
      });
  }
  //#endregion

   //#region Fechas
   convertToDate(fecha){    
    let args = fecha.split('-');
    let day = args[0];
    let month = args[1];
    let year = args[2];
    let date = new Date(year+'/'+month+'/'+day);    
    return date;
  }

  getNextMonday(anyDate){
    var dayOfWeek= anyDate.getDay();
    var aux=dayOfWeek?1:-6; 
    var nextMonday= new Date();
    nextMonday.setDate(anyDate.getDate() - dayOfWeek + aux +7)
    return nextMonday;
  }
  //#endregion

  //#region Alerts
  async showConfirm(img)
  {
    const promp = await this.alertCtrl.create(
    {
      message: "Desea borrar la imagen?",
      subHeader: "Borrar",
      buttons: [
        {
          text: 'Si',          
          handler: () => {            
            debugger;
            this.imagenes.splice(img,1);
          }
        },
        {
          text: 'No',                    
        },
      ]
    });
    await promp.present();
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
              this.regresar();
            }
          }
        }]
    });
    await promp.present();
  }

  regresar(){
    if(this.idObra != ""){
      this.datas.id = this.idObra
      this.router.navigate([this.urlOrigen, this.datas]);                
    }
    else
      this.router.navigate([this.urlOrigen]);
  }
  //#endregion

}
