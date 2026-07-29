import { useEffect, useLayoutEffect, useState } from 'react'
import { createRoot } from 'react-dom/client'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowDownRight, ArrowUpRight, ArrowUp, Mail, Phone, Sparkles, PenTool, ChartNoAxesCombined, Layers3, Menu, X } from 'lucide-react'
import './styles.css'

const A = '/images/'
const covers = {
  ai: `${A}艾氪智能亮相世界金融论坛：产业 AI 正在走向全球产业舞台.png`,
  gongfeng: `${A}工程案例  光峰工程投影助力《如梦大同》，跨越千年入梦.jpg`,
  shantou: `${A}汕大印象丨想在春和景明时与你相见.jpg`,
  jova: `${A}JovaAI 不是多一个 AI 工具，而是一套 AI 原生经营系统.png`,
  activity: `${A}拉布布免费送！来青云，让学习充满惊喜！.png`,
  heritage: `${A}看见非遗  铁枝木偶：指尖上的非遗传奇.jpeg`,
  editorial: `${A}不正经优雅启示录.jpg`,
}

const nav = [['About', '经历'], ['Work', '精选案例'], ['Approach', '能力图谱'], ['Brand', '品牌产品'], ['Growth', '营销转化'], ['Stories', '活动与故事'], ['Other', '其他作品'], ['Contact', '联系我']]

const projects = [
  { no: '01', type: 'BRAND / AI', title: '艾氪智能亮相世界金融论坛', subtitle: '让产业 AI 走向全球产业舞台', image: covers.ai, link: 'https://mp.weixin.qq.com/s/eMYNxcvI7eHEag-tjIRPWg', role: '内容策划 · 文案主笔 · AI协同视觉', detail: '将 Agentic OS 等技术概念转译为产业端可感知的品牌价值，完成从行业趋势到战略意义的完整叙事。' },
  { no: '02', type: 'CASE / DISPLAY', title: '光峰工程投影 × 如梦大同', subtitle: '跨越千年入梦的沉浸式叙事', image: covers.gongfeng, link: 'https://mp.weixin.qq.com/s/Zhh3ECYX3Is3MHnnIT2Mbw', role: '内容编辑 · 视觉排版', detail: '以“沉浸演艺 + 技术赋能”为核心线索，让标杆工程案例兼具信息密度与画面感染力。' },
  { no: '03', type: 'EDITORIAL / CAMPUS', title: '汕大印象 · 春和景明', subtitle: '想在春和景明时与你相见', image: covers.shantou, link: 'https://mp.weixin.qq.com/s/7TOYFaJgk5KFD2lW6JsEvw', role: '项目统筹 · 文案主创 · 摄影统筹', detail: '从主题定调到拍摄协同，以“春日相见”的情绪主线完成一篇有人文温度的官方内容。' },
]

const abilities = [
  { icon: PenTool, no: '01', title: '内容策划', text: '从用户痛点、行业趋势与品牌目标出发，搭建有方向、有节奏的选题体系。', tags: ['选题体系', '叙事结构', '调性适配'] },
  { icon: Layers3, no: '02', title: '内容生产', text: '文字、版式与视觉协同推进，把复杂信息转化成易读、有质感的传播表达。', tags: ['品牌长文', '图文排版', 'AI视觉'] },
  { icon: ChartNoAxesCombined, no: '03', title: '增长转化', text: '以内容设计传播链路，在阅读、分享与行动之间建立更自然的连接。', tags: ['转化文案', '私域承接', '数据复盘'] },
  { icon: Sparkles, no: '04', title: '项目统筹', text: '在多人协作与快速节点里守住内容质量，让每一次发布都准时、完整。', tags: ['团队协作', '节点传播', '内容审核'] },
]

