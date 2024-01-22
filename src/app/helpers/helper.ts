/**
 * Генерирует случайный идентификатор (UID) заданной длины.
 * @param uidLength Длина генерируемого UID (по умолчанию 8 символов).
 * @returns Случайно сгенерированный UID.
 */
export function generateRandomUid(uidLength: number = 8): string {
  // Символы, используемые для генерации UID
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  // Переменная для хранения генерируемого UID
  let uid = '';

  // Цикл для создания UID указанной длины
  for (let i = 0; i < uidLength; i++) {
    // Генерация случайного индекса в диапазоне символов
    const randomIndex = Math.floor(Math.random() * characters.length);

    // Добавление символа к UID
    uid += characters.charAt(randomIndex);
  }

  // Возврат сгенерированного UID
  return uid;
}

/**
 * Вставляет элемент или массив элементов в указанную позицию массива.
 * @param originalArray Исходный массив, в который будет вставлен элемент или массив элементов.
 * @param index Позиция, на которую нужно вставить новый элемент или массив.
 * @param newObject Новый элемент или массив элементов для вставки. Может быть как одиночным элементом (T), так и массивом элементов (Array<T>).
 * @returns Новый массив элементов типа T после вставки нового элемента или массива.
 */
export function insertItemByIndex<T>(originalArray: Array<T>, index: number, newObject: T | Array<T>): Array<T> {
  // Проверка, находится ли index в допустимых границах массива.
  if (index < 0 || index > originalArray.length)
    return originalArray;

  // Создание двух частей массива: от начала до index и от index до конца.
  const firstPart = originalArray.slice(0, index);
  const secondPart = originalArray.slice(index);

  // Если newObject - массив, объединить три части в новый массив.
  if (Array.isArray(newObject)) {
    return [
      ...firstPart,
      ...newObject,
      ...secondPart
    ];
  }
  // Если newObject - одиночный элемент, вставить его между первой и второй частями.
  else {
    return [
      ...firstPart,
      newObject,
      ...secondPart
    ];
  }
}

/**
 * Возвращает массив, содержащий уникальные значения из входного массива.
 *
 * @param inputArray - Входной массив, из которого требуется извлечь уникальные значения.
 * @returns Массив, содержащий уникальные значения из входного массива.
 * 
 * @template T - Тип элементов во входном массиве.
 *
 * @example
 * const inputArray = [1, 2, 2, 3, 4, 4, 5];
 * const uniqueValues = getUniqueValues(inputArray);
 * console.log(uniqueValues); // Вывод: [1, 2, 3, 4, 5]
 */
export function getUniqueValues<T>(inputArray: Array<T>): Array<T> {
  // Используйте метод filter вместе с indexOf для извлечения уникальных значений.
  return inputArray.filter((value, index, array) => array.indexOf(value) === index);
}

/**
 * Создает глубокую копию объекта или массива.
 *
 * @param obj - Объект или массив, для которого требуется создать глубокую копию.
 * @returns Глубокая копия входного объекта или массива.
 * 
 * @template T - Тип элементов во входном объекте или массиве.
 *
 * @example
 * const originalObject = { a: 1, b: { c: 2 } };
 * const copiedObject = deepCopy(originalObject);
 * console.log(copiedObject); // Вывод: { a: 1, b: { c: 2 } }
 *
 * const originalArray = [1, [2, 3], { d: 4 }];
 * const copiedArray = deepCopy(originalArray);
 * console.log(copiedArray); // Вывод: [1, [2, 3], { d: 4 }]
 */
export function deepCopy<T>(obj: T): T {
  // Если объект null или не является объектом, возвращаем его как есть.
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }

  // Если объект - массив, применяем deepCopy к каждому элементу массива.
  if (Array.isArray(obj)) {
    return obj.map(deepCopy) as T;
  }

  const newObj: any = {};
  
  // Если объект - не массив, создаем новый объект и рекурсивно применяем deepCopy к его свойствам.
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      newObj[key] = deepCopy(obj[key]);
    }
  }

  return newObj;
}

// quickSort(list, 0, list.length - 1);
export function quickSort(sortArray: number[], low: number, high: number): void {
  if(sortArray.length === 0 || low >= high) return;

  let middle: number = low + (high - low) / 2;
  let border: number = sortArray[middle];

  let i = low, j = high;

  while(i <= j) {
    while(sortArray[i] < border) {
      i += 1;
    }

    while(sortArray[j] > border) {
      j -= 1;
    }
    
    if(i <= j) {
      let swap = sortArray[i];
      sortArray[i] = sortArray[j];
      sortArray[j] = swap;

      i += 1;
      j += 1;
    }
  }

  if(low < j) {
    quickSort(sortArray, low, j);
  }

  if(high > i) {
    quickSort(sortArray, i, high);
  }
}
/**
 * Создать и загрузить файл
 */
export function downloadFile(filename: string, data: any, type: string = 'application/json') {
  const blob = new Blob([data], { type: type });
  const elem = window.document.createElement('a');
  elem.href = window.URL.createObjectURL(blob);
  elem.download = filename;        
  document.body.appendChild(elem);
  elem.click();        
  document.body.removeChild(elem);
}
