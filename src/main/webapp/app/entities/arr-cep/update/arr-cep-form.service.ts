import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IArrCep, NewArrCep } from '../arr-cep.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts IArrCep for edit and NewArrCepFormGroupInput for create.
 */
type ArrCepFormGroupInput = IArrCep | PartialWithRequiredKeyOf<NewArrCep>;

type ArrCepFormDefaults = Pick<NewArrCep, 'id'>;

type ArrCepFormGroupContent = {
  id: FormControl<IArrCep['id'] | NewArrCep['id']>;
  cepnum: FormControl<IArrCep['cepnum']>;
  cependtip: FormControl<IArrCep['cependtip']>;
  cepend: FormControl<IArrCep['cepend']>;
  cependcompl: FormControl<IArrCep['cependcompl']>;
  cepbai: FormControl<IArrCep['cepbai']>;
  cepcid: FormControl<IArrCep['cepcid']>;
  cepmuncod: FormControl<IArrCep['cepmuncod']>;
  cepmunnom: FormControl<IArrCep['cepmunnom']>;
  cepmunuf: FormControl<IArrCep['cepmunuf']>;
};

export type ArrCepFormGroup = FormGroup<ArrCepFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class ArrCepFormService {
  createArrCepFormGroup(arrCep: ArrCepFormGroupInput = { id: null }): ArrCepFormGroup {
    const arrCepRawValue = {
      ...this.getFormDefaults(),
      ...arrCep,
    };
    return new FormGroup<ArrCepFormGroupContent>({
      id: new FormControl(
        { value: arrCepRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      cepnum: new FormControl(arrCepRawValue.cepnum, {
        validators: [Validators.required, Validators.maxLength(8)],
      }),
      cependtip: new FormControl(arrCepRawValue.cependtip, {
        validators: [Validators.maxLength(100)],
      }),
      cepend: new FormControl(arrCepRawValue.cepend, {
        validators: [Validators.maxLength(255)],
      }),
      cependcompl: new FormControl(arrCepRawValue.cependcompl, {
        validators: [Validators.maxLength(255)],
      }),
      cepbai: new FormControl(arrCepRawValue.cepbai, {
        validators: [Validators.maxLength(255)],
      }),
      cepcid: new FormControl(arrCepRawValue.cepcid, {
        validators: [Validators.maxLength(8)],
      }),
      cepmuncod: new FormControl(arrCepRawValue.cepmuncod),
      cepmunnom: new FormControl(arrCepRawValue.cepmunnom, {
        validators: [Validators.maxLength(100)],
      }),
      cepmunuf: new FormControl(arrCepRawValue.cepmunuf, {
        validators: [Validators.maxLength(2)],
      }),
    });
  }

  getArrCep(form: ArrCepFormGroup): IArrCep | NewArrCep {
    return form.getRawValue() as IArrCep | NewArrCep;
  }

  resetForm(form: ArrCepFormGroup, arrCep: ArrCepFormGroupInput): void {
    const arrCepRawValue = { ...this.getFormDefaults(), ...arrCep };
    form.reset(
      {
        ...arrCepRawValue,
        id: { value: arrCepRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): ArrCepFormDefaults {
    return {
      id: null,
    };
  }
}