const collections = [
  { id: 'brand', index: '04', eyebrow: 'BRAND & PRODUCT', title: <>品牌与<span>产品内容</span></>, description: '面向产业级 AI 与激光显示两类科技赛道，把专业业务逻辑、产品价值和品牌调性转译成清晰可信的公众号内容。', groups: [
    { title: '艾氪智能 · 产业 AI 内容', note: '内容策划｜品牌文案｜AI 辅助创作｜视觉协同', summary: '产业级 AI 企业，聚焦 Agentic OS、企业智能体和 AI 原生经营系统，服务制造业、供应链、外贸等 ToB 场景。我的工作是快速吃透陌生业务逻辑，将技术概念转译为企业经营价值，在专业、前沿、可信赖的官方调性下完成内容全链路生产。', skills: ['快速拆解产业 AI / 企业智能体业务逻辑', '提炼差异化产品卖点与品牌叙事', 'AI 工具协同选题、文案、配图生产', '把控科技公众号官方调性'], items: [
      { image: covers.jova, tag: '产品定位解读', title: 'JovaAI：不是多一个 AI 工具，而是一套 AI 原生经营系统', link: 'https://mp.weixin.qq.com/s/wjfRQ61SaVwc-Db3bpNP8w' },
      { image: `${A}supplement/image3.png`, tag: '产业智能体内容', title: '艾氪智能，要做 ToB 世界的产业智能体电网', link: 'https://mp.weixin.qq.com/s/ANeoXYfHjgC_PHEdlYesdA' },
      { image: `${A}supplement/image5.png`, tag: '产业 AI 观点解读', title: '产业级 Agent 的真正门票：把千场定制熬成 ICB', link: 'https://mp.weixin.qq.com/s/JvtIaf7QDQEka1wsBJTqqA' },
    ]},
    { title: '光峰科技 · 产品案例内容', note: '产品宣传策划｜图文排版｜案例包装', summary: '科创板上市激光显示科技企业，业务覆盖工程投影、文旅演艺、展馆展厅与城市地标等专业场景。围绕产品案例与场景化内容，用更直观的表达帮助行业客户理解技术价值与落地效果。', skills: ['快速理解激光显示与工程投影专业场景', '将产品参数转化为场景体验和客户价值', '通过图文节奏与排版强化产品展示效果'], items: [
      { image: `${A}走进光影  当舞台遇见投影：那些让演出“破次元”的光影魔法.jpg`, tag: '场景化内容', title: '走进光影｜当舞台遇见投影：那些让演出“破次元”的光影魔法', link: 'https://mp.weixin.qq.com/s/t5WSJJUbGipuYBrItdNeY' },
      { image: `${A}supplement/image1.jpg`, tag: '文旅工程案例', title: '大运扬州：古运河上的夜游光影体验', link: 'https://mp.weixin.qq.com/s/RrZxa8EDnGI6dKrEN1Jrxg' },
      { image: `${A}supplement/image2.jpg`, tag: '文旅工程案例', title: '长征：沉浸式情景音舞史诗', link: 'https://mp.weixin.qq.com/s/g4MUSKlnTGJTW4DqDhm4Og' },
    ]},
  ]},
  { id: 'growth', index: '05', eyebrow: 'GROWTH & CONVERSION', title: <>营销与<span>转化内容</span></>, description: '从曝光到行动：以信任型内容、裂变活动和私域承接，让内容成为可追踪的业务结果。', metrics: ['课程转化 300+ 单', '私域引流近千人', '报课率提升 23%', '用户故事成交 100+ 单'], groups: [
    { title: '青云教育 · 教培转化内容', note: '公众号内容主创｜视觉物料设计｜暑期报名人数增长 40%', summary: '锚定高中生与家长的核心决策点，打造「信任型 + 裂变型 + 招聘型」多元转化内容，联动私域完成招生增长。累计转化课程报名 300+ 单，报课率提升 23%。', skills: ['拆解师资、班型、本地化服务卖点', '用热点 IP 设计低门槛裂变规则', '以年轻化语态缩短招聘转化链路'], compact: true, items: [
      { image: `${A}青云招生｜学霸养成计划之高分修炼秘籍.jpg`, tag: '招生转化文', title: '学霸养成计划之高分修炼秘籍', link: 'https://mp.weixin.qq.com/s/zu5xOX3QJL1JEnWBgMClbQ' },
      { image: covers.activity, tag: '裂变活动文', title: '拉布布免费送！来青云，让学习充满惊喜！', link: 'https://mp.weixin.qq.com/s/hkbSoTrVMOpMhuDbtInLUw' },
      { image: `${A}青云教育，职等你来！.png`, tag: '雇主品牌文', title: '青云教育，职等你来！', link: 'https://mp.weixin.qq.com/s/oLjduE_tSPrkJedrZwMLcQ' },
    ]},
    { title: '橄榄医疗 · 大健康内容运营', note: '公众号内容运营｜私域内容策划｜从 0 搭建健康科普内容矩阵', summary: '从 0 搭建健康科普、用户故事、企业服务三大内容方向，测试爆款选题并打通「内容引流—私域转化」链路。以内容与裂变组合打法，实现私域用户新增近千人，用户故事类内容带来 100+ 单成交。', skills: ['围绕企业体检痛点包装服务价值', '文末植入测评工具承接有效留资', '验证真实经历分享为爆款选题方向'], compact: true, items: [
      { image: `${A}橄榄医疗  创新企业健康管理，打造员工健康新生态.png`, tag: '企业服务宣传', title: '创新企业健康管理，打造员工健康新生态', link: 'https://mp.weixin.qq.com/s/pp_ycSlotS6PChfUVF9K2g' },
      { image: `${A}橄榄枝健康企业logo.jpg`, tag: '内容体系搭建', title: '健康科普 × 用户故事 × 企业服务内容矩阵', link: null },
    ]},
  ]},
  { id: 'stories', index: '06', eyebrow: 'ACTIVITY & STORIES', title: <>活动传播与<span>人物故事</span></>, description: '既能覆盖预热、现场、回顾的节点传播，也能深入人物与非遗现场，把真实细节组织成有温度的内容。', groups: [
    { title: '大型活动整合传播', note: '活动预热策划｜现场实时采编｜多团队协作｜图文整合呈现', items: [
      { image: `${A}解锁新身份！遇见无数可能性的未来.jpg`, tag: '新生入学季', title: '解锁新身份！遇见无数可能性的未来', link: 'https://mp.weixin.qq.com/s/u4suKbumPMUkfSrcKrrUSQ' },
      { image: `${A}邀你来看校运会，Passion！.jpg`, tag: '赛事活动', title: '邀你来看校运会，Passion！', link: 'https://mp.weixin.qq.com/s/LrGZzUr5sYLYvWfDWnh0UA' },
      { image: `${A}感恩有您，一路同行！.jpg`, tag: '教师节专题', title: '感恩有您，一路同行！', link: 'https://mp.weixin.qq.com/s/_pvqkXmGJpmWi18qNU1GcA?scene=1' },
      { image: `${A}这一槌，把“非遗名片”打出来了.png`, tag: '文化活动', title: '这一槌，把“非遗名片”打出来了', link: 'https://mp.weixin.qq.com/s/SSelDBKqQP4BBH6ds6A0Pg' },
    ]},
    { title: '人物与故事内容', note: '采访提纲设计｜故事细节挖掘｜人物形象塑造｜长文结构把控', items: [
      { image: covers.heritage, tag: '非遗人物纪实', title: '看见非遗｜铁枝木偶：指尖上的非遗传奇', link: 'https://mp.weixin.qq.com/s/ug_WY-IIDBjBfuYK9ZQ3CQ' },
      { image: `${A}看见非遗  潮州木雕：方家有神技，大匠无弃材.png`, tag: '非遗人物纪实', title: '看见非遗｜潮州木雕：方家有神技，大匠无弃材', link: 'https://mp.weixin.qq.com/s/Io4uDqY47YvKdabImabG_A' },
      { image: `${A}新生特辑  山海仍有新秋 青春没有定义.jpg`, tag: '青春人物故事', title: '新生特辑｜山海仍有新秋 青春没有定义', link: 'https://mp.weixin.qq.com/s/9UWs3Dm-WGWxg5K_6ToSMQ' },
      { image: `${A}creative-escape.png`, tag: '创意视觉专题', title: '“不正经”优雅启示录', link: 'https://mp.weixin.qq.com/s/EnCEEtvV4001lqarOrE9sw' },
    ]},
  ]},
]

