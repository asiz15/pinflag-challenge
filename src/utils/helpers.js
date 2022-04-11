// Retorna un array de strings con los parámetros provistos
export const getArrOfUrls = (url, pages = 1, pageInit = 1) => {
  const urls = []
  if (pages < 0 || pageInit < 0) {
    return urls
  }
  if (url) {
    for (let page = +pageInit; page <= +pages; page++) {
      urls.push(`${url}${page}`)
    }
  }

  return urls
}

// Retorna un booleano si todas las propiedades de "characterInput" tienen un largo de al menos 3.
export const inputLengthChecker = (characterInput) => {
  const arrChecker = []
  for (const property in characterInput) {
    if (characterInput[property].length >= 3) {
      arrChecker.push('valid')
    } else {
      arrChecker.push('not-valid')
    }
  }
  return arrChecker.every(pLength => pLength === 'valid') && arrChecker.length === 4
}
