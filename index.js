
import UI      from './classes/UI.js';
import Engine  from './classes/Engine.js';

async function run() {
  const engine = new Engine({target: '#output'});
  await engine.init();

  // state
  const ui = new UI({target: '#app'});
  const algoOptions = [
    { value: 0, text: 'Floyd-Steinberg' },
    { value: 1, text: 'Noise' },
    { value: 2, text: 'Ordered Dithering' },
    { value: 3, text: 'Blue Noise' },
    { value: 4, text: 'Clean Noise' },
    { value: 5, text: 'Posterisation' },
  ];

  const updatePaletteBox = field => {
    let count = 0;
    const rgbPalette = Array.from(engine.selectedPalette.bytes)
    .reduce((acc, n, i, {length}) => {
      acc[acc.length - 1].push(n);
      if(++count === 3 && i !== length - 1) ( acc.push([]), count = 0 );
      return acc;
    }, [[]]); 
    field.innerHTML = '';
    if(field.classList.contains('palette') === false) field.classList.add('palette');
    for(const [_i, rgb] of rgbPalette.entries()) {
      const box = document.createElement('div');
      box.style.backgroundColor = `rgb(${rgb[0]}, ${rgb[1]}, ${rgb[2]})`;
      box.classList.add('palette-box');
      field.append(box);
    }
  };

  // handlers
  const handlerFactor = (_, value) => {
    engine.ditherParams.factor = parseFloat(value);
    engine.update();
  };
  const handlerRight = (_, value) => {
    engine.ditherParams.right = parseFloat(value);
    engine.update();
  };
  const handlerDownLeft = (_, value) => {
    engine.ditherParams.downLeft = parseFloat(value);
    engine.update();
  };
  const handlerDown = (_, value) => {
    engine.ditherParams.down = parseFloat(value);
    engine.update();
  };
  const handlerDownRight = (_, value) => {
    engine.ditherParams.downRight = parseFloat(value);
    engine.update();
  };
  const handlerPalette = (_, value, field) => {
    engine.selectedPalette = engine.paletteOptions
      .find(({value: v}) => 
        String( v ) === String( value )
      );
    field.updateValueBox(updatePaletteBox);

    engine.update();
  };

  const handlerAlgorithm = (_, value) => {
    engine.mode = parseInt(value);
    if(engine.mode === 0) ui // Floyd-Steinberg
      .showField({id: 'distributeRight'})
      .showField({id: 'distributeDownLeft'})
      .showField({id: 'distributeDown'})
      .showField({id: 'distributeDownRight'})
      .hideField({id: 'bnoise'})
      .hideField({id: 'cnoise'})
      .hideField({id: 'noise'});
      else if (engine.mode === 1) ui //f Noise
        .hideField({id: 'distributeRight'})
        .hideField({id: 'distributeDownLeft'})
        .hideField({id: 'distributeDown'})
        .hideField({id: 'distributeDownRight'})
        .hideField({id: 'bnoise'})
        .hideField({id: 'cnoise'})
        .showField({id: 'noise'});
        else if (engine.mode === 2) ui // Ordered Dithering
          .hideField({id: 'distributeRight'})
          .hideField({id: 'distributeDownLeft'})
          .hideField({id: 'distributeDown'})
          .hideField({id: 'distributeDownRight'})
          .hideField({id: 'noise'})
          .hideField({id: 'cnoise'})
          .hideField({id: 'bnoise'});
          else if (engine.mode === 3) ui // Blue Noise
            .hideField({id: 'distributeRight'})
            .hideField({id: 'distributeDownLeft'})
            .hideField({id: 'distributeDown'})
            .hideField({id: 'distributeDownRight'})
            .hideField({id: 'noise'})
            .hideField({id: 'cnoise'})
            .showField({id: 'bnoise'});
            else if (engine.mode === 4) ui // Clean Noise
              .hideField({id: 'distributeRight'})
              .hideField({id: 'distributeDownLeft'})
              .hideField({id: 'distributeDown'})
              .hideField({id: 'distributeDownRight'})
              .hideField({id: 'noise'})
              .hideField({id: 'bnoise'})
              .showField({id: 'cnoise'});
              else if (engine.mode === 5) ui // Posterisation
                .hideField({id: 'distributeRight'})
                .hideField({id: 'distributeDownLeft'})
                .hideField({id: 'distributeDown'})
                .hideField({id: 'distributeDownRight'})
                .hideField({id: 'noise'})
                .hideField({id: 'bnoise'})
                .hideField({id: 'cnoise'});
    engine.update();
  };

  const handlerNoise = (_, value) => {
    engine.ditherParams.noiseFactor = parseFloat(value);
    engine.update();
  };

  const handlerBNoise = (_, value) => {
    engine.ditherParams.bnoiseFactor = parseFloat(value);
    engine.update();
  };
  const handlerCNoise = (_, value) => {
    engine.ditherParams.cnoiseFactor = parseFloat(value);
    engine.update();
  };

  const handlerPixel = (_, value) => {
    engine.ditherParams.pixelSize = parseInt(value);
    engine.update();
  };

  const handlerFile = async (event, _, field ) => {
    const readBuffer = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = event => resolve(event.target.result);
      reader.onerror = reject;
      reader.readAsArrayBuffer(file);
    });
    const file = event.target.files[0];
    if(file) engine
      .setFileBuffer(await readBuffer(file))
      .onFileSelected();
      else return null;
    field.updateValueBox(el => el.innerHTML = '');
    engine.update();
  }



  // params
  const sliderAttr = { min: 0.0, max: 10.0,  step: 0.05  };
  const noiseAttr  = { min: 0.0, max: 255.0, step: 0.05  };
  const bnoiseAttr = { min: 0.0, max: 1,     step: 0.005 };
  const cnoiseAttr = { min: 0.0, max: 1,     step: 0.005 };
  const pixelAttr  = { min: 1,   max: 20,    step: 1     };

  ui
    .makeForm('Dithering', {})
    .addFile('Upload image', {value: null, id: 'file', attributes: {accept: 'image/png'} }, {onChange: handlerFile})
    .addSelect('Palette',   {value: engine.selectedPalette.value, options: engine.paletteOptions, id: 'palette'},   {onChange: handlerPalette})
    .addSelect('Algorithm', {value: algoOptions[0].value,   options: algoOptions,   id: 'algorithm'}, {onChange: handlerAlgorithm})
    .addSlider('Pixel size',            {value: 1,   id: 'pixel',               attributes: {...pixelAttr}},  {onInput: handlerPixel})
    .addSlider('Factor',                {value: 1.0, id: 'factor',              attributes: {...sliderAttr}}, {onInput: handlerFactor})
    .addSlider('Noise',                 {value: 0.0, id: 'noise',               attributes: {...noiseAttr}},  {onInput: handlerNoise})
    .addSlider('Blue noise',            {value: 0.0, id: 'bnoise',              attributes: {...bnoiseAttr}}, {onInput: handlerBNoise})
    .addSlider('Clean noise',            {value: 0.0, id:'cnoise',              attributes: {...cnoiseAttr}}, {onInput: handlerCNoise})
    .addSlider('Distribute right',      {value: 7.0, id: 'distributeRight',     attributes: {...sliderAttr}}, {onInput: handlerRight})
    .addSlider('Distribute down-left',  {value: 3.0, id: 'distributeDownLeft',  attributes: {...sliderAttr}}, {onInput: handlerDownLeft})
    .addSlider('Distribute down',       {value: 5.0, id: 'distributeDown',      attributes: {...sliderAttr}}, {onInput: handlerDown})
    .addSlider('Distribute down-right', {value: 1.0, id: 'distributeDownRight', attributes: {...sliderAttr}}, {onInput: handlerDownRight})

  engine.update();
  handlerAlgorithm(null, algoOptions[0].value);


}

run();
