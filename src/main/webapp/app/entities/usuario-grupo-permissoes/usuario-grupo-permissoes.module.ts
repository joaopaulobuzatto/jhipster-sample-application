import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { UsuarioGrupoPermissoesComponent } from './list/usuario-grupo-permissoes.component';
import { UsuarioGrupoPermissoesDetailComponent } from './detail/usuario-grupo-permissoes-detail.component';
import { UsuarioGrupoPermissoesUpdateComponent } from './update/usuario-grupo-permissoes-update.component';
import { UsuarioGrupoPermissoesDeleteDialogComponent } from './delete/usuario-grupo-permissoes-delete-dialog.component';
import { UsuarioGrupoPermissoesRoutingModule } from './route/usuario-grupo-permissoes-routing.module';

@NgModule({
  imports: [SharedModule, UsuarioGrupoPermissoesRoutingModule],
  declarations: [
    UsuarioGrupoPermissoesComponent,
    UsuarioGrupoPermissoesDetailComponent,
    UsuarioGrupoPermissoesUpdateComponent,
    UsuarioGrupoPermissoesDeleteDialogComponent,
  ],
})
export class UsuarioGrupoPermissoesModule {}
