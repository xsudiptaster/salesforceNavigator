import { XMLBuilder } from 'fast-xml-parser';
import JSZip from 'jszip';
import * as XLSX from 'xlsx';

export const download = (filename: string, text: string) => {
  const element = document.createElement('a');
  element.setAttribute(
    'href',
    `data:text/plain;charset=utf-8,${encodeURIComponent(text)}`,
  );
  element.setAttribute('download', filename);
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};
export const readFileAsText = async (file: any) => {
  return new Promise((resolve) => {
    const fileReader = new FileReader();
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.readAsText(file);
  });
};
export const readFileAsBuffer = async (file: any) => {
  const result = await new Promise((resolve) => {
    const fileReader = new FileReader();
    fileReader.onload = () => resolve(fileReader.result);
    fileReader.readAsArrayBuffer(file);
  });
  return result;
};
export const readFileWithXLSX = async (oArrayBuff: any) => {
  return XLSX.readFile(oArrayBuff, {
    type: 'array',
    cellDates: true,
  });
};
export const readFirstSheet = (workbook: any) => {
  return XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]], {
    defval: '',
  });
};
export const readFileData = async (fileData: any) => {
  const resultFile = await readFileAsBuffer(fileData);
  const workbook = await readFileWithXLSX(resultFile);
  const data = await readFirstSheet(workbook);
  return data;
};
export const writeFileWithXLSX = (processedData: any[], fileName: string) => {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(
    JSON.parse(JSON.stringify(processedData)),
  );
  XLSX.utils.book_append_sheet(wb, ws, 'Output');
  XLSX.writeFile(wb, `${fileName}.xlsx`);
  return wb;
};
export const createBaseFile = async (jsonZip: any) => {
  const zip = new JSZip();
  const options = {
    ignoreAttributes: false,
  };
  const builder = new XMLBuilder(options);
  // eslint-disable-next-line guard-for-in
  for (const key in jsonZip) {
    const xmlData = builder.build(jsonZip[key]);
    zip.file(key, xmlData);
  }
  const base64File = await zip.generateAsync({ type: 'base64' });
  return base64File;
};
