import init, {
  // MemoryBuffer,
  // dither_image,
  DitherEngine,
} from '../png-processor/png_processor.js';

import palette from '../palette.js';

export class Engine {
  engine = null;
  paletteOptions = palette;
  elements = {
    canvas: null,
  }
  ctx = null;
  selectedPalette = null;
  ditherParams = {
    factor:      1.0,
    noiseFactor: 0.0,
    bnoiseFactor: 0.0,
    cnoiseFactor: 0.0,
    right:       7.0,
    downLeft:    3.0,
    down:        5.0,
    downRight:   1.0,
    pixelSize:   1,
  };
  mode = 0;

  wasm = null;
  fileBytes = null;

  constructor(params) {
    this.initCanvas(params);
  }
  async init() {
    this.wasm = await init();
    await this.initState()
    return this;
  }

  initCanvas(params) {
    const { target } = params;
    this.elements.canvas = document.querySelector(target);
    if(!this.elements.canvas) throw new Error(`Target ${target} not found`);
    this.ctx = this.elements.canvas.getContext('2d');
    return this;
  }

  async loadInitImage(url) {
    const imageResponse = await fetch(url);
    const fileBytes = await imageResponse.arrayBuffer();
    this.setFileBuffer(fileBytes);
    return this;
  }

  setFileBuffer(fileBytes) {
    this.fileBytes = fileBytes;
    return this;
  }

  async initState() {
    this.selectedPalette = this.paletteOptions[0];
    await this.loadInitImage(new URL('../image.png', import.meta.url));
    this
      .onFileSelected()
      .update();
    return this;
  }

  onFileSelected() {
    if(this.engine) this.engine.free(); 
  
    this.engine = new DitherEngine(new Uint8Array(this.fileBytes));
    this.elements.canvas.width = this.engine.width();
    this.elements.canvas.height = this.engine.height();
    return this;
  }

  update() {
    if(!this.engine) return null;
    this.engine.render(
      this.selectedPalette.bytes,
      this.ditherParams,
      this.mode,
    );

    // 2. Достаем указатель и длину
    const ptr = this.engine.pixels_ptr();
    const w = this.engine.width();
    const h = this.engine.height();
    const len = w * h * 4;

    // 3. Создаем view на память WASM. 
    // ВАЖНО: берем актуальный wasm.memory.buffer, так как он может измениться
    const pixels = new Uint8ClampedArray(this.wasm.memory.buffer, ptr, len);

    // 4. Отрисовка
    const imageData = new ImageData(pixels, w, h);
    this.ctx.putImageData(imageData, 0, 0);

    return this;
  }
}

export default Engine;
