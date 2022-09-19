import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { UsuarioIpLiberadoComponent } from '../list/usuario-ip-liberado.component';
import { UsuarioIpLiberadoDetailComponent } from '../detail/usuario-ip-liberado-detail.component';
import { UsuarioIpLiberadoUpdateComponent } from '../update/usuario-ip-liberado-update.component';
import { UsuarioIpLiberadoRoutingResolveService } from './usuario-ip-liberado-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const usuarioIpLiberadoRoute: Routes = [
  {
    path: '',
    component: UsuarioIpLiberadoComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: UsuarioIpLiberadoDetailComponent,
    resolve: {
      usuarioIpLiberado: UsuarioIpLiberadoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: UsuarioIpLiberadoUpdateComponent,
    resolve: {
      usuarioIpLiberado: UsuarioIpLiberadoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: UsuarioIpLiberadoUpdateComponent,
    resolve: {
      usuarioIpLiberado: UsuarioIpLiberadoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(usuarioIpLiberadoRoute)],
  exports: [RouterModule],
})
export class UsuarioIpLiberadoRoutingModule {}
