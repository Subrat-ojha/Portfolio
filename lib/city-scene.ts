/**
 * The intro scene: a top-down city plaza drawn entirely in canvas, with a
 * camera that pushes in on a developer at a laptop. Ported from the standalone
 * hero sketch and tuned for a shorter, less patient intro.
 *
 * Everything is procedural — no images, no video — so the whole hero weighs
 * nothing and stays crisp at any DPR.
 */

export type SceneHooks = {
  onText?: () => void;
  onDone?: () => void;
};

type Look = { c: string; s: string; h: string };

type Agent = {
  k: "sit" | "grp" | "w" | "cy" | "car";
  x: number;
  y: number;
  a?: number;
  c?: string;
  s?: string;
  h?: string;
  g?: number;
  sc?: number;
  ph?: number | null;
  bag?: string | number;
  phone?: boolean;
  cup?: boolean;
  sm?: number;
  wv?: number;
  ax?: number;
  ay?: number;
  bx?: number;
  by?: number;
  L?: number;
  u?: number;
  d?: number;
  sp?: number;
  ps?: number;
  ang?: number;
  mv?: boolean;
  v?: number;
};

type PersonOpts = {
  c: string;
  s: string;
  h: string;
  sit?: number;
  g?: number;
  sc?: number;
  ph?: number | null;
  bag?: string | number;
  phone?: boolean;
  cup?: boolean;
  k?: number;
  sm?: number;
  wv?: number;
  photo?: boolean;
};

const CFG = {
  zoomAt: 2.4,
  zoomDur: 3.6,
  zoom: 11,
  lookAt: 6.2,
  waveFrom: 6.6,
  waveTo: 9.8,
  textAt: 6.9,
  walkers: 40,
  groups: 7,
  cyclists: 5,
  cars: 5,
};

const SKIN = ["#f1c9a5", "#e0ac82", "#c68863", "#a2683f", "#76472b", "#4f301f"];
const HAIR = ["#1b1410", "#2d1e15", "#4a3020", "#7a5632", "#b08a4d", "#8c8c8c", "#0e0e10"];
const CLO = [
  "#2f3e4e",
  "#8a3b2f",
  "#c2a15a",
  "#3a6b64",
  "#d9d4c7",
  "#4c4259",
  "#1f3a42",
  "#7d4a55",
  "#b98a5e",
  "#6b7280",
  "#27384f",
  "#a89078",
  "#1a1a1c",
  "#5b6b57",
  "#8f8a80",
];
const ROOF = ["#5a6b7d", "#8a5a44", "#b9a27c", "#4c5f5b", "#7b6f8a", "#a3a8ae"];

const cl = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ez = (v: number) => {
  v = cl(v);
  return v < 0.5 ? 4 * v * v * v : 1 - Math.pow(-2 * v + 2, 3) / 2;
};
const lp = (a: number, b: number, v: number) => a + (b - a) * v;

export class CityScene {
  private hero: HTMLElement;
  private bgc: HTMLCanvasElement;
  private fgc: HTMLCanvasElement;
  private bx: CanvasRenderingContext2D;
  private fx: CanvasRenderingContext2D;
  private hooks: SceneHooks;

  private W = 0;
  private H = 0;
  private D = 1;
  private B = 1;
  private T = 0;
  private last = 0;
  private ff = false;
  private raf = 0;
  private shown = false;
  private done = false;
  private lastBlur = "";
  private NP: CanvasPattern | null = null;
  private portrait: HTMLImageElement | null = null;
  private reduced = false;
  private running = false;

  private AG: Agent[] = [];
  private BLD: [number, number, number, number, string][] = [];
  private TREE: [number, number, number][] = [];
  private LT: [number, number][] = [];
  private BT: [number, number, number][] = [];
  private HR = [130, 780];
  private VR = [255, 1255];
  private RW = 90;

  private sd = 42;
  private R = () => (this.sd = (this.sd * 16807) % 2147483647) / 2147483647;
  private pk = <T>(a: T[]): T => a[(this.R() * a.length) | 0];
  private rn = (a: number, b: number) => a + this.R() * (b - a);
  private look = (): Look => ({ c: this.pk(CLO), s: this.pk(SKIN), h: this.pk(HAIR) });

