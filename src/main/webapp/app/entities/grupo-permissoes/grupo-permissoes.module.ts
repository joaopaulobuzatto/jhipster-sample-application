import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { GrupoPermissoesComponent } from './list/grupo-permissoes.component';
import { GrupoPermissoesDetailComponent } from './detail/grupo-permissoes-detail.component';
import { GrupoPermissoesUpdateComponent } from './update/grupo-permissoes-update.component';
import { GrupoPermissoesDeleteDialogComponent } from './delete/grupo-permissoes-delete-dialog.component';
import { GrupoPermissoesRoutingModule } from './route/grupo-permissoes-routing.module';

@NgModule({
  imports: [SharedModule, GrupoPermissoesRoutingModule],
  declarations: [
    GrupoPermissoesComponent,
    GrupoPermissoesDetailComponent,
    GrupoPermissoesUpdateComponent,
    GrupoPermissoesDeleteDialogComponent,
  ],
})
export class GrupoPermissoesModule {}
