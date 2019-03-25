'use strict';

const PI = Math.PI, TAU = PI * 2;
// let sin = Math.sin, cos = Math.cos, tan = Math.tan, floor = Math.floor;
// let max = Math.max, min = Math.min, abs = Math.abs, hypot = Math.hypot, sqrt = Math.sqrt;
const mix = (a, b, p) => a * (1 - p) + b * p;
const clamp = (x, lo, hi) => Math.min(hi, Math.max(lo, x));
const smoothstep = (x, e0, e1) => {
  x = clamp((x - e0) / (e1 - e0), 0, 1);
  return x * x * (3 - 2 * x);
}

// circular array / modular arithmetic
const wrap = (a, m) => (a % m + m) % m;
const iwrap = (a, m) => Math.floor((a % m + m) % m);
const awrap = (a, i) => a[iwrap(i, a.length)];
const dmod = (a, b, m) => Math.min(wrap(a - b, m), wrap(b - a, m));

// random functions
const RNG = Math.random; // todo: PCG random (Java code in comment below)
const rand = (lo=0, hi=1) => lo + (hi - lo) * RNG();
const irand = (lo, hi) => lo + Math.floor((hi - lo) * RNG()); // exclusive
const nrand = (lo=-1, hi=1) => lo + (hi - lo) * .5 * (1 + RNG() - RNG());
const sample = (a) => a[Math.floor(RNG() * a.length)];
const chance = (p) => RNG() < p;
const shuffle = (a) => {
    for (let i = a.length - 1; i > 0; i--) {
        let j = Math.floor(RNG() * (i + 1));
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
  normalize() { let m = 1 / Math.hypot(this.x, this.y); this.x *= m; this.y *= m; return this; }
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

  // polar getters and setters
  get r() { return Math.hypot(this.x, this.y); }
  get phi() { return Math.atan2(this.y, this.x); }
  set r(r_) { 
    let m = r_ / Math.hypot(this.x, this.y); 
    this.x *= m; this.y *= m; 
  }
  set phi(phi_) { 
    let r = Math.hypot(this.x, this.y);
    this.x = r * Math.cos(phi_);
    this.y = r * Math.sin(phi_);
  }

  // iterator
  *[Symbol.iterator]() {
    yield this.x;
    yield this.y;
  }

  // static initializers
  static random(a=1) {
    return new Vec2(a * RNG(), a * RNG());
  }
}

/*

// * PCG Random Number Generation for Java / Processing.
// *
// * For additional information about the PCG random number generation scheme,
// * including its license and other licensing options, visit
// *
// *       http://www.pcg-random.org

class PCG32Random {
    long state, inc;
    PCG32Random() {
        state = 0x853c49e6748fea9bL;
        inc = 0xda3e39cb94b95bdbL;
    }
    PCG32Random(long seed, long seq) {
        state = 0;
        inc = (seq << 1) | 1;
        next();
        state += seed;
        next();
    }

    int next() {
        long oldstate = state;
        state = oldstate * 6364136223846793005L + inc;
        int xorshifted = (int) (((oldstate >>> 18) ^ oldstate) >>> 27);
        int rot = (int) (oldstate >>> 59);
        return (int) ((xorshifted >>> rot) | (xorshifted << ((-rot) & 31)));
    }

    double nextDouble() {
        long r = (next() & 0xFFFFFFFFL);
        r = r << 21;
        r ^= (next() & 0xFFFFFFFFL);
        //r ^= (next() & 0xFFFFFFFFL);
        //r ^= (next() & 0xFFFFFFFFL);
        //return r / (double) 0x100000000L;
        // r ^= next() & 0xFFFFFFFFL;
        // r = r << 32;
        // r ^= next() & 0xFFFFFFFFL;
        // r ^= next() & 0xFFFFFFFFL;
        // r ^= next() & 0xFFFFFFFFL;
        return (r & 0x1fffffffffffffL) / ((double) (1L << 53));
    }

    boolean chance(double P) { return nextDouble() < P; }
}
*/
