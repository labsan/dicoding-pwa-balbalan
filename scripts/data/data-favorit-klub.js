const DATABASE_NAME = 'db_balbalan';
const DATABASE_VERSION = 1;
const OBJECT_STORE_NAME = 'tbl_balbalan';

const dbPromised = idb.open(DATABASE_NAME, DATABASE_VERSION, upgradeDb => {
    const balbalanObjectStore = upgradeDb.createObjectStore(OBJECT_STORE_NAME, {
        keyPath: 'id'
    })

    balbalanObjectStore.createIndex('name', 'name', {
        unique: true
    })
})

const saveForLater = async balbalan => {
    dbPromised.then(db => {
        const tx = db.transaction(OBJECT_STORE_NAME, 'readwrite');
        const store = tx.objectStore(OBJECT_STORE_NAME);

        store.add(balbalan);
        M.toast({
            html: 'Data berhasil ditambah!.'
        });
        return tx.complate;

    }).catch(() => {
        M.toast({
            html: 'Upss! Terjadi suatu masalah.'
        })
    })
}

const getAll = async () => {
    return new Promise((resolve, reject) => {
        dbPromised.then(db => {
            const tx = db.transaction(OBJECT_STORE_NAME, 'readonly');
            const store = tx.objectStore(OBJECT_STORE_NAME);

            return store.getAll();

        }).then(balbalan => {
            resolve(balbalan);
        })
    })
}

const deleteById = async id => {
    return new Promise((resolve, reject) => {
        dbPromised.then(db => {

            const tx = db.transaction(OBJECT_STORE_NAME, 'readwrite');
            const store = tx.objectStore(OBJECT_STORE_NAME);

            store.delete(id);
            M.toast({
                html: 'Data berhasil dihapus!.'
            });
            return tx.complate;

        }).catch(() => {
            M.toast({
                html: 'Upss! Terjadi suatu masalah!.'
            })
        })
    })
}

export {
    saveForLater,
    getAll,
    deleteById
};