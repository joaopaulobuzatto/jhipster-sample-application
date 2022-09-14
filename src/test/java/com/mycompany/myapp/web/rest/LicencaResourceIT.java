package com.mycompany.myapp.web.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.mycompany.myapp.IntegrationTest;
import com.mycompany.myapp.domain.Licenca;
import com.mycompany.myapp.repository.LicencaRepository;
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
 * Integration tests for the {@link LicencaResource} REST controller.
 */
@IntegrationTest
@AutoConfigureMockMvc
@WithMockUser
class LicencaResourceIT {

    private static final Long DEFAULT_CODIGO = 1L;
    private static final Long UPDATED_CODIGO = 2L;

    private static final Instant DEFAULT_DATA_CRIACAO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATA_CRIACAO = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_DATA_INICIO_UTILIZACAO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATA_INICIO_UTILIZACAO = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_DATA_INICIO_FATURAMENTO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATA_INICIO_FATURAMENTO = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Instant DEFAULT_DATA_PRIMEIRO_VENCIMENTO_BOLETO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATA_PRIMEIRO_VENCIMENTO_BOLETO = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final Integer DEFAULT_DIA_VENCIMENTO_BOLETO = 1;
    private static final Integer UPDATED_DIA_VENCIMENTO_BOLETO = 2;

    private static final String DEFAULT_PRODUTOS_CONTRATADOS = "AAAAAAAAAA";
    private static final String UPDATED_PRODUTOS_CONTRATADOS = "BBBBBBBBBB";

    private static final String DEFAULT_VALORES_NEGOCIADOS = "AAAAAAAAAA";
    private static final String UPDATED_VALORES_NEGOCIADOS = "BBBBBBBBBB";

    private static final Boolean DEFAULT_CONTRATACAO_BLOQUEIO_IPS = false;
    private static final Boolean UPDATED_CONTRATACAO_BLOQUEIO_IPS = true;

    private static final Boolean DEFAULT_CONTRATACAO_EMAIL_PROPOSTA = false;
    private static final Boolean UPDATED_CONTRATACAO_EMAIL_PROPOSTA = true;

    private static final Boolean DEFAULT_CRIAR_PEDIDO = false;
    private static final Boolean UPDATED_CRIAR_PEDIDO = true;

    private static final Boolean DEFAULT_CRIAR_NEGOCIACOES = false;
    private static final Boolean UPDATED_CRIAR_NEGOCIACOES = true;

    private static final Boolean DEFAULT_SINCRONIZAR_DADOS_CADASTRO_CLIENTE = false;
    private static final Boolean UPDATED_SINCRONIZAR_DADOS_CADASTRO_CLIENTE = true;

    private static final Boolean DEFAULT_SINCRONIZAR_DADOS_CARTEIRA_CLIENTE = false;
    private static final Boolean UPDATED_SINCRONIZAR_DADOS_CARTEIRA_CLIENTE = true;

    private static final Boolean DEFAULT_BLOQUEIO_ACESSO = false;
    private static final Boolean UPDATED_BLOQUEIO_ACESSO = true;

    private static final Instant DEFAULT_DATA_BLOQUEIO_ACESSO = Instant.ofEpochMilli(0L);
    private static final Instant UPDATED_DATA_BLOQUEIO_ACESSO = Instant.now().truncatedTo(ChronoUnit.MILLIS);

    private static final String DEFAULT_MOTIVO_BLOQUEIO_ACESSO = "AAAAAAAAAA";
    private static final String UPDATED_MOTIVO_BLOQUEIO_ACESSO = "BBBBBBBBBB";

    private static final String DEFAULT_MENSAGEM_BLOQUEIO_ACESSO = "AAAAAAAAAA";
    private static final String UPDATED_MENSAGEM_BLOQUEIO_ACESSO = "BBBBBBBBBB";

    private static final String ENTITY_API_URL = "/api/licencas";
    private static final String ENTITY_API_URL_ID = ENTITY_API_URL + "/{id}";

    private static Random random = new Random();
    private static AtomicLong count = new AtomicLong(random.nextInt() + (2 * Integer.MAX_VALUE));

    @Autowired
    private LicencaRepository licencaRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restLicencaMockMvc;

