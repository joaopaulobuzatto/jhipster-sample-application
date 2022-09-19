import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { AparelhoComponent } from '../list/aparelho.component';
import { AparelhoDetailComponent } from '../detail/aparelho-detail.component';
import { AparelhoUpdateComponent } from '../update/aparelho-update.component';
import { AparelhoRoutingResolveService } from './aparelho-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const aparelhoRoute: Routes = [
  {
    path: '',
    component: AparelhoComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: AparelhoDetailComponent,
    resolve: {
      aparelho: AparelhoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: AparelhoUpdateComponent,
    resolve: {
      aparelho: AparelhoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: AparelhoUpdateComponent,
    resolve: {
      aparelho: AparelhoRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(aparelhoRoute)],
  exports: [RouterModule],
})
export class AparelhoRoutingModule {}
