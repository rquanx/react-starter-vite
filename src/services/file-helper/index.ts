export const blobReader = (blob: Blob): Promise<string> => {
  return new Promise((res, rej) => {
    let reader = new FileReader();
    reader.onload = event => {
      res(reader.result.toString());
    };
    reader.readAsText(blob);
  });
};

/**
 * 可用filesaver替换
 * @param blob 
 * @param name 
 */
export const fileDownload = (blob, name) => {
  if ("download" in document.createElement("a")) {
    const resUrl = window.URL.createObjectURL(new Blob([blob]));
    const link = document.createElement("a");
    link.style.display = "none";
    link.href = resUrl;
    link.download = decodeURIComponent(name);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } else {
    navigator.msSaveBlob(new Blob([blob]), decodeURIComponent(name));
  }
};
