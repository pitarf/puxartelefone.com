/**
 * Tabela e Dados Oficiais dos DDDs do Brasil (Anatel)
 * Total de 67 códigos DDD divididos pelas 5 macrorregiões brasileiras.
 */

export interface DddInfo {
  ddd: string;
  uf: string;
  estado: string;
  regiao: 'Sudeste' | 'Sul' | 'Nordeste' | 'Centro-Oeste' | 'Norte';
  cidadesPrincipais: string[];
  descricao: string;
}

export const DDD_DATA: Record<string, DddInfo> = {
  // SUDESTE (11 a 38)
  '11': {
    ddd: '11',
    uf: 'SP',
    estado: 'São Paulo',
    regiao: 'Sudeste',
    cidadesPrincipais: ['São Paulo', 'Guarulhos', 'São Bernardo do Campo', 'Santo André', 'Osasco', 'Barueri'],
    descricao: 'Região Metropolitana de São Paulo e municípios adjacentes.'
  },
  '12': {
    ddd: '12',
    uf: 'SP',
    estado: 'São Paulo',
    regiao: 'Sudeste',
    cidadesPrincipais: ['São José dos Campos', 'Taubaté', 'Jacareí', 'Caraguatatuba', 'Ubatuba', 'Guaratinguetá'],
    descricao: 'Vale do Paraíba e Litoral Norte de São Paulo.'
  },
  '13': {
    ddd: '13',
    uf: 'SP',
    estado: 'São Paulo',
    regiao: 'Sudeste',
    cidadesPrincipais: ['Santos', 'São Vicente', 'Praia Grande', 'Guarujá', 'Cubatão', 'Registro'],
    descricao: 'Baixada Santista e Vale do Ribeira.'
  },
  '14': {
    ddd: '14',
    uf: 'SP',
    estado: 'São Paulo',
    regiao: 'Sudeste',
    cidadesPrincipais: ['Bauru', 'Marília', 'Jaú', 'Botucatu', 'Ourinhos', 'Lençóis Paulista'],
    descricao: 'Região Centro-Oeste do Estado de São Paulo.'
  },
  '15': {
    ddd: '15',
    uf: 'SP',
    estado: 'São Paulo',
    regiao: 'Sudeste',
    cidadesPrincipais: ['Sorocaba', 'Itapetininga', 'Itapeva', 'Tatuí', 'Votorantim', 'Piedade'],
    descricao: 'Região de Sorocaba e Sudoeste Paulista.'
  },
  '16': {
    ddd: '16',
    uf: 'SP',
    estado: 'São Paulo',
    regiao: 'Sudeste',
    cidadesPrincipais: ['Ribeirão Preto', 'Franca', 'Araraquara', 'São Carlos', 'Sertãozinho', 'Batatais'],
    descricao: 'Região Nordeste de São Paulo (Ribeirão Preto, Franca e São Carlos).'
  },
  '17': {
    ddd: '17',
    uf: 'SP',
    estado: 'São Paulo',
    regiao: 'Sudeste',
    cidadesPrincipais: ['São José do Rio Preto', 'Barretos', 'Catanduva', 'Votuporanga', 'Fernandópolis'],
    descricao: 'Região Noroeste Paulista (São José do Rio Preto e Barretos).'
  },
  '18': {
    ddd: '18',
    uf: 'SP',
    estado: 'São Paulo',
    regiao: 'Sudeste',
    cidadesPrincipais: ['Presidente Prudente', 'Araçatuba', 'Birigui', 'Assis', 'Dracena'],
    descricao: 'Região Oeste Paulista (Presidente Prudente e Araçatuba).'
  },
  '19': {
    ddd: '19',
    uf: 'SP',
    estado: 'São Paulo',
    regiao: 'Sudeste',
    cidadesPrincipais: ['Campinas', 'Piracicaba', 'Limeira', 'Americana', 'Sumaré', 'Indaiatuba', 'Rio Claro'],
    descricao: 'Região Metropolitana de Campinas e Piracicaba.'
  },
  '21': {
    ddd: '21',
    uf: 'RJ',
    estado: 'Rio de Janeiro',
    regiao: 'Sudeste',
    cidadesPrincipais: ['Rio de Janeiro', 'Niterói', 'São Gonçalo', 'Duque de Caxias', 'Nova Iguaçu', 'São João de Meriti'],
    descricao: 'Região Metropolitana do Rio de Janeiro.'
  },
  '22': {
    ddd: '22',
    uf: 'RJ',
    estado: 'Rio de Janeiro',
    regiao: 'Sudeste',
    cidadesPrincipais: ['Campos dos Goytacazes', 'Macaé', 'Cabo Frio', 'Nova Friburgo', 'Armação dos Búzios', 'Teresópolis'],
    descricao: 'Região Norte, Noroeste e dos Lagos do Rio de Janeiro.'
  },
  '24': {
    ddd: '24',
    uf: 'RJ',
    estado: 'Rio de Janeiro',
    regiao: 'Sudeste',
    cidadesPrincipais: ['Petrópolis', 'Volta Redonda', 'Barra Mansa', 'Angra dos Reis', 'Resende', 'Três Rios'],
    descricao: 'Região Serrana e Sul do Estado do Rio de Janeiro.'
  },
  '27': {
    ddd: '27',
    uf: 'ES',
    estado: 'Espírito Santo',
    regiao: 'Sudeste',
    cidadesPrincipais: ['Vitória', 'Vila Velha', 'Serra', 'Cariacica', 'Linhares', 'São Mateus', 'Colatina'],
    descricao: 'Região Metropolitana de Vitória e Norte do Espírito Santo.'
  },
  '28': {
    ddd: '28',
    uf: 'ES',
    estado: 'Espírito Santo',
    regiao: 'Sudeste',
    cidadesPrincipais: ['Cachoeiro de Itapemirim', 'Marataízes', 'Castelo', 'Guarapari', 'Alegre'],
    descricao: 'Região Sul do Espírito Santo.'
  },
  '31': {
    ddd: '31',
    uf: 'MG',
    estado: 'Minas Gerais',
    regiao: 'Sudeste',
    cidadesPrincipais: ['Belo Horizonte', 'Contagem', 'Betim', 'Ipatinga', 'Sete Lagoas', 'Coronel Fabriciano'],
    descricao: 'Região Metropolitana de Belo Horizonte e Vale do Aço.'
  },
  '32': {
    ddd: '32',
    uf: 'MG',
    estado: 'Minas Gerais',
    regiao: 'Sudeste',
    cidadesPrincipais: ['Juiz de Fora', 'Barbacena', 'Muriaé', 'Ubá', 'São João del-Rei', 'Cataguases'],
    descricao: 'Zona da Mata e Campos das Vertentes de Minas Gerais.'
  },
  '33': {
    ddd: '33',
    uf: 'MG',
    estado: 'Minas Gerais',
    regiao: 'Sudeste',
    cidadesPrincipais: ['Governador Valadares', 'Teófilo Otoni', 'Caratinga', 'Manhuaçu', 'Almenara'],
    descricao: 'Leste e Nordeste de Minas Gerais (Vales do Rio Doce, Mucuri e Jequitinhonha).'
  },
  '34': {
    ddd: '34',
    uf: 'MG',
    estado: 'Minas Gerais',
    regiao: 'Sudeste',
    cidadesPrincipais: ['Uberlândia', 'Uberaba', 'Patos de Minas', 'Araguari', 'Ituiutaba', 'Araxá'],
    descricao: 'Triângulo Mineiro e Alto Paranaíba.'
  },
  '35': {
    ddd: '35',
    uf: 'MG',
    estado: 'Minas Gerais',
    regiao: 'Sudeste',
    cidadesPrincipais: ['Poços de Caldas', 'Pouso Alegre', 'Varginha', 'Passos', 'Lavras', 'Itajubá'],
    descricao: 'Sul e Sudoeste de Minas Gerais.'
  },
  '37': {
    ddd: '37',
    uf: 'MG',
    estado: 'Minas Gerais',
    regiao: 'Sudeste',
    cidadesPrincipais: ['Divinópolis', 'Itaúna', 'Pará de Minas', 'Formiga', 'Nova Serrana', 'Bom Despacho'],
    descricao: 'Região Centro-Oeste de Minas Gerais.'
  },
  '38': {
    ddd: '38',
    uf: 'MG',
    estado: 'Minas Gerais',
    regiao: 'Sudeste',
    cidadesPrincipais: ['Montes Claros', 'Curvelo', 'Pirapora', 'Unaí', 'Paracatu', 'Januária'],
    descricao: 'Norte e Noroeste de Minas Gerais.'
  },

  // SUL (41 a 55)
  '41': {
    ddd: '41',
    uf: 'PR',
    estado: 'Paraná',
    regiao: 'Sul',
    cidadesPrincipais: ['Curitiba', 'São José dos Pinhais', 'Colombo', 'Paranaguá', 'Araucária', 'Campo Largo'],
    descricao: 'Região Metropolitana de Curitiba e Litoral do Paraná.'
  },
  '42': {
    ddd: '42',
    uf: 'PR',
    estado: 'Paraná',
    regiao: 'Sul',
    cidadesPrincipais: ['Ponta Grossa', 'Guarapuava', 'Castro', 'Telêmaco Borba', 'Irati', 'União da Vitória'],
    descricao: 'Região Centro-Sul e Campos Gerais do Paraná.'
  },
  '43': {
    ddd: '43',
    uf: 'PR',
    estado: 'Paraná',
    regiao: 'Sul',
    cidadesPrincipais: ['Londrina', 'Apucarana', 'Arapongas', 'Rolândia', 'Cornélio Procópio', 'Jacarezinho'],
    descricao: 'Norte e Norte Pioneiro do Paraná.'
  },
  '44': {
    ddd: '44',
    uf: 'PR',
    estado: 'Paraná',
    regiao: 'Sul',
    cidadesPrincipais: ['Maringá', 'Campo Mourão', 'Umuarama', 'Paranavaí', 'Cianorte'],
    descricao: 'Noroeste do Paraná (Maringá e Campo Mourão).'
  },
  '45': {
    ddd: '45',
    uf: 'PR',
    estado: 'Paraná',
    regiao: 'Sul',
    cidadesPrincipais: ['Cascavel', 'Foz do Iguaçu', 'Toledo', 'Marechal Cândido Rondon', 'Medianeira'],
    descricao: 'Oeste do Paraná (Foz do Iguaçu e Cascavel).'
  },
  '46': {
    ddd: '46',
    uf: 'PR',
    estado: 'Paraná',
    regiao: 'Sul',
    cidadesPrincipais: ['Francisco Beltrão', 'Pato Branco', 'Palmas', 'Dois Vizinhos'],
    descricao: 'Sudoeste do Paraná.'
  },
  '47': {
    ddd: '47',
    uf: 'SC',
    estado: 'Santa Catarina',
    regiao: 'Sul',
    cidadesPrincipais: ['Joinville', 'Blumenau', 'Itajaí', 'Balneário Camboriú', 'Brusque', 'Jaraguá do Sul'],
    descricao: 'Norte de Santa Catarina e Vale do Itajaí.'
  },
  '48': {
    ddd: '48',
    uf: 'SC',
    estado: 'Santa Catarina',
    regiao: 'Sul',
    cidadesPrincipais: ['Florianópolis', 'São José', 'Palhoça', 'Criciúma', 'Tubarão', 'Araranguá'],
    descricao: 'Grande Florianópolis e Sul Catarinense.'
  },
  '49': {
    ddd: '49',
    uf: 'SC',
    estado: 'Santa Catarina',
    regiao: 'Sul',
    cidadesPrincipais: ['Chapecó', 'Lages', 'Concórdia', 'Caçador', 'Joaçaba', 'São Miguel do Oeste'],
    descricao: 'Oeste, Meio-Oeste e Planalto Serrano Catarinense.'
  },
  '51': {
    ddd: '51',
    uf: 'RS',
    estado: 'Rio Grande do Sul',
    regiao: 'Sul',
    cidadesPrincipais: ['Porto Alegre', 'Canoas', 'Novo Hamburgo', 'São Leopoldo', 'Gravataí', 'Santa Cruz do Sul'],
    descricao: 'Região Metropolitana de Porto Alegre e Vales dos Sinos e Taquari.'
  },
  '53': {
    ddd: '53',
    uf: 'RS',
    estado: 'Rio Grande do Sul',
    regiao: 'Sul',
    cidadesPrincipais: ['Pelotas', 'Rio Grande', 'Bagé', 'Santana do Livramento', 'Jaguarão'],
    descricao: 'Sul do Rio Grande do Sul e Fronteira Sul.'
  },
  '54': {
    ddd: '54',
    uf: 'RS',
    estado: 'Rio Grande do Sul',
    regiao: 'Sul',
    cidadesPrincipais: ['Caxias do Sul', 'Passo Fundo', 'Bento Gonçalves', 'Erechim', 'Vacaria', 'Gramado'],
    descricao: 'Serra Gaúcha e Norte do Rio Grande do Sul.'
  },
  '55': {
    ddd: '55',
    uf: 'RS',
    estado: 'Rio Grande do Sul',
    regiao: 'Sul',
    cidadesPrincipais: ['Santa Maria', 'Uruguaiana', 'Ijuí', 'Santo Ângelo', 'São Borja', 'Cruz Alta'],
    descricao: 'Centro, Oeste e Noroeste do Rio Grande do Sul.'
  },

  // CENTRO-OESTE / DF / TOCANTINS (61 a 69)
  '61': {
    ddd: '61',
    uf: 'DF/GO',
    estado: 'Distrito Federal e Goiás',
    regiao: 'Centro-Oeste',
    cidadesPrincipais: ['Brasília', 'Taguatinga', 'Ceilândia', 'Águas Lindas de Goiás', 'Valparaíso de Goiás', 'Luziânia'],
    descricao: 'Distrito Federal e municípios da Região Integrada de Desenvolvimento (RIDE).'
  },
  '62': {
    ddd: '62',
    uf: 'GO',
    estado: 'Goiás',
    regiao: 'Centro-Oeste',
    cidadesPrincipais: ['Goiânia', 'Aparecida de Goiânia', 'Anápolis', 'Itumbiara', 'Rio Verde', 'Caldas Novas'],
    descricao: 'Região Central, Norte e Metropolitana de Goiânia.'
  },
  '63': {
    ddd: '63',
    uf: 'TO',
    estado: 'Tocantins',
    regiao: 'Norte',
    cidadesPrincipais: ['Palmas', 'Araguaína', 'Gurupi', 'Porto Nacional', 'Paraíso do Tocantins'],
    descricao: 'Todo o Estado do Tocantins.'
  },
  '64': {
    ddd: '64',
    uf: 'GO',
    estado: 'Goiás',
    regiao: 'Centro-Oeste',
    cidadesPrincipais: ['Rio Verde', 'Itumbiara', 'Catalão', 'Jataí', 'Morrinhos', 'Mineiros'],
    descricao: 'Sul e Sudoeste do Estado de Goiás.'
  },
  '65': {
    ddd: '65',
    uf: 'MT',
    estado: 'Mato Grosso',
    regiao: 'Centro-Oeste',
    cidadesPrincipais: ['Cuiabá', 'Várzea Grande', 'Cáceres', 'Tangará da Serra', 'Poconé'],
    descricao: 'Região Metropolitana de Cuiabá e Centro-Oeste Matogrossense.'
  },
  '66': {
    ddd: '66',
    uf: 'MT',
    estado: 'Mato Grosso',
    regiao: 'Centro-Oeste',
    cidadesPrincipais: ['Rondonópolis', 'Sinop', 'Sorriso', 'Lucas do Rio Verde', 'Barra do Garças', 'Primavera do Leste'],
    descricao: 'Norte, Sul e Leste do Estado de Mato Grosso.'
  },
  '67': {
    ddd: '67',
    uf: 'MS',
    estado: 'Mato Grosso do Sul',
    regiao: 'Centro-Oeste',
    cidadesPrincipais: ['Campo Grande', 'Dourados', 'Três Lagoas', 'Corumbá', 'Ponta Porã', 'Naviraí'],
    descricao: 'Todo o Estado do Mato Grosso do Sul.'
  },
  '68': {
    ddd: '68',
    uf: 'AC',
    estado: 'Acre',
    regiao: 'Norte',
    cidadesPrincipais: ['Rio Branco', 'Cruzeiro do Sul', 'Sena Madureira', 'Tarauacá', 'Feijó'],
    descricao: 'Todo o Estado do Acre.'
  },
  '69': {
    ddd: '69',
    uf: 'RO',
    estado: 'Rondônia',
    regiao: 'Norte',
    cidadesPrincipais: ['Porto Velho', 'Ji-Paraná', 'Ariquemes', 'Vilhena', 'Cacoal', 'Rolim de Moura'],
    descricao: 'Todo o Estado de Rondônia.'
  },

  // NORDESTE (71 a 89)
  '71': {
    ddd: '71',
    uf: 'BA',
    estado: 'Bahia',
    regiao: 'Nordeste',
    cidadesPrincipais: ['Salvador', 'Camaçari', 'Lauro de Freitas', 'Simões Filho', 'Candeias'],
    descricao: 'Região Metropolitana de Salvador.'
  },
  '73': {
    ddd: '73',
    uf: 'BA',
    estado: 'Bahia',
    regiao: 'Nordeste',
    cidadesPrincipais: ['Ilhéus', 'Itabuna', 'Porto Seguro', 'Teixeira de Freitas', 'Eunápolis', 'Jequié'],
    descricao: 'Sul e Extremo Sul da Bahia.'
  },
  '74': {
    ddd: '74',
    uf: 'BA',
    estado: 'Bahia',
    regiao: 'Nordeste',
    cidadesPrincipais: ['Juazeiro', 'Jacobina', 'Irecê', 'Senhor do Bonfim', 'Campo Formoso'],
    descricao: 'Região Noroeste da Bahia e Vale do São Francisco.'
  },
  '75': {
    ddd: '75',
    uf: 'BA',
    estado: 'Bahia',
    regiao: 'Nordeste',
    cidadesPrincipais: ['Feira de Santana', 'Alagoinhas', 'Cruz das Almas', 'Santo Antônio de Jesus', 'Valença'],
    descricao: 'Região Centro-Leste e Recôncavo Baiano.'
  },
  '77': {
    ddd: '77',
    uf: 'BA',
    estado: 'Bahia',
    regiao: 'Nordeste',
    cidadesPrincipais: ['Vitória da Conquista', 'Barreiras', 'Luís Eduardo Magalhães', 'Brumado', 'Guanambi', 'Bom Jesus da Lapa'],
    descricao: 'Região Sudoeste e Oeste da Bahia.'
  },
  '79': {
    ddd: '79',
    uf: 'SE',
    estado: 'Sergipe',
    regiao: 'Nordeste',
    cidadesPrincipais: ['Aracaju', 'Nossa Senhora do Socorro', 'Lagarto', 'Itabaiana', 'São Cristóvão', 'Estância'],
    descricao: 'Todo o Estado de Sergipe.'
  },
  '81': {
    ddd: '81',
    uf: 'PE',
    estado: 'Pernambuco',
    regiao: 'Nordeste',
    cidadesPrincipais: ['Recife', 'Jaboatão dos Guararapes', 'Olinda', 'Caruaru', 'Paulista', 'Garanhuns'],
    descricao: 'Região Metropolitana do Recife, Zona da Mata e Agreste Pernambucano.'
  },
  '82': {
    ddd: '82',
    uf: 'AL',
    estado: 'Alagoas',
    regiao: 'Nordeste',
    cidadesPrincipais: ['Maceió', 'Arapiraca', 'Rio Largo', 'Palmeira dos Índios', 'União dos Palmares'],
    descricao: 'Todo o Estado de Alagoas.'
  },
  '83': {
    ddd: '83',
    uf: 'PB',
    estado: 'Paraíba',
    regiao: 'Nordeste',
    cidadesPrincipais: ['João Pessoa', 'Campina Grande', 'Santa Rita', 'Patos', 'Bayeux', 'Sousa', 'Cajazeiras'],
    descricao: 'Todo o Estado da Paraíba.'
  },
  '84': {
    ddd: '84',
    uf: 'RN',
    estado: 'Rio Grande do Norte',
    regiao: 'Nordeste',
    cidadesPrincipais: ['Natal', 'Mossoró', 'Parnamirim', 'São Gonçalo do Amarante', 'Ceará-Mirim', 'Caicó'],
    descricao: 'Todo o Estado do Rio Grande do Norte.'
  },
  '85': {
    ddd: '85',
    uf: 'CE',
    estado: 'Ceará',
    regiao: 'Nordeste',
    cidadesPrincipais: ['Fortaleza', 'Caucaia', 'Maracanaú', 'Sobral', 'Itapipoca', 'Maranguape', 'Cascavel'],
    descricao: 'Região Metropolitana de Fortaleza e Litoral Norte do Ceará.'
  },
  '86': {
    ddd: '86',
    uf: 'PI',
    estado: 'Piauí',
    regiao: 'Nordeste',
    cidadesPrincipais: ['Teresina', 'Parnaíba', 'Campo Maior', 'Piripiri', 'Barras', 'Esperantina'],
    descricao: 'Norte do Piauí e Região Metropolitana de Teresina.'
  },
  '87': {
    ddd: '87',
    uf: 'PE',
    estado: 'Pernambuco',
    regiao: 'Nordeste',
    cidadesPrincipais: ['Petrolina', 'Salgueiro', 'Serra Talhada', 'Arcoverde', 'Ouricuri', 'Afogados da Ingazeira'],
    descricao: 'Sertão Pernambucano (Petrolina e Salgueiro).'
  },
  '88': {
    ddd: '88',
    uf: 'CE',
    estado: 'Ceará',
    regiao: 'Nordeste',
    cidadesPrincipais: ['Juazeiro do Norte', 'Crato', 'Barbalha', 'Iguatu', 'Quixadá', 'Crateús'],
    descricao: 'Sul, Centro-Sul e Sertão Central do Ceará (Cariri).'
  },
  '89': {
    ddd: '89',
    uf: 'PI',
    estado: 'Piauí',
    regiao: 'Nordeste',
    cidadesPrincipais: ['Picos', 'Floriano', 'São Raimundo Nonato', 'Corrente', 'Bom Jesus', 'Oeiras'],
    descricao: 'Centro, Sul e Sudeste do Estado do Piauí.'
  },

  // NORTE (91 a 99)
  '91': {
    ddd: '91',
    uf: 'PA',
    estado: 'Pará',
    regiao: 'Norte',
    cidadesPrincipais: ['Belém', 'Ananindeua', 'Castanhal', 'Marituba', 'Barcarena', 'Abaetetuba'],
    descricao: 'Região Metropolitana de Belém e Nordeste do Pará.'
  },
  '92': {
    ddd: '92',
    uf: 'AM',
    estado: 'Amazonas',
    regiao: 'Norte',
    cidadesPrincipais: ['Manaus', 'Itacoatiara', 'Manacapuru', 'Parintins', 'Coari', 'Tefé'],
    descricao: 'Região Metropolitana de Manaus e Leste do Amazonas.'
  },
  '93': {
    ddd: '93',
    uf: 'PA',
    estado: 'Pará',
    regiao: 'Norte',
    cidadesPrincipais: ['Santarém', 'Itaituba', 'Altamira', 'Oriximiná', 'Alenquer', 'Monte Alegre'],
    descricao: 'Oeste do Pará (Baixo Amazonas e Tapajós).'
  },
  '94': {
    ddd: '94',
    uf: 'PA',
    estado: 'Pará',
    regiao: 'Norte',
    cidadesPrincipais: ['Marabá', 'Parauapebas', 'Tucuruí', 'Redenção', 'Canaã dos Carajás', 'Xinguara'],
    descricao: 'Sudeste do Pará (Carajás e Araguaia).'
  },
  '95': {
    ddd: '95',
    uf: 'RR',
    estado: 'Roraima',
    regiao: 'Norte',
    cidadesPrincipais: ['Boa Vista', 'Rorainópolis', 'Caracaraí', 'Cantá', 'Mucajaí'],
    descricao: 'Todo o Estado de Roraima.'
  },
  '96': {
    ddd: '96',
    uf: 'AP',
    estado: 'Amapá',
    regiao: 'Norte',
    cidadesPrincipais: ['Macapá', 'Santana', 'Laranjal do Jari', 'Oiapoque', 'Porto Grande'],
    descricao: 'Todo o Estado do Amapá.'
  },
  '97': {
    ddd: '97',
    uf: 'AM',
    estado: 'Amazonas',
    regiao: 'Norte',
    cidadesPrincipais: ['Tabatinga', 'Humaitá', 'Lábrea', 'Eirunepé', 'São Gabriel da Cachoeira', 'Borba'],
    descricao: 'Oeste, Sudoeste e Sul do Estado do Amazonas.'
  },
  '98': {
    ddd: '98',
    uf: 'MA',
    estado: 'Maranhão',
    regiao: 'Nordeste',
    cidadesPrincipais: ['São Luís', 'São José de Ribamar', 'Paço do Lumiar', 'Pinheiro', 'Santa Inês', 'Chapadinha'],
    descricao: 'Região Metropolitana de São Luís e Norte do Maranhão.'
  },
  '99': {
    ddd: '99',
    uf: 'MA',
    estado: 'Maranhão',
    regiao: 'Nordeste',
    cidadesPrincipais: ['Imperatriz', 'Caxias', 'Timon', 'Codó', 'Açailândia', 'Bacabal', 'Balsas'],
    descricao: 'Centro, Sul e Leste do Maranhão.'
  }
};

