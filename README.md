# Storm Studio — Portfolio

Landing page dark cinematic para **Storm Studio**, estúdio de design de posts para Instagram baseado em Curitiba/PR.

## Stack

- HTML / CSS / JavaScript (standalone, sem framework)
- GSAP 3.12.2 (animações, ScrollTrigger, Draggable)
- Google Fonts (Playfair Display + Outfit)

## Funcionalidades

- Hero com vídeo de fundo e animação de letras
- Carousel peekaboo com drag, auto-advance, dots e zoom lightbox
- Seções: Trabalhos, Filosofia, Citação, Processo, Contato
- Responsivo (mobile-first com safe-area, tap targets 44px, touch-action)
- Fallbacks SVG caso as imagens não carreguem

## Como rodar

```bash
# Qualquer servidor estático funciona. Exemplo com Python:
python -m http.server 8080
```

Acesse `http://localhost:8080`.

## Estrutura

```
├── index.html          # Página única (HTML + CSS + JS inline)
├── assets/
│   ├── bg-video.mp4    # Vídeo hero
│   ├── carta-noturna.jpg
│   ├── linha-crua.jpg
│   ├── corpo-em-rito.jpg
│   ├── nexo-digital.jpg
│   ├── horizonte-vazio.jpg
│   └── pele-nua.jpg
└── README.md
```

## Licença

© 2026 Storm Studio. Todos os direitos reservados.