  constructor(
    hero: HTMLElement,
    bgc: HTMLCanvasElement,
    fgc: HTMLCanvasElement,
    hooks: SceneHooks,
  ) {
    this.hero = hero;
    this.bgc = bgc;
    this.fgc = fgc;
    this.hooks = hooks;
    this.bx = bgc.getContext("2d")!;
    this.fx = fgc.getContext("2d")!;
    this.reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    this.buildWorld();
  }

  /* ---------------------------------------------------------------- world */

  private buildWorld() {
    const { VR, HR, RW, R, rn, pk, look, AG, BLD, TREE } = this;

    [[0, 225], [375, 1225], [1375, 1600]].forEach(([a, b]) => {
      let x = a;
      while (x < b - 60) {
        const w = Math.min(b - x, rn(110, 240));
        BLD.push([x, 0, w - 8, 95, pk(ROOF)]);
        BLD.push([x, 905, w - 8, 95, pk(ROOF)]);
        x += w;
      }
    });
    BLD.push([0, 260, 215, 230, pk(ROOF)], [0, 510, 215, 240, pk(ROOF)]);
    BLD.push([1385, 260, 215, 230, pk(ROOF)], [1385, 510, 215, 240, pk(ROOF)]);

    [
      [430, 268], [570, 268], [1030, 268], [1170, 268],
      [430, 732], [570, 732], [1030, 732], [1170, 732],
      [375, 500], [1225, 500], [380, 380], [1220, 620],
      [130, 240], [1480, 760], [300, 60], [1300, 950],
    ].forEach((t) => TREE.push([t[0], t[1], rn(15, 22)]));

    this.LT = [[470, 330], [1130, 330], [470, 680], [1130, 680], [610, 470], [1010, 530], [800, 310]];
    this.LT.forEach((t) => {
      AG.push({ k: "sit", x: t[0], y: t[1], a: R() < 0.5 ? 0 : Math.PI, ...look(), ph: R() * 6 });
    });

    this.BT = [[660, 650, 0], [985, 355, 1]];
    this.BT.forEach((t, i) => {
      for (let j = 0; j < 6; j++) {
        const top = j < 3;
        AG.push({
          k: "sit",
          x: t[0] - 34 + (j % 3) * 34,
          y: t[1] + (top ? -34 : 34),
          a: top ? Math.PI : 0,
          ...look(),
          g: j === 1 || j === 4 ? j + i : 0,
          ph: 0,
        });
      }
    });

    const groupSpots = [[400, 500], [1200, 500], [690, 725], [900, 285], [1180, 262], [420, 725], [560, 262]];
    groupSpots.slice(0, CFG.groups).forEach((g) => {
      const n = 3 + ((R() * 2) | 0);
      for (let j = 0; j < n; j++) {
        const an = (j / n) * 6.28 + R();
        AG.push({
          k: "grp",
          x: g[0] + Math.cos(an) * 19,
          y: g[1] + Math.sin(an) * 19,
          a: an + Math.PI / 2 + Math.PI,
          ...look(),
          g: j === 0 ? 1 + R() * 5 : 0,
          phone: j === n - 1 && R() < 0.5,
          cup: R() < 0.4,
          ph: 0,
        });
      }
    });

    const walk = (ax: number, ay: number, bx: number, by: number) => {
      const L = Math.hypot(bx - ax, by - ay);
      AG.push({
        k: "w", x: ax, y: ay, ax, ay, bx, by, L,
        u: R(), d: R() < 0.5 ? 1 : -1, sp: rn(16, 32), ps: 0, ang: 0,
        ph: R() * 6, bag: R() < 0.25 ? pk(CLO) : 0,
        phone: R() < 0.2, cup: R() < 0.25, ...look(),
      });
    };

    for (let i = 0; i < CFG.walkers; i++) {
      const ax = rn(400, 1200);
      const ay = rn(270, 730);
      const bx = rn(400, 1200);
      const by = rn(270, 730);
      if (
        Math.hypot(ax - 800, ay - 500) < 150 ||
        Math.hypot(bx - 800, by - 500) < 150 ||
        Math.abs(ax - bx) + Math.abs(ay - by) < 200
      ) {
        i--;
        continue;
      }
      walk(ax, ay, bx, by);
    }

    [115, 235, 765, 885].forEach((y) => {
      for (let i = 0; i < 4; i++) {
        const a = rn(10, 800);
        walk(a, y + rn(-6, 6), a + rn(450, 780), y + rn(-6, 6));
      }
    });
    [470, 800, 1130].forEach((x) => {
      [0, 1].forEach((h) => {
        const t = h ? [772, 892] : [122, 242];
        walk(x + rn(-12, 12), t[0], x + rn(-12, 12), t[1]);
        walk(x + rn(-12, 12), t[1], x + rn(-12, 12), t[0]);
      });
    });
    [350, 500, 650].forEach((y) => {
      walk(232, y + rn(-10, 10), 368, y + rn(-10, 10));
      walk(1232, y + rn(-10, 10), 1368, y + rn(-10, 10));
    });

    for (let i = 0; i < CFG.cyclists; i++) {
      AG.push({
        k: "cy", x: rn(0, 1600), y: pk([150, 200, 800, 850]),
        v: pk([-1, 1]) * rn(55, 85), ...look(),
      });
    }
    for (let i = 0; i < CFG.cars; i++) {
      AG.push({
        k: "car", x: rn(0, 1600), y: pk([145, 205, 795, 855]),
        v: pk([-1, 1]) * rn(45, 75),
        c: pk(["#c9ccd2", "#2b3a55", "#8a2f2f", "#e8e4da", "#3d4f3f"]),
      });
    }
  }

