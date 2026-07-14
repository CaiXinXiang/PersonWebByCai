import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowUpRight, ExternalLink, FileText, FolderKanban, Github, Home, Mail, Phone } from 'lucide-react';
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
];

const documents = [
  {
    number: '01',
    name: '部署说明',
    category: 'LocalUseFunasr Docs',
    href: 'https://github.com/CaiXinXiang/LocalUseFunasr',
    intro: '记录本地语音识别工具的环境准备、模型选择、WebUI 启动和常见问题处理路径。',
    points: ['环境搭建', '模型配置', '使用流程'],
  },
  {
    number: '02',
    name: '测试说明',
    category: 'SauceDemo Docs',
    href: 'https://github.com/CaiXinXiang/test_for_saucedemo',
    intro: '整理自动化测试项目的目录结构、用例设计、脚本执行方式和 Page Object 分层思路。',
    points: ['用例设计', '脚本执行', '架构说明'],
  },
  {
    number: '03',
    name: '能力文档',
    category: 'Portfolio Notes',
    href: '#about',
    intro: '沉淀个人项目背后的 AI 工具使用、自动化流程拆解和文档化交付方法。',
    points: ['AI 工具', '自动化流程', '文档交付'],
  },
];

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
        <h1 className="hero-heading">case web</h1>
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

      <div className="hero-bottom">
        <FadeIn delay={0.35} y={20}>
          <p className="hero-status">
            {/* <span>个人项目展示</span> */}
            {/* <span>
              求职中
              <i aria-hidden="true">...</i>
            </span> */}
          </p>
        </FadeIn>
        <FadeIn delay={0.5} y={20}>
          <ContactButton onClick={onContact} />
        </FadeIn>
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
          <h2 className="section-title hero-heading">About me</h2>
        </FadeIn>
        <AnimatedText text="我专注于用个人项目验证 AI 工具部署、自动化测试和流程文档化能力。通过 LocalUseFunasr 和 SauceDemo 自动化测试项目，把新工具跑通、把重复流程自动化、把使用说明写清楚。" />
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

function DocCard({ item, index, total }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.78', 'start 0.18'] });
  const targetScale = 1 - (total - 1 - index) * 0.055;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);
  const y = useTransform(scrollYProgress, [0, 1], [42, 0]);

  return (
    <motion.article
      className="stack-card"
      ref={ref}
      style={{
        top: `calc(76px + ${index * 34}px)`,
        zIndex: index + 1,
        scale,
        y,
      }}
    >
      <div className="stack-top">
        <span className="stack-number">{item.number}</span>
        <div>
          <p>{item.category}</p>
          <h3>{item.name}</h3>
        </div>
        <a className="live-button" href={item.href} target={item.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer">
          Read Docs
        </a>
      </div>
      <div className="stack-media">
        <div className="media-col small">
          <div>
            <strong>{item.points[0]}</strong>
          </div>
          <div>
            <strong>{item.points[1]}</strong>
          </div>
        </div>
        <div className="media-col large">
          <p>{item.intro}</p>
          <strong>{item.points[2]}</strong>
        </div>
      </div>
    </motion.article>
  );
}

function ProjectsSection() {
  return (
    <section className="projects-stack" id="projects">
      <FadeIn>
        <h2 className="section-title hero-heading">文档</h2>
      </FadeIn>
      <div className="stack-list">
        {documents.map((item, index) => (
          <DocCard item={item} index={index} total={documents.length} key={item.name} />
        ))}
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
