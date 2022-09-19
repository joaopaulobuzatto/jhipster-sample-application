import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { UsuarioFilialFormService, UsuarioFilialFormGroup } from './usuario-filial-form.service';
import { IUsuarioFilial } from '../usuario-filial.model';
import { UsuarioFilialService } from '../service/usuario-filial.service';
import { ILicenca } from 'app/entities/licenca/licenca.model';
import { LicencaService } from 'app/entities/licenca/service/licenca.service';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { UsuarioService } from 'app/entities/usuario/service/usuario.service';
import { IFilial } from 'app/entities/filial/filial.model';
import { FilialService } from 'app/entities/filial/service/filial.service';

@Component({
  selector: 'jhi-usuario-filial-update',
  templateUrl: './usuario-filial-update.component.html',
})
export class UsuarioFilialUpdateComponent implements OnInit {
  isSaving = false;
  usuarioFilial: IUsuarioFilial | null = null;

  licencasSharedCollection: ILicenca[] = [];
  usuariosSharedCollection: IUsuario[] = [];
  filialsSharedCollection: IFilial[] = [];

  editForm: UsuarioFilialFormGroup = this.usuarioFilialFormService.createUsuarioFilialFormGroup();

  constructor(
    protected usuarioFilialService: UsuarioFilialService,
    protected usuarioFilialFormService: UsuarioFilialFormService,
    protected licencaService: LicencaService,
    protected usuarioService: UsuarioService,
    protected filialService: FilialService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareLicenca = (o1: ILicenca | null, o2: ILicenca | null): boolean => this.licencaService.compareLicenca(o1, o2);

  compareUsuario = (o1: IUsuario | null, o2: IUsuario | null): boolean => this.usuarioService.compareUsuario(o1, o2);

  compareFilial = (o1: IFilial | null, o2: IFilial | null): boolean => this.filialService.compareFilial(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ usuarioFilial }) => {
      this.usuarioFilial = usuarioFilial;
      if (usuarioFilial) {
        this.updateForm(usuarioFilial);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const usuarioFilial = this.usuarioFilialFormService.getUsuarioFilial(this.editForm);
    if (usuarioFilial.id !== null) {
      this.subscribeToSaveResponse(this.usuarioFilialService.update(usuarioFilial));
    } else {
      this.subscribeToSaveResponse(this.usuarioFilialService.create(usuarioFilial));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IUsuarioFilial>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe({
      next: () => this.onSaveSuccess(),
      error: () => this.onSaveError(),
    });
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(usuarioFilial: IUsuarioFilial): void {
    this.usuarioFilial = usuarioFilial;
    this.usuarioFilialFormService.resetForm(this.editForm, usuarioFilial);

    this.licencasSharedCollection = this.licencaService.addLicencaToCollectionIfMissing<ILicenca>(
      this.licencasSharedCollection,
      usuarioFilial.licenca
    );
    this.usuariosSharedCollection = this.usuarioService.addUsuarioToCollectionIfMissing<IUsuario>(
      this.usuariosSharedCollection,
      usuarioFilial.usuario
    );
    this.filialsSharedCollection = this.filialService.addFilialToCollectionIfMissing<IFilial>(
      this.filialsSharedCollection,
      usuarioFilial.filial
    );
  }

  protected loadRelationshipsOptions(): void {
    this.licencaService
      .query()
      .pipe(map((res: HttpResponse<ILicenca[]>) => res.body ?? []))
      .pipe(
        map((licencas: ILicenca[]) => this.licencaService.addLicencaToCollectionIfMissing<ILicenca>(licencas, this.usuarioFilial?.licenca))
      )
      .subscribe((licencas: ILicenca[]) => (this.licencasSharedCollection = licencas));

    this.usuarioService
      .query()
      .pipe(map((res: HttpResponse<IUsuario[]>) => res.body ?? []))
      .pipe(
        map((usuarios: IUsuario[]) => this.usuarioService.addUsuarioToCollectionIfMissing<IUsuario>(usuarios, this.usuarioFilial?.usuario))
      )
      .subscribe((usuarios: IUsuario[]) => (this.usuariosSharedCollection = usuarios));

    this.filialService
      .query()
      .pipe(map((res: HttpResponse<IFilial[]>) => res.body ?? []))
      .pipe(map((filials: IFilial[]) => this.filialService.addFilialToCollectionIfMissing<IFilial>(filials, this.usuarioFilial?.filial)))
      .subscribe((filials: IFilial[]) => (this.filialsSharedCollection = filials));
  }
}
