/**
 * Coronas Fúnebres Cartagena - Sitio Web Oficial
 * Lógica e Interactividad de la Aplicación
 */

document.addEventListener('DOMContentLoaded', () => {
  // Enable progressive scroll reveal
  document.body.classList.add('js-enabled');

  // ==========================================================================
  // 1. MOBILE MENU TOGGLE
  // ==========================================================================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNav = document.getElementById('mobileNav');

  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', () => {
      const isActive = mobileMenuBtn.classList.toggle('active');
      mobileNav.style.display = isActive ? 'flex' : 'none';
    });

    // Close mobile menu when a link is clicked
    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('active');
        mobileNav.style.display = 'none';
      });
    });
  }


  // ==========================================================================
  // 2. CATALOG FILTERS
  // ==========================================================================
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Toggle active button class
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      productCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'flex';
          // Trigger slight fade-in animation
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transition = 'opacity 0.4s ease';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });


  // ==========================================================================
  // 3. RIBBON SIMULATOR (SIMULADOR DE CINTA FUNERARIA)
  // ==========================================================================
  const previewModel = document.getElementById('previewModel');
  const previewText = document.getElementById('previewText');
  const ribbonColorRadios = document.querySelectorAll('input[name="ribbonColor"]');
  const visualWreath = document.getElementById('visualWreath');
  const ribbonOverlay = document.getElementById('ribbonOverlay');
  const ribbonText = document.getElementById('ribbonText');
  const simuladorOrderBtn = document.getElementById('simuladorOrderBtn');

  function updateSimulator() {
    if (!visualWreath || !ribbonOverlay || !ribbonText) return;

    // 1. Update Wreath Image
    visualWreath.src = previewModel.value;

    // 2. Update Ribbon Text and Scale font size to fit ribbon bounds
    const text = previewText.value.trim();
    ribbonText.textContent = text || 'SU MENSAJE AQUÍ';

    const charCount = text.length || 15;
    if (charCount <= 22) {
      ribbonText.style.fontSize = '1.3rem';
      ribbonText.style.letterSpacing = '2px';
    } else if (charCount <= 38) {
      ribbonText.style.fontSize = '1.05rem';
      ribbonText.style.letterSpacing = '1px';
    } else if (charCount <= 52) {
      ribbonText.style.fontSize = '0.85rem';
      ribbonText.style.letterSpacing = '0.5px';
    } else {
      ribbonText.style.fontSize = '0.7rem';
      ribbonText.style.letterSpacing = '0px';
    }

    // 3. Update Ribbon Color Theme
    let selectedColor = 'white';
    for (let i = 0; i < ribbonColorRadios.length; i++) {
      if (ribbonColorRadios[i].checked) {
        selectedColor = ribbonColorRadios[i].value;
        break;
      }
    }

    // Reset ribbon classes
    ribbonOverlay.className = 'ribbon-overlay';
    
    // Add selected class
    if (selectedColor === 'white') {
      ribbonOverlay.classList.add('ribbon-white');
    } else if (selectedColor === 'purple') {
      ribbonOverlay.classList.add('ribbon-purple');
    } else if (selectedColor === 'black') {
      ribbonOverlay.classList.add('ribbon-black');
    }
  }

  // Bind Simulator Events in a bulletproof cross-browser way
  if (previewModel) previewModel.addEventListener('change', updateSimulator);
  if (previewText) previewText.addEventListener('input', updateSimulator);
  for (let i = 0; i < ribbonColorRadios.length; i++) {
    ribbonColorRadios[i].addEventListener('change', updateSimulator);
  }


  // ==========================================================================
  // 4. LIGHTBOX MODAL FOR CHAT SCREENSHOTS
  // ==========================================================================
  const lightboxModal = document.getElementById('lightboxModal');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const closeLightbox = document.getElementById('closeLightbox');

  if (lightboxModal && lightboxImg && lightboxCaption) {
    document.querySelectorAll('.chat-img-wrapper').forEach(wrapper => {
      wrapper.addEventListener('click', () => {
        const img = wrapper.querySelector('.chat-screenshot');
        const quote = wrapper.parentElement.querySelector('.chat-quote').textContent;
        const metaUser = wrapper.parentElement.querySelector('.chat-user').textContent;
        const metaDetails = wrapper.parentElement.querySelector('.chat-details').textContent;
        
        lightboxImg.src = img.src;
        lightboxCaption.innerHTML = `<strong>${metaUser}</strong> - ${metaDetails}<br><em style="color: #bbb; display:block; margin-top: 5px;">"${quote}"</em>`;
        lightboxModal.classList.add('active');
        document.body.style.overflow = 'hidden'; // Lock background scrolling
      });
    });

    if (closeLightbox) {
      closeLightbox.addEventListener('click', () => {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Unlock background scrolling
      });
    }

    lightboxModal.addEventListener('click', (e) => {
      if (e.target === lightboxModal) {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Unlock background scrolling
      }
    });
  }


  // ==========================================================================
  // 5. FAQ ACCORDION
  // ==========================================================================
  const accordionHeaders = document.querySelectorAll('.accordion-header');

  accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const content = header.nextElementSibling;
      const isOpen = item.classList.contains('active');

      // Close all other items
      document.querySelectorAll('.accordion-item').forEach(i => {
        i.classList.remove('active');
        i.querySelector('.accordion-content').style.maxHeight = null;
      });

      // Toggle current item
      if (!isOpen) {
        item.classList.add('active');
        content.style.maxHeight = content.scrollHeight + 'px';
      }
    });
  });


  // ==========================================================================
  // 6. WHATSAPP ORDER FORM MODAL LOGIC
  // ==========================================================================
  const orderModal = document.getElementById('orderModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalProductName = document.getElementById('modalProductName');
  const modalProductPrice = document.getElementById('modalProductPrice');
  const whatsappOrderForm = document.getElementById('whatsappOrderForm');
  const orderDateInput = document.getElementById('orderDate');

  // Set default date to today
  if (orderDateInput) {
    const today = new Date().toISOString().split('T')[0];
    orderDateInput.value = today;
    orderDateInput.min = today;
  }

  function openOrderModal(productName) {
    if (!orderModal) return;
    modalProductName.textContent = productName;
    modalProductPrice.textContent = 'Cotización Gratis';
    
    // If the simulator was used, prefill the sash text from the simulator
    const simulatorText = previewText ? previewText.value.trim() : '';
    const orderSashInput = document.getElementById('orderSashText');
    if (orderSashInput && simulatorText) {
      orderSashInput.value = simulatorText;
    }

    orderModal.classList.add('active');
    document.body.style.overflow = 'hidden'; // Lock background scrolling
  }

  function closeOrderModal() {
    if (!orderModal) return;
    orderModal.classList.remove('active');
    document.body.style.overflow = 'auto'; // Unlock background scrolling
  }

  // Bind order buttons in the catalog
  document.querySelectorAll('.btn-order').forEach(btn => {
    btn.addEventListener('click', () => {
      const pName = btn.getAttribute('data-name');
      openOrderModal(pName);
    });
  });

  // Bind simulator order button
  if (simuladorOrderBtn) {
    simuladorOrderBtn.addEventListener('click', () => {
      // Get selected product name from the select dropdown option text
      const selectedOption = previewModel.options[previewModel.selectedIndex];
      const pName = selectedOption.text;

      openOrderModal(pName);
    });
  }

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', closeOrderModal);
  }

  // Close modal when clicking outside content box
  if (orderModal) {
    orderModal.addEventListener('click', (e) => {
      if (e.target === orderModal) {
        closeOrderModal();
      }
    });
  }

  // Form submission: Generate WhatsApp message link
  if (whatsappOrderForm) {
    whatsappOrderForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const pName = modalProductName.textContent;
      const sender = document.getElementById('orderSender').value.trim();
      const sashText = document.getElementById('orderSashText').value.trim();
      const destination = document.getElementById('orderDestination').value.trim();
      const date = document.getElementById('orderDate').value;
      const time = document.getElementById('orderTime').value.trim();
      const notes = document.getElementById('orderNotes').value.trim();

      // Format date for easier reading (YYYY-MM-DD to DD/MM/YYYY)
      let formattedDate = date;
      try {
        const parts = date.split('-');
        if (parts.length === 3) {
          formattedDate = `${parts[2]}/${parts[1]}/${parts[0]}`;
        }
      } catch (err) {}

      // Build structured message
      let message = `*SOLICITUD DE COTIZACIÓN - CORONAS FÚNEBRES CARTAGENA*\n`;
      message += `--------------------------------------------------\n\n`;
      message += `🌸 *Producto a Cotizar:* ${pName}\n`;
      message += `👤 *Remitente:* ${sender}\n`;
      message += `🎗️ *Mensaje para la Cinta:* "${sashText}"\n`;
      message += `📍 *Lugar de Entrega:* ${destination}\n`;
      message += `📅 *Fecha de Entrega:* ${formattedDate}\n`;
      message += `⏰ *Hora Sugerida:* ${time}\n`;
      
      if (notes) {
        message += `✉️ *Notas adicionales:* ${notes}\n`;
      }
      
      message += `\n--------------------------------------------------\n`;
      message += `Hola, solicito cotización de este diseño con entrega a domicilio en Cartagena. Quedo atento a precios y medios de pago. ¡Muchas gracias!`;

      // Encode URL
      const encodedText = encodeURIComponent(message);
      const whatsappNumber = '573246614122'; // 3246614122 with country code 57
      const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedText}`;

      // Open in new tab
      window.open(whatsappUrl, '_blank');
      closeOrderModal();
    });
  }


  // ==========================================================================
  // 7. BACKGROUND PETALS ANIMATION EFFECT
  // ==========================================================================
  const petalContainer = document.getElementById('petalContainer');
  
  function createPetal() {
    if (!petalContainer) return;
    
    // Limit total number of active petals to avoid performance lag
    if (petalContainer.children.length > 25) return;

    const petal = document.createElement('div');
    petal.classList.add('petal');

    // Randomize petal type (white, slightly pinkish, slightly yellow)
    const petalType = Math.floor(Math.random() * 3);
    if (petalType === 1) {
      petal.style.background = 'linear-gradient(135deg, rgba(255, 230, 235, 0.7) 0%, rgba(255, 200, 210, 0.4) 100%)'; // Soft Pink Rose petal
    } else if (petalType === 2) {
      petal.style.background = 'linear-gradient(135deg, rgba(255, 253, 220, 0.6) 0%, rgba(240, 235, 180, 0.3) 100%)'; // Soft Yellow Chrysanthemum petal
    }

    // Random sizing
    const size = Math.random() * 12 + 8; // 8px to 20px
    petal.style.width = `${size}px`;
    petal.style.height = `${size}px`;

    // Random starting position (horizontal)
    petal.style.left = `${Math.random() * 100}%`;

    // Random animation duration and delay
    const duration = Math.random() * 6 + 7; // 7s to 13s
    const delay = Math.random() * 5; // 0s to 5s
    petal.style.animationDuration = `${duration}s, 4s`;
    petal.style.animationDelay = `${delay}s, 0s`;

    petalContainer.appendChild(petal);

    // Remove petal after animation finishes
    setTimeout(() => {
      petal.remove();
    }, (duration + delay) * 1000);
  }

  // Periodically generate petals
  if (petalContainer) {
    // Generate initial set
    for (let i = 0; i < 8; i++) {
      createPetal();
    }
    // Set interval for continuous generation
    setInterval(createPetal, 900);
  }


  // ==========================================================================
  // 9. CONDOLENCE PHRASE ASSISTANT TAGS
  // ==========================================================================
  const phraseTags = document.querySelectorAll('.phrase-tag');
  if (phraseTags.length > 0 && previewText) {
    phraseTags.forEach(tag => {
      tag.addEventListener('click', () => {
        const text = tag.getAttribute('data-phrase');
        previewText.value = text;
        updateSimulator();
      });
    });
  }


  // ==========================================================================
  // 10. INTERACTIVE FLOWER SYMBOLISM TABS
  // ==========================================================================
  const tabBtns = document.querySelectorAll('.f-tab-btn');
  const tabPanes = document.querySelectorAll('.f-tab-pane');

  if (tabBtns.length > 0) {
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from buttons and panes
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));

        // Add active class to clicked button
        btn.classList.add('active');
        
        // Find corresponding pane
        const targetTab = btn.getAttribute('data-tab');
        const targetPane = document.getElementById(`pane-${targetTab}`);
        if (targetPane) {
          targetPane.classList.add('active');
        }
      });
    });
  }


  // ==========================================================================
  // 11. REVEAL ON SCROLL (INTERSECTION OBSERVER)
  // ==========================================================================
  const revealElements = document.querySelectorAll('.reveal');
  if (revealElements.length > 0 && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target); // Only trigger once
        }
      });
    }, {
      threshold: 0.08,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));
  } else {
    // Fallback if IntersectionObserver is not supported
    revealElements.forEach(el => el.classList.add('active'));
  }

  // ==========================================================================
  // 12. INTERACTIVE DECISION ASSISTANT LOGIC
  // ==========================================================================
  const assistantButtons = document.querySelectorAll('.assistant-btn');
  const assistantResult = document.getElementById('assistantResult');

  const recommendations = {
    corazon: {
      title: 'Coronas en Forma de Corazón (Dignidad y Amor Familiar)',
      description: 'Recomendado para familiares directos, cónyuges, hijos, hermanos o amigos muy íntimos. El corazón representa el amor incondicional que trasciende la vida física, ofreciendo una calidez y cercanía únicas en momentos de profundo pesar.',
      img: './assets/corona-corazon-premium.png',
      productName: 'Corona Corazón Waira',
      category: 'corazon'
    },
    circular: {
      title: 'Coronas Circulares (Eternidad y Respeto Solemne)',
      description: 'Recomendado para amigos, compañeros de trabajo, vecinos o allegados de la familia. El círculo simboliza el ciclo infinito de la vida y el respeto imperecedero. Es la ofrenda tradicional por excelencia, sumamente distinguida y apropiada.',
      img: './assets/corona-circular-premium.png',
      productName: 'Corona Circular Clásica',
      category: 'circular'
    },
    pedestal: {
      title: 'Pedestales y Arreglos Cónicos (Luz y Respeto Corporativo)',
      description: 'Recomendado para empresas, instituciones o grupos de compañeros que desean expresar un pésame imponente. Los pedestales de pie aportan altura, luz y consuelo a las capillas y salas de velación, reflejando apoyo colectivo.',
      img: './assets/pedestal-floral-premium.png',
      productName: 'Pedestal Gerberas & Girasoles',
      category: 'pedestal'
    }
  };

  if (assistantButtons.length > 0 && assistantResult) {
    assistantButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Toggle active state
        assistantButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Render recommendation
        const key = btn.getAttribute('data-recommend');
        const rec = recommendations[key];
        
        if (rec) {
          assistantResult.innerHTML = `
            <div class="recommendation-result">
              <div class="recommendation-img-wrap">
                <img src="${rec.img}" alt="${rec.title}">
              </div>
              <div class="recommendation-info">
                <h4>${rec.title}</h4>
                <p>${rec.description}</p>
                <div class="recommendation-action-row">
                  <button class="btn btn-primary-sm btn-filter-go" data-category="${rec.category}" style="padding: 0.6rem 1.25rem;">
                    Ver Catálogo Filtrado
                  </button>
                  <button class="btn btn-outline-gold btn-order" data-name="${rec.productName}" style="padding: 0.6rem 1.25rem; font-size: 0.85rem;">
                    Cotizar Directo
                  </button>
                </div>
              </div>
            </div>
          `;

          // Re-bind click event to newly created cotizar button
          const newOrderBtn = assistantResult.querySelector('.btn-order');
          if (newOrderBtn) {
            newOrderBtn.addEventListener('click', () => {
              openOrderModal(rec.productName);
            });
          }

          // Bind filter scroll behavior to catalog button
          const filterGoBtn = assistantResult.querySelector('.btn-filter-go');
          if (filterGoBtn) {
            filterGoBtn.addEventListener('click', () => {
              // 1. Scroll to catalog
              const targetSec = document.getElementById('catalogo');
              if (targetSec) {
                targetSec.scrollIntoView({ behavior: 'smooth' });
              }

              // 2. Apply catalog filter
              const catFilterBtn = document.querySelector(`.filter-btn[data-filter="${rec.category}"]`);
              if (catFilterBtn) {
                catFilterBtn.click();
              }
            });
          }
        }
      });
    });
  }

  // Run initial simulator rendering
  updateSimulator();
});
