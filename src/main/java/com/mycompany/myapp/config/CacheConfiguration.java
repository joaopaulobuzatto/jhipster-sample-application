package com.mycompany.myapp.config;

import java.time.Duration;
import org.ehcache.config.builders.*;
import org.ehcache.jsr107.Eh107Configuration;
import org.hibernate.cache.jcache.ConfigSettings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.cache.JCacheManagerCustomizer;
import org.springframework.boot.autoconfigure.orm.jpa.HibernatePropertiesCustomizer;
import org.springframework.boot.info.BuildProperties;
import org.springframework.boot.info.GitProperties;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cache.interceptor.KeyGenerator;
import org.springframework.context.annotation.*;
import tech.jhipster.config.JHipsterProperties;
import tech.jhipster.config.cache.PrefixedKeyGenerator;

@Configuration
@EnableCaching
public class CacheConfiguration {

    private GitProperties gitProperties;
    private BuildProperties buildProperties;
    private final javax.cache.configuration.Configuration<Object, Object> jcacheConfiguration;

    public CacheConfiguration(JHipsterProperties jHipsterProperties) {
        JHipsterProperties.Cache.Ehcache ehcache = jHipsterProperties.getCache().getEhcache();

        jcacheConfiguration =
            Eh107Configuration.fromEhcacheCacheConfiguration(
                CacheConfigurationBuilder
                    .newCacheConfigurationBuilder(Object.class, Object.class, ResourcePoolsBuilder.heap(ehcache.getMaxEntries()))
                    .withExpiry(ExpiryPolicyBuilder.timeToLiveExpiration(Duration.ofSeconds(ehcache.getTimeToLiveSeconds())))
                    .build()
            );
    }

    @Bean
    public HibernatePropertiesCustomizer hibernatePropertiesCustomizer(javax.cache.CacheManager cacheManager) {
        return hibernateProperties -> hibernateProperties.put(ConfigSettings.CACHE_MANAGER, cacheManager);
    }

    @Bean
    public JCacheManagerCustomizer cacheManagerCustomizer() {
        return cm -> {
            createCache(cm, com.mycompany.myapp.repository.UserRepository.USERS_BY_LOGIN_CACHE);
            createCache(cm, com.mycompany.myapp.repository.UserRepository.USERS_BY_EMAIL_CACHE);
            createCache(cm, com.mycompany.myapp.domain.User.class.getName());
            createCache(cm, com.mycompany.myapp.domain.Authority.class.getName());
            createCache(cm, com.mycompany.myapp.domain.User.class.getName() + ".authorities");
            createCache(cm, com.mycompany.myapp.domain.Usuario.class.getName());
            createCache(cm, com.mycompany.myapp.domain.UsuarioGrupoPermissoes.class.getName());
            createCache(cm, com.mycompany.myapp.domain.UsuarioFilial.class.getName());
            createCache(cm, com.mycompany.myapp.domain.UsuarioIpLiberado.class.getName());
            createCache(cm, com.mycompany.myapp.domain.GrupoPermissoes.class.getName());
            createCache(cm, com.mycompany.myapp.domain.IpLiberado.class.getName());
            createCache(cm, com.mycompany.myapp.domain.DetentorAnexoArquivo.class.getName());
            createCache(cm, com.mycompany.myapp.domain.AnexoArquivo.class.getName());
            createCache(cm, com.mycompany.myapp.domain.TipoDeDocumentoAnexavel.class.getName());
            createCache(cm, com.mycompany.myapp.domain.Licenca.class.getName());
            createCache(cm, com.mycompany.myapp.domain.Endereco.class.getName());
            createCache(cm, com.mycompany.myapp.domain.Operadora.class.getName());
            createCache(cm, com.mycompany.myapp.domain.Pessoa.class.getName());
            createCache(cm, com.mycompany.myapp.domain.PessoaFisica.class.getName());
            createCache(cm, com.mycompany.myapp.domain.PessoaJuridica.class.getName());
            createCache(cm, com.mycompany.myapp.domain.HorarioTrabalho.class.getName());
            createCache(cm, com.mycompany.myapp.domain.HorarioTrabalhoPeriodo.class.getName());
            createCache(cm, com.mycompany.myapp.domain.Origem.class.getName());
            createCache(cm, com.mycompany.myapp.domain.Filial.class.getName());
            createCache(cm, com.mycompany.myapp.domain.Aparelho.class.getName());
            createCache(cm, com.mycompany.myapp.domain.ArrCep.class.getName());
            createCache(cm, com.mycompany.myapp.domain.Cor.class.getName());
            createCache(cm, com.mycompany.myapp.domain.EventoAgenda.class.getName());
            createCache(cm, com.mycompany.myapp.domain.Feriado.class.getName());
            createCache(cm, com.mycompany.myapp.domain.Plano.class.getName());
            createCache(cm, com.mycompany.myapp.domain.Oferta.class.getName());
            createCache(cm, com.mycompany.myapp.domain.OfertaServico.class.getName());
            createCache(cm, com.mycompany.myapp.domain.Servico.class.getName());
            // jhipster-needle-ehcache-add-entry
        };
    }

    private void createCache(javax.cache.CacheManager cm, String cacheName) {
        javax.cache.Cache<Object, Object> cache = cm.getCache(cacheName);
        if (cache != null) {
            cache.clear();
        } else {
            cm.createCache(cacheName, jcacheConfiguration);
        }
    }

    @Autowired(required = false)
    public void setGitProperties(GitProperties gitProperties) {
        this.gitProperties = gitProperties;
    }

    @Autowired(required = false)
    public void setBuildProperties(BuildProperties buildProperties) {
        this.buildProperties = buildProperties;
    }

    @Bean
    public KeyGenerator keyGenerator() {
        return new PrefixedKeyGenerator(this.gitProperties, this.buildProperties);
    }
}
