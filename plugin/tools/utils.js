export function getNewworType (item) {
  //0 - 未知; 1 - WIFI; 2 - 2G; 3 - 3G; 4 - 4G; 5 - 5G; 6 - 光纤
  let type = 1;
  switch (item) {
    case '2g': type = 2; break;
    case '3g': type = 3; break;
    case '4g': type = 4; break;
    case '5g': type = 5; break;
    case 'wifi': type = 1; break;
    default: type = 0; break;
  }
  return type;
}

export function getOSType (item) {
  let type = 1;
  if (item.toLocaleLowerCase() === 'android') {
    type = 1;
  } else {
    type = 2;
  }
  return type;
}