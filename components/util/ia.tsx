import { InferenceSession, Tensor, env} from "onnxruntime-web";
env.wasm.wasmPaths = {
  'ort-wasm.wasm': 'js/ort-wasm.wasm',
  'ort-wasm-simd.wasm': 'js/ort-wasm-simd.wasm',
  'ort-wasm-threaded.wasm': 'js/ort-wasm-threaded.wasm',
  // Add other WASM files as needed
};
import jpeg from 'jpeg-js';

let classesDesc: { [chave: string]: string } = {'0': 'Arabian camel, dromedary, Camelus dromedarius', '1': 'trolleybus, trolley coach, trackless trolley', '2': 'goldfish, Carassius auratus', '3': 'bell pepper', '4': 'espresso', '5': 'cauliflower', '6': 'lion, king of beasts, Panthera leo', '7': 'king penguin, Aptenodytes patagonica', '8': 'jellyfish', '9': 'coral reef', '10': 'sulphur butterfly, sulfur butterfly', '11': 'cannon', '12': 'lakeside, lakeshore', '13': 'birdhouse', '14': 'koala, koala bear, kangaroo bear, native bear, Phascolarctos cinereus', '15': 'parking meter', '16': 'oboe, hautboy, hautbois', '17': 'fountain', '18': 'American lobster, Northern lobster, Maine lobster, Homarus americanus', '19': 'fly', '20': 'bannister, banister, balustrade, balusters, handrail', '21': 'bison', '22': 'Labrador retriever', '23': 'volleyball', '24': 'thatch, thatched roof', '25': 'pretzel', '26': 'rugby ball', '27': 'teddy, teddy bear', '28': 'tabby, tabby cat', '29': 'bighorn, bighorn sheep, cimarron, Rocky Mountain bighorn, Rocky Mountain sheep, Ovis canadensis', '30': 'European fire salamander, Salamandra salamandra', '31': 'orangutan, orang, orangutang, Pongo pygmaeus', '32': 'sombrero', '33': 'barrel, cask', '34': 'lawn mower, mower', '35': 'guinea pig, Cavia cobaya', '36': 'viaduct', '37': 'ladybug, ladybeetle, lady beetle, ladybird, ladybird beetle', '38': 'potpie', '39': 'lifeboat', '40': 'pill bottle', '41': 'walking stick, walkingstick, stick insect', '42': 'sewing machine', '43': 'iPod', '44': 'jinrikisha, ricksha, rickshaw', '45': 'snail', '46': 'ice cream, icecream', '47': 'apron', '48': 'hourglass', '49': 'rocking chair, rocker', '50': 'lampshade, lamp shade', '51': 'bucket, pail', '52': 'chest', '53': 'centipede', '54': 'black widow, Latrodectus mactans', '55': 'mashed potato', '56': 'bullet train, bullet', '57': 'sandal', '58': 'beer bottle', '59': 'frying pan, frypan, skillet', '60': 'dumbbell', '61': 'brain coral', '62': 'umbrella', '63': 'miniskirt, mini', '64': 'beach wagon, station wagon, wagon, estate car, beach waggon, station waggon, waggon', '65': 'Chihuahua', '66': "dragonfly, darning needle, devil's darning needle, sewing needle, snake feeder, snake doctor, mosquito hawk, skeeter hawk", '67': 'chimpanzee, chimp, Pan troglodytes', '68': 'CD player', '69': 'remote control, remote', '70': 'cardigan', '71': 'seashore, coast, seacoast, sea-coast', '72': 'lesser panda, red panda, panda, bear cat, cat bear, Ailurus fulgens', '73': 'acorn', '74': 'snorkel', '75': 'dugong, Dugong dugon', '76': 'gasmask, respirator, gas helmet', '77': 'picket fence, paling', '78': 'cash machine, cash dispenser, automated teller machine, automatic teller machine, automated teller, automatic teller, ATM', '79': 'guacamole', '80': 'suspension bridge', '81': 'pomegranate', '82': 'convertible', '83': 'ox', '84': 'sunglasses, dark glasses, shades', '85': 'magnetic compass', '86': 'beacon, lighthouse, beacon light, pharos', '87': 'drumstick', '88': 'pay-phone, pay-station', '89': 'brass, memorial tablet, plaque', '90': 'slug', '91': 'gondola', '92': 'syringe', '93': 'butcher shop, meat market', '94': 'desk', '95': 'cockroach, roach', '96': 'African elephant, Loxodonta africana', '97': 'abacus', '98': 'poncho', '99': 'fur coat', '100': 'bullfrog, Rana catesbeiana', '101': 'trilobite', '102': 'pizza, pizza pie', '103': 'beaker', '104': 'chain', '105': 'turnstile', '106': "academic gown, academic robe, judge's robe", '107': 'projectile, missile', '108': 'limousine, limo', '109': 'scorpion', '110': 'bikini, two-piece', '111': 'grasshopper, hopper', '112': 'ice lolly, lolly, lollipop, popsicle', '113': 'meat loaf, meatloaf', '114': 'water jug', '115': 'go-kart', '116': 'candle, taper, wax light', '117': 'orange', '118': 'tailed frog, bell toad, ribbed toad, tailed toad, Ascaphus trui', '119': 'pole', '120': 'obelisk', '121': 'comic book', '122': 'brown bear, bruin, Ursus arctos', '123': 'Persian cat', '124': 'wooden spoon', '125': 'American alligator, Alligator mississipiensis', '126': 'refrigerator, icebox', '127': 'organ, pipe organ', '128': 'monarch, monarch butterfly, milkweed butterfly, Danaus plexippus', '129': 'gazelle', '130': 'maypole', '131': 'basketball', '132': 'nail', '133': "spider web, spider's web", '134': 'plate', '135': 'mantis, mantid', '136': 'German shepherd, German shepherd dog, German police dog, alsatian', '137': 'backpack, back pack, knapsack, packsack, rucksack, haversack', '138': 'confectionery, confectionary, candy store', '139': 'sports car, sport car', '140': 'goose', '141': 'mushroom', '142': 'sea slug, nudibranch', '143': 'triumphal arch', '144': 'pop bottle, soda bottle', '145': 'dining table, board', '146': 'water tower', '147': 'standard poodle', '148': 'cliff, drop, drop-off', '149': 'bee', '150': 'steel arch bridge', '151': 'spiny lobster, langouste, rock lobster, crawfish, crayfish, sea crawfish', '152': 'crane', '153': 'space heater', '154': 'stopwatch, stop watch', '155': 'black stork, Ciconia nigra', '156': 'punching bag, punch bag, punching ball, punchball', '157': 'alp', '158': 'vestment', '159': 'albatross, mollymawk', '160': 'baboon', '161': 'wok', '162': 'banana', '163': 'teapot', '164': 'cliff dwelling', '165': 'lemon', '166': 'barn', '167': 'Yorkshire terrier', '168': 'Egyptian cat', '169': 'cougar, puma, catamount, mountain lion, painter, panther, Felis concolor', '170': 'barbershop', '171': 'sock', '172': 'Christmas stocking', '173': 'flagpole, flagstaff', '174': 'military uniform', '175': 'scoreboard', '176': 'reel', '177': 'altar', '178': 'sea cucumber, holothurian', '179': 'dam, dike, dyke', '180': 'golden retriever', '181': 'torch', '182': 'bathtub, bathing tub, bath, tub', '183': 'bow tie, bow-tie, bowtie', '184': 'hog, pig, grunter, squealer, Sus scrofa', '185': 'computer keyboard, keypad', '186': 'binoculars, field glasses, opera glasses', '187': "plunger, plumber's helper", '188': 'tractor', '189': 'tarantula', '190': 'moving van', '191': 'school bus', '192': 'broom', '193': 'swimming trunks, bathing trunks', '194': 'neck brace', '195': 'police van, police wagon, paddy wagon, patrol wagon, wagon, black Maria', '196': "potter's wheel", '197': 'kimono', '198': 'freight car', '199': 'boa constrictor, Constrictor constrictor'}



