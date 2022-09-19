package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Feriado.
 */
@Entity
@Table(name = "feriado")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Feriado implements Serializable {

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

    @NotNull
    @Column(name = "data", nullable = false)
    private Instant data;

    @NotNull
    @Size(max = 50)
    @Column(name = "nome", length = 50, nullable = false)
    private String nome;

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

    public Feriado id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCodigo() {
        return this.codigo;
    }

    public Feriado codigo(Long codigo) {
        this.setCodigo(codigo);
        return this;
    }

    public void setCodigo(Long codigo) {
        this.codigo = codigo;
    }

    public Instant getDataCriacao() {
        return this.dataCriacao;
    }

    public Feriado dataCriacao(Instant dataCriacao) {
        this.setDataCriacao(dataCriacao);
        return this;
    }

    public void setDataCriacao(Instant dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public Instant getData() {
        return this.data;
    }

    public Feriado data(Instant data) {
        this.setData(data);
        return this;
    }

    public void setData(Instant data) {
        this.data = data;
    }

    public String getNome() {
        return this.nome;
    }

    public Feriado nome(String nome) {
        this.setNome(nome);
        return this;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public Licenca getLicenca() {
        return this.licenca;
    }

    public void setLicenca(Licenca licenca) {
        this.licenca = licenca;
    }

    public Feriado licenca(Licenca licenca) {
        this.setLicenca(licenca);
        return this;
    }

    public Usuario getUsuarioCriador() {
        return this.usuarioCriador;
    }

    public void setUsuarioCriador(Usuario usuario) {
        this.usuarioCriador = usuario;
    }

    public Feriado usuarioCriador(Usuario usuario) {
        this.setUsuarioCriador(usuario);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Feriado)) {
            return false;
        }
        return id != null && id.equals(((Feriado) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Feriado{" +
            "id=" + getId() +
            ", codigo=" + getCodigo() +
            ", dataCriacao='" + getDataCriacao() + "'" +
            ", data='" + getData() + "'" +
            ", nome='" + getNome() + "'" +
            "}";
    }
}
