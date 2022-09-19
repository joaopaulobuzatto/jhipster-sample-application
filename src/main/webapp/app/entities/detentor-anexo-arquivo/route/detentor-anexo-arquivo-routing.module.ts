import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { DetentorAnexoArquivoComponent } from '../list/detentor-anexo-arquivo.component';
import { DetentorAnexoArquivoDetailComponent } from '../detail/detentor-anexo-arquivo-detail.component';
import { DetentorAnexoArquivoUpdateComponent } from '../update/detentor-anexo-arquivo-update.component';
import { DetentorAnexoArquivoRoutingResolveService } from './detentor-anexo-arquivo-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const detentorAnexoArquivoRoute: Routes = [
  {
    path: '',
    component: DetentorAnexoArquivoComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: DetentorAnexoArquivoDetailComponent,
    resolve: {
      detentorAnexoArquivo: DetentorAnexoArquivoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: DetentorAnexoArquivoUpdateComponent,
    resolve: {
      detentorAnexoArquivo: DetentorAnexoArquivoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: DetentorAnexoArquivoUpdateComponent,
    resolve: {
      detentorAnexoArquivo: DetentorAnexoArquivoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(detentorAnexoArquivoRoute)],
  exports: [RouterModule],
})
export class DetentorAnexoArquivoRoutingModule {}
