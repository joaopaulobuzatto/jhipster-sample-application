package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A HorarioTrabalhoPeriodo.
 */
@Entity
@Table(name = "horario_trabalho_periodo")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class HorarioTrabalhoPeriodo implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "data_criacao", nullable = false)
    private Instant dataCriacao;

    @Size(max = 50)
    @Column(name = "dia_da_semana", length = 50)
    private String diaDaSemana;

    @Column(name = "periodo_1_inicio")
    private Instant periodo1Inicio;

    @Column(name = "periodo_1_fim")
    private Instant periodo1Fim;

    @Column(name = "periodo_2_inicio")
    private Instant periodo2Inicio;

    @Column(name = "periodo_2_fim")
    private Instant periodo2Fim;

    @Column(name = "periodo_3_inicio")
    private Instant periodo3Inicio;

    @Column(name = "periodo_3_fim")
    private Instant periodo3Fim;

    @Column(name = "periodo_4_inicio")
    private Instant periodo4Inicio;

    @Column(name = "periodo_4_fim")
    private Instant periodo4Fim;

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
    @JsonIgnoreProperties(value = { "licenca", "usuarioCriador" }, allowSetters = true)
    private HorarioTrabalho horarioTrabalho;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public HorarioTrabalhoPeriodo id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDataCriacao() {
        return this.dataCriacao;
    }

    public HorarioTrabalhoPeriodo dataCriacao(Instant dataCriacao) {
        this.setDataCriacao(dataCriacao);
        return this;
    }

    public void setDataCriacao(Instant dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public String getDiaDaSemana() {
        return this.diaDaSemana;
    }

    public HorarioTrabalhoPeriodo diaDaSemana(String diaDaSemana) {
        this.setDiaDaSemana(diaDaSemana);
        return this;
    }

    public void setDiaDaSemana(String diaDaSemana) {
        this.diaDaSemana = diaDaSemana;
    }

    public Instant getPeriodo1Inicio() {
        return this.periodo1Inicio;
    }

    public HorarioTrabalhoPeriodo periodo1Inicio(Instant periodo1Inicio) {
        this.setPeriodo1Inicio(periodo1Inicio);
        return this;
    }

    public void setPeriodo1Inicio(Instant periodo1Inicio) {
        this.periodo1Inicio = periodo1Inicio;
    }

    public Instant getPeriodo1Fim() {
        return this.periodo1Fim;
    }

    public HorarioTrabalhoPeriodo periodo1Fim(Instant periodo1Fim) {
        this.setPeriodo1Fim(periodo1Fim);
        return this;
    }

    public void setPeriodo1Fim(Instant periodo1Fim) {
        this.periodo1Fim = periodo1Fim;
    }

    public Instant getPeriodo2Inicio() {
        return this.periodo2Inicio;
    }

    public HorarioTrabalhoPeriodo periodo2Inicio(Instant periodo2Inicio) {
        this.setPeriodo2Inicio(periodo2Inicio);
        return this;
    }

    public void setPeriodo2Inicio(Instant periodo2Inicio) {
        this.periodo2Inicio = periodo2Inicio;
    }

    public Instant getPeriodo2Fim() {
        return this.periodo2Fim;
    }

    public HorarioTrabalhoPeriodo periodo2Fim(Instant periodo2Fim) {
        this.setPeriodo2Fim(periodo2Fim);
        return this;
    }

    public void setPeriodo2Fim(Instant periodo2Fim) {
        this.periodo2Fim = periodo2Fim;
    }

    public Instant getPeriodo3Inicio() {
        return this.periodo3Inicio;
    }

    public HorarioTrabalhoPeriodo periodo3Inicio(Instant periodo3Inicio) {
        this.setPeriodo3Inicio(periodo3Inicio);
        return this;
    }

    public void setPeriodo3Inicio(Instant periodo3Inicio) {
        this.periodo3Inicio = periodo3Inicio;
    }

    public Instant getPeriodo3Fim() {
        return this.periodo3Fim;
    }

    public HorarioTrabalhoPeriodo periodo3Fim(Instant periodo3Fim) {
        this.setPeriodo3Fim(periodo3Fim);
        return this;
    }

    public void setPeriodo3Fim(Instant periodo3Fim) {
        this.periodo3Fim = periodo3Fim;
    }

    public Instant getPeriodo4Inicio() {
        return this.periodo4Inicio;
    }

    public HorarioTrabalhoPeriodo periodo4Inicio(Instant periodo4Inicio) {
        this.setPeriodo4Inicio(periodo4Inicio);
        return this;
    }

    public void setPeriodo4Inicio(Instant periodo4Inicio) {
        this.periodo4Inicio = periodo4Inicio;
    }

    public Instant getPeriodo4Fim() {
        return this.periodo4Fim;
    }

    public HorarioTrabalhoPeriodo periodo4Fim(Instant periodo4Fim) {
        this.setPeriodo4Fim(periodo4Fim);
        return this;
    }

    public void setPeriodo4Fim(Instant periodo4Fim) {
        this.periodo4Fim = periodo4Fim;
    }

    public Licenca getLicenca() {
        return this.licenca;
    }

    public void setLicenca(Licenca licenca) {
        this.licenca = licenca;
    }

    public HorarioTrabalhoPeriodo licenca(Licenca licenca) {
        this.setLicenca(licenca);
        return this;
    }

    public Usuario getUsuarioCriador() {
        return this.usuarioCriador;
    }

    public void setUsuarioCriador(Usuario usuario) {
        this.usuarioCriador = usuario;
    }

    public HorarioTrabalhoPeriodo usuarioCriador(Usuario usuario) {
        this.setUsuarioCriador(usuario);
        return this;
    }

    public HorarioTrabalho getHorarioTrabalho() {
        return this.horarioTrabalho;
    }

    public void setHorarioTrabalho(HorarioTrabalho horarioTrabalho) {
        this.horarioTrabalho = horarioTrabalho;
    }

    public HorarioTrabalhoPeriodo horarioTrabalho(HorarioTrabalho horarioTrabalho) {
        this.setHorarioTrabalho(horarioTrabalho);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof HorarioTrabalhoPeriodo)) {
            return false;
        }
        return id != null && id.equals(((HorarioTrabalhoPeriodo) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "HorarioTrabalhoPeriodo{" +
            "id=" + getId() +
            ", dataCriacao='" + getDataCriacao() + "'" +
            ", diaDaSemana='" + getDiaDaSemana() + "'" +
            ", periodo1Inicio='" + getPeriodo1Inicio() + "'" +
            ", periodo1Fim='" + getPeriodo1Fim() + "'" +
            ", periodo2Inicio='" + getPeriodo2Inicio() + "'" +
            ", periodo2Fim='" + getPeriodo2Fim() + "'" +
            ", periodo3Inicio='" + getPeriodo3Inicio() + "'" +
            ", periodo3Fim='" + getPeriodo3Fim() + "'" +
            ", periodo4Inicio='" + getPeriodo4Inicio() + "'" +
            ", periodo4Fim='" + getPeriodo4Fim() + "'" +
            "}";
    }
}