const extraWorks = [
  { image: `${A}AI教母李飞飞未来十年职场只剩两类人.png`, type: '企业视频 · 艾氪智能', title: 'AI教母李飞飞：未来十年职场只剩两类人', link: 'https://weixin.qq.com/sph/A9LjQ0Hcpp' },
  { image: `${A}YC内部AI实操如何让AI从助手进化到大脑”.png`, type: '企业视频 · 艾氪智能', title: 'YC内部AI实操：如何让AI从助手进化到“大脑”', link: 'https://weixin.qq.com/sph/AYu6wXojfn' },
  { image: `${A}泰顺画中游.png`, type: '企业视频 · 光峰科技', title: '泰顺画中游', link: 'https://weixin.qq.com/sph/AaXPLDujGn' },
  { image: `${A}光影载道，瓷上中国.png`, type: '企业视频 · 光峰科技', title: '光影载道，瓷上中国', link: 'https://weixin.qq.com/sph/AO31dXTFhR' },
]

const socialWorks = [
  { title: '言叶之庭电影感', platform: '抖音短视频', image: `${A}doc-media/image1.png`, link: 'https://v.douyin.com/jWAJx6z6HUY/' }, { title: '高考祝福', platform: '抖音短视频', image: `${A}doc-media/image2.png`, link: 'https://v.douyin.com/uyjXVesK2SA/' }, { title: '鱼跃龙门', platform: '抖音短视频', image: `${A}doc-media/image3.png`, link: 'https://v.douyin.com/h1_RTm7P25c/' }, { title: '毕业季转场', platform: '抖音短视频', image: `${A}doc-media/image4.png`, link: 'https://v.douyin.com/YnF79YQpIws/' }, { title: '希区柯克式变焦', platform: '抖音短视频', image: `${A}doc-media/image5.png`, link: 'https://v.douyin.com/n4QcwmjWZw4/' }, { title: '校园与世纪晚霞', platform: '抖音短视频', image: `${A}doc-media/image6.png`, link: 'https://v.douyin.com/NDHXjEH3AUc/' }, { title: '校园热点内容', platform: '官方微博', image: `${A}doc-media/image7.png`, link: 'https://weibo.com/2413579830/5025205091041562' }, { title: '校园日常内容', platform: '官方微博', image: `${A}doc-media/image8.png`, link: 'https://weibo.com/2413579830/5023025225270494' }, { title: '校园专题内容', platform: '官方微博', image: `${A}doc-media/image9.png`, link: 'https://weibo.com/2413579830/4837502789094550' },
]

