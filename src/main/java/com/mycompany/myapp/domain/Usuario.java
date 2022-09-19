package com.mycompany.myapp.domain;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.io.Serializable;
import java.time.Instant;
import javax.persistence.*;
import javax.validation.constraints.*;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

/**
 * A Usuario.
 */
@Entity
@Table(name = "usuario")
@Cache(usage = CacheConcurrencyStrategy.READ_WRITE)
@SuppressWarnings("common-java:DuplicatedBlocks")
public class Usuario implements Serializable {

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
    @Size(max = 70)
    @Column(name = "senha", length = 70, nullable = false)
    private String senha;

    @NotNull
    @Column(name = "is_admin", nullable = false)
    private Boolean isAdmin;

    @NotNull
    @Column(name = "is_suporte", nullable = false)
    private Boolean isSuporte;

    @NotNull
    @Size(max = 70)
    @Column(name = "nome_exibicao", length = 70, nullable = false)
    private String nomeExibicao;

    @NotNull
    @Column(name = "is_consultor", nullable = false)
    private Boolean isConsultor;

    @NotNull
    @Column(name = "is_supervisor", nullable = false)
    private Boolean isSupervisor;

    @NotNull
    @Column(name = "is_ativo", nullable = false)
    private Boolean isAtivo;

    @Column(name = "is_administrativo")
    private Boolean isAdministrativo;

    @NotNull
    @Column(name = "receber_emails", nullable = false)
    private Boolean receberEmails;

    @NotNull
    @Column(name = "is_email_valido", nullable = false)
    private Boolean isEmailValido;

    @Size(max = 50)
    @Column(name = "uuid_email", length = 50)
    private String uuidEmail;

    @NotNull
    @Size(max = 100)
    @Column(name = "email", length = 100, nullable = false)
    private String email;

    @NotNull
    @Column(name = "is_executor_sac", nullable = false)
    private Boolean isExecutorSac;

    @Column(name = "liberar_horario_feriado")
    private Boolean liberarHorarioFeriado;

    @ManyToOne
    @JsonIgnoreProperties(
        value = { "pessoa", "pessoaResponsavel", "pessoaFinanceiro", "usuarioSuporte", "usuarioRobo", "filialPadrao" },
        allowSetters = true
    )
    private Licenca licenca;

    @ManyToOne
    @JsonIgnoreProperties(value = { "licenca", "supervisor", "usuarioCriador", "pessoaFisica", "horarioTrabalho" }, allowSetters = true)
    private Usuario supervisor;

    @ManyToOne
    @JsonIgnoreProperties(value = { "licenca", "supervisor", "usuarioCriador", "pessoaFisica", "horarioTrabalho" }, allowSetters = true)
    private Usuario usuarioCriador;

    @ManyToOne
    @JsonIgnoreProperties(value = { "pessoaFisicaLicenca" }, allowSetters = true)
    private PessoaFisica pessoaFisica;

    @ManyToOne
    @JsonIgnoreProperties(value = { "licenca", "usuarioCriador" }, allowSetters = true)
    private HorarioTrabalho horarioTrabalho;

    // jhipster-needle-entity-add-field - JHipster will add fields here

    public Long getId() {
        return this.id;
    }

