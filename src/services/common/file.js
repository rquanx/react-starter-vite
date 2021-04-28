export function filetoblob(file) {
  return new Promise((resolve, reject) => {
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(e) {
      resolve(reader.result);
    };
    reader.onerror = function(e) {
      reject(reader.result);
    };
  });
}

/**
 * dataURL转File
 * @param {*} dataurl
 * @param {*} 文件名 filename
 */
export function dataURLtoFile(dataurl, filename) {
  var arr = dataurl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}


export default {
    filetoblob,
    dataURLtoFile
}