const experiences = [
  { date: '2022.10 — 至今', logo: `${A}shantou-university-logo.png`, name: '汕头大学党委宣传统战部', role: '官方公众号 · 校报中心', result: '统筹 40 人校园内容团队，覆盖公众号、校报与活动传播；累计内容阅读 40 万+、粉丝净增 6 万+。', skills: ['内容全案统筹', '大型活动传播', '采编与审核'] },
  { date: '2023.06 — 2023.09', logo: `${A}青云教育企业logo.jpg`, name: '青云教育', role: '教培内容营销', result: '围绕招生、裂变与招聘三类场景打造转化内容，累计课程转化 300+ 单，报课率提升 23%。', skills: ['转化型文案', '私域引流', '营销节点'] },
  { date: '2024.06 — 2024.08', logo: `${A}橄榄枝健康企业logo.jpg`, name: '深圳橄榄枝健康', role: '大健康内容运营', result: '从 0 搭建健康科普、用户故事、企业服务内容矩阵，组合打法新增私域用户近千人。', skills: ['内容体系搭建', '用户洞察', '数据复盘'] },
  { date: '2025.06 — 2025.09', logo: `${A}光峰科技企业logo.jpg`, name: '深圳光峰科技股份有限公司', role: '产品案例内容', result: '拆解激光显示与文旅工程场景，用产品案例包装和图文排版强化专业内容的传播力。', skills: ['复杂产品转译', '案例包装', '视觉排版'] },
  { date: '2026.06 — 2026.07', logo: `${A}艾氪智能企业logo.jpg`, name: '深圳艾氪未来人工智能', role: '产业 AI 品牌内容', result: '完成产业 AI 品牌节点与产品解读内容，将技术概念转化为企业经营价值和品牌表达。', skills: ['B端品牌文案', '科技内容策划', 'AI 协同创作'] },
]

