import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { UsuarioFilialComponent } from './list/usuario-filial.component';
import { UsuarioFilialDetailComponent } from './detail/usuario-filial-detail.component';
import { UsuarioFilialUpdateComponent } from './update/usuario-filial-update.component';
import { UsuarioFilialDeleteDialogComponent } from './delete/usuario-filial-delete-dialog.component';
import { UsuarioFilialRoutingModule } from './route/usuario-filial-routing.module';

@NgModule({
  imports: [SharedModule, UsuarioFilialRoutingModule],
  declarations: [UsuarioFilialComponent, UsuarioFilialDetailComponent, UsuarioFilialUpdateComponent, UsuarioFilialDeleteDialogComponent],
})
export class UsuarioFilialModule {}
