package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A DetentorAnexoArquivo.
 */
@Entity
@Table(name = "detentor_anexo_arquivo")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class DetentorAnexoArquivo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "data_criacao", nullable = false)
    private Instant dataCriacao;

    @ManyToOne
    @JsonIgnoreProperties(
        value = { "pessoa", "pessoaResponsavel", "pessoaFinanceiro", "usuarioSuporte", "usuarioRobo", "filialPadrao" },
        allowSetters = true
    )
    private Licenca licenca;

    @ManyToOne
    @JsonIgnoreProperties(value = { "licenca", "supervisor", "usuarioCriador", "pessoaFisica", "horarioTrabalho" }, allowSetters = true)
    private Usuario usuarioCriador;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public DetentorAnexoArquivo id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDataCriacao() {
        return this.dataCriacao;
    }

    public DetentorAnexoArquivo dataCriacao(Instant dataCriacao) {
        this.setDataCriacao(dataCriacao);
        return this;
    }

    public void setDataCriacao(Instant dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public Licenca getLicenca() {
        return this.licenca;
    }

    public void setLicenca(Licenca licenca) {
        this.licenca = licenca;
    }

    public DetentorAnexoArquivo licenca(Licenca licenca) {
        this.setLicenca(licenca);
        return this;
    }

    public Usuario getUsuarioCriador() {
        return this.usuarioCriador;
    }

    public void setUsuarioCriador(Usuario usuario) {
        this.usuarioCriador = usuario;
    }

    public DetentorAnexoArquivo usuarioCriador(Usuario usuario) {
        this.setUsuarioCriador(usuario);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof DetentorAnexoArquivo)) {
            return false;
        }
        return id != null && id.equals(((DetentorAnexoArquivo) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "DetentorAnexoArquivo{" +
            "id=" + getId() +
            ", dataCriacao='" + getDataCriacao() + "'" +
            "}";
    }
}
