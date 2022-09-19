import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { TipoDeDocumentoAnexavelFormService, TipoDeDocumentoAnexavelFormGroup } from './tipo-de-documento-anexavel-form.service';
import { ITipoDeDocumentoAnexavel } from '../tipo-de-documento-anexavel.model';
import { TipoDeDocumentoAnexavelService } from '../service/tipo-de-documento-anexavel.service';
import { ILicenca } from 'app/entities/licenca/licenca.model';
import { LicencaService } from 'app/entities/licenca/service/licenca.service';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { UsuarioService } from 'app/entities/usuario/service/usuario.service';

@Component({
  selector: 'jhi-tipo-de-documento-anexavel-update',
  templateUrl: './tipo-de-documento-anexavel-update.component.html',
})
export class TipoDeDocumentoAnexavelUpdateComponent implements OnInit {
  isSaving = false;
  tipoDeDocumentoAnexavel: ITipoDeDocumentoAnexavel | null = null;

  licencasSharedCollection: ILicenca[] = [];
  usuariosSharedCollection: IUsuario[] = [];

  editForm: TipoDeDocumentoAnexavelFormGroup = this.tipoDeDocumentoAnexavelFormService.createTipoDeDocumentoAnexavelFormGroup();

  constructor(
    protected tipoDeDocumentoAnexavelService: TipoDeDocumentoAnexavelService,
    protected tipoDeDocumentoAnexavelFormService: TipoDeDocumentoAnexavelFormService,
    protected licencaService: LicencaService,
    protected usuarioService: UsuarioService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareLicenca = (o1: ILicenca | null, o2: ILicenca | null): boolean => this.licencaService.compareLicenca(o1, o2);

  compareUsuario = (o1: IUsuario | null, o2: IUsuario | null): boolean => this.usuarioService.compareUsuario(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipoDeDocumentoAnexavel }) => {
      this.tipoDeDocumentoAnexavel = tipoDeDocumentoAnexavel;
      if (tipoDeDocumentoAnexavel) {
        this.updateForm(tipoDeDocumentoAnexavel);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tipoDeDocumentoAnexavel = this.tipoDeDocumentoAnexavelFormService.getTipoDeDocumentoAnexavel(this.editForm);
    if (tipoDeDocumentoAnexavel.id !== null) {
      this.subscribeToSaveResponse(this.tipoDeDocumentoAnexavelService.update(tipoDeDocumentoAnexavel));
    } else {
      this.subscribeToSaveResponse(this.tipoDeDocumentoAnexavelService.create(tipoDeDocumentoAnexavel));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoDeDocumentoAnexavel>>): void {
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

  protected updateForm(tipoDeDocumentoAnexavel: ITipoDeDocumentoAnexavel): void {
    this.tipoDeDocumentoAnexavel = tipoDeDocumentoAnexavel;
    this.tipoDeDocumentoAnexavelFormService.resetForm(this.editForm, tipoDeDocumentoAnexavel);

    this.licencasSharedCollection = this.licencaService.addLicencaToCollectionIfMissing<ILicenca>(
      this.licencasSharedCollection,
      tipoDeDocumentoAnexavel.licenca
    );
    this.usuariosSharedCollection = this.usuarioService.addUsuarioToCollectionIfMissing<IUsuario>(
      this.usuariosSharedCollection,
      tipoDeDocumentoAnexavel.usuarioCriador
    );
  }

  protected loadRelationshipsOptions(): void {
    this.licencaService
      .query()
      .pipe(map((res: HttpResponse<ILicenca[]>) => res.body ?? []))
      .pipe(
        map((licencas: ILicenca[]) =>
          this.licencaService.addLicencaToCollectionIfMissing<ILicenca>(licencas, this.tipoDeDocumentoAnexavel?.licenca)
        )
      )
      .subscribe((licencas: ILicenca[]) => (this.licencasSharedCollection = licencas));

    this.usuarioService
      .query()
      .pipe(map((res: HttpResponse<IUsuario[]>) => res.body ?? []))
      .pipe(
        map((usuarios: IUsuario[]) =>
          this.usuarioService.addUsuarioToCollectionIfMissing<IUsuario>(usuarios, this.tipoDeDocumentoAnexavel?.usuarioCriador)
        )
      )
      .subscribe((usuarios: IUsuario[]) => (this.usuariosSharedCollection = usuarios));
  }
}