    private Licenca licenca;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Licenca createEntity(EntityManager em) {
        Licenca licenca = new Licenca()
            .codigo(DEFAULT_CODIGO)
            .dataCriacao(DEFAULT_DATA_CRIACAO)
            .dataInicioUtilizacao(DEFAULT_DATA_INICIO_UTILIZACAO)
            .dataInicioFaturamento(DEFAULT_DATA_INICIO_FATURAMENTO)
            .dataPrimeiroVencimentoBoleto(DEFAULT_DATA_PRIMEIRO_VENCIMENTO_BOLETO)
            .diaVencimentoBoleto(DEFAULT_DIA_VENCIMENTO_BOLETO)
            .produtosContratados(DEFAULT_PRODUTOS_CONTRATADOS)
            .valoresNegociados(DEFAULT_VALORES_NEGOCIADOS)
            .contratacaoBloqueioIps(DEFAULT_CONTRATACAO_BLOQUEIO_IPS)
            .contratacaoEmailProposta(DEFAULT_CONTRATACAO_EMAIL_PROPOSTA)
            .criarPedido(DEFAULT_CRIAR_PEDIDO)
            .criarNegociacoes(DEFAULT_CRIAR_NEGOCIACOES)
            .sincronizarDadosCadastroCliente(DEFAULT_SINCRONIZAR_DADOS_CADASTRO_CLIENTE)
            .sincronizarDadosCarteiraCliente(DEFAULT_SINCRONIZAR_DADOS_CARTEIRA_CLIENTE)
            .bloqueioAcesso(DEFAULT_BLOQUEIO_ACESSO)
            .dataBloqueioAcesso(DEFAULT_DATA_BLOQUEIO_ACESSO)
            .motivoBloqueioAcesso(DEFAULT_MOTIVO_BLOQUEIO_ACESSO)
            .mensagemBloqueioAcesso(DEFAULT_MENSAGEM_BLOQUEIO_ACESSO);
        return licenca;
    }

    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Licenca createUpdatedEntity(EntityManager em) {
        Licenca licenca = new Licenca()
            .codigo(UPDATED_CODIGO)
            .dataCriacao(UPDATED_DATA_CRIACAO)
            .dataInicioUtilizacao(UPDATED_DATA_INICIO_UTILIZACAO)
            .dataInicioFaturamento(UPDATED_DATA_INICIO_FATURAMENTO)
            .dataPrimeiroVencimentoBoleto(UPDATED_DATA_PRIMEIRO_VENCIMENTO_BOLETO)
            .diaVencimentoBoleto(UPDATED_DIA_VENCIMENTO_BOLETO)
            .produtosContratados(UPDATED_PRODUTOS_CONTRATADOS)
            .valoresNegociados(UPDATED_VALORES_NEGOCIADOS)
            .contratacaoBloqueioIps(UPDATED_CONTRATACAO_BLOQUEIO_IPS)
            .contratacaoEmailProposta(UPDATED_CONTRATACAO_EMAIL_PROPOSTA)
            .criarPedido(UPDATED_CRIAR_PEDIDO)
            .criarNegociacoes(UPDATED_CRIAR_NEGOCIACOES)
            .sincronizarDadosCadastroCliente(UPDATED_SINCRONIZAR_DADOS_CADASTRO_CLIENTE)
            .sincronizarDadosCarteiraCliente(UPDATED_SINCRONIZAR_DADOS_CARTEIRA_CLIENTE)
            .bloqueioAcesso(UPDATED_BLOQUEIO_ACESSO)
            .dataBloqueioAcesso(UPDATED_DATA_BLOQUEIO_ACESSO)
            .motivoBloqueioAcesso(UPDATED_MOTIVO_BLOQUEIO_ACESSO)
            .mensagemBloqueioAcesso(UPDATED_MENSAGEM_BLOQUEIO_ACESSO);
        return licenca;
    }

    @BeforeEach
    public void initTest() {
        licenca = createEntity(em);
    }

