import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: 'usuario',
        data: { pageTitle: 'Usuarios' },
        loadChildren: () => import('./usuario/usuario.module').then(m => m.UsuarioModule),
      },
      {
        path: 'usuario-grupo-permissoes',
        data: { pageTitle: 'UsuarioGrupoPermissoes' },
        loadChildren: () => import('./usuario-grupo-permissoes/usuario-grupo-permissoes.module').then(m => m.UsuarioGrupoPermissoesModule),
      },
      {
        path: 'usuario-filial',
        data: { pageTitle: 'UsuarioFilials' },
        loadChildren: () => import('./usuario-filial/usuario-filial.module').then(m => m.UsuarioFilialModule),
      },
      {
        path: 'usuario-ip-liberado',
        data: { pageTitle: 'UsuarioIpLiberados' },
        loadChildren: () => import('./usuario-ip-liberado/usuario-ip-liberado.module').then(m => m.UsuarioIpLiberadoModule),
      },
      {
        path: 'grupo-permissoes',
        data: { pageTitle: 'GrupoPermissoes' },
        loadChildren: () => import('./grupo-permissoes/grupo-permissoes.module').then(m => m.GrupoPermissoesModule),
      },
      {
        path: 'ip-liberado',
        data: { pageTitle: 'IpLiberados' },
        loadChildren: () => import('./ip-liberado/ip-liberado.module').then(m => m.IpLiberadoModule),
      },
      {
        path: 'detentor-anexo-arquivo',
        data: { pageTitle: 'DetentorAnexoArquivos' },
        loadChildren: () => import('./detentor-anexo-arquivo/detentor-anexo-arquivo.module').then(m => m.DetentorAnexoArquivoModule),
      },
      {
        path: 'anexo-arquivo',
        data: { pageTitle: 'AnexoArquivos' },
        loadChildren: () => import('./anexo-arquivo/anexo-arquivo.module').then(m => m.AnexoArquivoModule),
      },
      {
        path: 'tipo-de-documento-anexavel',
        data: { pageTitle: 'TipoDeDocumentoAnexavels' },
        loadChildren: () =>
          import('./tipo-de-documento-anexavel/tipo-de-documento-anexavel.module').then(m => m.TipoDeDocumentoAnexavelModule),
      },
      {
        path: 'licenca',
        data: { pageTitle: 'Licencas' },
        loadChildren: () => import('./licenca/licenca.module').then(m => m.LicencaModule),
      },
      {
        path: 'endereco',
        data: { pageTitle: 'Enderecos' },
        loadChildren: () => import('./endereco/endereco.module').then(m => m.EnderecoModule),
      },
      {
        path: 'operadora',
        data: { pageTitle: 'Operadoras' },
        loadChildren: () => import('./operadora/operadora.module').then(m => m.OperadoraModule),
      },
      {
        path: 'pessoa',
        data: { pageTitle: 'Pessoas' },
        loadChildren: () => import('./pessoa/pessoa.module').then(m => m.PessoaModule),
      },
      {
        path: 'pessoa-fisica',
        data: { pageTitle: 'PessoaFisicas' },
        loadChildren: () => import('./pessoa-fisica/pessoa-fisica.module').then(m => m.PessoaFisicaModule),
      },
      {
        path: 'pessoa-juridica',
        data: { pageTitle: 'PessoaJuridicas' },
        loadChildren: () => import('./pessoa-juridica/pessoa-juridica.module').then(m => m.PessoaJuridicaModule),
      },
      {
        path: 'horario-trabalho',
        data: { pageTitle: 'HorarioTrabalhos' },
        loadChildren: () => import('./horario-trabalho/horario-trabalho.module').then(m => m.HorarioTrabalhoModule),
      },
      {
        path: 'horario-trabalho-periodo',
        data: { pageTitle: 'HorarioTrabalhoPeriodos' },
        loadChildren: () => import('./horario-trabalho-periodo/horario-trabalho-periodo.module').then(m => m.HorarioTrabalhoPeriodoModule),
      },
      {
        path: 'origem',
        data: { pageTitle: 'Origems' },
        loadChildren: () => import('./origem/origem.module').then(m => m.OrigemModule),
      },
      {
        path: 'filial',
        data: { pageTitle: 'Filials' },
        loadChildren: () => import('./filial/filial.module').then(m => m.FilialModule),
      },
      {
        path: 'aparelho',
        data: { pageTitle: 'Aparelhos' },
        loadChildren: () => import('./aparelho/aparelho.module').then(m => m.AparelhoModule),
      },
      {
        path: 'arr-cep',
        data: { pageTitle: 'ArrCeps' },
        loadChildren: () => import('./arr-cep/arr-cep.module').then(m => m.ArrCepModule),
      },
      {
        path: 'cor',
        data: { pageTitle: 'Cors' },
        loadChildren: () => import('./cor/cor.module').then(m => m.CorModule),
      },
      {
        path: 'evento-agenda',
        data: { pageTitle: 'EventoAgenda' },
        loadChildren: () => import('./evento-agenda/evento-agenda.module').then(m => m.EventoAgendaModule),
      },
      {
        path: 'feriado',
        data: { pageTitle: 'Feriados' },
        loadChildren: () => import('./feriado/feriado.module').then(m => m.FeriadoModule),
      },
      {
        path: 'plano',
        data: { pageTitle: 'Planos' },
        loadChildren: () => import('./plano/plano.module').then(m => m.PlanoModule),
      },
      {
        path: 'oferta',
        data: { pageTitle: 'Ofertas' },
        loadChildren: () => import('./oferta/oferta.module').then(m => m.OfertaModule),
      },
      {
        path: 'oferta-servico',
        data: { pageTitle: 'OfertaServicos' },
        loadChildren: () => import('./oferta-servico/oferta-servico.module').then(m => m.OfertaServicoModule),
      },
      {
        path: 'servico',
        data: { pageTitle: 'Servicos' },
        loadChildren: () => import('./servico/servico.module').then(m => m.ServicoModule),
      },
      /* jhipster-needle-add-entity-route - JHipster will add entity modules routes here */
    ]),
  ],
})
export class EntityRoutingModule {}
