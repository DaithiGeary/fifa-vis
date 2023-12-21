import Papa from "papaparse";

const openFile = async (path) => {
  const file = await fetch(path);
  console.log("File fetched");
  return file;
};

export const readCsv = async (file) => {
  return new Promise(async (resolve, reject) => {
    const fr = new FileReader();
    fr.onload = async ({ target }) => {
      let csv = null;
      Papa.parse(target.result, {
        header: true,
        complete: (results) => {
          csv = results;
        },
      });

      const parsedData = csv?.data;
      if (!parsedData) {
        console.log("error");
        reject([]);
      }
      console.log("success");
      resolve(parsedData);
    };
    const f = await openFile(file);
    const blob = await f.blob();
    console.log("Blob created");
    fr.readAsText(blob);
  });
};
