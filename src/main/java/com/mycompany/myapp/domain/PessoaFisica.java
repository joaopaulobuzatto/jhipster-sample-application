package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A PessoaFisica.
 */
@Entity
@Table(name = "pessoa_fisica")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class PessoaFisica implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(max = 100)
    @Column(name = "nome_completo", length = 100, nullable = false)
    private String nomeCompleto;

    @Size(max = 14)
    @Column(name = "cpf", length = 14)
    private String cpf;

    @Size(max = 15)
    @Column(name = "rg", length = 15)
    private String rg;

    @Column(name = "data_nascimento")
    private Instant dataNascimento;

    @ManyToOne
    @JsonIgnoreProperties(
        value = { "pessoa", "pessoaResponsavel", "pessoaFinanceiro", "usuarioSuporte", "usuarioRobo", "filialPadrao" },
        allowSetters = true
    )
    private Licenca pessoaFisicaLicenca;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public PessoaFisica id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNomeCompleto() {
        return this.nomeCompleto;
    }

    public PessoaFisica nomeCompleto(String nomeCompleto) {
        this.setNomeCompleto(nomeCompleto);
        return this;
    }

    public void setNomeCompleto(String nomeCompleto) {
        this.nomeCompleto = nomeCompleto;
    }

    public String getCpf() {
        return this.cpf;
    }

    public PessoaFisica cpf(String cpf) {
        this.setCpf(cpf);
        return this;
    }

    public void setCpf(String cpf) {
        this.cpf = cpf;
    }

    public String getRg() {
        return this.rg;
    }

    public PessoaFisica rg(String rg) {
        this.setRg(rg);
        return this;
    }

    public void setRg(String rg) {
        this.rg = rg;
    }

    public Instant getDataNascimento() {
        return this.dataNascimento;
    }

    public PessoaFisica dataNascimento(Instant dataNascimento) {
        this.setDataNascimento(dataNascimento);
        return this;
    }

    public void setDataNascimento(Instant dataNascimento) {
        this.dataNascimento = dataNascimento;
    }

    public Licenca getPessoaFisicaLicenca() {
        return this.pessoaFisicaLicenca;
    }

    public void setPessoaFisicaLicenca(Licenca licenca) {
        this.pessoaFisicaLicenca = licenca;
    }

    public PessoaFisica pessoaFisicaLicenca(Licenca licenca) {
        this.setPessoaFisicaLicenca(licenca);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof PessoaFisica)) {
            return false;
        }
        return id != null && id.equals(((PessoaFisica) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "PessoaFisica{" +
            "id=" + getId() +
            ", nomeCompleto='" + getNomeCompleto() + "'" +
            ", cpf='" + getCpf() + "'" +
            ", rg='" + getRg() + "'" +
            ", dataNascimento='" + getDataNascimento() + "'" +
            "}";
    }
}
