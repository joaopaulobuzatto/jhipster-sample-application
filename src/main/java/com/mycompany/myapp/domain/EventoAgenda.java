package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A EventoAgenda.
 */
@Entity
@Table(name = "evento_agenda")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class EventoAgenda implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "data_criacao", nullable = false)
    private Instant dataCriacao;

    @NotNull
    @Column(name = "data", nullable = false)
    private Instant data;

    @NotNull
    @Size(max = 255)
    @Column(name = "descricao", length = 255, nullable = false)
    private String descricao;

    @ManyToOne
    @JsonIgnoreProperties(
        value = { "pessoa", "pessoaResponsavel", "pessoaFinanceiro", "usuarioSuporte", "usuarioRobo", "filialPadrao" },
        allowSetters = true
    )
    private Licenca licenca;

    @ManyToOne
    @JsonIgnoreProperties(value = { "licenca", "supervisor", "usuarioCriador", "pessoaFisica", "horarioTrabalho" }, allowSetters = true)
    private Usuario usuarioCriador;

    @ManyToOne
    @JsonIgnoreProperties(value = { "licenca", "supervisor", "usuarioCriador", "pessoaFisica", "horarioTrabalho" }, allowSetters = true)
    private Usuario usuarioResponsavel;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public EventoAgenda id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDataCriacao() {
        return this.dataCriacao;
    }

    public EventoAgenda dataCriacao(Instant dataCriacao) {
        this.setDataCriacao(dataCriacao);
        return this;
    }

    public void setDataCriacao(Instant dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public Instant getData() {
        return this.data;
    }

    public EventoAgenda data(Instant data) {
        this.setData(data);
        return this;
    }

    public void setData(Instant data) {
        this.data = data;
    }

    public String getDescricao() {
        return this.descricao;
    }

    public EventoAgenda descricao(String descricao) {
        this.setDescricao(descricao);
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public Licenca getLicenca() {
        return this.licenca;
    }

    public void setLicenca(Licenca licenca) {
        this.licenca = licenca;
    }

    public EventoAgenda licenca(Licenca licenca) {
        this.setLicenca(licenca);
        return this;
    }

    public Usuario getUsuarioCriador() {
        return this.usuarioCriador;
    }

    public void setUsuarioCriador(Usuario usuario) {
        this.usuarioCriador = usuario;
    }

    public EventoAgenda usuarioCriador(Usuario usuario) {
        this.setUsuarioCriador(usuario);
        return this;
    }

    public Usuario getUsuarioResponsavel() {
        return this.usuarioResponsavel;
    }

    public void setUsuarioResponsavel(Usuario usuario) {
        this.usuarioResponsavel = usuario;
    }

    public EventoAgenda usuarioResponsavel(Usuario usuario) {
        this.setUsuarioResponsavel(usuario);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof EventoAgenda)) {
            return false;
        }
        return id != null && id.equals(((EventoAgenda) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "EventoAgenda{" +
            "id=" + getId() +
            ", dataCriacao='" + getDataCriacao() + "'" +
            ", data='" + getData() + "'" +
            ", descricao='" + getDescricao() + "'" +
            "}";
    }
}
