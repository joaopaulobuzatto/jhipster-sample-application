import { Injectable } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import dayjs from 'dayjs/esm';
import { DATE_TIME_FORMAT } from 'app/config/input.constants';
import { ILicenca, NewLicenca } from '../licenca.model';

/**
 * A partial Type with required key is used as form input.
 */
type PartialWithRequiredKeyOf<T extends { id: unknown }> = Partial<Omit<T, 'id'>> & { id: T['id'] };

/**
 * Type for createFormGroup and resetForm argument.
 * It accepts ILicenca for edit and NewLicencaFormGroupInput for create.
 */
type LicencaFormGroupInput = ILicenca | PartialWithRequiredKeyOf<NewLicenca>;

/**
 * Type that converts some properties for forms.
 */
type FormValueOf<T extends ILicenca | NewLicenca> = Omit<
  T,
  'dataCriacao' | 'dataInicioUtilizacao' | 'dataInicioFaturamento' | 'dataPrimeiroVencimentoBoleto' | 'dataBloqueioAcesso'
> & {
  dataCriacao?: string | null;
  dataInicioUtilizacao?: string | null;
  dataInicioFaturamento?: string | null;
  dataPrimeiroVencimentoBoleto?: string | null;
  dataBloqueioAcesso?: string | null;
};

type LicencaFormRawValue = FormValueOf<ILicenca>;

type NewLicencaFormRawValue = FormValueOf<NewLicenca>;

type LicencaFormDefaults = Pick<
  NewLicenca,
  | 'id'
  | 'dataCriacao'
  | 'dataInicioUtilizacao'
  | 'dataInicioFaturamento'
  | 'dataPrimeiroVencimentoBoleto'
  | 'contratacaoBloqueioIps'
  | 'contratacaoEmailProposta'
  | 'criarPedido'
  | 'criarNegociacoes'
  | 'sincronizarDadosCadastroCliente'
  | 'sincronizarDadosCarteiraCliente'
  | 'bloqueioAcesso'
  | 'dataBloqueioAcesso'
>;

type LicencaFormGroupContent = {
  id: FormControl<LicencaFormRawValue['id'] | NewLicenca['id']>;
  codigo: FormControl<LicencaFormRawValue['codigo']>;
  dataCriacao: FormControl<LicencaFormRawValue['dataCriacao']>;
  dataInicioUtilizacao: FormControl<LicencaFormRawValue['dataInicioUtilizacao']>;
  dataInicioFaturamento: FormControl<LicencaFormRawValue['dataInicioFaturamento']>;
  dataPrimeiroVencimentoBoleto: FormControl<LicencaFormRawValue['dataPrimeiroVencimentoBoleto']>;
  diaVencimentoBoleto: FormControl<LicencaFormRawValue['diaVencimentoBoleto']>;
  produtosContratados: FormControl<LicencaFormRawValue['produtosContratados']>;
  valoresNegociados: FormControl<LicencaFormRawValue['valoresNegociados']>;
  contratacaoBloqueioIps: FormControl<LicencaFormRawValue['contratacaoBloqueioIps']>;
  contratacaoEmailProposta: FormControl<LicencaFormRawValue['contratacaoEmailProposta']>;
  criarPedido: FormControl<LicencaFormRawValue['criarPedido']>;
  criarNegociacoes: FormControl<LicencaFormRawValue['criarNegociacoes']>;
  sincronizarDadosCadastroCliente: FormControl<LicencaFormRawValue['sincronizarDadosCadastroCliente']>;
  sincronizarDadosCarteiraCliente: FormControl<LicencaFormRawValue['sincronizarDadosCarteiraCliente']>;
  bloqueioAcesso: FormControl<LicencaFormRawValue['bloqueioAcesso']>;
  dataBloqueioAcesso: FormControl<LicencaFormRawValue['dataBloqueioAcesso']>;
  motivoBloqueioAcesso: FormControl<LicencaFormRawValue['motivoBloqueioAcesso']>;
  mensagemBloqueioAcesso: FormControl<LicencaFormRawValue['mensagemBloqueioAcesso']>;
  pessoa: FormControl<LicencaFormRawValue['pessoa']>;
  pessoaResponsavel: FormControl<LicencaFormRawValue['pessoaResponsavel']>;
  pessoaFinanceiro: FormControl<LicencaFormRawValue['pessoaFinanceiro']>;
  usuarioSuporte: FormControl<LicencaFormRawValue['usuarioSuporte']>;
  usuarioRobo: FormControl<LicencaFormRawValue['usuarioRobo']>;
  filialPadrao: FormControl<LicencaFormRawValue['filialPadrao']>;
};

export type LicencaFormGroup = FormGroup<LicencaFormGroupContent>;

