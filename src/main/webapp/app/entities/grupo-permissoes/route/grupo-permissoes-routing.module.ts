import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { GrupoPermissoesComponent } from '../list/grupo-permissoes.component';
import { GrupoPermissoesDetailComponent } from '../detail/grupo-permissoes-detail.component';
import { GrupoPermissoesUpdateComponent } from '../update/grupo-permissoes-update.component';
import { GrupoPermissoesRoutingResolveService } from './grupo-permissoes-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const grupoPermissoesRoute: Routes = [
  {
    path: '',
    component: GrupoPermissoesComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: GrupoPermissoesDetailComponent,
    resolve: {
      grupoPermissoes: GrupoPermissoesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: GrupoPermissoesUpdateComponent,
    resolve: {
      grupoPermissoes: GrupoPermissoesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: GrupoPermissoesUpdateComponent,
    resolve: {
      grupoPermissoes: GrupoPermissoesRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(grupoPermissoesRoute)],
  exports: [RouterModule],
})
export class GrupoPermissoesRoutingModule {}