  /* --------------------------------------------------------------- public */

  start() {
    if (this.running) return;
    this.running = true;
    this.rs();
    this.onResize = this.onResize.bind(this);
    window.addEventListener("resize", this.onResize);

    if (this.reduced) {
      this.T = 13;
      this.drawFrame(0);
      this.hooks.onText?.();
      this.hooks.onDone?.();
      return;
    }

    this.last = performance.now();
    this.raf = requestAnimationFrame(this.frame);
  }

  destroy() {
    this.running = false;
    cancelAnimationFrame(this.raf);
    window.removeEventListener("resize", this.onResize);
  }

  skip() {
    this.ff = true;
  }

  setPortrait(img: HTMLImageElement | null) {
    this.portrait = img;
  }

  /* ------------------------------------------------------------- internals */

  private onResize() {
    this.rs();
    if (this.reduced) this.drawFrame(0);
  }

  private rs() {
    this.D = Math.min(window.devicePixelRatio || 1, 2);
    this.W = this.hero.clientWidth;
    this.H = this.hero.clientHeight;
    [this.bgc, this.fgc].forEach((c) => {
      c.width = this.W * this.D;
      c.height = this.H * this.D;
    });
    this.B = Math.max(this.W / 1600, this.H / 1000);
  }

  private noise(g: CanvasRenderingContext2D) {
    if (!this.NP) {
      const c = document.createElement("canvas");
      c.width = c.height = 256;
      const k = c.getContext("2d")!;
      const im = k.createImageData(256, 256);
      for (let i = 0; i < im.data.length; i += 4) {
        const v = (196 + this.R() * 59) | 0;
        im.data[i] = im.data[i + 1] = im.data[i + 2] = v;
        im.data[i + 3] = 255;
      }
      k.putImageData(im, 0, 0);
      this.NP = g.createPattern(c, "repeat");
    }
    if (!this.NP) return;
    g.save();
    g.globalCompositeOperation = "multiply";
    g.fillStyle = this.NP;
    g.scale(1.3, 1.3);
    g.fillRect(-400, -400, 3000, 2200);
    g.restore();
  }

