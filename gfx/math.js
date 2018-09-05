'use strict';

const PI = Math.PI, TAU = PI * 2;
// let sin = Math.sin, cos = Math.cos, tan = Math.tan, floor = Math.floor, random = Math.random;
// let max = Math.max, min = Math.min, abs = Math.abs, hypot = Math.hypot, sqrt = Math.sqrt;
let mix = (a, b, p) => a * (1 - p) + b * p;
let clamp = (x, lo, hi) => Math.min(hi, Math.max(lo, x));
let smoothstep = (x, e0, e1) => {
  x = clamp((x - e0) / (e1 - e0), 0, 1);
  return x * x * (3 - 2 * x);
}

// circular array / modular arithmetic
let wrap = (a, m) => (a % m + m) % m;
let iwrap = (a, m) => Math.floor((a % m + m) % m);
let awrap = (a, i) => a[iwrap(i, a.length)];
let dmod = (a, b, m) => Math.min(wrap(a - b, m), wrap(b - a, m));

// random functions
let rand = (lo=0, hi=1) => lo + (hi - lo) * Math.random();
let irand = (lo, hi) => Math.floor(lo + (hi - lo) * Math.random());
let nrand = (lo=-1, hi=1) => lo + (hi - lo) * .5 * (1 + Math.random() - Math.random());
let sample = (a) => a[irand(0, a.length)];
let chance = (p) => rand() < p;
function shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        let x = a[i];
        a[i] = a[j];
        a[j] = x;
    }
    return a;
}


class Vec2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  // vector update methods
  add(v) { this.x += v.x; this.y += v.y; return this; }
  sub(v) { this.x -= v.x; this.y -= v.y; return this; }
  mul(v) { this.x *= v.x; this.y *= v.y; return this; }
  madd(v, a) { this.x += v.x * a; this.y += v.y * a; return this; }
  mix(v, p) { this.x += (v.x - this.x) * p; this.y += (v.y - this.y) * p; return this; }
  rot90() { [this.x, this.y] = [-this.y, this.x]; return this; }
  rot180() { this.x *= -1; this.y *= -1; return this; }
  rot270() { [this.x, this.y] = [this.y, -this.x]; return this; }
  normalize() { let h = 1 / Math.hypot(this.x, this.y); this.x *= h; this.y *= h; return this; }
  op1(f) { this.x = f(this.x); this.y = f(this.y); return this; }
  op2(v, f) { this.x = f(this.x, v.x); this.y = f(this.y, v.y); return this; }
  op3(v, w, f) { this.x = f(this.x, v.x, w.x); this.y = f(this.y, v.y, w.y); return this; }

  // scalar methods
  dist(v) { return Math.hypot(this.x - v.x, this.y - v.y); }
  hypot() { return Math.hypot(this.x, this.y); }

  // swizzling
  get xy() { return new Vec2(this.x, this.y); } // Vec2.xy is also copy constructor
  get yx() { return new Vec2(this.y, this.x); }
  get xx() { return new Vec2(this.x, this.x); }
  get yy() { return new Vec2(this.y, this.y); }
  set xy(v) { [this.x, this.y] = [v.x, v.y]; }
  set yx(v) { [this.x, this.y] = [v.y, v.x]; }

  // static initializers
  static random(a=1, rng=Math.random) {
    return new Vec2(a * rng(), a * rng());
  }

}
