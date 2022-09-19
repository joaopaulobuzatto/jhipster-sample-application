package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.mycompany.myapp.domain.enumeration.TipoOrigemAnexoArquivo;
import java.io.Serializable;
import java.time.Instant;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A AnexoArquivo.
 */
@Entity
@Table(name = "anexo_arquivo")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class AnexoArquivo implements Serializable {

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

    @Size(max = 100)
    @Column(name = "descricao", length = 100)
    private String descricao;

    @NotNull
    @Size(max = 255)
    @Column(name = "nome_nuvem", length = 255, nullable = false)
    private String nomeNuvem;

    @Size(max = 255)
    @Column(name = "nome_original", length = 255)
    private String nomeOriginal;

    @Enumerated(EnumType.STRING)
    @Column(name = "tipo_origem_anexo_arquivo")
    private TipoOrigemAnexoArquivo tipoOrigemAnexoArquivo;

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
    private DetentorAnexoArquivo detentorAnexoArquivo;

    @ManyToOne
    @JsonIgnoreProperties(value = { "licenca", "usuarioCriador" }, allowSetters = true)
    private TipoDeDocumentoAnexavel tipoDeDocumentoAnexavel;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public AnexoArquivo id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCodigo() {
        return this.codigo;
    }

    public AnexoArquivo codigo(Long codigo) {
        this.setCodigo(codigo);
        return this;
    }

    public void setCodigo(Long codigo) {
        this.codigo = codigo;
    }

    public Instant getDataCriacao() {
        return this.dataCriacao;
    }

    public AnexoArquivo dataCriacao(Instant dataCriacao) {
        this.setDataCriacao(dataCriacao);
        return this;
    }

    public void setDataCriacao(Instant dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public String getDescricao() {
        return this.descricao;
    }

    public AnexoArquivo descricao(String descricao) {
        this.setDescricao(descricao);
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getNomeNuvem() {
        return this.nomeNuvem;
    }

    public AnexoArquivo nomeNuvem(String nomeNuvem) {
        this.setNomeNuvem(nomeNuvem);
        return this;
    }

    public void setNomeNuvem(String nomeNuvem) {
        this.nomeNuvem = nomeNuvem;
    }

    public String getNomeOriginal() {
        return this.nomeOriginal;
    }

    public AnexoArquivo nomeOriginal(String nomeOriginal) {
        this.setNomeOriginal(nomeOriginal);
        return this;
    }

    public void setNomeOriginal(String nomeOriginal) {
        this.nomeOriginal = nomeOriginal;
    }

    public TipoOrigemAnexoArquivo getTipoOrigemAnexoArquivo() {
        return this.tipoOrigemAnexoArquivo;
    }

    public AnexoArquivo tipoOrigemAnexoArquivo(TipoOrigemAnexoArquivo tipoOrigemAnexoArquivo) {
        this.setTipoOrigemAnexoArquivo(tipoOrigemAnexoArquivo);
        return this;
    }

    public void setTipoOrigemAnexoArquivo(TipoOrigemAnexoArquivo tipoOrigemAnexoArquivo) {
        this.tipoOrigemAnexoArquivo = tipoOrigemAnexoArquivo;
    }

    public Licenca getLicenca() {
        return this.licenca;
    }

    public void setLicenca(Licenca licenca) {
        this.licenca = licenca;
    }

    public AnexoArquivo licenca(Licenca licenca) {
        this.setLicenca(licenca);
        return this;
    }

    public Usuario getUsuarioCriador() {
        return this.usuarioCriador;
    }

    public void setUsuarioCriador(Usuario usuario) {
        this.usuarioCriador = usuario;
    }

    public AnexoArquivo usuarioCriador(Usuario usuario) {
        this.setUsuarioCriador(usuario);
        return this;
    }

    public DetentorAnexoArquivo getDetentorAnexoArquivo() {
        return this.detentorAnexoArquivo;
    }

    public void setDetentorAnexoArquivo(DetentorAnexoArquivo detentorAnexoArquivo) {
        this.detentorAnexoArquivo = detentorAnexoArquivo;
    }

    public AnexoArquivo detentorAnexoArquivo(DetentorAnexoArquivo detentorAnexoArquivo) {
        this.setDetentorAnexoArquivo(detentorAnexoArquivo);
        return this;
    }

    public TipoDeDocumentoAnexavel getTipoDeDocumentoAnexavel() {
        return this.tipoDeDocumentoAnexavel;
    }

    public void setTipoDeDocumentoAnexavel(TipoDeDocumentoAnexavel tipoDeDocumentoAnexavel) {
        this.tipoDeDocumentoAnexavel = tipoDeDocumentoAnexavel;
    }

    public AnexoArquivo tipoDeDocumentoAnexavel(TipoDeDocumentoAnexavel tipoDeDocumentoAnexavel) {
        this.setTipoDeDocumentoAnexavel(tipoDeDocumentoAnexavel);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof AnexoArquivo)) {
            return false;
        }
        return id != null && id.equals(((AnexoArquivo) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "AnexoArquivo{" +
            "id=" + getId() +
            ", codigo=" + getCodigo() +
            ", dataCriacao='" + getDataCriacao() + "'" +
            ", descricao='" + getDescricao() + "'" +
            ", nomeNuvem='" + getNomeNuvem() + "'" +
            ", nomeOriginal='" + getNomeOriginal() + "'" +
            ", tipoOrigemAnexoArquivo='" + getTipoOrigemAnexoArquivo() + "'" +
            "}";
    }
}
