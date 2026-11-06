// worker ของตัวอ่านตัวเลข: ส่งไฟล์ภาษาจาก eng-data.js แทนการโหลดจากเว็บภายนอก
importScripts('eng-data.js');
const realFetch = self.fetch.bind(self);
self.fetch = (url, opts) => {
  if (String(url).endsWith('eng.traineddata.gz')) {
    const bin = atob(self.ENG_DATA_B64), data = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) data[i] = bin.charCodeAt(i);
    return Promise.resolve(new Response(data));
  }
  return realFetch(url, opts);
};
importScripts('worker.min.js');
