package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Pessoa.
 */
@Entity
@Table(name = "pessoa")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Pessoa implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Size(max = 100)
    @Column(name = "email_1", length = 100)
    private String email1;

    @Size(max = 11)
    @Column(name = "telefone_1", length = 11)
    private String telefone1;

    @JsonIgnoreProperties(value = { "licenca" }, allowSetters = true)
    @OneToOne
    @JoinColumn(unique = true)
    private Endereco endereco;

    @ManyToOne
    @JsonIgnoreProperties(
        value = { "pessoa", "pessoaResponsavel", "pessoaFinanceiro", "usuarioSuporte", "usuarioRobo", "filialPadrao" },
        allowSetters = true
    )
    private Licenca licenca;

    @ManyToOne
    private Operadora operadoraTelefone1;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Pessoa id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getEmail1() {
        return this.email1;
    }

    public Pessoa email1(String email1) {
        this.setEmail1(email1);
        return this;
    }

    public void setEmail1(String email1) {
        this.email1 = email1;
    }

    public String getTelefone1() {
        return this.telefone1;
    }

    public Pessoa telefone1(String telefone1) {
        this.setTelefone1(telefone1);
        return this;
    }

    public void setTelefone1(String telefone1) {
        this.telefone1 = telefone1;
    }

    public Endereco getEndereco() {
        return this.endereco;
    }

    public void setEndereco(Endereco endereco) {
        this.endereco = endereco;
    }

    public Pessoa endereco(Endereco endereco) {
        this.setEndereco(endereco);
        return this;
    }

    public Licenca getLicenca() {
        return this.licenca;
    }

    public void setLicenca(Licenca licenca) {
        this.licenca = licenca;
    }

    public Pessoa licenca(Licenca licenca) {
        this.setLicenca(licenca);
        return this;
    }

    public Operadora getOperadoraTelefone1() {
        return this.operadoraTelefone1;
    }

    public void setOperadoraTelefone1(Operadora operadora) {
        this.operadoraTelefone1 = operadora;
    }

    public Pessoa operadoraTelefone1(Operadora operadora) {
        this.setOperadoraTelefone1(operadora);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Pessoa)) {
            return false;
        }
        return id != null && id.equals(((Pessoa) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Pessoa{" +
            "id=" + getId() +
            ", email1='" + getEmail1() + "'" +
            ", telefone1='" + getTelefone1() + "'" +
            "}";
    }
}
