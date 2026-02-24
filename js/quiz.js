/**
 * quiz.js — Quiz interaction, scoring, Brain Cells
 * BrainCells Course for Graham Brain
 */

(function() {
  'use strict';

  // Module quiz definitions
  const QUIZZES = {
    1: {
      title: 'Module 1 Quiz',
      questions: [
        {
          type: 'multiple',
          text: 'What\'s the key difference between an AI chatbot and an AI agent?',
          options: [
            'A chatbot answers questions; an agent takes actions and uses tools',
            'An agent is smarter than a chatbot',
            'Chatbots are older technology',
            'They are basically the same thing'
          ],
          correct: 0,
          feedback: {
            correct: '✅ Exactly right! It\'s not about intelligence — it\'s about the ability to ACT. Agents browse, write, execute, and report back.',
            incorrect: '❌ It\'s not about intelligence — the key difference is that an agent can USE TOOLS and take real actions, not just answer questions.'
          }
        },
        {
          type: 'multiple',
          text: 'What does it mean when we say an AI agent has "tools"?',
          options: [
            'The agent has a hammer and screwdriver',
            'Tools are capabilities: browsing the web, reading/writing files, sending messages, calling APIs',
            'The agent uses software like Photoshop',
            'Tools means the agent has plugins'
          ],
          correct: 1,
          feedback: {
            correct: '✅ Correct! Tools are actions the AI can perform. The more tools, the more powerful the agent.',
            incorrect: '❌ In agent terms, "tools" means actions the AI can take — like browsing websites, reading files, sending messages, or calling APIs.'
          }
        },
        {
          type: 'self',
          text: 'Name two things an AI marketing agent could realistically do this week.',
          placeholder: 'e.g., Research leads from LinkedIn, monitor competitor websites...',
          hint: 'Any two marketing tasks work! Lead research, competitor monitoring, email drafting, report generation, contact enrichment, social monitoring...',
          feedback: { correct: '✅ Great examples! Those are exactly the kinds of tasks your OpenClaw will handle.', incorrect: '' }
        },
        {
          type: 'multiple',
          text: 'Why is 2025–2026 a particularly important time to learn AI agents?',
          options: [
            'Because AI just became available in 2025',
            'AI models crossed a reliability threshold AND tools like OpenClaw made them accessible. Early adopters gain enormous advantage.',
            'Because it\'s the law now',
            'Because all competitors already use it'
          ],
          correct: 1,
          feedback: {
            correct: '✅ Right! The capability + accessibility combination creates a narrow window. You\'re in it right now.',
            incorrect: '❌ The right answer: AI models finally became reliable enough for real business use, AND accessible tools appeared. The early-adopter window is right now.'
          }
        },
        {
          type: 'multiple',
          text: 'Graham\'s last name is Brain. This is:',
          options: [
            'A coincidence',
            'Destiny',
            'A sign he will ace this course',
            'All of the above'
          ],
          correct: 3,
          allCorrect: true,
          feedback: {
            correct: '✅ 5 bonus Brain Cells awarded regardless of answer. It\'s literally impossible to get this wrong. 🧠',
            incorrect: '✅ 5 bonus Brain Cells awarded regardless! Your name is Brian. You were born for this.'
          }
        }
      ]
    },
    2: {
      title: 'Module 2 Quiz',
      questions: [
        {
          type: 'multiple',
          text: 'What\'s the key difference between traditional automation (Zapier) and AI-powered automation?',
          options: [
            'Zapier is free; AI automation costs money',
            'Traditional automation follows rigid rules and breaks when things change. AI automation handles variation, reads content, and makes contextual decisions.',
            'AI automation is slower than Zapier',
            'They work exactly the same way'
          ],
          correct: 1,
          feedback: {
            correct: '✅ Correct! Traditional tools follow rigid if/then rules. AI can reason, adapt, and handle edge cases.',
            incorrect: '❌ The key difference: traditional automation (Zapier) follows rigid rules and breaks when the world changes. AI automation can handle variation and make decisions.'
          }
        },
        {
          type: 'self',
          text: 'Name three marketing tasks that are perfect candidates for AI automation.',
          placeholder: 'e.g., Lead research, competitor monitoring, email drafting...',
          hint: 'Lead research, contact enrichment, competitor monitoring, social monitoring, follow-up scheduling, report generation, email drafting... any three work!',
          feedback: { correct: '✅ Perfect! Those are exactly the tasks your OpenClaw will handle.', incorrect: '' }
        },
        {
          type: 'multiple',
          text: 'What does "human in the loop" mean for marketing automation?',
          options: [
            'A human manually does all the work',
            'The AI does the research/drafting/processing, but a human reviews and approves before outputs are used',
            'There is no human — the AI does everything',
            'Humans and AI take turns'
          ],
          correct: 1,
          feedback: {
            correct: '✅ Exactly right! AI proposes, Graham decides. Start cautious, loosen as confidence grows.',
            incorrect: '❌ "Human in the loop" means the AI does the work, but you review outputs before they matter. AI proposes, you decide.'
          }
        },
        {
          type: 'multiple',
          text: 'If Graham spends 3 hours setting up an automation that saves 30 minutes per day, how many days until break-even?',
          options: [
            '3 days',
            '6 days',
            '10 days',
            '30 days'
          ],
          correct: 1,
          feedback: {
            correct: '✅ Correct! 3 hours ÷ 0.5 hours/day = 6 days. After that, it\'s pure time profit — ~180 hours saved per year. 🎉',
            incorrect: '❌ The math: 3 hours ÷ 30 minutes per day = 6 days. After that, every single day is pure profit.'
          }
        },
        {
          type: 'multiple',
          text: 'What is the "lever concept" in marketing automation?',
          options: [
            'A physical lever in the computer',
            'A one-time setup investment creates ongoing, compounding returns — you do the work once, it runs forever',
            'Automation that increases with volume',
            'A type of Zapier integration'
          ],
          correct: 1,
          feedback: {
            correct: '✅ Right! The lever = setup time. The output = forever. That\'s the magic.',
            incorrect: '❌ The lever concept: you invest time ONCE to set up the automation, and it delivers value every day after that, indefinitely.'
          }
        }
      ]
    },
    3: {
      title: 'Module 3 Quiz',
      questions: [
        {
          type: 'multiple',
          text: 'What does "self-hosted" mean, and why does it matter for Graham\'s marketing business?',
          options: [
            'You host dinner parties for your AI',
            'The software runs on Graham\'s own machine — client data stays private, never passes through a third-party server',
            'You pay for hosting separately',
            'Self-hosted means it\'s open source'
          ],
          correct: 1,
          feedback: {
            correct: '✅ Exactly! Self-hosted = your data, your rules. Client lists never touch Zapier\'s servers.',
            incorrect: '❌ Self-hosted means the software runs on YOUR machine, not a cloud server. Your client data never goes to a third party. Privacy by design.'
          }
        },
        {
          type: 'multiple',
          text: 'How do you interact with OpenClaw after it\'s set up?',
          options: [
            'You have to open a complicated dashboard every time',
            'You send messages from your phone (WhatsApp, Telegram) and OpenClaw works on your computer, then reports back',
            'You write code to trigger tasks',
            'You email OpenClaw'
          ],
          correct: 1,
          feedback: {
            correct: '✅ Yes! WhatsApp message from the beach → your computer does the work → you get results on your phone. That\'s the magic.',
            incorrect: '❌ You chat with OpenClaw just like messaging a person — WhatsApp, Telegram, Discord, iMessage. It\'s on your computer, you\'re on your phone.'
          }
        },
        {
          type: 'self',
          text: 'Name two ways OpenClaw is different from Zapier.',
          placeholder: 'e.g., Self-hosted vs cloud, AI-native vs rigid rules...',
          hint: 'Think: where data lives, how it handles decisions, whether it remembers context, how you interact with it...',
          feedback: { correct: '✅ Good! Those differences are exactly why OpenClaw is worth learning.', incorrect: '' }
        },
        {
          type: 'truefalse',
          text: 'OpenClaw requires you to be at your computer to use it.',
          correct: false,
          feedback: {
            correct: '✅ False! That\'s the whole point — you send messages from anywhere, OpenClaw works on your computer. WhatsApp from the beach, results to your phone.',
            incorrect: '❌ False. You send messages from your phone (WhatsApp/Telegram) from anywhere. OpenClaw works on your computer without you sitting there.'
          }
        },
        {
          type: 'multiple',
          text: 'Which of these can OpenClaw NOT do?',
          options: [
            'Browse websites',
            'Read your emails',
            'Make your coffee ☕',
            'Send you Telegram messages'
          ],
          correct: 2,
          feedback: {
            correct: '✅ Correct! OpenClaw cannot yet operate physical hardware. Give it time. 🦞',
            incorrect: '❌ The correct answer is C — making coffee. OpenClaw can\'t control physical devices... yet.'
          }
        }
      ]
    },
    4: {
      title: 'Module 4 Quiz',
      questions: [
        {
          type: 'multiple',
          text: 'If you want to change how your AI introduces itself in messages — which file do you edit?',
          options: [
            'MEMORY.md',
            'HEARTBEAT.md',
            'SOUL.md',
            'TOOLS.md'
          ],
          correct: 2,
          feedback: {
            correct: '✅ SOUL.md! That\'s the personality file. Tone, style, character — all in there.',
            incorrect: '❌ SOUL.md is the personality file — it controls HOW your AI talks, its character, and what it cares about.'
          }
        },
        {
          type: 'multiple',
          text: 'HEARTBEAT.md runs every:',
          options: [
            '5 minutes',
            '30 minutes (default, configurable)',
            'Once a day',
            'Whenever Graham sends a message'
          ],
          correct: 1,
          feedback: {
            correct: '✅ 30 minutes by default — configurable in gateway settings. Passive automation magic.',
            incorrect: '❌ HEARTBEAT.md is read every ~30 minutes by default. This is what makes passive automation possible — the AI checks in regularly without you having to ask.'
          }
        },
        {
          type: 'self',
          text: 'Graham\'s AI learns he never books meetings before 9am. Where should this preference go?',
          placeholder: 'Which file and why?',
          hint: 'MEMORY.md for long-term preferences, AGENTS.md for hard rules. Either is acceptable here!',
          feedback: { correct: '✅ Correct! MEMORY.md (preference) or AGENTS.md (hard rule) — both are valid.', incorrect: '' }
        },
        {
          type: 'multiple',
          text: 'You need to store your HubSpot API key so OpenClaw can access your CRM. Where does it go?',
          options: [
            'SOUL.md',
            'TOOLS.md',
            '~/.openclaw/ credentials folder or environment variable',
            'MEMORY.md'
          ],
          correct: 2,
          feedback: {
            correct: '✅ Correct! API keys and secrets NEVER go in workspace files. They go in the secure credentials system.',
            incorrect: '❌ API keys go in the secure credentials folder (~/.openclaw/) or environment variables. NEVER in the workspace files — those could end up in a git repo!'
          }
        },
        {
          type: 'multiple',
          text: 'Why does OpenClaw use plain text Markdown files instead of a complex database?',
          options: [
            'Because databases are expensive',
            'Transparency and simplicity — you can read, edit, and understand every aspect of your AI\'s configuration just by opening a text file',
            'Because Markdown was invented first',
            'It\'s just a design preference with no practical benefit'
          ],
          correct: 1,
          feedback: {
            correct: '✅ Exactly! Auditable, portable, no special software needed. You can understand your AI\'s entire brain in 5 minutes.',
            incorrect: '❌ The philosophy: transparency. Plain text files mean you can read, understand, and edit your AI\'s entire brain. No black boxes.'
          }
        }
      ]
    },
    5: {
      title: 'Module 5 Quiz',
      questions: [
        {
          type: 'multiple',
          text: 'What is the single most important security setting to configure after installation?',
          options: [
            'Choose a strong password',
            'The allowFrom list — which specifies which users can send commands to OpenClaw',
            'Enable two-factor authentication',
            'Install antivirus software'
          ],
          correct: 1,
          feedback: {
            correct: '✅ Correct! allowFrom is your first line of defense. Without it, anyone who discovers your bot could potentially send commands.',
            incorrect: '❌ The critical first step is setting up the allowFrom list — this limits who can control your OpenClaw to just your phone number/account.'
          }
        },
        {
          type: 'multiple',
          text: 'What port does OpenClaw\'s web dashboard run on by default?',
          options: [
            'Port 80',
            'Port 443',
            'Port 3000',
            'Port 18789'
          ],
          correct: 3,
          feedback: {
            correct: '✅ Port 18789! Bookmark: http://127.0.0.1:18789/ — your local control panel.',
            incorrect: '❌ OpenClaw\'s dashboard runs at http://127.0.0.1:18789/ — the port is 18789.'
          }
        },
        {
          type: 'self',
          text: 'Graham is choosing between a $799 Mac Mini M4 and staying on Windows. Name two reasons the Mac Mini might be worth it.',
          placeholder: 'e.g., iMessage support, simpler installation...',
          hint: 'Think: iMessage channel, installation simplicity, power efficiency (30W vs 150-300W), reliability, Mike endorses it...',
          feedback: { correct: '✅ Good reasons! The Mac Mini case is strong, especially for always-on automation servers.', incorrect: '' }
        },
        {
          type: 'multiple',
          text: 'Where should Graham\'s Anthropic API key be stored?',
          options: [
            'In SOUL.md for easy access',
            'In TOOLS.md since it\'s a tool',
            'In the OpenClaw credentials system (~/.openclaw/) or as an environment variable',
            'Written on a sticky note on his monitor'
          ],
          correct: 2,
          feedback: {
            correct: '✅ Correct! Never in workspace files — always in the secure credentials folder.',
            incorrect: '❌ API keys ALWAYS go in ~/.openclaw/ credentials or environment variables. Never in workspace files that might accidentally end up on GitHub.'
          }
        },
        {
          type: 'multiple',
          text: 'Your OpenClaw gateway is running. How do you verify it from your phone?',
          options: [
            'Check the Task Manager',
            'Send any message to your OpenClaw bot — if it responds, the gateway is working',
            'Check the Windows Services panel',
            'Open the terminal and check process list'
          ],
          correct: 1,
          feedback: {
            correct: '✅ Exactly! Send a message, get a response — that\'s the full verification. "Hello!" works fine.',
            incorrect: '❌ The simplest test: send your OpenClaw bot any message from your phone. If it responds, the gateway is running correctly.'
          }
        }
      ]
    },
    6: {
      title: 'Module 6 Quiz',
      questions: [
        {
          type: 'multiple',
          text: 'Graham set up a cron job for Monday mornings but it didn\'t run. What\'s the most likely issue?',
          options: [
            'His computer was off',
            'Timezone mismatch, gateway not running, or cron expression error',
            'OpenClaw doesn\'t support Monday',
            'He needs to restart his router'
          ],
          correct: 1,
          feedback: {
            correct: '✅ Right! Use `openclaw cron list` to check status and `openclaw cron run <id>` to force-test.',
            incorrect: '❌ Most likely: timezone mismatch (UTC vs local time), gateway not running, or wrong cron expression. Run `openclaw cron list` to debug.'
          }
        },
        {
          type: 'multiple',
          text: 'How does OpenClaw "pick up" changes to HEARTBEAT.md?',
          options: [
            'You have to restart the gateway',
            'You have to send a special command',
            'On the next heartbeat cycle (~30 min), the agent reads the current HEARTBEAT.md automatically',
            'Changes require a reboot'
          ],
          correct: 2,
          feedback: {
            correct: '✅ Correct! Just save the file and wait ~30 minutes. No restart needed.',
            incorrect: '❌ HEARTBEAT.md is read fresh every ~30 minutes. Just save your changes and the AI picks them up automatically on the next cycle.'
          }
        },
        {
          type: 'multiple',
          text: 'What\'s the difference between a "main session" and an "isolated session" cron job?',
          options: [
            'No difference — they do the same thing',
            'Main session uses the same context as your chats; isolated starts fresh with no prior context',
            'Isolated sessions cost more',
            'Main sessions run faster'
          ],
          correct: 1,
          feedback: {
            correct: '✅ Exactly! Main session shares history; isolated is a clean slate. Great for reporting tasks that shouldn\'t be influenced by prior chats.',
            incorrect: '❌ Main session = shares context with your regular conversations. Isolated = starts fresh each time. Use isolated for scheduled reports.'
          }
        },
        {
          type: 'self',
          text: 'Graham sends his bot "What\'s on my heartbeat checklist?" and gets a blank response. What might be wrong?',
          placeholder: 'What are the possible causes and fixes?',
          hint: 'HEARTBEAT.md might be empty, gateway hasn\'t read it yet, or try asking more specifically: "Please read your HEARTBEAT.md file and tell me what it contains."',
          feedback: { correct: '✅ Good troubleshooting! The file might be empty or the agent needs a more specific prompt.', incorrect: '' }
        },
        {
          type: 'multiple',
          text: 'What command lists all of Graham\'s current cron jobs?',
          options: [
            'openclaw jobs --list',
            'openclaw schedule view',
            'openclaw cron list',
            'openclaw timer show'
          ],
          correct: 2,
          feedback: {
            correct: '✅ `openclaw cron list` — your go-to for checking what\'s scheduled.',
            incorrect: '❌ The command is `openclaw cron list`. Memorize this one — you\'ll use it often.'
          }
        }
      ]
    },
    7: {
      title: 'Module 7 Quiz',
      questions: [
        {
          type: 'multiple',
          text: 'Graham wants to collect job titles and LinkedIn URLs for all speakers at a public conference. Is this generally appropriate to automate?',
          options: [
            'No, all web scraping is illegal',
            'Yes — publicly available business information is generally fine to research and automate',
            'Only if he asks each speaker for permission first',
            'Only if the conference allows it in writing'
          ],
          correct: 1,
          feedback: {
            correct: '✅ Correct! Publicly visible business information is generally fair game. Graham should still review before emailing and respect local privacy laws.',
            incorrect: '❌ Publicly available business information (speaker lists, job titles, LinkedIn profiles) is generally appropriate to research. Graham\'s rule: "If a human could look at this and write it down, my AI can too."'
          }
        },
        {
          type: 'multiple',
          text: 'What is "contact enrichment"?',
          options: [
            'Adding people to your contacts manually',
            'Taking an existing contact list and automatically researching to add more details — job titles, LinkedIn, company size, etc.',
            'Cleaning duplicate contacts',
            'A type of CRM feature'
          ],
          correct: 1,
          feedback: {
            correct: '✅ Right! Turning thin data (company names) into rich data (titles, LinkedIn, company size). Your AI does the research you\'d otherwise do manually.',
            incorrect: '❌ Contact enrichment = taking partial data (just company names) and automatically researching to add titles, LinkedIn profiles, company size, recent news. Making thin data rich.'
          }
        },
        {
          type: 'self',
          text: 'Graham sets up a competitor monitoring cron job. What\'s the ideal output format for the results?',
          placeholder: 'How should the results be presented?',
          hint: 'Short bullet-point summary, highlighting what CHANGED since last check, flagging anything significant. Not a wall of text.',
          feedback: { correct: '✅ Good format thinking! Actionable and concise is the goal.', incorrect: '' }
        },
        {
          type: 'self',
          text: 'Name two types of data Graham should NOT automate the collection of.',
          placeholder: 'e.g., Data behind login walls, personal data about private individuals...',
          hint: 'Think: data behind logins, personal (not business) data about private individuals, data violating Terms of Service, high-volume email scraping...',
          feedback: { correct: '✅ Correct! Those are exactly the categories to avoid.', incorrect: '' }
        },
        {
          type: 'multiple',
          text: 'After OpenClaw returns 50 enriched contacts, what\'s the right next step before importing to CRM?',
          options: [
            'Import everything immediately — the AI doesn\'t make mistakes',
            'Review the results — spot-check accuracy, remove non-qualifying entries, verify emails, ensure compliance',
            'Delete half of them randomly',
            'Forward to Mike for approval'
          ],
          correct: 1,
          feedback: {
            correct: '✅ Right! Always review before importing. AI can make mistakes. Human in the loop.',
            incorrect: '❌ Always review AI outputs before acting on them. Spot-check accuracy, remove anything that doesn\'t qualify, check compliance. AI proposes, Graham decides.'
          }
        }
      ]
    },
    8: {
      title: 'Module 8 Quiz',
      questions: [
        {
          type: 'multiple',
          text: 'How does OpenClaw "get smarter" about Graham\'s business over time?',
          options: [
            'It downloads updates automatically',
            'Through the memory system — MEMORY.md accumulates preferences, decisions, and business context that the AI reads each session',
            'Graham has to manually teach it every day',
            'It doesn\'t — it resets every session'
          ],
          correct: 1,
          feedback: {
            correct: '✅ Exactly! Week 1 it barely knows Graham. Month 3, it knows his clients, preferences, and workflow. Memory compounds.',
            incorrect: '❌ The memory system is the key. MEMORY.md accumulates important context over time. Each session, the AI reads it and becomes more effective. It gets better the longer Graham uses it.'
          }
        },
        {
          type: 'multiple',
          text: 'What\'s the difference between Graham\'s current single-agent setup and a multi-agent setup?',
          options: [
            'Multi-agent means using multiple AI companies',
            'Single agent = one AI handling everything; Multi-agent = multiple specialized AIs each with their own workspace and focus',
            'Multi-agent is faster',
            'There is no practical difference'
          ],
          correct: 1,
          feedback: {
            correct: '✅ Correct! Phase 2 vision: Marketing Agent + Research Agent + Content Agent. Each specialized, each excellent at its job.',
            incorrect: '❌ Single agent handles everything from one workspace. Multi-agent: separate specialized AIs — Marketing Agent, Research Agent, Content Agent — each with its own workspace and expertise.'
          }
        },
        {
          type: 'multiple',
          text: 'Graham wants his AI to always be formal, never use emojis, and end emails with a specific sign-off. Which file?',
          options: [
            'MEMORY.md',
            'HEARTBEAT.md',
            'SOUL.md',
            'TOOLS.md'
          ],
          correct: 2,
          feedback: {
            correct: '✅ SOUL.md! Personality, tone, communication style — it\'s all there.',
            incorrect: '❌ SOUL.md controls personality and communication style. That\'s where to set tone preferences, emoji policies, and sign-off templates.'
          }
        },
        {
          type: 'multiple',
          text: 'How often should Graham update OpenClaw itself?',
          options: [
            'Never — updates might break things',
            'Daily',
            'Approximately monthly: `npm install -g openclaw@latest`',
            'Every 6 months'
          ],
          correct: 2,
          feedback: {
            correct: '✅ Monthly-ish! `npm install -g openclaw@latest` — gets you new features and security patches.',
            incorrect: '❌ Approximately monthly with `npm install -g openclaw@latest`. Regular updates get you new features, bug fixes, and security patches without major breaking changes.'
          }
        },
        {
          type: 'multiple',
          text: 'Complete: "The biggest risk in automation is __________ before you trust the outputs."',
          options: [
            'Going too slow',
            'Over-automating — letting automations act on data without sufficient human review',
            'Not automating enough',
            'Telling people you use AI'
          ],
          correct: 1,
          feedback: {
            correct: '✅ Over-automating! Build trust first, then loosen the reins. Start with review → trust → automate fully.',
            incorrect: '❌ Over-automating. Set up automations that act or send without your review before you\'ve verified accuracy and reliability. Start cautious, scale confidence.'
          }
        }
      ]
    }
  };

  // ---- Quiz Engine ----

  class QuizEngine {
    constructor(moduleNum, container) {
      this.moduleNum = moduleNum;
      this.container = container;
      this.questions = QUIZZES[moduleNum].questions;
      this.answers = {};
      this.correct = 0;
      this.submitted = false;
      this.state = window.BrainCells.loadState();
    }

    render() {
      if (!this.container) return;

      // Check if already completed
      const mod = this.state.modules[String(this.moduleNum)];
      if (mod.quizScore !== null) {
        this.renderResult(mod.quizScore, mod.brainCellsEarned > 0, true);
        return;
      }

      const quiz = QUIZZES[this.moduleNum];
      let html = `
        <div class="quiz-container" id="quiz-${this.moduleNum}">
          <div class="quiz-header">
            <div class="quiz-header__title">🧠 ${quiz.title}</div>
            <div class="quiz-header__meta">
              <span>5 Questions</span>
              <span class="quiz-score-display">Score: <span class="quiz-score-num">0</span>/5</span>
              <span>Up to ${window.BrainCells.MODULE_CONFIG[this.moduleNum].quizCells} 🧠 Brain Cells</span>
            </div>
            <div class="quiz-progress-bar">
              <div class="quiz-progress-bar__fill" style="width:0%" id="quiz-prog-${this.moduleNum}"></div>
            </div>
          </div>
          <div class="quiz-body" id="quiz-body-${this.moduleNum}">
      `;

      this.questions.forEach((q, idx) => {
        html += this.renderQuestion(q, idx);
      });

      html += `
          </div>
          <div class="quiz-footer">
            <span class="text-muted text-sm">Answer all questions then submit</span>
            <button class="btn btn-primary" onclick="window.quizEngines[${this.moduleNum}].submit()" id="quiz-submit-${this.moduleNum}" disabled>
              Submit Quiz &amp; Earn Brain Cells 🧠
            </button>
          </div>
          <div class="quiz-result" id="quiz-result-${this.moduleNum}"></div>
        </div>
      `;

      this.container.innerHTML = html;
    }

    renderQuestion(q, idx) {
      const letters = ['A', 'B', 'C', 'D'];
      let inner = '';

      if (q.type === 'multiple' || q.type === 'truefalse') {
        const opts = q.type === 'truefalse' ? ['True', 'False'] : q.options;
        inner = `<div class="answer-options" id="opts-${this.moduleNum}-${idx}">`;
        opts.forEach((opt, oi) => {
          inner += `
            <button class="answer-option" 
              onclick="window.quizEngines[${this.moduleNum}].selectAnswer(${idx}, ${oi})"
              id="opt-${this.moduleNum}-${idx}-${oi}"
              aria-label="Option ${letters[oi]}: ${opt}">
              <span class="answer-option__letter">${q.type === 'truefalse' ? (oi === 0 ? 'T' : 'F') : letters[oi]}</span>
              <span>${opt}</span>
            </button>
          `;
        });
        inner += `</div>`;
      } else if (q.type === 'self') {
        inner = `
          <div>
            <textarea class="self-assess-input" 
              id="self-${this.moduleNum}-${idx}" 
              placeholder="${q.placeholder || 'Your answer here...'}"
              oninput="window.quizEngines[${this.moduleNum}].selfType(${idx}, this.value)"
            ></textarea>
            <div class="text-muted text-sm mb-md">💡 Hint: ${q.hint}</div>
            <div class="self-assess-btns">
              <button class="btn btn-sm btn-outline" onclick="window.quizEngines[${this.moduleNum}].selfMark(${idx}, true)">✅ I got it</button>
              <button class="btn btn-sm" style="background:#fee2e2;color:#c0392b;" onclick="window.quizEngines[${this.moduleNum}].selfMark(${idx}, false)">❌ Not quite</button>
            </div>
            <div class="answer-feedback" id="fb-${this.moduleNum}-${idx}"></div>
          </div>
        `;
      }

      return `
        <div class="question-card" id="qcard-${this.moduleNum}-${idx}">
          <div class="question-text">
            <span class="question-number">${idx + 1}</span>
            ${q.text}
          </div>
          ${inner}
          <div class="answer-feedback" id="fb-mc-${this.moduleNum}-${idx}"></div>
        </div>
      `;
    }

    selectAnswer(questionIdx, optionIdx) {
      if (this.submitted) return;
      const q = this.questions[questionIdx];

      // Clear previous selection
      document.querySelectorAll(`#opts-${this.moduleNum}-${questionIdx} .answer-option`).forEach(el => {
        el.classList.remove('selected');
      });

      // Select this one
      const el = document.getElementById(`opt-${this.moduleNum}-${questionIdx}-${optionIdx}`);
      if (el) el.classList.add('selected');

      this.answers[questionIdx] = optionIdx;
      this.updateProgress();
      this.checkSubmitReady();
    }

    selfType(questionIdx, value) {
      // Just track that they typed something
      if (value.trim().length > 3) {
        this.answers[questionIdx] = '__typed__';
        this.checkSubmitReady();
      } else {
        delete this.answers[questionIdx];
        this.checkSubmitReady();
      }
    }

    selfMark(questionIdx, correct) {
      this.answers[questionIdx] = correct ? '__correct__' : '__incorrect__';
      const fbEl = document.getElementById(`fb-${this.moduleNum}-${questionIdx}`);
      if (fbEl) {
        const q = this.questions[questionIdx];
        fbEl.className = 'answer-feedback ' + (correct ? 'correct' : 'incorrect');
        fbEl.textContent = correct ? q.feedback.correct : '❌ That\'s okay — the hint is there. Try again or continue.';
      }
      this.updateProgress();
      this.checkSubmitReady();
    }

    updateProgress() {
      const answered = Object.keys(this.answers).length;
      const pct = (answered / 5) * 100;
      const bar = document.getElementById(`quiz-prog-${this.moduleNum}`);
      if (bar) bar.style.width = pct + '%';
    }

    checkSubmitReady() {
      const answered = Object.keys(this.answers).length;
      const btn = document.getElementById(`quiz-submit-${this.moduleNum}`);
      if (btn) btn.disabled = answered < 5;
    }

    submit() {
      if (this.submitted) return;
      this.submitted = true;
      this.correct = 0;

      this.questions.forEach((q, idx) => {
        const ans = this.answers[idx];
        let isCorrect = false;

        if (q.type === 'multiple') {
          isCorrect = (ans === q.correct) || (q.allCorrect === true);
          const opts = document.querySelectorAll(`#opts-${this.moduleNum}-${idx} .answer-option`);
          opts.forEach((opt, oi) => {
            opt.classList.add('disabled');
            if (oi === q.correct) opt.classList.add('correct');
            if (oi === ans && !isCorrect) opt.classList.add('incorrect');
          });
        } else if (q.type === 'truefalse') {
          const correctIdx = q.correct === true ? 0 : 1;
          isCorrect = ans === correctIdx;
          const opts = document.querySelectorAll(`#opts-${this.moduleNum}-${idx} .answer-option`);
          opts.forEach((opt, oi) => {
            opt.classList.add('disabled');
            if (oi === correctIdx) opt.classList.add('correct');
            if (oi === ans && !isCorrect) opt.classList.add('incorrect');
          });
        } else if (q.type === 'self') {
          isCorrect = (ans === '__correct__' || ans === '__typed__');
        }

        if (isCorrect) this.correct++;

        // Show feedback
        const fbId = q.type === 'self' ? `fb-${this.moduleNum}-${idx}` : `fb-mc-${this.moduleNum}-${idx}`;
        const fbEl = document.getElementById(fbId);
        if (fbEl && q.type !== 'self') {
          fbEl.className = 'answer-feedback ' + (isCorrect ? 'correct' : 'incorrect');
          fbEl.textContent = isCorrect ? q.feedback.correct : q.feedback.incorrect;
        }
      });

      // Calculate cells
      const perQ = Math.floor(window.BrainCells.MODULE_CONFIG[this.moduleNum].quizCells / 5);
      const earned = this.correct * perQ;

      // Save to state
      this.state = window.BrainCells.loadState();
      const milestone = window.BrainCells.recordQuizComplete(this.state, this.moduleNum, this.correct, earned);

      // Update display
      window.BrainCells.updateBrainCellDisplay(this.state.brainCells);

      // Check if module should complete (3/5 threshold)
      if (this.correct >= 3) {
        const result = window.BrainCells.completeModule(this.state, this.moduleNum);
        window.BrainCells.updateSidebarStatus(this.state);
        window.BrainCells.updateProgressBars(this.state);

        // Show achievement
        const config = window.BrainCells.MODULE_CONFIG[this.moduleNum];
        if (config.achievement) {
          setTimeout(() => {
            window.showAchievement(config.achievement, this.state);
          }, 1000);
        }
      }

      // Show result
      this.renderResult(this.correct, earned, false);

      // Update submit button
      const btn = document.getElementById(`quiz-submit-${this.moduleNum}`);
      if (btn) {
        btn.textContent = 'Quiz Complete! ✅';
        btn.classList.remove('btn-primary');
        btn.classList.add('btn-outline');
        btn.disabled = true;
      }
    }

    renderResult(score, cells, isPrevious) {
      const resultEl = document.getElementById(`quiz-result-${this.moduleNum}`);
      if (!resultEl) return;

      const passed = score >= 3;
      const emoji = score === 5 ? '🏆' : passed ? '🎉' : '💪';
      const msg = score === 5 ? 'Perfect score! You\'re a natural Brain.' :
                  passed ? `${score}/5 — that\'s a pass! Brain Cells earned.` :
                  'Keep going — you can re-read the module and try again.';

      const cellsDisplay = isPrevious ? 
        `Previously earned Brain Cells for this module.` :
        `+${cells} 🧠 Brain Cells Earned!`;

      resultEl.innerHTML = `
        <div class="quiz-result show" style="padding:var(--space-2xl);text-align:center;">
          <div style="font-size:4rem;margin-bottom:1rem;">${emoji}</div>
          <div class="quiz-result__score">${score}/5</div>
          <div class="quiz-result__cells">${cellsDisplay}</div>
          <div class="quiz-result__message">${msg}</div>
          ${passed && !isPrevious ? `<a href="${this.getNextLink()}" class="btn btn-primary btn-lg">Continue →</a>` : ''}
        </div>
      `;
      resultEl.classList.add('show');
      resultEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }

    getNextLink() {
      const next = this.moduleNum + 1;
      if (next <= 8) return `../../module/${next}/`;
      return '../../progress.html';
    }
  }

  // Global quiz engine registry
  window.quizEngines = {};

  window.initQuiz = function(moduleNum) {
    const container = document.getElementById(`quiz-placeholder-${moduleNum}`);
    if (!container) return;
    const engine = new QuizEngine(moduleNum, container);
    window.quizEngines[moduleNum] = engine;
    engine.render();
  };

  // Export quiz data for potential external use
  window.QUIZ_DATA = QUIZZES;

})();
