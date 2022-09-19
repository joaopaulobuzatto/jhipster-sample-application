import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { UsuarioIpLiberadoComponent } from './list/usuario-ip-liberado.component';
import { UsuarioIpLiberadoDetailComponent } from './detail/usuario-ip-liberado-detail.component';
import { UsuarioIpLiberadoUpdateComponent } from './update/usuario-ip-liberado-update.component';
import { UsuarioIpLiberadoDeleteDialogComponent } from './delete/usuario-ip-liberado-delete-dialog.component';
import { UsuarioIpLiberadoRoutingModule } from './route/usuario-ip-liberado-routing.module';

@NgModule({
  imports: [SharedModule, UsuarioIpLiberadoRoutingModule],
  declarations: [
    UsuarioIpLiberadoComponent,
    UsuarioIpLiberadoDetailComponent,
    UsuarioIpLiberadoUpdateComponent,
    UsuarioIpLiberadoDeleteDialogComponent,
  ],
})
export class UsuarioIpLiberadoModule {}
