import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ChevronDown, ExternalLink, FileText, FolderKanban, Github, Home, Mail, Phone } from 'lucide-react';
import { marked } from 'marked';
// 轻量 frontmatter 解析器（浏览器兼容）
function parseFrontmatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  if (!match) return { data: {}, content: text };
  const yaml = match[1];
  const content = text.slice(match[0].length).trim();
  const data = {};
  for (const line of yaml.split('\n')) {
    const idx = line.indexOf(':');
    if (idx === -1) continue;
    const key = line.slice(0, idx).trim();
    let val = line.slice(idx + 1).trim();
    // 解析 YAML 数组: [a, b, c]
    if (val.startsWith('[') && val.endsWith(']')) {
      val = val.slice(1, -1).split(',').map((s) => s.trim().replace(/^["']|["']$/g, ''));
    }
    // 解析数字
    else if (/^\d+$/.test(val)) {
      val = Number(val);
    }
    // 去除引号
    else {
      val = val.replace(/^["']|["']$/g, '');
    }
    data[key] = val;
  }
  return { data, content };
}

// 自动导入 docs 目录下所有 .md 文件
const docModules = import.meta.glob('./assets/docs/*.md', { query: '?raw', import: 'default', eager: true });

import moonIcon from '../source/moon_icon.11395d36.png';
import p59Object from '../source/p59_1.4659672e.png';
import legoIcon from '../source/lego_icon-1.703bb594.png';
import groupObject from '../source/Group_134-1.2e04f3ce.png';
import heroPortrait from '../source/Rectangle_40443.81459862.cutout.png';

const contacts = [
  { label: '19272704396', href: 'tel:19272704396', icon: Phone },
  { label: 'caixx0932@qq.com', href: 'mailto:caixx0932@qq.com', icon: Mail },
];

const aboutDecor = [
  {
    className: 'decor decor-moon',
    src: moonIcon,
  },
  {
    className: 'decor decor-left',
    src: p59Object,
  },
  {
    className: 'decor decor-lego',
    src: legoIcon,
  },
  {
    className: 'decor decor-right',
    src: groupObject,
  },
];

const heroPortraitUrl = heroPortrait;

const projects = [
  {
    number: '01',
    name: 'LocalUseFunasr',
    category: 'AI Tool / WebUI',
    href: 'https://github.com/CaiXinXiang/LocalUseFunasr',
    intro: '基于Funasr的本地语音识别 WebUI，支持中英文及中文部分方言，可进行音频上传、实时录音、模型选择、发言人分离、时间戳结果与 TXT 导出。',
    points: ['FunASR 本地部署', 'WebUI 流程设计', 'TXT 结构化导出'],
  },
  {
    number: '02',
    name: 'SauceDemo Test',
    category: 'Python / Selenium / Pytest',
    href: 'https://github.com/CaiXinXiang/test_for_saucedemo',
    intro: '基于SauceDemo电商演示站的自动化测试项目，覆盖登录、商品浏览、购物车和结算核心链路。',
    points: ['Page Object 重构', 'Excel 用例维护', '12 条核心脚本'],
  },
  {
    number: '03',
    name: 'PersonWebByCai',
    category: 'React / Vite / Framer Motion',
    href: 'https://github.com/CaiXinXiang/PersonWebByCai',
    intro: '基于 React + Vite 构建的个人作品集网站，展示个人项目、技术文档与联系方式，包含磁性交互、滚动动画与 Markdown 文档自动渲染等功能。',
    points: ['响应式动效设计', 'MD 文档自动发现', 'Framer Motion 交互'],
  },
];

const docItems = Object.entries(docModules)
  .map(([path, raw]) => {
    const { data, content } = parseFrontmatter(raw);
    const h1Match = content.match(/^#\s+(.+)$/m);
    const fallbackName = h1Match ? h1Match[1].replace(/[^\w\u4e00-\u9fff]/g, '').trim() : '';
    const fileName = path.split('/').pop().replace('.md', '');
    return {
      name: data.name || fallbackName || fileName,
      category: data.category || fileName,
      tags: data.tags || [],
      order: data.order ?? 999,
      raw: content,
    };
  })
  .sort((a, b) => a.order - b.order)
  .map((item, index) => ({
    ...item,
    number: String(index + 1).padStart(2, '0'),
  }));

function FadeIn({ children, delay = 0, duration = 0.7, x = 0, y = 30, className = '' }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x, y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: '50px', amount: 0 }}
      transition={{ delay, duration, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  );
}

function ContactButton({ onClick }) {
  return (
    <button className="contact-button" type="button" onClick={onClick}>
      Contact Me
      <ArrowUpRight size={18} />
    </button>
  );
}

function Magnet({ children, padding = 150, strength = 3 }) {
  const ref = useRef(null);
  const [style, setStyle] = useState({});

  const handleMouseMove = (event) => {
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const distanceX = event.clientX - centerX;
    const distanceY = event.clientY - centerY;
    const inside =
      event.clientX > rect.left - padding &&
      event.clientX < rect.right + padding &&
      event.clientY > rect.top - padding &&
      event.clientY < rect.bottom + padding;

    if (inside) {
      setStyle({
        transform: `translate3d(${distanceX / strength}px, ${distanceY / strength}px, 0)`,
        transition: 'transform 0.3s ease-out',
      });
    }
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: 'translate3d(0, 0, 0)',
      transition: 'transform 0.6s ease-in-out',
    });
  };

  return (
    <div ref={ref} className="magnet" style={style} onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave}>
      {children}
    </div>
  );
}

function HeroSection({ onContact }) {
  return (
    <section className="hero-3d" id="top">
      <FadeIn delay={0} y={-20}>
        <nav className="top-nav">
          <a href="#top">
            <Home size={20} />
            首页
          </a>
          <a href="#services">
            <FolderKanban size={20} />
            项目
          </a>
          <a href="#projects">
            <FileText size={20} />
            文档
          </a>
          <a href="https://github.com/CaiXinXiang" target="_blank" rel="noreferrer">
            <Github size={20} />
            GitHub
          </a>
        </nav>
      </FadeIn>

      <FadeIn delay={0.15} y={40} className="hero-title-wrap">
        <h1 className="hero-heading">Hi, I'm Caixx</h1>
      </FadeIn>

      <FadeIn delay={0.6} y={30} className="hero-portrait-shell">
        <div className="hero-portrait">
          <Magnet>
            <div className="creator-object">
              <div className="object-ring" />
              <img className="portrait-photo" src={heroPortraitUrl} alt="人物头像" />
              <div className="object-orbit one" />
              <div className="object-orbit two" />
            </div>
          </Magnet>
        </div>
      </FadeIn>


      <div className="hero-contact-bottom-right">
        <ContactButton onClick={onContact} />
      </div>
    </section>
  );
}
function AnimatedText({ text }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.2'] });

  return (
    <p className="animated-text" ref={ref}>
      {text.split('').map((char, index) => {
        if (char === ' ') return <span key={'sp-' + index} style={{display:'inline'}}> </span>;
        if (char === '\n') return <br key={'br-' + index} />;
        const start = index / text.length;
        const end = Math.min(1, start + 0.16);
        const opacity = useTransform(scrollYProgress, [start, end], [0.2, 1]);
        return (
          <motion.span className="char-real" style={{ opacity }} key={`${char}-${index}`}>
            {char}
          </motion.span>
        );
      })}
    </p>
  );
}

function AboutSection({ onContact }) {
  return (
    <section className="about-section" id="about">
      <div className="about-decor-wrap">
        {aboutDecor.map((item, index) => (
          <FadeIn key={item.className} delay={0.1 + index * 0.08} y={0} duration={0.6}>
            <img className={item.className} src={item.src} alt="" loading="lazy" />
          </FadeIn>
        ))}
      </div>
      <div className="about-content">
        <FadeIn y={40}>
          <h2 className="section-title hero-heading">关于我</h2>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <AnimatedText text="It's Thursday, KFC Crazy Thursday! V me 50, and I'll debug your whole life away. 
  日常跟代码打交道，习惯用 AI 工具提升效率。最大的乐趣是把脑子里一闪而过的念头，变成别人真能用的东西。把技术能做的事，翻译成普通人用得舒服的产品。AI 是加速器，代码是起点。
  养了一只电子龙虾，待投喂中。。。" />
        </FadeIn>
        <ContactButton onClick={onContact} />
      </div>
    </section>
  );
}
function ServicesSection() {
  return (
    <section className="services-section" id="services">
      <FadeIn>
        <h2>个人项目</h2>
      </FadeIn>
      <div className="service-list">
        {projects.map((project, index) => (
          <FadeIn delay={index * 0.1} key={project.name}>
            <article className="service-item">
              <span>{project.number}</span>
              <div>
                <h3>{project.name}</h3>
                <p>{project.intro}</p>
                <a className="project-inline-link" href={project.href} target="_blank" rel="noreferrer">
                  查看项目
                  <ArrowUpRight size={18} />
                </a>
              </div>
            </article>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

function DocAccordionCard({ item, isOpen, onToggle }) {
  const renderedHtml = useMemo(() => marked.parse(item.raw), [item.raw]);

  return (
    <div className={`doc-accordion-card${isOpen ? ' open' : ''}`}>
      <button className="doc-accordion-header" type="button" onClick={onToggle}>
        <span className="doc-accordion-number">{item.number}</span>
        <div className="doc-accordion-info">
          <p className="doc-accordion-category">{item.category}</p>
          <h3 className="doc-accordion-title">{item.name}</h3>
          {!isOpen && (
            <div className="doc-accordion-tags">
              {item.tags.map((tag) => (
                <span key={tag} className="doc-tag">{tag}</span>
              ))}
            </div>
          )}
        </div>
        <span className={`doc-accordion-arrow${isOpen ? ' rotated' : ''}`}>
          <ChevronDown size={28} />
        </span>
      </button>
      <div className="doc-accordion-collapse">
        <div className="doc-accordion-content">
          <div className="markdown-body" dangerouslySetInnerHTML={{ __html: renderedHtml }} />
        </div>
      </div>
    </div>
  );
}

function ProjectsSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="projects-stack" id="projects">
      <FadeIn>
        <h2 className="section-title hero-heading">文档</h2>
      </FadeIn>
      <div className="doc-accordion-list">
        {docItems.map((item, index) => (
          <DocAccordionCard
            key={item.name}
            item={item}
            isOpen={openIndex === index}
            onToggle={() => setOpenIndex(openIndex === index ? null : index)}
          />
        ))}
        <FadeIn delay={0.3}>
          <p className="doc-placeholder">
            — 等待作者更新 —
          </p>
        </FadeIn>
        </div>
    </section>
  );
}

function ContactModal({ onClose }) {
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const [copiedLabel, setCopiedLabel] = useState(null);

  const handleCopy = async (text, label) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch { /* noop */ }
    setCopiedLabel(label);
    setTimeout(() => setCopiedLabel(null), 1800);
  };

  return (
    <div className="contact-modal" role="dialog" aria-modal="true" aria-label="联系方式">
      <button className="modal-backdrop" type="button" aria-label="关闭联系方式" onClick={onClose} />
      <div className="modal-panel">
        <button className="modal-close" type="button" aria-label="关闭" onClick={onClose}>
          ×
        </button>
        <div className="modal-info">
          {contacts.map((item) => {
            const Icon = item.icon;
            return (
              <button className="copy-item" type="button" key={item.label} onClick={() => handleCopy(item.label, item.label)}>
                <span className="copy-bubble">
                  {copiedLabel === item.label ? '已复制 ✓' : '复制'}
                </span>
                <Icon size={18} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function App() {
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <main>
     <HeroSection onContact={() => setIsContactOpen(true)} />
     <AboutSection onContact={() => setIsContactOpen(true)} />
      <ServicesSection />
      <ProjectsSection />
      {isContactOpen && <ContactModal onClose={() => setIsContactOpen(false)} />}
    </main>
  );
}

export default App;

