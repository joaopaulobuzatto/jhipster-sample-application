package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A UsuarioGrupoPermissoes.
 */
@Entity
@Table(name = "usuario_grupo_permissoes")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class UsuarioGrupoPermissoes implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JsonIgnoreProperties(
        value = { "pessoa", "pessoaResponsavel", "pessoaFinanceiro", "usuarioSuporte", "usuarioRobo", "filialPadrao" },
        allowSetters = true
    )
    private Licenca licenca;

    @ManyToOne
    @JsonIgnoreProperties(value = { "licenca", "supervisor", "usuarioCriador", "pessoaFisica", "horarioTrabalho" }, allowSetters = true)
    private Usuario usuario;

    @ManyToOne
    @JsonIgnoreProperties(value = { "licenca", "usuarioCriador" }, allowSetters = true)
    private GrupoPermissoes grupoPermissoes;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public UsuarioGrupoPermissoes id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Licenca getLicenca() {
        return this.licenca;
    }

    public void setLicenca(Licenca licenca) {
        this.licenca = licenca;
    }

    public UsuarioGrupoPermissoes licenca(Licenca licenca) {
        this.setLicenca(licenca);
        return this;
    }

    public Usuario getUsuario() {
        return this.usuario;
    }

    public void setUsuario(Usuario usuario) {
        this.usuario = usuario;
    }

    public UsuarioGrupoPermissoes usuario(Usuario usuario) {
        this.setUsuario(usuario);
        return this;
    }

    public GrupoPermissoes getGrupoPermissoes() {
        return this.grupoPermissoes;
    }

    public void setGrupoPermissoes(GrupoPermissoes grupoPermissoes) {
        this.grupoPermissoes = grupoPermissoes;
    }

    public UsuarioGrupoPermissoes grupoPermissoes(GrupoPermissoes grupoPermissoes) {
        this.setGrupoPermissoes(grupoPermissoes);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof UsuarioGrupoPermissoes)) {
            return false;
        }
        return id != null && id.equals(((UsuarioGrupoPermissoes) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "UsuarioGrupoPermissoes{" +
            "id=" + getId() +
            "}";
    }
}