function metricGlow(event) {
  if (window.innerWidth <= 900) return
  const card = event.target.closest('.metrics > div')
  if (!card) return
  const rect = card.getBoundingClientRect()
  card.style.setProperty('--glow-x', `${((event.clientX - rect.left) / rect.width) * 100}%`)
  card.style.setProperty('--glow-y', `${((event.clientY - rect.top) / rect.height) * 100}%`)
  card.style.setProperty('--glow-intensity', '1')
  gsap.to(card, { x: (event.clientX - rect.left - rect.width / 2) * .035, y: (event.clientY - rect.top - rect.height / 2) * .035, duration: .35, ease: 'power3.out', overwrite: true })
}

function clearMetricGlow(event) {
  event.currentTarget.querySelectorAll(':scope > div').forEach(card => {
    card.style.setProperty('--glow-intensity', '0')
    gsap.to(card, { x: 0, y: 0, duration: .65, ease: 'power3.out', overwrite: true })
  })
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [atTop, setAtTop] = useState(true)
  const [activeSection, setActiveSection] = useState('home')
  useEffect(() => { const onScroll = () => setAtTop(window.scrollY < window.innerHeight * .72); window.addEventListener('scroll', onScroll, { passive: true }); return () => window.removeEventListener('scroll', onScroll) }, [])
  useEffect(() => {
    const sectionIds = ['home', ...nav.map(([id]) => id.toLowerCase())]
    const sections = sectionIds.map(id => document.getElementById(id)).filter(Boolean)
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-20% 0px -55% 0px', threshold: [0.08, 0.22, 0.45] })
    sections.forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [])
  useLayoutEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce), (max-width: 900px)').matches) return undefined
    gsap.registerPlugin(ScrollTrigger)
    const context = gsap.context(() => {
      const opening = gsap.timeline({ defaults: { ease: 'power4.out' } })
      opening.from('.hero-video', { scale: 1.16, duration: 2.3, ease: 'power2.out' })
        .from('.hero-shade', { opacity: 0, duration: 1.25 }, 0)
        .from('.hero .eyebrow', { y: 34, autoAlpha: 0, duration: .8 }, .55)
        .from('.hero h1', { clipPath: 'inset(0 0 100% 0)', y: 85, scaleY: 1.18, transformOrigin: 'top', duration: 1.45 }, .7)
        .from('.hero-bottom', { y: 24, autoAlpha: 0, duration: .8, stagger: .12 }, 1.45)

      gsap.utils.toArray('main > section:not(.hero)').forEach((section) => {
        const title = section.querySelector('.section-title')
        const lede = section.querySelector('.section-lede')
        const eyebrow = section.querySelector('.eyebrow')
        const cards = section.querySelectorAll('.project, .work-group, .platform-block, .timeline-item, .other-notes article')
        if (eyebrow) gsap.from(eyebrow, { x: -42, autoAlpha: 0, duration: .9, ease: 'power3.out', scrollTrigger: { trigger: section, start: 'top 78%', once: true } })
        if (title) gsap.from(title, { xPercent: 18, scale: 1.18, autoAlpha: 0, duration: 1.15, ease: 'power4.out', scrollTrigger: { trigger: section, start: 'top 76%', once: true } })
        if (lede) gsap.from(lede, { y: 36, autoAlpha: 0, duration: .85, delay: .13, ease: 'power3.out', scrollTrigger: { trigger: section, start: 'top 76%', once: true } })
        if (cards.length) gsap.from(cards, { y: 72, autoAlpha: 0, duration: .9, stagger: .11, ease: 'power4.out', scrollTrigger: { trigger: section, start: 'top 69%', once: true } })
        const abilityCards = section.querySelectorAll('.ability-card')
        if (abilityCards.length) gsap.from(abilityCards, { y: 56, duration: .85, stagger: .1, ease: 'power4.out', scrollTrigger: { trigger: section, start: 'top 70%', once: true } })
        gsap.utils.toArray(section.querySelectorAll('img')).forEach((image) => gsap.fromTo(image, { scale: 1.15 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: image, start: 'top bottom', end: 'bottom top', scrub: .9 } }))
      })

      const intro = gsap.timeline({ scrollTrigger: { trigger: '.intro', start: 'top 72%', once: true } })
      intro.from('.portrait-wrap', { clipPath: 'inset(0 100% 0 0)', x: -60, duration: 1.2, ease: 'power4.out' })
        .from('.intro-copy h2', { y: 88, autoAlpha: 0, duration: 1.05, ease: 'power4.out' }, .22)
        .from('.intro-copy > p, .intro-contact', { y: 26, autoAlpha: 0, duration: .72, stagger: .12, ease: 'power3.out' }, .65)
        .from('.metrics > div', { y: 52, autoAlpha: 0, duration: .7, stagger: .12, ease: 'power4.out' }, .72)
    })
    return () => context.revert()
  }, [])
  const close = () => setMenuOpen(false)
  return <>
    <header className={`topbar ${atTop ? '' : 'is-scrolled'}`}>
      <a className="brand" href="#home" onClick={close}><span className="brand-mark">MW</span><span>马菀虹<br /><i>CONTENT OPERATOR</i></span></a>
      <nav className={menuOpen ? 'open' : ''}>{nav.map(([id, label]) => <a className={activeSection === id.toLowerCase() ? 'is-active' : ''} href={`#${id.toLowerCase()}`} onClick={close} key={id}><em>{id}</em>{label}</a>)}</nav>
      <a className="nav-contact" href="#contact"><span>联系我</span><ArrowDownRight size={16} /></a>
      <button className="menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="打开导航">{menuOpen ? <X /> : <Menu />}</button>
    </header>

    <main>
      <section className="hero" id="home">
        <video className="hero-video" autoPlay muted loop playsInline poster={covers.shantou}><source src="https://videos.pexels.com/video-files/856309/856309-hd_1920_1080_30fps.mp4" type="video/mp4" /></video>
        <div className="hero-shade" />
        <div className="hero-grid" />
        <div className="hero-content shell">
          <p className="eyebrow light"><span /> PORTFOLIO / 2026</p>
          <h1>让内容<br />成为<span>用户的<br />引力场</span></h1>
          <div className="hero-bottom"><p>公众号全链路运营<br />品牌内容 · 增长转化 · 项目统筹</p><a href="#work" className="round-link">向下浏览 <ArrowDownRight /></a></div>
        </div>
      </section>

      <section className="intro shell" id="about" data-animate-section>
        <div className="section-top"><p className="eyebrow"><span /> 01 / ABOUT</p><p className="side-note">CONTENT IS NOT FILLER.<br />IT IS THE FIRST EXPERIENCE.</p></div>
        <div className="intro-grid">
          <div className="portrait-wrap"><img src={`${A}马菀虹个人照片.jpg`} alt="马菀虹" /><div className="portrait-label">MA WANHONG<br /><small>CONTENT OPERATOR</small></div></div>
          <div className="intro-copy"><h2>在每一次表达里，<br />让<span>信息被看见</span>，<br />让价值被理解。</h2><p>3年公众号运营实习经验，覆盖产业科技、教培大健康与校园官方多赛道。擅长从0到1搭建内容体系、策划品牌内容与高转化营销文案，独立完成从策略到发布的完整闭环。</p><div className="intro-contact"><a href="tel:15815150264"><Phone size={15} /> 158 1515 0264</a><a href="mailto:wanhongma@example.com"><Mail size={15} /> 微信同号 · 马菀虹</a></div></div>
          <div className="metrics" onPointerMove={metricGlow} onPointerLeave={clearMetricGlow}><div><b>100<span>+</span></b><p>篇内容产出<br /><small>累计操盘全品类推文</small></p></div><div><b>6<span>万+</span></b><p>粉丝增长<br /><small>累计阅读 40 万+</small></p></div><div><b>400<span>+</span></b><p>商业转化<br /><small>内容带动成交</small></p></div><div><b>40</b><p>人校园团队管理<br /><small>统筹协作与内容把控</small></p></div></div>
        </div>
      </section>

      <section className="work-section" id="work" data-animate-section><div className="shell"><div className="section-top"><p className="eyebrow"><span /> 02 / SELECTED WORK</p><h2 className="section-title">精选<span>项目</span></h2></div><p className="section-lede">从复杂信息中提炼重点，让每一次内容表达都更清晰、更有共鸣。</p></div>
        <div className="project-list">{projects.map((project, i) => <article className={`project project-${i + 1}`} key={project.no}><a href={project.link} target="_blank" rel="noreferrer" className="project-image"><img src={project.image} alt={project.title} /><span className="view-project">阅读原文 <ArrowUpRight size={16} /></span></a><div className="project-info"><p className="project-no">{project.no} <span>{project.type}</span></p><h3>{project.title}</h3><h4>{project.subtitle}</h4><p className="project-detail">{project.detail}</p><div className="project-footer"><span>{project.role}</span><a href={project.link} target="_blank" rel="noreferrer" aria-label={`查看${project.title}`}><ArrowUpRight /></a></div></div></article>)}</div>
      </section>

      <section className="ability shell" id="approach"><ExperienceTimeline /><div className="ability-map"><div className="section-top"><p className="eyebrow"><span /> 03 / APPROACH</p><h2 className="section-title">能力<span>图谱</span></h2></div><div className="ability-intro"><p>从实战积累而来的能力，覆盖内容从洞察、表达至结果的完整协作系统。</p><span>CAPABILITY<br />MATRIX</span></div><div className="ability-grid">{abilities.map(({ icon: Icon, no, title, text, tags }) => <article className="ability-card" key={no}><div className="ability-head"><Icon strokeWidth={1.5} /><span>{no}</span></div><h3>{title}</h3><p>{text}</p><div>{tags.map(tag => <small key={tag}>{tag}</small>)}</div></article>)}</div></div></section>

      {collections.map(section => <Collection key={section.id} {...section} />)}
      <section className="other-work shell" id="other"><div className="section-top"><p className="eyebrow"><span /> 07 / OTHER WORKS</p><h2 className="section-title">视频与<span>多平台内容</span></h2></div><p className="section-lede">公众号之外，我也参与视频内容策划、脚本文案与官方社媒内容协同，让品牌表达跨渠道保持同一种语言。</p><div className="video-grid">{extraWorks.map(work => <Story key={work.title} image={work.image} type={work.type} title={work.title} link={work.link} />)}</div><div className="platform-block"><div className="platform-copy"><p className="eyebrow"><span /> DOUYIN</p><h3>官方抖音内容策划</h3><p>参与学校官方抖音账号内容策划与发布，负责脚本策划、文案配合拍摄执行；独立制作发布视频 30+ 条，结合热点做校园内容二次创作。</p></div><div className="social-cover-grid">{socialWorks.slice(0,6).map((work, index) => <SocialCard key={work.title} work={work} index={index} />)}</div></div><div className="platform-block"><div className="platform-copy"><p className="eyebrow"><span /> WEIBO</p><h3>官方微博日常运营</h3><p>参与官方微博图文发布与话题配合，围绕校园热点提升内容吸引力；博文平均阅读量 3w+，平均点赞量位列部门 Top 1。</p></div><div className="social-cover-grid social-cover-grid-three">{socialWorks.slice(6).map((work, index) => <SocialCard key={work.title} work={work} index={index} />)}</div></div><div className="platform-block paper-block"><div className="platform-copy"><p className="eyebrow"><span /> CAMPUS PAPER</p><h3>校报文章与深度专题</h3><p>担任校报主编，负责深度采访、稿件采写、文字终审及版面排版；以信息分层和读者动线组织官方内容。</p></div><div className="paper-strip"><img src={`${A}校报1.jpg`} alt="校报作品" loading="lazy" /><img src={`${A}校报2.jpg`} alt="校报作品" loading="lazy" /></div></div><div className="platform-block nandu-block"><div className="platform-copy"><p className="eyebrow"><span /> VIDEO PROJECT</p><h3>南方都市报视频实验室</h3><p>完整参与从选题、脚本、分镜到拍摄、剪辑、调色与输出的全流程，形成以叙事为核心、技术服务于表达的视频创作能力。作品获 2.4 万播放、近 1 千赞。</p></div><a className="nandu-work" href="https://n.oeeee.com/video/NVaJYiD2JYZN?from=timeline&layer=2&date" target="_blank" rel="noreferrer"><img src={`${A}南方都市报视频实验室结课作品.png`} alt="南方都市报视频实验室作品" loading="lazy" /><span>查看南方都市报视频作品 <ArrowUpRight size={15} /></span></a></div></section>

      <section className="contact" id="contact"><video className="contact-video" autoPlay muted loop playsInline><source src="/video/contact-bg.mp4" type="video/mp4" /></video><div className="contact-shade" /><div className="contact-fluid" aria-hidden="true"><i /><i /><i /></div><div className="contact-texture" /><div className="contact-orbit orbit-one" /><div className="contact-orbit orbit-two" /><div className="shell contact-inner"><p className="eyebrow light"><span /> 08 / CONTACT</p><div className="contact-main"><div className="contact-title"><p>CONTENT · STRATEGY · GROWTH</p><h2>下一段值得<br />被<span>看见</span>的故事，<br />期待与你一起完成。</h2></div><div className="contact-card"><p className="contact-card-label">OPEN TO CONTENT OPERATION ROLES</p><p>我相信好的内容同时关照品牌、用户与业务目标。期待加入有长期主义的团队，用清晰、有温度的内容解决真实问题。</p><a className="email-link" href="tel:15815150264"><span>158 1515 0264</span><ArrowUpRight /></a><div className="contact-meta"><span>马菀虹</span><span>微信同号</span><span>公众号运营</span></div></div></div><div className="contact-bottom"><p>MA WANHONG · CONTENT PORTFOLIO · 2026</p><a href="#home">BACK TO TOP <ArrowUp size={14} /></a></div></div></section>
    </main>
  </>
}