let model: InferenceSession;
export default async function handlerModel (imageBufferData: jpeg.UintArrRet){
  const inference = await evaluate(imageBufferData, [1, 3, 64, 64]);
  if(inference){
    const classe = inference.classe;
    const boxCoordinate = inference.box_coordinate;
    const probability = inference.probability;
    const classeDesc = inference.classeDesc;
    return {classe: classe, boxCoordinate: boxCoordinate, probability: probability, classeDesc: classeDesc};
  }
}


const evaluate = async (imageBufferData:  jpeg.UintArrRet, dims: number[]) => {
  const tensorImage = await inputDataToTensor(imageBufferData, dims);
  model = await modelLoader();

  if(model != null){
      const feeds: Record<string, Tensor> = {};
      feeds[model.inputNames[0]] = tensorImage;
      const inference = await model.run(feeds); 

      const classe_output = inference[model.outputNames[0]];
      const classe_data: unknown = classe_output.data;
      const dataFloat = classe_data as Float32Array;
      const box_output = inference[model.outputNames[1]];
      const box_data = box_output.data
      const box_dataFloat = box_data as Float32Array;
      
      const classes_probability = await softmax(Array.from(dataFloat));
      const classe: number = classes_probability.indexOf(Math.max(...classes_probability));
      const probability = classes_probability[classe];
      const box_coordinate = Array.from(box_dataFloat);

      return {classe: classe, box_coordinate: box_coordinate, probability: probability, classeDesc: classesDesc[classe.toString()]};
  }
}

