import Compressor from 'compressorjs';
import { filetoblob } from "./file";

/**
 * 图片压缩
 * @param {File} file
 * @param {压缩比例} quality
 */
export function CompressorImg(file, quality) {
  let file = file;
  let quality = quality;
  function ComImg(res, rej) {
    let begin = new Date();
    new Compressor(file, {
      quality: quality,
      async success(result) {
        let end = new Date();
        result.time = end - begin;
        let url = await filetoblob(result);
        res({ url, name: result.name });
      },
      error(err) {
        console.log(err.message);
        rej(err);
      }
    });
  }
  return new Promise(ComImg);
}
