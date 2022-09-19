package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Endereco.
 */
@Entity
@Table(name = "endereco")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Endereco implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Size(max = 20)
    @Column(name = "cep", length = 20)
    private String cep;

    @Size(max = 100)
    @Column(name = "logradouro", length = 100)
    private String logradouro;

    @Size(max = 20)
    @Column(name = "numero", length = 20)
    private String numero;

    @Size(max = 100)
    @Column(name = "bairro", length = 100)
    private String bairro;

    @Size(max = 100)
    @Column(name = "complemento", length = 100)
    private String complemento;

    @Size(max = 100)
    @Column(name = "ponto_referencia", length = 100)
    private String pontoReferencia;

    @Size(max = 100)
    @Column(name = "cidade", length = 100)
    private String cidade;

    @Size(max = 2)
    @Column(name = "uf", length = 2)
    private String uf;

    @ManyToOne
    @JsonIgnoreProperties(
        value = { "pessoa", "pessoaResponsavel", "pessoaFinanceiro", "usuarioSuporte", "usuarioRobo", "filialPadrao" },
        allowSetters = true
    )
    private Licenca licenca;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Endereco id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCep() {
        return this.cep;
    }

    public Endereco cep(String cep) {
        this.setCep(cep);
        return this;
    }

    public void setCep(String cep) {
        this.cep = cep;
    }

    public String getLogradouro() {
        return this.logradouro;
    }

    public Endereco logradouro(String logradouro) {
        this.setLogradouro(logradouro);
        return this;
    }

    public void setLogradouro(String logradouro) {
        this.logradouro = logradouro;
    }

    public String getNumero() {
        return this.numero;
    }

    public Endereco numero(String numero) {
        this.setNumero(numero);
        return this;
    }

    public void setNumero(String numero) {
        this.numero = numero;
    }

    public String getBairro() {
        return this.bairro;
    }

    public Endereco bairro(String bairro) {
        this.setBairro(bairro);
        return this;
    }

    public void setBairro(String bairro) {
        this.bairro = bairro;
    }

    public String getComplemento() {
        return this.complemento;
    }

    public Endereco complemento(String complemento) {
        this.setComplemento(complemento);
        return this;
    }

    public void setComplemento(String complemento) {
        this.complemento = complemento;
    }

    public String getPontoReferencia() {
        return this.pontoReferencia;
    }

    public Endereco pontoReferencia(String pontoReferencia) {
        this.setPontoReferencia(pontoReferencia);
        return this;
    }

    public void setPontoReferencia(String pontoReferencia) {
        this.pontoReferencia = pontoReferencia;
    }

    public String getCidade() {
        return this.cidade;
    }

    public Endereco cidade(String cidade) {
        this.setCidade(cidade);
        return this;
    }

    public void setCidade(String cidade) {
        this.cidade = cidade;
    }

    public String getUf() {
        return this.uf;
    }

    public Endereco uf(String uf) {
        this.setUf(uf);
        return this;
    }

    public void setUf(String uf) {
        this.uf = uf;
    }

    public Licenca getLicenca() {
        return this.licenca;
    }

    public void setLicenca(Licenca licenca) {
        this.licenca = licenca;
    }

    public Endereco licenca(Licenca licenca) {
        this.setLicenca(licenca);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Endereco)) {
            return false;
        }
        return id != null && id.equals(((Endereco) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Endereco{" +
            "id=" + getId() +
            ", cep='" + getCep() + "'" +
            ", logradouro='" + getLogradouro() + "'" +
            ", numero='" + getNumero() + "'" +
            ", bairro='" + getBairro() + "'" +
            ", complemento='" + getComplemento() + "'" +
            ", pontoReferencia='" + getPontoReferencia() + "'" +
            ", cidade='" + getCidade() + "'" +
            ", uf='" + getUf() + "'" +
            "}";
    }
}
