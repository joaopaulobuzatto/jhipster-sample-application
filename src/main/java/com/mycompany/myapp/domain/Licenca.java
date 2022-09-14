package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Licenca.
 */
@Entity
@Table(name = "licenca")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Licenca implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "codigo")
    private Long codigo;

    @NotNull
    @Column(name = "data_criacao", nullable = false)
    private Instant dataCriacao;

    @Column(name = "data_inicio_utilizacao")
    private Instant dataInicioUtilizacao;

    @Column(name = "data_inicio_faturamento")
    private Instant dataInicioFaturamento;

    @Column(name = "data_primeiro_vencimento_boleto")
    private Instant dataPrimeiroVencimentoBoleto;

    @Column(name = "dia_vencimento_boleto")
    private Integer diaVencimentoBoleto;

    @Size(max = 300)
    @Column(name = "produtos_contratados", length = 300)
    private String produtosContratados;

    @Size(max = 300)
    @Column(name = "valores_negociados", length = 300)
    private String valoresNegociados;

    @NotNull
    @Column(name = "contratacao_bloqueio_ips", nullable = false)
    private Boolean contratacaoBloqueioIps;

    @NotNull
    @Column(name = "contratacao_email_proposta", nullable = false)
    private Boolean contratacaoEmailProposta;

    @Column(name = "criar_pedido")
    private Boolean criarPedido;

    @Column(name = "criar_negociacoes")
    private Boolean criarNegociacoes;

    @Column(name = "sincronizar_dados_cadastro_cliente")
    private Boolean sincronizarDadosCadastroCliente;

    @Column(name = "sincronizar_dados_carteira_cliente")
    private Boolean sincronizarDadosCarteiraCliente;

    @NotNull
    @Column(name = "bloqueio_acesso", nullable = false)
    private Boolean bloqueioAcesso;

    @NotNull
    @Column(name = "data_bloqueio_acesso", nullable = false)
    private Instant dataBloqueioAcesso;

    @Size(max = 2500)
    @Column(name = "motivo_bloqueio_acesso", length = 2500)
    private String motivoBloqueioAcesso;

    @Size(max = 150)
    @Column(name = "mensagem_bloqueio_acesso", length = 150)
    private String mensagemBloqueioAcesso;

    @ManyToOne
    @JsonIgnoreProperties(value = { "endereco", "licenca" }, allowSetters = true)
    private Pessoa pessoa;

    @ManyToOne
    @JsonIgnoreProperties(value = { "pessoaFisicaLicenca" }, allowSetters = true)
    private PessoaFisica pessoaResponsavel;

    @ManyToOne
    @JsonIgnoreProperties(value = { "pessoaFisicaLicenca" }, allowSetters = true)
    private PessoaFisica pessoaFinanceiro;

    @ManyToOne
    @JsonIgnoreProperties(value = { "licenca", "supervisor", "usuarioCriador", "pessoaFisica", "horarioTrabalho" }, allowSetters = true)
    private Usuario usuarioSuporte;

    @ManyToOne
    @JsonIgnoreProperties(value = { "licenca", "supervisor", "usuarioCriador", "pessoaFisica", "horarioTrabalho" }, allowSetters = true)
    private Usuario usuarioRobo;

    @ManyToOne
    @JsonIgnoreProperties(value = { "licenca", "pessoa", "usuarioCriador" }, allowSetters = true)
    private Filial filialPadrao;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Licenca id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCodigo() {
        return this.codigo;
    }

    public Licenca codigo(Long codigo) {
        this.setCodigo(codigo);
        return this;
    }

    public void setCodigo(Long codigo) {
        this.codigo = codigo;
    }

    public Instant getDataCriacao() {
        return this.dataCriacao;
    }

    public Licenca dataCriacao(Instant dataCriacao) {
        this.setDataCriacao(dataCriacao);
        return this;
    }

    public void setDataCriacao(Instant dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public Instant getDataInicioUtilizacao() {
        return this.dataInicioUtilizacao;
    }

    public Licenca dataInicioUtilizacao(Instant dataInicioUtilizacao) {
        this.setDataInicioUtilizacao(dataInicioUtilizacao);
        return this;
    }

    public void setDataInicioUtilizacao(Instant dataInicioUtilizacao) {
        this.dataInicioUtilizacao = dataInicioUtilizacao;
    }

    public Instant getDataInicioFaturamento() {
        return this.dataInicioFaturamento;
    }

    public Licenca dataInicioFaturamento(Instant dataInicioFaturamento) {
        this.setDataInicioFaturamento(dataInicioFaturamento);
        return this;
    }

    public void setDataInicioFaturamento(Instant dataInicioFaturamento) {
        this.dataInicioFaturamento = dataInicioFaturamento;
    }

    public Instant getDataPrimeiroVencimentoBoleto() {
        return this.dataPrimeiroVencimentoBoleto;
    }

    public Licenca dataPrimeiroVencimentoBoleto(Instant dataPrimeiroVencimentoBoleto) {
        this.setDataPrimeiroVencimentoBoleto(dataPrimeiroVencimentoBoleto);
        return this;
    }

    public void setDataPrimeiroVencimentoBoleto(Instant dataPrimeiroVencimentoBoleto) {
        this.dataPrimeiroVencimentoBoleto = dataPrimeiroVencimentoBoleto;
    }

    public Integer getDiaVencimentoBoleto() {
        return this.diaVencimentoBoleto;
    }

    public Licenca diaVencimentoBoleto(Integer diaVencimentoBoleto) {
        this.setDiaVencimentoBoleto(diaVencimentoBoleto);
        return this;
    }

    public void setDiaVencimentoBoleto(Integer diaVencimentoBoleto) {
        this.diaVencimentoBoleto = diaVencimentoBoleto;
    }

    public String getProdutosContratados() {
        return this.produtosContratados;
    }

    public Licenca produtosContratados(String produtosContratados) {
        this.setProdutosContratados(produtosContratados);
        return this;
    }

    public void setProdutosContratados(String produtosContratados) {
        this.produtosContratados = produtosContratados;
    }

    public String getValoresNegociados() {
        return this.valoresNegociados;
    }

    public Licenca valoresNegociados(String valoresNegociados) {
        this.setValoresNegociados(valoresNegociados);
        return this;
    }

    public void setValoresNegociados(String valoresNegociados) {
        this.valoresNegociados = valoresNegociados;
    }

    public Boolean getContratacaoBloqueioIps() {
        return this.contratacaoBloqueioIps;
    }

    public Licenca contratacaoBloqueioIps(Boolean contratacaoBloqueioIps) {
        this.setContratacaoBloqueioIps(contratacaoBloqueioIps);
        return this;
    }

    public void setContratacaoBloqueioIps(Boolean contratacaoBloqueioIps) {
        this.contratacaoBloqueioIps = contratacaoBloqueioIps;
    }

    public Boolean getContratacaoEmailProposta() {
        return this.contratacaoEmailProposta;
    }

    public Licenca contratacaoEmailProposta(Boolean contratacaoEmailProposta) {
        this.setContratacaoEmailProposta(contratacaoEmailProposta);
        return this;
    }

    public void setContratacaoEmailProposta(Boolean contratacaoEmailProposta) {
        this.contratacaoEmailProposta = contratacaoEmailProposta;
    }

    public Boolean getCriarPedido() {
        return this.criarPedido;
    }

    public Licenca criarPedido(Boolean criarPedido) {
        this.setCriarPedido(criarPedido);
        return this;
    }

    public void setCriarPedido(Boolean criarPedido) {
        this.criarPedido = criarPedido;
    }

    public Boolean getCriarNegociacoes() {
        return this.criarNegociacoes;
    }

    public Licenca criarNegociacoes(Boolean criarNegociacoes) {
        this.setCriarNegociacoes(criarNegociacoes);
        return this;
    }

    public void setCriarNegociacoes(Boolean criarNegociacoes) {
        this.criarNegociacoes = criarNegociacoes;
    }

    public Boolean getSincronizarDadosCadastroCliente() {
        return this.sincronizarDadosCadastroCliente;
    }

    public Licenca sincronizarDadosCadastroCliente(Boolean sincronizarDadosCadastroCliente) {
        this.setSincronizarDadosCadastroCliente(sincronizarDadosCadastroCliente);
        return this;
    }

    public void setSincronizarDadosCadastroCliente(Boolean sincronizarDadosCadastroCliente) {
        this.sincronizarDadosCadastroCliente = sincronizarDadosCadastroCliente;
    }

    public Boolean getSincronizarDadosCarteiraCliente() {
        return this.sincronizarDadosCarteiraCliente;
    }

    public Licenca sincronizarDadosCarteiraCliente(Boolean sincronizarDadosCarteiraCliente) {
        this.setSincronizarDadosCarteiraCliente(sincronizarDadosCarteiraCliente);
        return this;
    }

    public void setSincronizarDadosCarteiraCliente(Boolean sincronizarDadosCarteiraCliente) {
        this.sincronizarDadosCarteiraCliente = sincronizarDadosCarteiraCliente;
    }

    public Boolean getBloqueioAcesso() {
        return this.bloqueioAcesso;
    }

    public Licenca bloqueioAcesso(Boolean bloqueioAcesso) {
        this.setBloqueioAcesso(bloqueioAcesso);
        return this;
    }

    public void setBloqueioAcesso(Boolean bloqueioAcesso) {
        this.bloqueioAcesso = bloqueioAcesso;
    }

    public Instant getDataBloqueioAcesso() {
        return this.dataBloqueioAcesso;
    }

    public Licenca dataBloqueioAcesso(Instant dataBloqueioAcesso) {
        this.setDataBloqueioAcesso(dataBloqueioAcesso);
        return this;
    }

    public void setDataBloqueioAcesso(Instant dataBloqueioAcesso) {
        this.dataBloqueioAcesso = dataBloqueioAcesso;
    }

    public String getMotivoBloqueioAcesso() {
        return this.motivoBloqueioAcesso;
    }

    public Licenca motivoBloqueioAcesso(String motivoBloqueioAcesso) {
        this.setMotivoBloqueioAcesso(motivoBloqueioAcesso);
        return this;
    }

    public void setMotivoBloqueioAcesso(String motivoBloqueioAcesso) {
        this.motivoBloqueioAcesso = motivoBloqueioAcesso;
    }

    public String getMensagemBloqueioAcesso() {
        return this.mensagemBloqueioAcesso;
    }

    public Licenca mensagemBloqueioAcesso(String mensagemBloqueioAcesso) {
        this.setMensagemBloqueioAcesso(mensagemBloqueioAcesso);
        return this;
    }

    public void setMensagemBloqueioAcesso(String mensagemBloqueioAcesso) {
        this.mensagemBloqueioAcesso = mensagemBloqueioAcesso;
    }

    public Pessoa getPessoa() {
        return this.pessoa;
    }

    public void setPessoa(Pessoa pessoa) {
        this.pessoa = pessoa;
    }

    public Licenca pessoa(Pessoa pessoa) {
        this.setPessoa(pessoa);
        return this;
    }

    public PessoaFisica getPessoaResponsavel() {
        return this.pessoaResponsavel;
    }

    public void setPessoaResponsavel(PessoaFisica pessoaFisica) {
        this.pessoaResponsavel = pessoaFisica;
    }

    public Licenca pessoaResponsavel(PessoaFisica pessoaFisica) {
        this.setPessoaResponsavel(pessoaFisica);
        return this;
    }

    public PessoaFisica getPessoaFinanceiro() {
        return this.pessoaFinanceiro;
    }

    public void setPessoaFinanceiro(PessoaFisica pessoaFisica) {
        this.pessoaFinanceiro = pessoaFisica;
    }

    public Licenca pessoaFinanceiro(PessoaFisica pessoaFisica) {
        this.setPessoaFinanceiro(pessoaFisica);
        return this;
    }

    public Usuario getUsuarioSuporte() {
        return this.usuarioSuporte;
    }

    public void setUsuarioSuporte(Usuario usuario) {
        this.usuarioSuporte = usuario;
    }

    public Licenca usuarioSuporte(Usuario usuario) {
        this.setUsuarioSuporte(usuario);
        return this;
    }

    public Usuario getUsuarioRobo() {
        return this.usuarioRobo;
    }

    public void setUsuarioRobo(Usuario usuario) {
        this.usuarioRobo = usuario;
    }

    public Licenca usuarioRobo(Usuario usuario) {
        this.setUsuarioRobo(usuario);
        return this;
    }

    public Filial getFilialPadrao() {
        return this.filialPadrao;
    }

    public void setFilialPadrao(Filial filial) {
        this.filialPadrao = filial;
    }

    public Licenca filialPadrao(Filial filial) {
        this.setFilialPadrao(filial);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Licenca)) {
            return false;
        }
        return id != null && id.equals(((Licenca) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Licenca{" +
            "id=" + getId() +
            ", codigo=" + getCodigo() +
            ", dataCriacao='" + getDataCriacao() + "'" +
            ", dataInicioUtilizacao='" + getDataInicioUtilizacao() + "'" +
            ", dataInicioFaturamento='" + getDataInicioFaturamento() + "'" +
            ", dataPrimeiroVencimentoBoleto='" + getDataPrimeiroVencimentoBoleto() + "'" +
            ", diaVencimentoBoleto=" + getDiaVencimentoBoleto() +
            ", produtosContratados='" + getProdutosContratados() + "'" +
            ", valoresNegociados='" + getValoresNegociados() + "'" +
            ", contratacaoBloqueioIps='" + getContratacaoBloqueioIps() + "'" +
            ", contratacaoEmailProposta='" + getContratacaoEmailProposta() + "'" +
            ", criarPedido='" + getCriarPedido() + "'" +
            ", criarNegociacoes='" + getCriarNegociacoes() + "'" +
            ", sincronizarDadosCadastroCliente='" + getSincronizarDadosCadastroCliente() + "'" +
            ", sincronizarDadosCarteiraCliente='" + getSincronizarDadosCarteiraCliente() + "'" +
            ", bloqueioAcesso='" + getBloqueioAcesso() + "'" +
            ", dataBloqueioAcesso='" + getDataBloqueioAcesso() + "'" +
            ", motivoBloqueioAcesso='" + getMotivoBloqueioAcesso() + "'" +
            ", mensagemBloqueioAcesso='" + getMensagemBloqueioAcesso() + "'" +
            "}";
    }
}
