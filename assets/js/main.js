(() => {
  const body = document.body;
  const loader = document.querySelector(".site-loader");
  const siteHeader = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const mobileOverlay = document.querySelector(".mobile-overlay");
  const preferenceStorage = {
    get(key) {
      try {
        return window.localStorage.getItem(key);
      } catch {
        return null;
      }
    },
    set(key, value) {
      try {
        window.localStorage.setItem(key, value);
      } catch {
        return false;
      }
      return true;
    }
  };

  const themeKey = "thebar-theme";
  const languageKey = "thebar-language";
  const translatableAttributes = ["aria-label", "alt", "placeholder", "title", "data-lightbox-title", "data-lightbox-text", "data-tooltip"];
  const originalTextNodes = new WeakMap();
  const originalAttributes = new WeakMap();
  const originalMetaContent = new WeakMap();
  const originalTitle = document.title;
  const preferences = {
    theme: preferenceStorage.get(themeKey) === "light" ? "light" : "dark",
    language: preferenceStorage.get(languageKey) === "en" ? "en" : "pt"
  };

  const uiCopy = {
    pt: {
      controls: "Preferências do site",
      language: "Idioma",
      portuguese: "Português",
      english: "Inglês",
      light: "Ativar tema claro",
      dark: "Ativar tema escuro"
    },
    en: {
      controls: "Site preferences",
      language: "Language",
      portuguese: "Portuguese",
      english: "English",
      light: "Switch to light theme",
      dark: "Switch to dark theme"
    }
  };

  const translations = {
    en: {
      "© 2026 The Bar. Todos os direitos reservados.": "© 2026 The Bar. All rights reserved.",
      "1. Aceitação dos termos": "1. Acceptance of the Terms",
      "1. Compromisso com a sua privacidade": "1. Commitment to your privacy",
      "10 anos": "10 years",
      "10. Contato": "10. Contact",
      "10. Seus direitos": "10. Your rights",
      "11. Alterações nesta política": "11. Changes to this policy",
      "12. Contato": "12. Contact",
      "2. Controlador dos dados": "2. Data controller",
      "2. Sobre a The Bar": "2. About The Bar",
      "3. Dados que coletamos": "3. Data we collect",
      "3. Uso do site": "3. Use of the website",
      "4. Finalidades do tratamento": "4. Purposes of processing",
      "4. Propriedade intelectual": "4. Intellectual property",
      "5. Bases legais": "5. Legal bases",
      "5. Contratação de serviços": "5. Service contracting",
      "6. Cancelamento e reagendamento": "6. Cancellation and rescheduling",
      "6. Compartilhamento": "6. Sharing",
      "7. Cookies": "7. Cookies",
      "7. Limitação de responsabilidade": "7. Limitation of liability",
      "8. Armazenamento e segurança": "8. Storage and security",
      "8. Modificações": "8. Modifications",
      "9. Foro": "9. Jurisdiction",
      "9. Tempo de retenção": "9. Retention period",
      "A arte da coquetelaria autoral, servida com a sofisticação que o seu momento merece.": "The art of signature cocktails, served with the sophistication your moment deserves.",
      "A casa": "The house",
      "A contratação dos serviços da The Bar é formalizada por meio de proposta comercial e contrato específico, assinado por ambas as partes. As condições comerciais são detalhadas no contrato.": "The Bar services are formalized through a commercial proposal and a specific agreement signed by both parties. Commercial terms are detailed in the contract.",
      "A equipe é dimensionada conforme o número de convidados, formato do evento e cardápio. Em média, trabalhamos com 1 bartender para cada 50 convidados em open bar. Detalhamos isso na proposta.": "The team is sized according to guest count, event format and menu. On average, we work with 1 bartender for every 50 guests in an open bar format. We detail this in the proposal.",
      "A equipe conduziu tudo com uma naturalidade rara. Os drinks eram lindos, bem executados e o atendimento aconteceu no tempo certo durante toda a festa.": "The team handled everything with rare ease. The cocktails were beautiful, well executed, and service flowed at the right pace throughout the party.",
      "“A equipe conduziu tudo com uma naturalidade rara. Os drinks eram lindos, bem executados e o atendimento aconteceu no tempo certo durante toda a festa.”": "“The team handled everything with rare ease. The cocktails were beautiful, well executed, and service flowed at the right pace throughout the party.”",
      "A estrutura personalizada fez toda a diferença. Tudo parecia pensado para a casa, para os convidados e para o ritmo da noite. Experiência memorável.": "The custom setup made all the difference. Everything felt designed for the house, the guests and the rhythm of the night. A memorable experience.",
      "“A estrutura personalizada fez toda a diferença. Tudo parecia pensado para a casa, para os convidados e para o ritmo da noite. Experiência memorável.”": "“The custom setup made all the difference. Everything felt designed for the house, the guests and the rhythm of the night. A memorable experience.”",
      "A filosofia The Bar": "The Bar philosophy",
      "A LGPD garante direitos como confirmação de tratamento, acesso, correção, anonimização ou eliminação, portabilidade e revogação de consentimento. Para exercê-los, escreva para privacidade@thebar.br.": "Brazilian data protection law guarantees rights such as confirmation of processing, access, correction, anonymization or deletion, portability and withdrawal of consent. To exercise them, write to privacidade@thebar.br.",
      "A página que você procura não está disponível. Volte ao início ou fale com a The Bar.": "The page you are looking for is not available. Return home or contact The Bar.",
      "A página solicitada não foi encontrada.": "The requested page was not found.",
      "A The Bar é uma empresa especializada em serviços de coquetelaria, mixologia e bartending para eventos. Razão social: [Razão Social Completa]. CNPJ: [CNPJ]. Endereço: [Endereço completo].": "The Bar is a company specialized in cocktail, mixology and bartending services for events. Legal name: [Full Legal Name]. CNPJ: [CNPJ]. Address: [full address].",
      "A The Bar empenha seus melhores esforços para garantir a precisão das informações no site, mas não se responsabiliza por inconsistências eventuais, interrupções técnicas ou conteúdos de sites externos linkados.": "The Bar makes its best efforts to ensure the accuracy of website information, but is not liable for occasional inconsistencies, technical interruptions or content from linked external websites.",
      "A The Bar opera no espaço delicado entre o serviço e a arte. Não competimos com cardápios. Competimos com a memória dos seus convidados.": "The Bar operates in the delicate space between service and art. We do not compete with menus. We compete with your guests' memories.",
      "A The Bar respeita integralmente a sua privacidade e atua em conformidade com a Lei Geral de Proteção de Dados Pessoais, Lei nº 13.709/2018.": "The Bar fully respects your privacy and acts in compliance with Brazil's General Data Protection Law, Law No. 13,709/2018.",
      "Abrir menu": "Open menu",
      "Absolutamente. Criamos cartas personalizadas para cada evento, incluindo coquetéis assinatura com o nome do casal, da marca ou do anfitrião.": "Absolutely. We create custom menus for each event, including signature cocktails named after the couple, brand or host.",
      "Aceitar todos": "Accept all",
      "Acreditamos que o luxo não está no excesso, mas no cuidado. Por isso, trabalhamos com o número justo de eventos por mês, para que o seu nunca seja apenas mais um.": "We believe luxury is not in excess, but in care. That is why we take on the right number of events each month, so yours is never just another one.",
      "Aniversário privado com bar residencial, mocktails e coquetéis de assinatura.": "Private birthday with a residential bar, mocktails and signature cocktails.",
      "Aniversário 40 anos": "40th Birthday",
      "Aniversários marcantes, jantares íntimos e festas privadas para anfitriões exigentes.": "Milestone birthdays, intimate dinners and private parties for discerning hosts.",
      "Aniversários marcantes, jantares íntimos, festas privadas. Para os anfitriões que entendem que o copo importa.": "Milestone birthdays, intimate dinners and private parties. For hosts who understand that the glass matters.",
      "Antes do brinde,": "Before the toast,",
      "Ao acessar e utilizar o site thebar.br, você concorda integralmente com estes Termos de Uso. Se não concordar, pedimos que não utilize o site.": "By accessing and using thebar.br, you fully agree to these Terms of Use. If you do not agree, please do not use the website.",
      "Após o primeiro contato, agendamos uma conversa para entender o evento. Em até 3 dias úteis, enviamos uma proposta personalizada com escopo, cardápio sugerido e valor.": "After the first contact, we schedule a conversation to understand the event. Within 3 business days, we send a custom proposal with scope, suggested menu and pricing.",
      "As condições de cancelamento e reagendamento são definidas no contrato comercial assinado. Cancelamentos com mais de 60 dias de antecedência têm tratamento diferenciado de cancelamentos próximos à data do evento.": "Cancellation and rescheduling conditions are defined in the signed commercial contract. Cancellations more than 60 days in advance are treated differently from cancellations close to the event date.",
      "as respostas.": "the answers.",
      "Atendem fora de São Paulo?": "Do you serve outside Sao Paulo?",
      "Atendem restrições alimentares?": "Do you handle dietary restrictions?",
      "Atendemos casamentos, eventos corporativos, aniversários, festas privadas, lançamentos de marca, jantares executivos e celebrações sob demanda. Nosso foco é em eventos de médio e alto padrão.": "We serve weddings, corporate events, birthdays, private parties, brand launches, executive dinners and custom celebrations. Our focus is on mid- to high-end events.",
      "Atendimento alinhado ao protocolo corporativo": "Service aligned with corporate protocol",
      "Atendimento impecável": "Impeccable service",
      "Atendimento premium": "Premium service",
      "Atendimento residencial com discrição absoluta": "Residential service with absolute discretion",
      "Atmosfera personalizada": "Custom atmosphere",
      "Avaliações Google": "Google reviews",
      "Balcões personalizados, cristais e insumos de alto padrão.": "Custom counters, glassware and high-end ingredients.",
      "Bar com prateleiras de garrafas em atmosfera escura": "Bar with bottle shelves in a dark atmosphere",
      "Bar corporativo com drinks alinhados à identidade visual da marca.": "Corporate bar with cocktails aligned to the brand's visual identity.",
      "Bar principal com bartenders trajados": "Main bar with dressed bartenders",
      "Bartender finalizando coquetel em balcão escuro": "Bartender finishing a cocktail on a dark counter",
      "Bartender preparando coquetéis em bancada escura": "Bartender preparing cocktails on a dark counter",
      "Bartenders dedicados ao perfil do anfitrião": "Bartenders dedicated to the host's profile",
      "Bastidores de uma": "Behind the scenes of",
      "Brindes sob medida": "Tailored toasts",
      "Cabeçalho": "Header",
      "Cada cliente recebe um menu autoral pensado para o seu evento.": "Every client receives a signature menu designed for their event.",
      "Cada coquetel é pensado, cada movimento ensaiado, cada detalhe escolhido com a atenção que se reserva às coisas que importam.": "Every cocktail is considered, every movement rehearsed, every detail chosen with the attention reserved for things that matter.",
      "Cada coquetel é uma assinatura. Cada serviço, uma performance silenciosa. Cada evento, uma celebração à altura do momento que você sonhou, orquestrada nos detalhes que ninguém vê, mas todos sentem.": "Every cocktail is a signature. Every service, a silent performance. Every event, a celebration worthy of the moment you imagined, orchestrated through details no one sees but everyone feels.",
      "Cada detalhe do bar acompanha a estética e a energia da celebração.": "Every bar detail follows the celebration's aesthetic and energy.",
      "Cada evento pede um ritmo. A The Bar compõe a carta, a operação e a presença certa para que o brinde pareça inevitável.": "Every event asks for its own rhythm. The Bar composes the menu, operation and presence so the toast feels inevitable.",
      "Campo obrigatório.": "Required field.",
      "Cardápio e personalização": "Menu and customization",
      "Carregando The Bar": "Loading The Bar",
      "Carta autoral assinada por mixologistas premiados.": "Signature menu created by award-winning mixologists.",
      "Carta de coquetéis personalizada com nomes dos noivos": "Custom cocktail menu with the couple's names",
      "Casamento": "Wedding",
      "Casamento íntimo com estação de gin, espumantes e menu do casal.": "Intimate wedding with a gin station, sparkling wine and the couple's menu.",
      "Casamento para 220 convidados, com carta autoral assinada para o casal.": "Wedding for 220 guests, with a signature menu created for the couple.",
      "Casamentos": "Weddings",
      "Chegamos antes. Saímos depois. Resolvemos durante.": "We arrive early. We leave later. We solve things in between.",
      "Cidade / local do evento": "City / event venue",
      "Clicar para ver o evento": "Click to view the event",
      "Clientes que indicam": "Clients who refer us",
      "Cobertura para eventos de 30 a 1.000 convidados": "Coverage for events from 30 to 1,000 guests",
      "Coletamos dados fornecidos voluntariamente no formulário de contato, como nome, email, telefone, tipo de evento, data e local, além de dados de navegação coletados automaticamente por cookies.": "We collect data voluntarily provided in the contact form, such as name, email, phone, event type, date and location, as well as browsing data automatically collected through cookies.",
      "Com quanta antecedência preciso reservar?": "How far in advance should I book?",
      "Como funciona o orçamento?": "How does the quote work?",
      "Como gerenciar": "How to manage",
      "Como transformamos coquetéis em memória": "How we turn cocktails into memories",
      "Como tratamos os seus dados pessoais, em conformidade com a LGPD.": "How we process your personal data in compliance with Brazil's data protection law.",
      "Como usamos cookies para melhorar sua experiência no site.": "How we use cookies to improve your website experience.",
      "Compomos memórias.": "We compose memories.",
      "Configurar cookies": "Cookie settings",
      "Conheça a filosofia, a equipe e o cuidado artesanal por trás de cada evento que assinamos.": "Meet the philosophy, team and craft behind every event we sign.",
      "Conhecer a TheBar": "Meet The Bar",
      "Conhecer casamentos": "Explore weddings",
      "Conhecer corporativo": "Explore corporate",
      "Conhecer festas": "Explore parties",
      "Consultoria de menu de drinks": "Cocktail menu consulting",
      "conta uma história.": "tells a story.",
      "Contato": "Contact",
      "Contato — Reserve sua data | The Bar": "Contact — Reserve your date | The Bar",
      "Conte mais sobre o seu evento": "Tell us more about your event",
      "Conte-nos sobre": "Tell us about",
      "Conte sobre o seu evento. Em até 24h, retornamos com uma proposta personalizada.": "Tell us about your event. Within 24h, we will return with a custom proposal.",
      "Cookies de marketing": "Marketing cookies",
      "Cookies de performance": "Performance cookies",
      "Cookies essenciais": "Essential cookies",
      "Cookies que usamos": "Cookies we use",
      "Cookies são pequenos arquivos de texto armazenados no seu dispositivo quando você visita um site. Eles ajudam o site a lembrar suas preferências, melhorar a navegação e gerar dados estatísticos.": "Cookies are small text files stored on your device when you visit a website. They help the site remember your preferences, improve browsing and generate statistical data.",
      "Coquetel cítrico servido em copo baixo": "Citrus cocktail served in a rocks glass",
      "Coquetel dourado sob luz lateral": "Golden cocktail under side light",
      "Coquetel em copo baixo com gelo translúcido": "Cocktail in a rocks glass with translucent ice",
      "Coquetelaria autoral": "Signature cocktails",
      "Coquetelaria autoral para casamentos, eventos corporativos e festas exclusivas.": "Signature cocktails for weddings, corporate events and exclusive parties.",
      "Coquetelaria autoral para eventos inesquecíveis.": "Signature cocktails for unforgettable events.",
      "Coquetelaria autoral, atendimento impecável e mixologia premium para celebrações que merecem mais do que bebidas.": "Signature cocktails, impeccable service and premium mixology for celebrations that deserve more than drinks.",
      "coquetelaria autoral.": "signature cocktails.",
      "Coquetelaria para casamentos — The Bar": "Wedding cocktail service — The Bar",
      "Coquetelaria para Eventos": "Cocktails for Events",
      "Coquetelaria para eventos corporativos — The Bar": "Corporate event cocktail service — The Bar",
      "Coquetelaria para festas exclusivas — The Bar": "Exclusive party cocktail service — The Bar",
      "Corporativo": "Corporate",
      "Corporativos": "Corporate",
      "da carta.": "the menu.",
      "Da recepção ao último brinde, desenhamos uma experiência líquida precisa, elegante e feita para o ritmo de cada celebração.": "From reception to the final toast, we design a precise, elegant liquid experience made for the rhythm of each celebration.",
      "da sua vida.": "of your life.",
      "Data prevista": "Expected date",
      "De assinatura": "Signature",
      "Depoimento ilustrativo · aniversário": "Illustrative testimonial · birthday",
      "Depoimento ilustrativo · casamento": "Illustrative testimonial · wedding",
      "Depoimento ilustrativo · confraternização": "Illustrative testimonial · company celebration",
      "Depoimento ilustrativo · evento corporativo": "Illustrative testimonial · corporate event",
      "Depoimento ilustrativo · festa exclusiva": "Illustrative testimonial · exclusive party",
      "Depoimento ilustrativo · recepção privada": "Illustrative testimonial · private reception",
      "Depoimentos de clientes": "Client testimonials",
      "Discrição": "Discretion",
      "dizem": "say",
      "Do bem-vindo ao último drink da pista, orquestramos cada momento líquido do seu casamento.": "From the welcome drink to the last cocktail on the dance floor, we orchestrate every liquid moment of your wedding.",
      "Do primeiro contato ao encerramento, tudo foi organizado com cuidado. O balcão ficou sofisticado e a carta de coquetéis elevou o clima do evento.": "From first contact to closing, everything was carefully organized. The bar looked sophisticated and the cocktail menu elevated the event's atmosphere.",
      "“Do primeiro contato ao encerramento, tudo foi organizado com cuidado. O balcão ficou sofisticado e a carta de coquetéis elevou o clima do evento.”": "“From first contact to closing, everything was carefully organized. The bar looked sophisticated and the cocktail menu elevated the event's atmosphere.”",
      "Documento legal": "Legal document",
      "Drink âmbar com gelo cristalino e casca cítrica": "Amber cocktail with clear ice and citrus peel",
      "Drinks autorais": "Signature drinks",
      "Drinks com a identidade visual da sua marca": "Drinks with your brand's visual identity",
      "Drinks especiais": "Special drinks",
      "Drinks servidos": "Drinks served",
      "Dúvidas frequentes": "Frequently asked questions",
      "Dúvidas sobre estes Termos podem ser enviadas para contato@thebar.br.": "Questions about these Terms may be sent to contato@thebar.br.",
      "Em até 24h, você recebe nossa resposta.": "You will receive our reply within 24h.",
      "Em caso de dúvidas sobre o tratamento dos seus dados, fale com nosso encarregado em privacidade@thebar.br.": "If you have questions about how your data is processed, contact our data protection officer at privacidade@thebar.br.",
      "Email": "Email",
      "Email: contato@thebar.br": "Email: contato@thebar.br",
      "Empresa": "Company",
      "Enviar e reservar conversa": "Send and schedule a conversation",
      "Equipe discreta e precisa, atenta do primeiro serviço ao último brinde.": "A discreet, precise team attentive from the first service to the last toast.",
      "Equipe extremamente preparada, pontual e discreta. A carta autoral trouxe presença para o evento sem pesar na operação. Serviço de altíssimo padrão.": "An extremely prepared, punctual and discreet team. The signature menu brought presence to the event without weighing down the operation. Very high-standard service.",
      "“Equipe extremamente preparada, pontual e discreta. A carta autoral trouxe presença para o evento sem pesar na operação. Serviço de altíssimo padrão.”": "“An extremely prepared, punctual and discreet team. The signature menu brought presence to the event without weighing down the operation. Very high-standard service.”",
      "Equipe uniformizada, treinada e invisível quando precisa ser.": "A uniformed, trained team that is invisible when it needs to be.",
      "Estações temáticas de gin, espumantes e clássicos": "Themed gin, sparkling wine and classic cocktail stations",
      "Estrutura adaptável a escritórios, hotéis e espaços": "Structure adaptable to offices, hotels and venues",
      "Estrutura premium": "Premium structure",
      "Evento corporativo": "Corporate event",
      "Evento corporativo com drinks alinhados à identidade visual da marca.": "Corporate event with drinks aligned to the brand's visual identity.",
      "Eventos à altura": "Events made to measure",
      "Eventos à altura do inesquecível": "Events worthy of the unforgettable",
      "Eventos corporativos": "Corporate events",
      "Eventos que tivemos": "Events we had",
      "Eventos realizados": "Events delivered",
      "Eventos recentes": "Recent events",
      "Excelência": "Excellence",
      "Existe taxa de reserva?": "Is there a booking fee?",
      "Experiência privada com consultoria de menu e atendimento residencial.": "Private experience with menu consulting and residential service.",
      "Experiências": "Experiences",
      "Experiências premium": "Premium experiences",
      "Experiências sob medida para festas privadas, aniversários marcantes e jantares íntimos.": "Tailored experiences for private parties, milestone birthdays and intimate dinners.",
      "Experiências sob medida para quem entende que os melhores momentos pedem o melhor.": "Tailored experiences for those who understand that the best moments ask for the best.",
      "Falar com a The Bar no WhatsApp": "Talk to The Bar on WhatsApp",
      "Falar conosco": "Contact us",
      "Falar no WhatsApp": "Talk on WhatsApp",
      "Fale com a gente diretamente. Respondemos em até 24h.": "Talk to us directly. We reply within 24h.",
      "Fale sem intermediários.": "Speak without middlemen.",
      "FAQ": "FAQ",
      "Fechar portfólio": "Close portfolio",
      "Festa exclusiva / aniversário": "Exclusive party / birthday",
      "Festa privada": "Private party",
      "Festa privada com destilados premium e coquetéis de assinatura.": "Private party with premium spirits and signature cocktails.",
      "Festas exclusivas": "Exclusive parties",
      "Festas privadas": "Private parties",
      "Fica eleito o foro da Comarca de São Paulo/SP para dirimir quaisquer questões oriundas destes Termos, com renúncia expressa a qualquer outro.": "The courts of Sao Paulo/SP are elected to resolve any matters arising from these Terms, with express waiver of any other jurisdiction.",
      "Filtrar portfólio": "Filter portfolio",
      "Google": "Google",
      "Home": "Home",
      "Imagem anterior": "Previous image",
      "Inclui": "Includes",
      "Informe um email válido.": "Enter a valid email.",
      "Informe um WhatsApp válido.": "Enter a valid WhatsApp number.",
      "Instagram @thebar.br": "Instagram @thebar.br",
      "Instagram: @thebar.br": "Instagram: @thebar.br",
      "Insumos importados, cristais de qualidade e bartenders certificados.": "Imported ingredients, quality glassware and certified bartenders.",
      "Jantar Executivo": "Executive Dinner",
      "Lançamento de marca": "Brand launch",
      "Lançamento Jardins": "Jardins Launch",
      "Lançamentos, confraternizações e jantares executivos, com o calibre que a sua marca merece.": "Launches, company celebrations and executive dinners with the caliber your brand deserves.",
      "Lançamentos, confraternizações, jantares executivos. Onde sua marca brinda, a The Bar entrega o calibre.": "Launches, company celebrations, executive dinners. Wherever your brand toasts, The Bar delivers caliber.",
      "Links legais": "Legal links",
      "Logística e estrutura": "Logistics and structure",
      "Logo The Bar em dourado centralizada sobre fundo preto com gradiente leve": "The Bar gold logo centered on a black background with a subtle gradient",
      "Mantemos os dados pelo tempo necessário ao cumprimento das finalidades para as quais foram coletados, ou pelo prazo exigido por lei.": "We keep data for the time necessary to fulfill the purposes for which it was collected, or for the period required by law.",
      "Mão de bartender preparando um coquetel com casca cítrica": "Bartender's hand preparing a cocktail with citrus peel",
      "Menu mobile": "Mobile menu",
      "Mixologia autoral": "Signature mixology",
      "Mixologia de luxo": "Luxury mixology",
      "Mixologia molecular sob demanda": "Molecular mixology on demand",
      "Mixologia premium para marcas, lançamentos, confraternizações e jantares executivos.": "Premium mixology for brands, launches, company celebrations and executive dinners.",
      "Mocktails sofisticados para não-bebedores": "Sophisticated mocktails for non-drinkers",
      "Modelo visual para avaliações reais do Google": "Visual model for real Google reviews",
      "Não servimos apenas drinks.": "We do not simply serve drinks.",
      "Não vendemos seus dados. Podemos compartilhá-los apenas com prestadores de serviço técnicos sob acordo de confidencialidade ou autoridades públicas mediante requisição legal.": "We do not sell your data. We may share it only with technical service providers under confidentiality agreements or public authorities upon legal request.",
      "Nascemos da convicção de que um drink bem-feito é a forma mais elegante de marcar um momento. Desde então, transformamos celebrações em capítulos.": "We were born from the conviction that a well-made drink is the most elegant way to mark a moment. Since then, we have turned celebrations into chapters.",
      "Navegação": "Navigation",
      "Navegação do rodapé": "Footer navigation",
      "Navegação principal": "Main navigation",
      "Noite Itaim": "Itaim Night",
      "Nossa filosofia": "Our philosophy",
      "Nossas especialidades": "Our specialties",
      "Nota 5 de 5": "5 out of 5 rating",
      "Notas fiscais e contratos formais": "Invoices and formal contracts",
      "Número estimado de convidados": "Estimated number of guests",
      "O bar ficou impecável, com atendimento elegante e drinks que combinaram perfeitamente com a proposta da festa. Foi um dos pontos mais elogiados pelos convidados.": "The bar looked impeccable, with elegant service and drinks that matched the party perfectly. It was one of the most praised parts of the event.",
      "“O bar ficou impecável, com atendimento elegante e drinks que combinaram perfeitamente com a proposta da festa. Foi um dos pontos mais elogiados pelos convidados.”": "“The bar looked impeccable, with elegant service and drinks that matched the party perfectly. It was one of the most praised parts of the event.”",
      "O brinde do dia mais importante da vida, à altura do amor que vocês celebram.": "The toast for life's most important day, worthy of the love you celebrate.",
      "O brinde mais importante": "The most important toast",
      "O brinde mais importante da sua vida, com carta autoral, bar premium e operação impecável.": "The most important toast of your life, with a signature menu, premium bar and impeccable operation.",
      "O caminho saiu": "The path left",
      "O conteúdo do site é destinado exclusivamente à informação sobre nossos serviços e à abertura de canal de contato. É vedado o uso do site para fins ilícitos, comerciais não autorizados, ou para extração automatizada de dados.": "The website content is intended exclusively to provide information about our services and open a contact channel. Using the site for illegal purposes, unauthorized commercial purposes or automated data extraction is prohibited.",
      "O luxo está no cuidado.": "Luxury lives in care.",
      "O padrão é de 5 a 6 horas de operação. Horas adicionais podem ser contratadas conforme a necessidade do evento.": "The standard service runs 5 to 6 hours. Additional hours can be contracted according to the event's needs.",
      "O que nos move": "What moves us",
      "O que nossos clientes": "What our clients",
      "O que são cookies": "What cookies are",
      "O serviço encontra a arte.": "service meets art.",
      "O serviço foi discreto, preciso e muito bonito visualmente. Parecia parte da decoração, mas com a energia de uma experiência feita ao vivo.": "The service was discreet, precise and visually beautiful. It felt like part of the decor, but with the energy of a live experience.",
      "“O serviço foi discreto, preciso e muito bonito visualmente. Parecia parte da decoração, mas com a energia de uma experiência feita ao vivo.”": "“The service was discreet, precise and visually beautiful. It felt like part of the decor, but with the energy of a live experience.”",
      "o seu evento.": "your event.",
      "O testemunho está nas taças.": "The proof is in the glasses.",
      "Onde cada taça": "Where every glass",
      "Open bar com curadoria premium": "Open bar with premium curation",
      "Outro": "Other",
      "Outros canais": "Other channels",
      "Página não encontrada": "Page not found",
      "Página não encontrada — The Bar": "Page not found — The Bar",
      "para cada celebração.": "for every celebration.",
      "Perguntas frequentes — The Bar": "Frequently Asked Questions — The Bar",
      "Personalização": "Customization",
      "Personalizar": "Customize",
      "Podemos atualizar esta política periodicamente. A versão vigente estará sempre disponível nesta página.": "We may update this policy periodically. The current version will always be available on this page.",
      "Política de cookies": "Cookie Policy",
      "Política de cookies — The Bar": "Cookie Policy — The Bar",
      "Política de privacidade": "Privacy Policy",
      "Política de privacidade — The Bar": "Privacy Policy — The Bar",
      "Pontualidade": "Punctuality",
      "Portfólio": "Portfolio",
      "Portfólio — Eventos The Bar": "Portfolio — The Bar Events",
      "Posso cancelar ou remarcar?": "Can I cancel or reschedule?",
      "Posso pedir drinks específicos?": "Can I request specific drinks?",
      "Preencha o formulário ou fale direto no WhatsApp. Em até 24 horas, retornamos com uma proposta autoral pensada para você.": "Fill out the form or message us directly on WhatsApp. Within 24 hours, we will return with a custom proposal designed for you.",
      "Presença exata. Cuidado profundo.": "Exact presence. Deep care.",
      "Próxima imagem": "Next image",
      "Pular para o conteúdo": "Skip to content",
      "Quais tipos de evento a The Bar atende?": "What types of events does The Bar serve?",
      "Quanto tempo dura o serviço?": "How long does the service last?",
      "Quantos bartenders são incluídos?": "How many bartenders are included?",
      "Quatro gestos de assinatura": "Four signature gestures",
      "que sua marca merece.": "your brand deserves.",
      "Recebemos.": "Received.",
      "Receitas criadas para traduzir o estilo e o ritmo do seu evento.": "Recipes created to translate your event's style and rhythm.",
      "Receitas exclusivas criadas para o seu evento.": "Exclusive recipes created for your event.",
      "Recepção de diretoria com clássicos reinterpretados e serviço compacto.": "Executive reception with reinterpreted classics and compact service.",
      "Recomendamos reservar com 60 a 90 dias de antecedência para garantir disponibilidade, especialmente entre setembro e dezembro. Reservas de última hora são analisadas conforme agenda.": "We recommend booking 60 to 90 days in advance to guarantee availability, especially between September and December. Last-minute bookings are evaluated according to our schedule.",
      "Recusar opcionais": "Decline optional",
      "Reservamo-nos o direito de modificar estes Termos a qualquer momento. As alterações entram em vigor a partir da publicação no site.": "We reserve the right to modify these Terms at any time. Changes take effect upon publication on the website.",
      "Reservar experiência privada": "Reserve a private experience",
      "Reservar minha data": "Reserve my date",
      "Reserve sua data": "Reserve your date",
      "Reservas e contratação": "Bookings and contracting",
      "Reserve sua data e descubra como a coquetelaria autoral pode transformar a sua celebração.": "Reserve your date and discover how signature cocktails can transform your celebration.",
      "Reunimos as perguntas mais comuns. Se a sua não estiver aqui, fale com a gente.": "We gathered the most common questions. If yours is not here, talk to us.",
      "Rituais memoráveis": "Memorable rituals",
      "Role para descobrir": "Scroll to discover",
      "Saiba mais na nossa Política de Cookies.": "Learn more in our Cookie Policy.",
      "Salvar preferências": "Save preferences",
      "São Paulo · Atendemos todo o Brasil": "Sao Paulo · We serve all of Brazil",
      "Selecione": "Select",
      "Sempre. Nossa carta inclui opções autorais sem álcool tão sofisticadas quanto as alcoólicas.": "Always. Our menu includes non-alcoholic signature options as sophisticated as the alcoholic ones.",
      "Serviços": "Services",
      "Serviços — The Bar": "Services — The Bar",
      "Serviço impecável": "Impeccable service",
      "Servimos com presença suficiente para encantar e ausência suficiente para não interromper.": "We serve with enough presence to enchant and enough absence not to interrupt.",
      "Seu evento começa aqui.": "Your event starts here.",
      "Seu nome": "Your name",
      "Seus dados são armazenados em servidores seguros, com criptografia em trânsito e em repouso. Adotamos medidas técnicas e administrativas para protegê-los.": "Your data is stored on secure servers, with encryption in transit and at rest. We adopt technical and administrative measures to protect it.",
      "Sim, conforme as condições descritas em contrato. Para cancelamentos com mais de 60 dias de antecedência, há reembolso parcial.": "Yes, according to the conditions described in the contract. For cancellations more than 60 days in advance, there is a partial refund.",
      "Sim. A reserva da data é confirmada mediante pagamento de sinal de 30% do valor total. O restante é pago em até 15 dias antes do evento.": "Yes. The date reservation is confirmed upon payment of a 30% deposit of the total amount. The remainder is paid up to 15 days before the event.",
      "Sim. Adaptamos receitas e xaropes conforme as restrições do anfitrião e dos convidados.": "Yes. We adapt recipes and syrups according to the host's and guests' restrictions.",
      "Sim. Atendemos todo o Brasil. Para eventos fora da Grande São Paulo, há custos adicionais de deslocamento e hospedagem da equipe, calculados na proposta.": "Yes. We serve all of Brazil. For events outside Greater Sao Paulo, additional travel and lodging costs for the team are calculated in the proposal.",
      "Sim. Trabalhamos com bares próprios em diversos estilos e cuidamos do transporte, montagem e desmontagem.": "Yes. We work with our own bars in several styles and handle transport, assembly and disassembly.",
      "sob medida.": "tailored.",
      "Sobre": "About",
      "Sobre os serviços": "About the services",
      "Sobre The Bar — A casa por trás das taças": "About The Bar — The house behind the glasses",
      "Sofisticação": "Sophistication",
      "Sofisticação que reflete o calibre da sua marca e impressiona convidados exigentes.": "Sophistication that reflects your brand's caliber and impresses demanding guests.",
      "Solicitar proposta corporativa": "Request a corporate proposal",
      "Solicitar proposta para casamento": "Request a wedding proposal",
      "Sua dúvida não está aqui?": "Is your question not here?",
      "Sua experiência, sua escolha.": "Your experience, your choice.",
      "Taças e mesa elegante sob iluminação quente": "Glasses and elegant table under warm lighting",
      "Termos de uso": "Terms of Use",
      "Termos de uso — The Bar": "Terms of Use — The Bar",
      "Termos e condições de uso do site e dos serviços da The Bar.": "Terms and conditions for use of The Bar website and services.",
      "The Bar — Coquetelaria de Luxo para Eventos": "The Bar — Luxury Cocktail Service for Events",
      "The Bar, coquetelaria para eventos": "The Bar, cocktail service for events",
      "The Bar, página inicial": "The Bar, home page",
      "Tipo de evento": "Event type",
      "Todo o conteúdo do site, incluindo textos, imagens, vídeos, marca, logotipo e identidade visual, é de propriedade da The Bar e está protegido pelas leis de direitos autorais e propriedade industrial vigentes no Brasil.": "All website content, including text, images, videos, brand, logo and visual identity, is owned by The Bar and protected by copyright and industrial property laws in force in Brazil.",
      "Todos": "All",
      "Trabalhamos nos dois formatos. Podemos cuidar de toda a curadoria e fornecimento dos insumos premium ou operar apenas com o serviço de bartender, conforme o que fizer mais sentido para o seu evento.": "We work in both formats. We can handle the full curation and supply of premium ingredients or operate only the bartender service, depending on what makes the most sense for your event.",
      "Tratamos os seus dados com base nas hipóteses legais previstas na LGPD: consentimento, execução de contrato, cumprimento de obrigação legal e legítimo interesse.": "We process your data based on the legal grounds provided by Brazil's data protection law: consent, contract execution, compliance with legal obligation and legitimate interest.",
      "Tudo o que você precisa saber antes de reservar a sua data.": "Everything you need to know before reserving your date.",
      "Última atualização: 29 de abril de 2026": "Last updated: April 29, 2026",
      "Um recorte de celebrações onde a coquetelaria ocupou seu lugar com precisão: presente no sabor, discreta no gesto.": "A selection of celebrations where cocktail service took its place with precision: present in flavor, discreet in gesture.",
      "Uma arquitetura líquida": "A liquid architecture",
      "Uma seleção de celebrações onde o bar foi mais do que apoio. Foi parte da memória.": "A selection of celebrations where the bar was more than support. It was part of the memory.",
      "Uma seleção dos eventos que tivemos a honra de assinar.": "A selection of events we had the honor to sign.",
      "Usamos cookies para entender como você usa nosso site e melhorar a sua navegação. Você decide.": "We use cookies to understand how you use our site and improve your browsing. You decide.",
      "Usamos seus dados para responder solicitações, elaborar propostas comerciais, executar contratos, enviar comunicações relacionadas ao evento, melhorar a experiência no site e cumprir obrigações legais.": "We use your data to respond to requests, prepare commercial proposals, execute contracts, send event-related communications, improve the website experience and comply with legal obligations.",
      "Utilizamos cookies essenciais, necessários ao funcionamento do site; cookies de performance, para medir como o site é usado; e cookies de marketing, para mensurar campanhas.": "We use essential cookies required for the website to work; performance cookies to measure how the site is used; and marketing cookies to measure campaigns.",
      "Utilizamos cookies para melhorar a navegação e medir o desempenho do site. Você pode gerenciar suas preferências a qualquer momento.": "We use cookies to improve browsing and measure website performance. You can manage your preferences at any time.",
      "Vamos brindar juntos": "Let us toast together",
      "Ver mais avaliações": "See more reviews",
      "Ver mais avaliações da The Bar no Google": "See more The Bar reviews on Google",
      "Ver portfólio completo": "View full portfolio",
      "Ver serviço": "View service",
      "Você pode aceitar, recusar ou personalizar suas preferências pelo banner de cookies no primeiro acesso ou a qualquer momento clicando em Configurar cookies no rodapé.": "You can accept, decline or customize your preferences through the cookie banner on your first visit or at any time by clicking Cookie settings in the footer.",
      "Vocês fornecem as bebidas ou o cliente compra?": "Do you provide the beverages or does the client buy them?",
      "Vocês oferecem opções não alcoólicas?": "Do you offer non-alcoholic options?",
      "Vocês trazem o bar?": "Do you bring the bar?",
      "Voltar ao início": "Back to home",
      "Welcome drink autoral assinado para o casal": "Signature welcome drink created for the couple",
      "WhatsApp": "WhatsApp",
      "WhatsApp +55 11 95941-5764": "WhatsApp +55 11 95941-5764",
      "WhatsApp: +55 11 95941-5764": "WhatsApp: +55 11 95941-5764",
      "[Razão Social] · CNPJ [número] · atua como controladora dos dados pessoais coletados por meio do site thebar.br. Encarregado de Proteção de Dados: [nome] · privacidade@thebar.br.": "[Legal Name] · CNPJ [number] · acts as controller of the personal data collected through the thebar.br website. Data Protection Officer: [name] · privacidade@thebar.br.",
      "a honra de assinar.": "the honor to sign.",
      "bartender corporativo, coquetelaria corporativa, bar para eventos empresariais": "corporate bartender, corporate cocktail service, bar for business events",
      "bartender para casamento, bar para casamento, open bar casamento": "wedding bartender, wedding bar, wedding open bar",
      "bartender para casamento, coquetelaria para eventos, bar para festa, mixologia premium, bartender corporativo São Paulo": "wedding bartender, event cocktail service, party bar, premium mixology, corporate bartender Sao Paulo",
      "bartender para festa, coquetelaria para aniversário, festas privadas": "party bartender, birthday cocktail service, private parties",
      "contato The Bar, orçamento bartender, reservar bartender": "The Bar contact, bartender quote, reserve bartender",
      "dúvidas bartender, orçamento coquetelaria, contratar bartender": "bartender questions, cocktail service quote, hire bartender",
      "imagem": "image",
      "política de cookies The Bar": "The Bar cookie policy",
      "política de privacidade The Bar, LGPD": "The Bar privacy policy, LGPD",
      "portfolio The Bar, eventos premium, coquetelaria de luxo": "The Bar portfolio, premium events, luxury cocktail service",
      "serviços de bartender, coquetelaria para eventos, open bar premium": "bartender services, cocktail service for events, premium open bar",
      "sobre The Bar, coquetelaria autoral, mixologia premium": "about The Bar, signature cocktails, premium mixology",
      "termos de uso The Bar": "The Bar terms of use"
    }
  };

  function normalizeText(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }

  function translateText(value, language = preferences.language) {
    const normalized = normalizeText(value);
    if (!normalized || language === "pt") return value;
    return translations[language]?.[normalized] || value;
  }

  function applyTheme(theme, options = {}) {
    const nextTheme = theme === "light" ? "light" : "dark";
    preferences.theme = nextTheme;
    document.documentElement.dataset.theme = nextTheme;
    document.querySelector('meta[name="theme-color"]')?.setAttribute("content", nextTheme === "light" ? "#fff8ec" : "#0A0A0A");
    if (options.persist !== false) preferenceStorage.set(themeKey, nextTheme);
    updatePreferenceControls();
  }

  function translateTextNode(node, language) {
    if (!originalTextNodes.has(node)) originalTextNodes.set(node, node.nodeValue);
    const original = originalTextNodes.get(node);
    const key = normalizeText(original);
    if (!key) return;
    if (language === "pt") {
      node.nodeValue = original;
      return;
    }

    const translated = translateText(key, language);
    if (translated === key) return;
    const leading = original.match(/^\s*/)?.[0] || "";
    const trailing = original.match(/\s*$/)?.[0] || "";
    node.nodeValue = `${leading}${translated}${trailing}`;
  }

  function translateElementAttributes(element, language) {
    if (element.closest?.(".floating-preferences")) return;

    translatableAttributes.forEach((attribute) => {
      if (!element.hasAttribute(attribute)) return;
      let elementAttributes = originalAttributes.get(element);
      if (!elementAttributes) {
        elementAttributes = new Map();
        originalAttributes.set(element, elementAttributes);
      }
      if (!elementAttributes.has(attribute)) elementAttributes.set(attribute, element.getAttribute(attribute));

      const original = elementAttributes.get(attribute);
      element.setAttribute(attribute, language === "pt" ? original : translateText(original, language));
    });
  }

  function getOriginalAttribute(element, attribute) {
    return originalAttributes.get(element)?.get(attribute) || element.getAttribute(attribute) || "";
  }

  function translateBody(language) {
    const walker = document.createTreeWalker(
      body,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode(node) {
          const parent = node.parentElement;
          if (!parent || parent.closest("script, style, svg, noscript, .floating-preferences")) return NodeFilter.FILTER_REJECT;
          return normalizeText(node.nodeValue) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT;
        }
      }
    );

    const nodes = [];
    while (walker.nextNode()) nodes.push(walker.currentNode);
    nodes.forEach((node) => translateTextNode(node, language));

    document.querySelectorAll("*").forEach((element) => translateElementAttributes(element, language));
  }

  function translateHead(language) {
    document.title = language === "pt" ? originalTitle : translateText(originalTitle, language);

    document.querySelectorAll("meta[content]").forEach((meta) => {
      const property = meta.getAttribute("property") || "";
      const name = meta.getAttribute("name") || "";
      const shouldTranslate = /^(description|keywords|twitter:image:alt)$/i.test(name) || /^og:(title|description|image:alt)$/i.test(property);
      if (!shouldTranslate) return;
      if (!originalMetaContent.has(meta)) originalMetaContent.set(meta, meta.getAttribute("content"));
      const original = originalMetaContent.get(meta);
      meta.setAttribute("content", language === "pt" ? original : translateText(original, language));
    });
  }

  function updateWhatsAppLinks(language) {
    const message = language === "en"
      ? "Hello, I came from the website and would like to know more"
      : "Olá, vim do site e gostaria de saber mais";

    document.querySelectorAll('a[href*="wa.me/5511959415764"]').forEach((link) => {
      link.href = `https://wa.me/5511959415764?text=${encodeURIComponent(message)}`;
    });
  }

  function updateGeneratedErrors(language) {
    document.querySelectorAll("[data-error-key]").forEach((slot) => {
      slot.textContent = translateText(slot.dataset.errorKey, language);
    });
  }

  function updateDynamicI18nText(language) {
    document.querySelectorAll("[data-i18n-original-text]").forEach((element) => {
      element.textContent = translateText(element.dataset.i18nOriginalText, language);
    });
  }

  function updateFloatingPreferencesOffset() {
    const controls = document.querySelector(".floating-preferences");
    const banner = document.querySelector("#cookie-banner");
    if (!controls) return;

    const bannerVisible = banner && !banner.hidden && getComputedStyle(banner).display !== "none";
    if (!bannerVisible) {
      controls.style.removeProperty("--floating-preferences-bottom");
      return;
    }

    const bannerHeight = Math.ceil(banner.getBoundingClientRect().height);
    controls.style.setProperty("--floating-preferences-bottom", `${bannerHeight + 14}px`);
  }

  function applyLanguage(language, options = {}) {
    const nextLanguage = language === "en" ? "en" : "pt";
    preferences.language = nextLanguage;
    document.documentElement.lang = nextLanguage === "en" ? "en" : "pt-BR";
    document.documentElement.dataset.language = nextLanguage;
    translateHead(nextLanguage);
    translateBody(nextLanguage);
    updateDynamicI18nText(nextLanguage);
    updateWhatsAppLinks(nextLanguage);
    updateGeneratedErrors(nextLanguage);
    if (options.persist !== false) preferenceStorage.set(languageKey, nextLanguage);
    updatePreferenceControls();
    updateFloatingPreferencesOffset();
  }

  function updatePreferenceControls() {
    const controls = document.querySelector(".floating-preferences");
    if (!controls) return;

    const copy = uiCopy[preferences.language];
    controls.setAttribute("aria-label", copy.controls);
    const languageGroup = controls.querySelector(".language-switcher");
    languageGroup?.setAttribute("aria-label", copy.language);

    controls.querySelectorAll("[data-language-option]").forEach((button) => {
      const active = button.dataset.languageOption === preferences.language;
      button.classList.toggle("is-active", active);
      button.setAttribute("aria-pressed", String(active));
      button.setAttribute("aria-label", button.dataset.languageOption === "pt" ? copy.portuguese : copy.english);
      button.setAttribute("title", button.dataset.languageOption === "pt" ? copy.portuguese : copy.english);
    });

    const themeButton = controls.querySelector("[data-theme-toggle]");
    if (!themeButton) return;
    const targetTheme = preferences.theme === "light" ? "dark" : "light";
    themeButton.dataset.themeState = preferences.theme;
    themeButton.setAttribute("aria-label", copy[targetTheme]);
    themeButton.setAttribute("title", copy[targetTheme]);
    themeButton.innerHTML = preferences.theme === "light"
      ? '<svg class="preference-icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M21 14.2A7.8 7.8 0 0 1 9.8 3 9 9 0 1 0 21 14.2Z"/></svg>'
      : '<svg class="preference-icon" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2.2M12 19.8V22M4.2 4.2l1.6 1.6M18.2 18.2l1.6 1.6M2 12h2.2M19.8 12H22M4.2 19.8l1.6-1.6M18.2 5.8l1.6-1.6"/></svg>';
  }

  function createPreferenceControls() {
    if (document.querySelector(".floating-preferences")) return;

    const controls = document.createElement("div");
    controls.className = "floating-preferences";
    controls.innerHTML = `
      <div class="language-switcher" role="group">
        <button class="language-option" type="button" data-language-option="pt">PT</button>
        <button class="language-option" type="button" data-language-option="en">EN</button>
      </div>
      <button class="theme-toggle" type="button" data-theme-toggle></button>
    `;

    controls.querySelectorAll("[data-language-option]").forEach((button) => {
      button.addEventListener("click", () => applyLanguage(button.dataset.languageOption));
    });

    controls.querySelector("[data-theme-toggle]")?.addEventListener("click", () => {
      applyTheme(preferences.theme === "light" ? "dark" : "light");
    });

    body.appendChild(controls);
    updatePreferenceControls();
  }

  document.querySelectorAll(".whatsapp-float").forEach((link) => {
    if (!link.dataset.tooltip) link.dataset.tooltip = "Reserve sua data";
  });

  applyTheme(preferences.theme, { persist: false });
  createPreferenceControls();
  applyLanguage(preferences.language, { persist: false });

  if (loader) {
    let startedAt = Date.now();
    const loaderVideo = loader.querySelector(".loader-video");
    const loaderMinimum = 2450;
    const loaderVideoGrace = 1200;
    let loaderHidden = false;
    let pageReady = document.readyState === "complete";
    let videoReady = !loaderVideo || loaderVideo.readyState >= 2;
    let videoActivated = false;

    const revealLoaderVideo = () => {
      if (videoActivated) return;
      videoActivated = true;
      videoReady = true;
      startedAt = Date.now();
      loader.classList.add("is-video-active");
      hideLoader();
    };

    const markVideoReady = () => {
      if (!loaderVideo || videoActivated) return;

      if (typeof loaderVideo.requestVideoFrameCallback === "function") {
        loaderVideo.requestVideoFrameCallback(() => revealLoaderVideo());
        return;
      }

      window.requestAnimationFrame(revealLoaderVideo);
    };

    const primeLoaderPlayback = () => {
      if (!loaderVideo) return;

      try {
        if (Number.isFinite(loaderVideo.duration) && loaderVideo.duration > 0.45 && loaderVideo.currentTime < 0.06) {
          loaderVideo.currentTime = 0.08;
        }
      } catch {
        // Seeking is not available until metadata is ready in some browsers.
      }

      const playback = loaderVideo.play?.();
      if (playback && typeof playback.catch === "function") playback.catch(() => {});
    };

    if (!loaderVideo) {
      loader.classList.add("is-video-active");
    }

    if (loaderVideo) {
      loaderVideo.removeAttribute("poster");
      loaderVideo.muted = true;
      loaderVideo.setAttribute("muted", "");
      loaderVideo.playsInline = true;
      loaderVideo.preload = "auto";

      loaderVideo.addEventListener("loadedmetadata", primeLoaderPlayback, { once: true });
      loaderVideo.addEventListener("loadeddata", markVideoReady, { once: true });
      loaderVideo.addEventListener("canplay", markVideoReady, { once: true });
      loaderVideo.addEventListener("playing", markVideoReady, { once: true });
      loaderVideo.addEventListener("timeupdate", markVideoReady, { once: true });

      primeLoaderPlayback();
      if (videoReady) markVideoReady();
    }

    const hideLoader = () => {
      if (loaderHidden) return;
      const elapsed = Date.now() - startedAt;
      if (!pageReady) return;
      if (!videoReady && elapsed < loaderVideoGrace) return;

      loaderHidden = true;
      const delay = Math.max(0, loaderMinimum - elapsed);

      window.setTimeout(() => {
        loader.classList.add("is-hidden");
        document.documentElement.classList.remove("is-loading");
        window.setTimeout(() => loader.remove(), 900);
      }, delay);
    };

    const forceLoaderReady = () => {
      pageReady = true;
      if (loaderVideo && !videoActivated) {
        videoReady = true;
        loader.classList.add("is-video-active");
      }
      hideLoader();
    };

    window.setTimeout(forceLoaderReady, 4200);

    if (document.readyState === "complete") {
      hideLoader();
    } else {
      window.addEventListener("load", () => {
        pageReady = true;
        hideLoader();
      }, { once: true });
    }
  } else {
    document.documentElement.classList.remove("is-loading");
  }

  if (siteHeader) {
    const updateHeaderState = () => {
      siteHeader.classList.toggle("is-scrolled", window.scrollY > 16);
    };

    updateHeaderState();
    window.addEventListener("scroll", updateHeaderState, { passive: true });
  }

  const floatingScrollbar = document.createElement("div");
  const floatingScrollbarThumb = document.createElement("span");
  let scrollbarTimer;
  let scrollbarFrame = null;

  floatingScrollbar.className = "floating-scrollbar";
  floatingScrollbar.setAttribute("aria-hidden", "true");
  floatingScrollbar.appendChild(floatingScrollbarThumb);
  body.appendChild(floatingScrollbar);

  function updateFloatingScrollbar(show) {
    const doc = document.documentElement;
    const viewportHeight = window.innerHeight;
    const scrollHeight = Math.max(doc.scrollHeight, body.scrollHeight);
    const maxScroll = scrollHeight - viewportHeight;

    if (!show) floatingScrollbar.classList.remove("is-visible");

    if (maxScroll <= 1 || body.classList.contains("menu-open") || body.classList.contains("lightbox-open")) {
      floatingScrollbar.classList.remove("is-visible");
      return;
    }

    const trackHeight = Math.max(1, floatingScrollbar.clientHeight || viewportHeight - 28);
    const thumbHeight = Math.max(34, Math.round((viewportHeight / scrollHeight) * trackHeight));
    const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
    const travel = Math.max(0, trackHeight - thumbHeight);

    floatingScrollbarThumb.style.height = `${thumbHeight}px`;
    floatingScrollbarThumb.style.transform = `translate3d(0, ${Math.round(progress * travel)}px, 0)`;

    if (!show) return;
    floatingScrollbar.classList.add("is-visible");
    window.clearTimeout(scrollbarTimer);
    scrollbarTimer = window.setTimeout(() => floatingScrollbar.classList.remove("is-visible"), 720);
  }

  function requestScrollbarUpdate(show) {
    if (scrollbarFrame) window.cancelAnimationFrame(scrollbarFrame);
    scrollbarFrame = window.requestAnimationFrame(() => {
      scrollbarFrame = null;
      updateFloatingScrollbar(show);
    });
  }

  function hideFloatingScrollbar() {
    window.clearTimeout(scrollbarTimer);
    floatingScrollbar.classList.remove("is-visible");
  }

  requestScrollbarUpdate(false);
  window.addEventListener("scroll", () => requestScrollbarUpdate(true), { passive: true });
  window.addEventListener("resize", () => requestScrollbarUpdate(false));
  window.addEventListener("resize", updateFloatingPreferencesOffset);

  function closeMenu() {
    if (!menuToggle || !mobileOverlay) return;
    body.classList.remove("menu-open");
    hideFloatingScrollbar();
    menuToggle.setAttribute("aria-expanded", "false");
    mobileOverlay.setAttribute("aria-hidden", "true");
  }

  if (menuToggle && mobileOverlay) {
    menuToggle.addEventListener("click", () => {
      const open = !body.classList.contains("menu-open");
      body.classList.toggle("menu-open", open);
      if (open) hideFloatingScrollbar();
      menuToggle.setAttribute("aria-expanded", String(open));
      mobileOverlay.setAttribute("aria-hidden", String(!open));
    });

    mobileOverlay.addEventListener("click", (event) => {
      if (event.target.matches("a")) closeMenu();
    });
  }

  const currentPage = body.dataset.page || "/";
  document.querySelectorAll("[data-nav]").forEach((link) => {
    const target = link.dataset.nav;
    const active = target === currentPage || (target !== "/" && currentPage.startsWith(`${target}/`));
    link.classList.toggle("is-active", active);
  });

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  document.querySelectorAll("lord-icon[data-icon-loop]").forEach((icon) => {
    let timer = null;

    function stopTimer() {
      if (!timer) return;
      window.clearInterval(timer);
      timer = null;
    }

    function replay(player) {
      if (reducedMotion.matches) {
        stopTimer();
        player.stop?.();
        player.seekToStart?.();
        return;
      }

      player.loop = false;
      if (typeof player.playFromStart === "function") {
        player.playFromStart();
      } else {
        player.seekToStart?.();
        player.play?.();
      }
    }

    function startManualLoop() {
      const player = icon.playerInstance;
      if (!player) return;
      const interval = Math.max(1000, Number(icon.dataset.iconLoop) || 4000);

      stopTimer();
      player.loop = false;
      player.stop?.();
      player.seekToStart?.();
      replay(player);
      timer = window.setInterval(() => replay(player), interval);
    }

    if (icon.playerInstance?.ready) {
      startManualLoop();
    } else {
      icon.addEventListener("ready", startManualLoop, { once: true });
    }
  });

  const revealItems = [...document.querySelectorAll("[data-reveal]")];
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  const servicesCarousel = document.querySelector(".services-carousel");
  const serviceCards = servicesCarousel ? [...servicesCarousel.querySelectorAll(".service-card")] : [];

  if (servicesCarousel && serviceCards.length > 1) {
    const mobileCarousel = window.matchMedia("(max-width: 640px)");
    const carouselInterval = 4000;
    const carouselTransition = 720;
    let activeServiceIndex = 0;
    let carouselTimer = null;
    let shineTimer = null;
    let carouselVisible = !("IntersectionObserver" in window);
    let pointerDown = false;
    let pointerDragging = false;
    let pointerId = null;
    let pointerStartX = 0;
    let pointerStartY = 0;
    let suppressCarouselClick = false;

    function carouselEnabled() {
      return mobileCarousel.matches && !reducedMotion.matches;
    }

    function stopCarouselTimer() {
      if (!carouselTimer) return;
      window.clearInterval(carouselTimer);
      carouselTimer = null;
    }

    function clearCarouselShine() {
      window.clearTimeout(shineTimer);
      shineTimer = null;
      serviceCards.forEach((card) => card.classList.remove("is-shining"));
    }

    function setCarouselDragOffset(value) {
      const drag = Math.max(-120, Math.min(120, value));
      servicesCarousel.style.setProperty("--service-drag", `${Math.round(drag)}px`);
      servicesCarousel.style.setProperty("--service-drag-soft", `${Math.round(drag * 0.35)}px`);
    }

    function clearCarouselDragOffset() {
      servicesCarousel.style.removeProperty("--service-drag");
      servicesCarousel.style.removeProperty("--service-drag-soft");
    }

    function triggerCenteredCardShine(delay = carouselTransition) {
      clearCarouselShine();
      if (!carouselEnabled() || !carouselVisible) return;

      const activeCard = serviceCards[activeServiceIndex];
      shineTimer = window.setTimeout(() => {
        if (!carouselEnabled() || !carouselVisible || !activeCard.classList.contains("is-active")) return;
        activeCard.classList.remove("is-shining");
        activeCard.offsetWidth;
        activeCard.classList.add("is-shining");
      }, delay);
    }

    function setActiveServiceCard(index, options = {}) {
      const { shineDelay = carouselTransition, restart = true } = options;
      activeServiceIndex = (index + serviceCards.length) % serviceCards.length;
      const previousIndex = (activeServiceIndex - 1 + serviceCards.length) % serviceCards.length;
      const nextIndex = (activeServiceIndex + 1) % serviceCards.length;

      serviceCards.forEach((card, cardIndex) => {
        card.classList.toggle("is-active", cardIndex === activeServiceIndex);
        card.classList.toggle("is-prev", cardIndex === previousIndex);
        card.classList.toggle("is-next", cardIndex === nextIndex);
        card.classList.remove("is-shining");
      });

      clearCarouselDragOffset();
      triggerCenteredCardShine(shineDelay);

      if (restart) startCarouselTimer(true);
    }

    function startCarouselTimer(restart = false) {
      if (restart) stopCarouselTimer();
      if (carouselTimer || !carouselEnabled() || !carouselVisible || pointerDown) return;
      carouselTimer = window.setInterval(() => {
        setActiveServiceCard(activeServiceIndex + 1, { restart: false });
      }, carouselInterval);
    }

    function enableServiceCarousel() {
      servicesCarousel.classList.add("is-mobile-carousel");
      setActiveServiceCard(activeServiceIndex, { shineDelay: 180, restart: false });
      startCarouselTimer();
    }

    function disableServiceCarousel() {
      stopCarouselTimer();
      clearCarouselShine();
      clearCarouselDragOffset();
      servicesCarousel.classList.remove("is-mobile-carousel", "is-dragging");
      serviceCards.forEach((card) => {
        card.classList.remove("is-active", "is-prev", "is-next", "is-shining");
      });
    }

    function updateServiceCarouselMode() {
      if (carouselEnabled()) {
        enableServiceCarousel();
      } else {
        disableServiceCarousel();
      }
    }

    servicesCarousel.addEventListener("pointerdown", (event) => {
      if (!carouselEnabled()) return;
      if (event.pointerType === "mouse" && event.button !== 0) return;
      pointerDown = true;
      pointerDragging = false;
      pointerId = event.pointerId;
      pointerStartX = event.clientX;
      pointerStartY = event.clientY;
      stopCarouselTimer();
      clearCarouselShine();
      try {
        servicesCarousel.setPointerCapture?.(event.pointerId);
      } catch {
        // Some synthetic or older pointer implementations do not allow capture.
      }
    });

    servicesCarousel.addEventListener("pointermove", (event) => {
      if (!pointerDown || pointerId !== event.pointerId || !carouselEnabled()) return;
      const deltaX = event.clientX - pointerStartX;
      const deltaY = event.clientY - pointerStartY;

      if (!pointerDragging && Math.abs(deltaX) > 12 && Math.abs(deltaX) > Math.abs(deltaY) * 1.1) {
        pointerDragging = true;
        servicesCarousel.classList.add("is-dragging");
      }

      if (!pointerDragging) return;
      event.preventDefault();
      setCarouselDragOffset(deltaX);
    });

    function finishCarouselPointer(event, cancelled = false) {
      if (!pointerDown || pointerId !== event.pointerId) return;
      const deltaX = event.clientX - pointerStartX;
      const shouldMove = pointerDragging && !cancelled && Math.abs(deltaX) > 46;

      pointerDown = false;
      pointerDragging = false;
      pointerId = null;
      servicesCarousel.classList.remove("is-dragging");
      try {
        servicesCarousel.releasePointerCapture?.(event.pointerId);
      } catch {
        // The pointer may not have been captured if the browser rejected capture.
      }

      if (shouldMove) {
        suppressCarouselClick = true;
        setActiveServiceCard(activeServiceIndex + (deltaX < 0 ? 1 : -1));
        window.setTimeout(() => {
          suppressCarouselClick = false;
        }, 360);
        return;
      }

      clearCarouselDragOffset();
      triggerCenteredCardShine(160);
      startCarouselTimer(true);
    }

    servicesCarousel.addEventListener("pointerup", (event) => finishCarouselPointer(event));
    servicesCarousel.addEventListener("pointercancel", (event) => finishCarouselPointer(event, true));

    servicesCarousel.addEventListener("click", (event) => {
      if (!carouselEnabled()) return;
      const card = event.target.closest(".service-card");
      if (!card) return;

      if (suppressCarouselClick) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }

      if (!card.classList.contains("is-active")) {
        event.preventDefault();
        setActiveServiceCard(serviceCards.indexOf(card));
      }
    });

    serviceCards.forEach((card) => {
      card.addEventListener("animationend", (event) => {
        if (event.animationName === "service-card-mobile-shine") {
          card.classList.remove("is-shining");
        }
      });
    });

    if ("IntersectionObserver" in window) {
      const serviceCarouselObserver = new IntersectionObserver(
        (entries) => {
          carouselVisible = entries.some((entry) => entry.isIntersecting);
          if (carouselVisible) {
            if (carouselEnabled()) {
              setActiveServiceCard(activeServiceIndex, { shineDelay: 180, restart: false });
              startCarouselTimer();
            }
          } else {
            stopCarouselTimer();
            clearCarouselShine();
          }
        },
        { threshold: 0.36 }
      );
      serviceCarouselObserver.observe(servicesCarousel);
    }

    mobileCarousel.addEventListener?.("change", updateServiceCarouselMode);
    reducedMotion.addEventListener?.("change", updateServiceCarouselMode);
    updateServiceCarouselMode();
  }

  document.querySelectorAll(".faq-question").forEach((button, index) => {
    const item = button.closest(".faq-item");
    const answer = item?.querySelector(".faq-answer");
    if (!item || !answer) return;
    const answerId = answer.id || `faq-answer-${index + 1}`;
    answer.id = answerId;
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-controls", answerId);

    button.addEventListener("click", () => {
      const open = item.classList.toggle("is-open");
      button.querySelector("span:last-child").textContent = open ? "-" : "+";
      button.setAttribute("aria-expanded", String(open));
    });
  });

  const testimonials = [...document.querySelectorAll("[data-testimonial]")];
  const testimonialPrev = document.querySelector("[data-testimonial-prev]");
  const testimonialNext = document.querySelector("[data-testimonial-next]");
  let testimonialIndex = 0;

  function showTestimonial(index) {
    if (!testimonials.length) return;
    testimonialIndex = (index + testimonials.length) % testimonials.length;
    testimonials.forEach((item, itemIndex) => item.classList.toggle("is-active", itemIndex === testimonialIndex));
  }

  testimonialPrev?.addEventListener("click", () => showTestimonial(testimonialIndex - 1));
  testimonialNext?.addEventListener("click", () => showTestimonial(testimonialIndex + 1));

  const googleReviewsCarousel = document.querySelector("[data-google-reviews-carousel]");
  const googleReviewCards = googleReviewsCarousel ? [...googleReviewsCarousel.querySelectorAll(".google-review-card")] : [];

  if (googleReviewsCarousel && googleReviewCards.length > 1) {
    const reviewInterval = 3000;
    let activeReviewIndex = 0;
    let reviewTimer = null;
    let reviewVisible = !("IntersectionObserver" in window);
    let reviewPointerDown = false;
    let reviewPointerDragging = false;
    let reviewPointerId = null;
    let reviewStartX = 0;
    let reviewStartY = 0;

    function stopReviewTimer() {
      if (!reviewTimer) return;
      window.clearInterval(reviewTimer);
      reviewTimer = null;
    }

    function setReviewDragOffset(value) {
      const drag = Math.max(-140, Math.min(140, value));
      googleReviewsCarousel.style.setProperty("--review-drag", `${Math.round(drag)}px`);
      googleReviewsCarousel.style.setProperty("--review-drag-soft", `${Math.round(drag * 0.36)}px`);
    }

    function clearReviewDragOffset() {
      googleReviewsCarousel.style.removeProperty("--review-drag");
      googleReviewsCarousel.style.removeProperty("--review-drag-soft");
    }

    function setActiveReview(index, options = {}) {
      const { restart = true } = options;
      activeReviewIndex = (index + googleReviewCards.length) % googleReviewCards.length;
      const previousIndex = (activeReviewIndex - 1 + googleReviewCards.length) % googleReviewCards.length;
      const nextIndex = (activeReviewIndex + 1) % googleReviewCards.length;

      googleReviewCards.forEach((card, cardIndex) => {
        const isVisibleCard = cardIndex === activeReviewIndex || cardIndex === previousIndex || cardIndex === nextIndex;

        card.classList.toggle("is-active", cardIndex === activeReviewIndex);
        card.classList.toggle("is-prev", cardIndex === previousIndex);
        card.classList.toggle("is-next", cardIndex === nextIndex);
        card.setAttribute("aria-hidden", String(!isVisibleCard));
      });

      clearReviewDragOffset();
      if (restart) startReviewTimer(true);
    }

    function startReviewTimer(restart = false) {
      if (restart) stopReviewTimer();
      if (reviewTimer || reducedMotion.matches || !reviewVisible || reviewPointerDown || document.hidden) return;

      reviewTimer = window.setInterval(() => {
        setActiveReview(activeReviewIndex + 1, { restart: false });
      }, reviewInterval);
    }

    googleReviewsCarousel.addEventListener("mouseenter", stopReviewTimer);
    googleReviewsCarousel.addEventListener("mouseleave", () => startReviewTimer(true));
    googleReviewsCarousel.addEventListener("focusin", stopReviewTimer);
    googleReviewsCarousel.addEventListener("focusout", () => startReviewTimer(true));

    googleReviewsCarousel.addEventListener("pointerdown", (event) => {
      if (event.pointerType === "mouse" && event.button !== 0) return;
      reviewPointerDown = true;
      reviewPointerDragging = false;
      reviewPointerId = event.pointerId;
      reviewStartX = event.clientX;
      reviewStartY = event.clientY;
      stopReviewTimer();

      try {
        googleReviewsCarousel.setPointerCapture?.(event.pointerId);
      } catch {
        // Pointer capture may be unavailable for synthetic pointer events.
      }
    });

    googleReviewsCarousel.addEventListener("pointermove", (event) => {
      if (!reviewPointerDown || reviewPointerId !== event.pointerId) return;
      const deltaX = event.clientX - reviewStartX;
      const deltaY = event.clientY - reviewStartY;

      if (!reviewPointerDragging && Math.abs(deltaX) > 12 && Math.abs(deltaX) > Math.abs(deltaY) * 1.1) {
        reviewPointerDragging = true;
        googleReviewsCarousel.classList.add("is-dragging");
      }

      if (!reviewPointerDragging) return;
      event.preventDefault();
      setReviewDragOffset(deltaX);
    });

    function finishReviewPointer(event, cancelled = false) {
      if (!reviewPointerDown || reviewPointerId !== event.pointerId) return;
      const deltaX = event.clientX - reviewStartX;
      const shouldMove = reviewPointerDragging && !cancelled && Math.abs(deltaX) > 46;

      reviewPointerDown = false;
      reviewPointerDragging = false;
      reviewPointerId = null;
      googleReviewsCarousel.classList.remove("is-dragging");

      try {
        googleReviewsCarousel.releasePointerCapture?.(event.pointerId);
      } catch {
        // The pointer may not have been captured.
      }

      if (shouldMove) {
        setActiveReview(activeReviewIndex + (deltaX < 0 ? 1 : -1));
        return;
      }

      clearReviewDragOffset();
      startReviewTimer(true);
    }

    googleReviewsCarousel.addEventListener("pointerup", (event) => finishReviewPointer(event));
    googleReviewsCarousel.addEventListener("pointercancel", (event) => finishReviewPointer(event, true));

    if ("IntersectionObserver" in window) {
      const reviewObserver = new IntersectionObserver(
        (entries) => {
          reviewVisible = entries.some((entry) => entry.isIntersecting);
          if (reviewVisible) {
            startReviewTimer(true);
          } else {
            stopReviewTimer();
          }
        },
        { threshold: 0.28 }
      );
      reviewObserver.observe(googleReviewsCarousel);
    }

    reducedMotion.addEventListener?.("change", () => {
      if (reducedMotion.matches) {
        stopReviewTimer();
        return;
      }
      startReviewTimer(true);
    });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        stopReviewTimer();
      } else {
        startReviewTimer(true);
      }
    });

    setActiveReview(0, { restart: false });
    startReviewTimer();
  }

  const lightbox = document.querySelector("#lightbox");
  const lightboxImage = document.querySelector("#lightbox-img");
  const lightboxTitle = document.querySelector("#lightbox-title");
  const lightboxText = document.querySelector("#lightbox-text");
  const lightboxClose = document.querySelector(".lightbox-close");
  const lightboxStage = document.querySelector("[data-album-stage]");
  const lightboxPrev = document.querySelector("[data-album-prev]");
  const lightboxNext = document.querySelector("[data-album-next]");
  let albumSlides = [];
  let albumIndex = 0;
  let albumTimer = null;
  let albumPointerDown = false;
  let albumPointerDragging = false;
  let albumPointerId = null;
  let albumStartX = 0;
  let albumStartY = 0;

  function stopAlbumTimer() {
    if (!albumTimer) return;
    window.clearInterval(albumTimer);
    albumTimer = null;
  }

  function setAlbumDragOffset(value) {
    if (!lightboxStage) return;
    const drag = Math.max(-130, Math.min(130, value));
    lightboxStage.style.setProperty("--album-drag", `${Math.round(drag)}px`);
    lightboxStage.style.setProperty("--album-drag-soft", `${Math.round(drag * 0.35)}px`);
  }

  function clearAlbumDragOffset() {
    lightboxStage?.style.removeProperty("--album-drag");
    lightboxStage?.style.removeProperty("--album-drag-soft");
  }

  function setAlbumSlide(index, restart = true) {
    if (!albumSlides.length) return;
    albumIndex = (index + albumSlides.length) % albumSlides.length;
    const previous = (albumIndex - 1 + albumSlides.length) % albumSlides.length;
    const next = (albumIndex + 1) % albumSlides.length;

    albumSlides.forEach((slide, slideIndex) => {
      slide.classList.toggle("is-active", slideIndex === albumIndex);
      slide.classList.toggle("is-prev", slideIndex === previous);
      slide.classList.toggle("is-next", slideIndex === next);
    });

    clearAlbumDragOffset();

    if (restart) startAlbumTimer(true);
  }

  function startAlbumTimer(restart = false) {
    if (restart) stopAlbumTimer();
    if (albumTimer || albumSlides.length < 2 || reducedMotion.matches) return;
    albumTimer = window.setInterval(() => setAlbumSlide(albumIndex + 1, false), 4000);
  }

  function renderAlbumSlides(images, altText) {
    if (!lightboxStage) return;

    lightboxStage.innerHTML = "";
    albumSlides = images.map((src, index) => {
      const slide = document.createElement("figure");
      const image = document.createElement("img");

      slide.className = "album-lightbox-slide";
      image.src = src;
      image.alt = index === 0 ? altText : `${altText} - ${translateText("imagem")} ${index + 1}`;
      image.loading = "eager";
      image.decoding = "async";

      slide.appendChild(image);
      lightboxStage.appendChild(slide);
      return slide;
    });

    const hasMultipleImages = albumSlides.length > 1;
    if (lightboxPrev) lightboxPrev.hidden = !hasMultipleImages;
    if (lightboxNext) lightboxNext.hidden = !hasMultipleImages;
    setAlbumSlide(0, false);
  }

  function closeLightbox() {
    if (!lightbox) return;
    stopAlbumTimer();
    lightbox.classList.remove("is-visible");
    lightbox.setAttribute("aria-hidden", "true");
    body.classList.remove("lightbox-open");
    clearAlbumDragOffset();
    if (lightboxStage) {
      lightboxStage.innerHTML = "";
      albumSlides = [];
    } else {
      lightboxImage?.removeAttribute("src");
    }
  }

  document.querySelectorAll("[data-lightbox-title]").forEach((button) => {
    button.addEventListener("click", () => {
      if (!lightbox || !lightboxTitle || !lightboxText) return;
      const title = getOriginalAttribute(button, "data-lightbox-title");
      const text = getOriginalAttribute(button, "data-lightbox-text");
      const coverAlt = button.querySelector("img")?.alt || translateText(title);
      const albumImages = (button.dataset.albumImages || button.dataset.img || "")
        .split("|")
        .map((src) => src.trim())
        .filter(Boolean);

      if (lightboxStage && albumImages.length) {
        renderAlbumSlides(albumImages, coverAlt);
      } else if (lightboxImage && button.dataset.img) {
        lightboxImage.src = button.dataset.img;
        lightboxImage.alt = coverAlt;
      }

      lightboxTitle.dataset.i18nOriginalText = title;
      lightboxText.dataset.i18nOriginalText = text;
      lightboxTitle.textContent = translateText(title);
      lightboxText.textContent = translateText(text);
      lightbox.classList.add("is-visible");
      lightbox.setAttribute("aria-hidden", "false");
      body.classList.add("lightbox-open");
      startAlbumTimer(true);
      lightboxClose?.focus();
    });
  });

  lightboxPrev?.addEventListener("click", () => setAlbumSlide(albumIndex - 1));
  lightboxNext?.addEventListener("click", () => setAlbumSlide(albumIndex + 1));

  lightboxStage?.addEventListener("pointerdown", (event) => {
    if (albumSlides.length < 2) return;
    if (event.pointerType === "mouse" && event.button !== 0) return;
    albumPointerDown = true;
    albumPointerDragging = false;
    albumPointerId = event.pointerId;
    albumStartX = event.clientX;
    albumStartY = event.clientY;
    stopAlbumTimer();
    try {
      lightboxStage.setPointerCapture?.(event.pointerId);
    } catch {
      // Pointer capture can be unavailable in synthetic events.
    }
  });

  lightboxStage?.addEventListener("pointermove", (event) => {
    if (!albumPointerDown || albumPointerId !== event.pointerId) return;
    const deltaX = event.clientX - albumStartX;
    const deltaY = event.clientY - albumStartY;

    if (!albumPointerDragging && Math.abs(deltaX) > 12 && Math.abs(deltaX) > Math.abs(deltaY) * 1.1) {
      albumPointerDragging = true;
      lightboxStage.classList.add("is-dragging");
    }

    if (!albumPointerDragging) return;
    event.preventDefault();
    setAlbumDragOffset(deltaX);
  });

  function finishAlbumPointer(event, cancelled = false) {
    if (!albumPointerDown || albumPointerId !== event.pointerId) return;
    const deltaX = event.clientX - albumStartX;
    const shouldMove = albumPointerDragging && !cancelled && Math.abs(deltaX) > 48;

    albumPointerDown = false;
    albumPointerDragging = false;
    albumPointerId = null;
    lightboxStage?.classList.remove("is-dragging");
    try {
      lightboxStage?.releasePointerCapture?.(event.pointerId);
    } catch {
      // The pointer may not have been captured.
    }

    if (shouldMove) {
      setAlbumSlide(albumIndex + (deltaX < 0 ? 1 : -1));
      return;
    }

    clearAlbumDragOffset();
    startAlbumTimer(true);
  }

  lightboxStage?.addEventListener("pointerup", (event) => finishAlbumPointer(event));
  lightboxStage?.addEventListener("pointercancel", (event) => finishAlbumPointer(event, true));

  lightboxClose?.addEventListener("click", closeLightbox);
  lightbox?.addEventListener("click", (event) => {
    if (event.target === lightbox) closeLightbox();
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      closeMenu();
      closeLightbox();
    }
    if (lightbox?.classList.contains("is-visible") && albumSlides.length > 1) {
      if (event.key === "ArrowLeft") setAlbumSlide(albumIndex - 1);
      if (event.key === "ArrowRight") setAlbumSlide(albumIndex + 1);
    }
  });

  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;
      document.querySelectorAll("[data-filter]").forEach((item) => item.classList.toggle("is-active", item === button));
      document.querySelectorAll("[data-category]").forEach((card) => {
        card.hidden = filter !== "all" && card.dataset.category !== filter;
      });
    });
  });

  const cookieBanner = document.querySelector("#cookie-banner");
  const cookieOptions = document.querySelector("#cookie-options");
  const cookieKey = "thebar-cookie-preferences";

  const storage = {
    get(key) {
      try {
        return window.localStorage.getItem(key);
      } catch {
        return null;
      }
    },
    set(key, value) {
      try {
        window.localStorage.setItem(key, value);
      } catch {
        return false;
      }
      return true;
    }
  };

  function saveCookiePreferences(value) {
    storage.set(cookieKey, JSON.stringify(value));
    if (cookieBanner) cookieBanner.hidden = true;
    updateFloatingPreferencesOffset();
  }

  if (cookieBanner && storage.get(cookieKey)) {
    cookieBanner.hidden = true;
  }
  updateFloatingPreferencesOffset();

  document.querySelector("[data-cookie-accept]")?.addEventListener("click", () => {
    saveCookiePreferences({ essential: true, performance: true, marketing: true });
  });

  document.querySelector("[data-cookie-reject]")?.addEventListener("click", () => {
    saveCookiePreferences({ essential: true, performance: false, marketing: false });
  });

  document.querySelector("[data-cookie-custom]")?.addEventListener("click", () => {
    cookieOptions?.classList.toggle("is-visible");
    window.requestAnimationFrame(updateFloatingPreferencesOffset);
  });

  document.querySelector("[data-cookie-save]")?.addEventListener("click", () => {
    saveCookiePreferences({
      essential: true,
      performance: document.querySelector("#cookie-performance")?.checked || false,
      marketing: document.querySelector("#cookie-marketing")?.checked || false
    });
  });

  document.querySelector("[data-cookie-open]")?.addEventListener("click", () => {
    if (!cookieBanner) return;
    cookieBanner.hidden = false;
    cookieOptions?.classList.add("is-visible");
    window.requestAnimationFrame(updateFloatingPreferencesOffset);
  });

  const form = document.querySelector("#contact-form");
  const successState = document.querySelector("#success-state");

  function setError(input, message) {
    const slot = document.querySelector(`[data-error-for="${input.id}"]`);
    if (slot) {
      if (message) {
        slot.dataset.errorKey = message;
        slot.textContent = translateText(message);
      } else {
        delete slot.dataset.errorKey;
        slot.textContent = "";
      }
    }
    input.setAttribute("aria-invalid", message ? "true" : "false");
  }

  function validateInput(input) {
    if (input.required && !input.value.trim()) {
      setError(input, "Campo obrigatório.");
      return false;
    }
    if (input.type === "email" && input.value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
      setError(input, "Informe um email válido.");
      return false;
    }
    if (input.type === "tel" && input.value && input.value.replace(/\D/g, "").length < 10) {
      setError(input, "Informe um WhatsApp válido.");
      return false;
    }
    setError(input, "");
    return true;
  }

  if (form) {
    form.querySelectorAll("input, select, textarea").forEach((input) => {
      if (input.name !== "empresa") {
        input.addEventListener("input", () => validateInput(input));
        input.addEventListener("blur", () => validateInput(input));
      }
    });

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      if (form.empresa?.value) return;
      const fields = [...form.querySelectorAll("input, select, textarea")].filter((input) => input.name !== "empresa");
      const valid = fields.every(validateInput);
      if (!valid) return;
      form.style.display = "none";
      successState?.classList.add("is-visible");
      successState?.setAttribute("tabindex", "-1");
      successState?.focus();
    });
  }
})();
