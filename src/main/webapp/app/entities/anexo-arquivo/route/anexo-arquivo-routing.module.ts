import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { AnexoArquivoComponent } from '../list/anexo-arquivo.component';
import { AnexoArquivoDetailComponent } from '../detail/anexo-arquivo-detail.component';
import { AnexoArquivoUpdateComponent } from '../update/anexo-arquivo-update.component';
import { AnexoArquivoRoutingResolveService } from './anexo-arquivo-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const anexoArquivoRoute: Routes = [
  {
    path: '',
    component: AnexoArquivoComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AnexoArquivoDetailComponent,
    resolve: {
      anexoArquivo: AnexoArquivoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AnexoArquivoUpdateComponent,
    resolve: {
      anexoArquivo: AnexoArquivoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AnexoArquivoUpdateComponent,
    resolve: {
      anexoArquivo: AnexoArquivoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(anexoArquivoRoute)],
  exports: [RouterModule],
})
export class AnexoArquivoRoutingModule {}
