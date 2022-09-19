import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { FeriadoFormService, FeriadoFormGroup } from './feriado-form.service';
import { IFeriado } from '../feriado.model';
import { FeriadoService } from '../service/feriado.service';
import { ILicenca } from 'app/entities/licenca/licenca.model';
import { LicencaService } from 'app/entities/licenca/service/licenca.service';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { UsuarioService } from 'app/entities/usuario/service/usuario.service';

@Component({
  selector: 'jhi-feriado-update',
  templateUrl: './feriado-update.component.html',
})
export class FeriadoUpdateComponent implements OnInit {
  isSaving = false;
  feriado: IFeriado | null = null;

  licencasSharedCollection: ILicenca[] = [];
  usuariosSharedCollection: IUsuario[] = [];

  editForm: FeriadoFormGroup = this.feriadoFormService.createFeriadoFormGroup();

  constructor(
    protected feriadoService: FeriadoService,
    protected feriadoFormService: FeriadoFormService,
    protected licencaService: LicencaService,
    protected usuarioService: UsuarioService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareLicenca = (o1: ILicenca | null, o2: ILicenca | null): boolean => this.licencaService.compareLicenca(o1, o2);

  compareUsuario = (o1: IUsuario | null, o2: IUsuario | null): boolean => this.usuarioService.compareUsuario(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ feriado }) => {
      this.feriado = feriado;
      if (feriado) {
        this.updateForm(feriado);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const feriado = this.feriadoFormService.getFeriado(this.editForm);
    if (feriado.id !== null) {
      this.subscribeToSaveResponse(this.feriadoService.update(feriado));
    } else {
      this.subscribeToSaveResponse(this.feriadoService.create(feriado));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFeriado>>): void {
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

  protected updateForm(feriado: IFeriado): void {
    this.feriado = feriado;
    this.feriadoFormService.resetForm(this.editForm, feriado);

    this.licencasSharedCollection = this.licencaService.addLicencaToCollectionIfMissing<ILicenca>(
      this.licencasSharedCollection,
      feriado.licenca
    );
    this.usuariosSharedCollection = this.usuarioService.addUsuarioToCollectionIfMissing<IUsuario>(
      this.usuariosSharedCollection,
      feriado.usuarioCriador
    );
  }

  protected loadRelationshipsOptions(): void {
    this.licencaService
      .query()
      .pipe(map((res: HttpResponse<ILicenca[]>) => res.body ?? []))
      .pipe(map((licencas: ILicenca[]) => this.licencaService.addLicencaToCollectionIfMissing<ILicenca>(licencas, this.feriado?.licenca)))
      .subscribe((licencas: ILicenca[]) => (this.licencasSharedCollection = licencas));

    this.usuarioService
      .query()
      .pipe(map((res: HttpResponse<IUsuario[]>) => res.body ?? []))
      .pipe(
        map((usuarios: IUsuario[]) => this.usuarioService.addUsuarioToCollectionIfMissing<IUsuario>(usuarios, this.feriado?.usuarioCriador))
      )
      .subscribe((usuarios: IUsuario[]) => (this.usuariosSharedCollection = usuarios));
  }
}
