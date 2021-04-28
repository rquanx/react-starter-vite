import {
    T
} from "@services/translation";

export function getColumns(columnsKeys, columnsNames, columnsClass) {
    return columnsKeys.map((item, i) => {
        return {
            name: T(columnsNames[i]),
            className: columnsClass[i],
            key: "column" + i
        }
    });
}

export function getDropDownOptions(enumItem) {
    return Object.keys(enumItem).map((key) => {
        return {
            key: key,
            text: T(enumItem[key])
        }
    })
}

export function getDocumentTypeOptions(documentTypes) {
    return documentTypes && documentTypes.length > 0 ? documentTypes.map((document) => {
        return {
            key: document.ID,
            text: document.Name
        }
    }) : undefined;
}
