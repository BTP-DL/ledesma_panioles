sap.ui.define([], function () {
    "use strict";
    return {
        _urlDMS: null,

        setUrl: function (urlDMS) {
            this._urlDMS = urlDMS;
        },

        createFolder: async function (folder, path) {
            const url = `${this._urlDMS}/${path}`;
            const oForm = new FormData();
            oForm.append("cmisaction", "createFolder");
            oForm.append("propertyId[0]", "cmis:name");
            oForm.append("propertyValue[0]", folder);
            oForm.append("propertyId[1]", "cmis:objectTypeId");
            oForm.append("propertyValue[1]", "cmis:folder");
            const resp = await fetch(url, {
                method: "POST",
                body: oForm,
            });
            return await resp.json();
        },

        uploadImageToFolder: async function (folderPath, filename, b64Content) {
            const url = `${this._urlDMS}/${folderPath}`;

            const oForm = new FormData();
            oForm.append("cmisaction", "createDocument");
            oForm.append("propertyId[0]", "cmis:name");
            oForm.append("propertyValue[0]", filename);
            oForm.append("propertyId[1]", "cmis:objectTypeId");
            oForm.append("propertyValue[1]", "cmis:document");
            oForm.append("_charset_", "UTF-8");
            oForm.append("includeAllowableActions", true);
            oForm.append("succinct", true);
            oForm.append("media", b64Content);

            const resp = await fetch(url, {
                method: "POST",
                body: oForm,
            });

            return await resp.json();
        },


        getImage: async function (foldfilename, path) {
            const url = `${this._urlDMS}/${path}/${foldfilename}`;
            const image = await fetch(url);
            const imageBlob = await image.blob();
            return URL.createObjectURL(imageBlob)
        },

        deleteFileDMS: async function (filename, path) {
            const url = `${this._urlDMS}/${path}/${filename}`;
            const oForm = new FormData()
            oForm.append("cmisAction", "delete")

            await fetch(url, {
                method: 'POST',
                body: oForm
            });
        },

    };
});