async function softmax(resultArray: number[]) {
  // Apply exponential function to each result item subtracted by the largest number, use reduce to get the previous result number and the current number to sum all the exponentials results.
  const sumOfExp = resultArray.map((resultItem) => Math.exp(resultItem))
                          .reduce((prevNumber, currentNumber) => prevNumber + currentNumber);
  //Normalizes the resultArray by dividing by the sum of all exponentials; this normalization ensures that the sum of the components of the output vector is 1.
  return resultArray.map((resultValue, index) => {
    return Math.exp(resultValue) / sumOfExp;
  });
}

const inputDataToTensor = async (rawImageData:  jpeg.UintArrRet, dims: number[]) => {
  const { width, height, data } = rawImageData;
  const [redArray, greenArray, blueArray] = new Array(new Array<number>(), new Array<number>(), new Array<number>());
  const mean = [0.485, 0.456, 0.406];
  const std = [0.229, 0.224, 0.225];
  for (let i = 0; i < data.length; i += 4) {
    redArray.push((Number(data[i]) / 255.0 - mean[0]) / std[0]);
    greenArray.push((Number(data[i + 1]) / 255.0 - mean[1])  / std[1]);
    blueArray.push((Number(data[i + 2]) / 255.0 - mean[2])  / std[2]);
  }

  // Concatenate RGB to transpose [224, 224, 3] -> [3, 224, 224] to a number array
  const transposedData = redArray.concat(greenArray).concat(blueArray);

  // convert to float32
  let l = transposedData.length; // length, we need this for the loop
  // create the Float32Array size 3 * 224 * 224 for these dimensions output
  const float32Data = new Float32Array(dims[1] * dims[2] * dims[3]);
  let i = 0;
  for (i = 0; i < l; i++) {
    float32Data[i] = Number(transposedData[i]) / 255.0; // convert to float
  }

  const inputTensor = new Tensor("float32", float32Data, dims);
  return inputTensor;
}

async function modelLoader(){
  if (model) {
    return model;
  }
  //const modelPath = path.join(process.cwd(), '/model/model.onnx');
  const url = 'https://pub-ea23fddf0d7b4e8a87ee073517e80c3d.r2.dev/resnet_modelo_8_classification_box.onnx'
  /*const response = await fetch(url, {method: 'GET'});
  const arrayBuffer = await response.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);*/
  model = await InferenceSession.create(url, {executionProviders:["wasm"], graphOptimizationLevel: "all"});
  return model;
}
