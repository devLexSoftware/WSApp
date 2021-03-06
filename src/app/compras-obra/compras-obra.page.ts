import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ComprasService } from '../services/compras/compras.service';
import { NavController, AlertController } from '@ionic/angular';
import { LoadingService } from '../services/loading/loading.service';
import { PopoverController } from '@ionic/angular';
import { CompraOpcionComponent } from '../compra-opcion/compra-opcion.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-compras-obra',
  templateUrl: './compras-obra.page.html',
  styleUrls: ['./compras-obra.page.scss'],
})
export class ComprasObraPage implements OnInit {

  obra: any = {};
  compras: any[] = [];
  
  comprasBack: any[] = [];

  filterSemana: string = "";
  filterFactura: string = "";

  constructor(
    private activatedroute: ActivatedRoute,
    private comprasService: ComprasService,
    private alertCtrl: AlertController,
    private loadingService: LoadingService,
    private popoverCtrl: PopoverController,        
    private router: Router,
    public navCtrl: NavController,

  ) { 
    this.activatedroute.params.subscribe(data => {
      
      console.log(data);
      this.obra = data;
    })   
  }

  ngOnInit() {
    
  }
  ionViewWillEnter(){
    this.loadingService.showLoader();    
    this.comprasService.getComprasByCampoEspecifico("fk_obra", this.obra.id).subscribe(
      (data) =>
      {        
        this.loadingService.hideLoader();           
        if (data["error"] == false)
        {
          
          if (data["data"].length > 0){
            this.compras = data["data"];
            this.comprasBack = data["data"];
            this.total();
          }          
        }
        else
        {
          this.showAlert("¡Error!", data["msj"]);
        }
      },
      (error) => { 
        this.loadingService.hideLoader();
        this.showAlert("¡Error!", "Error WS Obras"); }
    );
  }

  sum: number = 0;
  total(){  
    this.sum = 0;
    let sumtem = 0;
    for (let compra of this.compras) {
      sumtem = sumtem + Number(compra.importe);      
    }    
    this.sum = sumtem.toFixed(2);    
  }

  filterSem(ev: any){
    this.filterFactura = "";
    this.compras = this.comprasBack;
    const val = ev.target.value;
    if(val && val.trim() != ""){
      this.compras = this.comprasBack.filter((item) =>{
        return (          
          item.semana.toLowerCase() == val.toLowerCase()
          // item.semana.toLowerCase().indexOf(val.toLowerCase()) > -1          
        )
      })
    }
    this.total();
  }

  filter(ev: any){
    this.filterSemana = "";
    this.compras = this.comprasBack;
    const val = ev.target.value;
    if(val && val.trim() != ""){
      this.compras = this.comprasBack.filter((item) =>{
        return (          
          item.factura.toLowerCase() == val.toLowerCase()
          // item.semana.toLowerCase().indexOf(val.toLowerCase()) > -1          
        )
      })
    }
    this.total();
  }

  async showAlert(title, subtitle)
  {
    const promp = await this.alertCtrl.create(
    {
      message: title,
      subHeader: subtitle,
    });
      buttons: ['OK']
    await promp.present();
  }

  async opcion(compra) {
    const popover = await this.popoverCtrl.create({
      component: CompraOpcionComponent,
      cssClass: 'my-custom-class',
      event: compra,
      translucent: true,
      componentProps: { data: compra },

    });
    popover.onDidDismiss().then(par => {
      if (par) {    

        if (par.data == 1)
            this.ionViewWillEnter(); 
      }
    });
    return await popover.present();
  }

  regresar(){    
    this.navCtrl.navigateBack('/tabs/compras'); 
             
  }

}