  /** A single person seen from above: shadow, arms, shoulders, head. */
  private P(g: CanvasRenderingContext2D, x: number, y: number, a: number, o: PersonOpts) {
    g.save();
    g.translate(x, y);
    const sc = o.sc || 1;
    g.scale(sc, sc);

    const shg = g.createRadialGradient(6, 7, 1, 6, 7, 17);
    shg.addColorStop(0, "rgba(20,15,40,.5)");
    shg.addColorStop(1, "rgba(20,15,40,0)");
    g.fillStyle = shg;
    g.beginPath();
    g.ellipse(6, 7, 18, 14, 0, 0, 7);
    g.fill();
    g.rotate(a);

    const arm = (x1: number, y1: number, x2: number, y2: number) => {
      g.strokeStyle = o.c;
      g.lineWidth = 5;
      g.lineCap = "round";
      g.beginPath();
      g.moveTo(x1, y1);
      g.lineTo(x2, y2);
      g.stroke();
      g.fillStyle = o.s;
      g.beginPath();
      g.arc(x2, y2, 2.3, 0, 7);
      g.fill();
    };

    if (o.bag) {
      g.fillStyle = String(o.bag);
      g.beginPath();
      g.roundRect(-7, 2, 14, 10, 3);
      g.fill();
    }

    const sw = o.ph != null ? Math.sin(o.ph) * 5 : 0;
    if (o.sit) {
      arm(-9, -1, -6, -13);
      if (!o.wv) arm(9, -1, 6, -13);
    } else {
      arm(-11, 0, -11, -6 + sw);
      arm(11, 0, 11, -6 - sw);
    }
    if (o.g) arm(10, -1, 13 + Math.sin(this.T * 3 + o.g) * 4, -15 + Math.sin(this.T * 2 + o.g) * 3);
    if (o.wv && o.wv > 0) {
      const w = Math.sin((this.T - CFG.waveFrom) * 7) * 0.55;
      g.save();
      g.translate(9, -1);
      g.rotate(w);
      g.strokeStyle = o.c;
      g.lineWidth = 5.5;
      g.lineCap = "round";
      g.beginPath();
      g.moveTo(0, 0);
      g.lineTo(2, -15 * o.wv);
      g.stroke();
      g.fillStyle = o.s;
      g.beginPath();
      g.arc(2, -15.5 * o.wv, 3.3, 0, 7);
      g.fill();
      g.restore();
    }

    g.fillStyle = o.c;
    g.beginPath();
    g.ellipse(0, 0, 11, 6, 0, 0, 7);
    g.fill();
    const sg2 = g.createLinearGradient(0, -6, 0, 6);
    sg2.addColorStop(0, "rgba(255,255,255,.18)");
    sg2.addColorStop(0.55, "rgba(0,0,0,0)");
    sg2.addColorStop(1, "rgba(0,0,0,.38)");
    g.fillStyle = sg2;
    g.beginPath();
    g.ellipse(0, 0, 11, 6, 0, 0, 7);
    g.fill();

    if (o.ph != null && o.cup) {
      g.fillStyle = "#f4efe6";
      g.beginPath();
      g.arc(11, -8, 2.6, 0, 7);
      g.fill();
      g.fillStyle = "#6b4226";
      g.beginPath();
      g.arc(11, -8, 1.6, 0, 7);
      g.fill();
    }
    if (o.phone) {
      g.fillStyle = "#111";
      g.fillRect(-1.5, -14, 3.4, 5.5);
      g.fillStyle = "rgba(120,200,255,.9)";
      g.fillRect(-1, -13.4, 2.4, 4);
    }

    const k = o.k || 0;
    g.fillStyle = o.s;
    g.beginPath();
    g.arc(0, -1 + 0.5 * k, 5.3 - 0.6 * k, 0, 7);
    g.fill();
    g.fillStyle = o.h;
    g.beginPath();
    g.arc(0, lp(0.2, -4.4, k), lp(4.9, 4.2, k), 0, 7);
    g.fill();
    g.fillStyle = "rgba(255,255,255,.14)";
    g.beginPath();
    g.arc(-1.4, lp(-1, -5.4, k), 1.8, 0, 7);
    g.fill();

    if (k > 0.5) {
      g.globalAlpha = (k - 0.5) * 2;
      g.fillStyle = "#1c1410";
      [-2, 2].forEach((e) => {
        g.beginPath();
        g.arc(e, 1.1, 0.6, 0, 7);
        g.fill();
      });
      g.strokeStyle = "#7a3b2e";
      g.lineWidth = 0.6;
      g.beginPath();
      g.arc(0, 2, 1.5 * (o.sm || 0) + 0.3, 0.2, Math.PI - 0.2);
      g.stroke();
      g.globalAlpha = 1;
    }

    // Once the camera is close, the developer's head becomes the owner's
    // portrait if one was uploaded.
    if (o.photo && this.portrait && k > 0.55) {
      const r = 7.4;
      g.save();
      g.beginPath();
      g.arc(0, -1.6, r, 0, 7);
      g.clip();
      const img = this.portrait;
      const ar = img.width / img.height;
      const w = ar > 1 ? r * 2 * ar : r * 2;
      const h = ar > 1 ? r * 2 : (r * 2) / ar;
      g.drawImage(img, -w / 2, -1.6 - h / 2, w, h);
      g.restore();
      g.strokeStyle = "rgba(232,183,101,.95)";
      g.lineWidth = 1.1;
      g.beginPath();
      g.arc(0, -1.6, r + 0.4, 0, 7);
      g.stroke();
    }

    g.restore();
  }