/**
 * Lista de todos os 67 DDDs cadastrados oficialmente na Anatel
 */
export const TODOS_DDDS: string[] = Object.keys(DDD_DATA).sort();

/**
 * Normaliza qualquer entrada de telefone ou DDD brasileiro
 * Retorna os dígitos limpos (sem formatação) e remove o prefixo +55 se houver.
 */
export function normalizarNumeroBrasileiro(entrada: string): {
  clean: string;
  ddd: string;
  numero: string;
  temDddValido: boolean;
} {
  let clean = entrada.replace(/\D/g, '');

  // Se tiver código do país 55 e mais de 10 dígitos, extrai o 55
  if (clean.startsWith('55') && clean.length > 11) {
    clean = clean.substring(2);
  }

  const ddd = clean.length >= 2 ? clean.slice(0, 2) : '';
  const numero = clean.length > 2 ? clean.slice(2) : '';
  const temDddValido = Boolean(ddd && DDD_DATA[ddd]);

  return { clean, ddd, numero, temDddValido };
}

export type TipoNumeroTelefone = 'celular' | 'fixo' | 'invalido' | 'incompleto';

export interface AnaliseTelefone {
  valido: boolean;
  status: 'vazio' | 'incompleto' | 'invalido' | 'reconhecido';
  mensagem: string;
  tipo: TipoNumeroTelefone;
  tipoLabel: string;
  formatado: string;
  ddd: string;
  estado?: string;
  uf?: string;
  regiao?: string;
  cidadesPrincipais?: string[];
  detalheRegiao?: string;
}

