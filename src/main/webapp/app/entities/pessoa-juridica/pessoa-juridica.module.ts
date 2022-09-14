import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { PessoaJuridicaComponent } from './list/pessoa-juridica.component';
import { PessoaJuridicaDetailComponent } from './detail/pessoa-juridica-detail.component';
import { PessoaJuridicaUpdateComponent } from './update/pessoa-juridica-update.component';
import { PessoaJuridicaDeleteDialogComponent } from './delete/pessoa-juridica-delete-dialog.component';
import { PessoaJuridicaRoutingModule } from './route/pessoa-juridica-routing.module';

@NgModule({
  imports: [SharedModule, PessoaJuridicaRoutingModule],
  declarations: [
    PessoaJuridicaComponent,
    PessoaJuridicaDetailComponent,
    PessoaJuridicaUpdateComponent,
    PessoaJuridicaDeleteDialogComponent,
  ],
})
export class PessoaJuridicaModule {}