@Injectable({ providedIn: 'root' })
export class LicencaFormService {
  createLicencaFormGroup(licenca: LicencaFormGroupInput = { id: null }): LicencaFormGroup {
    const licencaRawValue = this.convertLicencaToLicencaRawValue({
      ...this.getFormDefaults(),
      ...licenca,
    });
    return new FormGroup<LicencaFormGroupContent>({
      id: new FormControl(
        { value: licencaRawValue.id, disabled: true },
        {
          nonNullable: true,
          validators: [Validators.required],
        }
      ),
      codigo: new FormControl(licencaRawValue.codigo),
      dataCriacao: new FormControl(licencaRawValue.dataCriacao, {
        validators: [Validators.required],
      }),
      dataInicioUtilizacao: new FormControl(licencaRawValue.dataInicioUtilizacao),
      dataInicioFaturamento: new FormControl(licencaRawValue.dataInicioFaturamento),
      dataPrimeiroVencimentoBoleto: new FormControl(licencaRawValue.dataPrimeiroVencimentoBoleto),
      diaVencimentoBoleto: new FormControl(licencaRawValue.diaVencimentoBoleto),
      produtosContratados: new FormControl(licencaRawValue.produtosContratados, {
        validators: [Validators.maxLength(300)],
      }),
      valoresNegociados: new FormControl(licencaRawValue.valoresNegociados, {
        validators: [Validators.maxLength(300)],
      }),
      contratacaoBloqueioIps: new FormControl(licencaRawValue.contratacaoBloqueioIps, {
        validators: [Validators.required],
      }),
      contratacaoEmailProposta: new FormControl(licencaRawValue.contratacaoEmailProposta, {
        validators: [Validators.required],
      }),
      criarPedido: new FormControl(licencaRawValue.criarPedido),
      criarNegociacoes: new FormControl(licencaRawValue.criarNegociacoes),
      sincronizarDadosCadastroCliente: new FormControl(licencaRawValue.sincronizarDadosCadastroCliente),
      sincronizarDadosCarteiraCliente: new FormControl(licencaRawValue.sincronizarDadosCarteiraCliente),
      bloqueioAcesso: new FormControl(licencaRawValue.bloqueioAcesso, {
        validators: [Validators.required],
      }),
      dataBloqueioAcesso: new FormControl(licencaRawValue.dataBloqueioAcesso, {
        validators: [Validators.required],
      }),
      motivoBloqueioAcesso: new FormControl(licencaRawValue.motivoBloqueioAcesso, {
        validators: [Validators.maxLength(2500)],
      }),
      mensagemBloqueioAcesso: new FormControl(licencaRawValue.mensagemBloqueioAcesso, {
        validators: [Validators.maxLength(150)],
      }),
      pessoa: new FormControl(licencaRawValue.pessoa),
      pessoaResponsavel: new FormControl(licencaRawValue.pessoaResponsavel),
      pessoaFinanceiro: new FormControl(licencaRawValue.pessoaFinanceiro),
      usuarioSuporte: new FormControl(licencaRawValue.usuarioSuporte),
      usuarioRobo: new FormControl(licencaRawValue.usuarioRobo),
      filialPadrao: new FormControl(licencaRawValue.filialPadrao),
    });
  }

  getLicenca(form: LicencaFormGroup): ILicenca | NewLicenca {
    return this.convertLicencaRawValueToLicenca(form.getRawValue() as LicencaFormRawValue | NewLicencaFormRawValue);
  }

  resetForm(form: LicencaFormGroup, licenca: LicencaFormGroupInput): void {
    const licencaRawValue = this.convertLicencaToLicencaRawValue({ ...this.getFormDefaults(), ...licenca });
    form.reset(
      {
        ...licencaRawValue,
        id: { value: licencaRawValue.id, disabled: true },
      } as any /* cast to workaround https://github.com/angular/angular/issues/46458 */
    );
  }

  private getFormDefaults(): LicencaFormDefaults {
    const currentTime = dayjs();

    return {
      id: null,
      dataCriacao: currentTime,
      dataInicioUtilizacao: currentTime,
      dataInicioFaturamento: currentTime,
      dataPrimeiroVencimentoBoleto: currentTime,
      contratacaoBloqueioIps: false,
      contratacaoEmailProposta: false,
      criarPedido: false,
      criarNegociacoes: false,
      sincronizarDadosCadastroCliente: false,
      sincronizarDadosCarteiraCliente: false,
      bloqueioAcesso: false,
      dataBloqueioAcesso: currentTime,
    };
  }

  private convertLicencaRawValueToLicenca(rawLicenca: LicencaFormRawValue | NewLicencaFormRawValue): ILicenca | NewLicenca {
    return {
      ...rawLicenca,
      dataCriacao: dayjs(rawLicenca.dataCriacao, DATE_TIME_FORMAT),
      dataInicioUtilizacao: dayjs(rawLicenca.dataInicioUtilizacao, DATE_TIME_FORMAT),
      dataInicioFaturamento: dayjs(rawLicenca.dataInicioFaturamento, DATE_TIME_FORMAT),
      dataPrimeiroVencimentoBoleto: dayjs(rawLicenca.dataPrimeiroVencimentoBoleto, DATE_TIME_FORMAT),
      dataBloqueioAcesso: dayjs(rawLicenca.dataBloqueioAcesso, DATE_TIME_FORMAT),
    };
  }

  private convertLicencaToLicencaRawValue(
    licenca: ILicenca | (Partial<NewLicenca> & LicencaFormDefaults)
  ): LicencaFormRawValue | PartialWithRequiredKeyOf<NewLicencaFormRawValue> {
    return {
      ...licenca,
      dataCriacao: licenca.dataCriacao ? licenca.dataCriacao.format(DATE_TIME_FORMAT) : undefined,
      dataInicioUtilizacao: licenca.dataInicioUtilizacao ? licenca.dataInicioUtilizacao.format(DATE_TIME_FORMAT) : undefined,
      dataInicioFaturamento: licenca.dataInicioFaturamento ? licenca.dataInicioFaturamento.format(DATE_TIME_FORMAT) : undefined,
      dataPrimeiroVencimentoBoleto: licenca.dataPrimeiroVencimentoBoleto
        ? licenca.dataPrimeiroVencimentoBoleto.format(DATE_TIME_FORMAT)
        : undefined,
      dataBloqueioAcesso: licenca.dataBloqueioAcesso ? licenca.dataBloqueioAcesso.format(DATE_TIME_FORMAT) : undefined,
    };
  }
}
