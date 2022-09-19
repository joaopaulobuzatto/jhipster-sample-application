package com.mycompany.myapp.domain;

import java.io.Serializable;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A ArrCep.
 */
@Entity
@Table(name = "arr_cep")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class ArrCep implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "sequenceGenerator")
    @SequenceGenerator(name = "sequenceGenerator")
    @Column(name = "id")
    private Long id;

    @NotNull
    @Size(max = 8)
    @Column(name = "cepnum", length = 8, nullable = false)
    private String cepnum;

    @Size(max = 100)
    @Column(name = "cependtip", length = 100)
    private String cependtip;

    @Size(max = 255)
    @Column(name = "cepend", length = 255)
    private String cepend;

    @Size(max = 255)
    @Column(name = "cependcompl", length = 255)
    private String cependcompl;

    @Size(max = 255)
    @Column(name = "cepbai", length = 255)
    private String cepbai;

    @Size(max = 8)
    @Column(name = "cepcid", length = 8)
    private String cepcid;

    @Column(name = "cepmuncod")
    private Integer cepmuncod;

    @Size(max = 100)
    @Column(name = "cepmunnom", length = 100)
    private String cepmunnom;

    @Size(max = 2)
    @Column(name = "cepmunuf", length = 2)
    private String cepmunuf;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public ArrCep id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCepnum() {
        return this.cepnum;
    }

    public ArrCep cepnum(String cepnum) {
        this.setCepnum(cepnum);
        return this;
    }

    public void setCepnum(String cepnum) {
        this.cepnum = cepnum;
    }

    public String getCependtip() {
        return this.cependtip;
    }

    public ArrCep cependtip(String cependtip) {
        this.setCependtip(cependtip);
        return this;
    }

    public void setCependtip(String cependtip) {
        this.cependtip = cependtip;
    }

    public String getCepend() {
        return this.cepend;
    }

    public ArrCep cepend(String cepend) {
        this.setCepend(cepend);
        return this;
    }

    public void setCepend(String cepend) {
        this.cepend = cepend;
    }

    public String getCependcompl() {
        return this.cependcompl;
    }

    public ArrCep cependcompl(String cependcompl) {
        this.setCependcompl(cependcompl);
        return this;
    }

    public void setCependcompl(String cependcompl) {
        this.cependcompl = cependcompl;
    }

    public String getCepbai() {
        return this.cepbai;
    }

    public ArrCep cepbai(String cepbai) {
        this.setCepbai(cepbai);
        return this;
    }

    public void setCepbai(String cepbai) {
        this.cepbai = cepbai;
    }

    public String getCepcid() {
        return this.cepcid;
    }

    public ArrCep cepcid(String cepcid) {
        this.setCepcid(cepcid);
        return this;
    }

    public void setCepcid(String cepcid) {
        this.cepcid = cepcid;
    }

    public Integer getCepmuncod() {
        return this.cepmuncod;
    }

    public ArrCep cepmuncod(Integer cepmuncod) {
        this.setCepmuncod(cepmuncod);
        return this;
    }

    public void setCepmuncod(Integer cepmuncod) {
        this.cepmuncod = cepmuncod;
    }

    public String getCepmunnom() {
        return this.cepmunnom;
    }

    public ArrCep cepmunnom(String cepmunnom) {
        this.setCepmunnom(cepmunnom);
        return this;
    }

    public void setCepmunnom(String cepmunnom) {
        this.cepmunnom = cepmunnom;
    }

    public String getCepmunuf() {
        return this.cepmunuf;
    }

    public ArrCep cepmunuf(String cepmunuf) {
        this.setCepmunuf(cepmunuf);
        return this;
    }

    public void setCepmunuf(String cepmunuf) {
        this.cepmunuf = cepmunuf;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof ArrCep)) {
            return false;
        }
        return id != null && id.equals(((ArrCep) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "ArrCep{" +
            "id=" + getId() +
            ", cepnum='" + getCepnum() + "'" +
            ", cependtip='" + getCependtip() + "'" +
            ", cepend='" + getCepend() + "'" +
            ", cependcompl='" + getCependcompl() + "'" +
            ", cepbai='" + getCepbai() + "'" +
            ", cepcid='" + getCepcid() + "'" +
            ", cepmuncod=" + getCepmuncod() +
            ", cepmunnom='" + getCepmunnom() + "'" +
            ", cepmunuf='" + getCepmunuf() + "'" +
            "}";
    }
}