    @Test
    @Transactional
    void createLicenca() throws Exception {
        int databaseSizeBeforeCreate = licencaRepository.findAll().size();
        // Create the Licenca
        restLicencaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(licenca)))
            .andExpect(status().isCreated());

        // Validate the Licenca in the database
        List<Licenca> licencaList = licencaRepository.findAll();
        assertThat(licencaList).hasSize(databaseSizeBeforeCreate + 1);
        Licenca testLicenca = licencaList.get(licencaList.size() - 1);
        assertThat(testLicenca.getCodigo()).isEqualTo(DEFAULT_CODIGO);
        assertThat(testLicenca.getDataCriacao()).isEqualTo(DEFAULT_DATA_CRIACAO);
        assertThat(testLicenca.getDataInicioUtilizacao()).isEqualTo(DEFAULT_DATA_INICIO_UTILIZACAO);
        assertThat(testLicenca.getDataInicioFaturamento()).isEqualTo(DEFAULT_DATA_INICIO_FATURAMENTO);
        assertThat(testLicenca.getDataPrimeiroVencimentoBoleto()).isEqualTo(DEFAULT_DATA_PRIMEIRO_VENCIMENTO_BOLETO);
        assertThat(testLicenca.getDiaVencimentoBoleto()).isEqualTo(DEFAULT_DIA_VENCIMENTO_BOLETO);
        assertThat(testLicenca.getProdutosContratados()).isEqualTo(DEFAULT_PRODUTOS_CONTRATADOS);
        assertThat(testLicenca.getValoresNegociados()).isEqualTo(DEFAULT_VALORES_NEGOCIADOS);
        assertThat(testLicenca.getContratacaoBloqueioIps()).isEqualTo(DEFAULT_CONTRATACAO_BLOQUEIO_IPS);
        assertThat(testLicenca.getContratacaoEmailProposta()).isEqualTo(DEFAULT_CONTRATACAO_EMAIL_PROPOSTA);
        assertThat(testLicenca.getCriarPedido()).isEqualTo(DEFAULT_CRIAR_PEDIDO);
        assertThat(testLicenca.getCriarNegociacoes()).isEqualTo(DEFAULT_CRIAR_NEGOCIACOES);
        assertThat(testLicenca.getSincronizarDadosCadastroCliente()).isEqualTo(DEFAULT_SINCRONIZAR_DADOS_CADASTRO_CLIENTE);
        assertThat(testLicenca.getSincronizarDadosCarteiraCliente()).isEqualTo(DEFAULT_SINCRONIZAR_DADOS_CARTEIRA_CLIENTE);
        assertThat(testLicenca.getBloqueioAcesso()).isEqualTo(DEFAULT_BLOQUEIO_ACESSO);
        assertThat(testLicenca.getDataBloqueioAcesso()).isEqualTo(DEFAULT_DATA_BLOQUEIO_ACESSO);
        assertThat(testLicenca.getMotivoBloqueioAcesso()).isEqualTo(DEFAULT_MOTIVO_BLOQUEIO_ACESSO);
        assertThat(testLicenca.getMensagemBloqueioAcesso()).isEqualTo(DEFAULT_MENSAGEM_BLOQUEIO_ACESSO);
    }

    @Test
    @Transactional
    void createLicencaWithExistingId() throws Exception {
        // Create the Licenca with an existing ID
        licenca.setId(1L);

        int databaseSizeBeforeCreate = licencaRepository.findAll().size();

        // An entity with an existing ID cannot be created, so this API call must fail
        restLicencaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(licenca)))
            .andExpect(status().isBadRequest());

        // Validate the Licenca in the database
        List<Licenca> licencaList = licencaRepository.findAll();
        assertThat(licencaList).hasSize(databaseSizeBeforeCreate);
    }

    @Test
    @Transactional
    void checkDataCriacaoIsRequired() throws Exception {
        int databaseSizeBeforeTest = licencaRepository.findAll().size();
        // set the field null
        licenca.setDataCriacao(null);

        // Create the Licenca, which fails.

        restLicencaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(licenca)))
            .andExpect(status().isBadRequest());

        List<Licenca> licencaList = licencaRepository.findAll();
        assertThat(licencaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkContratacaoBloqueioIpsIsRequired() throws Exception {
        int databaseSizeBeforeTest = licencaRepository.findAll().size();
        // set the field null
        licenca.setContratacaoBloqueioIps(null);

        // Create the Licenca, which fails.

        restLicencaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(licenca)))
            .andExpect(status().isBadRequest());

        List<Licenca> licencaList = licencaRepository.findAll();
        assertThat(licencaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkContratacaoEmailPropostaIsRequired() throws Exception {
        int databaseSizeBeforeTest = licencaRepository.findAll().size();
        // set the field null
        licenca.setContratacaoEmailProposta(null);

        // Create the Licenca, which fails.

        restLicencaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(licenca)))
            .andExpect(status().isBadRequest());

        List<Licenca> licencaList = licencaRepository.findAll();
        assertThat(licencaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkBloqueioAcessoIsRequired() throws Exception {
        int databaseSizeBeforeTest = licencaRepository.findAll().size();
        // set the field null
        licenca.setBloqueioAcesso(null);

        // Create the Licenca, which fails.

        restLicencaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(licenca)))
            .andExpect(status().isBadRequest());

        List<Licenca> licencaList = licencaRepository.findAll();
        assertThat(licencaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void checkDataBloqueioAcessoIsRequired() throws Exception {
        int databaseSizeBeforeTest = licencaRepository.findAll().size();
        // set the field null
        licenca.setDataBloqueioAcesso(null);

        // Create the Licenca, which fails.

        restLicencaMockMvc
            .perform(post(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(licenca)))
            .andExpect(status().isBadRequest());

        List<Licenca> licencaList = licencaRepository.findAll();
        assertThat(licencaList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    void getAllLicencas() throws Exception {
        // Initialize the database
        licencaRepository.saveAndFlush(licenca);

        // Get all the licencaList
        restLicencaMockMvc
            .perform(get(ENTITY_API_URL + "?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(licenca.getId().intValue())))
            .andExpect(jsonPath("$.[*].codigo").value(hasItem(DEFAULT_CODIGO.intValue())))
            .andExpect(jsonPath("$.[*].dataCriacao").value(hasItem(DEFAULT_DATA_CRIACAO.toString())))
            .andExpect(jsonPath("$.[*].dataInicioUtilizacao").value(hasItem(DEFAULT_DATA_INICIO_UTILIZACAO.toString())))
            .andExpect(jsonPath("$.[*].dataInicioFaturamento").value(hasItem(DEFAULT_DATA_INICIO_FATURAMENTO.toString())))
            .andExpect(jsonPath("$.[*].dataPrimeiroVencimentoBoleto").value(hasItem(DEFAULT_DATA_PRIMEIRO_VENCIMENTO_BOLETO.toString())))
            .andExpect(jsonPath("$.[*].diaVencimentoBoleto").value(hasItem(DEFAULT_DIA_VENCIMENTO_BOLETO)))
            .andExpect(jsonPath("$.[*].produtosContratados").value(hasItem(DEFAULT_PRODUTOS_CONTRATADOS)))
            .andExpect(jsonPath("$.[*].valoresNegociados").value(hasItem(DEFAULT_VALORES_NEGOCIADOS)))
            .andExpect(jsonPath("$.[*].contratacaoBloqueioIps").value(hasItem(DEFAULT_CONTRATACAO_BLOQUEIO_IPS.booleanValue())))
            .andExpect(jsonPath("$.[*].contratacaoEmailProposta").value(hasItem(DEFAULT_CONTRATACAO_EMAIL_PROPOSTA.booleanValue())))
            .andExpect(jsonPath("$.[*].criarPedido").value(hasItem(DEFAULT_CRIAR_PEDIDO.booleanValue())))
            .andExpect(jsonPath("$.[*].criarNegociacoes").value(hasItem(DEFAULT_CRIAR_NEGOCIACOES.booleanValue())))
            .andExpect(
                jsonPath("$.[*].sincronizarDadosCadastroCliente").value(hasItem(DEFAULT_SINCRONIZAR_DADOS_CADASTRO_CLIENTE.booleanValue()))
            )
            .andExpect(
                jsonPath("$.[*].sincronizarDadosCarteiraCliente").value(hasItem(DEFAULT_SINCRONIZAR_DADOS_CARTEIRA_CLIENTE.booleanValue()))
            )
            .andExpect(jsonPath("$.[*].bloqueioAcesso").value(hasItem(DEFAULT_BLOQUEIO_ACESSO.booleanValue())))
            .andExpect(jsonPath("$.[*].dataBloqueioAcesso").value(hasItem(DEFAULT_DATA_BLOQUEIO_ACESSO.toString())))
            .andExpect(jsonPath("$.[*].motivoBloqueioAcesso").value(hasItem(DEFAULT_MOTIVO_BLOQUEIO_ACESSO)))
            .andExpect(jsonPath("$.[*].mensagemBloqueioAcesso").value(hasItem(DEFAULT_MENSAGEM_BLOQUEIO_ACESSO)));
    }

    @Test
    @Transactional
    void getLicenca() throws Exception {
        // Initialize the database
        licencaRepository.saveAndFlush(licenca);

        // Get the licenca
        restLicencaMockMvc
            .perform(get(ENTITY_API_URL_ID, licenca.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(licenca.getId().intValue()))
            .andExpect(jsonPath("$.codigo").value(DEFAULT_CODIGO.intValue()))
            .andExpect(jsonPath("$.dataCriacao").value(DEFAULT_DATA_CRIACAO.toString()))
            .andExpect(jsonPath("$.dataInicioUtilizacao").value(DEFAULT_DATA_INICIO_UTILIZACAO.toString()))
            .andExpect(jsonPath("$.dataInicioFaturamento").value(DEFAULT_DATA_INICIO_FATURAMENTO.toString()))
            .andExpect(jsonPath("$.dataPrimeiroVencimentoBoleto").value(DEFAULT_DATA_PRIMEIRO_VENCIMENTO_BOLETO.toString()))
            .andExpect(jsonPath("$.diaVencimentoBoleto").value(DEFAULT_DIA_VENCIMENTO_BOLETO))
            .andExpect(jsonPath("$.produtosContratados").value(DEFAULT_PRODUTOS_CONTRATADOS))
            .andExpect(jsonPath("$.valoresNegociados").value(DEFAULT_VALORES_NEGOCIADOS))
            .andExpect(jsonPath("$.contratacaoBloqueioIps").value(DEFAULT_CONTRATACAO_BLOQUEIO_IPS.booleanValue()))
            .andExpect(jsonPath("$.contratacaoEmailProposta").value(DEFAULT_CONTRATACAO_EMAIL_PROPOSTA.booleanValue()))
            .andExpect(jsonPath("$.criarPedido").value(DEFAULT_CRIAR_PEDIDO.booleanValue()))
            .andExpect(jsonPath("$.criarNegociacoes").value(DEFAULT_CRIAR_NEGOCIACOES.booleanValue()))
            .andExpect(jsonPath("$.sincronizarDadosCadastroCliente").value(DEFAULT_SINCRONIZAR_DADOS_CADASTRO_CLIENTE.booleanValue()))
            .andExpect(jsonPath("$.sincronizarDadosCarteiraCliente").value(DEFAULT_SINCRONIZAR_DADOS_CARTEIRA_CLIENTE.booleanValue()))
            .andExpect(jsonPath("$.bloqueioAcesso").value(DEFAULT_BLOQUEIO_ACESSO.booleanValue()))
            .andExpect(jsonPath("$.dataBloqueioAcesso").value(DEFAULT_DATA_BLOQUEIO_ACESSO.toString()))
            .andExpect(jsonPath("$.motivoBloqueioAcesso").value(DEFAULT_MOTIVO_BLOQUEIO_ACESSO))
            .andExpect(jsonPath("$.mensagemBloqueioAcesso").value(DEFAULT_MENSAGEM_BLOQUEIO_ACESSO));
    }

    @Test
    @Transactional
    void getNonExistingLicenca() throws Exception {
        // Get the licenca
        restLicencaMockMvc.perform(get(ENTITY_API_URL_ID, Long.MAX_VALUE)).andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    void putExistingLicenca() throws Exception {
        // Initialize the database
        licencaRepository.saveAndFlush(licenca);

        int databaseSizeBeforeUpdate = licencaRepository.findAll().size();

        // Update the licenca
        Licenca updatedLicenca = licencaRepository.findById(licenca.getId()).get();
        // Disconnect from session so that the updates on updatedLicenca are not directly saved in db
        em.detach(updatedLicenca);
        updatedLicenca
            .codigo(UPDATED_CODIGO)
            .dataCriacao(UPDATED_DATA_CRIACAO)
            .dataInicioUtilizacao(UPDATED_DATA_INICIO_UTILIZACAO)
            .dataInicioFaturamento(UPDATED_DATA_INICIO_FATURAMENTO)
            .dataPrimeiroVencimentoBoleto(UPDATED_DATA_PRIMEIRO_VENCIMENTO_BOLETO)
            .diaVencimentoBoleto(UPDATED_DIA_VENCIMENTO_BOLETO)
            .produtosContratados(UPDATED_PRODUTOS_CONTRATADOS)
            .valoresNegociados(UPDATED_VALORES_NEGOCIADOS)
            .contratacaoBloqueioIps(UPDATED_CONTRATACAO_BLOQUEIO_IPS)
            .contratacaoEmailProposta(UPDATED_CONTRATACAO_EMAIL_PROPOSTA)
            .criarPedido(UPDATED_CRIAR_PEDIDO)
            .criarNegociacoes(UPDATED_CRIAR_NEGOCIACOES)
            .sincronizarDadosCadastroCliente(UPDATED_SINCRONIZAR_DADOS_CADASTRO_CLIENTE)
            .sincronizarDadosCarteiraCliente(UPDATED_SINCRONIZAR_DADOS_CARTEIRA_CLIENTE)
            .bloqueioAcesso(UPDATED_BLOQUEIO_ACESSO)
            .dataBloqueioAcesso(UPDATED_DATA_BLOQUEIO_ACESSO)
            .motivoBloqueioAcesso(UPDATED_MOTIVO_BLOQUEIO_ACESSO)
            .mensagemBloqueioAcesso(UPDATED_MENSAGEM_BLOQUEIO_ACESSO);

        restLicencaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, updatedLicenca.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(updatedLicenca))
            )
            .andExpect(status().isOk());

        // Validate the Licenca in the database
        List<Licenca> licencaList = licencaRepository.findAll();
        assertThat(licencaList).hasSize(databaseSizeBeforeUpdate);
        Licenca testLicenca = licencaList.get(licencaList.size() - 1);
        assertThat(testLicenca.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testLicenca.getDataCriacao()).isEqualTo(UPDATED_DATA_CRIACAO);
        assertThat(testLicenca.getDataInicioUtilizacao()).isEqualTo(UPDATED_DATA_INICIO_UTILIZACAO);
        assertThat(testLicenca.getDataInicioFaturamento()).isEqualTo(UPDATED_DATA_INICIO_FATURAMENTO);
        assertThat(testLicenca.getDataPrimeiroVencimentoBoleto()).isEqualTo(UPDATED_DATA_PRIMEIRO_VENCIMENTO_BOLETO);
        assertThat(testLicenca.getDiaVencimentoBoleto()).isEqualTo(UPDATED_DIA_VENCIMENTO_BOLETO);
        assertThat(testLicenca.getProdutosContratados()).isEqualTo(UPDATED_PRODUTOS_CONTRATADOS);
        assertThat(testLicenca.getValoresNegociados()).isEqualTo(UPDATED_VALORES_NEGOCIADOS);
        assertThat(testLicenca.getContratacaoBloqueioIps()).isEqualTo(UPDATED_CONTRATACAO_BLOQUEIO_IPS);
        assertThat(testLicenca.getContratacaoEmailProposta()).isEqualTo(UPDATED_CONTRATACAO_EMAIL_PROPOSTA);
        assertThat(testLicenca.getCriarPedido()).isEqualTo(UPDATED_CRIAR_PEDIDO);
        assertThat(testLicenca.getCriarNegociacoes()).isEqualTo(UPDATED_CRIAR_NEGOCIACOES);
        assertThat(testLicenca.getSincronizarDadosCadastroCliente()).isEqualTo(UPDATED_SINCRONIZAR_DADOS_CADASTRO_CLIENTE);
        assertThat(testLicenca.getSincronizarDadosCarteiraCliente()).isEqualTo(UPDATED_SINCRONIZAR_DADOS_CARTEIRA_CLIENTE);
        assertThat(testLicenca.getBloqueioAcesso()).isEqualTo(UPDATED_BLOQUEIO_ACESSO);
        assertThat(testLicenca.getDataBloqueioAcesso()).isEqualTo(UPDATED_DATA_BLOQUEIO_ACESSO);
        assertThat(testLicenca.getMotivoBloqueioAcesso()).isEqualTo(UPDATED_MOTIVO_BLOQUEIO_ACESSO);
        assertThat(testLicenca.getMensagemBloqueioAcesso()).isEqualTo(UPDATED_MENSAGEM_BLOQUEIO_ACESSO);
    }

    @Test
    @Transactional
    void putNonExistingLicenca() throws Exception {
        int databaseSizeBeforeUpdate = licencaRepository.findAll().size();
        licenca.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLicencaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, licenca.getId())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(licenca))
            )
            .andExpect(status().isBadRequest());

        // Validate the Licenca in the database
        List<Licenca> licencaList = licencaRepository.findAll();
        assertThat(licencaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithIdMismatchLicenca() throws Exception {
        int databaseSizeBeforeUpdate = licencaRepository.findAll().size();
        licenca.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLicencaMockMvc
            .perform(
                put(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType(MediaType.APPLICATION_JSON)
                    .content(TestUtil.convertObjectToJsonBytes(licenca))
            )
            .andExpect(status().isBadRequest());

        // Validate the Licenca in the database
        List<Licenca> licencaList = licencaRepository.findAll();
        assertThat(licencaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void putWithMissingIdPathParamLicenca() throws Exception {
        int databaseSizeBeforeUpdate = licencaRepository.findAll().size();
        licenca.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLicencaMockMvc
            .perform(put(ENTITY_API_URL).contentType(MediaType.APPLICATION_JSON).content(TestUtil.convertObjectToJsonBytes(licenca)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Licenca in the database
        List<Licenca> licencaList = licencaRepository.findAll();
        assertThat(licencaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void partialUpdateLicencaWithPatch() throws Exception {
        // Initialize the database
        licencaRepository.saveAndFlush(licenca);

        int databaseSizeBeforeUpdate = licencaRepository.findAll().size();

        // Update the licenca using partial update
        Licenca partialUpdatedLicenca = new Licenca();
        partialUpdatedLicenca.setId(licenca.getId());

        partialUpdatedLicenca
            .codigo(UPDATED_CODIGO)
            .dataCriacao(UPDATED_DATA_CRIACAO)
            .dataInicioUtilizacao(UPDATED_DATA_INICIO_UTILIZACAO)
            .dataInicioFaturamento(UPDATED_DATA_INICIO_FATURAMENTO)
            .diaVencimentoBoleto(UPDATED_DIA_VENCIMENTO_BOLETO)
            .produtosContratados(UPDATED_PRODUTOS_CONTRATADOS)
            .valoresNegociados(UPDATED_VALORES_NEGOCIADOS)
            .contratacaoBloqueioIps(UPDATED_CONTRATACAO_BLOQUEIO_IPS)
            .contratacaoEmailProposta(UPDATED_CONTRATACAO_EMAIL_PROPOSTA)
            .sincronizarDadosCadastroCliente(UPDATED_SINCRONIZAR_DADOS_CADASTRO_CLIENTE)
            .bloqueioAcesso(UPDATED_BLOQUEIO_ACESSO);

        restLicencaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedLicenca.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedLicenca))
            )
            .andExpect(status().isOk());

        // Validate the Licenca in the database
        List<Licenca> licencaList = licencaRepository.findAll();
        assertThat(licencaList).hasSize(databaseSizeBeforeUpdate);
        Licenca testLicenca = licencaList.get(licencaList.size() - 1);
        assertThat(testLicenca.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testLicenca.getDataCriacao()).isEqualTo(UPDATED_DATA_CRIACAO);
        assertThat(testLicenca.getDataInicioUtilizacao()).isEqualTo(UPDATED_DATA_INICIO_UTILIZACAO);
        assertThat(testLicenca.getDataInicioFaturamento()).isEqualTo(UPDATED_DATA_INICIO_FATURAMENTO);
        assertThat(testLicenca.getDataPrimeiroVencimentoBoleto()).isEqualTo(DEFAULT_DATA_PRIMEIRO_VENCIMENTO_BOLETO);
        assertThat(testLicenca.getDiaVencimentoBoleto()).isEqualTo(UPDATED_DIA_VENCIMENTO_BOLETO);
        assertThat(testLicenca.getProdutosContratados()).isEqualTo(UPDATED_PRODUTOS_CONTRATADOS);
        assertThat(testLicenca.getValoresNegociados()).isEqualTo(UPDATED_VALORES_NEGOCIADOS);
        assertThat(testLicenca.getContratacaoBloqueioIps()).isEqualTo(UPDATED_CONTRATACAO_BLOQUEIO_IPS);
        assertThat(testLicenca.getContratacaoEmailProposta()).isEqualTo(UPDATED_CONTRATACAO_EMAIL_PROPOSTA);
        assertThat(testLicenca.getCriarPedido()).isEqualTo(DEFAULT_CRIAR_PEDIDO);
        assertThat(testLicenca.getCriarNegociacoes()).isEqualTo(DEFAULT_CRIAR_NEGOCIACOES);
        assertThat(testLicenca.getSincronizarDadosCadastroCliente()).isEqualTo(UPDATED_SINCRONIZAR_DADOS_CADASTRO_CLIENTE);
        assertThat(testLicenca.getSincronizarDadosCarteiraCliente()).isEqualTo(DEFAULT_SINCRONIZAR_DADOS_CARTEIRA_CLIENTE);
        assertThat(testLicenca.getBloqueioAcesso()).isEqualTo(UPDATED_BLOQUEIO_ACESSO);
        assertThat(testLicenca.getDataBloqueioAcesso()).isEqualTo(DEFAULT_DATA_BLOQUEIO_ACESSO);
        assertThat(testLicenca.getMotivoBloqueioAcesso()).isEqualTo(DEFAULT_MOTIVO_BLOQUEIO_ACESSO);
        assertThat(testLicenca.getMensagemBloqueioAcesso()).isEqualTo(DEFAULT_MENSAGEM_BLOQUEIO_ACESSO);
    }

    @Test
    @Transactional
    void fullUpdateLicencaWithPatch() throws Exception {
        // Initialize the database
        licencaRepository.saveAndFlush(licenca);

        int databaseSizeBeforeUpdate = licencaRepository.findAll().size();

        // Update the licenca using partial update
        Licenca partialUpdatedLicenca = new Licenca();
        partialUpdatedLicenca.setId(licenca.getId());

        partialUpdatedLicenca
            .codigo(UPDATED_CODIGO)
            .dataCriacao(UPDATED_DATA_CRIACAO)
            .dataInicioUtilizacao(UPDATED_DATA_INICIO_UTILIZACAO)
            .dataInicioFaturamento(UPDATED_DATA_INICIO_FATURAMENTO)
            .dataPrimeiroVencimentoBoleto(UPDATED_DATA_PRIMEIRO_VENCIMENTO_BOLETO)
            .diaVencimentoBoleto(UPDATED_DIA_VENCIMENTO_BOLETO)
            .produtosContratados(UPDATED_PRODUTOS_CONTRATADOS)
            .valoresNegociados(UPDATED_VALORES_NEGOCIADOS)
            .contratacaoBloqueioIps(UPDATED_CONTRATACAO_BLOQUEIO_IPS)
            .contratacaoEmailProposta(UPDATED_CONTRATACAO_EMAIL_PROPOSTA)
            .criarPedido(UPDATED_CRIAR_PEDIDO)
            .criarNegociacoes(UPDATED_CRIAR_NEGOCIACOES)
            .sincronizarDadosCadastroCliente(UPDATED_SINCRONIZAR_DADOS_CADASTRO_CLIENTE)
            .sincronizarDadosCarteiraCliente(UPDATED_SINCRONIZAR_DADOS_CARTEIRA_CLIENTE)
            .bloqueioAcesso(UPDATED_BLOQUEIO_ACESSO)
            .dataBloqueioAcesso(UPDATED_DATA_BLOQUEIO_ACESSO)
            .motivoBloqueioAcesso(UPDATED_MOTIVO_BLOQUEIO_ACESSO)
            .mensagemBloqueioAcesso(UPDATED_MENSAGEM_BLOQUEIO_ACESSO);

        restLicencaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, partialUpdatedLicenca.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(partialUpdatedLicenca))
            )
            .andExpect(status().isOk());

        // Validate the Licenca in the database
        List<Licenca> licencaList = licencaRepository.findAll();
        assertThat(licencaList).hasSize(databaseSizeBeforeUpdate);
        Licenca testLicenca = licencaList.get(licencaList.size() - 1);
        assertThat(testLicenca.getCodigo()).isEqualTo(UPDATED_CODIGO);
        assertThat(testLicenca.getDataCriacao()).isEqualTo(UPDATED_DATA_CRIACAO);
        assertThat(testLicenca.getDataInicioUtilizacao()).isEqualTo(UPDATED_DATA_INICIO_UTILIZACAO);
        assertThat(testLicenca.getDataInicioFaturamento()).isEqualTo(UPDATED_DATA_INICIO_FATURAMENTO);
        assertThat(testLicenca.getDataPrimeiroVencimentoBoleto()).isEqualTo(UPDATED_DATA_PRIMEIRO_VENCIMENTO_BOLETO);
        assertThat(testLicenca.getDiaVencimentoBoleto()).isEqualTo(UPDATED_DIA_VENCIMENTO_BOLETO);
        assertThat(testLicenca.getProdutosContratados()).isEqualTo(UPDATED_PRODUTOS_CONTRATADOS);
        assertThat(testLicenca.getValoresNegociados()).isEqualTo(UPDATED_VALORES_NEGOCIADOS);
        assertThat(testLicenca.getContratacaoBloqueioIps()).isEqualTo(UPDATED_CONTRATACAO_BLOQUEIO_IPS);
        assertThat(testLicenca.getContratacaoEmailProposta()).isEqualTo(UPDATED_CONTRATACAO_EMAIL_PROPOSTA);
        assertThat(testLicenca.getCriarPedido()).isEqualTo(UPDATED_CRIAR_PEDIDO);
        assertThat(testLicenca.getCriarNegociacoes()).isEqualTo(UPDATED_CRIAR_NEGOCIACOES);
        assertThat(testLicenca.getSincronizarDadosCadastroCliente()).isEqualTo(UPDATED_SINCRONIZAR_DADOS_CADASTRO_CLIENTE);
        assertThat(testLicenca.getSincronizarDadosCarteiraCliente()).isEqualTo(UPDATED_SINCRONIZAR_DADOS_CARTEIRA_CLIENTE);
        assertThat(testLicenca.getBloqueioAcesso()).isEqualTo(UPDATED_BLOQUEIO_ACESSO);
        assertThat(testLicenca.getDataBloqueioAcesso()).isEqualTo(UPDATED_DATA_BLOQUEIO_ACESSO);
        assertThat(testLicenca.getMotivoBloqueioAcesso()).isEqualTo(UPDATED_MOTIVO_BLOQUEIO_ACESSO);
        assertThat(testLicenca.getMensagemBloqueioAcesso()).isEqualTo(UPDATED_MENSAGEM_BLOQUEIO_ACESSO);
    }

    @Test
    @Transactional
    void patchNonExistingLicenca() throws Exception {
        int databaseSizeBeforeUpdate = licencaRepository.findAll().size();
        licenca.setId(count.incrementAndGet());

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restLicencaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, licenca.getId())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(licenca))
            )
            .andExpect(status().isBadRequest());

        // Validate the Licenca in the database
        List<Licenca> licencaList = licencaRepository.findAll();
        assertThat(licencaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithIdMismatchLicenca() throws Exception {
        int databaseSizeBeforeUpdate = licencaRepository.findAll().size();
        licenca.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLicencaMockMvc
            .perform(
                patch(ENTITY_API_URL_ID, count.incrementAndGet())
                    .contentType("application/merge-patch+json")
                    .content(TestUtil.convertObjectToJsonBytes(licenca))
            )
            .andExpect(status().isBadRequest());

        // Validate the Licenca in the database
        List<Licenca> licencaList = licencaRepository.findAll();
        assertThat(licencaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void patchWithMissingIdPathParamLicenca() throws Exception {
        int databaseSizeBeforeUpdate = licencaRepository.findAll().size();
        licenca.setId(count.incrementAndGet());

        // If url ID doesn't match entity ID, it will throw BadRequestAlertException
        restLicencaMockMvc
            .perform(patch(ENTITY_API_URL).contentType("application/merge-patch+json").content(TestUtil.convertObjectToJsonBytes(licenca)))
            .andExpect(status().isMethodNotAllowed());

        // Validate the Licenca in the database
        List<Licenca> licencaList = licencaRepository.findAll();
        assertThat(licencaList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    void deleteLicenca() throws Exception {
        // Initialize the database
        licencaRepository.saveAndFlush(licenca);

        int databaseSizeBeforeDelete = licencaRepository.findAll().size();

        // Delete the licenca
        restLicencaMockMvc
            .perform(delete(ENTITY_API_URL_ID, licenca.getId()).accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Licenca> licencaList = licencaRepository.findAll();
        assertThat(licencaList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