  private table(g: CanvasRenderingContext2D, x: number, y: number, r: number) {
    g.fillStyle = "rgba(30,25,60,.3)";
    g.beginPath();
    g.arc(x + 6, y + 7, r, 0, 7);
    g.fill();
    g.fillStyle = "#caa56f";
    g.beginPath();
    g.arc(x, y, r, 0, 7);
    g.fill();
    g.fillStyle = "rgba(255,255,255,.18)";
    g.beginPath();
    g.arc(x - 3, y - 3, r * 0.7, 0, 7);
    g.fill();
  }

  /* ---------------------------------------------------------------- draw */

  private drawBG(g: CanvasRenderingContext2D) {
    g.fillStyle = "#bdb39f";
    g.fillRect(-300, -300, 2200, 1600);

    g.fillStyle = "#cfc6b2";
    g.fillRect(345, 250, 910, 500);
    for (let px = 345; px < 1255; px += 45) {
      for (let py = 250; py < 750; py += 45) {
        const hv = Math.sin(px * 12.9 + py * 78.2) * 43758.5;
        const f = hv - Math.floor(hv);
        g.fillStyle = f < 0.5 ? `rgba(255,250,235,${f * 0.16})` : `rgba(70,55,35,${(f - 0.5) * 0.18})`;
        g.fillRect(px, py, 45, 45);
      }
    }
    g.strokeStyle = "rgba(90,70,40,.08)";
    g.lineWidth = 1;
    g.beginPath();
    for (let x = 360; x < 1255; x += 45) {
      g.moveTo(x, 250);
      g.lineTo(x, 750);
    }
    for (let y = 250; y < 750; y += 45) {
      g.moveTo(345, y);
      g.lineTo(1255, y);
    }
    g.stroke();

    g.fillStyle = "#e0d8c4";
    g.beginPath();
    g.arc(800, 500, 150, 0, 7);
    g.fill();
    g.strokeStyle = "rgba(180,140,70,.55)";
    g.lineWidth = 2;
    g.beginPath();
    g.arc(800, 500, 150, 0, 7);
    g.stroke();
    g.beginPath();
    g.arc(800, 500, 138, 0, 7);
    g.stroke();

    g.fillStyle = "#b9ae98";
    this.VR.forEach((x) => g.fillRect(x - 30, -300, this.RW + 60, 1600));
    this.HR.forEach((y) => g.fillRect(-300, y - 30, 2200, this.RW + 60));

    g.fillStyle = "#34373e";
    this.VR.forEach((x) => g.fillRect(x, -300, this.RW, 1600));
    this.HR.forEach((y) => g.fillRect(-300, y, 2200, this.RW));

    g.strokeStyle = "rgba(240,230,200,.55)";
    g.lineWidth = 2;
    g.setLineDash([22, 20]);
    g.beginPath();
    this.HR.forEach((y) => {
      g.moveTo(-300, y + 45);
      g.lineTo(1900, y + 45);
    });
    this.VR.forEach((x) => {
      g.moveTo(x + 45, -300);
      g.lineTo(x + 45, 1300);
    });
    g.stroke();
    g.setLineDash([]);

    g.fillStyle = "rgba(246,239,224,.8)";
    [470, 800, 1130].forEach((x) =>
      this.HR.forEach((y) => {
        for (let i = -18; i <= 18; i += 7) g.fillRect(x + i, y + 3, 4, this.RW - 6);
      }),
    );
    [350, 500, 650].forEach((y) =>
      this.VR.forEach((x) => {
        for (let i = -18; i <= 18; i += 7) g.fillRect(x + 3, y + i, this.RW - 6, 4);
      }),
    );

    this.noise(g);

    this.BLD.forEach(([x, y, w, h, c]) => {
      const sh = g.createLinearGradient(x + w, 0, x + w + 40, 0);
      sh.addColorStop(0, "rgba(20,18,45,.42)");
      sh.addColorStop(1, "rgba(20,18,45,0)");
      g.fillStyle = sh;
      g.beginPath();
      g.moveTo(x + w, y + 4);
      g.lineTo(x + w + 40, y + 34);
      g.lineTo(x + w + 40, y + h + 34);
      g.lineTo(x + w, y + h);
      g.fill();

      const sb = g.createLinearGradient(0, y + h, 0, y + h + 34);
      sb.addColorStop(0, "rgba(20,18,45,.42)");
      sb.addColorStop(1, "rgba(20,18,45,0)");
      g.fillStyle = sb;
      g.fillRect(x + 6, y + h, w + 34, 34);

      const rg = g.createLinearGradient(x, y, x + w, y + h);
      rg.addColorStop(0, "rgba(255,240,210,.2)");
      rg.addColorStop(1, "rgba(0,0,10,.28)");
      g.fillStyle = c;
      g.fillRect(x, y, w, h);
      g.fillStyle = rg;
      g.fillRect(x, y, w, h);
      g.fillStyle = "rgba(255,245,225,.38)";
      g.fillRect(x, y, w, 2);
      g.fillRect(x, y, 2, h);
      g.fillStyle = "rgba(0,0,0,.25)";
      g.fillRect(x, y + h - 3, w, 3);
      g.fillRect(x + w - 3, y, 3, h);
      for (let i = 0; i < Math.floor(w / 48); i++) {
        const ux = x + 16 + i * 44;
        const uy = y + 18 + ((i * 37) % 20);
        g.fillStyle = "rgba(20,18,45,.3)";
        g.fillRect(ux + 4, uy + 4, 20, 14);
        g.fillStyle = "#c9ccd0";
        g.fillRect(ux, uy, 20, 14);
        g.fillStyle = "#9a9ea6";
        g.fillRect(ux + 3, uy + 3, 14, 8);
      }
    });

    this.TREE.forEach((t, ti) => {
      const sg = g.createRadialGradient(t[0] + 10, t[1] + 12, 2, t[0] + 10, t[1] + 12, t[2] * 1.4);
      sg.addColorStop(0, "rgba(20,18,45,.45)");
      sg.addColorStop(1, "rgba(20,18,45,0)");
      g.fillStyle = sg;
      g.beginPath();
      g.arc(t[0] + 10, t[1] + 12, t[2] * 1.4, 0, 7);
      g.fill();
      for (let i = 0; i < 18; i++) {
        const h1 = Math.sin(ti * 91.7 + i * 17.3) * 43758.5;
        const f = h1 - Math.floor(h1);
        const h2 = Math.sin(ti * 13.1 + i * 57.9) * 12345.6;
        const f2 = h2 - Math.floor(h2);
        const an = f * 6.28;
        const rr = f2 * t[2] * 0.75;
        const lit = Math.cos(an + 2.4) * 0.5 + 0.5;
        g.fillStyle = `rgb(${(34 + lit * 40) | 0},${(74 + lit * 55) | 0},${(54 + lit * 30) | 0})`;
        g.beginPath();
        g.arc(t[0] + Math.cos(an) * rr, t[1] + Math.sin(an) * rr, t[2] * 0.38, 0, 7);
        g.fill();
      }
    });

    [[680, 262], [920, 262], [680, 738], [920, 738]].forEach((b) => {
      g.fillStyle = "rgba(30,25,60,.25)";
      g.fillRect(b[0] - 18 + 4, b[1] - 5 + 5, 36, 10);
      g.fillStyle = "#7a5a3a";
      g.fillRect(b[0] - 18, b[1] - 5, 36, 10);
    });

    this.LT.forEach((t) => this.table(g, t[0], t[1], 20));
    this.BT.forEach((t) => {
      g.fillStyle = "rgba(30,25,60,.28)";
      g.fillRect(t[0] - 50 + 5, t[1] - 22 + 6, 100, 44);
      g.fillStyle = "#caa56f";
      g.fillRect(t[0] - 50, t[1] - 22, 100, 44);
      ["#f4d35e", "#ee964b", "#8ecae6", "#f4d35e"].forEach((c, i) => {
        g.fillStyle = c;
        g.fillRect(t[0] - 38 + i * 20, t[1] - 8 + (i % 2) * 6, 10, 10);
      });
      g.fillStyle = "#fff";
      g.fillRect(t[0] - 6, t[1] - 14, 20, 26);
    });

    this.AG.forEach((a) => {
      if (a.k === "sit") {
        this.P(g, a.x, a.y, a.a!, { c: a.c!, s: a.s!, h: a.h!, sit: 1, g: a.g, sc: 0.96 });
      }
      if (a.k === "grp") {
        this.P(g, a.x, a.y, a.a! + Math.sin(this.T * 0.9 + (a.g ?? 0)) * 0.18, {
          c: a.c!, s: a.s!, h: a.h!, g: a.g, phone: a.phone, cup: a.cup, ph: 0,
        });
      }
      if (a.k === "w") {
        this.P(g, a.x, a.y, a.ang!, {
          c: a.c!, s: a.s!, h: a.h!, ph: a.mv ? a.ph : null,
          bag: a.bag, phone: a.phone && !a.mv, cup: a.cup,
        });
      }
      if (a.k === "cy") {
        g.save();
        g.translate(a.x, a.y);
        const d = (a.v ?? 0) > 0 ? 1 : -1;
        g.fillStyle = "rgba(25,18,50,.28)";
        g.fillRect(-18 + 4, -2 + 6, 36, 4);
        g.fillStyle = "#222";
        g.fillRect(-19, -2, 38, 4);
        g.restore();
        this.P(g, a.x, a.y, d > 0 ? Math.PI / 2 : -Math.PI / 2, {
          c: a.c!, s: a.s!, h: a.h!, sc: 0.9, sit: 1,
        });
      }
      if (a.k === "car") {
        g.fillStyle = "rgba(25,18,50,.3)";
        g.beginPath();
        g.roundRect(a.x - 22 + 5, a.y - 10 + 6, 44, 20, 7);
        g.fill();
        g.fillStyle = a.c!;
        g.beginPath();
        g.roundRect(a.x - 22, a.y - 10, 44, 20, 7);
        g.fill();
        g.fillStyle = "rgba(20,28,45,.75)";
        g.fillRect(a.x - 6, a.y - 8, 16, 16);
        g.fillStyle = "rgba(255,255,255,.2)";
        g.fillRect(a.x - 20, a.y - 9, 40, 3);
      }
    });
  }

