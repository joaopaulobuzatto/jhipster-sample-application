package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A PessoaJuridica.
 */
@Entity
@Table(name = "pessoa_juridica")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class PessoaJuridica implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Size(max = 14)
    @Column(name = "cnpj", length = 14)
    private String cnpj;

    @Size(max = 200)
    @Column(name = "razao_social", length = 200)
    private String razaoSocial;

    @NotNull
    @Size(max = 200)
    @Column(name = "nome_fantasia", length = 200, nullable = false)
    private String nomeFantasia;

    @Size(max = 50)
    @Column(name = "codigo_cnae", length = 50)
    private String codigoCnae;

    @Column(name = "data_abertura")
    private Instant dataAbertura;

    @Size(max = 50)
    @Column(name = "codigo_cnae_principal", length = 50)
    private String codigoCnaePrincipal;

    @Size(max = 50)
    @Column(name = "codigo_natureza_juridica", length = 50)
    private String codigoNaturezaJuridica;

    @Column(name = "quantidade_funcionarios")
    private Integer quantidadeFuncionarios;

    @ManyToOne
    @JsonIgnoreProperties(
        value = { "pessoa", "pessoaResponsavel", "pessoaFinanceiro", "usuarioSuporte", "usuarioRobo", "filialPadrao" },
        allowSetters = true
    )
    private Licenca pessoaJuridicaLicenca;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public PessoaJuridica id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCnpj() {
        return this.cnpj;
    }

    public PessoaJuridica cnpj(String cnpj) {
        this.setCnpj(cnpj);
        return this;
    }

    public void setCnpj(String cnpj) {
        this.cnpj = cnpj;
    }

    public String getRazaoSocial() {
        return this.razaoSocial;
    }

    public PessoaJuridica razaoSocial(String razaoSocial) {
        this.setRazaoSocial(razaoSocial);
        return this;
    }

    public void setRazaoSocial(String razaoSocial) {
        this.razaoSocial = razaoSocial;
    }

    public String getNomeFantasia() {
        return this.nomeFantasia;
    }

    public PessoaJuridica nomeFantasia(String nomeFantasia) {
        this.setNomeFantasia(nomeFantasia);
        return this;
    }

    public void setNomeFantasia(String nomeFantasia) {
        this.nomeFantasia = nomeFantasia;
    }

    public String getCodigoCnae() {
        return this.codigoCnae;
    }

    public PessoaJuridica codigoCnae(String codigoCnae) {
        this.setCodigoCnae(codigoCnae);
        return this;
    }

    public void setCodigoCnae(String codigoCnae) {
        this.codigoCnae = codigoCnae;
    }

    public Instant getDataAbertura() {
        return this.dataAbertura;
    }

    public PessoaJuridica dataAbertura(Instant dataAbertura) {
        this.setDataAbertura(dataAbertura);
        return this;
    }

    public void setDataAbertura(Instant dataAbertura) {
        this.dataAbertura = dataAbertura;
    }

    public String getCodigoCnaePrincipal() {
        return this.codigoCnaePrincipal;
    }

    public PessoaJuridica codigoCnaePrincipal(String codigoCnaePrincipal) {
        this.setCodigoCnaePrincipal(codigoCnaePrincipal);
        return this;
    }

    public void setCodigoCnaePrincipal(String codigoCnaePrincipal) {
        this.codigoCnaePrincipal = codigoCnaePrincipal;
    }

    public String getCodigoNaturezaJuridica() {
        return this.codigoNaturezaJuridica;
    }

    public PessoaJuridica codigoNaturezaJuridica(String codigoNaturezaJuridica) {
        this.setCodigoNaturezaJuridica(codigoNaturezaJuridica);
        return this;
    }

    public void setCodigoNaturezaJuridica(String codigoNaturezaJuridica) {
        this.codigoNaturezaJuridica = codigoNaturezaJuridica;
    }

    public Integer getQuantidadeFuncionarios() {
        return this.quantidadeFuncionarios;
    }

    public PessoaJuridica quantidadeFuncionarios(Integer quantidadeFuncionarios) {
        this.setQuantidadeFuncionarios(quantidadeFuncionarios);
        return this;
    }

    public void setQuantidadeFuncionarios(Integer quantidadeFuncionarios) {
        this.quantidadeFuncionarios = quantidadeFuncionarios;
    }

    public Licenca getPessoaJuridicaLicenca() {
        return this.pessoaJuridicaLicenca;
    }

    public void setPessoaJuridicaLicenca(Licenca licenca) {
        this.pessoaJuridicaLicenca = licenca;
    }

    public PessoaJuridica pessoaJuridicaLicenca(Licenca licenca) {
        this.setPessoaJuridicaLicenca(licenca);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PessoaJuridica)) {
            return false;
        }
        return id != null && id.equals(((PessoaJuridica) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PessoaJuridica{" +
            "id=" + getId() +
            ", cnpj='" + getCnpj() + "'" +
            ", razaoSocial='" + getRazaoSocial() + "'" +
            ", nomeFantasia='" + getNomeFantasia() + "'" +
            ", codigoCnae='" + getCodigoCnae() + "'" +
            ", dataAbertura='" + getDataAbertura() + "'" +
            ", codigoCnaePrincipal='" + getCodigoCnaePrincipal() + "'" +
            ", codigoNaturezaJuridica='" + getCodigoNaturezaJuridica() + "'" +
            ", quantidadeFuncionarios=" + getQuantidadeFuncionarios() +
            "}";
    }
}
