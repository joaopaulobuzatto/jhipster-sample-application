import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { TipoDeDocumentoAnexavelComponent } from '../list/tipo-de-documento-anexavel.component';
import { TipoDeDocumentoAnexavelDetailComponent } from '../detail/tipo-de-documento-anexavel-detail.component';
import { TipoDeDocumentoAnexavelUpdateComponent } from '../update/tipo-de-documento-anexavel-update.component';
import { TipoDeDocumentoAnexavelRoutingResolveService } from './tipo-de-documento-anexavel-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const tipoDeDocumentoAnexavelRoute: Routes = [
  {
    path: '',
    component: TipoDeDocumentoAnexavelComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: TipoDeDocumentoAnexavelDetailComponent,
    resolve: {
      tipoDeDocumentoAnexavel: TipoDeDocumentoAnexavelRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: TipoDeDocumentoAnexavelUpdateComponent,
    resolve: {
      tipoDeDocumentoAnexavel: TipoDeDocumentoAnexavelRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: TipoDeDocumentoAnexavelUpdateComponent,
    resolve: {
      tipoDeDocumentoAnexavel: TipoDeDocumentoAnexavelRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(tipoDeDocumentoAnexavelRoute)],
  exports: [RouterModule],
})
export class TipoDeDocumentoAnexavelRoutingModule {}