  private drawFG(g: CanvasRenderingContext2D) {
    const k = ez((this.T - CFG.lookAt) / 0.8);
    const sm = ez((this.T - CFG.lookAt - 0.4) / 0.6);
    const wv = ez((this.T - CFG.waveFrom) / 0.5) * (1 - ez((this.T - CFG.waveTo) / 0.5));

    // the table, laptop and coffee in the foreground
    g.fillStyle = "rgba(30,25,60,.3)";
    g.beginPath();
    g.arc(806, 507, 32, 0, 7);
    g.fill();
    g.fillStyle = "#d4ae78";
    g.beginPath();
    g.arc(800, 500, 31, 0, 7);
    g.fill();
    g.fillStyle = "rgba(255,255,255,.2)";
    g.beginPath();
    g.arc(796, 496, 22, 0, 7);
    g.fill();

    g.fillStyle = "#f4efe6";
    g.beginPath();
    g.arc(822, 490, 5, 0, 7);
    g.fill();
    g.fillStyle = "#5a3620";
    g.beginPath();
    g.arc(822, 490, 3.4, 0, 7);
    g.fill();

    g.fillStyle = "rgba(30,25,60,.3)";
    g.fillRect(790, 492, 30, 20);
    g.fillStyle = "#b9bcc4";
    g.fillRect(785, 488, 30, 20);
    g.fillStyle = "#8f939c";
    g.fillRect(785, 488, 30, 4);
    g.fillStyle = "rgba(30,40,60,.35)";
    for (let i = 0; i < 4; i++)
      for (let j = 0; j < 6; j++) g.fillRect(788 + j * 4.6, 495 + i * 3.2, 3.4, 2);
    g.fillStyle = `rgba(120,225,255,${0.25 + 0.1 * Math.sin(this.T * 3)})`;
    g.fillRect(785, 486, 30, 3);

    g.fillStyle = "rgba(30,25,60,.28)";
    g.beginPath();
    g.arc(805, 541, 16, 0, 7);
    g.fill();
    g.fillStyle = "#6b4a2e";
    g.beginPath();
    g.arc(800, 537, 15, 0, 7);
    g.fill();

    this.P(g, 800, 532, 0, {
      c: "#1f5a63", s: "#d8a37b", h: "#17100c", sit: 1, sc: 1, k, sm, wv, photo: true,
    });

    // a one-off gold sonar ring when the intro lands
    const pu = (this.T * 0.7) % 1;
    const ra = 1 - ez((this.T - 2) / 2);
    if (ra > 0) {
      g.strokeStyle = `rgba(232,183,101,${0.9 * (1 - pu) * ra})`;
      g.lineWidth = 2.4;
      g.beginPath();
      g.arc(800, 520, 16 + pu * 46, 0, 7);
      g.stroke();
      g.fillStyle = `rgba(232,183,101,${0.9 * ra})`;
      g.beginPath();
      g.arc(800, 520, 5, 0, 7);
      g.fill();
    }
  }

