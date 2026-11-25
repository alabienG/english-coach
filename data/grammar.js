/* Grammar lessons A1 -> C1 (explanations in French, exercises in English) */
window.GRAMMAR = [

  /* ===================== A1 ===================== */
  {id:"g-a1-1", level:"A1", title:"Le verbe « to be »",
   explain:"<p>Le verbe <b>to be</b> (être) sert à donner l'identité, la nationalité, la profession, l'état ou le lieu. Au présent, il n'a que trois formes :</p><ul><li><b>I am</b> (I'm) : <i>I am French.</i></li><li><b>he / she / it is</b> (he's, she's, it's) : <i>She is a nurse.</i></li><li><b>you / we / they are</b> (you're, we're, they're) : <i>They are at home.</i></li></ul><p>Négation : ajoutez <b>not</b> (I'm not, he isn't, they aren't). Question : inversez le sujet et le verbe : <i>Are you tired?</i> — <i>Yes, I am.</i></p><p class='tip'>Piège pour les francophones : l'âge et certaines sensations se disent avec <b>to be</b>, pas avec « have ». On dit <i>I am 40 (years old)</i>, jamais <i>I have 40 years</i>. De même : <i>I am hungry / cold / right / afraid</i> (j'ai faim / froid / raison / peur).</p>",
   exercises:[
     {type:"mcq", q:"She ___ a doctor.", options:["is","are","am"], answer:0, why:"Avec she / he / it, on utilise « is »."},
     {type:"fill", q:"They ___ (be) very happy today.", answer:["are","'re"], why:"Avec they, la forme de to be est « are »."},
     {type:"mcq", q:"I ___ 35 years old.", options:["have","am","is"], answer:1, why:"L'âge s'exprime avec to be : I am 35, et non I have 35."},
     {type:"fill", q:"We ___ (not / be) late, don't worry.", answer:["are not","aren't","'re not"], why:"La négation de « we are » est « we are not » (we aren't / we're not)."},
     {type:"mcq", q:"___ your brother at work?", options:["Am","Is","Are"], answer:1, why:"« Your brother » = he, donc la question commence par « Is »."},
     {type:"fill", q:"It ___ (be) cold today. Take a coat!", answer:["is","'s"], why:"Avec it, on utilise « is » ; en anglais on dit « it is cold » pour la météo."}
   ]},

  {id:"g-a1-2", level:"A1", title:"Le présent simple",
   explain:"<p>Le <b>présent simple</b> exprime les habitudes, les vérités générales et les situations permanentes : <i>I work in an office. Water boils at 100°C.</i></p><ul><li>Forme de base pour I / you / we / they : <i>They live in Paris.</i></li><li><b>-s</b> à la 3e personne du singulier : <i>She works at night.</i> Après -o, -s, -sh, -ch, -x on ajoute <b>-es</b> (goes, watches) ; consonne + y devient <b>-ies</b> (study → studies).</li><li>Négation : <b>don't / doesn't</b> + base verbale : <i>He doesn't like tea.</i></li><li>Question : <b>Do / Does</b> + sujet + base : <i>Does she speak Spanish?</i></li></ul><p>Adverbes fréquents : always, usually, often, sometimes, never (placés avant le verbe).</p><p class='tip'>Piège pour les francophones : après <b>does / doesn't</b>, le verbe perd son -s. On dit <i>She doesn't work</i>, pas <i>She doesn't works</i>. Et on n'oublie pas l'auxiliaire dans les questions : <i>Do you like jazz?</i> et non <i>You like jazz?</i></p>",
   exercises:[
     {type:"mcq", q:"My sister ___ in Lyon.", options:["live","lives","living"], answer:1, why:"« My sister » = she : on ajoute -s au verbe."},
     {type:"fill", q:"He ___ (watch) TV every evening.", answer:["watches"], why:"Après -ch, la 3e personne prend -es : watches."},
     {type:"mcq", q:"She doesn't ___ coffee.", options:["drink","drinks","drinking"], answer:0, why:"Après doesn't, on utilise la base verbale sans -s."},
     {type:"fill", q:"___ you work on Saturdays?", answer:["do"], why:"Avec you, la question au présent simple se forme avec « Do »."},
     {type:"mcq", q:"Where ___ your father work?", options:["do","does","is"], answer:1, why:"« Your father » = he, donc l'auxiliaire est « does »."},
     {type:"fill", q:"We ___ (not / eat) meat.", answer:["don't eat","do not eat"], why:"Négation au présent simple avec we : don't + base verbale."}
   ]},

  {id:"g-a1-3", level:"A1", title:"Articles et pluriels",
   explain:"<p><b>A / an</b> = un, une (singulier, chose non précisée). On choisit selon le <i>son</i> qui suit : <b>a</b> devant un son consonne (<i>a car, a university</i>), <b>an</b> devant un son voyelle (<i>an apple, an hour</i>).</p><p><b>The</b> = le, la, les : une chose précise ou déjà connue : <i>Close the door, please.</i></p><p>Pluriel : en général <b>-s</b> (books), <b>-es</b> après -s, -sh, -ch, -x (boxes), <b>-ies</b> après consonne + y (cities). Pluriels irréguliers : man → <b>men</b>, woman → <b>women</b>, child → <b>children</b>, person → <b>people</b>, foot → <b>feet</b>, tooth → <b>teeth</b>.</p><p class='tip'>Piège pour les francophones : pas d'article pour parler de quelque chose <b>en général</b>. On dit <i>I like cats</i> (j'aime les chats) et <i>Life is beautiful</i>, pas <i>I like the cats</i>. En revanche, on met <b>a / an</b> devant une profession : <i>I'm a teacher</i> (je suis professeur).</p>",
   exercises:[
     {type:"mcq", q:"I'm ___ engineer.", options:["a","an","the"], answer:1, why:"« Engineer » commence par un son voyelle, donc « an »."},
     {type:"mcq", q:"She is ___ teacher.", options:["(no article)","a","the"], answer:1, why:"Devant une profession, l'anglais utilise « a / an »."},
     {type:"fill", q:"There are three ___ (child) in the garden.", answer:["children"], why:"Child a un pluriel irrégulier : children."},
     {type:"mcq", q:"I love ___ music.", options:["the","a","(no article)"], answer:2, why:"On parle de la musique en général : pas d'article."},
     {type:"fill", q:"It takes ___ hour to get there.", answer:["an"], why:"Le h de « hour » est muet : on entend un son voyelle, donc « an »."},
     {type:"mcq", q:"Can you close ___ door, please?", options:["a","the","an"], answer:1, why:"Il s'agit d'une porte précise, connue des deux personnes : « the »."}
   ]},

  {id:"g-a1-4", level:"A1", title:"There is / there are, some / any",
   explain:"<p>Pour dire « il y a », on utilise :</p><ul><li><b>there is</b> (there's) + singulier ou indénombrable : <i>There is a bank near here. There's some milk.</i></li><li><b>there are</b> + pluriel : <i>There are two bedrooms.</i></li><li>Négation : <b>there isn't / there aren't</b>. Question : <b>Is there…? / Are there…?</b></li></ul><p><b>Some</b> s'emploie dans les phrases affirmatives (et les offres : <i>Would you like some tea?</i>). <b>Any</b> s'emploie dans les négations et les questions : <i>There aren't any eggs. Are there any shops?</i></p><p class='tip'>Piège pour les francophones : ne traduisez pas « il y a » par <i>it has</i> ou <i>he has</i>. Et quand « il y a » indique le temps passé, on utilise <b>ago</b> : « il y a deux ans » = <i>two years ago</i>, et non <i>there is two years</i>.</p>",
   exercises:[
     {type:"mcq", q:"___ a bank near here?", options:["Is there","Are there","There is"], answer:0, why:"Question au singulier : Is there…?"},
     {type:"fill", q:"There ___ (be) two bedrooms in the flat.", answer:["are"], why:"« Two bedrooms » est pluriel : there are."},
     {type:"mcq", q:"There aren't ___ eggs in the fridge.", options:["some","any","a"], answer:1, why:"Dans une phrase négative, on utilise « any »."},
     {type:"fill", q:"There ___ (be) some milk on the table.", answer:["is","'s"], why:"« Milk » est indénombrable, donc singulier : there is."},
     {type:"mcq", q:"Which sentence is correct?", options:["It has a cat in the garden.","There is a cat in the garden.","There are a cat in the garden."], answer:1, why:"« Il y a » + singulier se traduit par « there is »."},
     {type:"fill", q:"Are there ___ good restaurants in your town?", answer:["any"], why:"Dans une question, on utilise généralement « any »."}
   ]},

  /* ===================== A2 ===================== */
  {id:"g-a2-1", level:"A2", title:"Le prétérit (past simple)",
   explain:"<p>Le <b>past simple</b> décrit une action terminée à un moment précis du passé. Il traduit souvent le passé composé français.</p><ul><li>Verbes réguliers : base + <b>-ed</b> : <i>I worked, she visited, they studied.</i></li><li>Verbes irréguliers à apprendre : go → <b>went</b>, have → <b>had</b>, see → <b>saw</b>, buy → <b>bought</b>, make → <b>made</b>.</li><li>Négation : <b>didn't</b> + base : <i>We didn't go out.</i></li><li>Question : <b>Did</b> + sujet + base : <i>Did you enjoy the film?</i></li></ul><p>Marqueurs de temps : yesterday, last week, in 2015, two days <b>ago</b>.</p><p class='tip'>Piège pour les francophones : après <b>did / didn't</b>, le verbe reste à la base. On dit <i>Did you see him?</i> et non <i>Did you saw him?</i>. Attention aussi à <b>ago</b>, qui se place après la durée : <i>three years ago</i> (il y a trois ans).</p>",
   exercises:[
     {type:"mcq", q:"We ___ to Spain last summer.", options:["go","went","gone"], answer:1, why:"« Last summer » indique un passé terminé : prétérit irrégulier « went »."},
     {type:"fill", q:"She ___ (buy) a new car last month.", answer:["bought"], why:"Buy est irrégulier : buy – bought – bought."},
     {type:"mcq", q:"Did you ___ the film?", options:["saw","see","seen"], answer:1, why:"Après « did », on utilise la base verbale."},
     {type:"fill", q:"I ___ (not / work) yesterday.", answer:["didn't work","did not work"], why:"Négation au prétérit : didn't + base verbale."},
     {type:"mcq", q:"I met him three years ___.", options:["ago","before","since"], answer:0, why:"« Il y a » + durée dans le passé se dit « ago », placé après la durée."},
     {type:"fill", q:"They ___ (study) English at school.", answer:["studied"], why:"Consonne + y : on remplace y par -ied au prétérit."}
   ]},

  {id:"g-a2-2", level:"A2", title:"Présent simple ou présent continu ?",
   explain:"<p>Le <b>présent continu</b> (<b>be + -ing</b>) décrit une action en cours maintenant ou une situation temporaire : <i>I'm reading a great book at the moment.</i></p><p>Le <b>présent simple</b> décrit une habitude ou un fait permanent : <i>I read every evening.</i></p><ul><li>Mots indicateurs du continu : now, at the moment, today, this week, Look! Listen!</li><li>Mots indicateurs du simple : usually, often, every day, never, how often…?</li></ul><p>Les <b>verbes d'état</b> (know, like, love, want, need, believe, understand, mean) ne s'emploient normalement pas au continu : <i>I know the answer</i>, pas <i>I'm knowing</i>.</p><p class='tip'>Piège pour les francophones : le français n'a qu'un présent. « Je travaille » peut être <i>I work</i> (habitude) ou <i>I'm working</i> (maintenant). Demandez-vous toujours : est-ce une habitude ou ce qui se passe en ce moment ?</p>",
   exercises:[
     {type:"mcq", q:"Listen! The baby ___.", options:["cries","is crying","cry"], answer:1, why:"« Listen! » montre que l'action se passe maintenant : présent continu."},
     {type:"mcq", q:"I usually ___ the bus to work.", options:["take","am taking","takes"], answer:0, why:"« Usually » indique une habitude : présent simple."},
     {type:"fill", q:"Look, it ___ (rain). Take an umbrella.", answer:["is raining","'s raining"], why:"Action en cours au moment où l'on parle : is + -ing."},
     {type:"mcq", q:"I ___ what you mean.", options:["understand","am understanding","understanding"], answer:0, why:"« Understand » est un verbe d'état : pas de forme continue."},
     {type:"fill", q:"This week she ___ (work) from home because her office is closed.", answer:["is working","'s working"], why:"Situation temporaire (this week) : présent continu."},
     {type:"mcq", q:"How often ___ to the gym?", options:["are you going","do you go","you go"], answer:1, why:"« How often » porte sur une habitude : présent simple avec « do »."}
   ]},

  {id:"g-a2-3", level:"A2", title:"Comparatifs et superlatifs",
   explain:"<p>Pour comparer deux choses, on utilise le <b>comparatif</b> + <b>than</b> ; pour le plus haut degré, le <b>superlatif</b> avec <b>the</b>.</p><ul><li>Adjectifs courts : <b>-er / the -est</b> : cheap → cheaper → the cheapest. Doublement : big → bigger. -y → <b>-ier</b> : easy → easier → the easiest.</li><li>Adjectifs longs : <b>more / the most</b> : expensive → more expensive → the most expensive.</li><li>Irréguliers : good → <b>better</b> → the best ; bad → <b>worse</b> → the worst ; far → further → the furthest.</li><li>Égalité : <b>as … as</b> : <i>She is as tall as her brother.</i></li></ul><p><i>London is bigger than Paris. It's the most beautiful city in the world!</i></p><p class='tip'>Piège pour les francophones : on ne cumule pas « more » et « -er » : <i>bigger</i>, pas <i>more big</i> ni <i>more bigger</i>. Et « que » se traduit par <b>than</b> pour le comparatif, jamais par <i>that</i>.</p>",
   exercises:[
     {type:"mcq", q:"My flat is ___ than yours.", options:["more small","smaller","smallest"], answer:1, why:"« Small » est un adjectif court : comparatif en -er + than."},
     {type:"fill", q:"This is the ___ (expensive) hotel in the city.", answer:["most expensive"], why:"Adjectif long : superlatif avec « the most »."},
     {type:"mcq", q:"Today is ___ than yesterday.", options:["more bad","worse","worst"], answer:1, why:"Bad est irrégulier : bad – worse – the worst."},
     {type:"fill", q:"English is ___ (easy) than German for me.", answer:["easier"], why:"Adjectif en -y : on remplace y par -ier."},
     {type:"mcq", q:"She is as tall ___ her mother.", options:["than","as","that"], answer:1, why:"L'égalité se construit avec as … as."},
     {type:"mcq", q:"It was the ___ day of my life!", options:["happiest","happier","most happy"], answer:0, why:"Happy (en -y) forme son superlatif en -iest : the happiest."}
   ]},

  {id:"g-a2-4", level:"A2", title:"Le futur : going to ou will ?",
   explain:"<p><b>Be going to + base</b> exprime :</p><ul><li>une intention ou un projet déjà décidé : <i>I'm going to learn Spanish next year.</i></li><li>une prédiction fondée sur un indice présent : <i>Look at those clouds! It's going to rain.</i></li></ul><p><b>Will + base</b> exprime :</p><ul><li>une décision prise sur le moment : <i>The phone's ringing. I'll get it!</i></li><li>une promesse, une offre : <i>I'll help you.</i></li><li>une prédiction d'opinion : <i>I think she'll win.</i></li></ul><p>Pour un rendez-vous fixé, on utilise souvent le présent continu : <i>I'm seeing the doctor tomorrow.</i></p><p class='tip'>Piège pour les francophones : après <b>when, if, as soon as</b> (sens futur), on met le présent, pas « will » : <i>When I get home, I'll call you</i>, et non <i>When I will get home</i>. Et « je vais » ne se traduit pas toujours par « going to » : pour une décision spontanée, dites <i>I'll…</i></p>",
   exercises:[
     {type:"mcq", q:"The phone is ringing. — OK, I ___ answer it.", options:["'ll","am going to","going to"], answer:0, why:"Décision prise sur le moment : will ('ll)."},
     {type:"mcq", q:"Look at those black clouds! It ___ rain.", options:["will","is going to","goes to"], answer:1, why:"Prédiction fondée sur un indice visible : going to."},
     {type:"fill", q:"We've booked the tickets. We ___ (visit) Rome in May.", answer:["are going to visit","'re going to visit","are visiting","'re visiting"], why:"Projet déjà décidé et organisé : going to (ou présent continu)."},
     {type:"mcq", q:"I promise I ___ tell anyone.", options:["won't","am not going","don't"], answer:0, why:"Une promesse s'exprime avec will / won't."},
     {type:"fill", q:"I think Brazil ___ (win) the match.", answer:["will win","'ll win"], why:"Prédiction d'opinion après « I think » : will."},
     {type:"mcq", q:"When I ___ home, I'll call you.", options:["will get","get","am going to get"], answer:1, why:"Après « when » à sens futur, on utilise le présent simple."}
   ]},

  /* ===================== B1 ===================== */
  {id:"g-b1-1", level:"B1", title:"Present perfect ou prétérit ?",
   explain:"<p>Le <b>present perfect</b> (<b>have / has + participe passé</b>) relie le passé au présent :</p><ul><li>expérience, sans moment précis : <i>I've been to Japan twice.</i></li><li>résultat visible maintenant : <i>I've lost my keys.</i></li><li>action qui dure jusqu'à maintenant, avec <b>for</b> (durée) ou <b>since</b> (point de départ) : <i>She has lived here since 2015.</i></li><li>avec ever, never, already, just, yet.</li></ul><p>Le <b>prétérit</b> s'impose dès qu'un moment passé terminé est mentionné ou sous-entendu : yesterday, last year, in 2010, ago, when…? : <i>I went to Japan in 2019.</i></p><p class='tip'>Piège pour les francophones : « J'habite ici depuis cinq ans » se dit <i>I have lived / I've been living here for five years</i>, jamais <i>I live here since five years</i>. Et on ne combine pas present perfect et date précise : <i>I saw him yesterday</i>, pas <i>I have seen him yesterday</i>.</p>",
   exercises:[
     {type:"mcq", q:"I ___ to Japan twice.", options:["have been","went","am"], answer:0, why:"Expérience de vie sans moment précis : present perfect."},
     {type:"mcq", q:"She ___ her job in 2019.", options:["has left","left","has leaving"], answer:1, why:"Date précise et terminée (in 2019) : prétérit."},
     {type:"fill", q:"We ___ (live) here since 2015.", answer:["have lived","'ve lived","have been living","'ve been living"], why:"Action commencée dans le passé et toujours vraie : present perfect + since."},
     {type:"mcq", q:"I've known him ___ ten years.", options:["since","for","during"], answer:1, why:"« For » introduit une durée ; « since » un point de départ."},
     {type:"fill", q:"I haven't seen that film ___. Is it good?", answer:["yet"], why:"« Yet » s'emploie en fin de phrase négative ou interrogative au present perfect."},
     {type:"mcq", q:"When ___ the news?", options:["have you heard","did you hear","have you hear"], answer:1, why:"Une question avec « when » porte sur un moment précis : prétérit."}
   ]},

  {id:"g-b1-2", level:"B1", title:"Obligation, interdiction et conseil",
   explain:"<p>Les modaux et expressions d'obligation :</p><ul><li><b>must</b> : obligation ressentie par celui qui parle : <i>I must call my mother.</i></li><li><b>have to</b> : obligation extérieure (règle, loi) : <i>I have to wear a uniform at work.</i> Au passé : <b>had to</b>.</li><li><b>mustn't</b> : interdiction : <i>You mustn't park here.</i></li><li><b>don't have to</b> : absence d'obligation : <i>You don't have to come</i> (tu n'es pas obligé).</li><li><b>should / shouldn't</b> : conseil : <i>You should see a doctor.</i></li></ul><p>Les modaux (must, should) sont suivis de la base verbale sans <b>to</b> et ne prennent jamais de -s.</p><p class='tip'>Piège pour les francophones : <b>mustn't</b> et <b>don't have to</b> ont des sens opposés ! <i>You mustn't tell him</i> = tu ne dois pas le lui dire (interdit) ; <i>You don't have to tell him</i> = tu n'es pas obligé. Et pas de « to » après must : <i>I must go</i>, pas <i>I must to go</i>.</p>",
   exercises:[
     {type:"mcq", q:"You ___ smoke in the hospital. It's forbidden.", options:["mustn't","don't have to","shouldn't to"], answer:0, why:"Interdiction : mustn't."},
     {type:"mcq", q:"Tomorrow is Sunday, so I ___ get up early.", options:["mustn't","don't have to","must"], answer:1, why:"Absence d'obligation : don't have to."},
     {type:"fill", q:"Yesterday I ___ (have to) work until 9 pm.", answer:["had to"], why:"« Must » n'a pas de passé : on utilise « had to »."},
     {type:"mcq", q:"You look tired. You ___ go to bed earlier.", options:["should","must to","have"], answer:0, why:"Un conseil s'exprime avec should + base verbale."},
     {type:"fill", q:"In the UK, you ___ drive on the left. It's the law.", answer:["have to","must"], why:"Obligation imposée par une règle extérieure : have to (must est aussi accepté)."},
     {type:"mcq", q:"Does she ___ wear a uniform at work?", options:["must","have to","has to"], answer:1, why:"Après « does », on utilise la base : have to."}
   ]},

  {id:"g-b1-3", level:"B1", title:"Conditionnels de type 1 et 2",
   explain:"<p><b>Premier conditionnel</b> : situation réelle ou probable dans le futur.</p><ul><li><b>If + présent, will + base</b> : <i>If it rains, we'll stay at home.</i></li></ul><p><b>Deuxième conditionnel</b> : situation imaginaire, peu probable ou contraire à la réalité présente.</p><ul><li><b>If + prétérit, would + base</b> : <i>If I had more time, I would learn the piano.</i></li><li>Avec to be, on utilise souvent <b>were</b> pour toutes les personnes : <i>If I were you, I'd accept.</i></li></ul><p>L'ordre des propositions peut être inversé : <i>I'd travel more if I were rich</i> (pas de virgule dans ce cas).</p><p class='tip'>Piège pour les francophones : jamais de <b>will</b> ni de <b>would</b> juste après <b>if</b>. On dit <i>If I had money</i>, pas <i>If I would have money</i> — exactement comme on dit en bon français « si j'avais » et non « si j'aurais ».</p>",
   exercises:[
     {type:"mcq", q:"If it rains tomorrow, we ___ at home.", options:["stay","will stay","would stay"], answer:1, why:"Situation probable dans le futur : premier conditionnel avec will."},
     {type:"mcq", q:"If I ___ rich, I would travel around the world.", options:["am","were","would be"], answer:1, why:"Situation imaginaire : if + prétérit (were)."},
     {type:"fill", q:"If I ___ (have) more time, I would learn the piano.", answer:["had"], why:"Deuxième conditionnel : if + prétérit."},
     {type:"fill", q:"If she studies hard, she ___ (pass) the exam.", answer:["will pass","'ll pass"], why:"If + présent entraîne will + base dans la principale."},
     {type:"mcq", q:"What would you do if you ___ the lottery?", options:["win","won","will win"], answer:1, why:"Hypothèse peu probable : if + prétérit."},
     {type:"mcq", q:"I ___ call you if I hear any news.", options:["would","will","am"], answer:1, why:"Possibilité réelle (if + présent) : will dans la principale."}
   ]},

  {id:"g-b1-4", level:"B1", title:"La voix passive",
   explain:"<p>Le <b>passif</b> se forme avec <b>be</b> (conjugué au temps voulu) + <b>participe passé</b>. On l'utilise quand l'action compte plus que celui qui la fait, ou quand celui-ci est inconnu. L'agent est introduit par <b>by</b>.</p><ul><li>Présent : <i>English is spoken here.</i></li><li>Prétérit : <i>This bridge was built in 1890.</i></li><li>Present perfect : <i>The house has been sold.</i></li><li>Futur : <i>Your order will be delivered tomorrow.</i></li><li>Modal : <i>It must be done today.</i></li></ul><p>Seuls les verbes qui ont un complément d'objet peuvent se mettre au passif.</p><p class='tip'>Piège pour les francophones : le « on » français se traduit très souvent par un passif. « On m'a proposé un poste » = <i>I was offered a job</i> ; « On parle anglais ici » = <i>English is spoken here</i>. Évitez de traduire « on » par <i>one</i> dans ces cas.</p>",
   exercises:[
     {type:"mcq", q:"This bridge ___ in 1890.", options:["built","was built","has built"], answer:1, why:"Passif au prétérit : was + participe passé."},
     {type:"fill", q:"English ___ (speak) in many countries.", answer:["is spoken"], why:"Passif au présent : is + participe passé (spoken)."},
     {type:"mcq", q:"The letters ___ every morning.", options:["are delivered","deliver","are delivering"], answer:0, why:"Les lettres subissent l'action : passif au présent."},
     {type:"fill", q:"Your order ___ (send) tomorrow.", answer:["will be sent"], why:"Passif au futur : will be + participe passé."},
     {type:"mcq", q:"Yesterday someone offered me a job. → Yesterday I ___ a job.", options:["was offered","offered","have offer"], answer:0, why:"La personne qui reçoit devient sujet : I was offered."},
     {type:"fill", q:"The house ___ (already / sell).", answer:["has already been sold","'s already been sold"], why:"Passif au present perfect : has been + participe passé, already avant been."}
   ]},

  /* ===================== B2 ===================== */
  {id:"g-b2-1", level:"B2", title:"Les temps du récit et le past perfect",
   explain:"<p>Pour raconter une histoire, on combine plusieurs temps :</p><ul><li><b>Prétérit</b> : les événements principaux, dans l'ordre : <i>She opened the door and saw him.</i></li><li><b>Past continuous</b> (was / were + -ing) : le décor ou une action interrompue : <i>It was raining when I left.</i></li><li><b>Past perfect</b> (had + participe passé) : une action antérieure à un autre moment passé : <i>When I arrived, the train had left.</i></li><li><b>Past perfect continuous</b> (had been + -ing) : la durée avant ce moment : <i>He was tired because he had been driving all night.</i></li></ul><p>Marqueurs utiles : by the time, already, before, after, as soon as.</p><p class='tip'>Piège pour les francophones : le past perfect change le sens. <i>When I arrived, the train left</i> = il est parti à mon arrivée ; <i>the train had left</i> = il était déjà parti. N'oubliez pas non plus de l'utiliser là où le français se contente parfois d'un passé composé.</p>",
   exercises:[
     {type:"mcq", q:"When we arrived at the station, the train ___. We had to wait an hour.", options:["left","had left","was leaving"], answer:1, why:"Le train est parti avant notre arrivée : past perfect."},
     {type:"mcq", q:"I ___ dinner when the phone rang.", options:["cooked","was cooking","had cooked"], answer:1, why:"Action en cours interrompue par une autre : past continuous."},
     {type:"fill", q:"She was exhausted because she ___ (work) all day.", answer:["had been working","'d been working","had worked","'d worked"], why:"Activité prolongée avant un moment passé : past perfect (continuous)."},
     {type:"mcq", q:"By the time the police came, the thieves ___.", options:["escaped","had escaped","were escaping"], answer:1, why:"« By the time » appelle souvent le past perfect pour l'action antérieure."},
     {type:"fill", q:"While I ___ (drive) home, I saw an accident.", answer:["was driving"], why:"Action de fond en cours avec « while » : past continuous."},
     {type:"mcq", q:"Before that trip, he ___ on a plane.", options:["had never been","has never been","never was"], answer:0, why:"Expérience antérieure à un moment passé : past perfect."}
   ]},

  {id:"g-b2-2", level:"B2", title:"Troisième conditionnel et conditionnels mixtes",
   explain:"<p>Le <b>troisième conditionnel</b> imagine un passé différent (regret, reproche) :</p><ul><li><b>If + past perfect, would have + participe passé</b> : <i>If I had left earlier, I would have caught the train.</i></li></ul><p>Les <b>conditionnels mixtes</b> combinent deux époques :</p><ul><li>Cause passée → conséquence présente : <b>If + past perfect, would + base</b> : <i>If I had taken that job, I would live in London now.</i></li><li>Situation présente → conséquence passée : <b>If + prétérit, would have + participe</b> : <i>If he weren't so shy, he would have spoken to her.</i></li></ul><p>On peut remplacer would par <b>could</b> ou <b>might</b> : <i>We might have won.</i></p><p class='tip'>Piège pour les francophones : jamais <b>would have</b> dans la proposition en if. On dit <i>If I had known</i>, pas <i>If I would have known</i> (calque fréquent de « si j'aurais su »). Attention aussi à <b>'d</b>, qui peut signifier <i>had</i> (après if) ou <i>would</i> (dans la principale).</p>",
   exercises:[
     {type:"mcq", q:"If I had left earlier, I ___ the train.", options:["would catch","would have caught","had caught"], answer:1, why:"Passé imaginaire : would have + participe passé."},
     {type:"fill", q:"If she ___ (know) about the meeting, she would have come.", answer:["had known","'d known"], why:"Troisième conditionnel : if + past perfect."},
     {type:"mcq", q:"If I had taken that job, I ___ in London now.", options:["would live","would have lived","will live"], answer:0, why:"Cause passée, conséquence présente (now) : would + base."},
     {type:"fill", q:"We ___ (not / get) lost if we had used the GPS.", answer:["wouldn't have got","would not have got","wouldn't have gotten","would not have gotten"], why:"Conséquence passée imaginaire : wouldn't have + participe passé."},
     {type:"mcq", q:"If he weren't so shy, he ___ to her at the party last night.", options:["would speak","would have spoken","had spoken"], answer:1, why:"Trait de caractère présent, conséquence passée : would have + participe."},
     {type:"mcq", q:"Which sentence is correct?", options:["If I would have known, I would have helped.","If I had known, I would have helped.","If I knew, I would have help."], answer:1, why:"Jamais would après if : if + past perfect, would have + participe."}
   ]},

  {id:"g-b2-3", level:"B2", title:"Le discours indirect",
   explain:"<p>Pour rapporter des paroles après un verbe au passé (said, told, asked), on « recule » généralement d'un temps :</p><ul><li>présent → prétérit : <i>'I'm tired.' → She said she was tired.</i></li><li>prétérit / present perfect → past perfect : <i>'I saw it.' → He said he had seen it.</i></li><li>will → <b>would</b>, can → <b>could</b>, must → had to.</li></ul><p>Les repères changent aussi : today → that day, tomorrow → the next day, here → there.</p><p>Questions rapportées : ordre affirmatif, sans do / did ; <b>if / whether</b> pour les questions fermées : <i>She asked me where I lived. He asked if I was ready.</i></p><p class='tip'>Piège pour les francophones : <b>tell</b> est suivi d'une personne, <b>say</b> non. On dit <i>He told me</i> ou <i>He said (to me)</i>, jamais <i>He said me</i>. Et dans une question rapportée, pas d'inversion : <i>She asked where I worked</i>, pas <i>where did I work</i>.</p>",
   exercises:[
     {type:"mcq", q:"She ___ me she was tired.", options:["said","told","asked"], answer:1, why:"Tell est suivi directement d'une personne (told me)."},
     {type:"fill", q:"'I am busy.' → He said that he ___ busy.", answer:["was"], why:"Présent → prétérit au discours indirect."},
     {type:"mcq", q:"'Where do you work?' → She asked me where ___.", options:["did I work","I worked","do I work"], answer:1, why:"Question rapportée : ordre sujet + verbe, sans auxiliaire do."},
     {type:"fill", q:"'I will call you.' → She promised she ___ call me.", answer:["would"], why:"Will devient would au discours indirect."},
     {type:"mcq", q:"'Do you like jazz?' → He asked me ___ I liked jazz.", options:["that","if","what"], answer:1, why:"Question fermée rapportée : if (ou whether)."},
     {type:"fill", q:"'We saw the film.' → They said they ___ the film.", answer:["had seen","'d seen"], why:"Prétérit → past perfect au discours indirect."}
   ]},

  {id:"g-b2-4", level:"B2", title:"Les propositions relatives",
   explain:"<p>Pronoms relatifs : <b>who</b> (personnes), <b>which</b> (choses), <b>that</b> (personnes ou choses), <b>whose</b> (possession), <b>where</b> (lieu), <b>when</b> (temps).</p><ul><li><b>Relative déterminative</b> (indispensable au sens, sans virgule) : <i>The woman who lives next door is a pilot.</i> Le pronom peut être omis s'il est complément : <i>The book (that) I bought is great.</i></li><li><b>Relative explicative</b> (information en plus, entre virgules) : <i>My car, which is ten years old, still runs well.</i> Ici, <b>that</b> est interdit et le pronom ne s'omet jamais.</li></ul><p><i>That's the man whose car was stolen.</i></p><p class='tip'>Piège pour les francophones : « dont » n'a pas d'équivalent unique. « Le livre dont je t'ai parlé » = <i>the book (that) I told you about</i>, avec la préposition à la fin. Et jamais de <b>that</b> après une virgule : <i>My brother, who lives in Paris, …</i></p>",
   exercises:[
     {type:"mcq", q:"The woman ___ lives next door is a pilot.", options:["which","who","whose"], answer:1, why:"Pour une personne sujet du verbe : who."},
     {type:"mcq", q:"That's the man ___ car was stolen.", options:["who","whose","that"], answer:1, why:"Possession (sa voiture) : whose."},
     {type:"fill", q:"The hotel ___ we stayed was lovely.", answer:["where","in which"], why:"Pour un lieu : where (ou in which)."},
     {type:"mcq", q:"My car, ___ is ten years old, still runs well.", options:["that","which","what"], answer:1, why:"Relative explicative entre virgules : which, jamais that."},
     {type:"fill", q:"This is the book ___ I told you about.", answer:["that","which"], why:"Chose complément : that ou which (ou rien), avec la préposition à la fin."},
     {type:"mcq", q:"Which sentence is correct?", options:["My mother, that is a nurse, works nights.","My mother, who is a nurse, works nights.","My mother who is a nurse, works nights."], answer:1, why:"Information supplémentaire : deux virgules et who (pas that)."}
   ]},

  /* ===================== C1 ===================== */
  {id:"g-c1-1", level:"C1", title:"L'inversion emphatique",
   explain:"<p>Dans un registre soutenu, certaines expressions négatives ou restrictives placées en tête de phrase entraînent une <b>inversion auxiliaire + sujet</b>, comme dans une question :</p><ul><li><b>Never / Rarely / Seldom</b> : <i>Never have I seen such chaos.</i></li><li><b>Not only … but also</b> : <i>Not only does he speak French, but he also speaks Arabic.</i></li><li><b>No sooner … than / Hardly … when</b> : <i>No sooner had we sat down than the phone rang.</i></li><li><b>Only then / Only when / Not until</b>, <b>Under no circumstances</b>, <b>Little</b> : <i>Little did she know…</i></li></ul><p>Inversion conditionnelle (sans if) : <i>Had I known</i> (= if I had known), <i>Should you need help</i>, <i>Were I you</i>.</p><p class='tip'>Piège pour les francophones : on oublie l'auxiliaire. S'il n'y en a pas, il faut ajouter <b>do / does / did</b> : <i>Not only did he lie</i>, et non <i>Not only he lied</i>. Et <i>Never have I seen</i>, pas <i>Never I have seen</i>.</p>",
   exercises:[
     {type:"mcq", q:"Never ___ such a beautiful sunset.", options:["I have seen","have I seen","I saw"], answer:1, why:"Never en tête de phrase : inversion auxiliaire + sujet."},
     {type:"fill", q:"Not only ___ he speak French, but he also speaks Arabic.", answer:["does"], why:"Pas d'auxiliaire au présent simple : on ajoute does pour l'inversion."},
     {type:"mcq", q:"No sooner had we sat down ___ the phone rang.", options:["when","than","that"], answer:1, why:"La structure figée est no sooner … than."},
     {type:"fill", q:"___ I known about the problem, I would have acted sooner.", answer:["had"], why:"Inversion conditionnelle : Had I known = If I had known."},
     {type:"mcq", q:"Under no circumstances ___ the door be left open.", options:["should","you should","must you"], answer:0, why:"Inversion après under no circumstances : should + sujet (the door)."},
     {type:"mcq", q:"Little ___ that she was about to change his life.", options:["he knew","did he know","he did know"], answer:1, why:"Little en tête (sens négatif) : inversion avec did."}
   ]},

  {id:"g-c1-2", level:"C1", title:"Modaux de déduction et de regret au passé",
   explain:"<p>Structure : <b>modal + have + participe passé</b>.</p><ul><li><b>must have</b> : quasi-certitude : <i>The lights are off. They must have gone to bed.</i></li><li><b>can't / couldn't have</b> : impossibilité logique : <i>She can't have seen me; I was hiding.</i></li><li><b>might / may / could have</b> : possibilité : <i>He might have missed the bus.</i></li><li><b>should have / shouldn't have</b> : reproche, regret : <i>You should have told me!</i></li><li><b>needn't have</b> : action faite mais inutile : <i>You needn't have bought milk.</i> Comparez avec <b>didn't need to</b> : ce n'était pas nécessaire (et souvent pas fait).</li></ul><p class='tip'>Piège pour les francophones : « Il a dû oublier » (déduction) se dit <i>He must have forgotten</i>, pas <i>He had to forget</i> (obligation). Et le contraire de <b>must have</b> en déduction est <b>can't have</b>, pas <i>mustn't have</i>.</p>",
   exercises:[
     {type:"mcq", q:"The lights are off. They ___ gone to bed.", options:["must have","should have","can have"], answer:0, why:"Déduction quasi certaine au passé : must have + participe."},
     {type:"mcq", q:"She ___ have seen me — I was hiding behind the door.", options:["mustn't","can't","needn't"], answer:1, why:"Impossibilité logique au passé : can't have."},
     {type:"fill", q:"I'm not sure why he's late. He ___ have missed the bus.", answer:["might","may","could"], why:"Simple possibilité au passé : might / may / could have."},
     {type:"mcq", q:"'Il a dû se tromper' means: He ___ made a mistake.", options:["had to","must have","should have"], answer:1, why:"« A dû » de déduction = must have, pas had to (obligation)."},
     {type:"fill", q:"You ___ have bought milk — we already had two bottles. (it wasn't necessary)", answer:["needn't","need not"], why:"Action faite mais inutile : needn't have + participe passé."},
     {type:"mcq", q:"You ___ told me earlier! Now it's too late.", options:["should have","must have","might"], answer:0, why:"Reproche sur le passé : should have + participe."}
   ]},

  {id:"g-c1-3", level:"C1", title:"Wish, if only, it's time, would rather",
   explain:"<p>Pour exprimer un souhait irréel ou un regret, on « recule » d'un temps après <b>wish</b> et <b>if only</b> (plus fort) :</p><ul><li>Regret présent : <b>wish + prétérit</b> : <i>I wish I were taller. If only I had more time.</i></li><li>Regret passé : <b>wish + past perfect</b> : <i>I wish I had studied harder.</i></li><li>Agacement, souhait de changement chez autrui : <b>wish + would</b> : <i>I wish you would stop interrupting.</i></li></ul><p>Même logique après :</p><ul><li><b>It's (high) time + sujet + prétérit</b> : <i>It's time we left.</i></li><li><b>I'd rather + sujet + prétérit</b> : <i>I'd rather you didn't smoke here.</i></li></ul><p class='tip'>Piège pour les francophones : le conditionnel français pousse à écrire <i>I wish I would have known</i>. La forme correcte est <i>I wish I had known</i>. Et on n'utilise pas <i>I wish I would</i> pour soi-même : <i>I wish I could swim</i>.</p>",
   exercises:[
     {type:"mcq", q:"I wish I ___ taller.", options:["am","were","would be"], answer:1, why:"Souhait irréel sur le présent : wish + prétérit (were)."},
     {type:"fill", q:"I wish I ___ (study) harder when I was at university.", answer:["had studied","'d studied"], why:"Regret sur le passé : wish + past perfect."},
     {type:"mcq", q:"I wish you ___ interrupting me all the time!", options:["would stop","stopped","had stopped"], answer:0, why:"Agacement face au comportement d'autrui : wish + would."},
     {type:"fill", q:"It's high time we ___ (leave). It's nearly midnight.", answer:["left"], why:"Après it's (high) time + sujet, on utilise le prétérit."},
     {type:"mcq", q:"If only I ___ his advice last year!", options:["followed","had followed","would follow"], answer:1, why:"Regret sur le passé (last year) : if only + past perfect."},
     {type:"mcq", q:"I'd rather you ___ smoke in the car.", options:["don't","didn't","won't"], answer:1, why:"I'd rather + autre sujet : prétérit (didn't)."}
   ]},

  {id:"g-c1-4", level:"C1", title:"Les phrases clivées (mise en relief)",
   explain:"<p>Les <b>phrases clivées</b> permettent de mettre un élément en valeur, notamment à l'oral.</p><ul><li><b>It-cleft</b> : <b>It is / was + élément + that / who</b> : <i>It was John who broke the window, not Peter. It was in 2010 that we first met.</i></li><li><b>What-cleft</b> : <b>What + proposition + be + élément</b> : <i>What I need is a long holiday. What annoys me is his attitude.</i></li><li>Variantes : <b>All I want is…</b> (tout ce que je veux), <b>The reason why… is that…</b>, <b>The thing that… is…</b>, <b>What happened was (that)…</b></li></ul><p>Ces structures ajoutent de la nuance : contraste, insistance, ou mise en suspens de l'information importante.</p><p class='tip'>Piège pour les francophones : on calque « Ce que je ne comprends pas, c'est pourquoi… » en <i>What I don't understand, it's why…</i>. En anglais, pas de virgule ni de « it » : <i>What I don't understand is why he left.</i></p>",
   exercises:[
     {type:"mcq", q:"___ I need is a long holiday.", options:["That","What","Which"], answer:1, why:"Phrase clivée en what : What + proposition + is."},
     {type:"fill", q:"It ___ (be) John who broke the window yesterday, not Peter.", answer:["was"], why:"It-cleft au passé : It was + élément mis en relief."},
     {type:"mcq", q:"It was in 2010 ___ we first met.", options:["that","what","which"], answer:0, why:"Dans une it-cleft, l'élément mis en relief est suivi de that."},
     {type:"fill", q:"All I want ___ a bit of peace and quiet.", answer:["is"], why:"All I want = la seule chose que je veux : verbe au singulier."},
     {type:"mcq", q:"Which sentence is correct?", options:["What I don't understand, it's why he left.","What I don't understand is why he left.","What I don't understand is that why he left."], answer:1, why:"What-cleft : pas de virgule ni de « it », directement « is »."},
     {type:"mcq", q:"The reason ___ I called is that I need your help.", options:["why","because","what"], answer:0, why:"Structure figée : The reason why … is that …"}
   ]}
];
