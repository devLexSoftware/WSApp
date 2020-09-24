import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';



const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'home',
        loadChildren: () => import('../home/home.module').then(m => m.HomePageModule)
      },
      // {
      //   path: 'obras',
      //   children: [
      //     {
      //       path: '',
      //       loadChildren: () => import('../obras/obras.module').then(m => m.ObrasPageModule)
      //     }
      //   ]
      // },
      {
        path: 'avances',
        loadChildren: () => import('../avances/avances.module').then(m => m.AvancesPageModule)
      },
      {
        path: 'compras',
        loadChildren: () => import('../compras/compras.module').then(m => m.ComprasPageModule)
      },
      {
        path: 'pedidos',
        loadChildren: () => import('../pedidos/pedidos.module').then(m => m.PedidosPageModule)
      },
      {
        path: 'avances-cliente',
        loadChildren: () => import('../user-cliente/user-cliente.module').then( m => m.UserClientePageModule)        
      },
      {
        path: 'avances-compra',
        loadChildren: () => import('../user-cliente-obras/user-cliente-obras.module').then( m => m.UserClienteObrasPageModule)        
      },
      // {
      //   path: '',
      //   redirectTo: '/tabs/obras',
      //   pathMatch: 'full'
      // }
    ]
  },  
  {
    path: '',
    redirectTo: 'tabs/home',
    
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule {}
