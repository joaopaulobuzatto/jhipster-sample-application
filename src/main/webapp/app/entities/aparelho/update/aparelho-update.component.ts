import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { AparelhoFormService, AparelhoFormGroup } from './aparelho-form.service';
import { IAparelho } from '../aparelho.model';
import { AparelhoService } from '../service/aparelho.service';
import { IUsuario } from 'app/entities/usuario/usuario.model';
import { UsuarioService } from 'app/entities/usuario/service/usuario.service';
import { ClassificacaoAparelho } from 'app/entities/enumerations/classificacao-aparelho.model';

@Component({
  selector: 'jhi-aparelho-update',
  templateUrl: './aparelho-update.component.html',
})
export class AparelhoUpdateComponent implements OnInit {
  isSaving = false;
  aparelho: IAparelho | null = null;
  classificacaoAparelhoValues = Object.keys(ClassificacaoAparelho);

  usuariosSharedCollection: IUsuario[] = [];

  editForm: AparelhoFormGroup = this.aparelhoFormService.createAparelhoFormGroup();

  constructor(
    protected aparelhoService: AparelhoService,
    protected aparelhoFormService: AparelhoFormService,
    protected usuarioService: UsuarioService,
    protected activatedRoute: ActivatedRoute
  ) {}

  compareUsuario = (o1: IUsuario | null, o2: IUsuario | null): boolean => this.usuarioService.compareUsuario(o1, o2);

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ aparelho }) => {
      this.aparelho = aparelho;
      if (aparelho) {
        this.updateForm(aparelho);
      }

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const aparelho = this.aparelhoFormService.getAparelho(this.editForm);
    if (aparelho.id !== null) {
      this.subscribeToSaveResponse(this.aparelhoService.update(aparelho));
    } else {
      this.subscribeToSaveResponse(this.aparelhoService.create(aparelho));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAparelho>>): void {
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

  protected updateForm(aparelho: IAparelho): void {
    this.aparelho = aparelho;
    this.aparelhoFormService.resetForm(this.editForm, aparelho);

    this.usuariosSharedCollection = this.usuarioService.addUsuarioToCollectionIfMissing<IUsuario>(
      this.usuariosSharedCollection,
      aparelho.usuarioCriador
    );
  }

  protected loadRelationshipsOptions(): void {
    this.usuarioService
      .query()
      .pipe(map((res: HttpResponse<IUsuario[]>) => res.body ?? []))
      .pipe(
        map((usuarios: IUsuario[]) =>
          this.usuarioService.addUsuarioToCollectionIfMissing<IUsuario>(usuarios, this.aparelho?.usuarioCriador)
        )
      )
      .subscribe((usuarios: IUsuario[]) => (this.usuariosSharedCollection = usuarios));
  }
}
