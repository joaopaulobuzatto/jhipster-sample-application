import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserRouteAccessService } from 'app/core/auth/user-route-access.service';
import { OrigemComponent } from '../list/origem.component';
import { OrigemDetailComponent } from '../detail/origem-detail.component';
import { OrigemUpdateComponent } from '../update/origem-update.component';
import { OrigemRoutingResolveService } from './origem-routing-resolve.service';
import { ASC } from 'app/config/navigation.constants';

const origemRoute: Routes = [
  {
    path: '',
    component: OrigemComponent,
    data: {
      defaultSort: 'id,' + ASC,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: OrigemDetailComponent,
    resolve: {
      origem: OrigemRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: OrigemUpdateComponent,
    resolve: {
      origem: OrigemRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: OrigemUpdateComponent,
    resolve: {
      origem: OrigemRoutingResolveService,
    },
    canActivate: [UserRouteAccessService],
  },
];

@NgModule({
  imports: [RouterModule.forChild(origemRoute)],
  exports: [RouterModule],
})
export class OrigemRoutingModule {}
