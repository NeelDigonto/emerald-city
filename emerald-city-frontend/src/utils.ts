export const uploadFile = async (url: string, fields: any, file: File) => {
  const formData = new FormData();

  //console.log(fields);

  Object.entries(fields).forEach(([key, value]) => {
    formData.append(key, value as any);
  });

  formData.append("file", file);
  console.log(fields);

  return new Promise<void>((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open("POST", url, true);
    xhr.send(formData);
    xhr.onload = function (e) {
      if (xhr.readyState === 4) resolve();
    };

    //resolve();
  });
};
