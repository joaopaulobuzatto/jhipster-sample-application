package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.mycompany.myapp.domain.enumeration.ClassificacaoAparelho;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Aparelho.
 */
@Entity
@Table(name = "aparelho")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Aparelho implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @Column(name = "codigo")
    private String codigo;

    @NotNull
    @Column(name = "data_criacao", nullable = false)
    private Instant dataCriacao;

    @Enumerated(EnumType.STRING)
    @Column(name = "classificacao_aparelho")
    private ClassificacaoAparelho classificacaoAparelho;

    @NotNull
    @Column(name = "descricao", nullable = false)
    private String descricao;

    @NotNull
    @Column(name = "nome_tecnico", nullable = false)
    private String nomeTecnico;

    @Column(name = "material")
    private String material;

    @Column(name = "valor", precision = 21, scale = 2)
    private BigDecimal valor;

    @Column(name = "ativo")
    private Boolean ativo;

    @ManyToOne
    @JsonIgnoreProperties(value = { "licenca", "supervisor", "usuarioCriador", "pessoaFisica", "horarioTrabalho" }, allowSetters = true)
    private Usuario usuarioCriador;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Aparelho id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCodigo() {
        return this.codigo;
    }

    public Aparelho codigo(String codigo) {
        this.setCodigo(codigo);
        return this;
    }

    public void setCodigo(String codigo) {
        this.codigo = codigo;
    }

    public Instant getDataCriacao() {
        return this.dataCriacao;
    }

    public Aparelho dataCriacao(Instant dataCriacao) {
        this.setDataCriacao(dataCriacao);
        return this;
    }

    public void setDataCriacao(Instant dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public ClassificacaoAparelho getClassificacaoAparelho() {
        return this.classificacaoAparelho;
    }

    public Aparelho classificacaoAparelho(ClassificacaoAparelho classificacaoAparelho) {
        this.setClassificacaoAparelho(classificacaoAparelho);
        return this;
    }

    public void setClassificacaoAparelho(ClassificacaoAparelho classificacaoAparelho) {
        this.classificacaoAparelho = classificacaoAparelho;
    }

    public String getDescricao() {
        return this.descricao;
    }

    public Aparelho descricao(String descricao) {
        this.setDescricao(descricao);
        return this;
    }

    public void setDescricao(String descricao) {
        this.descricao = descricao;
    }

    public String getNomeTecnico() {
        return this.nomeTecnico;
    }

    public Aparelho nomeTecnico(String nomeTecnico) {
        this.setNomeTecnico(nomeTecnico);
        return this;
    }

    public void setNomeTecnico(String nomeTecnico) {
        this.nomeTecnico = nomeTecnico;
    }

    public String getMaterial() {
        return this.material;
    }

    public Aparelho material(String material) {
        this.setMaterial(material);
        return this;
    }

    public void setMaterial(String material) {
        this.material = material;
    }

    public BigDecimal getValor() {
        return this.valor;
    }

    public Aparelho valor(BigDecimal valor) {
        this.setValor(valor);
        return this;
    }

    public void setValor(BigDecimal valor) {
        this.valor = valor;
    }

    public Boolean getAtivo() {
        return this.ativo;
    }

    public Aparelho ativo(Boolean ativo) {
        this.setAtivo(ativo);
        return this;
    }

    public void setAtivo(Boolean ativo) {
        this.ativo = ativo;
    }

    public Usuario getUsuarioCriador() {
        return this.usuarioCriador;
    }

    public void setUsuarioCriador(Usuario usuario) {
        this.usuarioCriador = usuario;
    }

    public Aparelho usuarioCriador(Usuario usuario) {
        this.setUsuarioCriador(usuario);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Aparelho)) {
            return false;
        }
        return id != null && id.equals(((Aparelho) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Aparelho{" +
            "id=" + getId() +
            ", codigo='" + getCodigo() + "'" +
            ", dataCriacao='" + getDataCriacao() + "'" +
            ", classificacaoAparelho='" + getClassificacaoAparelho() + "'" +
            ", descricao='" + getDescricao() + "'" +
            ", nomeTecnico='" + getNomeTecnico() + "'" +
            ", material='" + getMaterial() + "'" +
            ", valor=" + getValor() +
            ", ativo='" + getAtivo() + "'" +
            "}";
    }
}
