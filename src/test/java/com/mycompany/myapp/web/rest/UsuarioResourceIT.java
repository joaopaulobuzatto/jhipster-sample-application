package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Usuario;
import com.mycompany.myapp.repository.UsuarioRepository;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Random;
import java.util.concurrent.atomic.AtomicLong;
import javax.persistence.EntityManager;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;

/**
 * Integration tests for the {@link UsuarioResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class UsuarioResourceIT {

    private static final Long DEFAULT_CODIGO = 1L;
    private static final Long UPDATED_CODIGO = 2L;

    private static final Instant DEFAULT_DATA_CRIACAO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATA_CRIACAO = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_SENHA = "AAAAAAAAAA";
    private static final String UPDATED_SENHA = "BBBBBBBBBB";

    private static final Boolean DEFAULT_IS_ADMIN = false;
    private static final Boolean UPDATED_IS_ADMIN = true;

    private static final Boolean DEFAULT_IS_SUPORTE = false;
    private static final Boolean UPDATED_IS_SUPORTE = true;

    private static final String DEFAULT_NOME_EXIBICAO = "AAAAAAAAAA";
    private static final String UPDATED_NOME_EXIBICAO = "BBBBBBBBBB";

    private static final Boolean DEFAULT_IS_CONSULTOR = false;
    private static final Boolean UPDATED_IS_CONSULTOR = true;

    private static final Boolean DEFAULT_IS_SUPERVISOR = false;
    private static final Boolean UPDATED_IS_SUPERVISOR = true;

    private static final Boolean DEFAULT_IS_ATIVO = false;
    private static final Boolean UPDATED_IS_ATIVO = true;

    private static final Boolean DEFAULT_IS_ADMINISTRATIVO = false;
    private static final Boolean UPDATED_IS_ADMINISTRATIVO = true;

    private static final Boolean DEFAULT_RECEBER_EMAILS = false;
    private static final Boolean UPDATED_RECEBER_EMAILS = true;

    private static final Boolean DEFAULT_IS_EMAIL_VALIDO = false;
    private static final Boolean UPDATED_IS_EMAIL_VALIDO = true;

    private static final String DEFAULT_UUID_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_UUID_EMAIL = "BBBBBBBBBB";

    private static final String DEFAULT_EMAIL = "AAAAAAAAAA";
    private static final String UPDATED_EMAIL = "BBBBBBBBBB";

    private static final Boolean DEFAULT_IS_EXECUTOR_SAC = false;
    private static final Boolean UPDATED_IS_EXECUTOR_SAC = true;

    private static final Boolean DEFAULT_LIBERAR_HORARIO_FERIADO = false;
    private static final Boolean UPDATED_LIBERAR_HORARIO_FERIADO = true;

    private static final String ENTITY_API_URL = "/api/usuarios";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private UsuarioRepository usuarioRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restUsuarioMockMvc;

    private Usuario usuario;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Usuario createEntity(EntityManager em) {
        Usuario usuario = new Usuario()
            .codigo(DEFAULT_CODIGO)
            .dataCriacao(DEFAULT_DATA_CRIACAO)
            .senha(DEFAULT_SENHA)
            .isAdmin(DEFAULT_IS_ADMIN)
            .isSuporte(DEFAULT_IS_SUPORTE)
            .nomeExibicao(DEFAULT_NOME_EXIBICAO)
            .isConsultor(DEFAULT_IS_CONSULTOR)
            .isSupervisor(DEFAULT_IS_SUPERVISOR)
            .isAtivo(DEFAULT_IS_ATIVO)
            .isAdministrativo(DEFAULT_IS_ADMINISTRATIVO)
            .receberEmails(DEFAULT_RECEBER_EMAILS)
            .isEmailValido(DEFAULT_IS_EMAIL_VALIDO)
            .uuidEmail(DEFAULT_UUID_EMAIL)
            .email(DEFAULT_EMAIL)
            .isExecutorSac(DEFAULT_IS_EXECUTOR_SAC)
            .liberarHorarioFeriado(DEFAULT_LIBERAR_HORARIO_FERIADO);
        return usuario;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Usuario createUpdatedEntity(EntityManager em) {
        Usuario usuario = new Usuario()
            .codigo(UPDATED_CODIGO)
            .dataCriacao(UPDATED_DATA_CRIACAO)
            .senha(UPDATED_SENHA)
            .isAdmin(UPDATED_IS_ADMIN)
            .isSuporte(UPDATED_IS_SUPORTE)
            .nomeExibicao(UPDATED_NOME_EXIBICAO)
            .isConsultor(UPDATED_IS_CONSULTOR)
            .isSupervisor(UPDATED_IS_SUPERVISOR)
            .isAtivo(UPDATED_IS_ATIVO)
            .isAdministrativo(UPDATED_IS_ADMINISTRATIVO)
            .receberEmails(UPDATED_RECEBER_EMAILS)
            .isEmailValido(UPDATED_IS_EMAIL_VALIDO)
            .uuidEmail(UPDATED_UUID_EMAIL)
            .email(UPDATED_EMAIL)
            .isExecutorSac(UPDATED_IS_EXECUTOR_SAC)
            .liberarHorarioFeriado(UPDATED_LIBERAR_HORARIO_FERIADO);
        return usuario;
    }

    @BeforeEach
    public void initTest() {
        usuario = createEntity(em);
    }

    @Test
    @Transactional
    void createUsuario() throws Exception {
        int databaseSizeBeforeCreate = usuarioRepository.findAll().size();
        // Create the Usuario
        restUsuarioMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(usuario)))
            .andExpect(status().isCreated());

        // Validate the Usuario in the database
        List<Usuario> usuarioList = usuarioRepository.findAll();
        assertThat(usuarioList).hasSize(databaseSizeBeforeCreate + 1);
        Usuario testUsuario = usuarioList.get(usuarioList.size() - 1);
        assertThat(testUsuario.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testUsuario.getDataCriacao()).isEqualTo(DEFAULT_DATA_CRIACAO);
        assertThat(testUsuario.getSenha()).isEqualTo(DEFAULT_SENHA);
        assertThat(testUsuario.getIsAdmin()).isEqualTo(DEFAULT_IS_ADMIN);
        assertThat(testUsuario.getIsSuporte()).isEqualTo(DEFAULT_IS_SUPORTE);
        assertThat(testUsuario.getNomeExibicao()).isEqualTo(DEFAULT_NOME_EXIBICAO);
        assertThat(testUsuario.getIsConsultor()).isEqualTo(DEFAULT_IS_CONSULTOR);
        assertThat(testUsuario.getIsSupervisor()).isEqualTo(DEFAULT_IS_SUPERVISOR);
        assertThat(testUsuario.getIsAtivo()).isEqualTo(DEFAULT_IS_ATIVO);
        assertThat(testUsuario.getIsAdministrativo()).isEqualTo(DEFAULT_IS_ADMINISTRATIVO);
        assertThat(testUsuario.getReceberEmails()).isEqualTo(DEFAULT_RECEBER_EMAILS);
        assertThat(testUsuario.getIsEmailValido()).isEqualTo(DEFAULT_IS_EMAIL_VALIDO);
        assertThat(testUsuario.getUuidEmail()).isEqualTo(DEFAULT_UUID_EMAIL);
        assertThat(testUsuario.getEmail()).isEqualTo(DEFAULT_EMAIL);
        assertThat(testUsuario.getIsExecutorSac()).isEqualTo(DEFAULT_IS_EXECUTOR_SAC);
        assertThat(testUsuario.getLiberarHorarioFeriado()).isEqualTo(DEFAULT_LIBERAR_HORARIO_FERIADO);
    }

    @Test
    @Transactional
    void createUsuarioWithExistingId() throws Exception {
        // Create the Usuario with an existing ID
        usuario.setId(1L);

        int databaseSizeBeforeCreate = usuarioRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restUsuarioMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(usuario)))
            .andExpect(status().isBadRequest());

        // Validate the Usuario in the database
        List<Usuario> usuarioList = usuarioRepository.findAll();
        assertThat(usuarioList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkDataCriacaoIsRequired() throws Exception {
        int databaseSizeBeforeTest = usuarioRepository.findAll().size();
        // set the field null
        usuario.setDataCriacao(null);

        // Create the Usuario, which fails.

        restUsuarioMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(usuario)))
            .andExpect(status().isBadRequest());

        List<Usuario> usuarioList = usuarioRepository.findAll();
        assertThat(usuarioList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkSenhaIsRequired() throws Exception {
        int databaseSizeBeforeTest = usuarioRepository.findAll().size();
        // set the field null
        usuario.setSenha(null);

        // Create the Usuario, which fails.

        restUsuarioMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(usuario)))
            .andExpect(status().isBadRequest());

        List<Usuario> usuarioList = usuarioRepository.findAll();
        assertThat(usuarioList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkIsAdminIsRequired() throws Exception {
        int databaseSizeBeforeTest = usuarioRepository.findAll().size();
        // set the field null
        usuario.setIsAdmin(null);

        // Create the Usuario, which fails.

        restUsuarioMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(usuario)))
            .andExpect(status().isBadRequest());

        List<Usuario> usuarioList = usuarioRepository.findAll();
        assertThat(usuarioList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkIsSuporteIsRequired() throws Exception {
        int databaseSizeBeforeTest = usuarioRepository.findAll().size();
        // set the field null
        usuario.setIsSuporte(null);

        // Create the Usuario, which fails.

        restUsuarioMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(usuario)))
            .andExpect(status().isBadRequest());

        List<Usuario> usuarioList = usuarioRepository.findAll();
        assertThat(usuarioList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkNomeExibicaoIsRequired() throws Exception {
        int databaseSizeBeforeTest = usuarioRepository.findAll().size();
        // set the field null
        usuario.setNomeExibicao(null);

        // Create the Usuario, which fails.

        restUsuarioMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(usuario)))
            .andExpect(status().isBadRequest());

        List<Usuario> usuarioList = usuarioRepository.findAll();
        assertThat(usuarioList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkIsConsultorIsRequired() throws Exception {
        int databaseSizeBeforeTest = usuarioRepository.findAll().size();
        // set the field null
        usuario.setIsConsultor(null);

        // Create the Usuario, which fails.

        restUsuarioMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(usuario)))
            .andExpect(status().isBadRequest());

        List<Usuario> usuarioList = usuarioRepository.findAll();
        assertThat(usuarioList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkIsSupervisorIsRequired() throws Exception {
        int databaseSizeBeforeTest = usuarioRepository.findAll().size();
        // set the field null
        usuario.setIsSupervisor(null);

        // Create the Usuario, which fails.

        restUsuarioMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(usuario)))
            .andExpect(status().isBadRequest());

        List<Usuario> usuarioList = usuarioRepository.findAll();
        assertThat(usuarioList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkIsAtivoIsRequired() throws Exception {
        int databaseSizeBeforeTest = usuarioRepository.findAll().size();
        // set the field null
        usuario.setIsAtivo(null);

        // Create the Usuario, which fails.

        restUsuarioMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(usuario)))
            .andExpect(status().isBadRequest());

        List<Usuario> usuarioList = usuarioRepository.findAll();
        assertThat(usuarioList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkReceberEmailsIsRequired() throws Exception {
        int databaseSizeBeforeTest = usuarioRepository.findAll().size();
        // set the field null
        usuario.setReceberEmails(null);

        // Create the Usuario, which fails.

        restUsuarioMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(usuario)))
            .andExpect(status().isBadRequest());

        List<Usuario> usuarioList = usuarioRepository.findAll();
        assertThat(usuarioList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkIsEmailValidoIsRequired() throws Exception {
        int databaseSizeBeforeTest = usuarioRepository.findAll().size();
        // set the field null
        usuario.setIsEmailValido(null);

        // Create the Usuario, which fails.

        restUsuarioMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(usuario)))
            .andExpect(status().isBadRequest());

        List<Usuario> usuarioList = usuarioRepository.findAll();
        assertThat(usuarioList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkEmailIsRequired() throws Exception {
        int databaseSizeBeforeTest = usuarioRepository.findAll().size();
        // set the field null
        usuario.setEmail(null);

        // Create the Usuario, which fails.

        restUsuarioMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(usuario)))
            .andExpect(status().isBadRequest());

        List<Usuario> usuarioList = usuarioRepository.findAll();
        assertThat(usuarioList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkIsExecutorSacIsRequired() throws Exception {
        int databaseSizeBeforeTest = usuarioRepository.findAll().size();
        // set the field null
        usuario.setIsExecutorSac(null);

        // Create the Usuario, which fails.

        restUsuarioMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(usuario)))
            .andExpect(status().isBadRequest());

        List<Usuario> usuarioList = usuarioRepository.findAll();
        assertThat(usuarioList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllUsuarios() throws Exception {
        // Initialize the database
        usuarioRepository.saveAndFlush(usuario);

        // Get all the usuarioList
        restUsuarioMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(usuario.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO.intValue())))
            .andExpect(jsonPath("$.[*].dataCriacao").value(hasItem(DEFAULT_DATA_CRIACAO.toString())))
            .andExpect(jsonPath("$.[*].senha").value(hasItem(DEFAULT_SENHA)))
            .andExpect(jsonPath("$.[*].isAdmin").value(hasItem(DEFAULT_IS_ADMIN.booleanValue())))
            .andExpect(jsonPath("$.[*].isSuporte").value(hasItem(DEFAULT_IS_SUPORTE.booleanValue())))
            .andExpect(jsonPath("$.[*].nomeExibicao").value(hasItem(DEFAULT_NOME_EXIBICAO)))
            .andExpect(jsonPath("$.[*].isConsultor").value(hasItem(DEFAULT_IS_CONSULTOR.booleanValue())))
            .andExpect(jsonPath("$.[*].isSupervisor").value(hasItem(DEFAULT_IS_SUPERVISOR.booleanValue())))
            .andExpect(jsonPath("$.[*].isAtivo").value(hasItem(DEFAULT_IS_ATIVO.booleanValue())))
            .andExpect(jsonPath("$.[*].isAdministrativo").value(hasItem(DEFAULT_IS_ADMINISTRATIVO.booleanValue())))
            .andExpect(jsonPath("$.[*].receberEmails").value(hasItem(DEFAULT_RECEBER_EMAILS.booleanValue())))
            .andExpect(jsonPath("$.[*].isEmailValido").value(hasItem(DEFAULT_IS_EMAIL_VALIDO.booleanValue())))
            .andExpect(jsonPath("$.[*].uuidEmail").value(hasItem(DEFAULT_UUID_EMAIL)))
            .andExpect(jsonPath("$.[*].email").value(hasItem(DEFAULT_EMAIL)))
            .andExpect(jsonPath("$.[*].isExecutorSac").value(hasItem(DEFAULT_IS_EXECUTOR_SAC.booleanValue())))
            .andExpect(jsonPath("$.[*].liberarHorarioFeriado").value(hasItem(DEFAULT_LIBERAR_HORARIO_FERIADO.booleanValue())));
    }

    @Test
    @Transactional
    void getUsuario() throws Exception {
        // Initialize the database
        usuarioRepository.saveAndFlush(usuario);

        // Get the usuario
        restUsuarioMockMvc
            .perform(get(ENTITY_API_URL_ID, usuario.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(usuario.getId().intValue()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO.intValue()))
            .andExpect(jsonPath("$.dataCriacao").value(DEFAULT_DATA_CRIACAO.toString()))
            .andExpect(jsonPath("$.senha").value(DEFAULT_SENHA))
            .andExpect(jsonPath("$.isAdmin").value(DEFAULT_IS_ADMIN.booleanValue()))
            .andExpect(jsonPath("$.isSuporte").value(DEFAULT_IS_SUPORTE.booleanValue()))
            .andExpect(jsonPath("$.nomeExibicao").value(DEFAULT_NOME_EXIBICAO))
            .andExpect(jsonPath("$.isConsultor").value(DEFAULT_IS_CONSULTOR.booleanValue()))
            .andExpect(jsonPath("$.isSupervisor").value(DEFAULT_IS_SUPERVISOR.booleanValue()))
            .andExpect(jsonPath("$.isAtivo").value(DEFAULT_IS_ATIVO.booleanValue()))
            .andExpect(jsonPath("$.isAdministrativo").value(DEFAULT_IS_ADMINISTRATIVO.booleanValue()))
            .andExpect(jsonPath("$.receberEmails").value(DEFAULT_RECEBER_EMAILS.booleanValue()))
            .andExpect(jsonPath("$.isEmailValido").value(DEFAULT_IS_EMAIL_VALIDO.booleanValue()))
            .andExpect(jsonPath("$.uuidEmail").value(DEFAULT_UUID_EMAIL))
            .andExpect(jsonPath("$.email").value(DEFAULT_EMAIL))
            .andExpect(jsonPath("$.isExecutorSac").value(DEFAULT_IS_EXECUTOR_SAC.booleanValue()))
            .andExpect(jsonPath("$.liberarHorarioFeriado").value(DEFAULT_LIBERAR_HORARIO_FERIADO.booleanValue()));
    }

    @Test
    @Transactional
    void getNonExistingUsuario() throws Exception {
        // Get the usuario
        restUsuarioMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingUsuario() throws Exception {
        // Initialize the database
        usuarioRepository.saveAndFlush(usuario);

        int databaseSizeBeforeUpdate = usuarioRepository.findAll().size();

        // Update the usuario
        Usuario updatedUsuario = usuarioRepository.findById(usuario.getId()).get();
        // Disconnect from session so that the updates on updatedUsuario are not directly saved in db
        em.detach(updatedUsuario);
        updatedUsuario
            .codigo(UPDATED_CODIGO)
            .dataCriacao(UPDATED_DATA_CRIACAO)
            .senha(UPDATED_SENHA)
            .isAdmin(UPDATED_IS_ADMIN)
            .isSuporte(UPDATED_IS_SUPORTE)
            .nomeExibicao(UPDATED_NOME_EXIBICAO)
            .isConsultor(UPDATED_IS_CONSULTOR)
            .isSupervisor(UPDATED_IS_SUPERVISOR)
            .isAtivo(UPDATED_IS_ATIVO)
            .isAdministrativo(UPDATED_IS_ADMINISTRATIVO)
            .receberEmails(UPDATED_RECEBER_EMAILS)
            .isEmailValido(UPDATED_IS_EMAIL_VALIDO)
            .uuidEmail(UPDATED_UUID_EMAIL)
            .email(UPDATED_EMAIL)
            .isExecutorSac(UPDATED_IS_EXECUTOR_SAC)
            .liberarHorarioFeriado(UPDATED_LIBERAR_HORARIO_FERIADO);

        restUsuarioMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedUsuario.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedUsuario))
            )
            .andExpect(status().isOk());

        // Validate the Usuario in the database
        List<Usuario> usuarioList = usuarioRepository.findAll();
        assertThat(usuarioList).hasSize(databaseSizeBeforeUpdate);
        Usuario testUsuario = usuarioList.get(usuarioList.size() - 1);
        assertThat(testUsuario.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testUsuario.getDataCriacao()).isEqualTo(UPDATED_DATA_CRIACAO);
        assertThat(testUsuario.getSenha()).isEqualTo(UPDATED_SENHA);
        assertThat(testUsuario.getIsAdmin()).isEqualTo(UPDATED_IS_ADMIN);
        assertThat(testUsuario.getIsSuporte()).isEqualTo(UPDATED_IS_SUPORTE);
        assertThat(testUsuario.getNomeExibicao()).isEqualTo(UPDATED_NOME_EXIBICAO);
        assertThat(testUsuario.getIsConsultor()).isEqualTo(UPDATED_IS_CONSULTOR);
        assertThat(testUsuario.getIsSupervisor()).isEqualTo(UPDATED_IS_SUPERVISOR);
        assertThat(testUsuario.getIsAtivo()).isEqualTo(UPDATED_IS_ATIVO);
        assertThat(testUsuario.getIsAdministrativo()).isEqualTo(UPDATED_IS_ADMINISTRATIVO);
        assertThat(testUsuario.getReceberEmails()).isEqualTo(UPDATED_RECEBER_EMAILS);
        assertThat(testUsuario.getIsEmailValido()).isEqualTo(UPDATED_IS_EMAIL_VALIDO);
        assertThat(testUsuario.getUuidEmail()).isEqualTo(UPDATED_UUID_EMAIL);
        assertThat(testUsuario.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testUsuario.getIsExecutorSac()).isEqualTo(UPDATED_IS_EXECUTOR_SAC);
        assertThat(testUsuario.getLiberarHorarioFeriado()).isEqualTo(UPDATED_LIBERAR_HORARIO_FERIADO);
    }

    @Test
    @Transactional
    void putNonExistingUsuario() throws Exception {
        int databaseSizeBeforeUpdate = usuarioRepository.findAll().size();
        usuario.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUsuarioMockMvc
            .perform(
                put(ENTITY_API_URL_ID, usuario.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(usuario))
            )
            .andExpect(status().isBadRequest());

        // Validate the Usuario in the database
        List<Usuario> usuarioList = usuarioRepository.findAll();
        assertThat(usuarioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchUsuario() throws Exception {
        int databaseSizeBeforeUpdate = usuarioRepository.findAll().size();
        usuario.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUsuarioMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(usuario))
            )
            .andExpect(status().isBadRequest());

        // Validate the Usuario in the database
        List<Usuario> usuarioList = usuarioRepository.findAll();
        assertThat(usuarioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamUsuario() throws Exception {
        int databaseSizeBeforeUpdate = usuarioRepository.findAll().size();
        usuario.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUsuarioMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(usuario)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Usuario in the database
        List<Usuario> usuarioList = usuarioRepository.findAll();
        assertThat(usuarioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateUsuarioWithPatch() throws Exception {
        // Initialize the database
        usuarioRepository.saveAndFlush(usuario);

        int databaseSizeBeforeUpdate = usuarioRepository.findAll().size();

        // Update the usuario using partial update
        Usuario partialUpdatedUsuario = new Usuario();
        partialUpdatedUsuario.setId(usuario.getId());

        partialUpdatedUsuario
            .codigo(UPDATED_CODIGO)
            .dataCriacao(UPDATED_DATA_CRIACAO)
            .isSuporte(UPDATED_IS_SUPORTE)
            .isSupervisor(UPDATED_IS_SUPERVISOR)
            .isAtivo(UPDATED_IS_ATIVO)
            .isAdministrativo(UPDATED_IS_ADMINISTRATIVO)
            .isEmailValido(UPDATED_IS_EMAIL_VALIDO)
            .uuidEmail(UPDATED_UUID_EMAIL)
            .email(UPDATED_EMAIL)
            .liberarHorarioFeriado(UPDATED_LIBERAR_HORARIO_FERIADO);

        restUsuarioMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedUsuario.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedUsuario))
            )
            .andExpect(status().isOk());

        // Validate the Usuario in the database
        List<Usuario> usuarioList = usuarioRepository.findAll();
        assertThat(usuarioList).hasSize(databaseSizeBeforeUpdate);
        Usuario testUsuario = usuarioList.get(usuarioList.size() - 1);
        assertThat(testUsuario.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testUsuario.getDataCriacao()).isEqualTo(UPDATED_DATA_CRIACAO);
        assertThat(testUsuario.getSenha()).isEqualTo(DEFAULT_SENHA);
        assertThat(testUsuario.getIsAdmin()).isEqualTo(DEFAULT_IS_ADMIN);
        assertThat(testUsuario.getIsSuporte()).isEqualTo(UPDATED_IS_SUPORTE);
        assertThat(testUsuario.getNomeExibicao()).isEqualTo(DEFAULT_NOME_EXIBICAO);
        assertThat(testUsuario.getIsConsultor()).isEqualTo(DEFAULT_IS_CONSULTOR);
        assertThat(testUsuario.getIsSupervisor()).isEqualTo(UPDATED_IS_SUPERVISOR);
        assertThat(testUsuario.getIsAtivo()).isEqualTo(UPDATED_IS_ATIVO);
        assertThat(testUsuario.getIsAdministrativo()).isEqualTo(UPDATED_IS_ADMINISTRATIVO);
        assertThat(testUsuario.getReceberEmails()).isEqualTo(DEFAULT_RECEBER_EMAILS);
        assertThat(testUsuario.getIsEmailValido()).isEqualTo(UPDATED_IS_EMAIL_VALIDO);
        assertThat(testUsuario.getUuidEmail()).isEqualTo(UPDATED_UUID_EMAIL);
        assertThat(testUsuario.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testUsuario.getIsExecutorSac()).isEqualTo(DEFAULT_IS_EXECUTOR_SAC);
        assertThat(testUsuario.getLiberarHorarioFeriado()).isEqualTo(UPDATED_LIBERAR_HORARIO_FERIADO);
    }

    @Test
    @Transactional
    void fullUpdateUsuarioWithPatch() throws Exception {
        // Initialize the database
        usuarioRepository.saveAndFlush(usuario);

        int databaseSizeBeforeUpdate = usuarioRepository.findAll().size();

        // Update the usuario using partial update
        Usuario partialUpdatedUsuario = new Usuario();
        partialUpdatedUsuario.setId(usuario.getId());

        partialUpdatedUsuario
            .codigo(UPDATED_CODIGO)
            .dataCriacao(UPDATED_DATA_CRIACAO)
            .senha(UPDATED_SENHA)
            .isAdmin(UPDATED_IS_ADMIN)
            .isSuporte(UPDATED_IS_SUPORTE)
            .nomeExibicao(UPDATED_NOME_EXIBICAO)
            .isConsultor(UPDATED_IS_CONSULTOR)
            .isSupervisor(UPDATED_IS_SUPERVISOR)
            .isAtivo(UPDATED_IS_ATIVO)
            .isAdministrativo(UPDATED_IS_ADMINISTRATIVO)
            .receberEmails(UPDATED_RECEBER_EMAILS)
            .isEmailValido(UPDATED_IS_EMAIL_VALIDO)
            .uuidEmail(UPDATED_UUID_EMAIL)
            .email(UPDATED_EMAIL)
            .isExecutorSac(UPDATED_IS_EXECUTOR_SAC)
            .liberarHorarioFeriado(UPDATED_LIBERAR_HORARIO_FERIADO);

        restUsuarioMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedUsuario.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedUsuario))
            )
            .andExpect(status().isOk());

        // Validate the Usuario in the database
        List<Usuario> usuarioList = usuarioRepository.findAll();
        assertThat(usuarioList).hasSize(databaseSizeBeforeUpdate);
        Usuario testUsuario = usuarioList.get(usuarioList.size() - 1);
        assertThat(testUsuario.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testUsuario.getDataCriacao()).isEqualTo(UPDATED_DATA_CRIACAO);
        assertThat(testUsuario.getSenha()).isEqualTo(UPDATED_SENHA);
        assertThat(testUsuario.getIsAdmin()).isEqualTo(UPDATED_IS_ADMIN);
        assertThat(testUsuario.getIsSuporte()).isEqualTo(UPDATED_IS_SUPORTE);
        assertThat(testUsuario.getNomeExibicao()).isEqualTo(UPDATED_NOME_EXIBICAO);
        assertThat(testUsuario.getIsConsultor()).isEqualTo(UPDATED_IS_CONSULTOR);
        assertThat(testUsuario.getIsSupervisor()).isEqualTo(UPDATED_IS_SUPERVISOR);
        assertThat(testUsuario.getIsAtivo()).isEqualTo(UPDATED_IS_ATIVO);
        assertThat(testUsuario.getIsAdministrativo()).isEqualTo(UPDATED_IS_ADMINISTRATIVO);
        assertThat(testUsuario.getReceberEmails()).isEqualTo(UPDATED_RECEBER_EMAILS);
        assertThat(testUsuario.getIsEmailValido()).isEqualTo(UPDATED_IS_EMAIL_VALIDO);
        assertThat(testUsuario.getUuidEmail()).isEqualTo(UPDATED_UUID_EMAIL);
        assertThat(testUsuario.getEmail()).isEqualTo(UPDATED_EMAIL);
        assertThat(testUsuario.getIsExecutorSac()).isEqualTo(UPDATED_IS_EXECUTOR_SAC);
        assertThat(testUsuario.getLiberarHorarioFeriado()).isEqualTo(UPDATED_LIBERAR_HORARIO_FERIADO);
    }

    @Test
    @Transactional
    void patchNonExistingUsuario() throws Exception {
        int databaseSizeBeforeUpdate = usuarioRepository.findAll().size();
        usuario.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUsuarioMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, usuario.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(usuario))
            )
            .andExpect(status().isBadRequest());

        // Validate the Usuario in the database
        List<Usuario> usuarioList = usuarioRepository.findAll();
        assertThat(usuarioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchUsuario() throws Exception {
        int databaseSizeBeforeUpdate = usuarioRepository.findAll().size();
        usuario.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUsuarioMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(usuario))
            )
            .andExpect(status().isBadRequest());

        // Validate the Usuario in the database
        List<Usuario> usuarioList = usuarioRepository.findAll();
        assertThat(usuarioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamUsuario() throws Exception {
        int databaseSizeBeforeUpdate = usuarioRepository.findAll().size();
        usuario.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restUsuarioMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(usuario)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Usuario in the database
        List<Usuario> usuarioList = usuarioRepository.findAll();
        assertThat(usuarioList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteUsuario() throws Exception {
        // Initialize the database
        usuarioRepository.saveAndFlush(usuario);

        int databaseSizeBeforeDelete = usuarioRepository.findAll().size();

        // Delete the usuario
        restUsuarioMockMvc
            .perform(delete(ENTITY_API_URL_ID, usuario.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Usuario> usuarioList = usuarioRepository.findAll();
        assertThat(usuarioList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
