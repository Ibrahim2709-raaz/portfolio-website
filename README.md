# Ibrahim Salman — Personal Portfolio

A responsive, accessible portfolio that presents my software work through honest case studies and connects my technical practice with music, writing, and community work.

**Live site:** [ibrahim2709-raaz.github.io/portfolio-website](https://ibrahim2709-raaz.github.io/portfolio-website/)

## What the site includes

- A focused introduction and current learning goals
- Three verifiable project case studies
- Dedicated About, Projects, and Contact pages
- A working contact form powered by Web3Forms
- Keyboard-friendly navigation and visible focus states
- Reduced-motion support and responsive layouts
- Open Graph metadata, a favicon, sitemap, and robots file

## Built with

- Semantic HTML5
- Modern CSS with custom properties and responsive layouts
- Vanilla JavaScript
- GitHub Pages

The site intentionally has no JavaScript framework or build step. This keeps it fast, portable, and easy to inspect.

## Project structure

```text
portfolio-website/
├── About/about.html
├── Contact/contact.html
├── Projects/projects.html
├── images/
├── index.html
├── prototype.css
├── prototype.js
├── robots.txt
└── sitemap.xml
```

## Run locally

Clone the repository and serve it with any static file server:

```bash
git clone https://github.com/Ibrahim2709-raaz/portfolio-website.git
cd portfolio-website
python -m http.server 8000
```

Then open [http://localhost:8000](http://localhost:8000).

## Accessibility

The site uses semantic landmarks, labelled form controls, keyboard-accessible navigation, visible focus styles, descriptive image text, and a `prefers-reduced-motion` fallback.

## Author

[Ibrahim Salman](https://github.com/Ibrahim2709-raaz)

## License

Released under the [MIT License](LICENSE).