  private cam(g: CanvasRenderingContext2D, z: number, rot: number, ox: number, oy: number) {
    g.setTransform(this.D, 0, 0, this.D, 0, 0);
    g.clearRect(0, 0, this.W, this.H);
    g.translate(this.W / 2 + ox, this.H / 2 + oy);
    g.rotate(rot);
    g.scale(this.B * z, this.B * z);
    g.translate(-800, -500);
  }

  private update(dt: number) {
    this.AG.forEach((a) => {
      if (a.k === "w") {
        if (a.ps! > 0) {
          a.ps! -= dt;
        } else {
          a.u! += a.d! * a.sp! * dt / a.L!;
          a.ph! += dt * a.sp! * 0.45;
          if (a.u! >= 1 || a.u! <= 0) {
            a.u = cl(a.u!);
            a.d! *= -1;
            a.ps = 1 + this.R() * 4;
          }
        }
        const tx = (a.bx! - a.ax!) * a.d!;
        const ty = (a.by! - a.ay!) * a.d!;
        const ta = Math.atan2(tx, -ty);
        let df = ta - a.ang!;
        df = Math.atan2(Math.sin(df), Math.cos(df));
        a.ang! += df * Math.min(1, dt * 5);
        a.x = lp(a.ax!, a.bx!, a.u!);
        a.y = lp(a.ay!, a.by!, a.u!);
        a.mv = a.ps! <= 0;
      }
      if (a.k === "cy" || a.k === "car") {
        a.x += a.v! * dt;
        if (a.x > 1700) a.x = -100;
        if (a.x < -100) a.x = 1700;
      }
    });
  }