    public Usuario id(Long id) {
        this.setId(id);
        return this;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getCodigo() {
        return this.codigo;
    }

    public Usuario codigo(Long codigo) {
        this.setCodigo(codigo);
        return this;
    }

    public void setCodigo(Long codigo) {
        this.codigo = codigo;
    }

    public Instant getDataCriacao() {
        return this.dataCriacao;
    }

    public Usuario dataCriacao(Instant dataCriacao) {
        this.setDataCriacao(dataCriacao);
        return this;
    }

    public void setDataCriacao(Instant dataCriacao) {
        this.dataCriacao = dataCriacao;
    }

    public String getSenha() {
        return this.senha;
    }

    public Usuario senha(String senha) {
        this.setSenha(senha);
        return this;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public Boolean getIsAdmin() {
        return this.isAdmin;
    }

    public Usuario isAdmin(Boolean isAdmin) {
        this.setIsAdmin(isAdmin);
        return this;
    }

    public void setIsAdmin(Boolean isAdmin) {
        this.isAdmin = isAdmin;
    }

    public Boolean getIsSuporte() {
        return this.isSuporte;
    }

    public Usuario isSuporte(Boolean isSuporte) {
        this.setIsSuporte(isSuporte);
        return this;
    }

    public void setIsSuporte(Boolean isSuporte) {
        this.isSuporte = isSuporte;
    }

    public String getNomeExibicao() {
        return this.nomeExibicao;
    }

    public Usuario nomeExibicao(String nomeExibicao) {
        this.setNomeExibicao(nomeExibicao);
        return this;
    }

    public void setNomeExibicao(String nomeExibicao) {
        this.nomeExibicao = nomeExibicao;
    }

    public Boolean getIsConsultor() {
        return this.isConsultor;
    }

    public Usuario isConsultor(Boolean isConsultor) {
        this.setIsConsultor(isConsultor);
        return this;
    }

    public void setIsConsultor(Boolean isConsultor) {
        this.isConsultor = isConsultor;
    }

    public Boolean getIsSupervisor() {
        return this.isSupervisor;
    }

    public Usuario isSupervisor(Boolean isSupervisor) {
        this.setIsSupervisor(isSupervisor);
        return this;
    }

    public void setIsSupervisor(Boolean isSupervisor) {
        this.isSupervisor = isSupervisor;
    }

    public Boolean getIsAtivo() {
        return this.isAtivo;
    }

    public Usuario isAtivo(Boolean isAtivo) {
        this.setIsAtivo(isAtivo);
        return this;
    }

    public void setIsAtivo(Boolean isAtivo) {
        this.isAtivo = isAtivo;
    }

    public Boolean getIsAdministrativo() {
        return this.isAdministrativo;
    }

    public Usuario isAdministrativo(Boolean isAdministrativo) {
        this.setIsAdministrativo(isAdministrativo);
        return this;
    }

    public void setIsAdministrativo(Boolean isAdministrativo) {
        this.isAdministrativo = isAdministrativo;
    }

    public Boolean getReceberEmails() {
        return this.receberEmails;
    }

    public Usuario receberEmails(Boolean receberEmails) {
        this.setReceberEmails(receberEmails);
        return this;
    }

    public void setReceberEmails(Boolean receberEmails) {
        this.receberEmails = receberEmails;
    }

    public Boolean getIsEmailValido() {
        return this.isEmailValido;
    }

    public Usuario isEmailValido(Boolean isEmailValido) {
        this.setIsEmailValido(isEmailValido);
        return this;
    }

    public void setIsEmailValido(Boolean isEmailValido) {
        this.isEmailValido = isEmailValido;
    }

    public String getUuidEmail() {
        return this.uuidEmail;
    }

    public Usuario uuidEmail(String uuidEmail) {
        this.setUuidEmail(uuidEmail);
        return this;
    }

    public void setUuidEmail(String uuidEmail) {
        this.uuidEmail = uuidEmail;
    }

    public String getEmail() {
        return this.email;
    }

    public Usuario email(String email) {
        this.setEmail(email);
        return this;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public Boolean getIsExecutorSac() {
        return this.isExecutorSac;
    }

    public Usuario isExecutorSac(Boolean isExecutorSac) {
        this.setIsExecutorSac(isExecutorSac);
        return this;
    }

    public void setIsExecutorSac(Boolean isExecutorSac) {
        this.isExecutorSac = isExecutorSac;
    }

    public Boolean getLiberarHorarioFeriado() {
        return this.liberarHorarioFeriado;
    }

    public Usuario liberarHorarioFeriado(Boolean liberarHorarioFeriado) {
        this.setLiberarHorarioFeriado(liberarHorarioFeriado);
        return this;
    }

    public void setLiberarHorarioFeriado(Boolean liberarHorarioFeriado) {
        this.liberarHorarioFeriado = liberarHorarioFeriado;
    }

    public Licenca getLicenca() {
        return this.licenca;
    }

    public void setLicenca(Licenca licenca) {
        this.licenca = licenca;
    }

    public Usuario licenca(Licenca licenca) {
        this.setLicenca(licenca);
        return this;
    }

    public Usuario getSupervisor() {
        return this.supervisor;
    }

    public void setSupervisor(Usuario usuario) {
        this.supervisor = usuario;
    }

    public Usuario supervisor(Usuario usuario) {
        this.setSupervisor(usuario);
        return this;
    }

    public Usuario getUsuarioCriador() {
        return this.usuarioCriador;
    }

    public void setUsuarioCriador(Usuario usuario) {
        this.usuarioCriador = usuario;
    }

    public Usuario usuarioCriador(Usuario usuario) {
        this.setUsuarioCriador(usuario);
        return this;
    }

    public PessoaFisica getPessoaFisica() {
        return this.pessoaFisica;
    }

    public void setPessoaFisica(PessoaFisica pessoaFisica) {
        this.pessoaFisica = pessoaFisica;
    }

    public Usuario pessoaFisica(PessoaFisica pessoaFisica) {
        this.setPessoaFisica(pessoaFisica);
        return this;
    }

    public HorarioTrabalho getHorarioTrabalho() {
        return this.horarioTrabalho;
    }

    public void setHorarioTrabalho(HorarioTrabalho horarioTrabalho) {
        this.horarioTrabalho = horarioTrabalho;
    }

    public Usuario horarioTrabalho(HorarioTrabalho horarioTrabalho) {
        this.setHorarioTrabalho(horarioTrabalho);
        return this;
    }

    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Usuario)) {
            return false;
        }
        return id != null && id.equals(((Usuario) o).id);
    }

    @Override
    public int hashCode() {
        // see https://vladmihalcea.com/how-to-implement-equals-and-hashcode-using-the-jpa-entity-identifier/
        return getClass().hashCode();
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Usuario{" +
            "id=" + getId() +
            ", codigo=" + getCodigo() +
            ", dataCriacao='" + getDataCriacao() + "'" +
            ", senha='" + getSenha() + "'" +
            ", isAdmin='" + getIsAdmin() + "'" +
            ", isSuporte='" + getIsSuporte() + "'" +
            ", nomeExibicao='" + getNomeExibicao() + "'" +
            ", isConsultor='" + getIsConsultor() + "'" +
            ", isSupervisor='" + getIsSupervisor() + "'" +
            ", isAtivo='" + getIsAtivo() + "'" +
            ", isAdministrativo='" + getIsAdministrativo() + "'" +
            ", receberEmails='" + getReceberEmails() + "'" +
            ", isEmailValido='" + getIsEmailValido() + "'" +
            ", uuidEmail='" + getUuidEmail() + "'" +
            ", email='" + getEmail() + "'" +
            ", isExecutorSac='" + getIsExecutorSac() + "'" +
            ", liberarHorarioFeriado='" + getLiberarHorarioFeriado() + "'" +
            "}";
    }
}