function Story({ image, type, title, link }) { return <a className="story-card" href={link} target="_blank" rel="noreferrer"><img src={image} alt="" loading="lazy" /><div><p>{type}</p><h3>{title}</h3><ArrowUpRight /></div></a> }
function Collection({ id, index, eyebrow, title, description, metrics, groups }) { return <section className="collection shell" id={id}><div className="section-top"><p className="eyebrow"><span /> {index} / {eyebrow}</p><h2 className="section-title">{title}</h2></div><p className="section-lede">{description}</p>{metrics && <div className="conversion-metrics">{metrics.map(metric => <span key={metric}>{metric}</span>)}</div>}{groups.map(group => <div className="work-group" key={group.title}><div className="group-header"><h3>{group.title}</h3><p>{group.note}</p></div>{group.summary && <div className="experience-summary"><p>{group.summary}</p><ul>{group.skills.map(skill => <li key={skill}>{skill}</li>)}</ul></div>}{group.compact ? <div className="representative-links"><p>代表作</p>{group.items.map(item => item.link ? <a key={item.title} href={item.link} target="_blank" rel="noreferrer"><span>{item.tag}</span>{item.title}<ArrowUpRight size={15} /></a> : <div className="representative-text" key={item.title}><span>{item.tag}</span>{item.title}</div>)}</div> : <div className={`work-cards work-cards-${group.items.length}`}>{group.items.map(item => <Story key={item.title} image={item.image} type={item.tag} title={item.title} link={item.link} />)}</div>}</div>)}</section> }
function ExperienceTimeline() { return <div className="experience-timeline"><div className="timeline-heading"><p className="eyebrow"><span /> EXPERIENCE ROUTE</p><h3>实习经历<br /><span>一路向前</span></h3></div><div className="timeline-list">{experiences.map((item, index) => <article className="timeline-item" key={item.name}><div className="timeline-date">{item.date}</div><div className="timeline-brand"><img src={item.logo} alt="" /><div><h4>{item.name}</h4><p>{item.role}</p></div></div><p className="timeline-result">{item.result}</p><div className="timeline-skills">{item.skills.map(skill => <span key={skill}>{skill}</span>)}</div><b>0{index + 1}</b></article>)}</div></div> }
function SocialCard({ work, index }) { return <a className="social-media-card" href={work.link} target="_blank" rel="noreferrer"><img src={work.image} alt={work.title} loading="lazy" /><div><span>0{index + 1} / {work.platform}</span><h4>{work.title}</h4><ArrowUpRight size={16} /></div></a> }
export default App

createRoot(document.getElementById('root')).render(<App />)
