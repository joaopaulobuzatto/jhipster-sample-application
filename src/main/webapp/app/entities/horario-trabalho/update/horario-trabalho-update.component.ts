import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { HorarioTrabalhoFormService, HorarioTrabalhoFormGroup } from './horario-trabalho-form.service';
import { IHorarioTrabalho } from '../horario-trabalho.model';
import { HorarioTrabalhoService } from '../service/horario-trabalho.service';
import { ILicenca } from 'app/entities/licenca/licenca.model';
import { LicencaService } from 'app/entities/licenca/service/licenca.service';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { UsuarioService } from 'app/entities/usuario/service/usuario.service';

@Component({
  selector: 'jhi-horario-trabalho-update',
  templateUrl: './horario-trabalho-update.component.html',
})
export class HorarioTrabalhoUpdateComponent implements OnInit {
  isSaving = false;
  horarioTrabalho: IHorarioTrabalho | null = null;

  licencasSharedCollection: ILicenca[] = [];
  usuariosSharedCollection: IUsuario[] = [];

  editForm: HorarioTrabalhoFormGroup = this.horarioTrabalhoFormService.createHorarioTrabalhoFormGroup();

  constructor(
    protected horarioTrabalhoService: HorarioTrabalhoService,
    protected horarioTrabalhoFormService: HorarioTrabalhoFormService,
    protected licencaService: LicencaService,
    protected usuarioService: UsuarioService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareLicenca = (o1: ILicenca | null, o2: ILicenca | null): boolean => this.licencaService.compareLicenca(o1, o2);

  compareUsuario = (o1: IUsuario | null, o2: IUsuario | null): boolean => this.usuarioService.compareUsuario(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ horarioTrabalho }) => {
      this.horarioTrabalho = horarioTrabalho;
      if (horarioTrabalho) {
        this.updateForm(horarioTrabalho);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const horarioTrabalho = this.horarioTrabalhoFormService.getHorarioTrabalho(this.editForm);
    if (horarioTrabalho.id !== null) {
      this.subscribeToSaveResponse(this.horarioTrabalhoService.update(horarioTrabalho));
    } else {
      this.subscribeToSaveResponse(this.horarioTrabalhoService.create(horarioTrabalho));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IHorarioTrabalho>>): void {
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

  protected updateForm(horarioTrabalho: IHorarioTrabalho): void {
    this.horarioTrabalho = horarioTrabalho;
    this.horarioTrabalhoFormService.resetForm(this.editForm, horarioTrabalho);

    this.licencasSharedCollection = this.licencaService.addLicencaToCollectionIfMissing<ILicenca>(
      this.licencasSharedCollection,
      horarioTrabalho.licenca
    );
    this.usuariosSharedCollection = this.usuarioService.addUsuarioToCollectionIfMissing<IUsuario>(
      this.usuariosSharedCollection,
      horarioTrabalho.usuarioCriador
    );
  }

  protected loadRelationshipsOptions(): void {
    this.licencaService
      .query()
      .pipe(map((res: HttpResponse<ILicenca[]>) => res.body ?? []))
      .pipe(
        map((licencas: ILicenca[]) =>
          this.licencaService.addLicencaToCollectionIfMissing<ILicenca>(licencas, this.horarioTrabalho?.licenca)
        )
      )
      .subscribe((licencas: ILicenca[]) => (this.licencasSharedCollection = licencas));

    this.usuarioService
      .query()
      .pipe(map((res: HttpResponse<IUsuario[]>) => res.body ?? []))
      .pipe(
        map((usuarios: IUsuario[]) =>
          this.usuarioService.addUsuarioToCollectionIfMissing<IUsuario>(usuarios, this.horarioTrabalho?.usuarioCriador)
        )
      )
      .subscribe((usuarios: IUsuario[]) => (this.usuariosSharedCollection = usuarios));
  }
}
