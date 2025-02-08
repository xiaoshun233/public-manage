export const base64ToBlob = (base64Url: string, sliceSize = 512) => {
  const parts = base64Url.split(';base64,')
  const contentType = parts[0].split(':')[1] // "data:image/png" -> "image/png"
  const fileExtension = contentType.split('/')[1] // "image/png" -> "png"
  const base64Data = parts[1]
  const byteCharacters = atob(base64Data) // decode base64 string
  const byteArrays = [] // create byte arrays

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    const slice = byteCharacters.slice(offset, offset + sliceSize)

    const byteNumbers = new Array(slice.length)
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i)
    }

    const byteArray = new Uint8Array(byteNumbers)
    byteArrays.push(byteArray)
  }

  const blob = new Blob(byteArrays, { type: contentType })
  return {
    blob,
    contentType,
    fileExtension
  }
}
