import { NgModule } from '@angular/core';
import { SharedModule } from 'app/shared/shared.module';
import { CorComponent } from './list/cor.component';
import { CorDetailComponent } from './detail/cor-detail.component';
import { CorUpdateComponent } from './update/cor-update.component';
import { CorDeleteDialogComponent } from './delete/cor-delete-dialog.component';
import { CorRoutingModule } from './route/cor-routing.module';

@NgModule({
  imports: [SharedModule, CorRoutingModule],
  declarations: [CorComponent, CorDetailComponent, CorUpdateComponent, CorDeleteDialogComponent],
})
export class CorModule {}
