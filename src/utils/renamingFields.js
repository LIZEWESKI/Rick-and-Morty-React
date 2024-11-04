export default function renameFields(data, fieldMap) {
    const result = { ...data }; // Start with a copy of the data

    for (const [oldKey, newKey] of Object.entries(fieldMap)) {
        result[newKey] = result[oldKey]; // Create the new key
        delete result[oldKey]; // Delete the old key to avoid naming conflicts
    }
    return result;
}