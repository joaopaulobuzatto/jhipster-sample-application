import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IUsuarioIpLiberado, NewUsuarioIpLiberado } from '../usuario-ip-liberado.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IUsuarioIpLiberado for edit and NewUsuarioIpLiberadoFormGroupInput for create.
 */
type UsuarioIpLiberadoFormGroupInput = IUsuarioIpLiberado | PartialWithRequiredKeyOf<NewUsuarioIpLiberado>;

type UsuarioIpLiberadoFormDefaults = Pick<NewUsuarioIpLiberado, 'id'>;

type UsuarioIpLiberadoFormGroupContent = {
  id: FormControl<IUsuarioIpLiberado['id'] | NewUsuarioIpLiberado['id']>;
  licenca: FormControl<IUsuarioIpLiberado['licenca']>;
  usuario: FormControl<IUsuarioIpLiberado['usuario']>;
  ipLiberado: FormControl<IUsuarioIpLiberado['ipLiberado']>;
};

export type UsuarioIpLiberadoFormGroup = FormGroup<UsuarioIpLiberadoFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class UsuarioIpLiberadoFormService {
  createUsuarioIpLiberadoFormGroup(usuarioIpLiberado: UsuarioIpLiberadoFormGroupInput = { id: null }): UsuarioIpLiberadoFormGroup {
    const usuarioIpLiberadoRawValue = {
      ...this.getFormDefaults(),
      ...usuarioIpLiberado,
    };
    return new FormGroup<UsuarioIpLiberadoFormGroupContent>({
      id: new FormControl(
        { value: usuarioIpLiberadoRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      licenca: new FormControl(usuarioIpLiberadoRawValue.licenca),
      usuario: new FormControl(usuarioIpLiberadoRawValue.usuario),
      ipLiberado: new FormControl(usuarioIpLiberadoRawValue.ipLiberado),
    });
  }

  getUsuarioIpLiberado(form: UsuarioIpLiberadoFormGroup): IUsuarioIpLiberado | NewUsuarioIpLiberado {
    return form.getRawValue() as IUsuarioIpLiberado | NewUsuarioIpLiberado;
  }

  resetForm(form: UsuarioIpLiberadoFormGroup, usuarioIpLiberado: UsuarioIpLiberadoFormGroupInput): void {
    const usuarioIpLiberadoRawValue = { ...this.getFormDefaults(), ...usuarioIpLiberado };
    form.reset(
      {
        ...usuarioIpLiberadoRawValue,
        id: { value: usuarioIpLiberadoRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): UsuarioIpLiberadoFormDefaults {
    return {
      id: null,
    };
  }
}
