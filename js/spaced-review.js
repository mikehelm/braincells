(function() {
  'use strict';

  const SEEN_KEY = 'bc_spaced_seen';

  const QUIZ_BANK = {
    1: [
      {
        id: 'm1_q_chatbot_vs_agent',
        question: 'What is the key difference between a chatbot and an AI agent?',
        answer: 'A chatbot answers questions; an agent can take actions using tools and complete multi-step tasks.'
      },
      {
        id: 'm1_q_tools',
        question: 'In agent terms, what are "tools"?',
        answer: 'Tools are capabilities like browsing the web, reading files, sending messages, and calling APIs.'
      },
      {
        id: 'm1_q_timing',
        question: 'Why is this period a major moment for learning AI agents?',
        answer: 'Models are now reliable enough for real work and tools like OpenClaw made agents practical to deploy.'
      }
    ],
    2: [
      {
        id: 'm2_q_ai_vs_automation',
        question: 'How is AI-powered automation different from traditional rule automation?',
        answer: 'Traditional automation is rigid. AI automation handles variation, reads context, and makes decisions.'
      },
      {
        id: 'm2_q_human_loop',
        question: 'What does "human in the loop" mean?',
        answer: 'AI does the heavy lifting, but a human reviews and approves outputs before important actions.'
      },
      {
        id: 'm2_q_lever',
        question: 'What is the automation "lever" idea?',
        answer: 'You invest setup effort once and receive ongoing time savings repeatedly afterward.'
      }
    ],
    3: [
      {
        id: 'm3_q_self_hosted',
        question: 'Why does "self-hosted" matter for marketing teams?',
        answer: 'OpenClaw runs on your own machine, so client and lead data stays under your control.'
      },
      {
        id: 'm3_q_channels',
        question: 'How do you usually interact with OpenClaw day to day?',
        answer: 'Through channels like WhatsApp or Telegram while OpenClaw works on your computer in the background.'
      },
      {
        id: 'm3_q_openclaw_diff',
        question: 'Give one way OpenClaw differs from ChatGPT alone.',
        answer: 'OpenClaw adds persistent memory, tool use, and automation workflows on your own machine.'
      }
    ],
    4: [
      {
        id: 'm4_q_soul',
        question: 'Which file controls the AI\'s personality and tone?',
        answer: 'SOUL.md.'
      },
      {
        id: 'm4_q_heartbeat',
        question: 'What role does HEARTBEAT.md play?',
        answer: 'It defines periodic check-ins that OpenClaw reviews automatically (about every 30 minutes by default).'
      },
      {
        id: 'm4_q_security',
        question: 'Where should API keys and secrets be stored?',
        answer: 'In secure credentials storage (for example ~/.openclaw or environment variables), not workspace files.'
      }
    ],
    5: [
      {
        id: 'm5_q_allowfrom',
        question: 'What is the most critical post-install security setting?',
        answer: 'Configure allowFrom so only authorized accounts can send commands to your OpenClaw.'
      },
      {
        id: 'm5_q_dashboard',
        question: 'What is the default local dashboard port?',
        answer: 'Port 18789.'
      },
      {
        id: 'm5_q_verify',
        question: 'What is a practical phone-based verification after setup?',
        answer: 'Send your bot a message and confirm it responds correctly.'
      }
    ],
    6: [
      {
        id: 'm6_q_cron_debug',
        question: 'If a cron job did not run, what should you check first?',
        answer: 'Timezone, gateway status, cron expression validity, and current job status via openclaw cron list.'
      },
      {
        id: 'm6_q_session_modes',
        question: 'How is a main session cron different from an isolated session cron?',
        answer: 'Main session shares existing context; isolated session starts fresh each run.'
      },
      {
        id: 'm6_q_cron_list',
        question: 'Which command lists scheduled cron jobs?',
        answer: 'openclaw cron list.'
      }
    ],
    7: [
      {
        id: 'm7_q_enrichment',
        question: 'What is contact enrichment?',
        answer: 'Expanding basic contact data with details like title, LinkedIn, company context, and relevance signals.'
      },
      {
        id: 'm7_q_review_outputs',
        question: 'What should you do before importing enriched leads into CRM?',
        answer: 'Review and spot-check for accuracy/compliance before taking downstream action.'
      },
      {
        id: 'm7_q_comp_monitoring',
        question: 'What is the best format for competitor monitoring updates?',
        answer: 'A concise bullet summary focused on changes since last check, not a long dump.'
      }
    ]
  };

  function getSeen() {
    try {
      const raw = localStorage.getItem(SEEN_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      return [];
    }
  }

  function setSeen(ids) {
    localStorage.setItem(SEEN_KEY, JSON.stringify(ids.slice(-30)));
  }

  function pickWarmupQuestions(moduleNum) {
    const pool = [];
    for (let i = 1; i < moduleNum; i++) {
      if (QUIZ_BANK[i]) pool.push.apply(pool, QUIZ_BANK[i]);
    }
    if (!pool.length) return [];

    const seen = getSeen();
    let fresh = pool.filter(q => !seen.includes(q.id));
    if (fresh.length < 2) fresh = pool.slice();

    const picked = [];
    while (fresh.length && picked.length < 2) {
      const idx = Math.floor(Math.random() * fresh.length);
      picked.push(fresh.splice(idx, 1)[0]);
    }

    if (picked.length < 2) {
      const remainder = pool.filter(q => !picked.some(p => p.id === q.id));
      while (remainder.length && picked.length < 2) {
        const idx = Math.floor(Math.random() * remainder.length);
        picked.push(remainder.splice(idx, 1)[0]);
      }
    }

    setSeen(seen.concat(picked.map(q => q.id)));
    return picked;
  }

  function buildWarmupCard(questions) {
    const wrapper = document.createElement('section');
    wrapper.className = 'callout callout-info spaced-review';
    wrapper.innerHTML = [
      '<div class="callout__icon">🧠</div>',
      '<div class="callout__body">',
      '<h3 class="spaced-review__title">Brain Warm-Up</h3>',
      '<p class="spaced-review__subtitle">Two quick recall prompts before you dive in. No grading, just sharpening.</p>',
      '<div class="spaced-review__list"></div>',
      '<div class="spaced-review__actions">',
      '<button type="button" class="btn btn-primary btn-sm" id="spaced-review-start">Start Module →</button>',
      '</div>',
      '</div>'
    ].join('');

    const list = wrapper.querySelector('.spaced-review__list');
    questions.forEach((q, idx) => {
      const item = document.createElement('div');
      item.className = 'spaced-review__item';
      item.innerHTML = [
        '<div class="spaced-review__q"><strong>Q' + (idx + 1) + '.</strong> ' + q.question + '</div>',
        '<button type="button" class="btn btn-outline btn-sm spaced-review__reveal">Reveal answer</button>',
        '<div class="spaced-review__answer" hidden>' + q.answer + '</div>'
      ].join('');

      const revealBtn = item.querySelector('.spaced-review__reveal');
      const answerEl = item.querySelector('.spaced-review__answer');
      revealBtn.addEventListener('click', () => {
        const isHidden = answerEl.hasAttribute('hidden');
        if (isHidden) {
          answerEl.removeAttribute('hidden');
          revealBtn.textContent = 'Hide answer';
        } else {
          answerEl.setAttribute('hidden', 'hidden');
          revealBtn.textContent = 'Reveal answer';
        }
      });

      list.appendChild(item);
    });

    wrapper.querySelector('#spaced-review-start').addEventListener('click', () => {
      wrapper.remove();
    });

    return wrapper;
  }

  function showSpacedReview(moduleNum) {
    if (!moduleNum || moduleNum < 2) return;
    const moduleBody = document.getElementById('module-body');
    if (!moduleBody) return;
    if (moduleBody.querySelector('.spaced-review')) return;

    const questions = pickWarmupQuestions(moduleNum);
    if (!questions.length) return;

    const warmup = buildWarmupCard(questions);
    const firstSection = moduleBody.querySelector('section, h1, h2, p, div');
    if (firstSection) {
      moduleBody.insertBefore(warmup, firstSection);
    } else {
      moduleBody.prepend(warmup);
    }
  }

  window.showSpacedReview = showSpacedReview;
  window.SPACED_QUIZ_BANK = QUIZ_BANK;
})();
