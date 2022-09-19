package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import javax.persistence.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A OfertaServico.
 */
@Entity
@Table(name = "oferta_servico")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class OfertaServico implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @ManyToOne
    @JsonIgnoreProperties(value = { "usuarioCriador", "plano" }, allowSetters = true)
    private Oferta oferta;

    @ManyToOne
    @JsonIgnoreProperties(value = { "usuarioCriador" }, allowSetters = true)
    private Servico servico;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public OfertaServico id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Oferta getOferta() {
        return this.oferta;
    }

    public void setOferta(Oferta oferta) {
        this.oferta = oferta;
    }

    public OfertaServico oferta(Oferta oferta) {
        this.setOferta(oferta);
        return this;
    }

    public Servico getServico() {
        return this.servico;
    }

    public void setServico(Servico servico) {
        this.servico = servico;
    }

    public OfertaServico servico(Servico servico) {
        this.setServico(servico);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof OfertaServico)) {
            return false;
        }
        return id != null && id.equals(((OfertaServico) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "OfertaServico{" +
            "id=" + getId() +
            "}";
    }
}