  private drawFrame(dt: number) {
    if (dt > 0) this.update(dt);

    const land = this.W > this.H * 1.05;
    const zt = ez((this.T - CFG.zoomAt) / CFG.zoomDur);
    const z = this.T < CFG.zoomAt ? 1 + 0.05 * ez(this.T / CFG.zoomAt) : lp(1.05, CFG.zoom, zt);
    const rot = -0.06 * (1 - ez(this.T / 6));
    const sh = ez((this.T - 5) / 3.5);
    const ox = land ? this.W * 0.2 * sh : 0;
    const oy = land ? -this.H * 0.02 * sh : -this.H * 0.16 * sh;

    this.cam(this.bx, z, rot, ox, oy);
    this.drawBG(this.bx);
    this.cam(this.fx, z, rot, ox, oy);
    this.drawFG(this.fx);

    const bl = (7 * ez((this.T - 4.4) / 3.6)).toFixed(1);
    const f = `blur(${bl}px) brightness(${(1 - 0.3 * sh).toFixed(2)}) saturate(${(1 - 0.15 * sh).toFixed(2)})`;
    if (f !== this.lastBlur) {
      this.lastBlur = f;
      this.bgc.style.filter = f;
    }
    this.hero.style.setProperty("--v", ez(this.T / 3).toFixed(2));

    if (this.T >= CFG.textAt && !this.shown) {
      this.shown = true;
      this.hooks.onText?.();
    }
    if (this.T >= CFG.textAt + 0.8 && this.ff) {
      this.ff = false;
    }
    if (this.T >= CFG.waveTo + 0.6 && !this.done) {
      this.done = true;
      this.hooks.onDone?.();
    }
  }

  private frame = (n: number) => {
    if (!this.running) return;
    const dt = Math.min(0.05, (n - this.last) / 1000) * (this.ff ? 5 : 1);
    this.last = n;
    this.T += dt;
    this.drawFrame(dt);
    this.raf = requestAnimationFrame(this.frame);
  };
}