/**
 * Analisa a estrutura e padrão de numeração segundo as regras da Anatel
 */
export function analisarTelefoneBrasileiro(entrada: string): AnaliseTelefone {
  const trimmed = entrada.trim();
  if (!trimmed) {
    return {
      valido: false,
      status: 'vazio',
      mensagem: 'Digite um número com DDD para começar.',
      tipo: 'invalido',
      tipoLabel: 'Não informado',
      formatado: '',
      ddd: ''
    };
  }

  const { clean, ddd, numero, temDddValido } = normalizarNumeroBrasileiro(trimmed);

  // Sequências de repetição total
  const sequenciasInvalidas = [
    '0000000000', '1111111111', '2222222222', '3333333333', '4444444444',
    '5555555555', '6666666666', '7777777777', '8888888888', '9999999999',
    '00000000000', '11111111111', '22222222222', '33333333333', '44444444444',
    '55555555555', '66666666666', '77777777777', '88888888888', '99999999999'
  ];

  if (sequenciasInvalidas.includes(clean)) {
    return {
      valido: false,
      status: 'invalido',
      mensagem: 'Não reconhecemos esse formato de telefone brasileiro. Revise o número e tente novamente.',
      tipo: 'invalido',
      tipoLabel: 'Sequência inválida',
      formatado: clean,
      ddd
    };
  }

  // Verifica comprimento incompleto
  if (clean.length < 10) {
    return {
      valido: false,
      status: 'incompleto',
      mensagem: 'O número informado está incompleto. Confira o DDD e os demais dígitos.',
      tipo: 'incompleto',
      tipoLabel: 'Incompleto',
      formatado: clean,
      ddd
    };
  }

  // Comprimento maior que 11 dígitos
  if (clean.length > 11) {
    return {
      valido: false,
      status: 'invalido',
      mensagem: 'Não reconhecemos esse formato de telefone brasileiro. Revise o número e tente novamente.',
      tipo: 'invalido',
      tipoLabel: 'Excesso de dígitos',
      formatado: clean,
      ddd
    };
  }

  // Se o DDD não existir na base oficial da Anatel
  if (!temDddValido) {
    return {
      valido: false,
      status: 'invalido',
      mensagem: `O DDD (${ddd}) não corresponde a uma área de numeração oficial da Anatel. Revise o número e tente novamente.`,
      tipo: 'invalido',
      tipoLabel: 'DDD inexistente',
      formatado: clean,
      ddd
    };
  }

  const dddInfo = DDD_DATA[ddd];

  // Caso 11 dígitos: Celular brasileiro (regra Anatel: 9º dígito obrigatório '9', seguido de dígito entre 6 e 9)
  if (clean.length === 11) {
    const primeiroDigitoNumero = numero.charAt(0);
    const segundoDigitoNumero = numero.charAt(1);

    // No padrão Anatel, celular tem primeiro dígito '9'
    if (primeiroDigitoNumero !== '9') {
      return {
        valido: false,
        status: 'invalido',
        mensagem: 'Não reconhecemos esse formato de telefone brasileiro. Números celulares de 9 dígitos devem iniciar com 9.',
        tipo: 'invalido',
        tipoLabel: 'Formato incompatível',
        formatado: clean,
        ddd,
        estado: dddInfo.estado,
        uf: dddInfo.uf,
        regiao: dddInfo.regiao
      };
    }

    const formatado = `(${ddd}) ${numero.slice(0, 5)}-${numero.slice(5)}`;
    return {
      valido: true,
      status: 'reconhecido',
      mensagem: 'Formato de telefone reconhecido. O número informado possui estrutura compatível com um telefone brasileiro. Continue para conhecer as modalidades de consulta cadastral disponíveis.',
      tipo: 'celular',
      tipoLabel: 'Telefone Celular',
      formatado,
      ddd,
      estado: dddInfo.estado,
      uf: dddInfo.uf,
      regiao: dddInfo.regiao,
      cidadesPrincipais: dddInfo.cidadesPrincipais,
      detalheRegiao: dddInfo.descricao
    };
  }

  // Caso 10 dígitos: Telefone Fixo brasileiro (regra Anatel: 8 dígitos, iniciando com [2, 3, 4 ou 5])
  if (clean.length === 10) {
    const primeiroDigitoNumero = numero.charAt(0);

    // Telefones fixos no Brasil começam tipicamente com 2, 3, 4 ou 5
    if (!['2', '3', '4', '5'].includes(primeiroDigitoNumero)) {
      return {
        valido: false,
        status: 'invalido',
        mensagem: 'Não reconhecemos esse formato de telefone brasileiro. Telefones fixos com 8 dígitos costumam iniciar com 2, 3, 4 ou 5.',
        tipo: 'invalido',
        tipoLabel: 'Formato fixo incomum',
        formatado: clean,
        ddd,
        estado: dddInfo.estado,
        uf: dddInfo.uf,
        regiao: dddInfo.regiao
      };
    }

    const formatado = `(${ddd}) ${numero.slice(0, 4)}-${numero.slice(4)}`;
    return {
      valido: true,
      status: 'reconhecido',
      mensagem: 'Formato de telefone reconhecido. O número informado possui estrutura compatível com um telefone brasileiro. Continue para conhecer as modalidades de consulta cadastral disponíveis.',
      tipo: 'fixo',
      tipoLabel: 'Telefone Fixo',
      formatado,
      ddd,
      estado: dddInfo.estado,
      uf: dddInfo.uf,
      regiao: dddInfo.regiao,
      cidadesPrincipais: dddInfo.cidadesPrincipais,
      detalheRegiao: dddInfo.descricao
    };
  }

  return {
    valido: false,
    status: 'invalido',
    mensagem: 'Não reconhecemos esse formato de telefone brasileiro. Revise o número e tente novamente.',
    tipo: 'invalido',
    tipoLabel: 'Inválido',
    formatado: clean,
    ddd
  };
}
