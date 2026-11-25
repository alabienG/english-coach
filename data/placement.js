/* Placement (level) test: 6 questions per level, order = 2 grammar, 2 vocab, 1 reading, 1 listening */
window.PLACEMENT = [

  /* ===================== A1 ===================== */
  {id:"p-a1-1", level:"A1", skill:"grammar", q:"I ___ from France.", options:["am","is","are","be"], answer:0},
  {id:"p-a1-2", level:"A1", skill:"grammar", q:"___ she have any children?", options:["Do","Does","Is","Has"], answer:1},
  {id:"p-a1-3", level:"A1", skill:"vocab", q:"I'm hungry. Let's go to the ___.", options:["library","bank","station","restaurant"], answer:3},
  {id:"p-a1-4", level:"A1", skill:"vocab", q:"My mother's brother is my ___.", options:["cousin","nephew","uncle","grandfather"], answer:2},
  {id:"p-a1-5", level:"A1", skill:"reading",
   passage:"Hello, I'm Paul. I'm a waiter in a café in the city centre. I start work at 7 in the morning and finish at 3. After work, I go to the park with my dog. In the evening, I cook dinner and watch TV.",
   q:"What does Paul do after work?", options:["He cooks dinner","He goes to the park","He watches TV","He goes to a café"], answer:1},
  {id:"p-a1-6", level:"A1", skill:"listening",
   audio:"Excuse me, can I have a coffee and a glass of water, please?",
   q:"What does the speaker want?", options:["A tea and some water","Two coffees","A coffee and some water","A coffee and a sandwich"], answer:2},

  /* ===================== A2 ===================== */
  {id:"p-a2-1", level:"A2", skill:"grammar", q:"We ___ to the cinema last night.", options:["go","gone","went","were go"], answer:2},
  {id:"p-a2-2", level:"A2", skill:"grammar", q:"This hotel is ___ than the one we stayed in last year.", options:["more cheap","cheaper","cheapest","the cheaper"], answer:1},
  {id:"p-a2-3", level:"A2", skill:"vocab", q:"Can you ___ me your pen? I forgot mine.", options:["borrow","lend","take","give back"], answer:1},
  {id:"p-a2-4", level:"A2", skill:"vocab", q:"The shop is ___ on Sundays, so we can't buy anything.", options:["busy","empty","open","closed"], answer:3},
  {id:"p-a2-5", level:"A2", skill:"reading",
   passage:"Dear Ms Clark, your dentist appointment is on Thursday 14 June at 10.30. Please arrive ten minutes early to fill in a form. If you cannot come, please call us at least 24 hours before. If you do not call, we will charge you 20 pounds. Kind regards, Smile Dental Clinic.",
   q:"What happens if Ms Clark misses the appointment without calling?", options:["She gets a new appointment","She must fill in a form","She has to pay 20 pounds","She must arrive early next time"], answer:2},
  {id:"p-a2-6", level:"A2", skill:"listening",
   audio:"Hi, it's Mark. I'm sorry, but I can't meet you at six. My train is late. Can we meet at seven instead, at the same place?",
   q:"Why is Mark calling?", options:["To change the time of the meeting","To cancel the meeting","To change the meeting place","To ask about train times"], answer:0},

  /* ===================== B1 ===================== */
  {id:"p-b1-1", level:"B1", skill:"grammar", q:"I ___ here since 2018.", options:["work","am working","have worked","worked"], answer:2},
  {id:"p-b1-2", level:"B1", skill:"grammar", q:"If I ___ more money, I would buy a bigger flat.", options:["have","had","would have","will have"], answer:1},
  {id:"p-b1-3", level:"B1", skill:"vocab", q:"She's very ___: she always tells the truth.", options:["polite","generous","ambitious","honest"], answer:3},
  {id:"p-b1-4", level:"B1", skill:"vocab", q:"Could you ___ the music down? I'm trying to sleep.", options:["put","turn","take","get"], answer:1},
  {id:"p-b1-5", level:"B1", skill:"reading",
   passage:"Due to staff training, the library will close at 3 pm on Wednesday instead of the usual 8 pm. Online services, including e-book loans and renewals, will remain available as normal. Books due back on Wednesday may be returned on Thursday without a late fee. We apologise for any inconvenience.",
   q:"What can library users do on Wednesday evening?", options:["Return books at the library","Attend a training session","Pay late fees at a reduced rate","Borrow e-books online"], answer:3},
  {id:"p-b1-6", level:"B1", skill:"listening",
   audio:"I was going to take the job in Manchester, but in the end I decided to stay here. The salary was better, but I didn't want to move away from my family.",
   q:"What did the speaker decide?", options:["To accept the job in Manchester","To stay where they are","To ask for a higher salary","To move with their family"], answer:1},

  /* ===================== B2 ===================== */
  {id:"p-b2-1", level:"B2", skill:"grammar", q:"By the time we got to the cinema, the film ___.", options:["already started","has already started","had already started","was already starting"], answer:2},
  {id:"p-b2-2", level:"B2", skill:"grammar", q:"If she ___ the bus, she wouldn't have been late for the interview.", options:["hadn't missed","didn't miss","wouldn't have missed","hasn't missed"], answer:0},
  {id:"p-b2-3", level:"B2", skill:"vocab", q:"The meeting has been ___ until next week because the manager is ill.", options:["put out","put up","put off","put through"], answer:2},
  {id:"p-b2-4", level:"B2", skill:"vocab", q:"Which word is closest in meaning to 'reluctant' in: He was reluctant to sign the contract.", options:["eager","unwilling","unable","proud"], answer:1},
  {id:"p-b2-5", level:"B2", skill:"reading",
   passage:"Although remote work was initially presented as a temporary response to the pandemic, many firms have since made it permanent. Supporters argue that it widens the pool of potential employees, since companies are no longer restricted to candidates living within commuting distance. Yet some managers remain sceptical, claiming that innovation suffers when colleagues rarely meet in person. The evidence so far is mixed, and the debate is unlikely to be settled soon.",
   q:"What do the sceptical managers worry about?", options:["Higher office costs","Fewer job applicants","Less innovation","Longer working hours"], answer:2},
  {id:"p-b2-6", level:"B2", skill:"listening",
   audio:"To be honest, I would have gone to the conference if they hadn't moved it to the weekend. I really can't give up my Saturday at the moment.",
   q:"Why didn't the speaker go to the conference?", options:["It was too expensive","Nobody invited them","They forgot about it","It was moved to a weekend"], answer:3},

  /* ===================== C1 ===================== */
  {id:"p-c1-1", level:"C1", skill:"grammar", q:"Not until the following morning ___ the extent of the damage.", options:["we realised","did we realise","we did realise","had realised we"], answer:1},
  {id:"p-c1-2", level:"C1", skill:"grammar", q:"He ___ the message; otherwise he would have replied by now.", options:["must have received","mustn't have received","shouldn't have received","can't have received"], answer:3},
  {id:"p-c1-3", level:"C1", skill:"vocab", q:"The new policy has been widely criticised, but the government shows no sign of ___.", options:["backing up","setting off","backing down","standing out"], answer:2},
  {id:"p-c1-4", level:"C1", skill:"vocab", q:"Her argument was so ___ that nobody in the room could find a flaw in it.", options:["compulsory","compelling","complacent","compliant"], answer:1},
  {id:"p-c1-5", level:"C1", skill:"reading",
   passage:"The notion that multitasking makes us more productive has proved remarkably resilient, despite mounting evidence to the contrary. What we perceive as doing several things at once is, in most cases, rapid switching between tasks, each switch carrying a small but cumulative cost in attention. Paradoxically, those who multitask most heavily tend to rate their own ability to do so most highly, while performing worst on objective tests. The illusion, it seems, is self-reinforcing.",
   q:"What does the passage suggest about heavy multitaskers?", options:["They overestimate their ability to multitask","They are genuinely more efficient than others","They rarely switch between tasks","They outperform others on objective tests"], answer:0},
  {id:"p-c1-6", level:"C1", skill:"listening",
   audio:"Frankly, the proposal is not without its merits, but I would be hard pressed to justify the cost to the board at this stage. Let us revisit it once the quarterly figures are in.",
   q:"What is the speaker's position on the proposal?", options:["They reject it completely","They approve it immediately","They see some value but want to delay a decision","They think it is too cheap"], answer:2}
];
